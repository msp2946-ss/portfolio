export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border py-10">
      <div className="container-xxl grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h4 className="text-white font-semibold">Shreyansh Pratap Mishra</h4>
          <p className="mt-2 text-subtext">
            Computer Science Engineering student passionate about creating innovative solutions through full‑stacks and developments.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold">Quick Links</h4>
          <ul className="mt-2 text-subtext space-y-2">
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold">Get In Touch</h4>
          <ul className="mt-2 text-subtext space-y-2">
            <li><a href="mailto:shreyanshji2946@gmail.com">shreyanshji2946@gmail.com</a></li>
            <li>Greater Noida, India</li>
          </ul>
        </div>
      </div>
      <div className="container-xxl mt-8 text-xs text-subtext">
        © {year} Shreyansh Pratap Mishra. All rights reserved.
      </div>
    </footer>
  );
}
