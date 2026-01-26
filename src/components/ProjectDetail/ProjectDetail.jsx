import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import "./ProjectDetail.css";

function ProjectDetail({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!project) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "2024";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <motion.div
      className="pd-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="pd-modal"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Close */}
        <button className="pd-close-btn" onClick={onClose}>
          <X size={28} />
        </button>

        {/* --- BAGIAN KIRI: GAMBAR --- */}
        <div className="pd-image-section">
          <img
            src={
              project.image ||
              "https://placehold.co/800x600/0a0202/ffffff?text=Project+Image"
            }
            alt={project.title}
            className="pd-image"
          />
        </div>

        {/* --- BAGIAN KANAN: KONTEN + FOOTER STICKY --- */}
        <div className="pd-content-section">
          {/* 1. AREA YANG BISA DI-SCROLL (Header, Desc, dll) */}
          <div className="pd-scrollable-content">
            <div className="pd-header">
              <h2 className="pd-title">{project.title}</h2>
              {project.subtitle && (
                <h3 className="pd-subtitle">{project.subtitle}</h3>
              )}

              <div className="pd-meta-info">
                <span className="pd-date">{formatDate(project.createdAt)}</span>
              </div>
            </div>

            <div className="pd-tech-stack">
              {project.technologies?.map((tech, i) => (
                <span key={i} className="pd-tech-tag">
                  {tech}
                </span>
              ))}
            </div>

            <div className="pd-description-container">
              <p className="pd-description">{project.description}</p>

              {project.additionalDescription && (
                <div className="pd-additional-section">
                  <h4 className="pd-additional-title">More Details</h4>
                  <p className="pd-description">
                    {project.additionalDescription}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 2. FOOTER YANG DIAM (STICKY) DI BAWAH */}
          <div className="pd-footer">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="pd-btn pd-btn-primary"
              >
                🚀 Live Demo
              </a>
            )}

            {project.gitUrls && typeof project.gitUrls === "object" ? (
              <div className="pd-git-group">
                {project.gitUrls.frontend && (
                  <a
                    href={project.gitUrls.frontend}
                    target="_blank"
                    rel="noreferrer"
                    className="pd-btn pd-btn-secondary"
                  >
                    💻 Frontend
                  </a>
                )}
                {project.gitUrls.backend && (
                  <a
                    href={project.gitUrls.backend}
                    target="_blank"
                    rel="noreferrer"
                    className="pd-btn pd-btn-secondary"
                  >
                    ⚙️ Backend
                  </a>
                )}
              </div>
            ) : (
              project.gitUrls && (
                <a
                  href={project.gitUrls}
                  target="_blank"
                  rel="noreferrer"
                  className="pd-btn pd-btn-secondary"
                >
                  🐱 Source Code
                </a>
              )
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProjectDetail;
