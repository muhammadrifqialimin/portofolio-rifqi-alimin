import React from "react";
import { motion } from "framer-motion";

function Certificates({ certificates, fadeInUp, staggerContainer }) {
  return (
    <section id="certificates" className="certificates-section">
      <div className="center-container">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="section-title">Certificates</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            Professional certifications and achievements
          </p>
        </motion.div>

        <motion.div
          className="certificates-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="certificate-card"
              variants={fadeInUp}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="certificate-image">
                <img
                  src={
                    cert.image ||
                    "https://placehold.co/400x300/1a0b0b/ffffff?text=Certificate"
                  }
                  alt={cert.title}
                />
              </div>
              <div className="certificate-content">
                <h3>{cert.title}</h3>
                <p className="certificate-issuer">
                  {cert.issuer} — {cert.date}
                </p>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="certificate-link"
                  >
                    Verify Credential
                    <svg
                      className="link-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 3H21V9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 14L21 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Certificates;
