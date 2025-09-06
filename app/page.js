"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-3">
          {/* Logo / Name + Profile Pic */}
          <div className="flex items-center gap-3">
            <Image
              src="/profile.jpg"
              alt="Anjinappa N"
              width={36}
              height={36}
              className="rounded-full border shadow-sm"
            />
            <h1 className="font-bold text-lg">Anjinappa N</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#skills" className="hover:text-blue-600">Skills</a>
            <a href="#experience" className="hover:text-blue-600">Experience</a>
            <a href="#awards" className="hover:text-blue-600">Awards</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow px-6 py-4 space-y-2">
            <a href="#about" className="block hover:text-blue-600" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#skills" className="block hover:text-blue-600" onClick={() => setMenuOpen(false)}>Skills</a>
            <a href="#experience" className="block hover:text-blue-600" onClick={() => setMenuOpen(false)}>Experience</a>
            <a href="#awards" className="block hover:text-blue-600" onClick={() => setMenuOpen(false)}>Awards</a>
            <a href="#contact" className="block hover:text-blue-600" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50 text-gray-900 scroll-smooth max-w-5xl mx-auto px-6 py-28 space-y-12">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center" id="home">
          <Image
            src="/profile.jpg"
            alt="Anjinappa N"
            width={160}
            height={160}
            className="rounded-full shadow-lg"
          />
          <h1 className="mt-6 text-4xl font-bold">Anjinappa N</h1>
          <p className="mt-2 text-lg text-gray-600">
            Senior Software Engineer | Java, AWS, ReactJS
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a
              href="https://www.linkedin.com/Anjinappa"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/anjinappa.ansi"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
              target="_blank"
            >
              Facebook
            </a>
            <a
              href="/Anjinappa_Resume.pdf"
              download
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              Download Resume
            </a>
          </div>
        </section>

        {/* About */}
        <section id="about" className="px-6 py-12 bg-white rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p>
            I am a highly skilled and result-driven Software Engineer Developer
            with 12+ years of experience in full-stack development. Proficient in
            Java, Spring Boot, AWS, Microservices, and ReactJS. Known for
            delivering high-quality code, solving complex problems, and exceeding
            client expectations.
          </p>
        </section>

        {/* Skills */}
        <section id="skills" className="px-6 py-12 bg-white rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-4 text-center">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              "Java, Spring Boot",
              "Microservices, Spark",
              "AWS, Terraform, Spinnaker",
              "ReactJS, JavaScript",
              "SQL, Oracle, MySQL",
              "Docker, Kubernetes",
            ].map((skill, i) => (
              <div
                key={i}
                className="p-3 bg-gray-100 rounded-xl shadow text-center font-medium"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="px-6 py-12 bg-white rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-6">Experience</h2>
          <ul className="space-y-6">
            <li>
              <h3 className="font-bold">JP Morgan India (2018 - Present)</h3>
              <p>
                Senior Software Engineer | Designed and implemented CIB
                applications, AWS migration with Terraform, Microservices, React
                JS UI development.
              </p>
            </li>
            <li>
              <h3 className="font-bold">Tangoe India Softek (2015 - 2018)</h3>
              <p>
                Software Engineer | Spring Boot, Spark, Microservices, Awarded
                Hall of Fame.
              </p>
            </li>
            <li>
              <h3 className="font-bold">Symphony Teleca Corp. (2011 - 2015)</h3>
              <p>Associate Software Engineer | Java, Spring, Hibernate.</p>
            </li>
          </ul>
        </section>

        {/* Awards */}
        <section id="awards" className="px-6 py-12 bg-white rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Awards & Certifications
          </h2>
          <ul className="list-disc list-inside max-w-2xl mx-auto space-y-2">
            <li>Outstanding Performer Award - JP Morgan (2018)</li>
            <li>Hall of Fame Award - Tangoe Soft Tech</li>
            <li>AWS DEV-C01 & CLF-C02 Certified</li>
          </ul>
        </section>

        {/* Contact */}
        <section id="contact" className="px-6 py-12 bg-white rounded-2xl shadow text-center">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p>
            Email:{" "}
            <a href="mailto:anjinapp.n@gmail.com" className="text-blue-600">
              anjinapp.n@gmail.com
            </a>
          </p>
          <p>Phone: +91 9591931497</p>
        </section>

        <footer className="py-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Anjinappa N. All rights reserved.
        </footer>
      </main>
    </>
  );
}

