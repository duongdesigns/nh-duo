import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

import CaseStudyBlock from "../components/case-study/CaseStudyBlock";
import CaseStudyProgress from "../components/case-study/CaseStudyProgress";
import CaseStudyProjectMenu from "../components/case-study/CaseStudyProjectMenu";
import { getCaseStudyById, getCaseStudyProjectById } from "../data/caseStudies";
import { caseStudySections } from "../data/caseStudySections";

gsap.registerPlugin(ScrollTrigger);

function CaseStudyPage({
  activeSection,
  caseStudyId,
  caseStudyRefs,
  onJump,
  onSelectProject,
  projects,
}) {
  const root = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const currentProject = getCaseStudyProjectById(caseStudyId);
  const currentCaseStudy = getCaseStudyById(caseStudyId);
  const sectionLabels = {
    Hero: "Hero",
    Overview: "Overview",
    Discovery: "Discovery",
    Process: "Process",
    "Final Design": "Final Design",
    Impact: "Impact",
    Learnings: "Learnings",
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
        "[data-case-menu]",
        {
          y: 24,
          opacity: 0,
          duration: 0.72,
        },
        "-=0.68"
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
          "[data-case-block]",
          {
            y: 24,
            opacity: 0,
            stagger: 0.08,
            duration: 0.72,
          },
          "-=0.18"
        );

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const progress = root.current?.querySelector("[data-case-progress]");
        const content = root.current?.querySelector("[data-case-content]");
        const caseBlocks = content?.querySelectorAll("[data-case-block]");
        const lastCaseBlock = caseBlocks?.[caseBlocks.length - 1];
        if (!progress || !content) return undefined;

        return ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          endTrigger: lastCaseBlock ?? content,
          end: "bottom bottom-=40",
          pin: progress,
          pinSpacing: false,
          anticipatePin: 1,
        });
      });

      return () => mm.revert();
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
        <CaseStudyProjectMenu
          activeProject={currentProject}
          onSelectProject={onSelectProject}
          projects={projects}
        />

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div data-case-progress className="w-full self-start lg:w-[220px] lg:flex-none">
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
