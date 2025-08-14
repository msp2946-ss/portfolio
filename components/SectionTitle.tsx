'use client';
import { motion } from "framer-motion";

export default function SectionTitle({
  title,
  accent,
  subtitle,
  center = false,
}: {
  title: string;
  accent: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <motion.h2
        className="text-3xl sm:text-4xl font-semibold"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title} <span className="gradient-accent">{accent}</span>
      </motion.h2>
      {subtitle && (
        <motion.p
          className={`mt-3 text-subtext ${center ? "max-w-2xl mx-auto" : ""}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
