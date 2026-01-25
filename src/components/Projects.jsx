import React from "react";
import { motion } from "framer-motion";

function Projects({ projects, loading, fadeInUp, staggerContainer }) {
  return (
    <section id="projects" className="projects-section">
      <div className="center-container">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="section-title">Selected Projects</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            A showcase of my recent work and experiments
          </p>
        </motion.div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading projects...</p>
          </div>
        ) : (
          <motion.div
            className="projects-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="project-image">
                  <img
                    src={
                      project.image ||
                      "https://placehold.co/600x400/1a0b0b/ffffff?text=Project"
                    }
                    alt={project.title}
                  />
                  <div className="project-overlay"></div>
                </div>

                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="tech-stack">
                    {project.technologies &&
                      Array.isArray(project.technologies) &&
                      project.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                  </div>

                  <div className="project-links">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="project-btn live-btn"
                      >
                        Live Demo
                      </a>
                    )}

                    {project.gitUrls && typeof project.gitUrls === "object" ? (
                      <div className="git-links">
                        {project.gitUrls.frontend && (
                          <a
                            href={project.gitUrls.frontend}
                            target="_blank"
                            rel="noreferrer"
                            className="project-btn code-btn"
                          >
                            Frontend
                          </a>
                        )}
                        {project.gitUrls.backend && (
                          <a
                            href={project.gitUrls.backend}
                            target="_blank"
                            rel="noreferrer"
                            className="project-btn code-btn"
                          >
                            Backend
                          </a>
                        )}
                      </div>
                    ) : (
                      project.gitUrls && (
                        <a
                          href={project.gitUrls}
                          target="_blank"
                          rel="noreferrer"
                          className="project-btn code-btn"
                        >
                          View Code
                        </a>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Projects;
