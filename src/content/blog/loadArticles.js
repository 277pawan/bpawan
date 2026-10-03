const articleModules = import.meta.glob("./articles/*.json", {
  eager: true,
  import: "default",
});

const articles = Object.entries(articleModules)
  .filter(([key]) => !key.includes("article.template"))
  .map(([key, data]) => {
    const slugFromFile = key.replace(/^\.\/articles\//, "").replace(/\.json$/, "");
    return { ...data, slug: data.slug || slugFromFile };
  })
  .filter((a) => a.slug && a.title && Array.isArray(a.blocks));

export function getAllArticles() {
  return [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0)
  );
}

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug) ?? null;
}

export function getAllSlugs() {
  return articles.map((a) => a.slug);
}
