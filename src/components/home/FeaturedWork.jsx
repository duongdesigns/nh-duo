import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ExternalLink } from "lucide-react";

import useEditorialReveal from "../../hooks/useEditorialReveal";
import HorizontalScrollRow from "../layout/HorizontalScrollRow";
import AnimatedHeadline from "../layout/AnimatedHeadline";
import SectionEyebrow from "../layout/SectionEyebrow";
import { featuredPreviewImages, projectImages } from "../../data/imagery";
import { featuredProjects } from "../../data/projects";

function FeaturedWork({ lang, hoveredProject, setHoveredProject, onOpenCaseStudy }) {
  const root = useRef(null);
  const previewImageRef = useRef(null);
  const mobileCarouselRef = useRef(null);
  const mobileScrollFrame = useRef(null);
  const mobileHintRef = useRef(null);
  const isGerman = lang === "de";
  const [mobileHintText, setMobileHintText] = useState("");

  const copy = {
    eyebrow: isGerman ? "Ausgewählte Arbeiten" : "Selected Work",
    heading: isGerman
      ? "Arbeiten, die Richtung, Erzählung und Ausführung in einem ruhigeren System bündeln."
      : "Work that brings direction, narrative, and execution into one calmer system.",
    body: isGerman
      ? "Statt Liste und Preview gegeneinander auszuspielen, führt diese Version über eine klare Hauptfläche und einen kompakten Projekt-Switcher. So bleibt der Abschnitt editoral, aber schneller lesbar."
      : "Instead of splitting attention between a list and a preview, this version leads with one clear feature surface and a compact project switcher. The result stays editorial, but reads faster.",
    preview: isGerman ? "Ausgewähltes Projekt" : "Selected Project",
    open: isGerman ? "Fallstudie öffnen" : "Open case study",
    switcher: isGerman ? "Projekte" : "Projects",
    swipeHint: isGerman ? "Wische für mehr!" : "Swipe for more stuff!",
    previewHint: isGerman ? "Schau dir unten die Details an!" : "Check the awesomeness below!",
  };

  const projectCopy = {
    "nord-form": {
      category: isGerman ? "Brand Design" : "Brand Design",
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

  const currentProject =
    featuredProjects.find((project) => project.id === hoveredProject) ?? featuredProjects[0];
  const currentProjectCopy = projectCopy[currentProject.id] ?? currentProject;
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
        className={`group rounded-[1.45rem] border text-left transition ${
          mobile
            ? `w-[calc(100vw-2.25rem)] max-w-none flex-shrink-0 snap-start px-4 py-4 ${
                isActive
                  ? "border-[rgba(58,175,169,0.35)] bg-white/[0.04] shadow-[0_16px_34px_rgba(0,0,0,0.16)]"
                  : "border-white/8 bg-white/[0.018] hover:border-white/14 hover:bg-white/[0.028]"
              }`
            : `h-full px-4 py-5 md:px-5 ${
                isActive
                  ? "border-[rgba(58,175,169,0.35)] bg-white/[0.028] shadow-[0_14px_30px_rgba(0,0,0,0.14)]"
                  : "border-white/8 bg-white/[0.015] hover:border-white/14 hover:bg-white/[0.025]"
              }`
        }`}
      >
        <div className={`flex ${mobile ? "items-start gap-4" : "h-full flex-col"}`}>
          <div className={`flex ${mobile ? "min-w-0 flex-1 flex-col" : "h-full flex-col"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="type-label text-white/34">
                {String(index + 1).padStart(2, "0")}
              </div>
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
            {mobile ? null : (
              <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/68">
                {info.summary}
              </p>
            )}
          </div>

          {mobile ? (
            <div
              aria-hidden="true"
              className={`mt-1 h-2.5 w-2.5 flex-none rounded-full transition ${
                isActive ? "bg-[#3AAFA9]" : "bg-white/20"
              }`}
            />
          ) : null}
        </div>
      </button>
    );
  };

  useEditorialReveal(root, {
    dependencies: [lang],
    steps: [
      {
        target: "[data-fw-intro]",
        from: { y: 26, opacity: 0, duration: 0.72 },
      },
      {
        target: "[data-fw-feature]",
        from: { y: 24, opacity: 0, duration: 0.72 },
        position: "-=0.42",
      },
      {
        target: "[data-fw-selector]",
        from: { y: 18, opacity: 0, duration: 0.58, stagger: 0.08 },
        position: "-=0.36",
      },
    ],
  });

  useGSAP(
    () => {
      if (!previewImageRef.current) return;

      gsap.fromTo(
        previewImageRef.current,
        {
          scale: 1.06,
          yPercent: 2,
          opacity: 0.72,
        },
        {
          scale: 1,
          yPercent: 0,
          opacity: 1,
          duration: 0.72,
          ease: "power3.out",
        }
      );
    },
    { scope: root, dependencies: [hoveredProject] }
  );

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
        mobileScrollFrame.current = requestAnimationFrame(() => {
          syncMobileSelection();
        });
      };

      container.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        container.removeEventListener("scroll", handleScroll);
        if (mobileScrollFrame.current) cancelAnimationFrame(mobileScrollFrame.current);
      };
    },
    { scope: root, dependencies: [lang] }
  );

  return (
    <section ref={root} className="home-shell py-24 md:py-32">
      <div className="content-shell w-full">
        <SectionEyebrow>{copy.eyebrow}</SectionEyebrow>

        <div className="mt-4 grid gap-14 xl:gap-20">
          <div className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr] xl:items-start xl:gap-14">
            <div className="max-w-[60ch] pt-4" data-fw-intro>
              <AnimatedHeadline as="h2" className="section-title max-w-[21ch]">
                {copy.heading}
              </AnimatedHeadline>
              <p className="body-safe body-safe--wide mt-6 text-base leading-[1.85] text-white/60 md:text-lg">
                {copy.body}
              </p>

              <div
                ref={mobileCarouselRef}
                className="no-scrollbar -mx-[0.75rem] mt-14 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[0.75rem] pb-2 pt-5 scroll-px-[0.75rem] md:hidden"
              >
                {featuredProjects.map((project, index) =>
                  renderSelectorCard(project, index, {
                    mobile: true,
                    keyPrefix: "mobile",
                  })
                )}
              </div>

              <div
                ref={mobileHintRef}
                aria-hidden="true"
                className="pointer-events-none mt-2 text-center text-[0.72rem] uppercase tracking-[0.18em] text-[rgba(58,175,169,0.82)] opacity-0 md:hidden"
              >
                {mobileHintText}
              </div>
            </div>

            <div
              data-fw-feature
              className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.012))] p-4 shadow-[0_24px_72px_rgba(0,0,0,0.16)] md:p-5 xl:p-6"
            >
              <div className="hidden flex-col gap-4 sm:flex sm:flex-row sm:items-start sm:justify-between md:flex">
                <div>
                  <div className="type-label text-white/40">{copy.preview}</div>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="type-label text-[rgba(58,175,169,0.82)]">
                      {currentProjectCopy.category}
                    </span>
                    <span className="type-label text-white/36">{currentProject.year}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-stretch">
                <div className="relative overflow-hidden rounded-[1.7rem]">
                  <img
                    ref={previewImageRef}
                    src={projectImages[currentProject.id]?.src}
                    alt={projectImages[currentProject.id]?.alt ?? ""}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: projectImages[currentProject.id]?.position ?? "50% 50%" }}
                    className="editorial-image h-[21rem] w-full object-cover md:h-[28rem] xl:h-full xl:min-h-[31rem]"
                  />
                </div>

                <div className="flex flex-col justify-between p-1 md:p-2">
                  <div>
                    <div className="type-label text-white/38">{copy.switcher}</div>
                    <h3 className="mt-4 max-w-[11ch] text-[clamp(2rem,3vw,3.4rem)] font-[600] leading-[0.95] tracking-[-0.045em] text-white">
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

                    <button
                      onClick={onOpenCaseStudy}
                      type="button"
                      className="inline-flex items-center gap-3 self-start text-sm text-white/82 transition hover:text-white"
                    >
                      <ArrowRight size={16} className="text-[rgba(58,175,169,0.82)]" />
                    </button>
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
