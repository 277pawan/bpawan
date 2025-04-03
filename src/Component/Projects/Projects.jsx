import "./Projects.css";
// import proj1 from "../../Assets/Lap1.png";
// import proj2 from "../../Assets/Lap2.png";
// import proj3 from "../../Assets/Lap3.png";
// import proj4 from "../../Assets/Lap4.png";
import One from "../Gallery/One.tsx";
function Projects() {
  return (
    <>
      <div id="projects" className="bg-[#0a0a0a] text-white">
        <div className="projectbox1">
          <div className="text-lg md:text-4xl mb-4 text-center text-white dark:text-white max-w-full uppercase tracking-[0.5rem] font-bold">
            Projects
          </div>{" "}
          <hr
            style={{
              height: "5px",
              width: "80px",
              backgroundColor: "#7843e9",
              borderRadius: "10px",
            }}
          ></hr>
          <div className="project1desc">
            Here you will find some of the personal and clients projects that I
            created with each project containing its own URL.
          </div>
        </div>
        <One />
      </div>
    </>
  );
}

export default Projects;
