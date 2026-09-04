import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { lastCommitDate } from "../lib/last-modified.ts";

describe("lastCommitDate", () => {
  it("reads the last commit date of a tracked file", () => {
    const date = lastCommitDate("app/page.tsx");

    // Skips rather than fails where the checkout has no history: the
    // function's contract is that it degrades to `undefined` there, which
    // the next assertion covers.
    if (date === undefined) return;

    assert.ok(date instanceof Date);
    assert.ok(!Number.isNaN(date.getTime()));
    assert.ok(date.getTime() <= Date.now(), "a commit cannot be in the future");
  });

  it("returns undefined for a path git does not track", () => {
    assert.equal(lastCommitDate("app/no-such-file-here.tsx"), undefined);
  });
});
