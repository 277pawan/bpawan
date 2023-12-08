import React, { useEffect, useRef } from "react";
import "./Header.css";
import github1 from "../../Assets/github.svg";
import linkdin1 from "../../Assets/linkedin.svg";
import resume1 from "../../Assets/book.svg";
import { gsap, Power2 } from "gsap";
import CSSRulePlugin from "gsap/all";
function Header() {
  const headerbuttonref = useRef(null);
  const headerdescref = useRef(null);
  const headernameref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(CSSRulePlugin);
    const t1 = new gsap.timeline();
    t1.to(
      headerbuttonref.current,
      1.2,
      {
        css: { top: "0%", ease: Power2.easeInOut },
      },
      0.2
    )
      .to(
        headerdescref.current,
        1.5,
        { css: { opacity: 1, ease: Power2.easeInOut } },
        0.6
      )
      .to(
        headernameref.current,
        2,
        { css: { opacity: 1, ease: Power2.easeInOut } },
        1
      );
  });
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
      <div ref={headernameref} className="headername">
        Hi, i'm Pawan Bisht
      </div>
      <div ref={headerdescref} className="headerdesc">
        A Frontend focused Web Developer + backend developer building the
        Frontend of Websites and Web Applications that leads to the success of
        the overall product{" "}
      </div>
      <div style={{ padding: "20px" }}>
        <button ref={headerbuttonref} className="headerbutton">
          More info 👇
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
