import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Mouse } from "lucide-react";

import HorizontalScrollRow from "../layout/HorizontalScrollRow";
import SectionEyebrow from "../layout/SectionEyebrow";

function Hero({ lang, onExplore, onCaseStudy }) {
  const root = useRef(null);
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
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

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from("[data-hero-bg]", {
        scale: 1.04,
        opacity: 0,
        duration: 1.1,
      })
        .from(
          "[data-hero-eyebrow]",
          {
            y: 18,
            opacity: 0,
            duration: 0.55,
          },
          "-=0.72"
        )
        .from(
          "[data-hero-title-line]",
          {
            y: 46,
            opacity: 0,
            stagger: 0.08,
            duration: 0.78,
          },
          "-=0.48"
        )
        .from(
          "[data-hero-copy]",
          {
            y: 24,
            opacity: 0,
            duration: 0.62,
          },
          "-=0.4"
        )
        .from(
          "[data-hero-cta]",
          {
            y: 18,
            opacity: 0,
            stagger: 0.08,
            duration: 0.52,
          },
          "-=0.34"
        )
        .from(
          "[data-hero-meta]",
          {
            y: 20,
            opacity: 0,
            duration: 0.68,
          },
          "-=0.28"
        );
    },
    { scope: root, dependencies: [prefersReducedMotion, lang] }
  );

  return (
    <section
      ref={root}
      className="home-shell relative flex min-h-screen items-end overflow-hidden pb-14 pt-36 md:pb-20"
    >
      <div
        data-hero-bg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(111,211,216,0.1),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(14,20,27,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-[46%] bg-[linear-gradient(180deg,rgba(14,20,27,0),rgba(14,20,27,0.34)_38%,rgba(14,20,27,0.7))]" />
      </div>
      <div className="grid w-full gap-16 md:grid-cols-[0.94fr_1.06fr] md:gap-14 xl:grid-cols-[0.88fr_1.12fr] xl:gap-20 2xl:gap-24">
        <div className="relative z-10 max-w-none md:pl-[2vw] xl:pl-[3.5vw] 2xl:pl-[4vw]">
          <div>
            <div data-hero-eyebrow>
              <SectionEyebrow>{copy.eyebrow}</SectionEyebrow>
            </div>
            <h1
              className="page-title heading-safe mt-6 max-w-[12ch] break-words text-[clamp(2rem,5.6vw,5.4rem)] font-[600] leading-[0.88] tracking-[0.05em] text-white"
            >
              <span data-hero-title-line className="inline-block">
                NH
              </span>{" "}
              <span
                data-hero-title-line
                className="mx-[0.14em] inline-block translate-y-[-0.14em] text-[0.72em] leading-none text-white/55"
              >
                /
              </span>{" "}
              <span data-hero-title-line className="inline-block">
                DUO
              </span>
            </h1>
            <p
              data-hero-copy
              className="body-safe mt-8 text-[clamp(1rem,2vw,1.45rem)] leading-[1.7] text-white/68"
            >
              {copy.body}
            </p>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-4">
            <button
              onClick={onCaseStudy}
              type="button"
              className="button-pill button-pill--primary cursor-contrast-dark group font-medium"
              data-hero-cta
            >
              {copy.caseStudy}
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </button>
            <button
              onClick={onExplore}
              type="button"
              className="button-pill button-pill--secondary"
              data-hero-cta
            >
              {copy.selectedWork}
            </button>
          </div>

          <div
            data-hero-meta
            className="mt-16 max-w-[68ch] border-t border-white/8 pt-8 text-center xl:mt-20"
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
          </div>
        </div>

      </div>

      <motion.button
        onClick={scrollPastHero}
        aria-label={isGerman ? "Zum nächsten Abschnitt scrollen" : "Scroll to the next section"}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center justify-center text-white/56 md:inline-flex"
        type="button"
      >
        <span className="relative flex h-12 w-8 items-start justify-center rounded-full border border-white/14 bg-white/[0.03] pt-2 backdrop-blur-sm">
          <Mouse size={16} className="opacity-80" />
          <span className="absolute top-2 h-1.5 w-1.5 rounded-full bg-[#3AAFA9]/80" />
        </span>
      </motion.button>
    </section>
  );
}

export default Hero;
