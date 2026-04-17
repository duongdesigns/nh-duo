import React, { useEffect, useMemo, useRef, useState } from "react";

import { featuredProjects } from "./data/projects";
import { caseStudySections } from "./data/caseStudySections";
import ContactSection from "./components/home/ContactSection";
import FeaturedWork from "./components/home/FeaturedWork";
import Hero from "./components/home/Hero";
import Principles from "./components/home/Principles";
import Navbar from "./components/layout/Navbar";
import CaseStudyPage from "./pages/CaseStudyPage";
import ContactPage from "./pages/ContactPage";
import WorkPage from "./pages/WorkPage";


// App shell
function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(caseStudySections[0]);
  const [hoveredProject, setHoveredProject] = useState(featuredProjects[0].id);
  const caseStudyRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const minIntroTime = new Promise((resolve) => {
      window.setTimeout(resolve, 1200);
    });

    const pageLoaded = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
        return;
      }

      const handleLoad = () => {
        window.removeEventListener("load", handleLoad);
        resolve();
      };

      window.addEventListener("load", handleLoad);
    });

    const fontsReady = document.fonts?.ready ?? Promise.resolve();

    Promise.all([minIntroTime, pageLoaded, fontsReady]).then(() => {
      if (!cancelled) {
        requestAnimationFrame(() => {
          setShowIntro(false);
        });
      }
    });

    return () => {
      cancelled = true;
    };
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
      { label: lang === "de" ? "Start" : "Home", value: "home" },
      { label: lang === "de" ? "Arbeiten" : "Work", value: "work" },
      { label: lang === "de" ? "Fallstudie" : "Case Study", value: "case-study" },
      { label: lang === "de" ? "Kontakt" : "Contact", value: "contact" },
    ],
    [lang]
  );

  const navigate = (value) => {
    setPage(value);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToCaseStudySection = (name) => {
    const node = caseStudyRefs.current[name];
    if (!node) return;
    node.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#0E141B] text-[#F0F0F0] selection:bg-white/20"
      style={{
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >


      <Navbar
        page={page}
        navigate={navigate}
        navItems={navItems}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrolled={scrolled}
        lang={lang}
        setLang={setLang}
      />

      {showIntro && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-black">
          <div className="relative z-10 flex w-full max-w-xl flex-col items-center px-6 text-center">
            <div className="flex items-baseline justify-center text-[clamp(1.35rem,3.05vw,2.35rem)] font-semibold tracking-[0.02em]">
              <span className="inline-flex items-baseline">
                <span className="intro-ch" style={{ animationDelay: "0s" }}>N</span>
                <span className="intro-ch" style={{ animationDelay: "0.16s" }}>H</span>
                <span className="mx-[0.72em] inline-flex items-center self-center intro-slash" style={{ animationDelay: "0.31s" }}>/</span>
                <span className="intro-ch" style={{ animationDelay: "0.46s" }}>D</span>
                <span className="intro-ch" style={{ animationDelay: "0.61s" }}>U</span>
                <span className="intro-ch" style={{ animationDelay: "0.76s" }}>O</span>
              </span>
            </div>
          </div>
        </div>
      )}

      <main className="relative z-10">
        {/* Home page */}
        {page === "home" && (
          <>
            <Hero
              lang={lang}
              onExplore={() => navigate("work")}
              onCaseStudy={() => navigate("case-study")}
            />
            <FeaturedWork
              lang={lang}
              hoveredProject={hoveredProject}
              setHoveredProject={setHoveredProject}
              onOpenCaseStudy={() => navigate("case-study")}
            />
            <Principles lang={lang} />
            <ContactSection lang={lang} />
          </>
        )}

        {/* Work page */}
        {page === "work" && <WorkPage lang={lang} onOpenCaseStudy={() => navigate("case-study")} />}
        {/* Case study page */}
        {page === "case-study" && (
          <CaseStudyPage
            lang={lang}
            activeSection={activeSection}
            onJump={scrollToCaseStudySection}
            caseStudyRefs={caseStudyRefs}
          />
        )}
        {/* Contact page */}
        {page === "contact" && <ContactPage lang={lang} />}
      </main>
    </div>
  );
}
export default App;

if (typeof document !== "undefined" && !document.getElementById("nh-intro-sweep-keyframes")) {
  const style = document.createElement("style");
  style.id = "nh-intro-sweep-keyframes";
  style.innerHTML = `
    .intro-ch, .intro-slash {
      color: rgba(240, 243, 243, 0.18);
      opacity: 0.46;
      display: inline-block;
      will-change: color, opacity;
      animation: introCharFill 0.72s cubic-bezier(0.3, 0.08, 0.22, 1) forwards;
    }

    .intro-slash {
      display: inline-flex;
      align-items: center;
      align-self: center;
      font-size: 0.72em;
      line-height: 1;
      transform: translateY(-0.02em);
      color: rgba(240, 243, 243, 0.12);
      opacity: 0.38;
      animation: introSlashFill 0.68s cubic-bezier(0.3, 0.08, 0.22, 1) forwards;
    }

    @keyframes introCharFill {
      0% {
        color: rgba(240, 243, 243, 0.18);
        opacity: 0.46;
      }
      38% {
        color: rgba(240, 243, 243, 0.42);
        opacity: 0.72;
      }
      68% {
        color: rgba(248, 252, 252, 0.82);
        opacity: 0.94;
      }
      100% {
        color: rgba(255, 255, 255, 0.96);
        opacity: 1;
      }
    }

    @keyframes introSlashFill {
      0% {
        color: rgba(240, 243, 243, 0.12);
        opacity: 0.38;
      }
      42% {
        color: rgba(240, 243, 243, 0.24);
        opacity: 0.6;
      }
      70% {
        color: rgba(244, 247, 247, 0.68);
        opacity: 0.86;
      }
      100% {
        color: rgba(255, 255, 255, 0.82);
        opacity: 0.92;
      }
    }
  `;
  document.head.appendChild(style);
}
