import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mouse } from "lucide-react";

import HorizontalScrollRow from "../layout/HorizontalScrollRow";
import SectionEyebrow from "../layout/SectionEyebrow";

function Hero({ lang, onExplore, onCaseStudy }) {
  const sectionRef = useRef(null);
  const isGerman = lang === "de";
  const copy = {
    eyebrow: isGerman ? "Branding / Digital / Fallstudien" : "Branding / Digital / Case Studies",
    body:
      isGerman
        ? "Ein dunkles, cineastisches Portfolio für eine auf Branding fokussierte Designerin – aufgebaut auf klarer visueller Rhythmik, flüssigen Übergängen und Fallstudien, die sich ebenso durchdacht anfühlen wie die Arbeit selbst."
        : "A dark, cinematic portfolio for a branding-focused designer — built around sharp visual rhythm, fluid transitions, and case studies that feel as considered as the work itself.",
    caseStudy: isGerman ? "Fallstudie ansehen" : "Explore case study",
    selectedWork: isGerman ? "Arbeiten ansehen" : "View selected work",
    stats: [
      {
        label: isGerman ? "Ansatz" : "Approach",
        text:
          isGerman
            ? "Markenorientierte digitale Erzählungen mit dosierter Bewegung und klarerem Tempo."
            : "Brand-first digital narratives with measured motion and cleaner pacing.",
      },
      {
        label: isGerman ? "Fokus" : "Focus",
        text:
          isGerman
            ? "Fallstudien, die editorial, großzügig und bewusst art-directed wirken."
            : "Case studies that feel editorial, spacious, and intentionally art-directed.",
      },
      {
        label: isGerman ? "Ton" : "Tone",
        text:
          isGerman
            ? "Dunkle, hochwertige Flächen mit sanften Cyan-Akzenten statt harten Farbreizen."
            : "Dark, premium surfaces softened by misted cyan highlights instead of sharp color hits.",
      },
    ],
  };

  const scrollPastHero = () => {
    sectionRef.current?.nextElementSibling?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-end overflow-hidden px-3 pb-14 pt-36 md:px-4 md:pb-20 lg:px-5 xl:px-6 2xl:px-8">
      <div className="grid w-full gap-16 md:grid-cols-[0.94fr_1.06fr] md:gap-14 xl:grid-cols-[0.88fr_1.12fr] xl:gap-20 2xl:gap-24">
        <div className="relative z-10 max-w-none md:pl-[2vw] xl:pl-[3.5vw] 2xl:pl-[4vw]">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionEyebrow>{copy.eyebrow}</SectionEyebrow>
            <h1 className="mt-6 w-fit max-w-full whitespace-nowrap text-[clamp(3rem,8.2vw,8.75rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-white">
              <span>NH</span> <span className="mx-[0.14em] inline-block translate-y-[-0.14em] text-[0.72em] leading-none text-white/55">/</span> <span>DUO</span>
            </h1>
            <div className="mt-8 max-w-[50rem] text-[clamp(1.12rem,2vw,1.45rem)] leading-[1.8] text-white/68 xl:max-w-[56rem] 2xl:max-w-[60rem]">
              {copy.body}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onCaseStudy}
              className="cursor-contrast-dark group inline-flex items-center gap-3 rounded-full bg-[#6fd3d8] px-7 py-4 text-base font-medium text-[#0d1416] transition hover:scale-[1.02] hover:bg-[#85dde1]"
            >
              {copy.caseStudy}
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </button>
            <button
              onClick={onExplore}
              className="inline-flex items-center gap-3 rounded-full bg-white/[0.04] px-7 py-4 text-base text-white/82 transition hover:bg-white/[0.07]"
            >
              {copy.selectedWork}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 max-w-[56rem] border-t border-white/8 pt-8 text-center xl:mt-20 xl:max-w-[62rem] 2xl:max-w-[68rem]"
          >
            <HorizontalScrollRow
              className="sm:overflow-visible"
              rowClassName="sm:grid sm:grid-cols-3 sm:gap-8 xl:gap-10 2xl:gap-12"
              itemClassName="w-[17rem] sm:w-auto sm:flex-shrink text-center"
            >
              {copy.stats.map((item) => (
                <div key={item.label}>
                  <div className="font-mono-accent text-[10px] uppercase tracking-[0.24em] text-white/38">{item.label}</div>
                  <div className="mt-3 text-sm leading-7 text-white/66">{item.text}</div>
                </div>
              ))}
            </HorizontalScrollRow>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex items-center justify-end xl:pr-[1vw]"
        >
          <div />
        </motion.div>
      </div>

      <motion.button
        onClick={scrollPastHero}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center justify-center text-white/56 md:inline-flex"
      >
        <span className="relative flex h-12 w-8 items-start justify-center rounded-full border border-white/14 bg-white/[0.03] pt-2 backdrop-blur-sm">
          <Mouse size={16} className="opacity-80" />
          <span className="absolute top-2 h-1.5 w-1.5 rounded-full bg-[#6fd3d8]/80" />
        </span>
      </motion.button>
    </section>
  );
}

export default Hero;
