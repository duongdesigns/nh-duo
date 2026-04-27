import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import CaseStudyBlock from "../components/case-study/CaseStudyBlock";
import CaseStudyProgress from "../components/case-study/CaseStudyProgress";
import AnimatedHeadline from "../components/layout/AnimatedHeadline";
import MotionButton from "../components/layout/MotionButton";
import SectionEyebrow from "../components/layout/SectionEyebrow";
import { getCaseStudyById, getCaseStudyProjectById } from "../data/caseStudies";
import { caseStudySections } from "../data/caseStudySections";

function CaseStudyPage({
  activeSection,
  caseStudyId,
  caseStudyRefs,
  navigate,
  onJump,
}) {
  const root = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const currentProject = getCaseStudyProjectById(caseStudyId);
  const currentCaseStudy = getCaseStudyById(caseStudyId);
  const sectionLabels = {
    Hero: "Hero",
    Überblick: "Überblick",
    Exploration: "Exploration",
    Prozess: "Prozess",
    "Finales Design": "Finales Design",
    Wirkung: "Wirkung",
    Erkenntnisse: "Erkenntnisse",
  };

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const atmosphere = root.current?.querySelector("[data-page-atmosphere]");
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      if (atmosphere) {
        tl.from(atmosphere, {
          scale: 1.02,
          opacity: 0,
          duration: 1.05,
        });
      }

      tl.from(
        "[data-case-eyebrow]",
        {
          y: 18,
          opacity: 0,
          duration: 0.55,
        },
        "-=0.68"
      )
        .from(
          "[data-case-title]",
          {
            y: 34,
            opacity: 0,
            duration: 0.72,
          },
          "-=0.42"
        )
        .from(
          "[data-case-copy]",
          {
            y: 22,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.42"
        )
        .from(
          "[data-case-progress]",
          {
            opacity: 0,
            duration: 0.6,
          },
          "-=0.38"
        )
        .from(
          "[data-case-content]",
          {
            y: 24,
            opacity: 0,
            duration: 0.72,
          },
          "-=0.38"
        )
        .from(
          "[data-case-block]",
          {
            opacity: 0,
            stagger: 0.08,
            duration: 0.72,
          },
          "-=0.58"
        );

      return () => {
        tl.kill();
      };
    },
    { scope: root, dependencies: [caseStudyId, prefersReducedMotion] }
  );

  return (
    <div ref={root} className="page-shell page-shell--case-study">
      <div
        aria-hidden="true"
        data-page-atmosphere
        className="page-atmosphere page-atmosphere--case-study"
      />

      <div className="content-shell grid gap-8">
        <header className="mb-10 md:mb-14">
          <div data-case-eyebrow>
            <SectionEyebrow>Fallstudie</SectionEyebrow>
          </div>
          <AnimatedHeadline
            as="h1"
            className="page-title mb-8 max-w-[24ch] xl:mb-7 xl:max-w-[22ch]"
          >
            <span data-case-title>{currentProject.title} im Kontext</span>
          </AnimatedHeadline>
          <p
            data-case-copy
            className="body-safe body-safe--wide text-base leading-[1.8] text-white/60 md:text-lg"
          >
            {currentProject.menuSummary}
          </p>
          <MotionButton
            data-case-copy
            className="button-pill button-pill--primary cursor-contrast-cta group mt-8 font-medium"
            onClick={() => navigate?.("contact")}
            type="button"
          >
            Gespräch starten
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </MotionButton>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div data-case-progress className="w-full self-start lg:sticky lg:top-28 lg:h-fit lg:w-[220px] lg:flex-none">
            <CaseStudyProgress
              sections={caseStudySections}
              activeSection={activeSection}
              onJump={onJump}
              title={currentProject.title}
              sectionLabels={sectionLabels}
            />
          </div>

          <div data-case-content className="min-w-0 flex-1 space-y-7">
            {caseStudySections.map((section, index) => (
              <CaseStudyBlock
                key={`${caseStudyId}-${section}`}
                content={currentCaseStudy.sections[section]}
                index={index}
                setRef={(node) => {
                  caseStudyRefs.current[section] = node;
                }}
                title={section}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseStudyPage;
