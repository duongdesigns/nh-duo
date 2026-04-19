import React, { useRef } from "react";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

import AnimatedHeadline from "../components/layout/AnimatedHeadline";
import SectionEyebrow from "../components/layout/SectionEyebrow";
import { projectImages } from "../data/imagery";
import { featuredProjects } from "../data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function WorkPage({ onOpenCaseStudy }) {
  const root = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const sharedWorkImage = projectImages["nord-form"];
  const copy = {
    intro:
      "Selected case studies presented as a clear, scannable index. Each project is reduced to context, relevance, and a direct path into the case study.",
    cta: "View case study",
  };
  const projectCopy = {
    "nord-form": {
      category: "Brand System / Digital Experience",
      summary:
        "A cinematic brand-led website for a design-led product studio with restrained motion and strong narrative pacing.",
      metrics: [
        {
          icon: "down",
          label: "TIME TO ORIENT",
        },
        {
          icon: "up",
          label: "CLARITY ACROSS SYSTEMS",
        },
      ],
    },
    "atlas-case": {
      category: "Case Study / Art Direction",
      summary:
        "A visual-first case study template designed to make process, craft, and outcomes feel equally premium.",
      metrics: [
        {
          icon: "down",
          label: "READING FRICTION",
        },
        {
          icon: "up",
          label: "PROCESS VISIBILITY",
        },
      ],
    },
    "signal-duo": {
      category: "Identity / Portfolio",
      summary:
        "A modular portfolio system using dark surfaces, oversized type, and controlled interaction states.",
      metrics: [
        {
          icon: "down",
          label: "VISUAL NOISE",
        },
        {
          icon: "up",
          label: "BRAND PRESENCE",
        },
      ],
    },
  };

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const atmosphere = root.current?.querySelector("[data-page-atmosphere]");
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      if (atmosphere) {
        tl.from(
          atmosphere,
          {
            scale: 1.03,
            opacity: 0,
            duration: 1.05,
          }
        );
      }

      tl.from(
        "[data-work-eyebrow]",
        {
          y: 18,
          opacity: 0,
          duration: 0.55,
        },
        "-=0.72"
      )
        .from(
          "[data-work-title]",
          {
            y: 34,
            opacity: 0,
            duration: 0.72,
          },
          "-=0.42"
        )
        .from(
          "[data-work-copy]",
          {
            y: 22,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.42"
        )
        .from(
          "[data-work-row]",
          {
            y: 24,
            opacity: 0,
            stagger: 0.08,
            duration: 0.72,
          },
          "-=0.28"
        );
    },
    { scope: root, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={root}
      className="page-shell xl:pt-28 xl:pb-8"
      style={{ "--work-accent": "#3AAFA9" }}
      >
      <div
        aria-hidden="true"
        data-page-atmosphere
        className="page-atmosphere page-atmosphere--work"
      />
      <div className="content-shell">
        <div>
          <div data-work-eyebrow>
            <SectionEyebrow>Work Index</SectionEyebrow>
          </div>
          <AnimatedHeadline
            as="h1"
            className="page-title mb-8 max-w-[24ch] text-[clamp(1.6rem,2.8vw,3.15rem)] xl:mb-7 xl:max-w-[22ch]"
          >
            <span data-work-title>Projects Built with System and Story</span>
          </AnimatedHeadline>
          <p data-work-copy className="body-safe body-safe--wide mb-12 text-base leading-[1.8] text-white/60 md:text-lg xl:mb-14">
            {copy.intro}
          </p>
        </div>

        <div className="space-y-6">
          {featuredProjects.map((project, index) => (
            <article
              key={project.id}
              data-work-row
              className="rounded-[1.9rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-0 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.16)] transition-colors duration-300 hover:border-white/14 hover:bg-white/[0.025]"
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
                        className="mt-5 max-w-[11ch] text-[clamp(2rem,3.35vw,3.5rem)] font-[600] leading-[0.96] tracking-[-0.045em] text-white transition-colors duration-300 group-hover:text-[var(--work-accent)]"
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
                      className="button-pill button-pill--secondary group/button mt-10 inline-flex items-center gap-3 self-start"
                    >
                      <span>{copy.cta}</span>
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/button:translate-x-1.5"
                      />
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
                      className="editorial-image h-full w-full object-cover"
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
