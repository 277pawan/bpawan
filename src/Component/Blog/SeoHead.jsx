import { useEffect } from "react";

const SITE_NAME = "Pawan Bisht";
const DEFAULT_ORIGIN =
  process.env.REACT_APP_SITE_URL || "https://two77pawan.onrender.com";

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id) {
  document.getElementById(id)?.remove();
}

/**
 * @param {object} props
 * @param {object} [props.article] — engineering article
 * @param {string} [props.path] — default /engineering
 * @param {object} [props.pageSeo] — { title, description, keywords, path }
 * @param {object[]} [props.articles] — index list for CollectionPage JSON-LD
 */
export default function SeoHead({ article, path = "/engineering", pageSeo, articles }) {
  useEffect(() => {
    const origin = DEFAULT_ORIGIN.replace(/\/$/, "");
    const isHome = Boolean(pageSeo && !article);
    const basePath = pageSeo?.path ?? path;
    const url = article ? `${origin}/${article.slug}` : `${origin}${basePath}`;

    const title = article
      ? `${article.title} | Pawan Bisht`
      : pageSeo?.title ?? `Engineering Concepts | Pawan Bisht`;

    const description =
      article?.description ??
      pageSeo?.description ??
      "Deep dives on software engineering concepts — redundancy, reliability, patterns, and more.";

    const image = article?.ogImage || article?.coverImage;
    const imageUrl = image
      ? image.startsWith("http")
        ? image
        : `${origin}${image.startsWith("/") ? "" : "/"}${image}`
      : `${origin}/20230521_084703.jpg`;

    const keywords =
      (article?.keywords || article?.tags || []).join(", ") ||
      pageSeo?.keywords ||
      "";

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", "index, follow, max-image-preview:large");
    upsertMeta("name", "author", article?.author || SITE_NAME);
    if (keywords) upsertMeta("name", "keywords", keywords);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", article ? "article" : "website");
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:locale", "en_US");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertLink("canonical", article?.canonicalUrl || url);
    document
      .querySelectorAll("meta[data-article-tag]")
      .forEach((el) => el.remove());
    if (article?.publishedAt) {
      upsertMeta("property", "article:published_time", article.publishedAt);
      upsertMeta(
        "property",
        "article:modified_time",
        article.updatedAt || article.publishedAt
      );
      upsertMeta("property", "article:author", article.author || SITE_NAME);
      upsertMeta("property", "article:section", article.category || "Engineering");
      (article.tags || []).slice(0, 8).forEach((tag) => {
        const el = document.createElement("meta");
        el.setAttribute("property", "article:tag");
        el.setAttribute("content", tag);
        el.dataset.articleTag = "1";
        document.head.appendChild(el);
      });
    }

    removeJsonLd("blog-article-jsonld");
    removeJsonLd("blog-breadcrumb-jsonld");
    removeJsonLd("home-person-jsonld");
    removeJsonLd("home-website-jsonld");
    removeJsonLd("blog-collection-jsonld");

    if (article) {
      upsertJsonLd("blog-article-jsonld", {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: article.title,
        description: article.description,
        image: imageUrl,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt || article.publishedAt,
        author: {
          "@type": "Person",
          name: article.author || SITE_NAME,
          url: origin,
        },
        publisher: {
          "@type": "Person",
          name: SITE_NAME,
          url: origin,
        },
        keywords: (article.keywords || article.tags || []).join(", "),
        articleSection: article.category || "Engineering Concepts",
        wordCount: (article.blocks || [])
          .map((b) => b.text || b.code || "")
          .join(" ")
          .split(/\s+/)
          .filter(Boolean).length,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      });
      upsertJsonLd("blog-breadcrumb-jsonld", {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: origin },
          {
            "@type": "ListItem",
            position: 2,
            name: "Engineering",
            item: `${origin}/engineering`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: url,
          },
        ],
      });
    } else if (articles?.length) {
      upsertJsonLd("blog-collection-jsonld", {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: title,
        description,
        url,
        publisher: { "@type": "Person", name: SITE_NAME, url: origin },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: articles.length,
          itemListElement: articles.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${origin}/${a.slug}`,
            name: a.title,
          })),
        },
      });
    } else if (isHome) {
      upsertJsonLd("home-person-jsonld", {
        "@context": "https://schema.org",
        "@type": "Person",
        name: SITE_NAME,
        alternateName: ["277pawan", "two77pawan", "b277pawan"],
        url: origin,
        jobTitle: "Full Stack Developer",
        sameAs: [
          "https://github.com/277pawan",
          "https://www.linkedin.com/in/pawan-bisht-a943161b9/",
        ],
        knowsAbout: [
          "React",
          "Node.js",
          "PostgreSQL",
          "react-form-toaster",
          "Revenant backup verification",
        ],
      });
      upsertJsonLd("home-website-jsonld", {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: `${SITE_NAME} Portfolio`,
        url: origin,
        description,
        potentialAction: {
          "@type": "SearchAction",
          target: `${origin}/engineering?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      });
    }
  }, [article, path, pageSeo, articles]);

  return null;
}
