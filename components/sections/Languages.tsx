"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import languages from "@/data/languages.json";

const LEVEL_WEIGHT: Record<string, number> = {
  Native: 5,
  "Professional Working": 4,
  "Full Professional": 4,
  Conversational: 3,
  Elementary: 2,
};

function ProficiencyDots({ levelEn }: { levelEn: string }) {
  const filled = LEVEL_WEIGHT[levelEn] ?? 3;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={
            i < filled
              ? "w-2 h-2 rounded-full bg-neutral-800 dark:bg-neutral-200"
              : "w-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-700"
          }
        />
      ))}
    </div>
  );
}

export function Languages() {
  if (!languages.length) return null;

  return (
    <section id="languages" className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading tag="Communication" title="Languages" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {languages.map((lang, i) => (
            <motion.div
              key={i}
              className="border border-neutral-200 dark:border-neutral-800 rounded-xl px-6 py-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display font-semibold text-neutral-950 dark:text-neutral-50 text-base">
                    {lang.name}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {lang.level}
                    {lang.score && (
                      <span className="ml-2 text-xs text-neutral-400 dark:text-neutral-500">
                        · {lang.score}
                      </span>
                    )}
                  </p>
                </div>
                <div className="mt-1 flex-shrink-0">
                  <ProficiencyDots levelEn={lang.levelEn} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
