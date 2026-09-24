import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FormBuilderImage from "../../Assets/Form-builder.png";

const flagship = [
  {
    slug: "react-form-toaster",
    badge: "npm · v2.0.10",
    title: "React-Form-Toaster",
    tagline: "Schema-driven forms for React",
    description:
      "One JSON-like schema for fields, Zod validation, buttons, and toasts — modal or inline.",
    image: FormBuilderImage,
    glow: "from-indigo-500/25 via-purple-500/10 to-transparent",
    icon: "⚡",
    highlights: ["Zod", "Tailwind", "Toasts"],
    external: [
      { label: "Docs", href: "https://react-form-toaster.web.app/" },
      { label: "npm", href: "https://www.npmjs.com/package/react-form-toaster" },
    ],
  },
  {
    slug: "revenant",
    badge: "Go CLI · Apache-2.0",
    title: "Revenant",
    tagline: "Prove backups actually recover",
    description:
      "PostgreSQL checks from yaml, AWS RDS restore sandboxes, audit reports, and a GitHub Action.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    glow: "from-emerald-500/20 via-cyan-500/10 to-transparent",
    icon: "🛡",
    highlights: ["RDS", "Reports", "yaml"],
    external: [
      { label: "Site", href: "https://revenant-verify-933e4.web.app/" },
      { label: "CLI", href: "https://github.com/277pawan/revenant-cli" },
    ],
  },
];

export default function FeaturedProjects() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 mb-8">
      <div className="flex flex-col md:flex-row gap-6">
        {flagship.map((project, i) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="group relative flex-1 min-w-0"
          >
            <div
              className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${project.glow} opacity-50 group-hover:opacity-100 transition-opacity blur-sm`}
            />
            <div className="relative h-full flex flex-col rounded-3xl border border-white/10 bg-[#0c0c0c] overflow-hidden">
              <Link
                to={`/projects/${project.slug}`}
                className="relative h-40 overflow-hidden block"
              >
                <img
                  src={project.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] to-transparent" />
              </Link>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-lg">
                    {project.icon}
                  </span>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#7843e9]">
                    {project.badge}
                  </p>
                </div>

                <h3 className="text-xl md:text-2xl font-display font-bold text-white leading-tight">
                  {project.title}
                </h3>
                <p className="text-[#a78bfa] text-sm font-medium mt-1">
                  {project.tagline}
                </p>
                <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#7843e9]/10 border border-[#7843e9]/25 text-[#c4b5fd]"
                    >
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 flex flex-wrap items-center gap-2">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7843e9] hover:bg-[#6a35d9] text-white text-sm font-semibold transition-colors"
                  >
                    Explore →
                  </Link>
                  {project.external.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
