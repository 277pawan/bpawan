// import "./Projects.css"; // Removing CSS dependency
import One from "../Gallery/One.tsx";

function Projects() {
  return (
    <section id="projects" className="bg-[#0a0a0a] text-white py-16 scroll-mt-16">
      <div className="flex flex-col items-center justify-center mb-12">
        <h2 className="text-lg md:text-4xl mb-4 text-center text-white uppercase tracking-[0.5rem] font-bold">
          Projects
        </h2>

        <div className="h-1.5 w-20 bg-[#7843e9] rounded-full mb-8"></div>

        <p className="w-[90%] md:w-[60vw] text-center text-xl md:text-2xl font-light text-gray-300 leading-relaxed" style={{ fontFamily: "itim" }}>
          Here you will find some of the personal and clients projects that I
          created with each project containing its own URL.
        </p>
      </div>

      <One />
    </section>
  );
}

export default Projects;
