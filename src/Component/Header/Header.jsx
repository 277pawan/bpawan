import { BackgroundBeams } from "../Helper.jsx";
import { SparklesCore } from "./Sparkles";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useState } from "react";

function Header() {
  const [heroSectionValue, setHeroSectionValue] = useState("");
  const headerbuttonref = useRef(null);
  const headerdescref = useRef(null);
  const intervalRef = useRef(null);

  const arrayOfValues = [
    "Performance.",
    "Scalability.",
    // "Success.",
    "Backend Architect",
    "Tech Explorer",
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const arrayLength = arrayOfValues.length;
    let wordLength = 0;
    let index = 0;
    let value = "";

    function handleDynamicvalue() {
      let item = arrayOfValues[index];
      if (item.length >= wordLength) {
        typeWriter(item);
      }
    }

    function typeWriter(item) {
      let flag = 0;
      intervalRef.current = setInterval(() => {
        if (wordLength < item.length && flag === 0) {
          value = value + item[wordLength++];
          setHeroSectionValue(value);
        } else {
          flag = 1;
          value = value.slice(0, -1);
          setHeroSectionValue(value);
          wordLength--;
          if (wordLength === 0) {
            clearInterval(intervalRef.current);
            if (index === arrayLength - 1) {
              index = 0;
              handleDynamicvalue();
            } else {
              index++;
              handleDynamicvalue();
            }
          }
        }
      }, 250); // Reduced the interval for smoother typing
    }

    handleDynamicvalue();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="header-wrapper">
      <BackgroundBeams />
      <div className="h-[42rem] text-white w-full bg-black flex flex-col items-center justify-center overflow-hidden ">
        <h1 className="md:text-7xl text-3xl lg:text-8xl font-bold text-center text-white relative z-20">
          I'm Pawan Bisht
        </h1>
        <div className="w-[24rem] text-center sm:w-[40rem] h-40 relative">
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          <div className="flex justify-center items-center">
            <div
              ref={headerdescref}
              className="headerdesc flex flex-wrap font-bold absolute top-4 z-20"
            >
              I'm a Full Stack Devleoper who brings ideas to life with clean,
              efficient code. From dynamic frontends to robust backends, I craft
              seamless digital experiences. Every project I build is designed
              for {heroSectionValue}{" "}
            </div>
            <div className="absolute top-[12.5rem] sm:top-[6.5rem] z-30">
              <motion.button
                whileTap={{ scale: 0.9 }}
                ref={headerbuttonref}
                className="headerbutton py-4 px-8 text-xl rounded-md bg-[#7840e1]"
                style={{ fontFamily: "itim" }}
                onClick={() => scrollToSection("about")}
              >
                More info 👇
              </motion.button>
            </div>
          </div>

          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
