"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import projects from "@/data/projects.json";

export function Projects() {
  if (!projects.length) return null;

  return (
    <section id="projects" className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading tag="Work" title="Projects" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="group border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:border-l-4 hover:border-l-neutral-950 dark:hover:border-l-neutral-50 transition-all duration-200"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              {project.image && (
                <div className="h-40 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={600}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-display font-semibold text-neutral-950 dark:text-neutral-50">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors"
                        aria-label="GitHub"
                      >
                        <Github size={16} />
                      </Link>
                    )}
                    {project.demo && (
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors"
                        aria-label="Demo"
                      >
                        <ExternalLink size={16} />
                      </Link>
                    )}
                  </div>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                  {project.description}
                </p>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
