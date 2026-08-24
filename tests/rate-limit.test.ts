import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { clientKey, rateLimit, resetRateLimits } from "../lib/rate-limit.ts";

const OPTIONS = { limit: 3, windowMs: 60_000 };

describe("rateLimit", () => {
  beforeEach(() => resetRateLimits());

  it("allows requests up to the limit and blocks the next one", () => {
    for (let i = 0; i < OPTIONS.limit; i += 1) {
      assert.equal(rateLimit("a", OPTIONS).ok, true, `request ${i + 1} should pass`);
    }
    const blocked = rateLimit("a", OPTIONS);
    assert.equal(blocked.ok, false);
    assert.ok(blocked.retryAfter > 0);
  });

  it("keeps separate windows per key", () => {
    for (let i = 0; i < OPTIONS.limit; i += 1) rateLimit("a", OPTIONS);
    assert.equal(rateLimit("a", OPTIONS).ok, false);
    assert.equal(rateLimit("b", OPTIONS).ok, true);
  });

  it("lets the caller through again once the window has passed", () => {
    const brief = { limit: 1, windowMs: 0 };
    assert.equal(rateLimit("c", brief).ok, true);
    assert.equal(rateLimit("c", brief).ok, true);
  });
});

describe("clientKey", () => {
  const req = (headers: Record<string, string>) =>
    new Request("https://example.test/api/contact", { headers });

  it("uses the first hop of x-forwarded-for", () => {
    assert.equal(clientKey(req({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" })), "1.2.3.4");
  });

  it("falls back to x-real-ip", () => {
    assert.equal(clientKey(req({ "x-real-ip": "9.9.9.9" })), "9.9.9.9");
  });

  it("buckets requests with no client headers together", () => {
    assert.equal(clientKey(req({})), "unknown");
  });
});
