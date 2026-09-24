# Engineering blog — JSON content guide

Add articles **without new React pages**. Drop a file in `src/content/blog/articles/your-slug.json`. Webpack picks it up at build time; routes and SEO are automatic.

**Quick start**

1. Copy `articles/article.template.json` → `articles/my-topic.json`
2. Set `slug`, `title`, `description`, `publishedAt`, and `blocks`
3. Run `npm start` → open `/engineering/my-topic`

**Full block showcase:** `/engineering/cap-theorem-block-demo` (every block type + video).
4. Before deploy: `npm run build` (regenerates `public/sitemap.xml`)

Set production URL (optional): `REACT_APP_SITE_URL=https://your-domain.com`

---

## Article root fields (SEO + listing)

| Field | Required | Purpose |
|--------|----------|---------|
| `slug` | yes* | URL segment `/engineering/{slug}`. Defaults to filename without `.json`. |
| `title` | yes | Page `<title>`, H1, Open Graph. |
| `description` | yes | Meta description (~150–160 chars). |
| `blocks` | yes | Array of content blocks (see below). |
| `keywords` | recommended | Meta keywords (array of strings). |
| `tags` | recommended | Shown on cards; used for related articles. |
| `author` | optional | Defaults to site author. |
| `publishedAt` | recommended | ISO date `YYYY-MM-DD`. Sort order on index. |
| `updatedAt` | optional | Schema.org `dateModified`. |
| `category` | optional | Eyebrow label on article page. |
| `coverImage` | optional | Hero + listing card. Absolute URL or site path. |
| `ogImage` | optional | Social preview; falls back to `coverImage`. |
| `readingTimeMinutes` | optional | Shown on cards and header. |
| `featured` | optional | Reserved for future “featured” UI. |
| `relatedSlugs` | optional | Other article slugs for “Related topics”. |
| `canonicalUrl` | optional | Override canonical link (else auto-generated). |

\*If `slug` is omitted, the filename (e.g. `redundancy.json` → `redundancy`) is used.

**Do not commit** `article.template.json` as a live article — it is documentation only (excluded from sitemap by filename prefix `article.template`).

---

## Block types reference

Every block has `"type": "<name>"`. Optional `"id"` helps headings (anchor links) and polls (localStorage key).

### Text & structure

| type | Fields | Notes |
|------|--------|--------|
| `heading` | `text`, `level` (1–4), optional `id`, optional `color` | Sets in-page anchor when `id` set. |
| `paragraph` | `text`, optional `color` | Body copy. |
| `text` | same as `paragraph` | Alias. |
| `richText` | `html` | **Trusted content only** — raw HTML string. |
| `divider` | — | Horizontal rule. |
| `spacer` | optional `height` (px) | Vertical gap; default 24. |

### Media

| type | Fields |
|------|--------|
| `image` | `src`, `alt`, optional `caption` |
| `video` | `youtubeUrl` (watch/share link), `youtubeId`, or `embedUrl`. Optional `title`. Or `comingSoon: true`. |
| `embed` | `url`, optional `title`, optional `height` (default 400) |

### Code & data

| type | Fields |
|------|--------|
| `code` | `code`, optional `language`, optional `filename`, optional `caption` |
| `jsonTree` | `data` (object or JSON string), optional `root`, optional `title`. Alias: `objectTree`. |
| `table` | `headers` (array), `rows` (array of arrays), optional `caption` |
| `list` | `items` (strings or `{text}`), optional `ordered` (boolean) |
| `checklist` | `items`: `{ text, checked }` |
| `keyValue` | `entries`: `{ term, definition }` |
| `stats` | `items`: `{ label, value }` |
| `timeline` | `events`: `{ date, title, optional description }` |

### Emphasis & layout

| type | Fields |
|------|--------|
| `callout` | `text`, optional `title`, `variant`: `info` \| `tip` \| `warning` \| `danger` \| `note` |
| `quote` | `text`, optional `cite` |
| `columns` | `columns`: `{ title, body }` (2 or 3 columns) |
| `compare` | `left`, `right`: `{ title, points[] }` |
| `accordion` | `items`: `{ title, body }` |
| `tags` | `items`: string array (hashtag-style chips in body) |

### Interactive & theme

| type | Fields |
|------|--------|
| `poll` | `question`, `options`: `{ id, label }`, optional `id`, optional `hint` | Votes stored in `localStorage` (demo / engagement). |
| `color` | `hex`, optional `name` | Single swatch. |
| `colorPalette` | `colors`: `{ hex, name? }` |

### Links & community

| type | Fields |
|------|--------|
| `link` | `href`, optional `label`, optional `external` (boolean). Internal paths like `/engineering/redundancy` use client routing. |
| `linkCard` | `href`, `title`, optional `description` | External card (opens new tab). |
| `contribute` | optional `title`, `text`, `repoUrl`, `buttonLabel` | CTA for PR contributions. |

### Reserved

| type | Notes |
|------|--------|
| `related` | Ignored in body — use root `relatedSlugs` instead. |

Unknown `type` values show a dev-only warning; production skips them.

---

## Full block examples

### Heading with anchor

```json
{ "type": "heading", "level": 2, "id": "failure-modes", "text": "Failure modes" }
```

### Callout

```json
{
  "type": "callout",
  "variant": "warning",
  "title": "Watch out",
  "text": "Failover without tests is wishful thinking."
}
```

### Code

```json
{
  "type": "code",
  "language": "python",
  "filename": "retry.py",
  "code": "for attempt in range(3):\n    try:\n        break\n    except TransientError:\n        time.sleep(2 ** attempt)"
}
```

### Poll

```json
{
  "type": "poll",
  "id": "poll-unique-id",
  "question": "Which layer do you harden first?",
  "options": [
    { "id": "a", "label": "Load balancer" },
    { "id": "b", "label": "Database" }
  ],
  "hint": "Local demo poll — not aggregated server-side."
}
```

### Compare two sides

```json
{
  "type": "compare",
  "left": { "title": "Sync replication", "points": ["Strong consistency", "Higher latency"] },
  "right": { "title": "Async replication", "points": ["Better latency", "Possible lag"] }
}
```

---

## SEO checklist per article

- [ ] Unique `title` and `description` targeting real search phrases (e.g. “redundancy”, “idempotency key”).
- [ ] `keywords` and `tags` aligned with content.
- [ ] `publishedAt` set; update `updatedAt` when content changes.
- [ ] `coverImage` / `ogImage` with absolute HTTPS URLs when possible.
- [ ] Run `npm run build` so `sitemap.xml` includes `/engineering/{slug}`.
- [ ] After deploy, submit sitemap in Google Search Console: `https://your-domain.com/sitemap.xml`

Runtime SEO (per route): `<title>`, meta description/keywords, Open Graph, Twitter cards, canonical URL, JSON-LD `TechArticle` + `BreadcrumbList` (see `SeoHead.jsx`).

---

## Contributing topics

1. Fork [GitHub](https://github.com/277pawan) (update URL if repo moves).
2. Add `src/content/blog/articles/your-topic.json`.
3. Follow this doc; **showcase article**: `redundancy.json` uses most block types.
4. Open a PR with a short summary of what you studied.

---

## Likes / subscribe / notify

Paste URLs in `src/content/blog/blogApi.js`. Notify a new post:

`NOTIFY_URL=https://your-api/notify npm run notify -- <slug>`

### Like identity (no login)

Source of truth is an **HttpOnly cookie** from your API, not localStorage. localStorage is only a fast UI cache. If storage is cleared but the cookie stays, GET still returns `liked: true`.

If **both** cookie and storage are gone, that person can like again. Acceptable without accounts.

**Create API**

1. Table `likes`: `slug` + `visitor_id` UNIQUE, plus `created_at`.
2. On every like GET/POST: if request has no `visitor_id` cookie, create a UUID and `Set-Cookie`:
   `visitor_id=<uuid>; Max-Age=63072000; Path=/; HttpOnly; Secure; SameSite=None`
   (`SameSite=None; Secure` is required because the site and API are different origins.)
3. Identity order: cookie first. If no cookie, use body/query `visitorId` once, then set the cookie to that value so next visits match.
4. GET `/likes?slug=` → `{ likes: 12, liked: true|false }` (`liked` = row exists for this cookie).
5. POST `/likes` `{ slug, action: "like"|"unlike", visitorId? }` → insert or delete that unique row, return `{ likes, liked }`. Duplicate like = no-op, same count.
6. CORS: `Access-Control-Allow-Origin: https://your-site.com` (not `*`), `Allow-Credentials: true`.

**This frontend already**

- Sends `credentials: "include"` so the cookie is stored/sent.
- Sends `visitorId` as fallback on first request.
- Reads `liked` + `likes` from GET to paint the heart.

**Subscribe**

POST `{ email, scope, slug, tags, title }` with the same cookie. Store email + scope. Optional: also store `visitor_id`. Notify is still `npm run notify -- <slug>` after deploy.

---

## File map

| Path | Role |
|------|------|
| `src/content/blog/articles/*.json` | Article data |
| `src/content/blog/loadArticles.js` | Loader |
| `src/Component/Blog/BlockRenderer.jsx` | Renders all block types |
| `src/Component/Blog/SeoHead.jsx` | Meta + JSON-LD |
| `scripts/generate-sitemap.js` | Sitemap generator |
| `public/sitemap.xml` | Crawler URL list |

Routes: `/engineering` (index), `/engineering/:slug` (article).
