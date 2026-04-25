import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { caseStudyProjects } from "./data/caseStudyProjects";
import { caseStudySections } from "./data/caseStudySections";
import ContactSection from "./components/home/ContactSection";
import CredibilityStrip from "./components/home/CredibilityStrip";
import FeaturedWork from "./components/home/FeaturedWork";
import Hero from "./components/home/Hero";
import Principles from "./components/home/Principles";
import BackgroundMotion from "./components/layout/BackgroundMotion";
import Navbar from "./components/layout/Navbar";
import SiteFooter from "./components/layout/SiteFooter";

const routeLoaders = {
  about: () => import("./pages/AboutPage"),
  work: () => import("./pages/WorkPage"),
  "case-study": () => import("./pages/CaseStudyPage"),
  contact: () => import("./pages/ContactPage"),
  datenschutz: () => import("./pages/LegalPage"),
  impressum: () => import("./pages/LegalPage"),
};

const defaultCaseStudyId = caseStudyProjects[0]?.id ?? "";

const getScrollBehavior = () => (
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth"
);

const isValidCaseStudyId = (projectId) => (
  caseStudyProjects.some((project) => project.id === projectId)
);

const getRouteStateFromHash = (hash) => {
  const cleanedHash = hash.replace(/^#/, "");

  if (!cleanedHash) {
    return {
      page: "home",
      caseStudyId: defaultCaseStudyId,
    };
  }

  const [pageSegment, subSegment] = cleanedHash.split("/");

  if (pageSegment === "case-study") {
    return {
      page: "case-study",
      caseStudyId: isValidCaseStudyId(subSegment)
        ? subSegment
        : defaultCaseStudyId,
    };
  }

  if (pageSegment === "home" || pageSegment in routeLoaders) {
    return {
      page: pageSegment,
      caseStudyId: defaultCaseStudyId,
    };
  }

  return {
    page: "home",
    caseStudyId: defaultCaseStudyId,
  };
};

const getRouteUrl = (page, caseStudyId) => {
  const baseUrl = `${window.location.pathname}${window.location.search}`;

  if (page === "home") {
    return baseUrl;
  }

  if (page === "case-study") {
    return `${baseUrl}#case-study/${caseStudyId || defaultCaseStudyId}`;
  }

  return `${baseUrl}#${page}`;
};

const getPageTitle = (page, caseStudyId) => {
  if (page === "case-study") {
    const activeProject = caseStudyProjects.find((project) => project.id === caseStudyId);
    return activeProject
      ? `NH / DUO - ${activeProject.title}`
      : "NH / DUO - Case Study";
  }

  const titles = {
    home: "NH / DUO",
    work: "NH / DUO - Work",
    about: "NH / DUO - About",
    contact: "NH / DUO - Contact",
    datenschutz: "NH / DUO - Datenschutz",
    impressum: "NH / DUO - Impressum",
  };

  return titles[page] ?? titles.home;
};

function App() {
  const initialRoute = typeof window === "undefined"
    ? { page: "home", caseStudyId: defaultCaseStudyId }
    : getRouteStateFromHash(window.location.hash);

  const [showIntro, setShowIntro] = useState(true);
  const [introExitComplete, setIntroExitComplete] = useState(false);
  const [page, setPage] = useState(initialRoute.page);
  const [activeCaseStudyId, setActiveCaseStudyId] = useState(initialRoute.caseStudyId);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(caseStudySections[0]);
  const [hoveredProject, setHoveredProject] = useState(caseStudyProjects[0]?.id ?? "");
  const caseStudyRefs = useRef({});
  const loadedRouteComponentsRef = useRef({});
  const routePromisesRef = useRef({});
  const [routeComponents, setRouteComponents] = useState({
    about: null,
    work: null,
    "case-study": null,
    contact: null,
    datenschutz: null,
    impressum: null,
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

  const openPage = useCallback((value, { caseStudyId } = {}) => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: getScrollBehavior() });

    const nextCaseStudyId = value === "case-study"
      ? (isValidCaseStudyId(caseStudyId) ? caseStudyId : activeCaseStudyId || defaultCaseStudyId)
      : activeCaseStudyId;
    const nextUrl = getRouteUrl(value, nextCaseStudyId);
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const navigateToPage = value === "home"
      ? Promise.resolve()
      : preloadPage(value);

    navigateToPage.then(() => {
      if (value === "case-study") {
        setActiveCaseStudyId(nextCaseStudyId);
        setActiveSection(caseStudySections[0]);
      }

      setPage(value);

      if (currentUrl !== nextUrl) {
        window.history.pushState(
          { page: value, caseStudyId: nextCaseStudyId },
          "",
          nextUrl
        );
      }
    });
  }, [activeCaseStudyId, preloadPage]);

  const openCaseStudy = useCallback((projectId) => {
    openPage("case-study", { caseStudyId: projectId });
  }, [openPage]);

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
    let frameId = 0;

    const updateScrolled = () => {
      frameId = 0;
      const nextScrolled = window.scrollY > 48;
      setScrolled((current) => (
        current === nextScrolled ? current : nextScrolled
      ));
    };

    const onScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateScrolled);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let handleLoad;

    const minIntroTime = new Promise((resolve) => {
      window.setTimeout(resolve, introDurationSeconds * 1000);
    });

    const pageLoaded = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
        return;
      }

      handleLoad = () => {
        window.removeEventListener("load", handleLoad);
        resolve();
      };

      window.addEventListener("load", handleLoad);
    });

    const assetsReadyFallback = new Promise((resolve) => {
      window.setTimeout(resolve, 4200);
    });
    const fontsReady = document.fonts?.ready ?? Promise.resolve();

    Promise.all([
      minIntroTime,
      Promise.race([pageLoaded, assetsReadyFallback]),
      Promise.race([fontsReady, assetsReadyFallback]),
    ]).then(() => {
      if (!cancelled) {
        requestAnimationFrame(() => {
          setShowIntro(false);
        });
      }
    });

    return () => {
      cancelled = true;
      if (handleLoad) {
        window.removeEventListener("load", handleLoad);
      }
    };
  }, [introDurationSeconds]);

  useEffect(() => {
    if (page === "home") {
      return;
    }

    preloadPage(page);
  }, [page, preloadPage]);

  useEffect(() => {
    document.title = getPageTitle(page, activeCaseStudyId);
  }, [activeCaseStudyId, page]);

  useEffect(() => {
    const handleLocationChange = () => {
      const nextRoute = getRouteStateFromHash(window.location.hash);
      const navigateToPage = nextRoute.page === "home"
        ? Promise.resolve()
        : preloadPage(nextRoute.page);

      navigateToPage.then(() => {
        setMenuOpen(false);
        setPage(nextRoute.page);
        setActiveCaseStudyId(nextRoute.caseStudyId);
        setActiveSection(caseStudySections[0]);
        window.scrollTo({ top: 0, behavior: "auto" });
      });
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, [preloadPage]);

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
  }, [activeCaseStudyId, page]);

  useEffect(() => {
    if (showIntro || !introExitComplete) return undefined;

    const preloadRoutes = () => {
      preloadPage("about");
      preloadPage("work");
      preloadPage("case-study");
      preloadPage("contact");
      preloadPage("datenschutz");
      preloadPage("impressum");
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
    { label: "About", value: "about" },
    { label: "Case Study", value: "case-study" },
    { label: "Contact", value: "contact" },
  ];

  const scrollToCaseStudySection = (name) => {
    const node = caseStudyRefs.current[name];
    if (!node) return;

    const yOffset = 140;
    const targetTop = node.getBoundingClientRect().top + window.scrollY - yOffset;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: getScrollBehavior(),
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

  const AboutPage = routeComponents.about;
  const WorkPage = routeComponents.work;
  const CaseStudyPage = routeComponents["case-study"];
  const ContactPage = routeComponents.contact;
  const DatenschutzPage = routeComponents.datenschutz;
  const ImpressumPage = routeComponents.impressum;

  return (
    <div className="relative min-h-screen bg-[#0E141B] text-[#F0F0F0] selection:bg-white/20">
      {!showIntro && introExitComplete && (
        <BackgroundMotion
          colors={{
            line: "240 240 240",
            accent: "58 175 169",
            signal: "245 180 38",
          }}
          intensity={0.78}
        />
      )}

      {!showIntro && (
        <Navbar
          activeCaseStudyId={activeCaseStudyId}
          caseStudyProjects={caseStudyProjects}
          onOpenCaseStudy={openCaseStudy}
          page={page}
          navigate={openPage}
          navItems={navItems}
          menuOpen={menuOpen}
          preloadPage={preloadPage}
          scrolled={scrolled}
          setMenuOpen={setMenuOpen}
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
        <>
          <main className="relative z-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={page === "case-study" ? `${page}-${activeCaseStudyId}` : page}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
              >
                {page === "home" && (
                  <>
                    <Hero
                      onExplore={() => openPage("work")}
                      onCaseStudy={() => openCaseStudy(defaultCaseStudyId)}
                    />
                    <FeaturedWork
                      hoveredProject={hoveredProject}
                      onOpenCaseStudy={openCaseStudy}
                      setHoveredProject={setHoveredProject}
                    />
                    <CredibilityStrip />
                    <Principles />
                    <ContactSection />
                  </>
                )}

                {page === "work" && (
                  WorkPage ? (
                    <WorkPage
                      navigate={openPage}
                      onOpenCaseStudy={openCaseStudy}
                    />
                  ) : null
                )}

                {page === "about" && (
                  AboutPage ? (
                    <AboutPage
                      navigate={openPage}
                    />
                  ) : null
                )}

                {page === "case-study" && (
                  CaseStudyPage ? (
                    <CaseStudyPage
                      activeSection={activeSection}
                      caseStudyId={activeCaseStudyId}
                      caseStudyRefs={caseStudyRefs}
                      navigate={openPage}
                      onJump={scrollToCaseStudySection}
                    />
                  ) : null
                )}

                {page === "contact" && (ContactPage ? <ContactPage /> : null)}
                {page === "impressum" && (
                  ImpressumPage ? <ImpressumPage type="impressum" /> : null
                )}
                {page === "datenschutz" && (
                  DatenschutzPage ? <DatenschutzPage type="datenschutz" /> : null
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          <SiteFooter
            caseStudyProjects={caseStudyProjects}
            navigate={openPage}
            onOpenCaseStudy={openCaseStudy}
            page={page}
          />
        </>
      )}
    </div>
  );
}

export default App;
