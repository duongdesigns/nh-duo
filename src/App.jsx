import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, ExternalLink, Mail, Menu, X } from "lucide-react";
import gsap from "gsap";

const TOKENS = {
  colors: {
    bg: "#333333",
    bgSoft: "#3B3B3B",
    panel: "#404040",
    panelSoft: "#474747",
    text: "#F0F0F0",
    textSoft: "rgba(240,240,240,0.72)",
    line: "rgba(240,240,240,0.12)",
    accent: "#007BFF",
    accentSoft: "rgba(0,123,255,0.18)",
  },
  spacing: {
    1: "0.5rem",
    2: "1rem",
    3: "1.5rem",
    4: "2rem",
    5: "3rem",
    6: "4rem",
    7: "6rem",
  },
  radius: {
    xl: "1rem",
    xxl: "1.5rem",
    full: "999px",
  },
};

const caseStudySections = [
  "Hero",
  "Overview",
  "Discovery",
  "Process",
  "Final Design",
  "Impact",
  "Learnings",
];

const featuredProjects = [
  {
    id: "nord-form",
    title: "Nord Form",
    category: "Brand System / Digital Experience",
    year: "2026",
    summary:
      "A cinematic brand-led website for a design-led product studio with restrained motion and strong narrative pacing.",
  },
  {
    id: "atlas-case",
    title: "Atlas Case",
    category: "Case Study / Art Direction",
    year: "2025",
    summary:
      "A visual-first case study template designed to make process, craft, and outcomes feel equally premium.",
  },
  {
    id: "signal-duo",
    title: "Signal Duo",
    category: "Identity / Portfolio",
    year: "2025",
    summary:
      "A modular portfolio system using dark surfaces, oversized type, and controlled interaction states.",
  },
];

function useFluidBackground(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bg-orb",
        { y: 0, x: 0, opacity: 0.18 },
        {
          y: -30,
          x: 20,
          opacity: 0.26,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.35,
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [ref]);
}

function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(caseStudySections[0]);
  const [hoveredProject, setHoveredProject] = useState(featuredProjects[0].id);
  const rootRef = useRef(null);
  const caseStudyRefs = useRef({});

  useFluidBackground(rootRef);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (page !== "case-study") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.dataset.section);
          }
        });
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0.1 }
    );

    Object.values(caseStudyRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [page]);

  const navItems = useMemo(
    () => [
      { label: "Home", value: "home" },
      { label: "Work", value: "work" },
      { label: "Case Study", value: "case-study" },
      { label: "Contact", value: "contact" },
    ],
    []
  );

  const navigate = (value) => {
    setPage(value);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToCaseStudySection = (name) => {
    const node = caseStudyRefs.current[name];
    if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#333333] text-[#F0F0F0] selection:bg-white/20"
      style={{
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-orb absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#007BFF]/20 blur-3xl" />
        <div className="bg-orb absolute right-0 top-64 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="bg-orb absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#007BFF]/10 blur-3xl" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
        <motion.div
          animate={{
            maxWidth: scrolled ? 980 : 1280,
            backgroundColor: scrolled ? "rgba(51,51,51,0.82)" : "rgba(51,51,51,0.18)",
            borderColor: scrolled ? "rgba(240,240,240,0.12)" : "rgba(240,240,240,0.08)",
            y: scrolled ? 0 : 6,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex items-center justify-between rounded-full border px-4 py-3 backdrop-blur-xl md:px-6"
        >
          <button
            onClick={() => navigate("home")}
            className="group flex items-center gap-3 text-left"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs font-semibold tracking-[0.24em]">
              NH
            </div>
            <div className="hidden sm:block">
              <div className="text-[11px] uppercase tracking-[0.3em] text-white/55">NH / DUO</div>
              <div className="text-sm text-white/88">Brand designer portfolio</div>
            </div>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => navigate(item.value)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  page === item.value
                    ? "bg-white text-[#333333]"
                    : "text-white/72 hover:bg-white/8 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.div>

        {menuOpen && (
          <div className="mx-auto mt-3 max-w-5xl rounded-3xl border border-white/10 bg-[#3B3B3B]/95 p-3 backdrop-blur-xl md:hidden">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => navigate(item.value)}
                className="block w-full rounded-2xl px-4 py-3 text-left text-white/82 hover:bg-white/6"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="relative z-10">
        {page === "home" && (
          <>
            <Hero onExplore={() => navigate("work")} onCaseStudy={() => navigate("case-study")} />
            <FeaturedWork
              hoveredProject={hoveredProject}
              setHoveredProject={setHoveredProject}
              onOpenCaseStudy={() => navigate("case-study")}
            />
            <Principles />
            <ContactSection />
          </>
        )}

        {page === "work" && <WorkIndex onOpenCaseStudy={() => navigate("case-study")} />}
        {page === "case-study" && (
          <CaseStudyPage
            activeSection={activeSection}
            onJump={scrollToCaseStudySection}
            caseStudyRefs={caseStudyRefs}
          />
        )}
        {page === "contact" && <ContactPage />}
      </main>
    </div>
  );
}

function SectionEyebrow({ children }) {
  return (
    <div className="mb-5 text-[11px] uppercase tracking-[0.28em] text-white/48">{children}</div>
  );
}

function Hero({ onExplore, onCaseStudy }) {
  return (
    <section className="relative flex min-h-screen items-end px-4 pb-10 pt-32 md:px-8 md:pb-14">
      <div className="mx-auto grid w-full max-w-7xl gap-12 md:grid-cols-[1.3fr_0.7fr] md:gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionEyebrow>Branding / Digital / Case Studies</SectionEyebrow>
            <h1 className="max-w-5xl text-[clamp(3.4rem,9vw,9rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-white">
              NH <span className="text-white/44">/</span> DUO
            </h1>
            <div className="mt-4 max-w-4xl text-[clamp(1.1rem,2vw,1.5rem)] leading-[1.6] text-white/70">
              A dark, cinematic portfolio for a branding-focused designer — built around sharp visual rhythm, fluid transitions, and case studies that feel as considered as the work itself.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onCaseStudy}
              className="group inline-flex items-center gap-3 rounded-full bg-[#007BFF] px-7 py-4 text-base font-medium text-white transition hover:scale-[1.02] hover:bg-[#1787ff]"
            >
              Explore case study
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </button>
            <button
              onClick={onExplore}
              className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/5 px-7 py-4 text-base text-white/86 transition hover:bg-white/10"
            >
              View selected work
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end"
        >
          <div className="w-full rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-5">
            <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/8 to-white/[0.03] p-5 md:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-white/45">Preview frame</div>
                  <div className="mt-1 text-sm text-white/75">Visual-led case study system</div>
                </div>
                <div className="rounded-full border border-white/12 px-3 py-1 text-xs text-white/55">v0.1</div>
              </div>
              <div className="mt-5 grid gap-3">
                <div className="h-36 rounded-[1.25rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-4">
                  <div className="h-full rounded-[1rem] border border-white/10 bg-[#007BFF]/12 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/45">Hero motion</div>
                    <div className="mt-3 max-w-xs text-2xl font-semibold leading-tight tracking-[-0.04em]">
                      Cinematic pacing, controlled surfaces, minimal color.
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="h-28 rounded-[1.25rem] border border-white/10 bg-white/5 p-4" />
                  <div className="h-28 rounded-[1.25rem] border border-white/10 bg-white/5 p-4" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <button
        onClick={onExplore}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-white/65 backdrop-blur md:inline-flex"
      >
        Scroll / explore <ChevronDown size={16} />
      </button>
    </section>
  );
}

function FeaturedWork({ hoveredProject, setHoveredProject, onOpenCaseStudy }) {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionEyebrow>Selected Work</SectionEyebrow>
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 md:p-6">
            <div className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
              Designed to feel immersive, but still readable, restrained, and portfolio-first.
            </div>
            <div className="mt-4 max-w-xl text-base leading-[1.75] text-white/62 md:text-lg">
              The system balances moderate motion, strong art direction, and premium case-study structure. Dark surfaces carry the tone. Accent color is saved for intent.
            </div>

            <div className="mt-8 grid gap-3">
              {featuredProjects.map((project) => {
                const active = hoveredProject === project.id;
                return (
                  <motion.button
                    key={project.id}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onFocus={() => setHoveredProject(project.id)}
                    onClick={onOpenCaseStudy}
                    whileHover={{ y: -2 }}
                    className={`rounded-[1.4rem] border p-5 text-left transition ${
                      active
                        ? "border-[#007BFF]/45 bg-[#007BFF]/10"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm uppercase tracking-[0.2em] text-white/45">{project.category}</div>
                        <div className="mt-2 text-2xl font-medium tracking-[-0.04em]">{project.title}</div>
                      </div>
                      <div className="text-sm text-white/45">{project.year}</div>
                    </div>
                    <div className="mt-3 max-w-xl text-sm leading-7 text-white/62">{project.summary}</div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <motion.div
            layout
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/7 to-white/[0.03] p-4 md:p-6"
          >
            <div className="h-full min-h-[460px] rounded-[1.5rem] border border-white/10 bg-[#3B3B3B] p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-white/42">Live preview</div>
                  <div className="mt-1 text-lg text-white/84">{featuredProjects.find((p) => p.id === hoveredProject)?.title}</div>
                </div>
                <button
                  onClick={onOpenCaseStudy}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-white/78 hover:bg-white/8"
                >
                  Open <ExternalLink size={14} />
                </button>
              </div>
              <div className="mt-6 grid h-[360px] gap-3 md:grid-cols-6 md:grid-rows-6">
                <div className="rounded-[1.25rem] border border-white/10 bg-[#007BFF]/12 md:col-span-4 md:row-span-4" />
                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 md:col-span-2 md:row-span-2" />
                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 md:col-span-2 md:row-span-2" />
                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] md:col-span-3 md:row-span-2" />
                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] md:col-span-3 md:row-span-2" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Principles() {
  const items = [
    "Muted dark palette with reserved accent usage",
    "Top navigation that transforms after first scroll",
    "Visual-first case studies with classic structure",
    "Moderate motion with occasional cinematic flourishes",
    "Simple contact flow with prominent action-led CTA",
    "Container queries, fluid type, and token-based styling",
  ];

  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
        <SectionEyebrow>System Principles</SectionEyebrow>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.06, duration: 0.6 }}
              className="rounded-[1.5rem] border border-white/10 bg-[#3B3B3B] p-5"
            >
              <div className="text-xs uppercase tracking-[0.24em] text-white/35">0{index + 1}</div>
              <div className="mt-4 text-lg leading-8 text-white/84">{item}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="px-4 pb-20 pt-4 md:px-8 md:pb-28">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <SectionEyebrow>Contact</SectionEyebrow>
          <div className="text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
            Let’s shape a portfolio, identity, or case study that feels built — not templated.
          </div>
          <div className="mt-4 max-w-md text-base leading-[1.75] text-white/62">
            Keep the form direct and low-friction. Ask only for what matters. Use motion with restraint.
          </div>
        </div>
        <SimpleContactForm />
      </div>
    </section>
  );
}

function SimpleContactForm() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-[#3B3B3B]/90 p-6 md:p-8">
      <div className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm text-white/62">Name</span>
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition placeholder:text-white/28 focus:border-[#007BFF]/50" placeholder="Your name" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-white/62">Email</span>
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition placeholder:text-white/28 focus:border-[#007BFF]/50" placeholder="you@example.com" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-white/62">Project brief</span>
          <textarea rows={6} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition placeholder:text-white/28 focus:border-[#007BFF]/50" placeholder="A short note about scope, timeline, or what you want to build." />
        </label>
      </div>
      <button className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#007BFF] px-7 py-4 text-base font-medium text-white transition hover:scale-[1.02] hover:bg-[#1787ff]">
        Start the project <ArrowRight size={18} />
      </button>
    </div>
  );
}

function WorkIndex({ onOpenCaseStudy }) {
  return (
    <section className="px-4 pb-20 pt-32 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionEyebrow>Work Index</SectionEyebrow>
        <div className="mb-10 max-w-4xl text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
          A visual system for selected projects, narratives, and branded digital moments.
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.button
              key={project.id}
              onClick={onOpenCaseStudy}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="group rounded-[2rem] border border-white/10 bg-white/5 p-4 text-left transition hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <div className="mb-4 aspect-[4/5] rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/8 to-white/[0.03]" />
              <div className="text-xs uppercase tracking-[0.22em] text-white/42">{project.category}</div>
              <div className="mt-2 text-2xl font-medium tracking-[-0.04em]">{project.title}</div>
              <div className="mt-2 text-sm leading-7 text-white/62">{project.summary}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudyPage({ activeSection, onJump, caseStudyRefs }) {
  return (
    <div className="px-4 pb-24 pt-32 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-3">
            <div className="px-3 pb-3 pt-2 text-xs uppercase tracking-[0.24em] text-white/42">Progress</div>
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
                    <span>{String(i + 1).padStart(2, "0")}. {name}</span>
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

function CaseStudyBlock({ title, index, setRef }) {
  const content = {
    Hero: {
      kicker: "Case Study Hero",
      heading: "Atlas Case — a visual-first portfolio narrative for branding and digital work.",
      text: "Lead with the strongest final frames. Keep the introduction concise. Let the page immediately communicate tone, polish, and relevance.",
      layout: "hero",
    },
    Overview: {
      kicker: "Project Overview",
      heading: "Define the product, your role, timeline, tools, and the exact challenge being solved.",
      text: "This section should stay scannable: role, collaborators, deliverables, timeline, and one focused problem statement.",
      layout: "overview",
    },
    Discovery: {
      kicker: "Exploration / Discovery",
      heading: "Show research, references, sketches, mood, and what shaped the visual direction.",
      text: "Answer three questions: why did you do it, what did you learn, and how did that shape the next design move.",
      layout: "media",
    },
    Process: {
      kicker: "Design Process",
      heading: "Move from rough thinking into flows, structure, interface decisions, and iteration.",
      text: "Use animated GIFs or stills to show progression. Emphasize decisions rather than just artifacts.",
      layout: "grid",
    },
    "Final Design": {
      kicker: "Final Design",
      heading: "Reveal the polished result with controlled galleries, strong crops, and sharp captions.",
      text: "Use gallery layouts instead of carousels. Let the work breathe. Reserve motion for transitions and detail reveal.",
      layout: "gallery",
    },
    Impact: {
      kicker: "Impact",
      heading: "Summarize outcomes, reaction, and what changed because of the work.",
      text: "Metrics can be added later. For now, structure the section for key outcomes, takeaways, and client or stakeholder feedback.",
      layout: "impact",
    },
    Learnings: {
      kicker: "Learnings",
      heading: "Close with what sharpened your thinking, craft, or process.",
      text: "This should feel reflective and specific. It turns the case study into a design narrative rather than a static archive.",
      layout: "text",
    },
  }[title];

  return (
    <section
      ref={setRef}
      data-section={title}
      className="rounded-[2rem] border border-white/10 bg-white/5 p-5 md:p-8"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-white/42">{content.kicker}</div>
          <div className="mt-3 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
            {content.heading}
          </div>
        </div>
        <div className="hidden rounded-full border border-white/12 px-3 py-1 text-xs text-white/42 md:block">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="max-w-3xl text-base leading-[1.85] text-white/64 md:text-lg">{content.text}</div>

      {content.layout === "hero" && (
        <div className="mt-8 grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <div className="aspect-[16/10] rounded-[1.5rem] border border-white/10 bg-[#007BFF]/10" />
          <div className="grid gap-4">
            <div className="aspect-[4/3] rounded-[1.5rem] border border-white/10 bg-white/5" />
            <div className="aspect-[4/3] rounded-[1.5rem] border border-white/10 bg-white/5" />
          </div>
        </div>
      )}

      {content.layout === "overview" && (
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Role", "Brand Designer / Digital Designer"],
            ["Timeline", "8 weeks"],
            ["Scope", "Identity, website, case-study system"],
            ["Tools", "Figma, Adobe CC, React"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[1.25rem] border border-white/10 bg-[#3B3B3B] p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-white/42">{label}</div>
              <div className="mt-3 text-base text-white/84">{value}</div>
            </div>
          ))}
        </div>
      )}

      {content.layout === "media" && (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="aspect-[4/5] rounded-[1.5rem] border border-white/10 bg-white/5" />
          <div className="aspect-[4/5] rounded-[1.5rem] border border-white/10 bg-white/5" />
          <div className="aspect-[4/5] rounded-[1.5rem] border border-white/10 bg-white/5" />
        </div>
      )}

      {content.layout === "grid" && (
        <div className="mt-8 grid gap-4 md:grid-cols-6 md:grid-rows-2">
          <div className="aspect-[16/10] rounded-[1.5rem] border border-white/10 bg-white/5 md:col-span-4 md:row-span-2 md:aspect-auto" />
          <div className="aspect-[1/1] rounded-[1.5rem] border border-white/10 bg-white/5 md:col-span-2" />
          <div className="aspect-[1/1] rounded-[1.5rem] border border-white/10 bg-[#007BFF]/10 md:col-span-2" />
        </div>
      )}

      {content.layout === "gallery" && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="aspect-[4/5] rounded-[1.5rem] border border-white/10 bg-white/5" />
          <div className="aspect-[4/5] rounded-[1.5rem] border border-white/10 bg-white/5" />
          <div className="aspect-[16/10] rounded-[1.5rem] border border-white/10 bg-[#007BFF]/10 md:col-span-2" />
        </div>
      )}

      {content.layout === "impact" && (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            "Clearer project storytelling",
            "More premium content pacing",
            "Reusable template for future case studies",
          ].map((item) => (
            <div key={item} className="rounded-[1.25rem] border border-white/10 bg-[#3B3B3B] p-5 text-lg leading-8 text-white/84">
              {item}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function ContactPage() {
  return (
    <section className="px-4 pb-20 pt-32 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <SectionEyebrow>Direct Contact</SectionEyebrow>
          <div className="text-[clamp(2.4rem,5vw,5.4rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
            Start with the essentials.
          </div>
          <div className="mt-4 max-w-lg text-base leading-[1.8] text-white/62 md:text-lg">
            A simple form, clear intent, and one prominent action. This is the conversion point, so it should feel calm, fast, and deliberate.
          </div>
          <div className="mt-8 flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-[#3B3B3B] p-4 text-white/72">
            <Mail size={18} /> hello@nhduo.studio
          </div>
        </div>
        <SimpleContactForm />
      </div>
    </section>
  );
}

export default App;
