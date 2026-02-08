import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./about.css";

function About({ data, fadeInUp, staggerContainer }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [showDragHint, setShowDragHint] = useState(true);
  const [dragStartX, setDragStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  const images = data.images || [data.image];
  const validImages = images.filter((img) => img && img.trim() !== "");

  const goToSlide = (index, direction = 0) => {
    if (validImages.length <= 1) return;

    const newIndex = (index + validImages.length) % validImages.length;
    setCurrentSlide(newIndex);

    resetAutoSlide();

    setShowDragHint(false);
  };

  const nextSlide = () => {
    goToSlide(currentSlide + 1, 1);
  };

  const prevSlide = () => {
    goToSlide(currentSlide - 1, -1);
  };

  const startAutoSlide = () => {
    if (validImages.length <= 1 || !isAutoSliding) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 4000);
  };

  const resetAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startAutoSlide();
  };

  const handleDragStart = (e) => {
    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    setIsDragging(true);
    e.preventDefault();
  };

  const handleDragEnd = (e) => {
    if (!isDragging) return;

    const clientX = e.type.includes("touch")
      ? e.changedTouches
        ? e.changedTouches[0].clientX
        : dragStartX
      : e.clientX;

    const dragDistance = clientX - dragStartX;
    const threshold = 50;

    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }

    setIsDragging(false);
    setShowDragHint(false);
  };

  useEffect(() => {
    if (validImages.length > 1) {
      startAutoSlide();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [validImages.length, isAutoSliding]);

  useEffect(() => {
    if (showDragHint) {
      const timer = setTimeout(() => {
        setShowDragHint(false);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [showDragHint]);

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsAutoSliding(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    const handleMouseLeave = () => {
      setIsAutoSliding(true);
      startAutoSlide();
    };

    const sliderElement = sliderRef.current;
    if (sliderElement && validImages.length > 1) {
      sliderElement.addEventListener("mouseenter", handleMouseEnter);
      sliderElement.addEventListener("mouseleave", handleMouseLeave);
      sliderElement.addEventListener("touchstart", handleMouseEnter);
      sliderElement.addEventListener("touchend", handleMouseLeave);

      return () => {
        sliderElement.removeEventListener("mouseenter", handleMouseEnter);
        sliderElement.removeEventListener("mouseleave", handleMouseLeave);
        sliderElement.removeEventListener("touchstart", handleMouseEnter);
        sliderElement.removeEventListener("touchend", handleMouseLeave);
      };
    }
  }, [validImages.length]);

  if (validImages.length === 0) {
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
          <p>No images available</p>
        </div>
      </section>
    );
  }

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
            {validImages.length > 0 && (
              <div
                className="image-slider-container"
                ref={sliderRef}
                onMouseDown={handleDragStart}
                onMouseUp={handleDragEnd}
                onMouseLeave={() => setIsDragging(false)}
                onTouchStart={handleDragStart}
                onTouchEnd={handleDragEnd}
              >
                {/* Render semua gambar */}
                {validImages.map((imgSrc, index) => (
                  <div
                    key={index}
                    className={`slide-wrapper ${index === currentSlide ? "active" : ""}`}
                    style={{
                      transition: isDragging
                        ? "none"
                        : "opacity 1s ease-in-out",
                    }}
                  >
                    <img
                      src={imgSrc}
                      alt={`${data.name} - Photo ${index + 1}`}
                      onError={(e) => {
                        e.target.style.display = "none";
                        console.warn(`Failed to load image: ${imgSrc}`);
                      }}
                    />
                  </div>
                ))}

                {/* Efek glow */}
                <div className="image-glow"></div>

                {/* Drag hint (hanya muncul di awal) */}
                {showDragHint && validImages.length > 1 && (
                  <div className="drag-hint">
                    <svg
                      className="drag-hint-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 10L12 15L17 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 4V14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Drag left/right to navigate
                  </div>
                )}

                {/* Indicators minimal (hanya titik-titik) */}
                {validImages.length > 1 && (
                  <div className="image-slider-indicators">
                    {validImages.map((_, index) => (
                      <div
                        key={index}
                        className={`slider-indicator ${index === currentSlide ? "active" : ""}`}
                        onClick={() => {
                          goToSlide(index);
                          setShowDragHint(false);
                        }}
                        title={`View photo ${index + 1}`}
                        aria-label={`Go to photo ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
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
