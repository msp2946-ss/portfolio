'use client';
import { motion } from "framer-motion";
import Link from "next/link"; // ✅ Add Link
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Hero() {
  return (
    <section id="home" className="section bg-grid">
      <div className="container-xxl text-center">
        <p className="text-sm text-brand-400">Hi, my name is</p>
        <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold leading-tight">
          <span className="gradient-accent">Shreyansh Pratap</span>
          <br />
          <span className="text-gray-300">Mishra</span>
        </h1>
        <p className="mt-6 text-lg text-subtext max-w-3xl mx-auto">
          I'm a Computer Science student passionate about building exceptional
          digital experiences. Currently pursuing B.Tech with expertise in{" "}
          <span className="gradient-accent">full-stacks</span> and{" "}
          <span className="gradient-accent">developments</span>.
        </p>

        {/* ✅ Fixed buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {/* Internal navigation → Link */}
          <Link href="#projects" className="btn btn-primary">
            View My Work
          </Link>

          {/* External → keep <a> */}
          <a
            href="https://drive.google.com/file/d/1AX77GpW0ppWyFn0mAPG_BaztLRSQq0-d/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Download Resume
          </a>
        </div>

        {/* Stats */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {[
            { value: "4+", label: "Years of Education" },
            { value: "10+", label: "Projects Completed" },
            { value: "100+", label: "DSA Problems Solved" },
          ].map((s) => (
            <motion.div
              key={s.label}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-3xl font-bold text-white">{s.value}</div>
              <div className="text-subtext mt-1 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 text-subtext"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 1.2 }}
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
}
