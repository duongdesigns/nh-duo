import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

import CaseStudyBlock from "../components/case-study/CaseStudyBlock";
import CaseStudyProgress from "../components/case-study/CaseStudyProgress";
import { caseStudySections } from "../data/caseStudySections";

gsap.registerPlugin(ScrollTrigger);

function CaseStudyPage({ activeSection, onJump, caseStudyRefs, scrolled = false }) {
  const root = useRef(null);
  const prefersReducedMotion = useReducedMotion();
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
        "[data-case-progress]",
        {
          opacity: 0,
          duration: 0.6,
        },
        "-=0.68"
      ).from(
        "[data-case-block]",
        {
          y: 24,
          opacity: 0,
          stagger: 0.08,
          duration: 0.72,
        },
        "-=0.28"
      );

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const progress = root.current?.querySelector("[data-case-progress]");
        const content = root.current?.querySelector("[data-case-content]");
        if (!progress || !content) return undefined;

        return ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          endTrigger: content,
          end: "bottom bottom-=48",
          pin: progress,
          pinSpacing: false,
          anticipatePin: 1,
        });
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [prefersReducedMotion] }
  );

  return (
    <div ref={root} className="page-shell page-shell--case-study">
      <div
        aria-hidden="true"
        data-page-atmosphere
        className="page-atmosphere page-atmosphere--case-study"
      />
      <h1 className="sr-only">Case Study</h1>
      <div className="content-shell flex flex-col gap-6 lg:flex-row lg:items-start">
        <div data-case-progress className="w-full self-start lg:w-[220px] lg:flex-none">
          <CaseStudyProgress
            sections={caseStudySections}
            activeSection={activeSection}
            onJump={onJump}
            title="Progress"
            sectionLabels={sectionLabels}
            scrolled={scrolled}
          />
        </div>

        <div data-case-content className="min-w-0 flex-1 space-y-5">
          {caseStudySections.map((section, index) => (
            <CaseStudyBlock
              key={section}
              title={section}
              index={index}
              setRef={(node) => (caseStudyRefs.current[section] = node)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CaseStudyPage;
