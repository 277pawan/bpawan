const projectModules = import.meta.glob("./*.project.json", {
  eager: true,
  import: "default",
});

const projects = Object.entries(projectModules).map(([key, data]) => {
  const slugFromFile = key.replace(/^\.\//, "").replace(/\.project\.json$/, "");
  return { ...data, slug: data.slug || slugFromFile };
});

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getAllProjectSlugs() {
  return projects.map((p) => p.slug);
}
