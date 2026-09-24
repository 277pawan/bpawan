import React, { useEffect, useRef } from "react";
import "./About.css";
import Ring1Image from "../../Assets/Ring1.png";
import Ring2Image from "../../Assets/Ring 2.svg";
import Ring3Image from "../../Assets/Ring 6.png";
import { motion } from "framer-motion";
import { useState } from "react";

function About() {
  const [rotation, setRotation] = useState(0);
  const [rotation2, setRotation2] = useState(0);
  const [rotation3, setRotation3] = useState(0);

  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setRotation(window.scrollY * 0.05);
      setRotation2(-window.scrollY * 0.04);
      setRotation3(window.scrollY * 0.03);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPosition = (element) => {
    document.getElementById(element)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="aboutcontainer scroll-mt-20"
      aria-labelledby="about-heading"
    >
      <div className="aboutbox1">
        <p className="text-[#7843e9] text-xs uppercase tracking-[0.4em] mb-2 font-sans">
          About
        </p>
        <h2
          id="about-heading"
          className="text-lg md:text-4xl mb-4 text-center text-white max-w-full uppercase tracking-[0.35rem] font-display font-bold"
        >
          About Me
        </h2>
        <hr
          style={{
            height: "5px",
            width: "80px",
            backgroundColor: "#7843e9",
            borderRadius: "10px",
          }}
        />
        <p className="abouttitle font-sans text-gray-300">
          Pawan Bisht (277pawan) — full stack developer at Predigle, open-source
          maintainer, and writer of schema-driven tools. Official site:
          two77pawan.onrender.com. I care about reliability, clear docs, and
          interfaces that feel fast.
        </p>
      </div>

      <div className="aboutallbox">
        <div className="aboutbox3">
          <div className="skillset">
            <motion.div className="tap--circle">
              <div className="tap-desc">
                <div className="tap--title text-2xl md:text-4xl text-center font-display font-bold text-white">
                  Feels like a good fit?
                  <p className="tap--title-desc text-gray-400 text-base md:text-xl font-sans font-normal mt-2">
                    Let&apos;s build something reliable together.
                  </p>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "tween" }}
                  className="text-center bg-[#7843e9] text-white rounded-full text-base py-3 px-8 mt-4 font-semibold hover:bg-[#6a35d9]"
                  onClick={() => scrollToPosition("contact")}
                >
                  Contact Me
                </motion.button>
              </div>
            </motion.div>
            <motion.img
              ref={ring1Ref}
              className="Ring2--image"
              src={Ring1Image}
              animate={{ rotate: rotation }}
              transition={{ type: "tween" }}
              alt=""
            />
            <motion.img
              ref={ring2Ref}
              className="Ring1--image"
              src={Ring2Image}
              animate={{ rotate: rotation2 }}
              transition={{ type: "smooth" }}
              alt=""
            />
            <motion.img
              ref={ring3Ref}
              className="Ring3--image"
              animate={{ rotate: rotation3 }}
              transition={{ type: "smooth" }}
              src={Ring3Image}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
