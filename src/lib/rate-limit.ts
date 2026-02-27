import { Redis } from "@upstash/redis";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitOptions {
  /** Unique key to rate-limit on */
  key: string;
  /** Maximum requests allowed within the window */
  limit: number;
  /** Time window in milliseconds */
  windowMs: number;
}

type RateLimitFailureReason = "limited" | "unavailable";

interface RateLimitResult {
  success: boolean;
  remaining: number;
  reason?: RateLimitFailureReason;
}

const memoryStore = new Map<string, RateLimitEntry>();
const isProduction = process.env.NODE_ENV === "production";
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const redis =
  redisUrl && redisToken
    ? new Redis({
        url: redisUrl,
        token: redisToken,
      })
    : null;

let hasLoggedMissingRedisConfig = false;

function logMissingRedisConfigOnce(): void {
  if (hasLoggedMissingRedisConfig) return;
  hasLoggedMissingRedisConfig = true;
  console.error(
    "Rate limiter unavailable in production: missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN",
  );
}

function rateLimitInMemory({
  key,
  limit,
  windowMs,
}: RateLimitOptions): RateLimitResult {
  const now = Date.now();

  for (const [entryKey, entry] of memoryStore) {
    if (now >= entry.resetTime) {
      memoryStore.delete(entryKey);
    }
  }

  const entry = memoryStore.get(key);

  if (!entry || now >= entry.resetTime) {
    memoryStore.set(key, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  entry.count += 1;

  if (entry.count > limit) {
    return { success: false, remaining: 0, reason: "limited" };
  }

  return { success: true, remaining: limit - entry.count };
}

function toRedisKey(key: string): string {
  return `rate_limit:${key}`;
}

async function rateLimitWithRedis({
  key,
  limit,
  windowMs,
}: RateLimitOptions): Promise<RateLimitResult> {
  if (!redis) {
    if (isProduction) {
      logMissingRedisConfigOnce();
      return { success: false, remaining: 0, reason: "unavailable" };
    }
    return rateLimitInMemory({ key, limit, windowMs });
  }

  try {
    const redisKey = toRedisKey(key);
    const currentCount = await redis.incr(redisKey);

    if (currentCount === 1) {
      await redis.pexpire(redisKey, windowMs);
    }

    if (currentCount > limit) {
      return { success: false, remaining: 0, reason: "limited" };
    }

    return {
      success: true,
      remaining: Math.max(limit - currentCount, 0),
    };
  } catch (error) {
    console.error("Redis rate limiter error:", error);
    if (isProduction) {
      return { success: false, remaining: 0, reason: "unavailable" };
    }
    return rateLimitInMemory({ key, limit, windowMs });
  }
}

export async function rateLimit(
  options: RateLimitOptions,
): Promise<RateLimitResult> {
  return rateLimitWithRedis(options);
}
