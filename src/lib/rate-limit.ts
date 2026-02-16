/**
 * In-memory rate limiter for API routes.
 *
 * Stores request counts in a module-scoped Map. Each Vercel cold start
 * resets the map, which is acceptable for a low-traffic landing page —
 * provides basic abuse protection without external infrastructure.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

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

const store = new Map<string, RateLimitEntry>();

/**
 * Check and increment rate limit for a given key.
 *
 * @example
 * ```ts
 * const result = rateLimit({ key: clientIp, limit: 3, windowMs: 3_600_000 });
 * if (!result.success) return new Response("Too many requests", { status: 429 });
 * ```
 */
export function rateLimit({
  key,
  limit,
  windowMs,
}: RateLimitOptions): RateLimitResult {
  const now = Date.now();

  // Prune expired entries on each call to prevent unbounded growth
  for (const [k, entry] of store) {
    if (now >= entry.resetTime) {
      store.delete(k);
    }
  }

  const entry = store.get(key);

  // No existing entry or expired — start fresh window
  if (!entry || now >= entry.resetTime) {
    store.set(key, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  // Within window — increment and check
  entry.count += 1;

  if (entry.count > limit) {
    return { success: false, remaining: 0 };
  }

  return { success: true, remaining: limit - entry.count };
}
