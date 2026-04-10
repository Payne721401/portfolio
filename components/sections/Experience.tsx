"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Paperclip } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import experience from "@/data/experience.json";

export function Experience() {
  if (!experience.length) return null;

  return (
    <section id="experience" className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading tag="Career" title="Experience" />
        <div className="space-y-6">
          {experience.map((job, i) => (
            <motion.div
              key={i}
              className="group border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 hover:border-l-4 hover:border-l-neutral-950 dark:hover:border-l-neutral-50 transition-all duration-200"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                  <Briefcase size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display font-semibold text-neutral-950 dark:text-neutral-50">
                        {job.role}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                        {job.company} · {job.location}
                      </p>
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {job.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="text-sm text-neutral-600 dark:text-neutral-300 flex items-start gap-2"
                      >
                        <span className="mt-2 w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600 flex-shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {job.links && job.links.filter(l => l.url).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                      {job.links.filter(l => l.url).map((link, k) => (
                        <Link
                          key={k}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors"
                        >
                          <Paperclip size={11} />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
