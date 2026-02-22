/**
 * Redis-based rate limiter using Upstash.
 * 
 * Production-ready alternative to in-memory rate limiting.
 * Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to your env.
 */

interface RateLimitOptions {
  /** Unique key to rate-limit on (typically client IP) */
  key: string;
  /** Maximum requests allowed within the window */
  limit: number;
  /** Time window in milliseconds */
  windowMs: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
}

let redis: any = null;

function getRedis() {
  if (!redis && process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      const { Redis } = require('@upstash/redis');
      redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
    } catch (error) {
      console.warn('Upstash Redis not available, falling back to in-memory:', error);
    }
  }
  return redis;
}

/**
 * Rate limit using Redis (Upstash) with fallback to in-memory.
 */
export async function rateLimit({
  key,
  limit,
  windowMs,
}: RateLimitOptions): Promise<RateLimitResult> {
  const redis = getRedis();
  
  if (!redis) {
    // Fallback to original in-memory implementation
    const { rateLimit: memoryRateLimit } = await import('./rate-limit');
    return memoryRateLimit({ key, limit, windowMs });
  }

  try {
    const redisKey = `rate_limit:${key}`;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Use Redis sorted set to track requests in time window
    const pipeline = redis.pipeline();
    
    // Remove old entries
    pipeline.zremrangebyscore(redisKey, 0, windowStart);
    
    // Count current requests
    pipeline.zcard(redisKey);
    
    // Add current request
    pipeline.zadd(redisKey, now, `${now}-${Math.random()}`);
    
    // Set expiration
    pipeline.expire(redisKey, Math.ceil(windowMs / 1000));

    const results = await pipeline.exec();
    const currentCount = results[1][1] as number;

    if (currentCount >= limit) {
      return { success: false, remaining: 0 };
    }

    return { success: true, remaining: limit - currentCount - 1 };
  } catch (error) {
    console.error('Redis rate limit error, allowing request:', error);
    return { success: true, remaining: limit - 1 };
  }
}