"use client";

import { motion } from "framer-motion";
import { Users, Trophy, Heart, Mountain } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import activities from "@/data/activities.json";

const TYPE_ICON: Record<string, React.ReactNode> = {
  "Sports Team": <Trophy size={16} />,
  "Club Officer": <Users size={16} />,
  "Volunteer": <Heart size={16} />,
  "Club": <Mountain size={16} />,
};

const TYPE_BADGE: Record<string, string> = {
  "Sports Team": "bg-neutral-950 dark:bg-neutral-50 text-white dark:text-neutral-950",
  "Club Officer": "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200",
  "Volunteer": "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300",
  "Club": "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300",
};

export function Activities() {
  if (!activities.length) return null;

  return (
    <section id="activities" className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading tag="Campus Life" title="Activities & Clubs" />
        <div className="space-y-4">
          {activities.map((item, i) => (
            <motion.div
              key={i}
              className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex-shrink-0">
                  {TYPE_ICON[item.type] ?? <Users size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display font-semibold text-neutral-950 dark:text-neutral-50">
                          {item.role}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_BADGE[item.type] ?? TYPE_BADGE["Club"]}`}>
                          {item.type}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                        {item.org}
                      </p>
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-500 whitespace-nowrap flex-shrink-0">
                      {item.period}
                    </span>
                  </div>
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-2.5 space-y-1">
                      {item.highlights.map((h, j) => (
                        <li key={j} className="text-sm text-neutral-600 dark:text-neutral-300 flex items-start gap-2">
                          <span className="mt-2 w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
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
