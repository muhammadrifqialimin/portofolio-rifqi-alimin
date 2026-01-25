import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ name }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // --- FUNGSI SCROLL MANUAL (LEBIH KUAT) ---
  const handleScroll = (e, targetId) => {
    e.preventDefault(); // Matikan link bawaan
    setIsOpen(false); // Tutup menu

    const element = document.getElementById(targetId);

    if (element) {
      // 1. Ambil posisi elemen relatif terhadap layar
      const elementPosition = element.getBoundingClientRect().top;
      // 2. Ambil posisi scroll saat ini
      const offsetPosition = elementPosition + window.scrollY - 80; // (-80 untuk kasih jarak Navbar)

      // 3. Paksa Window untuk scroll ke sana
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      console.error(
        `Element dengan ID "${targetId}" tidak ditemukan! Cek App.jsx.`,
      );
    }
  };

  const menuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto" },
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <div className="nav-brand">
          <a
            href="#hero"
            className="logo-text"
            onClick={(e) => handleScroll(e, "hero")}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            {name}
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="nav-links desktop-only">
          <a href="#about" onClick={(e) => handleScroll(e, "about")}>
            About
          </a>
          <a href="#projects" onClick={(e) => handleScroll(e, "projects")}>
            Projects
          </a>
          <a
            href="#certificates"
            onClick={(e) => handleScroll(e, "certificates")}
          >
            Certificates
          </a>
          <a href="#contact" onClick={(e) => handleScroll(e, "contact")}>
            Contact
          </a>
        </div>

        {/* Hamburger Icon */}
        <div className="mobile-menu-icon" onClick={toggleMenu}>
          {isOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav-links"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3 }}
          >
            <a href="#about" onClick={(e) => handleScroll(e, "about")}>
              About
            </a>
            <a href="#projects" onClick={(e) => handleScroll(e, "projects")}>
              Projects
            </a>
            <a
              href="#certificates"
              onClick={(e) => handleScroll(e, "certificates")}
            >
              Certificates
            </a>
            <a href="#contact" onClick={(e) => handleScroll(e, "contact")}>
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
