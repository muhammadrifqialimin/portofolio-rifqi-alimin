// src/App.jsx
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";

// Import Components
import Particles from "./components/Particles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects"; // Asumsi kamu sudah buat seperti cara di atas
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const aboutData = {
    name: "Muhammad Rifqi Alimin",
    title: "Full Stack Developer",
    description:
      "Saya adalah Full Stack Developer yang ahli dalam ekosistem JavaScript dan Kotlin. Berfokus pada solusi berdampak seperti platform edukasi Nusantara Cerdas (SDG 4) dan aplikasi MabarFokus, saya menggabungkan efisiensi backend dengan antarmuka responsif. Dengan minat pada inovasi IoT, saya berkomitmen menghadirkan produk teknologi yang modern, berkualitas, dan solutif.",
    bio: "Berdedikasi untuk menjembatani ide kompleks menjadi solusi digital yang fungsional dan berdampak luas",
    image: "../public/images/image.png",
    cvUrl:
      "https://drive.google.com/file/d/1dtHzgI-36FPh51Tg6EcF4seTB47z8std/view?usp=sharing",
    technologies: [
      "Kotlin", // Sesuai 'Android Development' di CV
      "React.js", // Sesuai 'Web Architecture' di CV
      "Node.js", // Sesuai 'Web Architecture' di CV
      "MySQL", // Sesuai 'Relational Databases' di CV
      "Firebase", // Sesuai 'Firebase Integration' di CV
      "Git & GitHub", // Sesuai di CV
      "RESTful API", // Tambahan dari CV
      "TypeScript",
      "Tailwind CSS",
      "Sequelize",
      "Arduino/IoT",
    ],
  };

  const contactData = {
    github: "https://github.com/muhammadrifqialimin",
    linkedin: "https://www.linkedin.com/in/muhammad-rifqi-alimin-787363366/",
    email:
      "https://mail.google.com/mail/?view=cm&fs=1&to=rifqyalimin25@gmail.com",
  };

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
      <Hero fadeInUp={fadeInUp} />

      <About
        data={aboutData}
        fadeInUp={fadeInUp}
        staggerContainer={staggerContainer}
      />

      <Projects
        projects={projects}
        loading={loading}
        fadeInUp={fadeInUp}
        staggerContainer={staggerContainer}
      />

      <Certificates
        certificates={certificates}
        fadeInUp={fadeInUp}
        staggerContainer={staggerContainer}
      />

      <Contact
        contactData={contactData}
        fadeInUp={fadeInUp}
        staggerContainer={staggerContainer}
      />

      <Footer name={aboutData.name} contactData={contactData} />
    </div>
  );
}

export default App;
