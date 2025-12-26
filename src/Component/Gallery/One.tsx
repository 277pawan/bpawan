import React from "react";
import { motion } from "framer-motion";

// IMAGES
import geoLocationImage from "../../Assets/geolocation.png";
import BankistImage from "../../Assets/Bankist.png";
import FormBuilderImage from "../../Assets/Form-builder.png";
import AgriThreadImage from "../../Assets/AgriThread.png";
import HabitIdentityImage from "../../Assets/HabitIdentity.png";
import VideoCallerImage from "../../Assets/VideoCaller.png";
import GithubImage from "../../Assets/github.svg";

interface Element {
  id: number;
  img: string;
  title: string;
  description: string;
  link1: string;
  link2: string;
  isMoreProjects?: boolean;
}

const items: Element[] = [
  {
    id: 1,
    img: AgriThreadImage,
    title: "AgriThread",
    description:
      "A comprehensive digital agriculture platform connecting farmers and stakeholders. Features weather alerts, marketplace, and expert advisory services.",
    link1: "https://agrithread-frontend.vercel.app/",
    link2: "",
  },
  {
    id: 2,
    img: HabitIdentityImage,
    title: "Habit Identity",
    description:
      "A mindset-focused habit tracker that helps you build identity-based habits. Track your progress and become the person you want to be.",
    link1: "https://habit-tracker-front-three.vercel.app/",
    link2: "https://github.com/277pawan/habit_tracker_front",
  },
  {
    id: 3,
    img: VideoCallerImage,
    title: "Video Caller",
    description:
      "Seamless real-time video calling application built with WebRTC. Connect with others instantly with high-quality video and audio streaming.",
    link1: "https://bvideo-caller.vercel.app/",
    link2: "https://github.com/277pawan/Web-RTC",
  },
  {
    id: 4,
    img: BankistImage,
    title: "Bankist Website",
    description:
      "A mini virtual ATM with client-side data, money transfer, loan system and transaction history.",
    link1: "https://277pawan.github.io/Bankist/",
    link2: "https://github.com/277pawan/Bankist",
  },
  {
    id: 5,
    img: FormBuilderImage,
    title: "Form-Builder",
    description:
      "A dynamic form generator for React apps. Build complex forms by defining only input types.",
    link1: "https://www.npmjs.com/package/react-form-toaster",
    link2: "https://github.com/277pawan/form-builder",
  },
  {
    id: 6,
    img: geoLocationImage,
    title: "GeoLocation Tracker",
    description:
      "Track your real-time routes for running & cycling with a fully working Google Maps integration.",
    link1: "https://277pawan.github.io/Geolocation-tracker/",
    link2: "https://github.com/277pawan/Geolocation-tracker",
  },
  {
    id: 7,
    img: GithubImage,
    title: "More Projects",
    description: "Check out more of my work and open-source contributions on my GitHub profile.",
    link1: "https://github.com/277pawan",
    link2: "",
    isMoreProjects: true
  }
];

const One: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {items.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: project.id * 0.1 }}
            className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800 flex flex-col ${project.isMoreProjects ? 'bg-[#7843e9] items-center justify-center text-center cursor-pointer' : 'bg-[#1a1a1a]'}`}
            onClick={() => project.isMoreProjects && window.open(project.link1, '_blank')}
          >
            {project.isMoreProjects ? (
              <div className="p-8 flex flex-col items-center justify-center h-[472px] w-full hover:bg-[#6a35d9] transition-colors">
                <div className="bg-white p-4 rounded-full mb-6">
                  <img src={project.img} alt="Github" className="w-16 h-16" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
                <p className="text-white/80 text-lg mb-8" style={{ fontFamily: "itim" }}>{project.description}</p>
                <span className="px-6 py-3 bg-white text-[#7843e9] font-bold rounded-full hover:scale-105 transition-transform">
                  Visit Github
                </span>
              </div>
            ) : (
              <>
                {/* Image Container */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col h-[280px]">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-sans flex-grow">
                    {project.description}
                  </p>

                  <div className="flex gap-4 mt-auto">
                    <a
                      href={project.link1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all transform hover:-translate-y-0.5"
                    >
                      Live Demo
                    </a>
                    {project.link2 && (
                      <a
                        href={project.link2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-4 py-2.5 bg-[#2a2a2a] hover:bg-[#333] text-white border border-gray-700 rounded-lg font-medium transition-all transform hover:-translate-y-0.5"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default One;
