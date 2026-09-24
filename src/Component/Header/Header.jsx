import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "./Sparkles";
import { BackgroundBeams } from "../Helper.jsx";
import { Link } from "react-router-dom";
import { TerminalCodeCard } from "../../lib/TerminalCard";

function Header() {
  const [heroSectionValue, setHeroSectionValue] = useState("");
  const intervalRef = useRef(null);

  const arrayOfValues = [
    "Performance.",
    "Scalability.",
    "Backend Architect",
    "Tech Explorer",
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let currentIndex = 0;
    let currentText = "";
    let isDeleting = false;
    let loopNum = 0;

    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 1500;

    const tick = () => {
      const i = loopNum % arrayOfValues.length;
      const fullText = arrayOfValues[i];

      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
      }

      setHeroSectionValue(currentText);

      let delta = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && currentText === fullText) {
        delta = pauseTime;
        isDeleting = true;
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        loopNum++;
        delta = 500;
      }

      intervalRef.current = setTimeout(tick, delta);
    };

    tick();

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-[100vh] flex items-center bg-black overflow-hidden font-sans selection:bg-indigo-500 selection:text-white scroll-mt-20"
      aria-label="Introduction"
    >
      {/* Background Beams */}
      <div className="absolute inset-0 pointer-events-none">
        <BackgroundBeams className="opacity-40" />
      </div>

      {/* Dot Grid Pattern */}
      <div className="absolute inset-0 bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Spotlight Glows */}
      <div className="absolute top-0 left-1/4 w-[40vw] h-[50vh] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[25vw] h-[35vh] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
      {/* Right side subtle glow behind terminal */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[40vw] h-[70vh] bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />

      {/* ── Two-column layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[100vh]">
        {/* LEFT — Text content */}
        <div className="flex flex-col items-start text-left gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-3xl lg:text-5xl font-medium leading-relaxed tracking-wide font-black text-white drop-shadow-2xl">
              I'm{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500">
                Pawan Bisht
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-sm md:text-base text-gray-400 max-w-md leading-relaxed font-light tracking-wide"
          >
            Full stack developer & open-source maintainer — creator of{" "}
            <strong className="text-gray-200 font-medium">React-Form-Toaster</strong>{" "}
            and{" "}
            <strong className="text-gray-200 font-medium">Revenant</strong>.
            I ship schema-driven UX and backup verification tooling teams can
            trust. Online as <strong className="text-gray-200 font-medium">277pawan</strong>.
          </motion.p>

          {/* Typewriter Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative group cursor-default"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex items-center min-w-[260px]">
              <span className="text-indigo-300 font-medium mr-3 text-sm">
                Excellence in
              </span>
              <span className="text-white font-bold tracking-wide text-sm">
                {heroSectionValue}
              </span>
              <span className="w-[2px] h-4 bg-indigo-400 ml-1 animate-pulse" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("projects")}
              className="group relative px-8 py-3 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:bg-gray-100"
            >
              <span className="relative z-10 flex items-center gap-2">
                View projects
              </span>
            </motion.button>
            <Link to="/engineering">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 border border-white/20 text-white font-semibold rounded-full hover:border-[#7843e9] hover:text-[#c4b5fd] transition-colors"
              >
                Engineering blog
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — Terminal Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
          className="flex items-center justify-center lg:justify-end"
        >
          <TerminalCodeCard />
        </motion.div>
      </div>

      {/* Scroll Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          delay: 1,
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        onClick={() => scrollToSection("about")}
      >
        <svg
          className="w-8 h-8 text-gray-400 hover:text-white transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7"
          />
        </svg>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
    </section>
  );
}

export default Header;
