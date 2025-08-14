import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import ExperienceCard from "@/components/ExperienceCard";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { projects } from "@/lib/data";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        <section id="about" className="section">
          <div className="container-xxl">
            <SectionTitle title="About" accent="Me" subtitle="Passionate computer science student with a drive for innovation and problem‑solving." center />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-white font-semibold mb-3">My Journey</h3>
                <p className="text-subtext">
                  Hello! I'm Shreyansh Pratap Mishra, a dedicated Computer Science Engineering student at IIITM University, Greater Noida.
                </p>
                <p className="text-subtext mt-4">
                  I specialize in <span className="gradient-accent">full‑stack development</span> and <span className="gradient-accent">machine learning</span>, with hands‑on experience in building applications that solve real‑world problems.
                </p>
              </div>
              <div className="grid gap-6">
                <div className="card">
                  <h4 className="text-white font-semibold">B.Tech in Computer Science Engineering</h4>
                  <a className="text-brand-400 text-sm" href="#">IILM University, Greater Noida</a>
                  <p className="text-xs text-subtext mt-1">2024–2028 — Greater Noida</p>
                  <p className="text-subtext mt-2 text-sm">Related Coursework: DSA, OOPs, Developments, AI</p>
                </div>
                <div className="card">
                  <h4 className="text-white font-semibold">High School Education</h4>
                  <a className="text-brand-400 text-sm" href="#">B.N.S School Kursato Varanasi</a>
                  <p className="text-xs text-subtext mt-1">2021–2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container-xxl">
            <SectionTitle title="My" accent="Experience" subtitle="A journey through hands‑on projects, competitions, and learning experiences" center />
            <div className="grid gap-8">
              <ExperienceCard
                title="JAVA Programming"
                org="TECH‑ERA"
                period="2023–2024"
                points={[
                  "Built a TO-DO app using Python & Java with CLI and GUI.",
                  "Developed a calculator with basic arithmetic and input handling.",
                  "Created a password generator with configurable length and complexity."
                ]}
                tags={["Java", "Python", "GUI Development", "OOP"]}
              />
              <ExperienceCard
                title="Software Developer"
                org="Hackathon Participation"
                period="2023–2024"
                points={[
                  "Collaborated in college hackathons to deliver working prototypes.",
                  "Participated in GFG HackFest showcasing problem‑solving skills.",
                  "Worked under time constraints with a team."
                ]}
                tags={["Team Collaboration", "Problem Solving", "Time Management"]}
              />
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container-xxl">
            <SectionTitle title="Featured" accent="Projects" subtitle="A showcase of my technical skills through real‑world applications" center />
            <div className="grid gap-8">
              {projects.map(p => (
                <ProjectCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container-xxl">
            <SectionTitle title="Core" accent="Skills" center />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {["Java", "TypeScript", "Python", "React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL", "TailwindCSS", "TensorFlow", "Docker"].map(s => (
                <div key={s} className="card text-center">{s}</div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container-xxl">
            <SectionTitle title="Get In" accent="Touch" center />
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <ContactForm />
              <div className="grid gap-6">
                <div className="card">
                  <h4 className="text-white font-semibold">Contact Information</h4>
                  <ul className="mt-3 text-subtext space-y-2">
                    <li><b>Email:</b> shreyanshji2946@gmail.com</li>
                    <li><b>Phone:</b> (+91) Available Soon </li>
                    <li><b>Location:</b> Greater Noida, India</li>
                  </ul>
                </div>
                <div className="card">
                  <h4 className="text-white font-semibold">Interested in my background?</h4>
                  <a href="https://drive.google.com/file/d/1AX77GpW0ppWyFn0mAPG_BaztLRSQq0-d/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-3">Download Resume</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
