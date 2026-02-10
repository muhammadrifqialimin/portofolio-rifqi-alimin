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

  // Data Statis (About Me) - SEMUA GAMBAR DI SINI
  const aboutData = {
    name: "Muhammad Rifqi Alimin",
    title: "Web Developer",
    description:
      "Halo! Saya mahasiswa Universitas Muhammadiyah Yogyakarta yang sedang mendalami dunia Web Development. Saya menikmati proses merancang website yang tidak hanya estetis, tetapi juga fungsional dan dinamis. Berbekal ilmu Interaksi Manusia Komputer dan Pengembangan Web, saya berusaha menciptakan pengalaman pengguna yang optimal. Saat ini saya terus mengasah skill teknis dan kemampuan Bahasa Inggris untuk berkembang di industri teknologi.",
    bio: "Berkomitmen untuk mengembangkan solusi digital yang fungsional, terstruktur, dan sesuai dengan kebutuhan pengguna.",

    // ARRAY GAMBAR UNTUK SLIDER - SEMUA GAMBAR DI SINI
    images: [
      "https://i.postimg.cc/fk4kHN6f/gambar-2.jpg",
      "https://i.postimg.cc/sfLWQF0Z/gambar-1.jpg",
      "https://i.postimg.cc/vHTSd6cq/gambar-3.jpg",
      "https://i.postimg.cc/V6rC4DJ6/image.jpg ",
      "https://i.postimg.cc/Kj74sVxR/gambar-5.png",
    ],

    // Tetap pertahankan properti image untuk kompatibilitas
    image: "https://i.postimg.cc/sfLWQF0Z/gambar-1.jpg",

    cvUrl:
      "https://drive.google.com/file/d/17UnT0GwhtMtHxk_8jMt1BeDjUn4Zw5V9/view?usp=sharing",
    technologies: [
      "Next.js",
      "React.js",
      "HTML5 & CSS3",
      "JavaScript (ES6+)",
      "Node.js",
      "Relational Databases (SQL)",
      "Firebase",
      "Git & GitHub",
      "RESTful API",
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

      <Navbar name={aboutData.name} />

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
