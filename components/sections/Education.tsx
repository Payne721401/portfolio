"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import education from "@/data/education.json";

export function Education() {
  if (!education.length) return null;

  return (
    <section id="education" className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading tag="Background" title="Education" />
        <div className="space-y-6">
          {education.map((edu, i) => (
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
                  <GraduationCap size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display font-semibold text-neutral-950 dark:text-neutral-50">
                        {edu.school}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                        {edu.degree} · {edu.field}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
                        {edu.period}
                      </span>
                      {edu.gpa && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-0.5">
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                  </div>
                  {edu.notes && (
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                      {edu.notes}
                    </p>
                  )}
                  {edu.courses && edu.courses.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {edu.courses.map((course) => (
                        <span
                          key={course}
                          className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md"
                        >
                          {course}
                        </span>
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
