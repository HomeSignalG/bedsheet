/**
 * Contact-form SMTP diagnostic.
 *
 * Run it from the deployed site's directory, where `.env.production` lives:
 *
 *     cd ~/sites/backeasysheets.com
 *     node scripts/diagnose-contact-smtp.js
 *
 * Exists because a delivery failure is deliberately opaque from outside —
 * the form tells the sender nothing about the server — and the server log
 * scrolls away. This gathers every fact in one run:
 *   - which .env files exist (Next's precedence order matters)
 *   - the raw values in .env.production vs what Next's loader produces
 *   - the full SMTP protocol conversation, falling back to the other
 *     standard submission port when the configured one fails
 *
 * The env-file comparison is the point of section 3. A password containing
 * `#` is truncated there (dotenv reads it as a comment) and one containing
 * `$name` has that part expanded away — inside quotes as well as outside.
 * Either produces a 535 from the mail server while the raw file still looks
 * correct, which is impossible to diagnose by reading the file.
 *
 * Prints no password: character counts and the set of non-alphanumeric
 * characters only, and the SMTP transcript is run through a redactor. The
 * output is safe to paste into a support thread.
 */
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const dir = process.cwd();
const line = (s) => console.log(s);

line("=== 1. env files present ===");
line("cwd: " + dir);
for (const f of [".env", ".env.local", ".env.production", ".env.production.local"]) {
  line(`${f.padEnd(24)} ${fs.existsSync(path.join(dir, f)) ? "EXISTS" : "-"}`);
}

line("\n=== 2. raw values in .env.production ===");
const rawEnv = {};
for (const l of fs.readFileSync(".env.production", "utf8").split("\n")) {
  if (!l || l.trimStart().startsWith("#")) continue;
  const i = l.indexOf("=");
  if (i < 0) continue;
  rawEnv[l.slice(0, i).trim()] = l.slice(i + 1);
}
for (const k of ["CONTACT_DELIVERY", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "CONTACT_FROM_EMAIL"]) {
  line(`${k.padEnd(20)} ${JSON.stringify(rawEnv[k])}`);
}
const pw = rawEnv.SMTP_PASSWORD || "";
line(`SMTP_PASSWORD        ${pw.length} chars`);
line(`  non-alphanumeric:  ${JSON.stringify(pw.replace(/[a-zA-Z0-9]/g, ""))}`);
line(`  leading/trailing space: ${pw !== pw.trim()}`);

line("\n=== 3. what the app actually loads ===");
try {
  require("@next/env").loadEnvConfig(dir);
  line(`SMTP_USER            ${JSON.stringify(process.env.SMTP_USER)}`);
  line(`SMTP_PASSWORD        ${(process.env.SMTP_PASSWORD || "").length} chars`);
  line(`identical to file:   ${process.env.SMTP_PASSWORD === pw}`);
} catch (e) {
  line("@next/env unavailable: " + e.message);
}

// nodemailer's debug logger prints the SMTP dialogue. Route it through a
// redactor so no credential can reach the transcript even if the library
// changes what it logs.
function redact(s) {
  return String(s)
    .replace(/AUTH\s+(PLAIN|LOGIN)\s+\S+/gi, "AUTH $1 <redacted>")
    .replace(/[A-Za-z0-9+/]{24,}={0,2}/g, "<redacted>");
}
const logger = {
  level: () => {},
  trace: () => {},
  debug: (_o, m, ...a) => line("   " + redact(m ? String(m).replace(/%s/g, () => a.shift()) : "")),
  info: (_o, m, ...a) => line("   " + redact(m ? String(m).replace(/%s/g, () => a.shift()) : "")),
  warn: () => {},
  error: () => {},
};

async function attempt(port, secure) {
  line(`\n=== 4. port ${port} (${secure ? "implicit TLS" : "STARTTLS"}) ===`);
  const t = nodemailer.createTransport({
    host: rawEnv.SMTP_HOST,
    port,
    secure,
    requireTLS: !secure,
    auth: { user: rawEnv.SMTP_USER, pass: pw },
    logger,
    debug: true,
    connectionTimeout: 15000,
    greetingTimeout: 15000,
  });
  try {
    await t.verify();
    line(`>>> RESULT port ${port}: AUTH OK`);
    return true;
  } catch (e) {
    line(`>>> RESULT port ${port}: FAIL — ${e.message}`);
    return false;
  } finally {
    t.close();
  }
}

(async () => {
  // Configured port first, then the other standard submission port.
  const configured = Number(rawEnv.SMTP_PORT || 587);
  const ok = await attempt(configured, configured === 465);
  if (!ok) {
    const alt = configured === 465 ? 587 : 465;
    await attempt(alt, alt === 465);
  }
  line("\n=== done ===");
})();
