"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import hobbies from "@/data/hobbies.json";

export function Hobbies() {
  if (!hobbies.length) return null;

  return (
    <section id="hobbies" className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading tag="Life" title="Beyond Work" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {hobbies.map((hobby, i) => (
            <motion.div
              key={i}
              className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 hover:border-neutral-950 dark:hover:border-neutral-50 transition-all duration-200"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="text-3xl mb-3">{hobby.icon}</div>
              <h3 className="font-display font-semibold text-neutral-950 dark:text-neutral-50 mb-1">
                {hobby.name}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                {hobby.description}
              </p>
              {hobby.highlights && hobby.highlights.length > 0 && (
                <ul className="space-y-1">
                  {hobby.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="text-xs text-neutral-500 dark:text-neutral-500 flex items-start gap-1.5"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
