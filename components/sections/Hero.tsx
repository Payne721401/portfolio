"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Github, Linkedin, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";
import profile from "@/data/profile.json";

type PhotoEntry = string | { src: string; position?: string };
const photos = (profile as typeof profile & { photos?: PhotoEntry[] }).photos ?? [profile.avatar];

export function Hero() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = () => {
    const el = stripRef.current;
    if (!el || photos.length <= 1) return;
    const idx = Math.round(el.scrollLeft / (el.scrollWidth / photos.length));
    setActiveIdx(Math.min(idx, photos.length - 1));
  };

  const scrollTo = (idx: number) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollTo({ left: (el.scrollWidth / photos.length) * idx, behavior: "smooth" });
  };

  return (
    <section id="about" className="min-h-screen flex items-center pt-16">
      <div className="max-w-4xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">

          {/* Text */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {profile.status && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-4 border border-neutral-200 dark:border-neutral-700 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {profile.status}
              </span>
            )}
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-neutral-950 dark:text-neutral-50 leading-tight mb-3">
              {profile.name}
            </h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-4">
              {profile.title}
            </p>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-lg mb-8">
              {profile.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link
                href={profile.links.cv}
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-950 dark:bg-neutral-50 text-white dark:text-neutral-950 text-sm font-medium rounded-md hover:opacity-80 transition-opacity"
              >
                <Download size={14} />
                Download CV
              </Link>
              <Link
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-sm font-medium rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <Github size={14} />
                GitHub
              </Link>
              <Link
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-sm font-medium rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <Linkedin size={14} />
                LinkedIn
              </Link>
              <Link
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-sm font-medium rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <Mail size={14} />
                Email
              </Link>
            </div>
          </motion.div>

          {/* Photo strip */}
          <motion.div
            className="flex-shrink-0 w-full md:w-80"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              ref={stripRef}
              onScroll={handleScroll}
              className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
            >
              {photos.map((photo, i) => {
                const src = typeof photo === "string" ? photo : photo.src;
                const position = typeof photo === "string" ? "center" : (photo.position ?? "center");
                return (
                  <div
                    key={i}
                    className="flex-shrink-0 w-72 h-64 md:w-80 md:h-72 rounded-2xl overflow-hidden snap-start border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800"
                  >
                    <Image
                      src={src}
                      alt={`Photo ${i + 1}`}
                      width={320}
                      height={288}
                      className="object-cover w-full h-full"
                      style={{ objectPosition: position }}
                      priority={i === 0}
                    />
                  </div>
                );
              })}
            </div>

            {/* Dot indicators — only shown when there are multiple photos */}
            {photos.length > 1 && (
              <div className="flex justify-center gap-2 mt-3">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    aria-label={`Go to photo ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIdx
                        ? "w-4 bg-neutral-800 dark:bg-neutral-200"
                        : "w-1.5 bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-500 dark:hover:bg-neutral-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
