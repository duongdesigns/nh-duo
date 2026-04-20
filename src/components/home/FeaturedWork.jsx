import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ExternalLink } from "lucide-react";

import useEditorialReveal from "../../hooks/useEditorialReveal";
import HorizontalScrollRow from "../layout/HorizontalScrollRow";
import AnimatedHeadline from "../layout/AnimatedHeadline";
import SectionEyebrow from "../layout/SectionEyebrow";
import { featuredPreviewImages, projectImages } from "../../data/imagery";
import { featuredProjects } from "../../data/projects";

function FeaturedWork({ hoveredProject, setHoveredProject, onOpenCaseStudy }) {
  const root = useRef(null);
  const previewRef = useRef(null);
  const mobileCarouselRef = useRef(null);
  const mobileScrollFrame = useRef(null);
  const mobileScrollTimeout = useRef(null);
  const mobileHintRef = useRef(null);
  const [mobileHintText, setMobileHintText] = useState("");
  const [displayedProjectId, setDisplayedProjectId] = useState(
    hoveredProject ?? featuredProjects[0]?.id
  );

  const copy = {
    eyebrow: "Selected Work",
    heading: "Work that brings direction, narrative, and execution into one calmer system.",
    body: "Instead of splitting attention between a list and a preview, this version leads with one clear feature surface and a compact project switcher. The result stays editorial, but reads faster.",
    preview: "Selected Project",
    open: "Open case study",
    switcher: "Projects",
    swipeHint: "Swipe for more stuff!",
    previewHint: "Check the awesomeness below!",
  };

  const projectCopy = {
    "nord-form": {
      category: "Brand Design",
      summary: "A cinematic brand-led website for a design-led product studio with strong narrative pacing.",
    },
    "atlas-case": {
      category: "Case Study / Art Direction",
      summary: "A visual-first case study template designed to make process, craft, and outcomes feel equally premium.",
    },
    "signal-duo": {
      category: "Identity / Portfolio",
      summary: "A modular portfolio system using dark surfaces, oversized type, and controlled interaction states.",
    },
  };

  const currentProject =
    featuredProjects.find((project) => project.id === displayedProjectId) ?? featuredProjects[0];
  const currentProjectCopy = projectCopy[currentProject.id] ?? currentProject;
  const currentProjectIndex = Math.max(
    featuredProjects.findIndex((project) => project.id === currentProject.id),
    0
  );

  const renderCarouselChevron = (direction) => (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-7 w-7 ${direction === "right" ? "scale-x-[-1]" : ""}`}
      fill="none"
    >
      <path
        d="M16 3.5L7.5 12L16 20.5"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const triggerMobileHint = (message) => {
    const container = mobileCarouselRef.current;
    const hint = mobileHintRef.current;
    if (!container) return;

    setMobileHintText(message);

    const activeCard = container.querySelector(
      `[data-project-id="${hoveredProject}"]`
    );

    if (activeCard) {
      gsap.killTweensOf(activeCard);
      const jumpTimeline = gsap.timeline({
        defaults: { transformOrigin: "center bottom" },
      });

      jumpTimeline
        .to(activeCard, {
          y: -18,
          scaleY: 1.03,
          duration: 0.16,
          ease: "power2.out",
        })
        .to(
          activeCard,
          {
            y: 0,
            scaleY: 1,
            duration: 0.5,
            ease: "bounce.out",
            clearProps: "y,scaleY,transformOrigin",
          },
          ">"
        );
    }

    if (hint) {
      gsap.killTweensOf(hint);
      gsap.fromTo(
        hint,
        { autoAlpha: 0, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.22,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(hint, {
              autoAlpha: 0,
              y: -4,
              delay: 1.1,
              duration: 0.28,
              ease: "power2.in",
            });
          },
        }
      );
    }
  };

  const syncMobileSelection = () => {
    const container = mobileCarouselRef.current;
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll("[data-fw-selector-mobile]")
    );
    if (!cards.length) return;

    const nearestCard = cards.reduce((closest, card) => {
      const closestDistance = Math.abs(closest.offsetLeft - container.scrollLeft);
      const currentDistance = Math.abs(card.offsetLeft - container.scrollLeft);
      return currentDistance < closestDistance ? card : closest;
    }, cards[0]);

    const nextProjectId = nearestCard.dataset.projectId;
    if (nextProjectId && nextProjectId !== hoveredProject) {
      setHoveredProject(nextProjectId);
    }
  };
  const renderSelectorCard = (project, index, { mobile = false, keyPrefix = "default" } = {}) => {
    const isActive = project.id === currentProject.id;
    const info = projectCopy[project.id] ?? project;

    return (
      <button
        key={`${keyPrefix}-${mobile ? "mobile" : "desktop"}-${project.id}-${index}`}
        onClick={(event) => {
          event.preventDefault();
          if (mobile) {
            if (project.id !== hoveredProject) {
              triggerMobileHint(copy.swipeHint);
              return;
            }

            if (project.id === hoveredProject) {
              triggerMobileHint(copy.previewHint);
              return;
            }

            return;
          }

          setHoveredProject(project.id);
        }}
        type="button"
        data-fw-selector
        data-project-id={mobile ? project.id : undefined}
        data-fw-selector-mobile={mobile ? "true" : undefined}
        className={`group rounded-[1.45rem] border text-left transition ${mobile
          ? `w-[calc(100vw-8.5rem)] min-[520px]:w-[calc(100vw-9.5rem)] min-[680px]:w-full max-w-none flex-shrink-0 snap-center px-4 py-4 ${isActive
            ? "border-[rgba(58,175,169,0.35)] bg-white/[0.04] shadow-[0_16px_34px_rgba(0,0,0,0.16)]"
            : "border-white/8 bg-white/[0.018] hover:border-white/14 hover:bg-white/[0.028]"
          }`
          : `h-full min-h-[220px] px-4 py-5 md:px-5 ${isActive
            ? "border-[rgba(58,175,169,0.35)] bg-white/[0.028] shadow-[0_14px_30px_rgba(0,0,0,0.14)]"
            : "border-white/8 bg-white/[0.015] hover:border-white/14 hover:bg-white/[0.025]"
          }`
          }`}
      >
        <div className={`flex ${mobile ? "items-start gap-4" : "h-full flex-col"}`}>
          <div className={`flex ${mobile ? "min-w-0 flex-1 flex-col" : "h-full flex-col justify-between"}`}>
  <div>
    <div className="flex items-start justify-end gap-4">
      <div className={isActive ? "type-label text-[rgba(58,175,169,0.82)]" : "type-label text-white/42"}>
        {project.year}
      </div>
    </div>

    <div className={`type-label ${mobile ? "mt-3 text-white/48" : "mt-5 text-white/54"}`}>
      {info.category}
    </div>
    <div className={`font-medium tracking-[-0.04em] text-white ${mobile ? "mt-2 text-[1.2rem] leading-[1.02]" : "mt-3 text-[1.45rem] text-white/96"}`}>
      {project.title}
    </div>
  </div>

  {mobile ? null : (
    <p className="mt-6 line-clamp-3 text-sm leading-7 text-white/68">
      {info.summary}
    </p>
  )}
</div>

          {mobile ? (
            <div
              aria-hidden="true"
              className={`mt-1 h-2.5 w-2.5 flex-none rounded-full transition ${isActive ? "bg-[#3AAFA9]" : "bg-white/20"
                }`}
            />
          ) : null}
        </div>
      </button>
    );
  };

  useEffect(() => {
    const container = mobileCarouselRef.current;
    if (!container) return;

    container.scrollLeft = 0;

    if (featuredProjects[0]?.id) {
      setHoveredProject(featuredProjects[0].id);
    }
  }, [setHoveredProject]);

  useEffect(() => {
    if (!hoveredProject || hoveredProject === displayedProjectId) return;

    const preview = previewRef.current;
    if (!preview) {
      setDisplayedProjectId(hoveredProject);
      return;
    }

    const media = preview.querySelector("[data-fw-preview-media]");
    const details = preview.querySelector("[data-fw-preview-details]");
    const thumbs = preview.querySelectorAll("[data-fw-preview-thumb]");
    const targets = [media, details, ...thumbs].filter(Boolean);

    if (!targets.length) {
      setDisplayedProjectId(hoveredProject);
      return;
    }

    gsap.killTweensOf(targets);

    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
        overwrite: "auto",
      },
      onComplete: () => {
        setDisplayedProjectId(hoveredProject);
      },
    });

    tl.to(media, {
      opacity: 0,
      y: 10,
      scale: 0.992,
      duration: 0.22,
    }).to(
      [details, ...thumbs],
      {
        opacity: 0,
        y: 12,
        duration: 0.18,
        stagger: 0.03,
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, [displayedProjectId, hoveredProject]);

  useEditorialReveal(root, {
    steps: [
      {
        target: "[data-fw-intro]",
        from: { y: 26, opacity: 0, duration: 0.72 },
      },
      {
        target: "[data-fw-selector]",
        from: { y: 18, opacity: 0, duration: 0.58, stagger: 0.08 },
        position: "-=0.26",
      },
    ],
  });

  useGSAP(
    () => {
      const container = mobileCarouselRef.current;
      if (!container) return undefined;

      const cards = Array.from(
        container.querySelectorAll("[data-fw-selector-mobile]")
      );
      if (!cards.length) return undefined;

      const handleScroll = () => {
        if (mobileScrollFrame.current) cancelAnimationFrame(mobileScrollFrame.current);
        if (mobileScrollTimeout.current) clearTimeout(mobileScrollTimeout.current);

        mobileScrollFrame.current = requestAnimationFrame(() => {
          mobileScrollTimeout.current = window.setTimeout(() => {
            syncMobileSelection();
          }, 120);
        });
      };

      container.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        container.removeEventListener("scroll", handleScroll);
        if (mobileScrollFrame.current) cancelAnimationFrame(mobileScrollFrame.current);
        if (mobileScrollTimeout.current) clearTimeout(mobileScrollTimeout.current);
      };
    },
    { scope: root, dependencies: [displayedProjectId] }
  );

  useGSAP(
    () => {
      const preview = previewRef.current;
      if (!preview) return undefined;

      const media = preview.querySelector("[data-fw-preview-media]");
      const details = preview.querySelector("[data-fw-preview-details]");
      const thumbs = preview.querySelectorAll("[data-fw-preview-thumb]");

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          overwrite: "auto",
        },
      });

      if (media) {
        tl.fromTo(
          media,
          { opacity: 0.3, y: 18, scale: 0.985 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65 }
        );
      }

      if (details) {
        tl.fromTo(
          details,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.58 },
          media ? "-=0.44" : 0
        );
      }

      if (thumbs.length) {
        tl.fromTo(
          thumbs,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.42, stagger: 0.06 },
          "-=0.34"
        );
      }
    },
    { scope: root, dependencies: [displayedProjectId] }
  );

  return (
    <section ref={root} className="home-shell py-24 md:py-32">
      <div className="content-shell w-full">
        <SectionEyebrow>{copy.eyebrow}</SectionEyebrow>

        <div className="mt-4 grid gap-14 xl:gap-20">
          <div className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr] xl:items-start xl:gap-14">
            <div className="max-w-none pt-4 xl:max-w-[60ch]" data-fw-intro>
              <AnimatedHeadline as="h2" className="section-title max-w-[21ch]">
                {copy.heading}
              </AnimatedHeadline>
              <p className="body-safe body-safe--wide mt-6 text-base leading-[1.85] text-white/60 md:text-lg">
                {copy.body}
              </p>

              <div className="relative md:hidden">
                <div
                  ref={mobileHintRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-[2.25rem] bottom-full z-20 mb-[0.25rem] text-center text-[0.72rem] uppercase tracking-[0.18em] text-[rgba(58,175,169,0.82)] opacity-0"
                >
                  {mobileHintText}
                </div>
                <div className="mt-14 grid grid-cols-[1.75rem_minmax(0,1fr)_1.75rem] items-center gap-2">
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none flex justify-center transition-opacity ${
                      currentProjectIndex > 0 ? "text-white/34 opacity-100" : "text-white/18 opacity-55"
                    }`}
                  >
                    {renderCarouselChevron("left")}
                  </div>
                  <div
                    ref={mobileCarouselRef}
                    className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 pt-5 touch-pan-x md:hidden"
                  >
                    {featuredProjects.map((project, index) =>
                      renderSelectorCard(project, index, {
                        mobile: true,
                        keyPrefix: "mobile",
                      })
                    )}
                  </div>
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none flex justify-center transition-opacity ${
                      currentProjectIndex < featuredProjects.length - 1
                        ? "text-white/34 opacity-100"
                        : "text-white/18 opacity-55"
                    }`}
                  >
                    {renderCarouselChevron("right")}
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={previewRef}
              className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.012))] p-4 shadow-[0_24px_72px_rgba(0,0,0,0.16)] md:p-5 xl:p-6"
            >
              <div className="hidden flex-col gap-4 sm:flex sm:flex-row sm:items-center sm:justify-between md:flex">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3 sm:min-h-[2.75rem]">
                    <span className="type-label text-[rgba(58,175,169,0.82)]">
                      {currentProjectCopy.category}
                    </span>
                    <span className="type-label text-white/36">{currentProject.year}</span>
                  </div>
                </div>

                <button
                  onClick={onOpenCaseStudy}
                  type="button"
                  className="button-pill button-pill--secondary group shrink-0 self-start sm:self-auto"
                >
                  View case study
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </button>
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-stretch">
                <div
                  data-fw-preview-media
                  className="relative overflow-hidden rounded-[1.7rem]"
                >
                  <img
                    src={projectImages[currentProject.id]?.src}
                    alt={projectImages[currentProject.id]?.alt ?? ""}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: projectImages[currentProject.id]?.position ?? "50% 50%" }}
                    className="editorial-image h-[21rem] w-full object-cover md:h-[28rem] xl:h-full xl:min-h-[31rem]"
                  />
                </div>

                <div
                  data-fw-preview-details
                  className="flex flex-col justify-between p-1 md:p-2"
                >
                  <div>
                    <div className="type-label text-white/38">{copy.switcher}</div>
                    <h3 className="subsection-title mt-4 max-w-[11ch] font-[600] leading-[0.95] text-white">
                      {currentProject.title}
                    </h3>
                    <p className="body-safe mt-5 max-w-[34ch] text-[1rem] leading-[1.82] text-white/64 md:text-[1.02rem]">
                      {currentProjectCopy.summary}
                    </p>
                  </div>

                  <div className="mt-8 grid gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      {featuredPreviewImages.slice(0, 2).map((image) => (
                        <div
                          key={image.src}
                          data-fw-preview-thumb
                          className="relative overflow-hidden rounded-[1.15rem] border border-white/10 bg-white/[0.02]"
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            loading="lazy"
                            decoding="async"
                            style={{ objectPosition: image.position ?? "50% 50%" }}
                            className="editorial-image aspect-[5/4] h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <HorizontalScrollRow
              className="no-scrollbar overflow-x-auto md:overflow-visible"
              rowClassName="md:grid md:grid-cols-3 md:gap-4 xl:gap-5"
              itemClassName="w-[18.5rem] md:w-auto"
            >
              {featuredProjects.map((project, index) => {
                return renderSelectorCard(project, index);
              })}
            </HorizontalScrollRow>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedWork;
