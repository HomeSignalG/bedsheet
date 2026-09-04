import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { composeTitle, pageMetadata } from "../lib/metadata.ts";

const home = pageMetadata({
  title: "Bed Sheets With a Removable Bottom Sheet",
  description: "Home description.",
  path: "/",
});

const inner = pageMetadata({
  title: "Two-Part Bed Sheet System",
  description: "Product description.",
  path: "/product",
});

describe("pageMetadata", () => {
  it("spells the brand out in the home page title", () => {
    // The root layout's `%s | brand` template does not apply to the home
    // page — same route segment — so the composed string has to be here or
    // the site's most important title loses the brand entirely.
    assert.equal(home.title, composeTitle("Bed Sheets With a Removable Bottom Sheet"));
  });

  it("leaves the brand suffix to the template on inner pages", () => {
    assert.equal(inner.title, "Two-Part Bed Sheet System");
  });

  it("gives every page a self-referencing canonical", () => {
    assert.equal(home.alternates?.canonical, "/");
    assert.equal(inner.alternates?.canonical, "/product");
  });

  it("shares the same composed title with Open Graph and Twitter", () => {
    const composed = composeTitle("Two-Part Bed Sheet System");
    assert.equal(inner.openGraph?.title, composed);
    assert.equal(inner.twitter?.title, composed);
  });

  it("carries the share card on every page", () => {
    assert.ok(inner.openGraph?.images, "inner pages need their own og:image");
    assert.ok(inner.twitter?.images, "inner pages need their own twitter:image");
  });
});
