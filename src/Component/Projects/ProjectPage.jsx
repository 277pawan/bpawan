import { Link, Navigate, useParams } from "react-router-dom";
import { getProjectBySlug } from "../../content/projects/loadProjects";
import BlockRenderer from "../Blog/BlockRenderer";
import SeoHead from "../Blog/SeoHead";
import Footer from "../Footer/Footer";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <Navigate to="/#projects" replace />;
  }

  const pageSeo = {
    title: `${project.title} | Pawan Bisht`,
    description: project.description,
    keywords: (project.keywords || []).join(", "),
    path: `/projects/${project.slug}`,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-0 flex flex-col">
      <SeoHead pageSeo={pageSeo} />
      <div className="max-w-4xl mx-auto px-6 flex-1 pb-16">
        <nav className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-[#7843e9]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/?section=projects" className="hover:text-[#7843e9]">
            Projects
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-400">{project.title}</span>
        </nav>

        <header className="mb-10">
          {project.badge && (
            <p className="text-[#7843e9] uppercase tracking-[0.3em] text-xs mb-3">
              {project.badge}
            </p>
          )}
          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-3">
            {project.title}
          </h1>
          {project.tagline && (
            <p className="text-xl text-[#a78bfa] mb-4">{project.tagline}</p>
          )}
          <p className="text-lg text-gray-400 leading-relaxed">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.exploreUrl && (
              <a
                href={project.exploreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#7843e9] hover:bg-[#6a35d9] text-sm font-semibold"
              >
                {project.exploreLabel || "Live site"}
              </a>
            )}
            {project.npmUrl && (
              <a
                href={project.npmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl border border-white/15 text-sm hover:border-[#7843e9]/50"
              >
                npm
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl border border-white/15 text-sm hover:border-[#7843e9]/50"
              >
                GitHub
              </a>
            )}
          </div>
          {project.coverImage && (
            <img
              src={project.coverImage}
              alt=""
              className="mt-10 w-full rounded-2xl border border-white/10 max-h-[420px] object-cover"
            />
          )}
        </header>

        <BlockRenderer blocks={project.blocks} articleSlug={`project-${project.slug}`} />
      </div>
      <Footer showProjectLinks={false} />
    </div>
  );
}
