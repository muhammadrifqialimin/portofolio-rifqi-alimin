import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- PERBAIKAN IMPORT ---
// Karena Projects.jsx dan folder ProjectDetail bertetangga di dalam folder 'components'
import ProjectDetail from "../ProjectDetail/ProjectDetail";

function Projects({ projects, loading, fadeInUp, staggerContainer }) {
  const [selectedProject, setSelectedProject] = useState(null);

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
                onClick={() => setSelectedProject(project)}
                style={{ cursor: "pointer" }}
              >
                <div className="project-image">
                  <img
                    src={
                      project.image ||
                      "https://placehold.co/600x400/1a0b0b/ffffff?text=Project"
                    }
                    alt={project.title}
                  />
                  <div className="project-overlay">
                    <span>View Details</span>
                  </div>
                </div>

                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p className="short-desc">
                    {project.description?.length > 100
                      ? project.description.substring(0, 100) + "..."
                      : project.description}
                  </p>

                  <div className="tech-stack">
                    {project.technologies?.slice(0, 3).map((tech, i) => (
                      <span key={i} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 3 && (
                      <span className="tech-tag">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;
