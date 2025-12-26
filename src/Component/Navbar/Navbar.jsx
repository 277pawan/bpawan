import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import beast from "../../Assets/beast.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isOpen
          ? "bg-black/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToSection("home")}>
            <div className="relative">
              <div className="absolute inset-0 bg-[#7843e9] rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity" />
              <img
                className="h-10 w-10 relative rounded-full ring-2 ring-[#7843e9]/50"
                src={beast}
                alt="pawan"
              />
            </div>
            <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Pawan Bisht
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm tracking-widest uppercase hover:text-[#7843e9] transition-colors relative group ${link.name === "Contact"
                  ? "px-5 py-2 bg-[#7843e9] rounded-full hover:bg-[#6a35d9] text-white hover:text-white"
                  : "text-gray-300"
                  }`}
              >
                {link.name}
                {link.name !== "Contact" && (
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7843e9] transition-all group-hover:w-full" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50 hover:bg-white/10 rounded-full transition-colors"
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

        {/* Mobile Navigation Dropdown */}
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
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-3xl font-bold text-white hover:text-[#7843e9] transition-colors"
                    >
                      {link.name}
                    </button>
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
