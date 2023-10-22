import React from "react";
import "./Footer.css";
import github from "../../Assets/github1.png";
import linkdin from "../../Assets/linkedin1.png";
import resume from "../../Assets/resume.png";
function Footer() {
  return (
    <div className="footercontainer">
      <div className="footerbox12">
        <div className="footerbox1">
          <div className="footertitle">Pawan Bisht.</div>
          <div className="footerdesc">
            A Frontend focused Web Developer building the Frontend of Websites
            and Web Applications that leads to the success of the overall
            product
          </div>
        </div>
        <div className="footerbox2">
          <div className="footertitle">Social</div>
          <div className="footerdesc">
            {" "}
            <a href="https://github.com/277pawan">
              <abbr title="Github">
                {" "}
                <img className="social" src={github} alt="github" />
              </abbr>
            </a>
            <a href="https://www.linkedin.com/in/pawan-bisht-a943161b9/">
              <abbr title="Linkdin">
                <img className="social" src={linkdin} alt="Linkdin" />
              </abbr>
            </a>
            <a href="/PawanBishtResume.pdf" download>
              {" "}
              <abbr title="Resume">
                <img className="social" src={resume} alt="resume" />
              </abbr>
            </a>
          </div>
        </div>
      </div>
      <div className="footerbox3">
        <div className="lastfooterbox">
          &copy;Copyright 2023, Made by Pawan Bisht.
        </div>
      </div>
    </div>
  );
}

export default Footer;
