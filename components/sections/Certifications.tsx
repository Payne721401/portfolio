"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import certsData from "@/data/certifications.json";

interface Cert {
  name: string;
  issuer: string;
  date: string;
  link: string;
}
const certifications = certsData as Cert[];

export function Certifications() {
  if (!certifications.length) return null;

  return (
    <section id="certifications" className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading tag="Credentials" title="Certifications" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 hover:border-l-4 hover:border-l-neutral-950 dark:hover:border-l-neutral-50 transition-all duration-200"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-neutral-600 dark:text-neutral-400 flex-shrink-0">
                  <BadgeCheck size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-sm text-neutral-950 dark:text-neutral-50 leading-snug">
                      {cert.name}
                    </h3>
                    {cert.link && (
                      <Link
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors flex-shrink-0"
                        aria-label="Verify certificate"
                      >
                        <ExternalLink size={13} />
                      </Link>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                    {cert.issuer} · {cert.date}
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
