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
      setRotation(window.scrollY * 0.05); // Adjust the multiplier for speed
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
    <div id="about" className="aboutcontainer">
      <div className="aboutbox1">
        <div className="text-lg md:text-4xl mb-4 text-center text-black dark:text-white max-w-full uppercase tracking-[0.5rem] font-bold">
          About Me
        </div>
        <hr
          style={{
            height: "5px",
            width: "80px",
            backgroundColor: "#7843e9",
            borderRadius: "10px",
          }}
        ></hr>
        <div className="abouttitle">
          Here you will find more information about me, what I do, and my
          current skills mostly in terms of programming and technology
        </div>
      </div>
      <div className="aboutallbox">
        <div className="aboutbox3">
          {/* <div className="skills">My Skills</div> */}
          <div className="skillset">
            <motion.div className="tap--circle">
              <div className="tap-desc">
                <div className="tap--title text-4xl text-center ">
                  Feels like a good fit
                  <p className="tap--title-desc text-gray-500 text-xl">
                    Let's kick some ass together
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "tween" }}
                  className=" text-center bg-gray-200 text-black rounded-3xl text-xl py-2 px-6 m-2"
                  onClick={() => scrollToPosition("contact")}
                >
                  Contact Me
                </motion.div>
              </div>
            </motion.div>
            <motion.img
              ref={ring1Ref}
              className="Ring2--image"
              src={Ring1Image}
              animate={{ rotate: rotation }}
              transition={{ type: "tween" }}
              alt="Skills_Image"
            />
            <motion.img
              ref={ring2Ref}
              className="Ring1--image"
              src={Ring2Image}
              animate={{ rotate: rotation2 }}
              transition={{ type: "smooth" }}
              alt="Ring_Image"
            />
            <motion.img
              ref={ring3Ref}
              className="Ring3--image"
              animate={{ rotate: rotation3 }}
              transition={{ type: "smooth" }}
              src={Ring3Image}
              alt="Ring_Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
