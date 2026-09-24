const projectContext = require.context("./", false, /\.project\.json$/);

const projects = projectContext.keys().map((key) => {
  const mod = projectContext(key);
  const data = mod.default ?? mod;
  const slugFromFile = key.replace(/^\.\//, "").replace(/\.project\.json$/, "");
  return { ...data, slug: data.slug || slugFromFile };
});

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getAllProjectSlugs() {
  return projects.map((p) => p.slug);
}
