import React, { useRef } from "react";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import useEditorialReveal from "../hooks/useEditorialReveal";
import AnimatedHeadline from "../components/layout/AnimatedHeadline";
import SectionEyebrow from "../components/layout/SectionEyebrow";
import { projectImages } from "../data/imagery";
import { featuredProjects } from "../data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function WorkPage({ lang, onOpenCaseStudy }) {
  const root = useRef(null);
  const sharedWorkImage = projectImages["nord-form"];
  const copy = {
    intro:
      lang === "de"
        ? "Ausgewählte Fallstudien in einer klaren, scanbaren Übersicht. Jede Arbeit ist auf Kontext, Relevanz und einen direkten Einstieg in die Fallstudie reduziert."
        : "Selected case studies presented as a clear, scannable index. Each project is reduced to context, relevance, and a direct path into the case study.",
    cta: lang === "de" ? "Fallstudie ansehen" : "View case study",
  };
  const projectCopy = {
    "nord-form": {
      category: lang === "de" ? "Brand System / Digitales Erlebnis" : "Brand System / Digital Experience",
      summary:
        lang === "de"
          ? "Eine cineastische, markengeführte Website für ein designorientiertes Produktstudio mit reduzierter Bewegung und starkem Narrativ."
          : "A cinematic brand-led website for a design-led product studio with restrained motion and strong narrative pacing.",
      metrics: [
        {
          icon: "down",
          label: lang === "de" ? "ZEIT FÜR ORIENTIERUNG" : "TIME TO ORIENT",
        },
        {
          icon: "up",
          label: lang === "de" ? "KLARHEIT IM SYSTEM" : "CLARITY ACROSS SYSTEMS",
        },
      ],
    },
    "atlas-case": {
      category: lang === "de" ? "Fallstudie / Art Direction" : "Case Study / Art Direction",
      summary:
        lang === "de"
          ? "Ein visuell geführtes Fallstudien-Template, das Prozess, Handwerk und Ergebnisse gleichwertig hochwertig wirken lässt."
          : "A visual-first case study template designed to make process, craft, and outcomes feel equally premium.",
      metrics: [
        {
          icon: "down",
          label: lang === "de" ? "REIBUNG IM LESEN" : "READING FRICTION",
        },
        {
          icon: "up",
          label: lang === "de" ? "SICHTBARKEIT VON PROZESS" : "PROCESS VISIBILITY",
        },
      ],
    },
    "signal-duo": {
      category: lang === "de" ? "Identität / Portfolio" : "Identity / Portfolio",
      summary:
        lang === "de"
          ? "Ein modulares Portfoliosystem mit dunklen Flächen, übergroßer Typografie und kontrollierten Interaktionszuständen."
          : "A modular portfolio system using dark surfaces, oversized type, and controlled interaction states.",
      metrics: [
        {
          icon: "down",
          label: lang === "de" ? "VISUELLES RAUSCHEN" : "VISUAL NOISE",
        },
        {
          icon: "up",
          label: lang === "de" ? "MARKENPRÄSENZ" : "BRAND PRESENCE",
        },
      ],
    },
  };

  useEditorialReveal(root, {
    dependencies: [lang],
    steps: [
      {
        target: "[data-work-intro]",
        from: { y: 26, opacity: 0, duration: 0.76 },
      },
      {
        target: "[data-work-row]",
        from: { y: 24, opacity: 0, duration: 0.62, stagger: 0.08 },
        position: "-=0.38",
      },
    ],
  });

  useGSAP(() => {
    const rows = gsap.utils.toArray("[data-work-row]", root.current);

    rows.forEach((row) => {
      const image = row.querySelector("img");
      const metrics = row.querySelector("[data-work-metrics]");

      if (metrics?.children?.length) {
        gsap.from(metrics.children, {
          y: 12,
          opacity: 0,
          stagger: 0.08,
          duration: 0.45,
          ease: "power3.out",
          scrollTrigger: {
            trigger: metrics,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });
      }
    });
  }, { scope: root, dependencies: [lang] });

  return (
    <section ref={root} className="page-shell xl:pt-28 xl:pb-8">
      <div className="content-shell">
        <div data-work-intro>
          <SectionEyebrow>{lang === "de" ? "Arbeitsindex" : "Work Index"}</SectionEyebrow>
          <AnimatedHeadline
            as="h1"
            className="page-title mb-8 max-w-[22ch] xl:mb-7 xl:max-w-[20ch] xl:text-[clamp(1.9rem,3.2vw,4.25rem)]"
          >
            {lang === "de"
              ? "Ein visuelles System für ausgewählte Projekte, Erzählungen und markengeprägte digitale Momente."
              : "A visual system for selected projects, narratives, and branded digital moments."}
          </AnimatedHeadline>
          <p className="body-safe body-safe--wide mb-12 text-base leading-[1.8] text-white/60 md:text-lg xl:mb-14">
            {copy.intro}
          </p>
        </div>

        <div className="space-y-6">
          {featuredProjects.map((project, index) => (
            <article
              key={project.id}
              data-work-row
              className="rounded-[1.9rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-0 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.16)]"
            >
              <button
                onClick={onOpenCaseStudy}
                type="button"
                className="group block w-full text-left"
              >
                <div className="grid gap-0 lg:min-h-[34rem] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:items-stretch">
                  <div
                    className="flex min-w-0 flex-col justify-between px-5 py-6 md:px-6 md:py-6 lg:min-h-[34rem]"
                  >
                    <div>
                      <div className="type-label text-white/30">
                        {projectCopy[project.id]?.category ?? project.category}
                      </div>
                      <h2
                        className="mt-5 max-w-[11ch] text-[clamp(2rem,3.35vw,3.5rem)] font-[600] leading-[0.96] tracking-[-0.045em] text-white transition group-hover:text-white/92"
                      >
                        {project.title}
                      </h2>
                      <p
                        className="body-safe mt-6 max-w-[32ch] text-[1.02rem] leading-[1.75] text-white/56"
                      >
                        {projectCopy[project.id]?.summary ?? project.summary}
                      </p>
                    </div>

                    <div data-work-metrics className="mt-10 flex flex-wrap gap-8">
                      {(projectCopy[project.id]?.metrics ?? []).map((metric) => {
                        const Icon = metric.icon === "down" ? ArrowDown : ArrowUp;

                        return (
                          <div key={metric.label} className="min-w-[9rem]">
                            <Icon size={28} strokeWidth={2.2} className="text-white" />
                            <div className="type-label mt-4 text-white/34">
                              {metric.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={onOpenCaseStudy}
                      className="button-pill button-pill--secondary group mt-10 inline-flex items-center gap-3 transition-colors duration-300 hover:border-[rgba(58,175,169,0.68)] hover:bg-[rgba(58,175,169,0.14)] hover:text-[rgba(58,175,169,0.96)]"
                    >
                      <span className="inline-flex items-center gap-3 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                        <span>{copy.cta}</span>
                        <ArrowRight size={16} className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                      </span>
                    </button>
                  </div>

                  <div
                    className="relative h-[22rem] overflow-hidden bg-[#d7d3d0] md:h-[26rem] lg:min-h-[34rem] lg:h-auto"
                  >
                    <img
                      src={sharedWorkImage?.src}
                      alt={sharedWorkImage?.alt ?? ""}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: sharedWorkImage?.position ?? "50% 50%" }}
                      className="editorial-image h-full w-full object-cover transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015]"
                    />
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkPage;
