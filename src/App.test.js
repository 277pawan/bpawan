import { getAllArticles, getArticleBySlug } from "./content/blog/loadArticles";
import { getAllProjectSlugs } from "./content/projects/loadProjects";

test("discovers article and project content from JSON files", () => {
  expect(getAllArticles().length).toBeGreaterThan(0);
  expect(getArticleBySlug("cache")).not.toBeNull();
  expect(getAllProjectSlugs()).toContain("revenant");
});
