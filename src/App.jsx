import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(caseStudySections[0]);
  const [hoveredProject, setHoveredProject] = useState(featuredProjects[0].id);
  const caseStudyRefs = useRef({});

  const introSpeed = 1.0;
  const introStagger = introSpeed * 0.19;
  const introDelayChildren = introSpeed * 0.05;
  const introLetterDuration = introSpeed;
  const introSlashDuration = introSpeed * 0.95;
  const introOutroBuffer = introSpeed * 0.31;
  const introDurationSeconds =
    introDelayChildren + introStagger * 5 + introLetterDuration + introOutroBuffer;

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  useEffect(() => {
    if (!showIntro) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [showIntro]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const minIntroTime = new Promise((resolve) => {
      window.setTimeout(resolve, introDurationSeconds * 800);
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
  }, [introDurationSeconds]);

  useEffect(() => {
    if (page !== "case-study") return;
    let frameId = 0;

    const updateActiveSection = () => {
      const viewportAnchor = window.innerHeight * 0.38;
      let nextActiveSection = caseStudySections[0];
      let smallestDistance = Number.POSITIVE_INFINITY;

      caseStudySections.forEach((sectionName) => {
        const node = caseStudyRefs.current[sectionName];
        if (!node) return;

        const rect = node.getBoundingClientRect();
        const clampedAnchor = Math.min(
          Math.max(viewportAnchor, rect.top),
          rect.bottom
        );
        const distance = Math.abs(clampedAnchor - viewportAnchor);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          nextActiveSection = sectionName;
        }
      });

      setActiveSection(nextActiveSection);
      frameId = 0;
    };

    const requestActiveSectionUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    requestActiveSectionUpdate();
    window.addEventListener("scroll", requestActiveSectionUpdate, { passive: true });
    window.addEventListener("resize", requestActiveSectionUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", requestActiveSectionUpdate);
      window.removeEventListener("resize", requestActiveSectionUpdate);
    };
  }, [page]);

  const navItems = [
    { label: "Home", value: "home" },
    { label: "Work", value: "work" },
    { label: "Case Study", value: "case-study" },
    { label: "Contact", value: "contact" },
  ];

  const navigate = (value) => {
    setPage(value);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToCaseStudySection = (name) => {
    const node = caseStudyRefs.current[name];
    if (!node) return;

    const yOffset = 140;
    const targetTop = node.getBoundingClientRect().top + window.scrollY - yOffset;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth",
    });
  };

  const introCharacters = [
    { key: "n", value: "N", type: "letter" },
    { key: "h", value: "H", type: "letter" },
    { key: "slash", value: "/", type: "slash" },
    { key: "d", value: "D", type: "letter" },
    { key: "u", value: "U", type: "letter" },
    { key: "o", value: "O", type: "letter" },
  ];

  const introWordmarkVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: introDelayChildren,
        staggerChildren: introStagger,
      },
    },
  };

  const introCharacterVariants = {
    hidden: ({ type }) => ({
      opacity: type === "slash" ? 0.28 : 0.34,
      color: type === "slash" ? "rgba(240, 243, 243, 0.18)" : "rgba(240, 243, 243, 0.22)",
      clipPath: "inset(0 100% 0 0)",
      x: "-0.04em",
    }),
    visible: ({ type }) => ({
      opacity: type === "slash" ? 0.9 : 1,
      color: type === "slash" ? "rgba(255, 255, 255, 0.82)" : "rgba(255, 255, 255, 0.96)",
      clipPath: "inset(0 0% 0 0)",
      x: "0em",
      transition: {
        duration: type === "slash" ? introSlashDuration : introLetterDuration,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        opacity: {
          duration: 0.52,
          ease: [0.22, 1, 0.36, 1],
        },
        y: {
          type: "spring",
          stiffness: 240,
          damping: 28,
          mass: 0.95,
        },
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        opacity: {
          duration: 0.42,
          ease: [0.22, 1, 0.36, 1],
        },
        y: {
          type: "spring",
          stiffness: 280,
          damping: 32,
          mass: 0.85,
        },
      },
    },
  };

  const renderIntroWordmark = () => (
    <span className="inline-flex items-baseline">
      {introCharacters.map((character) => {
        const isSlash = character.type === "slash";

        return (
          <motion.span
            key={character.key}
            custom={{ type: character.type }}
            variants={introCharacterVariants}
            className={
              isSlash
                ? "mx-[0.72em] inline-flex items-center self-center overflow-hidden text-[0.72em] leading-none"
                : "inline-block overflow-hidden"
            }
            style={isSlash ? { transform: "translateY(-0.02em)" } : undefined}
          >
            {character.value}
          </motion.span>
        );
      })}
    </span>
  );

  return (
    <div className="min-h-screen bg-[#0E141B] text-[#F0F0F0] selection:bg-white/20">


      <Navbar
        page={page}
        navigate={navigate}
        navItems={navItems}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrolled={scrolled}
      />

      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-black"
          >
            <motion.div
              initial={{ opacity: 0.92, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex w-full max-w-xl flex-col items-center px-6 text-center"
            >
              <div className="heading-safe relative flex items-baseline justify-center text-[clamp(1.1rem,3.05vw,2.35rem)] font-semibold tracking-[0.02em]">
                <motion.span
                  className="relative z-10 inline-flex items-baseline"
                  variants={introWordmarkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {renderIntroWordmark()}
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <main className="relative z-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              layout
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
            >
              {/* Home page */}
              {page === "home" && (
                <>
                  <Hero
                    onExplore={() => navigate("work")}
                    onCaseStudy={() => navigate("case-study")}
                  />
                  <FeaturedWork
                    hoveredProject={hoveredProject}
                    setHoveredProject={setHoveredProject}
                    onOpenCaseStudy={() => navigate("case-study")}
                  />
                  <Principles />
                  <ContactSection />
                </>
              )}

              {/* Work page */}
              {page === "work" && (
                <WorkPage onOpenCaseStudy={() => navigate("case-study")} />
              )}
              {/* Case study page */}
              {page === "case-study" && (
                <CaseStudyPage
                  activeSection={activeSection}
                  onJump={scrollToCaseStudySection}
                  caseStudyRefs={caseStudyRefs}
                  scrolled={scrolled}
                />
              )}
              {/* Contact page */}
              {page === "contact" && <ContactPage />}
            </motion.div>
          </AnimatePresence>
        </main>
      )}
  </div>
  );
}
export default App;
