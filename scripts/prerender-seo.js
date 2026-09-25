/**
 * After `react-scripts build`, write real HTML for every public route.
 * New article/project JSON files are included automatically on the next build.
 */
const fs = require("fs");
const path = require("path");
const {
  origin,
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
} = require("./seo-utils");

const buildDir = path.join(__dirname, "../build");
const indexFile = path.join(buildDir, "index.html");
const fallbackImage = `${origin}/20230521_084703.jpg`;
const googleVerification = process.env.REACT_APP_GOOGLE_SITE_VERIFICATION || "";

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

function renderPage(template, { title, description, keywords, url, image, ogType, jsonLd, body }) {
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = upsertMeta(html, "name", "description", description);
  html = upsertMeta(html, "name", "keywords", keywords);
  html = upsertMeta(html, "name", "author", "Pawan Bisht");
  html = upsertMeta(html, "name", "robots", "index, follow, max-image-preview:large");
  if (googleVerification) {
    html = upsertMeta(html, "name", "google-site-verification", googleVerification);
  }
  html = upsertMeta(html, "property", "og:title", title);
  html = upsertMeta(html, "property", "og:description", description);
  html = upsertMeta(html, "property", "og:url", url);
  html = upsertMeta(html, "property", "og:type", ogType || "website");
  html = upsertMeta(html, "property", "og:image", image);
  html = upsertMeta(html, "property", "og:site_name", "Pawan Bisht");
  html = upsertMeta(html, "property", "og:locale", "en_US");
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

function main() {
  if (!fs.existsSync(indexFile)) {
    console.error("prerender-seo: build/index.html missing. Run the production build first.");
    process.exit(1);
  }

  const template = fs.readFileSync(indexFile, "utf8");
  const articles = loadArticles();
  const projects = loadProjects();
  let pageCount = 0;

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
            url: articleUrl(a.slug),
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
              `<li><a href="${articlePath(a.slug)}">${escapeHtml(a.title)}</a><p>${escapeHtml(a.description || "")}</p></li>`
          )
          .join("\n        ")}
      </ul>
    </main>`,
    })
  );
  pageCount += 1;

  for (const article of articles) {
    const url = articleUrl(article.slug);
    const description = article.description || article.title;
    const keywords = (article.keywords || article.tags || []).join(", ");
    const title = `${article.title} | Pawan Bisht`;
    const page = renderPage(template, {
      title,
      description,
      keywords,
      url,
      image: imageUrl(article),
      ogType: "article",
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
        <p><a href="/engineering">Engineering concepts</a></p>
        <h1>${escapeHtml(article.title)}</h1>
        <p>${escapeHtml(description)}</p>
        <p>${escapeHtml(article.author || "Pawan Bisht")}</p>
        ${blocksToHtml(article.blocks)}
      </article>
    </main>`,
    });
    writeRoute(path.join("engineering", article.slug), page);
    writeRoute(article.slug, page);
    pageCount += 2;
  }

  for (const project of projects) {
    const url = projectUrl(project.slug);
    const description = project.description || project.tagline || project.title;
    const keywords = (project.keywords || []).join(", ");
    const title = `${project.title} | Pawan Bisht`;
    writeRoute(
      path.join("projects", project.slug),
      renderPage(template, {
        title,
        description,
        keywords,
        url,
        image: imageUrl(project),
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          name: project.title,
          description,
          url,
          author: { "@type": "Person", name: "Pawan Bisht", url: origin },
        },
        body: `<main>
      <article>
        <p><a href="/#projects">Projects</a></p>
        <h1>${escapeHtml(project.title)}</h1>
        <p>${escapeHtml(project.tagline || "")}</p>
        <p>${escapeHtml(description)}</p>
        ${blocksToHtml(project.blocks || [])}
      </article>
    </main>`,
      })
    );
    pageCount += 1;
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
      <h2>Engineering articles</h2>
      <ul>
        ${articles
          .map(
            (a) =>
              `<li><a href="${articlePath(a.slug)}">${escapeHtml(a.title)}</a></li>`
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
      jsonLd: [
        {
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
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Pawan Bisht Portfolio",
          url: `${origin}/`,
          description:
            "Portfolio and engineering articles by Pawan Bisht (277pawan).",
          potentialAction: {
            "@type": "SearchAction",
            target: `${origin}/engineering?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },
      ],
      body: homeBody,
    }),
    "utf8"
  );
  pageCount += 1;

  const sitemapEntries = buildSitemapEntries(articles, projects);
  writeSitemap(path.join(buildDir, "sitemap.xml"), sitemapEntries);
  writeSitemap(path.join(__dirname, "../public/sitemap.xml"), sitemapEntries);

  console.log(
    `prerender-seo: wrote ${pageCount} HTML page(s) and ${sitemapEntries.length} sitemap URL(s)`
  );
}

main();
