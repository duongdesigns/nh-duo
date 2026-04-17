import React from "react";

import CaseStudyBlock from "../components/case-study/CaseStudyBlock";
import { caseStudySections } from "../data/caseStudySections";

function CaseStudyPage({ lang, activeSection, onJump, caseStudyRefs }) {
  const sectionLabels = {
    Hero: lang === "de" ? "Hero" : "Hero",
    Overview: lang === "de" ? "Überblick" : "Overview",
    Discovery: lang === "de" ? "Recherche" : "Discovery",
    Process: lang === "de" ? "Prozess" : "Process",
    "Final Design": lang === "de" ? "Finales Design" : "Final Design",
    Impact: lang === "de" ? "Wirkung" : "Impact",
    Learnings: lang === "de" ? "Learnings" : "Learnings",
  };
  return (
    <div className="px-4 pb-24 pt-32 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-3">
            <div className="px-3 pb-3 pt-2 text-xs uppercase tracking-[0.24em] text-white/42">{lang === "de" ? "Fortschritt" : "Progress"}</div>
            <div className="space-y-1">
              {caseStudySections.map((name, i) => {
                const active = activeSection === name;
                return (
                  <button
                    key={name}
                    onClick={() => onJump(name)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition ${
                      active ? "bg-[#007BFF] text-white" : "text-white/68 hover:bg-white/6 hover:text-white"
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${active ? "bg-white" : "bg-white/24"}`} />
                    <span>{String(i + 1).padStart(2, "0")}. {sectionLabels[name]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="space-y-5">
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
