'use client';
import { motion } from "framer-motion";

export default function ExperienceCard({
  title, org, period, points, tags
}: { title: string; org: string; period: string; points: string[]; tags: string[] }) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <a href="#" className="text-brand-400 text-sm">{org}</a>
          <p className="text-xs text-subtext mt-1">{period}</p>
        </div>
      </div>
      <div className="mt-4 grid md:grid-cols-2 gap-6">
        <div>
          <p className="font-medium">Key Achievements:</p>
          <ul className="list-disc ml-5 mt-2 text-subtext space-y-2">
            {points.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
        <div>
          <p className="font-medium">Technologies Used:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map(t => <span key={t} className="badge">{t}</span>)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
