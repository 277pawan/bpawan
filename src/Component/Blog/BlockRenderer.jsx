import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function youtubeIdFrom(block) {
  if (block.youtubeId) return String(block.youtubeId).trim();
  const raw = block.youtubeUrl || block.url || block.embedUrl || "";
  if (!raw) return "";
  try {
    const u = new URL(raw, "https://youtube.com");
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/").filter(Boolean);
    const i = parts.findIndex((p) => ["embed", "shorts", "live", "v"].includes(p));
    if (i >= 0 && parts[i + 1]) return parts[i + 1];
    if (u.hostname.includes("youtu.be") && parts[0]) return parts[0];
  } catch {
    return "";
  }
  return "";
}

const CALLOUT_STYLES = {
  info: "border-blue-500/50 bg-blue-500/10 text-blue-100",
  tip: "border-emerald-500/50 bg-emerald-500/10 text-emerald-100",
  warning: "border-amber-500/50 bg-amber-500/10 text-amber-100",
  danger: "border-red-500/50 bg-red-500/10 text-red-100",
  note: "border-[#7843e9]/50 bg-[#7843e9]/10 text-purple-100",
};

function isObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function parseTreeData(block) {
  let data = block.data ?? block.json ?? block.value;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      return null;
    }
  }
  if (data == null) return null;
  if (isObject(data) && block.root) {
    return { [block.root]: data };
  }
  return data;
}

function treeKids(value) {
  if (isObject(value)) return Object.entries(value);
  if (Array.isArray(value)) return value.map((item, i) => [String(i), item]);
  return null;
}

function TreeNode({ name, value }) {
  const kids = treeKids(value);
  const leaf = kids == null;

  return (
    <li>
      <div className="json-tree-card">
        <span className={leaf ? "json-tree-val" : "json-tree-key"}>
          {leaf ? (value === null ? "null" : String(value)) : name}
        </span>
      </div>
      {kids && kids.length > 0 && (
        <ul>
          {kids.map(([k, v]) => (
            <TreeNode key={k} name={k} value={v} />
          ))}
        </ul>
      )}
    </li>
  );
}

function JsonTreeBlock({ block }) {
  const data = parseTreeData(block);
  if (data == null) return null;
  const entries = isObject(data) ? Object.entries(data) : [["value", data]];
  const rootName = entries.length === 1 ? entries[0][0] : block.root || "object";
  const rootValue = entries.length === 1 ? entries[0][1] : data;

  return (
    <figure className="my-8">
      {block.title && (
        <figcaption className="text-sm text-gray-400 mb-3">{block.title}</figcaption>
      )}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 px-6 py-10">
        <style>{`
          .json-tree, .json-tree ul { list-style: none; margin: 0; padding: 0; }
          .json-tree { display: flex; justify-content: center; min-width: max-content; }
          .json-tree ul {
            display: flex;
            justify-content: center;
            padding-top: 20px;
            position: relative;
          }
          .json-tree ul::before {
            content: "";
            position: absolute;
            top: 0;
            left: 50%;
            width: 1px;
            height: 20px;
            background: rgba(255,255,255,0.35);
          }
          .json-tree li {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            padding: 20px 14px 0;
          }
          .json-tree li::before,
          .json-tree li::after {
            content: "";
            position: absolute;
            top: 0;
            background: rgba(255,255,255,0.35);
          }
          .json-tree li::before {
            left: 0;
            width: 100%;
            height: 1px;
          }
          .json-tree li::after {
            left: 50%;
            width: 1px;
            height: 20px;
          }
          .json-tree li:first-child::before { left: 50%; width: 50%; }
          .json-tree li:last-child::before { width: 50%; }
          .json-tree li:only-child::before,
          .json-tree li:only-child::after { display: none; }
          .json-tree > li { padding-top: 0; }
          .json-tree > li::before,
          .json-tree > li::after { display: none; }
          .json-tree-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 4.5rem;
            max-width: 9rem;
            padding: 0.4rem 0.75rem;
            border: 1px solid rgba(255,255,255,0.16);
            border-radius: 0.5rem;
            background: #141414;
            z-index: 1;
          }
          .json-tree-key { font-family: ui-monospace, monospace; font-size: 12px; color: #a78bfa; }
          .json-tree-val { margin-top: 2px; font-size: 11px; color: #d1d5db; word-break: break-all; text-align: center; }
        `}</style>
        <ul className="json-tree">
          <TreeNode name={rootName} value={rootValue} />
        </ul>
      </div>
    </figure>
  );
}

function PollBlock({ block, articleSlug }) {
  const storageKey = `blog-poll-${articleSlug}-${block.id || block.question}`;
  const [selected, setSelected] = useState(() => {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  });

  const vote = (optionId) => {
    try {
      localStorage.setItem(storageKey, optionId);
    } catch {
      /* ignore */
    }
    setSelected(optionId);
  };

  return (
    <div className="my-8 rounded-xl border border-white/10 bg-white/5 p-6">
      <p className="text-lg font-semibold text-white mb-4">{block.question}</p>
      <ul className="space-y-2">
        {(block.options || []).map((opt) => {
          const id = opt.id || opt.label;
          const active = selected === id;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => vote(id)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                  active
                    ? "border-[#7843e9] bg-[#7843e9]/20 text-white"
                    : "border-white/10 hover:border-[#7843e9]/50 text-gray-200"
                }`}
              >
                {opt.label}
              </button>
            </li>
          );
        })}
      </ul>
      {block.hint && (
        <p className="mt-3 text-sm text-gray-500">{block.hint}</p>
      )}
    </div>
  );
}

function AccordionBlock({ block }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="my-8 space-y-2">
      {(block.items || []).map((item, i) => (
        <div
          key={item.title || i}
          className="rounded-lg border border-white/10 overflow-hidden"
        >
          <button
            type="button"
            className="w-full flex justify-between items-center px-4 py-3 text-left bg-white/5 hover:bg-white/10 text-white font-medium"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {item.title}
            <span className="text-[#7843e9]">{openIndex === i ? "−" : "+"}</span>
          </button>
          {openIndex === i && (
            <div className="px-4 py-3 text-gray-300 text-sm leading-relaxed border-t border-white/10">
              {item.body}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function FlowDiagramBlock({ block }) {
  const text =
    block.text ??
    (Array.isArray(block.lines) ? block.lines.join("\n") : "");
  if (!text.trim()) return null;
  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 px-6 py-8 flex justify-center">
        <pre className="m-0 text-sm md:text-base leading-relaxed">
          <code className="font-mono text-gray-100 whitespace-pre">{text}</code>
        </pre>
      </div>
      {block.caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

function CodeBlock({ block }) {
  return (
    <figure className="my-8">
      {block.filename && (
        <figcaption className="text-xs text-gray-500 mb-1 font-mono">
          {block.filename}
          {block.language ? ` · ${block.language}` : ""}
        </figcaption>
      )}
      <pre className="overflow-x-auto rounded-xl border border-white/10 bg-[#111] p-4 text-sm leading-relaxed">
        <code className={`language-${block.language || "text"} text-emerald-200/90`}>
          {block.code}
        </code>
      </pre>
      {block.caption && (
        <figcaption className="mt-2 text-sm text-gray-500">{block.caption}</figcaption>
      )}
    </figure>
  );
}

function Block({ block, articleSlug }) {
  switch (block.type) {
    case "heading": {
      const level = Math.min(4, Math.max(1, block.level || 2));
      const Tag = `h${level}`;
      const sizes = {
        1: "text-3xl md:text-4xl font-bold mt-12 mb-6",
        2: "text-2xl md:text-3xl font-bold mt-10 mb-4",
        3: "text-xl md:text-2xl font-semibold mt-8 mb-3",
        4: "text-lg font-semibold mt-6 mb-2",
      };
      return (
        <Tag
          id={block.id}
          className={`${sizes[level]} text-white scroll-mt-24`}
          style={block.color ? { color: block.color } : undefined}
        >
          {block.text}
        </Tag>
      );
    }
    case "paragraph":
    case "text":
      return (
        <p
          className="my-4 text-gray-300 leading-relaxed text-base md:text-lg"
          style={block.color ? { color: block.color } : undefined}
        >
          {block.text}
        </p>
      );
    case "richText":
      return (
        <div
          className="my-4 text-gray-300 leading-relaxed prose-invert"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case "image":
      return (
        <figure className="my-8">
          <img
            src={block.src}
            alt={block.alt || ""}
            className="w-full rounded-xl border border-white/10"
            loading="lazy"
          />
          {block.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "code":
      return <CodeBlock block={block} />;
    case "flowDiagram":
    case "flow":
      return <FlowDiagramBlock block={block} />;
    case "jsonTree":
    case "objectTree":
      return <JsonTreeBlock block={block} />;
    case "callout":
      return (
        <aside
          className={`my-6 rounded-xl border-l-4 px-4 py-3 ${CALLOUT_STYLES[block.variant] || CALLOUT_STYLES.note}`}
        >
          {block.title && (
            <p className="font-semibold mb-1 text-white">{block.title}</p>
          )}
          <p className="text-sm leading-relaxed opacity-95">{block.text}</p>
        </aside>
      );
    case "quote":
      return (
        <blockquote className="my-8 border-l-4 border-[#7843e9] pl-6 italic text-gray-300">
          <p>{block.text}</p>
          {block.cite && (
            <footer className="mt-2 text-sm not-italic text-gray-500">
              — {block.cite}
            </footer>
          )}
        </blockquote>
      );
    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      const listClass = block.ordered ? "list-decimal" : "list-disc";
      return (
        <ListTag
          className={`my-6 ml-6 space-y-2 text-gray-300 ${listClass} marker:text-[#7843e9]`}
        >
          {(block.items || []).map((item, i) => (
            <li key={i}>{typeof item === "string" ? item : item.text}</li>
          ))}
        </ListTag>
      );
    }
    case "checklist":
      return (
        <ul className="my-6 space-y-2">
          {(block.items || []).map((item, i) => (
            <li key={i} className="flex gap-3 text-gray-300">
              <span
                className={
                  item.checked
                    ? "text-emerald-400"
                    : "text-gray-600"
                }
              >
                {item.checked ? "☑" : "☐"}
              </span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="my-8 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            {block.caption && (
              <caption className="p-3 text-gray-400 caption-bottom">
                {block.caption}
              </caption>
            )}
            <thead className="bg-white/5 text-gray-200 uppercase text-xs">
              <tr>
                {(block.headers || []).map((h) => (
                  <th key={h} className="px-4 py-3 border-b border-white/10">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {(block.rows || []).map((row, ri) => (
                <tr key={ri} className="border-b border-white/5">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "divider":
      return (
        <hr
          className="my-10 border-0 h-px bg-gradient-to-r from-transparent via-[#7843e9]/50 to-transparent"
        />
      );
    case "spacer":
      return <div style={{ height: block.height || 24 }} aria-hidden />;
    case "link": {
      const label = block.label || block.href;
      const className =
        "text-[#a78bfa] underline underline-offset-4 hover:text-white";
      const internal = !block.external && block.href?.startsWith("/");
      return (
        <p className="my-4">
          {internal ? (
            <Link to={block.href} className={className}>
              {label}
            </Link>
          ) : (
            <a
              href={block.href}
              target={block.external ? "_blank" : undefined}
              rel={block.external ? "noopener noreferrer" : undefined}
              className={className}
            >
              {label}
            </a>
          )}
        </p>
      );
    }
    case "linkCard":
      return (
        <a
          href={block.href}
          target="_blank"
          rel="noopener noreferrer"
          className="my-6 block rounded-xl border border-white/10 bg-white/5 p-5 hover:border-[#7843e9]/50 transition-colors"
        >
          <p className="font-semibold text-white">{block.title}</p>
          {block.description && (
            <p className="mt-1 text-sm text-gray-400">{block.description}</p>
          )}
          <p className="mt-2 text-xs text-[#7843e9] truncate">{block.href}</p>
        </a>
      );
    case "poll":
      return <PollBlock block={block} articleSlug={articleSlug} />;
    case "color":
      return (
        <div className="my-4 inline-flex items-center gap-3 rounded-lg border border-white/10 px-4 py-2 mr-4">
          <span
            className="w-10 h-10 rounded-md border border-white/20 shrink-0"
            style={{ backgroundColor: block.hex }}
          />
          <div>
            <p className="text-white font-mono text-sm">{block.hex}</p>
            {block.name && (
              <p className="text-xs text-gray-500">{block.name}</p>
            )}
          </div>
        </div>
      );
    case "colorPalette":
      return (
        <div className="my-8 flex flex-wrap gap-3">
          {(block.colors || []).map((c) => (
            <div key={c.hex || c.name} className="text-center">
              <div
                className="w-16 h-16 rounded-lg border border-white/20"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
              <p className="mt-1 text-xs font-mono text-gray-400">{c.hex}</p>
            </div>
          ))}
        </div>
      );
    case "video": {
      if (block.comingSoon) {
        return (
          <figure className="my-8">
            {block.title && (
              <p className="text-sm text-gray-400 mb-2">{block.title}</p>
            )}
            <div className="aspect-video rounded-xl border border-dashed border-[#7843e9]/40 bg-[#7843e9]/5 flex flex-col items-center justify-center gap-2 px-6 text-center">
              <span className="text-3xl opacity-60" aria-hidden>
                ▶
              </span>
              <p className="text-white font-medium">
                {block.comingSoonMessage || "Video coming soon"}
              </p>
              {block.comingSoonHint && (
                <p className="text-sm text-gray-500 max-w-md">
                  {block.comingSoonHint}
                </p>
              )}
            </div>
          </figure>
        );
      }
      const id = youtubeIdFrom(block);
      const embed = id
        ? `https://www.youtube.com/embed/${id}`
        : block.embedUrl;
      if (!embed) return null;
      return (
        <figure className="my-8">
          {block.title && (
            <p className="text-sm text-gray-400 mb-2">{block.title}</p>
          )}
          <div className="aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
            <iframe
              title={block.title || "Video"}
              src={embed}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </figure>
      );
    }
    case "embed":
      return (
        <div className="my-8 rounded-xl overflow-hidden border border-white/10">
          <iframe
            title={block.title || "Embed"}
            src={block.url}
            className="w-full"
            style={{ height: block.height || 400 }}
          />
        </div>
      );
    case "accordion":
      return <AccordionBlock block={block} />;
    case "columns":
      return (
        <div
          className={`my-8 grid gap-6 ${
            block.columns?.length === 3
              ? "md:grid-cols-3"
              : "md:grid-cols-2"
          }`}
        >
          {(block.columns || []).map((col, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              {col.title && (
                <h4 className="font-semibold text-white mb-2">{col.title}</h4>
              )}
              <p className="text-sm text-gray-300 leading-relaxed">{col.body}</p>
            </div>
          ))}
        </div>
      );
    case "compare":
      return (
        <div className="my-8 grid md:grid-cols-2 gap-4">
          {[block.left, block.right].map(
            (side, i) =>
              side && (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 p-5 bg-white/5"
                >
                  <h4 className="text-[#7843e9] font-bold mb-2">{side.title}</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {(side.points || []).map((p, pi) => (
                      <li key={pi}>• {p}</li>
                    ))}
                  </ul>
                </div>
              )
          )}
        </div>
      );
    case "stats":
      return (
        <div className="my-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {(block.items || []).map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
            >
              <p className="text-2xl font-bold text-[#7843e9]">{s.value}</p>
              <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      );
    case "keyValue":
      return (
        <dl className="my-6 space-y-3">
          {(block.entries || []).map((e) => (
            <div key={e.term} className="grid md:grid-cols-3 gap-2 text-sm">
              <dt className="font-semibold text-white">{e.term}</dt>
              <dd className="md:col-span-2 text-gray-400">{e.definition}</dd>
            </div>
          ))}
        </dl>
      );
    case "tags":
      return (
        <div className="my-4 flex flex-wrap gap-2">
          {(block.items || []).map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-xs bg-[#7843e9]/20 text-[#c4b5fd] border border-[#7843e9]/30"
            >
              {t}
            </span>
          ))}
        </div>
      );
    case "timeline":
      return (
        <ol className="my-8 border-l border-[#7843e9]/40 ml-3 space-y-6">
          {(block.events || []).map((ev) => (
            <li key={ev.title} className="relative pl-6">
              <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#7843e9]" />
              <p className="text-xs text-gray-500">{ev.date}</p>
              <p className="font-semibold text-white">{ev.title}</p>
              {ev.description && (
                <p className="text-sm text-gray-400 mt-1">{ev.description}</p>
              )}
            </li>
          ))}
        </ol>
      );
    case "contribute":
      return (
        <div className="my-10 rounded-2xl border border-[#7843e9]/40 bg-gradient-to-br from-[#7843e9]/10 to-transparent p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-2">
            {block.title || "Contribute a topic"}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {block.text ||
              "Studied something worth sharing? Add a JSON article under src/content/blog/articles/ and open a PR. See BLOG_CONTENT.md for every block type."}
          </p>
          {block.repoUrl && (
            <a
              href={block.repoUrl}
              className="inline-block px-5 py-2 rounded-full bg-[#7843e9] text-white text-sm font-medium hover:bg-[#6a35d9]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {block.buttonLabel || "View on GitHub"}
            </a>
          )}
        </div>
      );
    case "related":
      return null;
    default:
      if (process.env.NODE_ENV === "development") {
        return (
          <p className="my-4 text-amber-400 text-sm font-mono">
            Unknown block type: {block.type}
          </p>
        );
      }
      return null;
  }
}

export default function BlockRenderer({ blocks, articleSlug }) {
  const safeBlocks = useMemo(() => blocks || [], [blocks]);
  return (
    <article className="max-w-7xl">
      {safeBlocks.map((block, index) => (
        <Block
          key={block.id || `${block.type}-${index}`}
          block={block}
          articleSlug={articleSlug}
        />
      ))}
    </article>
  );
}
