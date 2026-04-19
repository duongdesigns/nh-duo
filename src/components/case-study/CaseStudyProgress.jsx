import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

function CaseStudyProgress({
  sections,
  activeSection,
  onJump,
  title = "Progress",
  sectionLabels = {},
  scrolled = false,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCollapsed, setShowCollapsed] = useState(false);
  const mobilePanelRef = useRef(null);

  const activeIndex = Math.max(
    sections.findIndex((name) => name === activeSection),
    0
  );
  const activeLabel = useMemo(
    () => sectionLabels[activeSection] ?? activeSection,
    [activeSection, sectionLabels]
  );
  const activeNumber = String(activeIndex + 1).padStart(2, "0");

  useEffect(() => {
    if (!showCollapsed) {
      setMobileOpen(false);
    }
  }, [showCollapsed]);

  useEffect(() => {
    const updateCollapsedState = () => {
      if (window.innerWidth >= 1024) {
        setShowCollapsed(false);
        return;
      }

      const rect = mobilePanelRef.current?.getBoundingClientRect();
      if (!rect) return;

      const collapsedTop = 88;
      setShowCollapsed(rect.bottom <= collapsedTop);
    };

    updateCollapsedState();
    window.addEventListener("scroll", updateCollapsedState, { passive: true });
    window.addEventListener("resize", updateCollapsedState);

    return () => {
      window.removeEventListener("scroll", updateCollapsedState);
      window.removeEventListener("resize", updateCollapsedState);
    };
  }, []);

  const renderProgressButton = (name, index) => {
    const active = activeSection === name;

    return (
      <button
        key={name}
        onClick={() => {
          onJump(name);
          setMobileOpen(false);
        }}
        type="button"
        className={`relative isolate flex w-full items-center gap-3 overflow-hidden rounded-2xl px-3 py-3 text-left text-sm transition ${
          active ? "text-white" : "text-white/68 hover:bg-white/6 hover:text-white"
        }`}
      >
        {active && (
          <motion.span
            initial={false}
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
  };

  return (
    <aside className="self-start lg:sticky lg:top-28 lg:h-fit">
      <div className="lg:hidden">
        <div ref={mobilePanelRef} className="w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="p-3">
            <div className="px-3 pb-3 pt-2 text-xs uppercase tracking-[0.24em] text-white/42">
              {title}
            </div>
            <LayoutGroup id="case-study-progress-mobile-full">
              <div className="space-y-1">
                {sections.map(renderProgressButton)}
              </div>
            </LayoutGroup>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {showCollapsed && (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-[5.5rem] z-40 w-auto md:inset-x-8"
            >
              <div className="w-full overflow-hidden rounded-[1.65rem] border border-white/10 bg-[#182129] shadow-[0_14px_38px_rgba(7,10,13,0.18)] backdrop-blur-xl">
                <button
                  onClick={() => setMobileOpen((value) => !value)}
                  type="button"
                  className="relative flex h-[52px] w-full items-center justify-center px-6 text-left"
                >
                  <div className="flex min-w-0 flex-col items-center justify-center text-center">
                    <div className="type-eyebrow px-2 text-[#3AAFA9]/72">{title}</div>
                    <div className="mt-0.5 max-w-full truncate px-2 text-sm font-medium text-[#3AAFA9]">
                      {activeNumber}. {activeLabel}
                    </div>
                  </div>
                  <motion.span
                    animate={{ rotate: mobileOpen ? 180 : 0 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-4 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/72"
                  >
                    <ChevronDown size={16} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {mobileOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden border-t border-white/10"
                    >
                      <div className="p-3">
                        <LayoutGroup id="case-study-progress-mobile-list">
                          <div className="space-y-1">
                            {sections.map(renderProgressButton)}
                          </div>
                        </LayoutGroup>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-3 lg:block">
        <div className="px-3 pb-3 pt-2 text-xs uppercase tracking-[0.24em] text-white/42">
          {title}
        </div>
        <LayoutGroup id="case-study-progress">
          <div className="space-y-1">
            {sections.map(renderProgressButton)}
          </div>
        </LayoutGroup>
      </div>
    </aside>
  );
}

export default CaseStudyProgress;
