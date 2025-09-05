
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 text-center">
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
        <div className="flex gap-4 mt-4">
          <a
            href="https://www.linkedin.com/Anjinappa"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            LinkedIn
          </a>
          <a
            href="https://www.facebook.com/anjinappa.ansi"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Facebook
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 py-12 max-w-3xl mx-auto">
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
      <section className="px-6 py-12 bg-gray-100">
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
              className="p-3 bg-white rounded-xl shadow text-center font-medium"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="px-6 py-12 max-w-4xl mx-auto">
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

      {/* Achievements */}
      <section className="px-6 py-12 bg-gray-100">
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
      <section className="px-6 py-12 text-center">
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
  );
}
