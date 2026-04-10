"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ALL_SECTIONS = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Publications" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "languages", label: "Languages" },
  { id: "awards", label: "Awards" },
  { id: "activities", label: "Activities" },
  { id: "hobbies", label: "Hobbies" },
  { id: "contact", label: "Contact" },
];

export function SideNav() {
  const [active, setActive] = useState("about");
  const [visible, setVisible] = useState(false);
  const [sections, setSections] = useState(ALL_SECTIONS);

  useEffect(() => {
    // Only show nav items for sections that actually rendered in the DOM
    setSections(ALL_SECTIONS.filter(({ id }) => !!document.getElementById(id)));
  }, []);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-35% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [sections]);

  return (
    <nav
      className={cn(
        "hidden xl:flex fixed top-1/2 -translate-y-1/2 flex-col gap-1 z-40 transition-opacity duration-300",
        "left-[max(0.5rem,calc((100vw-74rem)/2))]",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-label="Page sections"
    >
      {sections.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            className={cn(
              "group flex items-center gap-2.5 py-1 transition-all duration-200",
              isActive
                ? "text-neutral-950 dark:text-neutral-50"
                : "text-neutral-400 dark:text-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-400"
            )}
          >
            <span
              className={cn(
                "h-px bg-current transition-all duration-200 flex-shrink-0",
                isActive ? "w-6" : "w-3 group-hover:w-4"
              )}
            />
            <span
              className={cn(
                "text-xs tracking-wide transition-all duration-200",
                isActive ? "font-medium" : "font-normal"
              )}
            >
              {label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
