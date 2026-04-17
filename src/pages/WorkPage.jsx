import React from "react";
import { motion } from "framer-motion";

import SectionEyebrow from "../components/layout/SectionEyebrow";
import { featuredProjects } from "../data/projects";

function WorkPage({ lang, onOpenCaseStudy }) {
  const projectCopy = {
    "nord-form": {
      category: lang === "de" ? "Brand System / Digitales Erlebnis" : "Brand System / Digital Experience",
      summary:
        lang === "de"
          ? "Eine cineastische, markengeführte Website für ein designorientiertes Produktstudio mit reduzierter Bewegung und starkem Narrativ."
          : "A cinematic brand-led website for a design-led product studio with restrained motion and strong narrative pacing.",
    },
    "atlas-case": {
      category: lang === "de" ? "Fallstudie / Art Direction" : "Case Study / Art Direction",
      summary:
        lang === "de"
          ? "Ein visuell geführtes Fallstudien-Template, das Prozess, Handwerk und Ergebnisse gleichwertig hochwertig wirken lässt."
          : "A visual-first case study template designed to make process, craft, and outcomes feel equally premium.",
    },
    "signal-duo": {
      category: lang === "de" ? "Identität / Portfolio" : "Identity / Portfolio",
      summary:
        lang === "de"
          ? "Ein modulares Portfoliosystem mit dunklen Flächen, übergroßer Typografie und kontrollierten Interaktionszuständen."
          : "A modular portfolio system using dark surfaces, oversized type, and controlled interaction states.",
    },
  };
  return (
    <section className="px-4 pb-20 pt-32 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionEyebrow>{lang === "de" ? "Arbeitsindex" : "Work Index"}</SectionEyebrow>
        <div className="mb-10 max-w-4xl text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
          {lang === "de"
            ? "Ein visuelles System für ausgewählte Projekte, Erzählungen und markengeprägte digitale Momente."
            : "A visual system for selected projects, narratives, and branded digital moments."}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.button
              key={project.id}
              onClick={onOpenCaseStudy}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="group rounded-[2rem] border border-white/10 bg-white/5 p-4 text-left transition hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <div className="mb-4 aspect-[4/5] rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/8 to-white/[0.03]" />
              <div className="font-mono-accent text-xs uppercase tracking-[0.22em] text-white/42">{projectCopy[project.id]?.category ?? project.category}</div>
              <div className="mt-2 text-2xl font-medium tracking-[-0.04em]">{project.title}</div>
              <div className="mt-2 text-sm leading-7 text-white/62">{projectCopy[project.id]?.summary ?? project.summary}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkPage;
