import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import HorizontalScrollRow from "../layout/HorizontalScrollRow";
import SectionEyebrow from "../layout/SectionEyebrow";
import { featuredProjects } from "../../data/projects";

function FeaturedWork(
  {
    lang,
    hoveredProject,
    setHoveredProject,
    onOpenCaseStudy,
  }
) {
  const isGerman = lang === "de";

  const copy = {
    eyebrow: isGerman ? "Ausgewählte Arbeiten" : "Selected Work",
    heading: isGerman
      ? "Gestaltet, um immersiv zu wirken – und dabei dennoch lesbar, reduziert und portfolio-orientiert zu bleiben."
      : "Designed to feel immersive, but still readable, restrained, and portfolio-first.",
    body: isGerman
      ? "Das System balanciert dosierte Bewegung, starke Art Direction und eine hochwertige Fallstudien-Struktur. Dunkle Flächen tragen den Ton. Akzentfarbe bleibt bewusst eingesetzt."
      : "The system balances moderate motion, strong art direction, and premium case-study structure. Dark surfaces carry the tone. Accent color is saved for intent.",
    preview: isGerman ? "Live-Vorschau" : "Live preview",
    open: isGerman ? "Öffnen" : "Open",
    details: [
      {
        label: isGerman ? "Richtung" : "Direction",
        text: isGerman
          ? "Weniger gerahmt, atmosphärischer, mit Fokus auf großzügiges Tempo."
          : "Less framed, more atmospheric, with emphasis on spacious pacing.",
      },
      {
        label: isGerman ? "Akzent" : "Accent",
        text: isGerman
          ? "Cyan-Teal wird für geführte Aufmerksamkeit statt lauter Betonung reserviert."
          : "Cyan-teal is reserved for guided focus instead of loud emphasis.",
      },
      {
        label: isGerman ? "Lesbarkeit" : "Reading",
        text: isGerman
          ? "Die Komposition bleibt visuell geführt, aber die Hierarchie ruhig und klar."
          : "The composition stays visual-first, but the hierarchy remains calm and clear.",
      },
    ],
  };
  const projectCopy = {
    "nord-form": {
      category: isGerman ? "Brand System / Digitales Erlebnis" : "Brand System / Digital Experience",
      summary: isGerman
        ? "Eine cineastische, markengeführte Website für ein designorientiertes Produktstudio mit reduzierter Bewegung und starkem Narrativ."
        : "A cinematic brand-led website for a design-led product studio with restrained motion and strong narrative pacing.",
    },
    "atlas-case": {
      category: isGerman ? "Fallstudie / Art Direction" : "Case Study / Art Direction",
      summary: isGerman
        ? "Ein visuell geführtes Fallstudien-Template, das Prozess, Handwerk und Ergebnisse gleichwertig hochwertig wirken lässt."
        : "A visual-first case study template designed to make process, craft, and outcomes feel equally premium.",
    },
    "signal-duo": {
      category: isGerman ? "Identität / Portfolio" : "Identity / Portfolio",
      summary: isGerman
        ? "Ein modulares Portfoliosystem mit dunklen Flächen, übergroßer Typografie und kontrollierten Interaktionszuständen."
        : "A modular portfolio system using dark surfaces, oversized type, and controlled interaction states.",
    },
  };
  return (
    <section className="px-3 py-24 md:px-4 md:py-32 lg:px-5 xl:px-6 2xl:px-8">
      <div className="mx-auto w-full max-w-none">
        <div className="xl:pl-[2vw] 2xl:pl-[3vw]">
          <SectionEyebrow>{copy.eyebrow}</SectionEyebrow>
        </div>
        <div
          className="mt-4 grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20 xl:grid-cols-[0.84fr_1.16fr] xl:gap-24 2xl:gap-28"
        >
          <div className="pt-4 max-w-[60rem] xl:pl-[2vw] 2xl:pl-[3vw]">
            <div className="max-w-[48rem] text-3xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-5xl xl:max-w-[54rem] 2xl:max-w-[58rem]">
              {copy.heading}
            </div>
            <div className="mt-6 max-w-[42rem] text-base leading-[1.85] text-white/60 md:text-lg xl:max-w-[48rem] 2xl:max-w-[52rem]">
              {copy.body}
            </div>

            <div
              className="mt-14 grid max-w-[50rem] gap-1 xl:mt-16 xl:max-w-[56rem] 2xl:max-w-[60rem]"
            >
              {featuredProjects.map((project) => {
                const active = hoveredProject === project.id;
                return (
                  <motion.button
                    key={project.id}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onFocus={() => setHoveredProject(project.id)}
                    onClick={onOpenCaseStudy}
                    whileHover={{ y: -2 }}
                    className={`group border-b border-white/8 py-6 text-left transition ${
                      active
                        ? "border-[#6fd3d8]/35"
                        : "hover:border-white/14"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div
                          className={`font-mono-accent text-sm uppercase tracking-[0.2em] ${
                            active ? "text-[#9ae6e8]/72" : "text-white/42"
                          }`}
                        >
                          {projectCopy[project.id]?.category ?? project.category}
                        </div>
                        <div
                          className={`mt-3 text-2xl font-medium tracking-[-0.04em] transition ${
                            active
                              ? "text-white"
                              : "text-white/86 group-hover:text-white"
                          }`}
                        >
                          {project.title}
                        </div>
                        <div className="mt-4 max-w-xl text-sm leading-7 text-white/58">
                          {projectCopy[project.id]?.summary ?? project.summary}
                        </div>
                      </div>
                      <div
                        className={
                          active
                            ? "font-mono-accent text-sm text-[#9ae6e8]/72"
                            : "font-mono-accent text-sm text-white/36"
                        }
                      >
                        {project.year}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <motion.div layout className="relative pt-2 xl:pr-[1vw]">
            <div className="relative min-h-[560px] xl:min-h-[680px] 2xl:min-h-[760px]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono-accent text-xs uppercase tracking-[0.22em] text-white/40">
                    {copy.preview}
                  </div>
                  <div className="mt-2 text-2xl font-medium tracking-[-0.04em] text-white/88">
                    {featuredProjects
                      .find((project) => project.id === hoveredProject)
                      ?.title}
                  </div>
                </div>
                <button
                  onClick={onOpenCaseStudy}
                  className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-4 py-2 text-sm text-white/76 hover:bg-white/[0.08]"
                >
                  {copy.open} <ExternalLink size={14} />
                </button>
              </div>

              <div
                className="mt-8 grid h-[420px] gap-4 md:grid-cols-6 md:grid-rows-6 xl:mt-10 xl:h-[520px] xl:gap-5 2xl:h-[600px] 2xl:gap-6"
              >
                <div className="rounded-[2rem] bg-[linear-gradient(140deg,rgba(111,211,216,0.18),rgba(255,255,255,0.03))] shadow-[0_30px_80px_rgba(0,0,0,0.2)] md:col-span-4 md:row-span-4" />
                <div className="rounded-[1.7rem] bg-white/[0.05] backdrop-blur-sm md:col-span-2 md:row-span-2" />
                <div className="rounded-[1.7rem] bg-white/[0.05] backdrop-blur-sm md:col-span-2 md:row-span-2" />
                <div className="rounded-[1.7rem] bg-white/[0.035] md:col-span-3 md:row-span-2" />
                <div className="rounded-[1.7rem] bg-[linear-gradient(140deg,rgba(255,255,255,0.05),rgba(111,211,216,0.08))] md:col-span-3 md:row-span-2" />
              </div>

              <div className="mt-12 max-w-[52rem] pt-6 xl:mt-14 xl:max-w-[60rem] 2xl:max-w-[66rem]">
                <HorizontalScrollRow
                  className="md:overflow-visible"
                  rowClassName="md:grid md:grid-cols-3 md:gap-6 xl:gap-8 2xl:gap-10"
                  itemClassName="w-[16rem] md:w-auto md:flex-shrink"
                >
                  {copy.details.map((item) => (
                    <div key={item.label}>
                      <div
                        className="font-mono-accent text-[10px] uppercase tracking-[0.22em] text-white/36"
                      >
                        {item.label}
                      </div>
                      <div className="mt-3 text-sm leading-7 text-white/60">
                        {item.text}
                      </div>
                    </div>
                  ))}
                </HorizontalScrollRow>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedWork;
