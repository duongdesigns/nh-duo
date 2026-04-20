import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { featuredProjects } from "./data/projects";
import { caseStudySections } from "./data/caseStudySections";
import ContactSection from "./components/home/ContactSection";
import CredibilityStrip from "./components/home/CredibilityStrip";
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
  const [introExitComplete, setIntroExitComplete] = useState(false);
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [introPortraitSplit, setIntroPortraitSplit] = useState(false);
  const [activeSection, setActiveSection] = useState(caseStudySections[0]);
  const [hoveredProject, setHoveredProject] = useState(featuredProjects[0].id);
  const caseStudyRefs = useRef({});

  const introDelayChildren = 0.18;
  const introStagger = 0.1;
  const introMaskDelay = 0.66;
  const introMaskDuration = 1.18;
  const introOutroBuffer = 0.18;
  const introDurationSeconds =
    introMaskDelay + introMaskDuration + introOutroBuffer;
  const introEase = [0.77, 0, 0.175, 1];

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
    if (showIntro) {
      setIntroExitComplete(false);
    }
  }, [showIntro]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateIntroSplit = () => {
      setIntroPortraitSplit(window.innerHeight > window.innerWidth);
    };

    updateIntroSplit();
    window.addEventListener("resize", updateIntroSplit);

    return () => {
      window.removeEventListener("resize", updateIntroSplit);
    };
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
    { key: "n", value: "N" },
    { key: "h", value: "H" },
    {
      key: "slash",
      value: "/",
      className:
        "mx-[0.72em] inline-flex items-center self-center overflow-hidden text-[0.72em] leading-none",
      style: { transform: "translateY(-0.02em)" },
      visible: {
        opacity: 0.9,
        color: "rgba(255, 255, 255, 0.82)",
      },
    },
    { key: "d", value: "D" },
    { key: "u", value: "U" },
    { key: "o", value: "O" },
  ];

  const introWordmarkVariants = {
    initial: {},
    animate: {
      transition: {
        delayChildren: introDelayChildren,
        staggerChildren: introStagger,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.32, 0, 0.67, 0],
      },
    },
  };

  const introCharacterVariants = {
    initial: {
      opacity: 0,
      color: "rgba(240, 243, 243, 0.22)",
      y: "1.35rem",
    },
    animate: {
      opacity: 1,
      color: "rgba(255, 255, 255, 0.96)",
      y: "0rem",
      transition: {
        duration: 0.82,
        ease: introEase,
      },
    },
  };

  const introOverlayVariants = {
    initial: {
      opacity: 1,
    },
    exit: {
      opacity: 1,
      transition: {
        duration: introMaskDelay + introMaskDuration,
        ease: "linear",
      },
    },
  };

  const introPanelTransition = {
    duration: introMaskDuration,
    delay: introMaskDelay,
    ease: introEase,
  };

  const introTopOrLeftPanelExit = introPortraitSplit
    ? { y: "-100%" }
    : { x: "-100%" };
  const introBottomOrRightPanelExit = introPortraitSplit
    ? { y: "100%" }
    : { x: "100%" };

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
      {introCharacters.map((character) => (
        <motion.span
          key={character.key}
          variants={introCharacterVariants}
          className={character.className ?? "inline-block overflow-hidden"}
          style={character.style}
          animate={character.visible ? { ...introCharacterVariants.animate, ...character.visible } : undefined}
        >
          {character.value}
        </motion.span>
      ))}
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

      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          setIntroExitComplete(true);
        }}
      >
        {showIntro && (
          <motion.div
            initial="initial"
            animate="initial"
            exit="exit"
            variants={introOverlayVariants}
            className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden"
          >
            <motion.div
              aria-hidden="true"
              initial={{ x: 0, y: 0 }}
              exit={introTopOrLeftPanelExit}
              transition={introPanelTransition}
              className={
                introPortraitSplit
                  ? "absolute inset-x-0 top-0 h-1/2 bg-black"
                  : "absolute inset-y-0 left-0 w-1/2 bg-black"
              }
            />
            <motion.div
              aria-hidden="true"
              initial={{ x: 0, y: 0 }}
              exit={introBottomOrRightPanelExit}
              transition={introPanelTransition}
              className={
                introPortraitSplit
                  ? "absolute inset-x-0 bottom-0 h-1/2 bg-black"
                  : "absolute inset-y-0 right-0 w-1/2 bg-black"
              }
            />
            <motion.div
              variants={introWordmarkVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative z-10 flex w-full max-w-xl flex-col items-center px-6 text-center"
            >
              <div className="heading-safe relative flex items-baseline justify-center text-[clamp(1.1rem,3.05vw,2.35rem)] font-semibold tracking-[0.02em]">
                <motion.span className="relative z-10 inline-flex items-baseline">
                  {renderIntroWordmark()}
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && introExitComplete && (
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
                <CredibilityStrip />
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
