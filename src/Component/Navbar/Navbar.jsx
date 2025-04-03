import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import beast from "../../Assets/beast.png";
import close from "../../Assets/close.png";
import open from "../../Assets/open.png";

function Navbar() {
  const [hamtrue, sethamtrue] = useState(false);

  // Function to scroll to the section by ID
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    sethamtrue(false); // Close the menu after clicking
  };

  return (
    <>
      <div id="navbarcontainer">
        <div className="navbox1">
          <img
            style={{
              height: "44px",
              width: "44px",
              borderRadius: "50%",
              padding: "6px",
            }}
            src={beast}
            alt="pawan"
          />
          <div className="name">Pawan Bisht.</div>
        </div>

        <div className="navbox2">
          <div onClick={() => scrollToSection("home")} className="navbutton">
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Home
            </Link>
          </div>
          <div onClick={() => scrollToSection("about")} className="navbutton">
            About
          </div>
          <div
            onClick={() => scrollToSection("projects")}
            className="navbutton"
          >
            Projects
          </div>
          <div
            onClick={() => scrollToSection("contact")}
            className="navbuttonlast"
          >
            Contact
          </div>
        </div>

        <div onClick={() => sethamtrue(!hamtrue)} className="hambox">
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
            alt="hamburger menu"
          />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {hamtrue && (
        <div className="hammer">
          <div onClick={() => scrollToSection("home")} className="home">
            Home
          </div>
          <hr
            style={{ backgroundColor: "gray", height: "1px", width: "100vw" }}
          />
          <div onClick={() => scrollToSection("projects")} className="projects">
            Projects
          </div>
          <hr
            style={{ backgroundColor: "gray", height: "1px", width: "100vw" }}
          />
          <div onClick={() => scrollToSection("about")} className="about">
            About
          </div>
          <hr
            style={{ backgroundColor: "gray", height: "1px", width: "100vw" }}
          />
          <div onClick={() => scrollToSection("contact")} className="contact">
            Contact
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
