import { useRef } from "react";
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

function WorkPage({ navigate, onOpenCaseStudy }) {
  const root = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const copy = {
    intro:
      "Selected case studies presented as a clear, scannable index. Each project is reduced to context, relevance, and a direct path into the case study.",
    cta: "View case study",
  };
  const projectCopy = {
    tsuki: {
      category: "Brand Identity / Restaurant System",
      summary:
        "A premium sushi restaurant identity built around moon symbolism, warm gold, menu systems, and a restrained web presence.",
      metrics: [
        {
          icon: "down",
          label: "BRAND NOISE",
        },
        {
          value: 91,
          label: "SYSTEM CONSISTENCY",
        },
      ],
    },
    "atlas-case": {
      category: "Case Study / Art Direction",
      summary:
        "A visual-first case study template designed to make process, craft, and outcomes feel equally premium.",
      metrics: [
        {
          value: 64,
          label: "READING FRICTION",
        },
        {
          value: 88,
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
          value: 71,
          label: "VISUAL NOISE",
        },
        {
          value: 93,
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
        );

      const metricValues = gsap.utils.toArray("[data-work-metric-value]");
      const workRows = gsap.utils.toArray("[data-work-row]");

      workRows.forEach((row) => {
        const media = row.querySelector("[data-work-row-media]");
        const copy = row.querySelectorAll("[data-work-row-copy]");

        const rowTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: row,
            start: "top 74%",
            once: true,
          },
        });

        if (media) {
          rowTimeline.from(media, {
            opacity: 0,
            scale: 1.03,
            duration: 0.84,
          });
        }

        if (copy.length) {
          rowTimeline.from(
            copy,
            {
              opacity: 0,
              y: 34,
              duration: 0.7,
              stagger: 0.09,
            },
            media ? "-=0.54" : 0
          );
        }
      });

      metricValues.forEach((node) => {
        const target = Number(node.getAttribute("data-target-value") || 0);
        const state = { value: 0 };

        node.textContent = "0%";
        gsap.set(node, { color: "#F0F0F0" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: node,
            start: "top 82%",
            once: true,
          },
        });

        tl.to(state, {
          value: target,
          duration: 1.1,
          ease: "power2.out",
          snap: { value: 1 },
          onUpdate: () => {
            node.textContent = `${Math.round(state.value)}%`;
          },
        }).to(
          node,
          {
            color: "#3AAFA9",
            duration: 0.26,
            ease: "power2.out",
          },
          0.84
        );
      });
    },
    { scope: root, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={root}
      className="page-shell"
      style={{ "--work-accent": "#3AAFA9" }}
    >
      <div
        aria-hidden="true"
        data-page-atmosphere
        className="page-atmosphere page-atmosphere--work"
      />
      <div className="content-shell">
        <div>
          <div data-work-eyebrow data-reveal-group>
            <SectionEyebrow>Work Index</SectionEyebrow>
          </div>
          <AnimatedHeadline
            as="h1"
            className="page-title mb-8 max-w-[24ch] xl:mb-7 xl:max-w-[22ch]"
          >
            <span data-work-title>Projects Built with System and Story</span>
          </AnimatedHeadline>
          <p data-work-copy data-reveal-group className="body-safe body-safe--wide text-base leading-[1.8] text-white/60 md:text-lg">
            {copy.intro}
          </p>
          <button
            data-work-copy
            data-reveal-group
            className="button-pill button-pill--primary cursor-contrast-dark group mt-8 font-medium"
            onClick={() => navigate?.("contact")}
            type="button"
          >
            Start a Conversation
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="mt-16 space-y-8 xl:mt-18">
          {featuredProjects.map((project) => {
            const image = projectImages[project.id];
            const titleId = `work-card-title-${project.id}`;
            const summaryId = `work-card-summary-${project.id}`;

            return (
              <article
                key={project.id}
                data-work-row
                className="rounded-[1.9rem] border border-white/8 bg-[#111820]/96 p-0 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.16)] transition-colors duration-300 hover:border-white/14 hover:bg-[#121A22]"
              >
                <button
                  aria-describedby={summaryId}
                  aria-labelledby={titleId}
                  className="group block w-full text-left"
                  onClick={() => onOpenCaseStudy(project.id)}
                  type="button"
                >
                  <div className="grid gap-0 lg:min-h-[35rem] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:items-stretch">
                    <div className="flex min-w-0 flex-col justify-between px-5 py-6 md:px-6 md:py-6 lg:min-h-[35rem]">
                      <div>
                        <div className="type-label text-white/30" data-work-row-copy>
                          {projectCopy[project.id]?.category ?? project.category}
                        </div>
                        <h2
                          data-work-row-copy
                          id={titleId}
                          className="subsection-title mt-5 min-h-[2.2em] max-w-[11ch] font-[600] leading-[0.96] text-white transition-colors duration-300 group-hover:text-[var(--work-accent)]"
                        >
                          {project.title}
                        </h2>
                        <p
                          data-work-row-copy
                          id={summaryId}
                          className="body-safe mt-6 min-h-[7rem] max-w-[32ch] text-[1.02rem] leading-[1.75] text-white/56"
                        >
                          {projectCopy[project.id]?.summary ?? project.summary}
                        </p>
                      </div>

                      <div className="mt-7 flex flex-col gap-6 pb-3 pt-1">
                        <div
                          data-work-metrics
                          data-work-row-copy
                          className="grid grid-cols-2 gap-5 sm:gap-8"
                        >
                          {(projectCopy[project.id]?.metrics ?? []).map((metric) => {
                            const Icon =
                              metric.icon === "down"
                                ? ArrowDown
                                : metric.icon === "up"
                                  ? ArrowUp
                                  : null;

                            return (
                              <div key={metric.label} className="min-w-0">
                                {Icon ? (
                                  <Icon
                                    aria-hidden="true"
                                    size={28}
                                    strokeWidth={2.2}
                                    className="text-white"
                                  />
                                ) : (
                                  <div
                                    data-work-metric-value
                                    data-target-value={metric.value}
                                    className="font-mono-accent text-[1.5rem] font-medium leading-none text-white"
                                  >
                                    0%
                                  </div>
                                )}
                                <div className="type-label mt-4 text-white/34">
                                  {metric.label}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="pb-3 pt-1">
                          <span
                            data-work-row-copy
                            aria-hidden="true"
                            className="button-pill button-pill--secondary inline-flex items-center gap-3 self-start"
                          >
                            <span>{copy.cta}</span>
                            <ArrowRight
                              size={16}
                              className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
                            />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      data-work-row-media
                      className="relative aspect-[16/11] overflow-hidden bg-[#d7d3d0] md:aspect-[16/10] lg:aspect-auto lg:h-auto lg:min-h-[35rem]"
                    >
                      <img
                        src={image?.src}
                        alt={image?.alt ?? ""}
                        loading="lazy"
                        decoding="async"
                        style={{ objectPosition: image?.position ?? "50% 50%" }}
                        className="editorial-image absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WorkPage;
