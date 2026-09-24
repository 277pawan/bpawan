import FeaturedProjects from "./FeaturedProjects";

function Projects() {
  return (
    <section
      id="projects"
      className="bg-[#0a0a0a] text-white py-16 scroll-mt-16"
      aria-labelledby="projects-heading"
    >
      <div className="flex flex-col items-center justify-center mb-12 px-4">
        <p className="text-[#7843e9] text-xs uppercase tracking-[0.35em] mb-2">
          Work
        </p>
        <h2
          id="projects-heading"
          className="text-lg md:text-4xl mb-4 text-center text-white uppercase tracking-[0.35rem] font-display font-bold"
        >
          Projects
        </h2>

        <div className="h-1.5 w-20 bg-[#7843e9] rounded-full mb-8" />

        <p className="w-[90%] md:w-[60vw] text-center text-base md:text-xl font-light text-gray-400 leading-relaxed">
          Flagship open-source tools first — then apps, experiments, and client
          work. Each card links to a live demo or repo.
        </p>
      </div>

      <FeaturedProjects />
    </section>
  );
}

export default Projects;
