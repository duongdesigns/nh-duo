import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { featuredProjects } from "./data/projects";
import { caseStudySections } from "./data/caseStudySections";
import ContactSection from "./components/home/ContactSection";
import CredibilityStrip from "./components/home/CredibilityStrip";
import FeaturedWork from "./components/home/FeaturedWork";
import Hero from "./components/home/Hero";
import Principles from "./components/home/Principles";
import Navbar from "./components/layout/Navbar";

const routeLoaders = {
  work: () => import("./pages/WorkPage"),
  "case-study": () => import("./pages/CaseStudyPage"),
  contact: () => import("./pages/ContactPage"),
};

// App shell
function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introExitComplete, setIntroExitComplete] = useState(false);
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(caseStudySections[0]);
  const [hoveredProject, setHoveredProject] = useState(featuredProjects[0].id);
  const caseStudyRefs = useRef({});
  const loadedRouteComponentsRef = useRef({});
  const routePromisesRef = useRef({});
  const [routeComponents, setRouteComponents] = useState({
    work: null,
    "case-study": null,
    contact: null,
  });

  const introDelayChildren = 0.18;
  const introStagger = 0.1;
  const introFadeDelay = 0.9;
  const introFadeDuration = 0.72;
  const introOutroBuffer = 0.18;
  const introDurationSeconds =
    introFadeDelay + introFadeDuration + introOutroBuffer;
  const introEase = [0.77, 0, 0.175, 1];

  const preloadPage = useCallback((value) => {
    const loader = routeLoaders[value];

    if (!loader) {
      return Promise.resolve(null);
    }

    if (loadedRouteComponentsRef.current[value]) {
      return Promise.resolve(loadedRouteComponentsRef.current[value]);
    }

    if (!routePromisesRef.current[value]) {
      routePromisesRef.current[value] = loader().then((module) => {
        loadedRouteComponentsRef.current[value] = module.default;
        setRouteComponents((current) => (
          current[value]
            ? current
            : { ...current, [value]: module.default }
        ));
        return module.default;
      });
    }

    return routePromisesRef.current[value];
  }, []);

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
      window.setTimeout(resolve, introDurationSeconds * 1000);
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

  useEffect(() => {
    if (showIntro || !introExitComplete) return undefined;

    const preloadRoutes = () => {
      preloadPage("work");
      preloadPage("case-study");
      preloadPage("contact");
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(preloadRoutes, { timeout: 1400 });

      return () => {
        window.cancelIdleCallback(idleId);
      };
    }

    const timeoutId = window.setTimeout(preloadRoutes, 900);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [introExitComplete, preloadPage, showIntro]);

  const navItems = [
    { label: "Home", value: "home" },
    { label: "Work", value: "work" },
    { label: "Case Study", value: "case-study" },
    { label: "Contact", value: "contact" },
  ];

  const openPage = (value) => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (value === "home") {
      setPage(value);
      return;
    }

    preloadPage(value).then(() => {
      setPage(value);
    });
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
      opacity: 0,
      transition: {
        delay: introFadeDelay,
        duration: introFadeDuration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
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
  const WorkPage = routeComponents.work;
  const CaseStudyPage = routeComponents["case-study"];
  const ContactPage = routeComponents.contact;

  return (
    <div className="min-h-screen bg-[#0E141B] text-[#F0F0F0] selection:bg-white/20">
      {!showIntro && (
        <Navbar
          page={page}
          navigate={openPage}
          navItems={navItems}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          scrolled={scrolled}
          preloadPage={preloadPage}
        />
      )}

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
            className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-black"
          >
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
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
            >
              {/* Home page */}
              {page === "home" && (
                <>
                <Hero
                  onExplore={() => openPage("work")}
                  onCaseStudy={() => openPage("case-study")}
                />
                <FeaturedWork
                  hoveredProject={hoveredProject}
                  setHoveredProject={setHoveredProject}
                  onOpenCaseStudy={() => openPage("case-study")}
                />
                <CredibilityStrip />
                <Principles />
                <ContactSection />
              </>
              )}

              {/* Work page */}
              {page === "work" && (
                WorkPage ? <WorkPage onOpenCaseStudy={() => openPage("case-study")} /> : null
              )}
              {/* Case study page */}
              {page === "case-study" && (
                CaseStudyPage ? (
                  <CaseStudyPage
                    activeSection={activeSection}
                    onJump={scrollToCaseStudySection}
                    caseStudyRefs={caseStudyRefs}
                  />
                ) : null
              )}
              {/* Contact page */}
              {page === "contact" && (ContactPage ? <ContactPage /> : null)}
            </motion.div>
          </AnimatePresence>
        </main>
      )}
    </div>
  );
}
export default App;
