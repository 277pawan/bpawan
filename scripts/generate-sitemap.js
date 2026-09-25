/**
 * Regenerates public/sitemap.xml from article + project JSON (run before build).
 */
const fs = require("fs");
const path = require("path");

const origin = (process.env.REACT_APP_SITE_URL || "https://two77pawan.onrender.com").replace(
  /\/$/,
  ""
);
const articlesDir = path.join(__dirname, "../src/content/blog/articles");
const projectsDir = path.join(__dirname, "../src/content/projects");
const outFile = path.join(__dirname, "../public/sitemap.xml");

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return {};
  }
}

function lastmod(iso) {
  if (!iso) return new Date().toISOString().slice(0, 10);
  return String(iso).slice(0, 10);
}

function readArticles() {
  if (!fs.existsSync(articlesDir)) return [];
  return fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith(".json") && !f.startsWith("article.template"))
    .map((f) => {
      const data = readJson(path.join(articlesDir, f));
      const slug = data.slug || f.replace(/\.json$/, "");
      return {
        loc: `${origin}/${slug}`,
        lastmod: lastmod(data.updatedAt || data.publishedAt),
        priority: "0.8",
      };
    });
}

function readProjects() {
  if (!fs.existsSync(projectsDir)) return [];
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".project.json"))
    .map((f) => ({
      loc: `${origin}/projects/${f.replace(/\.project\.json$/, "")}`,
      lastmod: lastmod(),
      priority: "0.95",
    }));
}

const urls = [
  { loc: `${origin}/`, lastmod: lastmod(), priority: "1.0" },
  { loc: `${origin}/engineering`, lastmod: lastmod(), priority: "0.9" },
  ...readProjects(),
  ...readArticles(),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(outFile, xml, "utf8");
console.log(`Wrote ${urls.length} URLs to public/sitemap.xml`);
