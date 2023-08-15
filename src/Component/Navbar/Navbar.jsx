import React, { useState } from "react";
import "./Navbar.css";
import beast from "../../Assets/beast.png";
import close from "../../Assets/close.png";
import open from "../../Assets/open.png";

import { Link } from "react-router-dom";
function Navbar() {
  const [hamtrue, sethamtrue] = useState(false);
  function hambox() {
    sethamtrue(!hamtrue);
  }
  const home = () => {
    sethamtrue(!hamtrue);
  };
  const about = () => {
    let scrollheader = 800;
    if (window.innerWidth < 768) {
      scrollheader = 750;
    }
    window.scrollTo({
      top: scrollheader,
      behavior: "smooth",
    });
    sethamtrue(!hamtrue);
  };
  const projects = () => {
    let scrollheader = 1700;
    if (window.innerWidth < 768) {
      scrollheader = 2000;
    }
    window.scrollTo({
      top: scrollheader,
      behavior: "smooth",
    });
    sethamtrue(!hamtrue);
  };
  const contact = () => {
    let scrollToPosition = 4000;
    if (window.innerWidth <= 768) {
      scrollToPosition = 6400;
    }

    window.scrollTo({
      top: scrollToPosition,
      behavior: "smooth",
    });
    sethamtrue(!hamtrue);
  };
  return (
    <>
      <div id="navbarcontainer">
        <div className="navbox1">
          {" "}
          <img
            style={{
              height: "55px",
              width: "55px",
              borderRadius: "50px",
              padding: "6px",
            }}
            src={beast}
            alt="pawan"
          ></img>
          <div className="name">Pawan Bisht.</div>
        </div>
        <div className="navbox2">
          <div className="navbutton">
            {" "}
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              Home
            </Link>
          </div>

          <div onClick={about} className="navbutton">
            About
          </div>
          <div onClick={projects} className="navbutton">
            Projects
          </div>
          <div onClick={contact} className="navbuttonlast">
            Contact
          </div>
        </div>
        <div onClick={hambox} className="hambox">
          <img
            style={{
              height: "50px",
              width: "45px",
              borderRadius: "200px",
              padding: "2px",
              float: "right",
              cursor: "pointer",
            }}
            src={hamtrue ? close : open}
            alt="hamopen"
          ></img>
        </div>
      </div>
      {hamtrue && (
        <div className="hammer">
          <div onClick={home} className="home">
            Home
          </div>
          <hr
            style={{ backgroundColor: "gray", height: "1px", width: "100vw" }}
          ></hr>
          <div onClick={projects} className="projects">
            Projects
          </div>
          <hr
            style={{ backgroundColor: "gray", height: "1px", width: "100vw" }}
          ></hr>
          <div onClick={about} className="about">
            About
          </div>
          <hr
            style={{ backgroundColor: "gray", height: "1px", width: "100vw" }}
          ></hr>
          <div onClick={contact} className="contact">
            Contact
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
