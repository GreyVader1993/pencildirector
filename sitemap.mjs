// Run after build: writes dist/sitemap.xml when site.url is set in src/data/site.js.
import { writeFileSync } from "node:fs";
import { site } from "./src/data/site.js";

if (!site.url) {
  console.log("sitemap skipped: set site.url in src/data/site.js");
  process.exit(0);
}

const paths = ["/", "/work", "/contact"];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
  .map((p) => `  <url><loc>${site.url}${p}</loc></url>`)
  .join("\n")}\n</urlset>\n`;
writeFileSync("dist/sitemap.xml", xml);
console.log("sitemap written");
