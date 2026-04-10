"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import profile from "@/data/profile.json";

export function Contact() {
  return (
    <section id="contact" className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading tag="Get in Touch" title="Contact" />
        <motion.div
          className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm flex items-center gap-1.5 mb-4">
                <MapPin size={14} className="flex-shrink-0" />
                {profile.location}
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors underline-offset-4 hover:underline"
                >
                  <Mail size={15} />
                  {profile.email}
                </Link>
                <Link
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors underline-offset-4 hover:underline"
                >
                  <Github size={15} />
                  {profile.links.github.replace("https://", "")}
                </Link>
                <Link
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors underline-offset-4 hover:underline"
                >
                  <Linkedin size={15} />
                  {profile.links.linkedin.replace("https://", "")}
                </Link>
              </div>
            </div>
            <Link
              href={profile.links.cv}
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-3 bg-neutral-950 dark:bg-neutral-50 text-white dark:text-neutral-950 text-sm font-medium rounded-lg hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <Download size={15} />
              Download CV
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
