import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CaseStudyBlock from "../components/case-study/CaseStudyBlock";
import CaseStudyProgress from "../components/case-study/CaseStudyProgress";
import { caseStudySections } from "../data/caseStudySections";

gsap.registerPlugin(ScrollTrigger);

function CaseStudyPage({ lang, activeSection, onJump, caseStudyRefs }) {
  const root = useRef(null);
  const sectionLabels = {
    Hero: lang === "de" ? "Hero" : "Hero",
    Overview: lang === "de" ? "Überblick" : "Overview",
    Discovery: lang === "de" ? "Recherche" : "Discovery",
    Process: lang === "de" ? "Prozess" : "Process",
    "Final Design": lang === "de" ? "Finales Design" : "Final Design",
    Impact: lang === "de" ? "Wirkung" : "Impact",
    Learnings: lang === "de" ? "Learnings" : "Learnings",
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const progress = root.current?.querySelector("[data-case-progress]");
        const content = root.current?.querySelector("[data-case-content]");
        if (!progress || !content) return undefined;

        return ScrollTrigger.create({
          trigger: root.current,
          start: "top top+=112",
          endTrigger: content,
          end: "bottom bottom-=48",
          pin: progress,
          pinSpacing: false,
          anticipatePin: 1,
        });
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [lang] }
  );

  return (
    <div ref={root} className="page-shell page-shell--case-study">
      <h1 className="sr-only">{lang === "de" ? "Fallstudie" : "Case Study"}</h1>
      <div className="content-shell flex flex-col gap-6 lg:flex-row lg:items-start">
        <div data-case-progress className="self-start lg:w-[220px] lg:flex-none">
          <CaseStudyProgress
            sections={caseStudySections}
            activeSection={activeSection}
            onJump={onJump}
            title={lang === "de" ? "Fortschritt" : "Progress"}
            sectionLabels={sectionLabels}
          />
        </div>

        <div data-case-content className="min-w-0 flex-1 space-y-5">
          {caseStudySections.map((section, index) => (
            <CaseStudyBlock
              key={section}
              lang={lang}
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
