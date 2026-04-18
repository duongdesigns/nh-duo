import React from "react";
import { motion } from "framer-motion";

function CaseStudyProgress({ sections, activeSection, onJump, title = "Progress", sectionLabels = {} }) {
  return (
    <aside className="self-start lg:sticky lg:top-28 lg:h-fit">
      <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-3">
        <div className="px-3 pb-3 pt-2 text-xs uppercase tracking-[0.24em] text-white/42">
          {title}
        </div>
        <div className="space-y-1">
          {sections.map((name, index) => {
            const active = activeSection === name;
            return (
              <button
                key={name}
                onClick={() => onJump(name)}
                type="button"
                className={`relative isolate flex w-full items-center gap-3 overflow-hidden rounded-2xl px-3 py-3 text-left text-sm transition ${
                  active ? "text-white" : "text-white/68 hover:bg-white/6 hover:text-white"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="case-study-progress-active"
                    className="absolute inset-0 rounded-2xl bg-[#3AAFA9]"
                    transition={{ type: "spring", stiffness: 280, damping: 30, mass: 0.95 }}
                  />
                )}
                <span className={`relative z-10 h-2 w-2 rounded-full ${active ? "bg-white" : "bg-white/24"}`} />
                <span className="relative z-10">
                  {String(index + 1).padStart(2, "0")}. {sectionLabels[name] ?? name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default CaseStudyProgress;
