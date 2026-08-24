/**
 * Fixed-window in-memory rate limiter.
 *
 * Scope: one server instance. That is enough to stop a single client
 * hammering the contact endpoint, which is what this guards against. It is
 * not a distributed limiter — on a platform that runs several instances or
 * scales to zero, back it with Redis/KV and keep this interface.
 */

type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();

/** Entries are only swept when the map grows past this, so the common
 *  case costs nothing. */
const SWEEP_THRESHOLD = 1000;

export interface RateLimitResult {
  ok: boolean;
  /** Seconds until the caller may retry. Only meaningful when `ok` is false. */
  retryAfter: number;
}

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();

  if (windows.size > SWEEP_THRESHOLD) {
    for (const [k, w] of windows) {
      if (w.resetAt <= now) windows.delete(k);
    }
  }

  const current = windows.get(key);

  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  current.count += 1;

  if (current.count > limit) {
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  return { ok: true, retryAfter: 0 };
}

/** Resets all windows. Used by tests. */
export function resetRateLimits(): void {
  windows.clear();
}

/**
 * Best-effort client identity for rate limiting: the first hop in
 * `x-forwarded-for`, falling back to `x-real-ip`. Both are set by the
 * hosting proxy; a direct request with neither is bucketed together under
 * `unknown`, which is the conservative choice.
 */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
