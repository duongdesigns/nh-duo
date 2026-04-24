import { useRef } from "react";

import useEditorialReveal from "../../hooks/useEditorialReveal";

function SiteFooter({
  caseStudyProjects,
  navigate,
  onOpenCaseStudy,
  page,
}) {
  const root = useRef(null);
  const year = new Date().getFullYear();

  useEditorialReveal(root, {
    once: true,
    steps: [
      {
        target: "[data-footer-group]",
        from: { y: 18, opacity: 0, duration: 0.58, stagger: 0.08 },
      },
      {
        target: "[data-footer-meta]",
        from: { y: 14, opacity: 0, duration: 0.46 },
        position: "-=0.18",
      },
    ],
  });

  return (
    <footer ref={root} className="home-shell pb-10 pt-10 md:pb-14 md:pt-12">
      <div className="content-shell rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-6 shadow-[0_20px_56px_rgba(0,0,0,0.12)] md:p-8">
        <div className="grid gap-10 xl:grid-cols-[1.1fr_0.7fr_0.85fr_0.85fr] xl:gap-12">
          <div data-footer-group>
            <div className="type-eyebrow text-white/48">NH / DUO</div>
            <p className="body-safe mt-5 text-base leading-[1.82] text-white/62">
              Brand-led digital work shaped through editorial pacing, restrained motion, and systems that stay clear as the portfolio grows.
            </p>
          </div>

          <div data-footer-group>
            <div className="type-label text-white/36">Navigation</div>
            <div className="mt-5 flex flex-col items-start gap-3">
              {[
                ["Home", "home"],
                ["Work", "work"],
                ["About", "about"],
                ["Contact", "contact"],
              ].map(([label, value]) => (
                <button
                  key={value}
                  aria-current={page === value ? "page" : undefined}
                  className="text-sm text-white/68 transition hover:text-white"
                  onClick={() => navigate(value)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div data-footer-group>
            <div className="type-label text-white/36">Case Studies</div>
            <div className="mt-5 flex flex-col items-start gap-3">
              {caseStudyProjects.map((project) => (
                <button
                  key={project.id}
                  className="text-sm text-white/68 transition hover:text-white"
                  onClick={() => onOpenCaseStudy(project.id)}
                  type="button"
                >
                  {project.title}
                </button>
              ))}
            </div>
          </div>

          <div data-footer-group>
            <div className="type-label text-white/36">Contact</div>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/68">
              <a className="transition hover:text-white" href="mailto:hello@nhduo.studio">
                hello@nhduo.studio
              </a>
              <p className="leading-7 text-white/54">
                Open to identity systems, portfolio direction, and digital experiences shaped with clarity.
              </p>
            </div>
          </div>
        </div>

        <div
          data-footer-meta
          className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 text-sm text-white/40 md:flex-row md:items-center md:justify-between"
        >
          <div>{year} NH / DUO</div>
          <div>Editorial layouts. Restrained motion. Brand-led web presentation.</div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
