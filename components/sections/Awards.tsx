"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import awards from "@/data/awards.json";

export function Awards() {
  if (!awards.length) return null;

  return (
    <section id="awards" className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading tag="Recognition" title="Awards & Honors" />
        <div className="space-y-4">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 hover:border-l-4 hover:border-l-neutral-950 dark:hover:border-l-neutral-50 transition-all duration-200"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="mt-0.5 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex-shrink-0">
                <Trophy size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-medium text-neutral-950 dark:text-neutral-50">
                    {award.title}
                  </h3>
                  <span className="text-xs text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
                    {award.year}
                  </span>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {award.issuer}
                </p>
                {award.description && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                    {award.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
