import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import profile from "@/data/profile.json";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 py-10 mt-20">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-4">
          <Link
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </Link>
          <Link
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </Link>
          <Link
            href={`mailto:${profile.email}`}
            className="text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
