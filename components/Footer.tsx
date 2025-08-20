"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-6 mt-12">
      <div className="container-xxl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-subtext">
        <p>© {new Date().getFullYear()} Shreyansh Pratap Mishra</p>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/msp2946-ss"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={18} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/shreyansh-pratap-mishra-84181532a/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </Link>
          <Link href="mailto:shreyanshji2946@gmail.com" aria-label="Email">
            <Mail size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
