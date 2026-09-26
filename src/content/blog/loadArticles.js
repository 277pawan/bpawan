/**
 * Loads all article JSON from ./articles (webpack require.context at build time).
 * Add a new file: articles/your-slug.json — no route or page code required.
 */

const articleContext = require.context("./articles", false, /\.json$/);

const articles = articleContext
  .keys()
  .filter((key) => !key.includes("article.template"))
  .map((key) => {
    const mod = articleContext(key);
    const data = mod.default ?? mod;
    const slugFromFile = key.replace(/^\.\//, "").replace(/\.json$/, "");

    return {
      ...data,
      slug: data.slug || slugFromFile,
    };
  })
  .filter((a) => a.slug && a.title && Array.isArray(a.blocks));

export function getAllArticles() {
  return [...articles].sort(
    (a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0),
  );
}

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug) ?? null;
}

export function getAllSlugs() {
  return articles.map((a) => a.slug);
}
