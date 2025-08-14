'use client';
import { motion } from "framer-motion";

export default function ProjectCard({
  title, category, description, features, tech, code, demo
}: {
  title: string; category: string; description: string; features: string[]; tech: string[]; code?: string; demo?: string;
}) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start gap-3">
        <div className="badge">{category}</div>
      </div>
      <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-subtext">{description}</p>
      <div className="mt-5 grid md:grid-cols-2 gap-6">
        <div>
          <p className="font-medium">Project Overview</p>
          <ul className="list-disc ml-5 mt-2 text-subtext space-y-2">
            {features?.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
        <div>
          <p className="font-medium">Technologies Used</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {tech.map(t => <span key={t} className="badge">{t}</span>)}
          </div>
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        {code && <a className="btn btn-outline" href={code} target="_blank">View Code</a>}
        {demo && <a className="btn btn-primary" href={demo} target="_blank">Live Demo</a>}
      </div>
    </motion.div>
  );
}
