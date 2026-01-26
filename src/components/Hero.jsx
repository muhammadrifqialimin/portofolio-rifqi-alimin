import React from "react";
import { motion } from "framer-motion";

function Hero({ fadeInUp }) {
  return (
    <motion.header
      className="hero"
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8 }}
      variants={fadeInUp}
    >
      <div className="center-container">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Hi, I'm <span className="highlight">Muhammad Rifqi Alimin</span>
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          A Full-stack Developer focused on building innovative digital
          solutions through code and creativity.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a href="#projects" className="cta-button">
            Explore My Portfolio
            <svg
              className="arrow-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.header>
  );
}

export default Hero;
