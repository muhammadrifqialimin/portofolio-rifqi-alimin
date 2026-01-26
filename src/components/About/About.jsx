import React from "react";
import { motion } from "framer-motion";

function About({ data, fadeInUp, staggerContainer }) {
  return (
    <section id="about" className="about-section">
      <div className="center-container">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="section-title">About Me</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            Explore my professional journey and portfolio of work below.
          </p>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-image"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="image-wrapper">
              <img src={data.image} alt={data.name} />
              <div className="image-glow"></div>
            </div>
          </motion.div>

          <motion.div
            className="about-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h3 className="about-name">{data.name}</h3>
              <h4 className="about-title">{data.title}</h4>
            </motion.div>
            <motion.p className="about-description" variants={fadeInUp}>
              {data.description}
            </motion.p>
            <motion.p className="about-bio" variants={fadeInUp}>
              {data.bio}
            </motion.p>

            <motion.div variants={fadeInUp}>
              <a
                href={data.cvUrl}
                className="cv-button"
                target="_blank"
                rel="noreferrer"
                download={
                  data.cvUrl.startsWith("http")
                    ? undefined
                    : "CV_Rifqi_Alimin.pdf"
                }
              >
                Download CV
                <svg
                  className="download-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15V3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>

            <motion.div className="technologies-section" variants={fadeInUp}>
              <h4 className="tech-title">Technologies & Skills</h4>
              <div className="tech-grid">
                {data.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    className="tech-item"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
