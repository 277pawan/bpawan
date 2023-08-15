import React, { useEffect, useRef, useState } from "react";
import "./About.css";
function About() {
  // const [isintersecting, setintersection] = useState(false);
  const cannref = useRef(null);
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback);
    observer.observe(cannref.current);
  }, []);

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
        <div className="abouts">About Me</div>
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
        <div className="aboutbox2">
          <div style={{ paddingLeft: "10px" }} className="aboutbox2title">
            Get to know me!
          </div>
          <br></br>
          <div style={{ paddingLeft: "10px" }} className="aboutbox2desc">
            I'm a{" "}
            <b style={{ fontFamily: "arial" }}>
              Frontend + backend Web Developer
            </b>{" "}
            building the Front-end of Websites and Web Applications that leads
            to the success of the overall product. Check out some of my work in
            the <b style={{ fontFamily: "arial" }}>Projects</b> section.
            <br></br> <br></br>
            Feel free to Connect or Follow me on my{" "}
            <b>
              <a href="https://github.com/277pawan">
                <u
                  style={{
                    color: "#7843e9",
                    fontFamily: "arial",
                    cursor: "pointer",
                  }}
                >
                  Github
                </u>
              </a>
            </b>{" "}
            account where I post my projects related to Web Development and
            Programming that I have learned over the years in{" "}
            <b style={{ fontFamily: "arial" }}>Web Development</b>
            <br></br>
            <br></br>I'm open to <b style={{ fontFamily: "arial" }}>Job</b>{" "}
            opportunities where I can contribute, learn and grow. If you have a
            good opportunity that matches my skills and experience then don't
            hesitate to <b style={{ fontFamily: "arial" }}>contact</b> me.
          </div>
          <br></br>
          <div style={{ paddingLeft: "10px" }}>
            <button
              ref={cannref}
              onClick={contactbutton}
              className="headerbutton"
            >
              Contact
            </button>
          </div>
        </div>
        <div className="aboutbox3">
          <div className="skills">My Skills</div>
          <div className="skillset">
            <button className="skillbutton">HTML</button>
            <button className="skillbutton">CSS</button>
            <button className="skillbutton">Javascript</button>
            <button className="skillbutton">Reactjs</button>
            <button className="skillbutton">Nodejs</button>
            <button className="skillbutton">Expressjs</button>
            <button className="skillbutton">Firebase</button>
            <button className="skillbutton">C++</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
