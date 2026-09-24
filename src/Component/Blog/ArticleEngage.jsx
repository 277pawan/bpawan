import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BLOG_API, getJson, getVisitorId, postJson } from "../../content/blog/blogApi";

const likedKey = (slug) => `blog-liked-${slug}`;
const countKey = (slug) => `blog-like-count-${slug}`;

export function LikeButton({ slug, compact }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [pop, setPop] = useState(0);

  useEffect(() => {
    try {
      setLiked(localStorage.getItem(likedKey(slug)) === "1");
      setCount(Number(localStorage.getItem(countKey(slug)) || 0));
    } catch {}
    const visitorId = getVisitorId();
    const url = BLOG_API.likeCountUrl
      ? `${BLOG_API.likeCountUrl}${BLOG_API.likeCountUrl.includes("?") ? "&" : "?"}slug=${encodeURIComponent(slug)}&visitorId=${encodeURIComponent(visitorId)}`
      : "";
    getJson(url).then((data) => {
      if (typeof data?.likes === "number") {
        setCount(data.likes);
        try {
          localStorage.setItem(countKey(slug), String(data.likes));
        } catch {}
      }
      if (typeof data?.liked === "boolean") {
        setLiked(data.liked);
        try {
          localStorage.setItem(likedKey(slug), data.liked ? "1" : "0");
        } catch {}
      }
    });
  }, [slug]);

  const toggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !liked;
    const nextCount = Math.max(0, count + (next ? 1 : -1));
    setLiked(next);
    setCount(nextCount);
    if (next) setPop((n) => n + 1);
    try {
      localStorage.setItem(likedKey(slug), next ? "1" : "0");
      localStorage.setItem(countKey(slug), String(nextCount));
    } catch {}
    try {
      const data = await postJson(BLOG_API.likeUrl, {
        slug,
        visitorId: getVisitorId(),
        action: next ? "like" : "unlike",
      });
      if (typeof data?.likes === "number") {
        setCount(data.likes);
        localStorage.setItem(countKey(slug), String(data.likes));
      }
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={liked}
      aria-label={liked ? "Unlike" : "Like"}
      className={`inline-flex items-center gap-1.5 shrink-0 rounded-full border transition-colors ${
        compact ? "px-2.5 py-1 text-xs" : "px-3.5 py-2 text-sm"
      } ${
        liked
          ? "border-rose-400/40 bg-rose-500/15 text-rose-300"
          : "border-white/10 text-gray-400 hover:border-rose-400/40 hover:text-rose-200"
      }`}
    >
      <motion.span
        key={pop}
        aria-hidden
        initial={pop ? { scale: 0.4, rotate: -20 } : false}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 12 }}
        className={`inline-block ${liked ? "text-rose-400" : ""}`}
      >
        {liked ? "♥" : "♡"}
      </motion.span>
      <span className="tabular-nums">{count}</span>
    </button>
  );
}

export function SubscribeBox({ article, compact }) {
  const [email, setEmail] = useState("");
  const [scope, setScope] = useState(article ? "topic" : "all");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    setStatus("");
    try {
      const data = await postJson(BLOG_API.subscribeUrl, {
        email,
        scope,
        slug: article?.slug || null,
        tags: article?.tags || [],
        title: article?.title || "Engineering concepts",
      });
      if (data.skipped) {
        setStatus("Add your subscribe API URL in src/content/blog/blogApi.js");
      } else {
        setStatus("You're on the list. New posts matching this will email you.");
        setEmail("");
      }
    } catch (err) {
      setStatus(err.message || "Could not subscribe. Try again later.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className={
        compact
          ? "rounded-2xl border border-white/10 p-5"
          : "rounded-2xl border border-[#7843e9]/30 bg-[#7843e9]/5 p-6 md:p-8"
      }
    >
      <h3 className="text-lg font-display font-bold text-white">
        {article ? "Email me on this topic" : "Get new concepts by email"}
      </h3>
      <p className="mt-1 text-sm text-gray-400">
        {article
          ? "This article, or every new engineering post."
          : "One mail when a new article ships."}
      </p>
      <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
        {article && (
          <div className="flex flex-wrap gap-3 text-sm text-gray-400">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="scope"
                checked={scope === "topic"}
                onChange={() => setScope("topic")}
              />
              This topic
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="scope"
                checked={scope === "all"}
                onChange={() => setScope("all")}
              />
              All new posts
            </label>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#7843e9]/60"
          />
          <button
            type="submit"
            disabled={busy}
            className="px-5 py-2.5 rounded-xl bg-[#7843e9] hover:bg-[#6a35d9] text-sm font-semibold disabled:opacity-50"
          >
            {busy ? "Saving…" : "Subscribe"}
          </button>
        </div>
      </form>
      {status && <p className="mt-3 text-sm text-gray-400">{status}</p>}
    </div>
  );
}

export default function ArticleEngage({ article }) {
  return (
    <section className="mt-14 pt-10 border-t border-white/10">
      <SubscribeBox article={article} />
    </section>
  );
}
