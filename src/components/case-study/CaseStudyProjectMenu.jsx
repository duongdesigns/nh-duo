import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import AnimatedHeadline from "../layout/AnimatedHeadline";
import HorizontalScrollRow from "../layout/HorizontalScrollRow";
import SectionEyebrow from "../layout/SectionEyebrow";

function CaseStudyProjectMenu({
  activeProject,
  projects,
  onSelectProject,
}) {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const previewProjectId = hoveredProjectId ?? activeProject.id;

  const previewProject = projects.find((project) => project.id === previewProjectId) ?? activeProject;

  return (
    <section
      data-case-menu
      className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.028),rgba(255,255,255,0.012))] p-5 shadow-[0_20px_64px_rgba(0,0,0,0.14)] md:p-6 xl:p-7"
    >
      <div className="grid gap-8 xl:grid-cols-[0.78fr_1.22fr] xl:gap-10">
        <div data-case-menu-copy className="max-w-none xl:max-w-[34rem]">
          <SectionEyebrow>Case Studies</SectionEyebrow>
          <AnimatedHeadline
            as="h1"
            className="page-title max-w-[18ch] xl:max-w-[16ch]"
          >
            {activeProject.title} in Context and Detail
          </AnimatedHeadline>
          <p className="body-safe body-safe--wide mt-5 text-base leading-[1.82] text-white/62 md:text-lg">
            {activeProject.menuSummary}
          </p>
        </div>

        <div
          data-case-menu-list
          className="min-w-0"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setHoveredProjectId(null);
            }
          }}
          onMouseLeave={() => setHoveredProjectId(null)}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="type-label text-white/36">Choose a project</div>
            <div className="type-label hidden text-white/24 md:block">
              Hover to preview
            </div>
          </div>
          <HorizontalScrollRow
            className="no-scrollbar mt-5 overflow-x-auto"
            rowClassName="xl:grid xl:grid-cols-3 xl:gap-4"
            gap="gap-3"
            itemClassName="w-[18.5rem] sm:w-[20rem] xl:w-auto"
          >
            {projects.map((project) => {
              const active = project.id === activeProject.id;
              const previewing = project.id === previewProject.id;

              return (
                <motion.button
                  key={project.id}
                  aria-pressed={active}
                  className={`group relative h-full overflow-hidden rounded-[1.45rem] border px-4 py-4 text-left transition-[border-color,background-color,box-shadow,transform] duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    active
                      ? "border-[rgba(58,175,169,0.38)] bg-white/[0.045] shadow-[0_16px_30px_rgba(0,0,0,0.14)]"
                      : previewing
                        ? "border-white/16 bg-white/[0.03] shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
                        : "border-white/8 bg-white/[0.018] hover:border-white/14 hover:bg-white/[0.028]"
                  }`}
                  onFocus={() => setHoveredProjectId(project.id)}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onClick={() => onSelectProject(project.id)}
                  transition={prefersReducedMotion ? undefined : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
                  type="button"
                >
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(58,175,169,0.12),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0))] opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      active || previewing ? "opacity-100" : "group-hover:opacity-100"
                    }`}
                  />
                  <div className="type-label text-white/34">{project.year}</div>
                  <div className={`relative mt-3 text-[1.18rem] font-medium leading-[1.06] tracking-[-0.04em] ${active ? "text-white" : "text-white/88"}`}>
                    {project.title}
                  </div>
                  <div className="relative mt-4 flex items-center justify-between gap-3">
                    <div className={`type-label ${active || previewing ? "text-[rgba(58,175,169,0.8)]" : "text-white/42"}`}>
                      {project.category}
                    </div>
                    <ArrowRight
                      size={15}
                      className={`flex-none transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        active || previewing
                          ? "translate-x-0 opacity-100 text-[rgba(58,175,169,0.82)]"
                          : "translate-x-[-2px] opacity-0 text-white/48 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    />
                  </div>
                </motion.button>
              );
            })}
          </HorizontalScrollRow>

          <div className="mt-4 overflow-hidden rounded-[1.45rem] border border-white/10 bg-white/[0.02]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={previewProject.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="px-4 py-4"
              >
                <div className="type-label text-[rgba(58,175,169,0.8)]">
                  {previewProject.id === activeProject.id ? "Current Study" : "Hover Preview"}
                </div>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <div className="text-sm font-medium text-white md:text-base">
                    {previewProject.title}
                  </div>
                  <div className="type-label text-white/28">{previewProject.year}</div>
                </div>
                <p className="mt-3 text-sm leading-7 text-white/58 md:text-[0.96rem]">
                  {previewProject.menuSummary}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CaseStudyProjectMenu;
