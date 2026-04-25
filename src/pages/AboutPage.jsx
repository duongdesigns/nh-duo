import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CareerTimeline from "../components/about/CareerTimeline";
import SkillsSection from "../components/about/SkillsSection";
import AnimatedHeadline from "../components/layout/AnimatedHeadline";
import SectionEyebrow from "../components/layout/SectionEyebrow";
import useEditorialReveal from "../hooks/useEditorialReveal";
import { aboutContent } from "../data/aboutContent";

function AboutPage({ navigate }) {
  const root = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        return;
      }

      const atmosphere = root.current?.querySelector("[data-page-atmosphere]");
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      if (atmosphere) {
        tl.from(atmosphere, {
          scale: 1.02,
          opacity: 0,
          duration: 1.02,
        });
      }

      tl.from(
        "[data-about-intro]",
        {
          y: 26,
          opacity: 0,
          duration: 0.72,
        },
        "-=0.66"
      );
    },
    { scope: root, dependencies: [prefersReducedMotion] }
  );

  useEditorialReveal(root, {
    steps: [
      {
        target: "[data-about-block]",
        from: { y: 22, opacity: 0, duration: 0.6, stagger: 0.08 },
      },
    ],
  });

  return (
    <section ref={root} className="page-shell page-shell--flush-end">
      <div
        aria-hidden="true"
        data-page-atmosphere
        className="page-atmosphere page-atmosphere--about"
      />

      <div className="content-shell grid gap-0">
        <section
          aria-labelledby="about-hero-title"
          className="pb-28 md:pb-36"
        >
          <header data-about-intro>
            <SectionEyebrow>About Me</SectionEyebrow>
            <AnimatedHeadline
              as="h1"
              id="about-hero-title"
              className="page-title mb-8 max-w-[24ch] xl:mb-7 xl:max-w-[22ch]"
            >
              {aboutContent.hero.headline}
            </AnimatedHeadline>
            <p className="body-safe body-safe--wide text-base leading-[1.8] text-white/60 md:text-lg">
              {aboutContent.hero.tagline}
            </p>
            <p className="body-safe body-safe--wide mt-5 text-base leading-[1.8] text-white/56">
              {aboutContent.hero.summary}
            </p>
            <button
              className="button-pill button-pill--primary cursor-contrast-cta group mt-8 font-medium"
              onClick={() => navigate?.("contact")}
              type="button"
            >
              Start a Conversation
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>

          </header>
        </section>

        <section
          data-about-block
          aria-labelledby="about-story-title"
          className="py-28 md:py-36"
        >
          <div className="grid gap-7">
            <div>
              <div className="text-sm leading-6 text-white/42">Introduction / Story</div>
              <h2
                id="about-story-title"
                className="subsection-title mt-4 max-w-[19ch] text-white md:max-w-[75%]"
              >
                Who I am, what I do, and how the direction developed.
              </h2>
            </div>

            <p className="body-safe body-safe--wide max-w-[66ch] text-base leading-[1.8] text-white/64">
              {aboutContent.introduction.summary}
            </p>

            <ul className="grid gap-3 pt-2 md:grid-cols-3 md:gap-6" aria-label="Introduction highlights">
              {aboutContent.introduction.highlights.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-3"
                >
                  <span className="pt-0.5 text-sm leading-7 text-white/34">0{index + 1}</span>
                  <span className="text-sm leading-7 text-white/72 md:text-[0.96rem]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CareerTimeline items={aboutContent.journey.careerPath} />

        <SkillsSection
          intro={aboutContent.skills.intro}
          skillGroups={aboutContent.skills.groups}
        />
      </div>
    </section>
  );
}

export default AboutPage;
