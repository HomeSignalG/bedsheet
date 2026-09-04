import { execFileSync } from "node:child_process";

/**
 * Date of the last commit that touched `repoPath`, or `undefined` when that
 * cannot be established — no git in the build environment, a source tree
 * exported without its history, or a path git does not track.
 *
 * Used for sitemap `lastmod`. Deriving the date from history rather than
 * from the filesystem matters: a fresh clone or a CI checkout stamps every
 * file with the checkout time, which would tell crawlers the whole site
 * changed on every deploy. Returning `undefined` — and omitting `lastmod`
 * altogether — is the honest answer when the real date is unknown.
 */
export function lastCommitDate(repoPath: string): Date | undefined {
  try {
    const output = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", repoPath],
      {
        // No `cwd`: it defaults to the build's working directory, which is
        // the repo root. Passing a computed path here reads to Turbopack as
        // dynamic filesystem access and makes it trace the whole project
        // into the server bundle.
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      },
    ).trim();

    if (!output) return undefined;

    const date = new Date(output);
    return Number.isNaN(date.getTime()) ? undefined : date;
  } catch {
    return undefined;
  }
}
