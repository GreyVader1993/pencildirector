// Run before build: fails if src/data/projects.js has mistakes that would break a page.
import { projects } from "./src/data/projects.js";

const keyFor = { youtube: "id", vimeo: "id", file: "src" };
const errors = [];
const seen = new Set();

projects.forEach((p, i) => {
  const where = `projects[${i}]${p.slug ? ` (${p.slug})` : ""}`;
  if (!p.slug) errors.push(`${where}: missing slug`);
  else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) errors.push(`${where}: slug must be lowercase letters, numbers and hyphens`);
  else if (seen.has(p.slug)) errors.push(`${where}: duplicate slug`);
  seen.add(p.slug);

  if (!p.title) errors.push(`${where}: missing title`);
  if (!p.description) errors.push(`${where}: missing description`);

  (p.videos ?? []).forEach((v, j) => {
    const key = keyFor[v.provider];
    if (!key) errors.push(`${where}: videos[${j}] has unknown provider "${v.provider}"`);
    else if (!v[key]) errors.push(`${where}: videos[${j}] (${v.provider}) is missing "${key}"`);
  });
});

if (errors.length) {
  console.error(`Data check failed:\n${errors.map((e) => `  - ${e}`).join("\n")}`);
  process.exit(1);
}
console.log(`data ok: ${projects.length} projects`);
