const fs = require("fs");
const path = require("path");

const slug = process.argv[2];
const notifyUrl = process.env.NOTIFY_URL || process.env.REACT_APP_BLOG_NOTIFY_URL || "";
const origin = (process.env.REACT_APP_SITE_URL || "https://two77pawan.onrender.com").replace(
  /\/$/,
  ""
);

if (!slug) {
  console.error("Usage: NOTIFY_URL=... npm run notify -- <slug>");
  process.exit(1);
}
if (!notifyUrl) {
  console.error("Set NOTIFY_URL");
  process.exit(1);
}

const file = path.join(__dirname, "../src/content/blog/articles", `${slug}.json`);
if (!fs.existsSync(file)) {
  console.error("No article JSON:", file);
  process.exit(1);
}

const article = JSON.parse(fs.readFileSync(file, "utf8"));
const payload = {
  slug: article.slug || slug,
  title: article.title,
  description: article.description,
  url: `${origin}/${article.slug || slug}`,
  tags: article.tags || [],
  publishedAt: article.publishedAt,
};

fetch(notifyUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
})
  .then(async (res) => {
    const text = await res.text();
    if (!res.ok) throw new Error(text || res.status);
    console.log("Notified", payload.slug);
  })
  .catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
