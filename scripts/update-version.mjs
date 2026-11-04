#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const version = process.argv[2];
if (!version) {
  console.error("Usage: node scripts/update-version.mjs <version> (e.g. 1.2.0 or v1.2.0)");
  process.exit(1);
}

const cleanVer = version.startsWith("v") ? version : `v${version}`;
const indexPath = resolve(process.cwd(), "index.html");
let html = readFileSync(indexPath, "utf8");

const scriptStart = html.indexOf("<script>");
if (scriptStart !== -1) {
  let htmlPart = html.slice(0, scriptStart);
  let scriptPart = html.slice(scriptStart);

  // 1. Replace static fallback HTML in body (hero and download meta)
  htmlPart = htmlPart.replace(/<b class="app-version">[^<]+<\/b>/g, `<b class="app-version">${cleanVer}</b>`);
  htmlPart = htmlPart.replace(/<span class="app-version">[^<]+<\/span>/g, `<span class="app-version">${cleanVer}</span>`);

  // 2. Replace single JS constant fallback in script
  scriptPart = scriptPart.replace(/const APP_VERSION = "[^"]+";/, `const APP_VERSION = "${cleanVer}";`);

  html = htmlPart + scriptPart;
} else {
  html = html.replace(/const APP_VERSION = "[^"]+";/, `const APP_VERSION = "${cleanVer}";`);
}

writeFileSync(indexPath, html, "utf8");
console.log(`Updated index.html version to: ${cleanVer}`);
