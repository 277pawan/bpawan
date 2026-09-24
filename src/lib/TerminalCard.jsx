import { useState, useEffect } from "react";

const coder = {
  name: "Pawan Bisht",
  role: "Full Stack · Open Source",
  location: "Dehradun, India",
  skills: ["React", "TypeScript", "Go", "PostgreSQL", "npm libs"],
  traits: ["Hard Worker", "Quick Learner", "Problem Solver"],
  stats: {
    experience: "2+ yrs",
    projects: "25+",
    availability: "Open to work",
  },
  contact: {
    github: "github.com/277pawan",
    linkedin: "linkedin.com/in/pawan-bisht-a943161b9",
  },
};

const codeLines = [
  [
    ["keyword", "const "],
    ["variable", "coder"],
    ["plain", " = {"],
  ],
  [
    ["key", "  name"],
    ["plain", ": "],
    ["string", `"${coder.name}"`],
    ["plain", ","],
  ],
  [
    ["key", "  role"],
    ["plain", ": "],
    ["string", `"${coder.role}"`],
    ["plain", ","],
  ],
  [
    ["key", "  skills"],
    ["plain", ": ["],
    ["string", '"React"'],
    ["plain", ", "],
    ["string", '"NextJS"'],
    ["plain", ", "],
    ["string", '"Nodejs"'],
    ["plain", ", "],
    ["string", '"Sql/Nosql"'],
    ["plain", ", "],
    ["string", '"Mongodb"'],
    ["plain", ", "],
    ["string", '"AI"'],
    ["plain", "],"],
  ],
  [
    ["key", "  hireable"],
    ["plain", ": "],
    ["boolean", "true"],
    ["plain", ","],
  ],
  [["plain", "};"]],
];

function tokenClass(type) {
  switch (type) {
    case "keyword":
      return "token-keyword";
    case "variable":
      return "token-variable";
    case "key":
      return "token-key";
    case "string":
      return "token-string";
    case "boolean":
      return "token-boolean";
    default:
      return "token-plain";
  }
}

export function TerminalCodeCard() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [typed, setTyped] = useState(false);

  useEffect(() => {
    if (visibleLines < codeLines.length) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), 120);
      return () => clearTimeout(t);
    } else {
      setTyped(true);
    }
  }, [visibleLines]);

  useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Syne:wght@400;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #060a10;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          font-family: 'Syne', sans-serif;
          padding: 21px;
        }

        .card {
          width: 100%;
          max-width: 605px;
          background: #0d1117;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.03), 0 24px 64px rgba(0,0,0,0.6), 0 0 80px rgba(99,210,160,0.04);
          animation: fadeUp 0.6s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── title bar ── */
        .titlebar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #161b22;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 10px 14px;
        }
        .dots { display: flex; gap: 6px; }
        .dot {
          width: 11px; height: 11px;
          border-radius: 50%;
        }
        .dot-r { background: #ff5f56; }
        .dot-y { background: #ffbd2e; }
        .dot-g { background: #27c93f; }
        .tab-name {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #6e7681;
          letter-spacing: 0.5px;
        }
        .live-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 1.5px;
          color: #3fb950;
          border: 1px solid rgba(63,185,80,0.25);
          background: rgba(63,185,80,0.08);
          padding: 2px 7px;
          border-radius: 4px;
        }

        /* ── body ── */
        .body { padding: 16px; }

        /* profile row */
        .profile-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 14px;
        }
        .profile-name {
          font-size: 15px;
          font-weight: 700;
          color: #e6edf3;
          letter-spacing: -0.3px;
        }
        .profile-role {
          font-size: 11px;
          color: #6e7681;
          margin-top: 2px;
        }
        .avail-badge {
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
          color: #3fb950;
          border: 1px solid rgba(63,185,80,0.2);
          background: rgba(63,185,80,0.07);
          padding: 4px 10px;
          border-radius: 20px;
        }

        /* stats */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-bottom: 14px;
        }
        .stat-cell {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 8px;
          padding: 8px 10px;
        }
        .stat-label {
          font-size: 9px;
          color: #484f58;
          letter-spacing: 0.5px;
          margin-bottom: 3px;
          font-family: 'JetBrains Mono', monospace;
        }
        .stat-value {
          font-size: 13px;
          font-weight: 600;
          color: #e6edf3;
        }

        /* code block */
        .code-block {
          display: grid;
          grid-template-columns: 30px 1fr;
          background: #080d14;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 14px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
        }
        .line-numbers {
          border-right: 1px solid rgba(255,255,255,0.05);
          padding: 12px 6px;
          text-align: right;
          color: #3d444d;
          font-size: 11px;
          line-height: 22px;
          user-select: none;
        }
        .code-content {
          padding: 12px;
          overflow-x: hidden;
        }
        .code-line {
          line-height: 22px;
          white-space: pre;
          opacity: 0;
          animation: lineIn 0.15s ease forwards;
        }
        @keyframes lineIn {
          from { opacity: 0; transform: translateX(-4px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .token-keyword  { color: #79c0ff; }
        .token-variable { color: #cae8ff; }
        .token-key      { color: #ffa657; }
        .token-string   { color: #a5d6ff; }
        .token-boolean  { color: #d2a8ff; }
        .token-plain    { color: #8b949e; }

        .cursor {
          display: inline-block;
          width: 7px;
          height: 14px;
          background: #3fb950;
          vertical-align: middle;
          border-radius: 1px;
          margin-left: 1px;
        }

        /* skills */
        .skills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 14px;
        }
        .skill-tag {
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
          color: #a5b4fc;
          border: 1px solid rgba(165,180,252,0.2);
          background: rgba(165,180,252,0.06);
          padding: 4px 10px;
          border-radius: 20px;
          letter-spacing: 0.3px;
        }

        /* bottom grid */
        .bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .panel {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 10px;
          padding: 12px;
        }
        .panel-label {
          font-size: 9px;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 1.5px;
          color: #484f58;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .trait-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #8b949e;
          margin-bottom: 7px;
          font-family: 'JetBrains Mono', monospace;
        }
        .trait-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #3fb950;
          flex-shrink: 0;
        }
        .link {
          display: block;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #6e7681;
          text-decoration: none;
          margin-bottom: 7px;
          transition: color 0.15s;
          word-break: break-all;
        }
        .link:hover { color: #e6edf3; }
      `}</style>

      <div className="card">
        {/* Title bar */}
        <div className="titlebar">
          <div className="dots">
            <span className="dot dot-r" />
            <span className="dot dot-y" />
            <span className="dot dot-g" />
          </div>
          <span className="tab-name">coder.ts</span>
          <span className="live-badge">LIVE</span>
        </div>

        <div className="body">
          {/* Profile */}
          <div className="profile-row">
            <div>
              <div className="profile-name">{coder.name}</div>
              <div className="profile-role">{coder.role}</div>
            </div>
            <span className="avail-badge">{coder.stats.availability}</span>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-cell">
              <div className="stat-label">Experience</div>
              <div className="stat-value">{coder.stats.experience}</div>
            </div>
            <div className="stat-cell">
              <div className="stat-label">Projects</div>
              <div className="stat-value">{coder.stats.projects}</div>
            </div>
            <div className="stat-cell">
              <div className="stat-label">Location</div>
              <div className="stat-value" style={{ fontSize: 11 }}>
                {coder.location}
              </div>
            </div>
          </div>

          {/* Code block */}
          <div className="code-block">
            <div className="line-numbers">
              {codeLines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="code-content">
              {codeLines.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  className="code-line"
                  style={{ animationDelay: `${i * 0.02}s` }}
                >
                  {line.map(([type, val], j) => (
                    <span key={j} className={tokenClass(type)}>
                      {val}
                    </span>
                  ))}
                  {i === visibleLines - 1 && !typed && (
                    <span
                      className="cursor"
                      style={{ opacity: cursorVisible ? 1 : 0 }}
                    />
                  )}
                </div>
              ))}
              {typed && (
                <div className="code-line" style={{ animationDelay: "0s" }}>
                  <span className="token-plain">
                    <span
                      className="cursor"
                      style={{ opacity: cursorVisible ? 1 : 0 }}
                    />
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="skills-row">
            {coder.skills.map((s) => (
              <span key={s} className="skill-tag">
                {s}
              </span>
            ))}
          </div>

          {/* Traits + Connect */}
          <div className="bottom-grid">
            <div className="panel">
              <div className="panel-label">Traits</div>
              {coder.traits.map((t) => (
                <div key={t} className="trait-item">
                  <span className="trait-dot" />
                  {t}
                </div>
              ))}
            </div>
            <div className="panel">
              <div className="panel-label">Connect</div>
              <a
                href={`https://${coder.contact.github}`}
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                {coder.contact.github}
              </a>
              <a
                href={`https://${coder.contact.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                {coder.contact.linkedin}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
