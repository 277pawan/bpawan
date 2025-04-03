import React, { useEffect, useRef } from "react";
import "./About.css";
import Ring1Image from "../../Assets/Ring1.png";
import Ring2Image from "../../Assets/Ring 2.svg";
import Ring3Image from "../../Assets/Ring 6.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap, Power2 } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useState } from "react";
function About() {
  // const [isintersecting, setintersection] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [rotation2, setRotation2] = useState(0);
  const [rotation3, setRotation3] = useState(0);

  const skillsArray = [
    "Html",
    "Css",
    "TailwindCss",
    "Javascript",
    "React.js",
    "Next.js",
    "Redux/Zustund",
    "Nodejs",
    "Sql/PostgresSql",
    "Mongodb",
    "Firebase",
    "Prisma/Mongoose",
    "Git",
    "NeoVim",
  ];
  const cannref = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
  const { scrollYProgress } = useScroll();

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
  // Scroll function to the Element
  // const buttonref0 = useRef(null);
  // const buttonref1 = useRef(null);
  // const buttonref2 = useRef(null);
  // const buttonref3 = useRef(null);
  // const buttonref4 = useRef(null);
  // const buttonref5 = useRef(null);
  // const buttonref6 = useRef(null);
  // const buttonref7 = useRef(null);
  // const buttonref8 = useRef(null);
  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //
  //   const t1 = gsap.timeline({
  //     duration: 1,
  //     scrollTrigger: {
  //       trigger: buttonref0.current,
  //       toggleActions: "play",
  //     },
  //   });
  //
  //   t1.to(
  //     buttonref0.current,
  //     {
  //       opacity: 1,
  //       ease: Power2.easeInOut,
  //     },
  //     0.2,
  //   )
  //     .to(
  //       buttonref1.current,
  //       {
  //         opacity: 1,
  //         ease: Power2.easeInOut,
  //       },
  //       0.2,
  //     )
  //     .to(
  //       buttonref2.current,
  //       {
  //         opacity: 1,
  //         ease: Power2.easeInOut,
  //       },
  //       0.2,
  //     )
  //     .to(
  //       buttonref3.current,
  //       {
  //         opacity: 1,
  //         ease: Power2.easeInOut,
  //       },
  //       0.2,
  //     )
  //     .to(
  //       buttonref4.current,
  //       {
  //         opacity: 1,
  //         ease: Power2.easeInOut,
  //       },
  //       0.2,
  //     )
  //     .to(
  //       buttonref5.current,
  //       {
  //         opacity: 1,
  //         ease: Power2.easeInOut,
  //       },
  //       0.2,
  //     )
  //     .to(
  //       buttonref6.current,
  //       {
  //         opacity: 1,
  //         ease: Power2.easeInOut,
  //       },
  //       0.2,
  //     )
  //     .to(
  //       buttonref7.current,
  //       {
  //         opacity: 1,
  //         ease: Power2.easeInOut,
  //       },
  //       0.2,
  //     )
  //     .to(
  //       buttonref8.current,
  //       {
  //         opacity: 1,
  //         ease: Power2.easeInOut,
  //       },
  //       0.2,
  //     );
  // });
  // useEffect(() => {
  //   const observerCallback = (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add("in-view");
  //       } else {
  //         entry.target.classList.remove("in-view");
  //       }
  //     });
  //   };
  //
  //   const observer = new IntersectionObserver(observerCallback);
  //   observer.observe(cannref.current);
  // }, []);

  const contactbutton = () => {
    let scrollToPosition = 4000;
    if (window.innerWidth <= 768) {
      scrollToPosition = 6400;
    }

    window.scrollTo({
      top: scrollToPosition,
      behavior: "smooth",
    });
  };
  return (
    <div className="aboutcontainer">
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
        {/* <div className="aboutbox2"> */}
        {/* <div style={{ paddingLeft: "10px" }} className="aboutbox2desc"> */}
        {/*   I'm a{" "} */}
        {/*   <b style={{ fontFamily: "arial" }}> */}
        {/*     Frontend + backend Web Developer */}
        {/*   </b>{" "} */}
        {/*   building the Front-end of Websites and Web Applications that leads */}
        {/*   to the success of the overall product. Check out some of my work in */}
        {/*   the <b style={{ fontFamily: "arial" }}>Projects</b> section. */}
        {/*   <br></br> <br></br> */}
        {/*   Feel free to Connect or Follow me on my{" "} */}
        {/*   <b> */}
        {/*     <a href="https://github.com/277pawan"> */}
        {/*       <u */}
        {/*         style={{ */}
        {/*           color: "#7843e9", */}
        {/*           fontFamily: "arial", */}
        {/*           cursor: "pointer", */}
        {/*         }} */}
        {/*       > */}
        {/*         Github */}
        {/*       </u> */}
        {/*     </a> */}
        {/*   </b>{" "} */}
        {/*   account where I post my projects related to Web Development and */}
        {/*   Programming that I have learned over the years in{" "} */}
        {/*   <b style={{ fontFamily: "arial" }}>Web Development</b> */}
        {/*   <br></br> */}
        {/*   <br></br>I'm open to <b style={{ fontFamily: "arial" }}>Job</b>{" "} */}
        {/*   opportunities where I can contribute, learn and grow. If you have a */}
        {/*   good opportunity that matches my skills and experience then don't */}
        {/*   hesitate to <b style={{ fontFamily: "arial" }}>contact</b> me. */}
        {/* </div> */}
        {/* <br></br> */}
        {/* </div> */}
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
                  className="text-3xl text-center bg-gray-200 text-black rounded-3xl text-xl py-2 px-6 m-2"
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
