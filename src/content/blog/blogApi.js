export const BLOG_API = {
  likeUrl: process.env.REACT_APP_BLOG_LIKE_URL || "",
  likeCountUrl: process.env.REACT_APP_BLOG_LIKE_COUNT_URL || "",
  subscribeUrl: process.env.REACT_APP_BLOG_SUBSCRIBE_URL || "",
};

const VISITOR_KEY = "blog-visitor-id";

export function getVisitorId() {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

export async function postJson(url, body) {
  if (!url) return { ok: false, skipped: true };
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText || "Request failed");
  return data;
}

export async function getJson(url) {
  if (!url) return null;
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) return null;
  return res.json().catch(() => null);
}
