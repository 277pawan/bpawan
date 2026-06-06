const coder = {
  name: "Pawan Bisht",
  role: "Full Stack Developer",
  location: "Dehradun, Uttarakhand, India",
  skills: [
    "React",
    "NextJS",
    "TypeScript",
    "NodeJS",
    "TailwindCSS",
    "Laravel",
    "MySQL",
    "MongoDB",
    "PostgreSQL",
  ],
  traits: {
    hardWorker: true,
    quickLearner: true,
    problemSolver: true,
  },
  stats: {
    experience: "2+ years",
    projects: "20+",
    availability: "Open to work",
  },
  contact: {
    email: "bpawan277@gmail.com",
    github: "https://github.com/277pawan",
    linkedin: "https://www.linkedin.com/in/pawan-bisht-a943161b9/",
    portfolio: "https://yourportfolio.com",
  },
};

const isHireable =
  coder.traits.hardWorker &&
  coder.traits.problemSolver &&
  coder.skills.length >= 5;

const codeLines = [
  "const coder = {",
  `  name: "${coder.name}",`,
  `  role: "${coder.role}",`,
  `  location: "${coder.location}",`,
  "  skills: [",
  ...coder.skills.map((skill, index) => {
    const isLast = index === coder.skills.length - 1;
    return `    "${skill}"${isLast ? "" : ","}`;
  }),
  "  ],",
  "  traits: {",
  `    hardWorker: ${coder.traits.hardWorker},`,
  `    quickLearner: ${coder.traits.quickLearner},`,
  `    problemSolver: ${coder.traits.problemSolver},`,
  "  },",
  "  stats: {",
  `    experience: "${coder.stats.experience}",`,
  `    projects: "${coder.stats.projects}",`,
  `    availability: "${coder.stats.availability}",`,
  "  },",
  "  contact: {",
  `    email: "${coder.contact.email}",`,
  `    github: "${coder.contact.github}",`,
  `    linkedin: "${coder.contact.linkedin}",`,
  `    portfolio: "${coder.contact.portfolio}",`,
  "  },",
  `  hireable: ${isHireable},`,
  "};",
];

function highlightLine(line) {
  return line
    .replace(
      /^(const|true|false)\b/g,
      (match) => `<span class="text-sky-400 font-medium">${match}</span>`,
    )
    .replace(
      /\b(name|role|location|skills|traits|hardWorker|quickLearner|problemSolver|stats|experience|projects|availability|contact|email|github|linkedin|portfolio|hireable)\b(?=:)/g,
      (match) => `<span class="text-orange-300">${match}</span>`,
    )
    .replace(
      /"([^"]*)"/g,
      (_, match) => `<span class="text-emerald-300">"${match}"</span>`,
    )
    .replace(
      /\b\d+\b/g,
      (match) => `<span class="text-amber-300">${match}</span>`,
    );
}

export function TerminalCodeCard() {
  return (
    <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
      <div className="flex items-center justify-between border-b border-white/5 bg-[#161b22] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>

        <div className="text-xs tracking-wide text-zinc-400">
          coder-profile.ts
        </div>

        <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-400">
          NORMAL
        </div>
      </div>

      <div className="grid grid-cols-[52px_1fr] text-sm font-mono sm:text-[15px]">
        <div className="select-none border-r border-white/5 bg-[#0a0f1a] px-3 py-5 text-right leading-8 text-zinc-600">
          {codeLines.map((_, index) => (
            <div key={index}>{index + 1}</div>
          ))}
        </div>

        <div className="overflow-x-auto px-5 py-5">
          {codeLines.map((line, index) => (
            <div
              key={index}
              className="whitespace-pre leading-8 text-zinc-200"
              dangerouslySetInnerHTML={{ __html: highlightLine(line) }}
            />
          ))}

          <div className="mt-2 flex items-center gap-2 text-zinc-400">
            <span className="text-sky-400">{">"}</span>
            <span>status: hireable = {String(isHireable)}</span>
            <span className="inline-block h-5 w-2 animate-pulse rounded-sm bg-emerald-400" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 bg-[#111827] px-4 py-2 text-xs text-zinc-400">
        <span>utf-8</span>
        <span>TypeScript React</span>
        <span>Ln {codeLines.length}, Col 1</span>
      </div>
    </div>
  );
}

export function SkillPills() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {coder.skills.map((skill) => (
        <span
          key={skill}
          className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}
