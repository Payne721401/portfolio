"use client";

import { motion } from "framer-motion";
import {
  SiPython, SiJavascript, SiDart, SiPostgresql,
  SiCplusplus,
  SiFlask, SiDjango, SiSelenium,
  SiGit, SiGithubactions, SiDocker, SiLinux,
  SiFirebase, SiCloudflare,
  SiPytorch, SiTensorflow, SiScikitlearn,
} from "react-icons/si";
import { Database } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import skills from "@/data/skills.json";

const SKILL_ICONS: Record<string, React.ReactNode> = {
  Python:          <SiPython />,
  "C/C++":         <SiCplusplus />,
  SQL:             <Database size={14} />,
  JavaScript:      <SiJavascript />,
  Dart:            <SiDart />,
  PostgreSQL:      <SiPostgresql />,
  Flask:           <SiFlask />,
  Django:          <SiDjango />,
  Selenium:        <SiSelenium />,
  Git:             <SiGit />,
  "GitHub Actions":<SiGithubactions />,
  Docker:          <SiDocker />,
  Linux:           <SiLinux />,
  Firebase:        <SiFirebase />,
  "Cloudflare R2": <SiCloudflare />,
  PyTorch:         <SiPytorch />,
  TensorFlow:      <SiTensorflow />,
  "Scikit-learn":  <SiScikitlearn />,
};

export function Skills() {
  if (!skills.length) return null;

  return (
    <section id="skills" className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading tag="Toolkit" title="Skills" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <h3 className="text-xs font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md hover:border-neutral-950 dark:hover:border-neutral-50 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors"
                  >
                    {SKILL_ICONS[item] && (
                      <span className="text-base leading-none opacity-80">
                        {SKILL_ICONS[item]}
                      </span>
                    )}
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
