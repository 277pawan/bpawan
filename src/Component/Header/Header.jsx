import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "./Sparkles";
import { BackgroundBeams } from "../Helper.jsx";

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

    // Typing speed control
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
    <div className="relative w-full h-[100vh] min-h-[600px] flex flex-col items-center justify-center bg-black overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">

      {/* 1. Background Beams (Bottom Mid) */}
      <div className="absolute inset-0 pointer-events-none">
        <BackgroundBeams className="opacity-40" />
      </div>

      {/* 2. Dot Pattern Background */}
      <div className="absolute inset-0 bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* 3. Top Spotlight Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40vw] h-[30vh] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />



      {/* 5. Main Content */}
      <div className="z-10 flex flex-col items-center justify-center w-full px-4 text-center mt-[-5vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 text-white drop-shadow-2xl">
            I'm <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500">Pawan Bisht</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-4xl mx-auto flex flex-col items-center gap-8"
        >
          <p className="text-sm md:text-base lg:text-lg text-gray-400 max-w-lg mx-auto leading-relaxed font-light tracking-wide">
            I'm a Full Stack Developer who brings ideas to life with clean,
            efficient code. From dynamic frontends to robust backends, I craft
            seamless digital experiences.
          </p>

          {/* Typewriter Badge */}
          <div className="relative group cursor-default">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center min-w-[280px]">
              <span className="text-indigo-300 font-medium mr-3">Excellence in</span>
              <span className="text-white font-bold tracking-wide">{heroSectionValue}</span>
              <span className="w-[2px] h-5 bg-indigo-400 ml-1 animate-pulse" />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("about")}
            className="group relative px-8 py-3 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:bg-gray-100 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] mt-4"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Portfolio
              <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* 6. Scroll Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 z-20 cursor-pointer"
        onClick={() => scrollToSection("about")}
      >
        <svg
          className="w-8 h-8 text-gray-400 hover:text-white transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >

          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7" />
        </svg>
      </motion.div>

      {/* 7. Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
    </div>
  );
}

export default Header;
