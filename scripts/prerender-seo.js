/**
 * After `react-scripts build`, write a real HTML file for /engineering
 * and every article. A new articles/*.json file is included on the next build.
 * Render serves these files directly, ahead of the SPA rewrite.
 */
const fs = require("fs");
const path = require("path");

const origin = (process.env.REACT_APP_SITE_URL || "https://two77pawan.onrender.com").replace(
  /\/$/,
  ""
);
const root = path.join(__dirname, "..");
const buildDir = path.join(root, "build");
const articlesDir = path.join(root, "src/content/blog/articles");
const indexFile = path.join(buildDir, "index.html");

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

function loadArticles() {
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
          return `<figure><img src="${escapeHtml(block.src)}" alt="${escapeHtml(block.alt || "")}" />${
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

function upsertMeta(html, attr, key, content) {
  if (!content) return html;
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`;
  const re = new RegExp(`<meta\\s+${attr}="${key}"[^>]*>`, "i");
  if (re.test(html)) return html.replace(re, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function upsertCanonical(html, url) {
  const tag = `<link rel="canonical" href="${escapeHtml(url)}" />`;
  if (/<link\s+rel="canonical"[^>]*>/i.test(html)) {
    return html.replace(/<link\s+rel="canonical"[^>]*>/i, tag);
  }
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function renderPage(template, { title, description, keywords, url, image, jsonLd, body }) {
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = upsertMeta(html, "name", "description", description);
  html = upsertMeta(html, "name", "keywords", keywords);
  html = upsertMeta(html, "name", "author", "Pawan Bisht");
  html = upsertMeta(html, "name", "robots", "index, follow, max-image-preview:large");
  html = upsertMeta(html, "property", "og:title", title);
  html = upsertMeta(html, "property", "og:description", description);
  html = upsertMeta(html, "property", "og:url", url);
  html = upsertMeta(html, "property", "og:type", "website");
  html = upsertMeta(html, "property", "og:image", image);
  html = upsertMeta(html, "property", "og:site_name", "Pawan Bisht");
  html = upsertMeta(html, "name", "twitter:card", "summary_large_image");
  html = upsertMeta(html, "name", "twitter:title", title);
  html = upsertMeta(html, "name", "twitter:description", description);
  html = upsertMeta(html, "name", "twitter:image", image);
  html = upsertCanonical(html, url);
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, "");
  const ld = (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
    .filter(Boolean)
    .map((data) => `<script type="application/ld+json">${JSON.stringify(data)}</script>`)
    .join("\n    ");
  html = html.replace("</head>", `    ${ld}\n  </head>`);
  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>\s*(?=<script type="application\/ld\+json">|<script)/,
    `<div id="root">\n${body}\n    </div>\n    `
  );
  html = html.replace(
    /(href|src)="(?!https?:|\/|#|data:)([^"]+)"/g,
    '$1="/$2"'
  );
  return html;
}

function writeRoute(route, html) {
  const dir = path.join(buildDir, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
}

function imageUrl(article) {
  const image = article?.ogImage || article?.coverImage || "/20230521_084703.jpg";
  if (image.startsWith("http")) return image;
  return `${origin}${image.startsWith("/") ? "" : "/"}${image}`;
}

function main() {
  if (!fs.existsSync(indexFile)) {
    console.error("prerender-seo: build/index.html missing. Run the production build first.");
    process.exit(1);
  }
  const template = fs.readFileSync(indexFile, "utf8");
  const articles = loadArticles();
  const fallbackImage = `${origin}/20230521_084703.jpg`;

  const listDescription =
    "Plain-language engineering articles on redundancy, CAP theorem, cache, idempotency, reliability, and system design by Pawan Bisht (277pawan).";
  const listTitle = "Engineering Concepts — Redundancy, CAP, Idempotency | Pawan Bisht";
  const listUrl = `${origin}/engineering`;

  writeRoute(
    "engineering",
    renderPage(template, {
      title: listTitle,
      description: listDescription,
      keywords:
        "Pawan Bisht, 277pawan, engineering concepts, redundancy, CAP theorem, cache, idempotency, system design, reliability",
      url: listUrl,
      image: fallbackImage,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: listTitle,
        description: listDescription,
        url: listUrl,
        publisher: { "@type": "Person", name: "Pawan Bisht", url: origin },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: articles.length,
          itemListElement: articles.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${origin}/engineering/${a.slug}`,
            name: a.title,
          })),
        },
      },
      body: `<main>
      <h1>Engineering concepts</h1>
      <p>${escapeHtml(listDescription)}</p>
      <ul>
        ${articles
          .map(
            (a) =>
              `<li><a href="/engineering/${escapeHtml(a.slug)}">${escapeHtml(a.title)}</a><p>${escapeHtml(a.description || "")}</p></li>`
          )
          .join("\n        ")}
      </ul>
    </main>`,
    })
  );

  for (const article of articles) {
    const url = `${origin}/engineering/${article.slug}`;
    const description = article.description || article.title;
    const keywords = (article.keywords || article.tags || []).join(", ");
    const title = `${article.title} | Pawan Bisht`;
    const page = renderPage(template, {
        title,
        description,
        keywords,
        url,
        image: imageUrl(article),
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: article.title,
            description,
            image: imageUrl(article),
            datePublished: article.publishedAt,
            dateModified: article.updatedAt || article.publishedAt,
            keywords,
            articleSection: article.category || "Engineering Concepts",
            wordCount: wordCount(article.blocks),
            author: { "@type": "Person", name: article.author || "Pawan Bisht", url: origin },
            publisher: { "@type": "Person", name: "Pawan Bisht", url: origin },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: origin },
              { "@type": "ListItem", position: 2, name: "Engineering", item: listUrl },
              { "@type": "ListItem", position: 3, name: article.title, item: url },
            ],
          },
        ],
        body: `<main>
      <article>
        <p>Engineering concepts</p>
        <h1>${escapeHtml(article.title)}</h1>
        <p>${escapeHtml(description)}</p>
        <p>${escapeHtml(article.author || "Pawan Bisht")}</p>
        ${blocksToHtml(article.blocks)}
      </article>
    </main>`,
    });
    writeRoute(path.join("engineering", article.slug), page);
  }

  const homeBody = `<main>
      <h1>Pawan Bisht (277pawan)</h1>
      <p>Official website of Pawan Bisht — also known as 277pawan and two77pawan — at two77pawan.onrender.com. Full stack developer. Open source: React-Form-Toaster and Revenant.</p>
      <nav>
        <a href="/">Home</a>
        <a href="/engineering">Engineering concepts</a>
        <a href="/projects/react-form-toaster">React-Form-Toaster</a>
        <a href="/projects/revenant">Revenant</a>
      </nav>
      <ul>
        ${articles
          .map(
            (a) =>
              `<li><a href="/engineering/${escapeHtml(a.slug)}">${escapeHtml(a.title)}</a></li>`
          )
          .join("\n        ")}
      </ul>
    </main>`;
  fs.writeFileSync(
    indexFile,
    renderPage(template, {
      title: "Pawan Bisht (277pawan) | Full Stack Developer",
      description:
        "Official site of Pawan Bisht (277pawan / two77pawan) — full stack developer. Portfolio, React-Form-Toaster, Revenant, and engineering articles at two77pawan.onrender.com.",
      keywords:
        "Pawan Bisht, 277pawan, two77pawan, Pawan Bisht portfolio, two77pawan.onrender.com",
      url: `${origin}/`,
      image: fallbackImage,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Pawan Bisht",
        alternateName: ["277pawan", "two77pawan", "b277pawan"],
        url: `${origin}/`,
        jobTitle: "Full Stack Developer",
        sameAs: [
          "https://github.com/277pawan",
          "https://www.linkedin.com/in/pawan-bisht-a943161b9/",
        ],
      },
      body: homeBody,
    }),
    "utf8"
  );

  console.log(
    `prerender-seo: wrote home, /engineering, and ${articles.length} article page(s)`
  );
}

main();
