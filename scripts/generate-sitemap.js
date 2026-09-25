/**
 * Regenerates public/sitemap.xml from article + project JSON (run before build).
 */
const path = require("path");
const {
  loadArticles,
  loadProjects,
  buildSitemapEntries,
  writeSitemap,
} = require("./seo-utils");

const outFile = path.join(__dirname, "../public/sitemap.xml");
const articles = loadArticles();
const projects = loadProjects();
const entries = buildSitemapEntries(articles, projects);

writeSitemap(outFile, entries);
console.log(`Wrote ${entries.length} URLs to public/sitemap.xml`);
