/**
 * Small in-memory rate limiter. It is a best-effort first line of defence: on serverless
 * hosts each instance keeps its own counters, so pair it with the host's firewall / bot
 * protection for stronger guarantees. Pure and clock-injectable so it can be unit tested.
 */
type Entry = { count: number; resetAt: number };

export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, Entry>();

  return function allow(key: string, now: number = Date.now()): boolean {
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    }
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }
    entry.count += 1;
    return entry.count <= limit;
  };
}
