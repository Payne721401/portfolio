import { SideNav } from "@/components/SideNav";
import { Hero } from "@/components/sections/Hero";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Publications } from "@/components/sections/Publications";
import { Skills } from "@/components/sections/Skills";
import { Certifications } from "@/components/sections/Certifications";
import { Languages } from "@/components/sections/Languages";
import { Awards } from "@/components/sections/Awards";
import { Activities } from "@/components/sections/Activities";
import { Hobbies } from "@/components/sections/Hobbies";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SideNav />
      <Hero />
      <Education />
      <Experience />
      <Projects />
      <Publications />
      <Skills />
      <Certifications />
      <Languages />
      <Awards />
      <Activities />
      <Hobbies />
      <Contact />
    </>
  );
}
