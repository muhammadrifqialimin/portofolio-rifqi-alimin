// src/App.jsx
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";

// Import Components
import Particles from "./components/Particles/Particles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Certificates from "./components/Certificates/Certificates";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer";

function App() {
  // State untuk data dari Firebase
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Data Statis (About Me)
  const aboutData = {
    name: "Muhammad Rifqi Alimin",
    title: "Full Stack Developer",
    description:
      "As a Full Stack Developer, I combine robust technical skills in JavaScript and Kotlin with a creative approach to product development. By viewing challenges from diverse perspectives, I transform innovative concepts into functional digital solutions. Dedicated to efficiency and quality, my goal is to build modern technology that delivers real, meaningful value to its users.",
    bio: "Dedicated to bridging complex ideas into functional, high-impact digital solutions.",

    // PERBAIKAN: Path gambar menggunakan "/" agar terbaca di Vercel (Folder Public)
    image: "/images/image.png",

    cvUrl:
      "https://drive.google.com/file/d/1dtHzgI-36FPh51Tg6EcF4seTB47z8std/view?usp=sharing",
    technologies: [
      "Kotlin",
      "React.js",
      "Node.js",
      "Relational Databases (SQL)",
      "Firebase",
      "Git & GitHub",
      "RESTful API",
      "Agile Methodology",
      "Creative Problem Solving",
      "Arduino/IoT",
    ],
  };

  // Data Statis (Contact)
  const contactData = {
    github: "https://github.com/muhammadrifqialimin",
    linkedin: "https://www.linkedin.com/in/muhammad-rifqi-alimin-787363366/",
    email:
      "https://mail.google.com/mail/?view=cm&fs=1&to=rifqyalimin25@gmail.com",
  };

  // Fetch Data dari Firebase saat website dibuka
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsSnap = await getDocs(collection(db, "projects"));
        setProjects(
          projectsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        );

        const certsSnap = await getDocs(collection(db, "certificates"));
        setCertificates(
          certsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        );

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Konfigurasi Animasi Framer Motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="app-container">
      <Particles />

      {/* Navbar menerima nama untuk logo */}
      <Navbar name={aboutData.name} />

      {/* --- BAGIAN PENTING: SECTION DENGAN ID --- */}
      {/* Navbar mencari ID ini ("hero", "about", dll) untuk tujuan scroll */}

      <section id="hero">
        <Hero fadeInUp={fadeInUp} />
      </section>

      <section id="about">
        <About
          data={aboutData}
          fadeInUp={fadeInUp}
          staggerContainer={staggerContainer}
        />
      </section>

      <section id="projects">
        <Projects
          projects={projects}
          loading={loading}
          fadeInUp={fadeInUp}
          staggerContainer={staggerContainer}
        />
      </section>

      <section id="certificates">
        <Certificates
          certificates={certificates}
          fadeInUp={fadeInUp}
          staggerContainer={staggerContainer}
        />
      </section>

      <section id="contact">
        <Contact
          contactData={contactData}
          fadeInUp={fadeInUp}
          staggerContainer={staggerContainer}
        />
      </section>

      <Footer name={aboutData.name} contactData={contactData} />
    </div>
  );
}

export default App;
