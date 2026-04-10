"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import pubsData from "@/data/publications.json";

interface Publication {
  title: string;
  authors: string;
  venue: string;
  status: string;
  link: string;
}
const publications = pubsData as Publication[];

const STATUS_LABELS: Record<string, { label: string; class: string }> = {
  published: {
    label: "Published",
    class: "bg-neutral-950 dark:bg-neutral-50 text-white dark:text-neutral-950",
  },
  preprint: {
    label: "Preprint",
    class: "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300",
  },
  "in-progress": {
    label: "In Progress",
    class: "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400",
  },
};

export function Publications() {
  if (!publications.length) return null;

  return (
    <section id="publications" className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading tag="Research" title="Publications" />
        <div className="space-y-5">
          {publications.map((pub, i) => (
            <motion.div
              key={i}
              className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 hover:border-l-4 hover:border-l-neutral-950 dark:hover:border-l-neutral-50 transition-all duration-200"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex-shrink-0">
                  <BookOpen size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-display font-semibold text-neutral-950 dark:text-neutral-50 leading-snug">
                      {pub.link ? (
                        <Link
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline inline-flex items-center gap-1"
                        >
                          {pub.title}
                          <ExternalLink size={12} className="flex-shrink-0" />
                        </Link>
                      ) : (
                        pub.title
                      )}
                    </h3>
                    {pub.status && STATUS_LABELS[pub.status] && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${STATUS_LABELS[pub.status].class}`}
                      >
                        {STATUS_LABELS[pub.status].label}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {pub.authors}
                  </p>
                  <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500 mt-0.5 italic">
                    {pub.venue}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
