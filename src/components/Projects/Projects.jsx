import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectDetail from "../ProjectDetail/ProjectDetail";

function Projects({ projects, loading, fadeInUp, staggerContainer }) {
  const [selectedProject, setSelectedProject] = useState(null);

  // State untuk Tab (Default: 'main')
  const [activeTab, setActiveTab] = useState("main");

  // Filter Projects berdasarkan Tab yang aktif
  const displayedProjects = projects.filter((project) => {
    if (activeTab === "main") {
      // Tampilkan yang featured: true
      return project.featured === true;
    } else {
      // Tampilkan yang TIDAK featured (atau false)
      return !project.featured;
    }
  });

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

        {/* --- TAB SWITCHER BUTTONS --- */}
        <motion.div
          className="project-tabs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <button
            className={`tab-btn ${activeTab === "main" ? "active" : ""}`}
            onClick={() => setActiveTab("main")}
          >
            Main Projects
          </button>
          <button
            className={`tab-btn ${activeTab === "additional" ? "active" : ""}`}
            onClick={() => setActiveTab("additional")}
          >
            Other Experiments
          </button>
        </motion.div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading projects...</p>
          </div>
        ) : (
          <motion.div
            layout // Properti ajaib agar transisi layout halus
            className="projects-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="visible" // Ubah whileInView jadi animate agar re-trigger saat tab ganti
            key={activeTab} // Kunci ini penting! Biar React tahu konten berubah total
          >
            <AnimatePresence mode="popLayout">
              {displayedProjects.length > 0 ? (
                displayedProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="project-card"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.9 }} // Animasi saat project hilang
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => setSelectedProject(project)}
                    style={{ cursor: "pointer" }}
                    layout
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
                ))
              ) : (
                // Tampilan jika tidak ada project di kategori tersebut
                <motion.div
                  className="no-projects"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p>No projects found in this category yet.</p>
                </motion.div>
              )}
            </AnimatePresence>
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
