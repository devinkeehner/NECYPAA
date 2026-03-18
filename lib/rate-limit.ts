/**
 * Simple in-memory rate limiter for server actions.
 *
 * Uses a sliding window approach. Each key (typically an IP or email)
 * tracks timestamps of recent requests. Requests older than the window
 * are pruned automatically.
 *
 * NOTE: This is per-instance. In a multi-instance deployment (e.g. Vercel
 * serverless), each function instance has its own store. This is still
 * effective against casual abuse and bot traffic. For stricter guarantees,
 * use Vercel's Edge Config or Upstash Redis.
 */

interface RateLimitEntry {
  timestamps: number[]
}

const store = new Map<string, RateLimitEntry>()

// Prune stale entries every 5 minutes
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000

let lastCleanup = Date.now()

function cleanup(windowMs: number) {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return
  lastCleanup = now

  const cutoff = now - windowMs
  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => t > cutoff)
    if (entry.timestamps.length === 0) {
      store.delete(key)
    }
  }
}

interface RateLimitOptions {
  /** Maximum requests allowed in the window */
  limit: number
  /** Window size in milliseconds */
  windowMs: number
}

interface RateLimitResult {
  success: boolean
  remaining: number
  resetMs: number
}

export function rateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const { limit, windowMs } = options
  const now = Date.now()
  const cutoff = now - windowMs

  cleanup(windowMs)

  let entry = store.get(key)
  if (!entry) {
    entry = { timestamps: [] }
    store.set(key, entry)
  }

  // Remove timestamps outside the window
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff)

  if (entry.timestamps.length >= limit) {
    const oldestInWindow = entry.timestamps[0]
    return {
      success: false,
      remaining: 0,
      resetMs: oldestInWindow + windowMs - now,
    }
  }

  entry.timestamps.push(now)

  return {
    success: true,
    remaining: limit - entry.timestamps.length,
    resetMs: windowMs,
  }
}

/** Preset: checkout session creation — 5 per minute per key */
export function rateLimitCheckout(key: string): RateLimitResult {
  return rateLimit(key, { limit: 5, windowMs: 60 * 1000 })
}

/** Preset: free registration — 3 per minute per key */
export function rateLimitFreeRegistration(key: string): RateLimitResult {
  return rateLimit(key, { limit: 3, windowMs: 60 * 1000 })
}

/** Preset: access code redemption — 3 per minute per key */
export function rateLimitCodeRedemption(key: string): RateLimitResult {
  return rateLimit(key, { limit: 3, windowMs: 60 * 1000 })
}
