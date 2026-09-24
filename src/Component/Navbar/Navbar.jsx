import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import beast from "../../Assets/beast.png";
import { scrollToHomeSection } from "../../lib/scrollToSection";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToSection = (id) => {
    setIsOpen(false);
    scrollToHomeSection(id, navigate);
  };

  const navLinks = [
    { name: "Home", id: "home", route: null },
    { name: "About", id: "about", route: null },
    { name: "Projects", id: "projects", route: null },
    { name: "Engineering", id: null, route: "/engineering" },
    { name: "Contact", id: "contact", route: null },
  ];

  const navItemClass = (isContact) =>
    isContact
      ? "px-5 py-2 bg-[#7843e9] rounded-full hover:bg-[#6a35d9] text-white hover:text-white text-sm tracking-widest uppercase transition-colors"
      : "text-sm tracking-widest uppercase hover:text-[#7843e9] transition-colors relative group text-gray-300";

  const renderSectionLink = (link, className) => {
    if (onHome) {
      return (
        <button type="button" onClick={() => goToSection(link.id)} className={className}>
          {link.name}
          {link.name !== "Contact" && (
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7843e9] transition-all group-hover:w-full" />
          )}
        </button>
      );
    }
    return (
      <Link
        to={`/?section=${link.id}`}
        onClick={() => setIsOpen(false)}
        className={className}
      >
        {link.name}
        {link.name !== "Contact" && (
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7843e9] transition-all group-hover:w-full" />
        )}
      </Link>
    );
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen || !onHome
            ? "bg-black/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="w-full mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
              <div className="relative">
                <div className="absolute inset-0 bg-[#7843e9] rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity" />
                <img
                  className="h-10 w-10 relative rounded-full ring-2 ring-[#7843e9]/50"
                  src={beast}
                  alt="Pawan Bisht"
                />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Pawan Bisht
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.route ? (
                <Link
                  key={link.name}
                  to={link.route}
                  className={`text-sm tracking-widest uppercase hover:text-[#7843e9] transition-colors relative group ${
                    location.pathname.startsWith("/engineering")
                      ? "text-white"
                      : "text-gray-300"
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7843e9] transition-all group-hover:w-full" />
                </Link>
              ) : (
                <span key={link.name} className="relative inline-flex">
                  {renderSectionLink(link, navItemClass(link.name === "Contact"))}
                </span>
              )
            )}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white origin-center transition-transform"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-white transition-opacity"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white origin-center transition-transform"
              />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100vh", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-20 left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-hidden md:hidden"
            >
              <div className="flex flex-col p-8 gap-6 justify-center items-center h-[80vh]">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="w-full text-center"
                  >
                    {link.route ? (
                      <Link
                        to={link.route}
                        onClick={() => setIsOpen(false)}
                        className="text-3xl font-bold text-white hover:text-[#7843e9] transition-colors"
                      >
                        {link.name}
                      </Link>
                    ) : onHome ? (
                      <button
                        type="button"
                        onClick={() => goToSection(link.id)}
                        className="text-3xl font-bold text-white hover:text-[#7843e9] transition-colors"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link
                        to={`/?section=${link.id}`}
                        onClick={() => setIsOpen(false)}
                        className="text-3xl font-bold text-white hover:text-[#7843e9] transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                    <div className="w-12 h-0.5 bg-[#7843e9]/30 mx-auto mt-6" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

export default Navbar;
