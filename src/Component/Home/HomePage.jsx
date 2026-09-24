import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { applyPendingHomeScroll } from "../../lib/scrollToSection";
import SeoHead from "../Blog/SeoHead";
import Header from "../Header/Header";
import About from "../About/About";
import Experience from "../Experience/Experience";
import Projects from "../Projects/Projects";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import SnowflakeCursor from "../../lib/SnowFlake.jsx";

const HOME_SEO = {
  title: "Pawan Bisht (277pawan) | Full Stack Developer",
  description:
    "Official website of Pawan Bisht — also known as 277pawan and two77pawan. Full stack developer: React-Form-Toaster, Revenant, and engineering notes. https://two77pawan.onrender.com",
  keywords:
    "Pawan Bisht, 277pawan, two77pawan, Pawan Bisht portfolio, Pawan Bisht developer, two77pawan.onrender.com",
  path: "/",
};

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    applyPendingHomeScroll();
  }, [location.search]);

  return (
    <>
      <SeoHead pageSeo={HOME_SEO} />
      <main>
        <Header />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <SnowflakeCursor />
    </>
  );
}
