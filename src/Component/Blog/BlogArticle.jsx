import { Link, useParams, Navigate } from "react-router-dom";
import { getArticleBySlug, getAllArticles } from "../../content/blog/loadArticles";
import BlockRenderer from "./BlockRenderer";
import SeoHead from "./SeoHead";
import Footer from "../Footer/Footer";
import ArticleEngage, { LikeButton } from "./ArticleEngage";

function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function BlogArticle() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  if (!article) {
    return <Navigate to="/engineering" replace />;
  }

  const related = (article.relatedSlugs || [])
    .map((s) => getArticleBySlug(s))
    .filter(Boolean);

  const moreRelated = getAllArticles()
    .filter(
      (a) =>
        a.slug !== article.slug &&
        !(article.relatedSlugs || []).includes(a.slug) &&
        (a.tags || []).some((t) => (article.tags || []).includes(t))
    )
    .slice(0, 2);

  const relatedAll = [...related, ...moreRelated].slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-0 flex flex-col">
      <SeoHead article={article} />
      <div className="max-w-4xl mx-auto px-6 flex-1 pb-16">
        <nav className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-[#7843e9]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/engineering" className="hover:text-[#7843e9]">
            Engineering
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-400">{article.title}</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              {article.category && (
                <p className="text-[#7843e9] uppercase tracking-[0.3em] text-xs mb-3">
                  {article.category}
                </p>
              )}
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                {article.title}
              </h1>
            </div>
            <LikeButton slug={article.slug} />
          </div>
          <p className="text-lg text-gray-400 leading-relaxed">
            {article.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span>{article.author || "Pawan Bisht"}</span>
            <span>·</span>
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
            {article.readingTimeMinutes && (
              <>
                <span>·</span>
                <span>{article.readingTimeMinutes} min read</span>
              </>
            )}
          </div>
          {(article.tags || []).length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full border border-white/10 text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {article.coverImage && (
            <img
              src={article.coverImage}
              alt=""
              className="mt-10 w-full rounded-2xl border border-white/10"
            />
          )}
        </header>

        <BlockRenderer blocks={article.blocks} articleSlug={article.slug} />

        <ArticleEngage article={article} />

        {relatedAll.length > 0 && (
          <section className="mt-16 pt-10 border-t border-white/10">
            <h2 className="text-xl font-bold mb-6">Related topics</h2>
            <ul className="space-y-3">
              {relatedAll.map((a) => (
                <li key={a.slug}>
                  <Link
                    to={`/engineering/${a.slug}`}
                    className="text-[#a78bfa] hover:text-white transition-colors"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      <Footer showProjectLinks={false} />
    </div>
  );
}
