import Image from "next/image";
import profile from "../data/profile";
import experience from "../data/experience";
import skills from "../data/skills";
import awards from "../data/awards";
import certifications from "../data/certifications";
import social from "../data/social";
import resume from "../data/resume";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";

export default function Home() {
  return (
    <>
      <Navbar />

      <Container
        as="main"
        className="min-h-screen bg-gray-50 text-gray-900 scroll-smooth py-28 space-y-12"
      >
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center" id="home">
          <Image
            src={profile.photo}
            alt={profile.name}
            width={160}
            height={160}
            className="rounded-full shadow-lg"
          />
          <h1 className="mt-6 text-4xl font-bold">{profile.name}</h1>
          <p className="mt-2 text-lg text-gray-600">{profile.heroTitle}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a
              href={social.linkedin.url}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              href={social.facebook.url}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
              target="_blank"
            >
              Facebook
            </a>
            <a
              href={resume.downloadPath}
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
          <p>{profile.aboutSummary}</p>
        </section>

        {/* Skills */}
        <section id="skills" className="px-6 py-12 bg-white rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-4 text-center">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {skills.map((skill, i) => (
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
            {experience.map((job, i) => (
              <li key={i}>
                <h3 className="font-bold">
                  {job.company} ({job.period})
                </h3>
                <p>
                  {job.role} | {job.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Awards */}
        <section id="awards" className="px-6 py-12 bg-white rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Awards & Certifications
          </h2>
          <ul className="list-disc list-inside max-w-2xl mx-auto space-y-2">
            {awards.map((item, i) => (
              <li key={`award-${i}`}>{item}</li>
            ))}
            {certifications.map((item, i) => (
              <li key={`cert-${i}`}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section id="contact" className="px-6 py-12 bg-white rounded-2xl shadow text-center">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p>
            Email:{" "}
            <a href={`mailto:${social.email}`} className="text-blue-600">
              {social.email}
            </a>
          </p>
          <p>Phone: {social.phone}</p>
        </section>
      </Container>

      <Footer />
    </>
  );
}
