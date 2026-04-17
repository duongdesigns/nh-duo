import React from "react";

function CaseStudyProgress({ sections, activeSection, onJump }) {
  return (
    <aside className="lg:sticky lg:top-28 lg:h-fit">
      <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-3">
        <div className="px-3 pb-3 pt-2 text-xs uppercase tracking-[0.24em] text-white/42">
          Progress
        </div>
        <div className="space-y-1">
          {sections.map((name, index) => {
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
                <span>
                  {String(index + 1).padStart(2, "0")}. {name}
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
