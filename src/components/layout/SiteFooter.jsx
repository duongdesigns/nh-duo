import { useRef } from "react";

import useEditorialReveal from "../../hooks/useEditorialReveal";

function SiteFooter({ navigate, page }) {
  const root = useRef(null);
  const year = new Date().getFullYear();
  const footerLinkClass =
    "group relative w-fit text-sm leading-6 text-white/62 transition-colors duration-200 hover:text-white focus-visible:text-white";
  const footerUnderline = (
    <span
      aria-hidden="true"
      className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[rgba(214,161,31,0.86)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
    />
  );

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
    <footer
      ref={root}
      className="home-shell relative z-10 bg-[#050506] py-20 shadow-[0_0_0_100vmax_#050506] [clip-path:inset(0_-100vmax)] md:py-24"
    >
      <div className="content-shell">
        <div className="grid gap-10">
          <div data-footer-group>
            <div className="text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-none tracking-[0.02em] text-white">
              NH <span className="text-white/38">/</span> DUO
            </div>
          </div>

          <div
            data-footer-group
            className="grid gap-8 pt-2 md:grid-cols-[minmax(0,1.25fr)_minmax(11rem,0.5fr)_minmax(8rem,0.32fr)] md:items-start md:gap-10 xl:gap-14"
          >
            <p className="body-safe body-safe--wide max-w-[48ch] text-base leading-[1.8] text-white/58">
              Platzhalter für einen markengeführten digitalen Auftritt mit editorialem
              Pacing, zurückhaltender Bewegung und klarer Frontend-Struktur.
            </p>

            <div>
              <div className="text-sm font-medium leading-6 text-white/46">Kontakt</div>
              <div className="mt-4 grid gap-2 text-sm leading-6 text-white/62">
                <a className={footerLinkClass} href="mailto:hello@nhduo.studio">
                  hello@nhduo.studio
                  {footerUnderline}
                </a>
                <span>
                  Musterstrasse 12
                  <br />
                  12345 Musterstadt
                </span>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium leading-6 text-white/46">Navigation</div>
              <nav className="mt-4" aria-label="Footer-Navigation">
                <div className="grid gap-2">
                  {[
                    ["Arbeiten", "work"],
                    ["Über mich", "about"],
                    ["Kontakt", "contact"],
                  ].map(([label, value]) => (
                    <button
                      key={value}
                      aria-current={page === value ? "page" : undefined}
                      className={footerLinkClass}
                      onClick={() => navigate(value)}
                      type="button"
                    >
                      {label}
                      {footerUnderline}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>

        <div
          data-footer-meta
          className="mt-12 flex flex-col gap-4 text-sm text-white/36 md:mt-16 md:flex-row md:items-center md:justify-between"
        >
          <div>© {year} NH / DUO · Alle Rechte vorbehalten.</div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <button
              className={footerLinkClass}
              onClick={() => navigate("impressum")}
              type="button"
            >
              Impressum
              {footerUnderline}
            </button>
            <button
              className={footerLinkClass}
              onClick={() => navigate("datenschutz")}
              type="button"
            >
              Datenschutz
              {footerUnderline}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
