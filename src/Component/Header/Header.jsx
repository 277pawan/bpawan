import React from "react";
import "./Header.css";
import github1 from "../../Assets/github.svg";
import linkdin1 from "../../Assets/linkedin.svg";
import resume1 from "../../Assets/book.svg";
function Header() {
  function projectbutton() {
    let scrollheader = 1700;
    if (window.innerWidth < 768) {
      scrollheader = 2000;
    }
    window.scrollTo({
      top: scrollheader,
      behavior: "smooth",
    });
  }
  return (
    <div className="headercontainer">
      <div className="headername">Hey, I'm Pawan Bisht.</div>
      <div className="headerdesc">
        A frontend + backend Web Developer building the frontend of website and
        web application that leads to the success of the overall products.
      </div>
      <div style={{ paddingBottom: "100px", paddingTop: "30px" }}>
        <button onClick={projectbutton} className="headerbutton">
          Projects
        </button>
      </div>
      <div className="socialbuttons">
        <abbr title="Github">
          {" "}
          <a href="https://github.com/277pawan">
            {" "}
            <img className="social" src={github1} alt="github" />
          </a>
        </abbr>

        <abbr title="Linkdin">
          {" "}
          <a href="https://www.linkedin.com/in/pawan-bisht-a943161b9/">
            {" "}
            <img className="social" src={linkdin1} alt="Linkdin" />
          </a>
        </abbr>
        <abbr title="Resume">
          {" "}
          <a href="/PawanBishtresume.pdf" download>
            {" "}
            <img className="social" src={resume1} alt="resume" />
          </a>
        </abbr>
      </div>
    </div>
  );
}

export default Header;
