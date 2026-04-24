import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

export default function Navbar({
  activeCaseStudyId,
  caseStudyProjects,
  menuOpen,
  navigate,
  navItems,
  onOpenCaseStudy,
  page,
  preloadPage,
  scrolled,
  setMenuOpen,
}) {
  const [caseStudyMenuOpen, setCaseStudyMenuOpen] = useState(false);
  const [mobileCaseStudyMenuOpen, setMobileCaseStudyMenuOpen] = useState(false);
  const [hoveredCaseStudyId, setHoveredCaseStudyId] = useState(
    activeCaseStudyId || caseStudyProjects[0]?.id || ""
  );
  const mobileMenuId = "primary-navigation-mobile";
  const hoveredCaseStudy = caseStudyProjects.find(
    (project) => project.id === hoveredCaseStudyId
  ) ?? caseStudyProjects[0];

  const renderDesktopNavItem = (item) => {
    if (item.value !== "case-study") {
      return (
        <button
          key={item.value}
          aria-current={page === item.value ? "page" : undefined}
          className={`rounded-2xl px-5 py-2 text-sm transition ${
            page === item.value
              ? scrolled
                ? "bg-[#0E141B] text-white"
                : "cursor-contrast-dark bg-white text-[#333333]"
              : scrolled
                ? "cursor-contrast-dark text-black/68 hover:bg-[#0E141B]/8 hover:text-black"
                : "text-white/72 hover:bg-white/8 hover:text-white"
          }`}
          onClick={() => navigate(item.value)}
          onFocus={() => preloadPage?.(item.value)}
          onMouseEnter={() => preloadPage?.(item.value)}
          type="button"
        >
          {item.label}
        </button>
      );
    }

    return (
      <div
        key={item.value}
        className="relative"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setCaseStudyMenuOpen(false);
          }
        }}
        onMouseEnter={() => {
          preloadPage?.("case-study");
          setHoveredCaseStudyId(activeCaseStudyId || caseStudyProjects[0]?.id || "");
          setCaseStudyMenuOpen(true);
        }}
        onMouseLeave={() => setCaseStudyMenuOpen(false)}
      >
        <button
          aria-current={page === item.value ? "page" : undefined}
          aria-expanded={caseStudyMenuOpen}
          aria-haspopup="menu"
          className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2 text-sm transition ${
            page === item.value
              ? scrolled
                ? "bg-[#0E141B] text-white"
                : "cursor-contrast-dark bg-white text-[#333333]"
              : scrolled
                ? "cursor-contrast-dark text-black/68 hover:bg-[#0E141B]/8 hover:text-black"
                : "text-white/72 hover:bg-white/8 hover:text-white"
          }`}
          onClick={() => navigate("case-study")}
          onFocus={() => {
            preloadPage?.("case-study");
            setHoveredCaseStudyId(activeCaseStudyId || caseStudyProjects[0]?.id || "");
            setCaseStudyMenuOpen(true);
          }}
          type="button"
        >
          {item.label}
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${caseStudyMenuOpen ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {caseStudyMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.985 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -right-3 top-full z-20 w-[calc(22rem+1.5rem)] px-3 pb-3 pt-3"
            >
              <div
                className={`w-[22rem] overflow-hidden rounded-[1.65rem] border p-2 shadow-[0_22px_56px_rgba(0,0,0,0.2)] ${
                  scrolled
                    ? "border-black/10 bg-[#F0F0F0]/96 text-[#0E141B] backdrop-blur-xl"
                    : "border-white/10 bg-[#20262D]/96 text-white backdrop-blur-xl"
                }`}
              >
                <div className="grid gap-1">
                  {caseStudyProjects.map((project) => {
                    const active = activeCaseStudyId === project.id && page === "case-study";
                    const hovered = hoveredCaseStudyId === project.id;

                    return (
                      <button
                        key={project.id}
                        aria-current={active ? "page" : undefined}
                        className={`group block w-full rounded-[1.2rem] px-3 py-3 text-left transition-[background-color,color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          active
                            ? scrolled
                              ? "bg-[#0E141B] text-white shadow-[0_12px_24px_rgba(14,20,27,0.16)]"
                              : "bg-white/10 text-white shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
                            : scrolled
                              ? "text-black/74 hover:bg-[#0E141B]/8 hover:text-black hover:translate-x-1"
                              : "text-white/74 hover:bg-white/6 hover:text-white hover:translate-x-1"
                        }`}
                        onClick={() => {
                          onOpenCaseStudy(project.id);
                          setCaseStudyMenuOpen(false);
                        }}
                        onFocus={() => setHoveredCaseStudyId(project.id)}
                        onMouseEnter={() => setHoveredCaseStudyId(project.id)}
                        type="button"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="type-label text-current/56">{project.year}</div>
                            <div className="mt-2 text-sm font-medium">{project.title}</div>
                          </div>
                          <ArrowRight
                            size={15}
                            className={`mt-1 flex-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              hovered ? "translate-x-0.5" : ""
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {hoveredCaseStudy && (
                  <motion.div
                    key={hoveredCaseStudy.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className={`mt-2 rounded-[1.25rem] border px-4 py-4 ${
                      scrolled
                        ? "border-black/10 bg-black/[0.03]"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <div className="type-label text-[rgba(58,175,169,0.78)]">
                      Hover Preview
                    </div>
                    <div className="mt-3 text-sm font-medium text-current">
                      {hoveredCaseStudy.title}
                    </div>
                    <p className={`mt-3 text-sm leading-7 ${
                      scrolled ? "text-black/62" : "text-white/58"
                    }`}>
                      {hoveredCaseStudy.menuSummary}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderMobileNavItem = (item) => {
    if (item.value !== "case-study") {
      return (
        <button
          key={item.value}
          aria-current={page === item.value ? "page" : undefined}
          className={`block w-full rounded-2xl px-4 py-3 text-left ${
            scrolled
              ? "cursor-contrast-dark text-black/82 hover:bg-[#0E141B]/8"
              : "text-white/82 hover:bg-white/6"
          }`}
          onClick={() => {
            setMobileCaseStudyMenuOpen(false);
            navigate(item.value);
          }}
          onFocus={() => preloadPage?.(item.value)}
          onMouseEnter={() => preloadPage?.(item.value)}
          type="button"
        >
          {item.label}
        </button>
      );
    }

    return (
      <div key={item.value} className="rounded-2xl">
        <button
          aria-expanded={mobileCaseStudyMenuOpen}
          className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left ${
            scrolled
              ? "cursor-contrast-dark text-black/82 hover:bg-[#0E141B]/8"
              : "text-white/82 hover:bg-white/6"
          }`}
          onClick={() => {
            preloadPage?.("case-study");
            setMobileCaseStudyMenuOpen((value) => !value);
          }}
          type="button"
        >
          <span>{item.label}</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${mobileCaseStudyMenuOpen ? "rotate-180" : ""}`}
          />
        </button>

        {mobileCaseStudyMenuOpen && (
          <div className="mt-1 grid gap-1 px-2 pb-1">
            {caseStudyProjects.map((project) => {
              const active = activeCaseStudyId === project.id && page === "case-study";

              return (
                <button
                  key={project.id}
                  aria-current={active ? "page" : undefined}
                  className={`block w-full rounded-[1.15rem] px-3 py-3 text-left transition ${
                    active
                      ? scrolled
                        ? "bg-[#0E141B] text-white"
                        : "bg-white/10 text-white"
                      : scrolled
                        ? "text-black/72 hover:bg-[#0E141B]/8 hover:text-black"
                        : "text-white/72 hover:bg-white/6 hover:text-white"
                  }`}
                  onClick={() => {
                    setMobileCaseStudyMenuOpen(false);
                    onOpenCaseStudy(project.id);
                  }}
                  type="button"
                >
                  <div className="type-label text-current/60">{project.year}</div>
                  <div className="mt-2 text-sm font-medium">{project.title}</div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
      <div
        style={{
          maxWidth: scrolled ? "980px" : "1280px",
          transform: scrolled ? "translateY(0)" : "translateY(6px)",
        }}
        className={`mx-auto hidden items-center justify-between rounded-[2rem] border px-4 py-3 md:flex md:px-6 ${
          "transition-[max-width,transform,background-color,border-color] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        } ${
          scrolled
            ? "border-[rgba(14,20,27,0.08)] bg-[rgba(240,240,240,0.96)]"
            : "border-[rgba(240,240,240,0.08)] bg-[rgba(59,61,63,0.18)]"
        } ${
          scrolled ? "backdrop-blur-xl" : ""
        }`}
      >
        <button
          aria-label="Go to the home page"
          className="group flex items-center text-left"
          onClick={() => navigate("home")}
          type="button"
        >
          <div className="hidden sm:block">
            <div className={`type-eyebrow ${scrolled ? "text-black/55" : "text-white/55"}`}>NH / DUO</div>
            <div className={`text-sm ${scrolled ? "text-black/82" : "text-white/88"}`}>Brand designer portfolio</div>
          </div>
        </button>

        <nav aria-label="Primary" className="ml-auto hidden items-center justify-end gap-4 lg:gap-5 md:flex">
          {navItems.map(renderDesktopNavItem)}
        </nav>

        <button
          aria-controls={mobileMenuId}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((value) => {
            const nextValue = !value;
            if (!nextValue) {
              setMobileCaseStudyMenuOpen(false);
            }
            return nextValue;
          })}
          type="button"
          className={`flex h-10 w-10 items-center justify-center rounded-2xl border md:hidden ${
            scrolled
              ? "border-black/10 bg-black/5 text-black"
              : "border-white/12 bg-white/5 text-white"
          }`}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div className="flex justify-end md:hidden">
        <div className="flex items-center gap-3">
          <button
          aria-controls={mobileMenuId}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((value) => {
            const nextValue = !value;
            if (!nextValue) {
              setMobileCaseStudyMenuOpen(false);
            }
            return nextValue;
          })}
          type="button"
            style={{
              transform: scrolled ? "translateY(0)" : "translateY(6px)",
            }}
            className={`flex h-[52px] w-[52px] items-center justify-center rounded-[1.4rem] border transition-[transform,background-color,border-color] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              scrolled
                ? "border-[rgba(14,20,27,0.08)] bg-[rgba(240,240,240,0.96)]"
                : "border-[rgba(240,240,240,0.08)] bg-[rgba(59,61,63,0.18)]"
            } ${
              scrolled ? "backdrop-blur-xl" : ""
            } ${
              scrolled ? "cursor-contrast-dark text-black" : "text-white"
            }`}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id={mobileMenuId}
          aria-label="Mobile"
          className={`mx-auto mt-3 max-w-5xl rounded-3xl border p-3 md:hidden ${
            scrolled ? "backdrop-blur-xl" : ""
          } ${
            scrolled
              ? "border-black/10 bg-[#F0F0F0]/95"
              : "border-white/10 bg-[#3B3B3B]/95"
          }`}
        >
          {navItems.map(renderMobileNavItem)}
        </nav>
      )}
    </header>
  );
}
