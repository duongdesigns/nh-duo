import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import SkillsSection from "../components/about/SkillsSection";
import AnimatedHeadline from "../components/layout/AnimatedHeadline";
import SectionEyebrow from "../components/layout/SectionEyebrow";
import useEditorialReveal from "../hooks/useEditorialReveal";
import { aboutContent } from "../data/aboutContent";
import { projectImages } from "../data/imagery";
import { featuredProjects } from "../data/projects";

function AboutPage({ navigate, onOpenCaseStudy }) {
  const root = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const heroImage = projectImages["signal-duo"];

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
      ).from(
        "[data-about-hero-panel]",
        {
          y: 20,
          opacity: 0,
          duration: 0.62,
        },
        "-=0.42"
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
    <section ref={root} className="page-shell">
      <div
        aria-hidden="true"
        data-page-atmosphere
        className="page-atmosphere page-atmosphere--about"
      />

      <div className="content-shell grid gap-14 xl:gap-16">
        <section
          aria-labelledby="about-hero-title"
          className="grid gap-10 xl:grid-cols-[0.88fr_1.12fr] xl:items-start xl:gap-12"
        >
          <header data-about-intro className="max-w-none xl:max-w-[39rem] xl:pt-4">
            <SectionEyebrow>About Me</SectionEyebrow>
            <AnimatedHeadline
              as="h1"
              className="page-title about-hero-title max-w-[14ch] xl:max-w-[13ch]"
            >
              {aboutContent.hero.headline}
            </AnimatedHeadline>
            <p className="body-safe body-safe--wide mt-6 max-w-[34rem] text-base leading-[1.8] text-white/64 md:text-lg">
              {aboutContent.hero.tagline}
            </p>
            <p className="body-safe mt-5 max-w-[32rem] text-base leading-[1.8] text-white/56 md:text-lg">
              {aboutContent.hero.summary}
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3" aria-label="Primary focus areas">
              {aboutContent.hero.tags.slice(0, 3).map((item) => (
                <li
                  key={item}
                  className="type-label text-white/38"
                >
                  {item}
                </li>
              ))}
            </ul>
          </header>

          <div data-about-hero-panel>
            <div className="about-hero-frame group relative isolate overflow-hidden rounded-[2rem] border border-white/10 transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1">
              <img
                src={heroImage?.src}
                alt={heroImage?.alt ?? ""}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: heroImage?.position ?? "50% 50%" }}
                className="editorial-image relative z-[1] h-full min-h-[23rem] w-full object-cover opacity-[0.84] transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.018] md:min-h-[28rem]"
              />
              <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(14,20,27,0.06)_0%,rgba(14,20,27,0.2)_40%,rgba(14,20,27,0.92)_100%)]" />

              <div className="absolute left-5 top-5 z-[3] md:left-6 md:top-6">
                <div className="rounded-full border border-white/12 bg-[#0E141B]/58 px-3 py-2 backdrop-blur-md">
                  <div className="type-label text-white/42">NH / DUO</div>
                </div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-[3] md:bottom-6 md:left-6 md:right-6">
                <div className="type-label text-[rgba(58,175,169,0.82)]">
                  {aboutContent.hero.imageLabel}
                </div>
                <p className="mt-4 max-w-[32rem] text-sm leading-7 text-white/72 md:text-[0.98rem]">
                  {aboutContent.hero.imageNote}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          data-about-block
          aria-labelledby="about-story-title"
          className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5 md:p-6"
        >
          <div className="grid gap-8 xl:grid-cols-[0.5fr_1.5fr] xl:gap-10">
            <div className="max-w-[29rem]">
              <div className="type-label text-white/38">Introduction / Story</div>
              <h2
                id="about-story-title"
                className="section-title mt-4 max-w-[18ch] text-white"
              >
                Who I am, what I do, and how the direction developed.
              </h2>
              <p className="body-safe mt-5 text-base leading-[1.82] text-white/60">
                {aboutContent.journey.intro}
              </p>
            </div>

            <div className="grid gap-5">
              <p className="body-safe body-safe--wide max-w-[66ch] text-base leading-[1.85] text-white/64 md:text-lg">
                {aboutContent.introduction.summary}
              </p>

              <ul className="grid gap-3 md:grid-cols-3" aria-label="Introduction highlights">
                {aboutContent.introduction.highlights.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-[1.25rem] border border-white/8 bg-white/[0.015] p-4"
                  >
                    <span className="type-label pt-0.5 text-white/34">0{index + 1}</span>
                    <span className="text-sm leading-7 text-white/72 md:text-[0.96rem]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="grid gap-4 pt-2 md:grid-cols-3">
                {aboutContent.journey.milestones.map((item) => (
                  <article
                    key={item.title}
                    className="border-t border-white/10 pt-4 md:pt-5"
                  >
                    <div className="type-label text-[rgba(58,175,169,0.78)]">
                      {item.phase}
                    </div>
                    <h3 className="subsection-title mt-4 max-w-[12ch] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-white/66 md:text-[0.96rem]">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SkillsSection
          intro={aboutContent.skills.intro}
          skillGroups={aboutContent.skills.groups}
        />

        <section
          data-about-block
          aria-labelledby="about-values-title"
          className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5 md:p-6"
        >
          <div className="grid gap-8 xl:grid-cols-[1.06fr_0.94fr] xl:gap-10">
            <div>
              <div className="type-label text-white/38">Values / Approach</div>
              <h2
                id="about-values-title"
                className="section-title mt-4 max-w-[18ch] text-white"
              >
                The mindset behind the work.
              </h2>

              <div className="mt-8 divide-y divide-white/10">
                {aboutContent.values.items.map((item, index) => (
                  <article
                    key={item.title}
                    className={`grid gap-3 py-5 md:grid-cols-[auto_1fr] md:gap-6 ${
                      index === 0 ? "pt-0" : ""
                    }`}
                  >
                    <div className="type-label text-[rgba(58,175,169,0.76)]">
                      {item.title}
                    </div>
                    <p className="text-sm leading-7 text-white/66 md:text-[0.96rem]">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <aside
              aria-labelledby="about-personal-title"
              className="rounded-[1.7rem] border border-white/10 bg-white/[0.02] p-5 md:p-6"
            >
              <div className="type-label text-white/38">Personal Touch</div>
              <h2
                id="about-personal-title"
                className="section-title mt-4 max-w-[16ch] text-white"
              >
                A small note on what informs the work.
              </h2>
              <p className="mt-5 text-sm leading-8 text-white/66 md:text-[0.98rem]">
                {aboutContent.personal.text}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Personal traits">
                {aboutContent.personal.traits.map((trait) => (
                  <li
                    key={trait}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.76rem] leading-5 text-white/68"
                  >
                    {trait}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section
          data-about-block
          aria-labelledby="about-proof-title"
          className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 md:p-6"
        >
          <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:gap-10">
            <div>
              <div className="type-label text-white/38">Proof / Credibility</div>
              <h2
                id="about-proof-title"
                className="section-title mt-4 max-w-[18ch] text-white"
              >
                Selected work that supports the positioning.
              </h2>
              <p className="body-safe mt-5 text-base leading-[1.82] text-white/60">
                {aboutContent.proof.intro}
              </p>

              <div className="mt-8 overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))]">
                {featuredProjects.map((project, index) => (
                  <article
                    key={project.id}
                    className={`grid gap-5 px-4 py-5 md:grid-cols-[0.3fr_0.95fr_auto] md:items-start md:px-5 ${
                      index > 0 ? "border-t border-white/10" : ""
                    }`}
                  >
                    <div className="type-label text-white/34">{project.year}</div>
                    <div className="min-w-0">
                      <h3 className="text-[1.15rem] font-medium tracking-[-0.04em] text-white">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/54">
                        {project.category}
                      </p>
                      <p className="mt-4 max-w-[40ch] text-sm leading-7 text-white/66 md:text-[0.96rem]">
                        {project.summary}
                      </p>
                    </div>
                    <div className="md:justify-self-end">
                      <button
                        className="button-pill button-pill--secondary button-pill--compact group"
                        onClick={() => onOpenCaseStudy?.(project.id)}
                        type="button"
                      >
                        Open Case Study
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside
              aria-labelledby="about-cta-title"
              className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5 md:p-6"
            >
              <div className="type-label text-white/38">Call to Action</div>
              <h2
                id="about-cta-title"
                className="section-title mt-4 max-w-[18ch] text-white"
              >
                {aboutContent.cta.title}
              </h2>
              <p className="body-safe mt-5 text-base leading-[1.82] text-white/60">
                {aboutContent.cta.text}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  className="button-pill button-pill--primary group"
                  onClick={() => navigate?.("contact")}
                  type="button"
                >
                  {aboutContent.cta.primaryLabel}
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
                <button
                  className="button-pill button-pill--secondary"
                  onClick={() => navigate?.("work")}
                  type="button"
                >
                  {aboutContent.cta.secondaryLabel}
                </button>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </section>
  );
}

export default AboutPage;
