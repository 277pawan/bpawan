import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllArticles } from "../../content/blog/loadArticles";
import SeoHead from "./SeoHead";
import Footer from "../Footer/Footer";
import { LikeButton, SubscribeBox } from "./ArticleEngage";

const LAYOUT_KEY = "blog-layout";

function formatListDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
}

function formatCardDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function tagLabel(tag) {
  return tag.startsWith("#") ? tag : `#${tag}`;
}

export default function BlogList() {
  const articles = getAllArticles();
  const [layout, setLayout] = useState(() => {
    try {
      return localStorage.getItem(LAYOUT_KEY) || "list";
    } catch {
      return "list";
    }
  });

  const setAndStore = (next) => {
    setLayout(next);
    try {
      localStorage.setItem(LAYOUT_KEY, next);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-0 flex flex-col">
      <SeoHead
        path="/engineering"
        pageSeo={{
          title: "Engineering Concepts — Redundancy, CAP, Idempotency | Pawan Bisht",
          description:
            "Plain-language engineering articles on redundancy, CAP theorem, idempotency, reliability, and system design. Written for people searching those terms — not a resume dump.",
          keywords:
            "engineering concepts, redundancy, CAP theorem, idempotency, system design, reliability, SRE, software engineering blog",
          path: "/engineering",
        }}
        articles={articles}
      />

      <div className="max-w-7xl mx-auto px-6 flex-1 pb-16 w-full">
        <header className="mb-10">
          <p className="text-[#7843e9] uppercase tracking-[0.35em] text-xs mb-3">
            Engineering concepts
          </p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                Notes from the work
              </h1>
              <p className="mt-3 text-gray-400 max-w-xl leading-relaxed">
                Searchable write-ups on systems, reliability, and design. One
                JSON file per topic — pick a layout that reads well for you.
              </p>
            </div>
            <div
              className="inline-flex rounded-full border border-white/10 p-1 text-xs"
              role="group"
              aria-label="Article layout"
            >
              <button
                type="button"
                onClick={() => setAndStore("list")}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  layout === "list"
                    ? "bg-[#7843e9] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                List
              </button>
              <button
                type="button"
                onClick={() => setAndStore("cards")}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  layout === "cards"
                    ? "bg-[#7843e9] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Cards
              </button>
            </div>
          </div>
        </header>

        {articles.length === 0 && (
          <p className="text-gray-500">
            No articles yet. Add JSON under{" "}
            <code className="text-[#7843e9]">src/content/blog/articles/</code>.
          </p>
        )}

        {layout === "list" ? (
          <ol className="divide-y divide-white/5">
            {articles.map((article) => (
              <li key={article.slug}>
                <article className="flex items-start gap-4 md:gap-10 py-5">
                  <time
                    dateTime={article.publishedAt}
                    className="shrink-0 w-16 md:w-20 pt-0.5 text-sm text-gray-500"
                  >
                    {formatListDate(article.publishedAt)}
                  </time>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base md:text-lg font-semibold leading-snug">
                      <Link
                        to={`/engineering/${article.slug}`}
                        className="text-[#7ea6ff] hover:text-white hover:underline underline-offset-4 decoration-white/20"
                      >
                        {article.title}
                      </Link>
                    </h2>
                    {(article.tags || []).length > 0 && (
                      <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-500">
                        {article.tags.map((tag) => (
                          <span key={tag}>{tagLabel(tag)}</span>
                        ))}
                      </p>
                    )}
                  </div>
                  <LikeButton slug={article.slug} compact />
                </article>
              </li>
            ))}
          </ol>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-[#7843e9]/50 transition-all"
              >
                <div className="absolute top-3 right-3 z-10">
                  <LikeButton slug={article.slug} compact />
                </div>
                <Link to={`/engineering/${article.slug}`} className="group block">
                  {article.coverImage && (
                    <div className="aspect-[2/1] overflow-hidden bg-[#111]">
                      <img
                        src={article.coverImage}
                        alt=""
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6 pr-16">
                    <h2 className="text-xl font-bold group-hover:text-[#a78bfa] transition-colors">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-400 line-clamp-3">
                      {article.description}
                    </p>
                    <p className="mt-4 text-xs text-gray-600">
                      <time dateTime={article.publishedAt}>
                        {formatCardDate(article.publishedAt)}
                      </time>
                      {article.readingTimeMinutes
                        ? ` · ${article.readingTimeMinutes} min read`
                        : ""}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        <div className="mt-14">
          <SubscribeBox />
        </div>
      </div>
      <Footer showProjectLinks={false} />
    </div>
  );
}
