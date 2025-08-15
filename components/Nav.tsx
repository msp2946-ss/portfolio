"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { navLinks } from "@/lib/data";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "backdrop-blur bg-bg/70 border-b border-border" : ""
      }`}
    >
      <div className="container-xxl h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-brand-400">
          MSP
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-subtext">
          {(navLinks ?? []).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Social Icons - visible on all screens */}
        <div className="flex items-center gap-4 text-subtext">
          <a
            href="https://github.com/msp2946-ss"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/shreyansh-pratap-mishra-84181532a/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:shreyanshji2946@gmail.com"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden ml-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden border-t border-border bg-bg/90 backdrop-blur">
          <div className="container-xxl py-3 flex flex-col gap-3 text-sm">
            {(navLinks ?? []).map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
