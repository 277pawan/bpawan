const fs = require("fs");
const path = require("path");

const origin = (process.env.REACT_APP_SITE_URL || "https://two77pawan.onrender.com").replace(
  /\/$/,
  ""
);

const root = path.join(__dirname, "..");
const articlesDir = path.join(root, "src/content/blog/articles");
const projectsDir = path.join(root, "src/content/projects");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function lastmod(iso) {
  if (!iso) return new Date().toISOString().slice(0, 10);
  return String(iso).slice(0, 10);
}

function loadArticles() {
  if (!fs.existsSync(articlesDir)) return [];
  return fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith(".json") && !f.startsWith("article.template"))
    .map((f) => {
      const data = readJson(path.join(articlesDir, f));
      const slug = data.slug || f.replace(/\.json$/, "");
      return { ...data, slug };
    })
    .filter((a) => a.slug && a.title && Array.isArray(a.blocks))
    .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
}

function loadProjects() {
  if (!fs.existsSync(projectsDir)) return [];
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".project.json"))
    .map((f) => {
      const data = readJson(path.join(projectsDir, f));
      const slug = data.slug || f.replace(/\.project\.json$/, "");
      return { ...data, slug };
    })
    .filter((p) => p.slug && p.title);
}

function articlePath(slug) {
  return `/engineering/${slug}`;
}

function articleUrl(slug) {
  return `${origin}${articlePath(slug)}`;
}

function projectPath(slug) {
  return `/projects/${slug}`;
}

function projectUrl(slug) {
  return `${origin}${projectPath(slug)}`;
}

function itemText(item) {
  if (typeof item === "string") return item;
  return item?.text || item?.label || "";
}

function blocksToHtml(blocks) {
  return (blocks || [])
    .map((block) => {
      switch (block.type) {
        case "heading": {
          const level = Math.min(4, Math.max(2, Number(block.level) || 2));
          const id = block.id ? ` id="${escapeHtml(block.id)}"` : "";
          return `<h${level}${id}>${escapeHtml(block.text)}</h${level}>`;
        }
        case "paragraph":
        case "text":
          return `<p>${escapeHtml(block.text)}</p>`;
        case "richText":
          return block.html || "";
        case "callout":
          return `<aside><strong>${escapeHtml(block.title || "")}</strong> ${escapeHtml(block.text || "")}</aside>`;
        case "quote":
          return `<blockquote><p>${escapeHtml(block.text || "")}</p>${
            block.cite ? `<footer>${escapeHtml(block.cite)}</footer>` : ""
          }</blockquote>`;
        case "list": {
          const tag = block.ordered ? "ol" : "ul";
          const items = (block.items || [])
            .map((item) => `<li>${escapeHtml(itemText(item))}</li>`)
            .join("");
          return `<${tag}>${items}</${tag}>`;
        }
        case "checklist":
          return `<ul>${(block.items || [])
            .map((item) => `<li>${escapeHtml(item.text || "")}</li>`)
            .join("")}</ul>`;
        case "code":
          return `<pre><code>${escapeHtml(block.code || "")}</code></pre>`;
        case "image":
          return `<figure><img src="${escapeHtml(block.src)}" alt="${escapeHtml(block.alt || "")}" loading="lazy" />${
            block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : ""
          }</figure>`;
        case "table": {
          const head = (block.headers || []).map((h) => `<th>${escapeHtml(h)}</th>`).join("");
          const rows = (block.rows || [])
            .map(
              (row) =>
                `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`
            )
            .join("");
          return `<table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`;
        }
        case "link":
          return `<p><a href="${escapeHtml(block.href)}">${escapeHtml(block.label || block.href)}</a></p>`;
        case "linkCard":
          return `<p><a href="${escapeHtml(block.href)}">${escapeHtml(block.title || block.href)}</a> ${escapeHtml(block.description || "")}</p>`;
        case "accordion":
          return (block.items || [])
            .map(
              (item) =>
                `<section><h3>${escapeHtml(item.title || "")}</h3><p>${escapeHtml(item.body || "")}</p></section>`
            )
            .join("");
        case "columns":
          return (block.columns || [])
            .map(
              (col) =>
                `<section><h3>${escapeHtml(col.title || "")}</h3><p>${escapeHtml(col.body || "")}</p></section>`
            )
            .join("");
        case "compare":
          return [block.left, block.right]
            .filter(Boolean)
            .map(
              (side) =>
                `<section><h3>${escapeHtml(side.title || "")}</h3><ul>${(side.points || [])
                  .map((p) => `<li>${escapeHtml(p)}</li>`)
                  .join("")}</ul></section>`
            )
            .join("");
        case "stats":
          return `<ul>${(block.items || [])
            .map((s) => `<li>${escapeHtml(s.value)} ${escapeHtml(s.label)}</li>`)
            .join("")}</ul>`;
        case "keyValue":
          return `<dl>${(block.entries || [])
            .map(
              (e) =>
                `<dt>${escapeHtml(e.term)}</dt><dd>${escapeHtml(e.definition)}</dd>`
            )
            .join("")}</dl>`;
        case "timeline":
          return `<ol>${(block.events || [])
            .map(
              (ev) =>
                `<li><strong>${escapeHtml(ev.title)}</strong> ${escapeHtml(ev.description || "")}</li>`
            )
            .join("")}</ol>`;
        case "poll":
          return `<section><h3>${escapeHtml(block.question || "")}</h3><ul>${(block.options || [])
            .map((opt) => `<li>${escapeHtml(opt.label || "")}</li>`)
            .join("")}</ul></section>`;
        case "contribute":
          return `<section><h3>${escapeHtml(block.title || "Contribute a topic")}</h3><p>${escapeHtml(block.text || "")}</p></section>`;
        case "tags":
          return `<p>${(block.items || []).map((t) => escapeHtml(t)).join(", ")}</p>`;
        case "divider":
        case "spacer":
        case "related":
        case "color":
        case "colorPalette":
          return "";
        case "video":
          return block.title ? `<p>${escapeHtml(block.title)}</p>` : "";
        default: {
          const text = [block.text, block.title].filter(Boolean).join(" ");
          return text ? `<p>${escapeHtml(text)}</p>` : "";
        }
      }
    })
    .join("\n");
}

function wordCount(blocks) {
  return blocksToHtml(blocks)
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function imageUrl(item) {
  const image = item?.ogImage || item?.coverImage || "/20230521_084703.jpg";
  if (image.startsWith("http")) return image;
  return `${origin}${image.startsWith("/") ? "" : "/"}${image}`;
}

function buildSitemapEntries(articles, projects) {
  return [
    { loc: `${origin}/`, lastmod: lastmod(), priority: "1.0" },
    { loc: `${origin}/engineering`, lastmod: lastmod(), priority: "0.9" },
    ...projects.map((p) => ({
      loc: projectUrl(p.slug),
      lastmod: lastmod(),
      priority: "0.95",
    })),
    ...articles.map((a) => ({
      loc: articleUrl(a.slug),
      lastmod: lastmod(a.updatedAt || a.publishedAt),
      priority: "0.8",
    })),
  ];
}

function writeSitemap(filePath, entries) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
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
  fs.writeFileSync(filePath, xml, "utf8");
}

module.exports = {
  origin,
  root,
  escapeHtml,
  loadArticles,
  loadProjects,
  articlePath,
  articleUrl,
  projectPath,
  projectUrl,
  blocksToHtml,
  wordCount,
  imageUrl,
  buildSitemapEntries,
  writeSitemap,
};
