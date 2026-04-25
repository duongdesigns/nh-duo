import { useRef } from "react";

import SectionEyebrow from "../layout/SectionEyebrow";

function Principles() {
  const root = useRef(null);
  const items = [
    {
      title: "Muted Presence",
      text: "Dark surfaces carry the atmosphere, while accent color is reserved for orientation and decisive actions.",
    },
    {
      title: "Navigation With Memory",
      text: "The top nav stays calm at first, then compacts once the page has enough scroll context.",
    },
    {
      title: "Case Studies First",
      text: "Project pages keep a classic structure, but the pacing stays visual, scannable, and editorial.",
    },
    {
      title: "Motion With Restraint",
      text: "Transitions clarify sequence through fade, translate, and stagger without competing for attention.",
    },
    {
      title: "Direct Contact",
      text: "The form asks only for essentials and keeps the path from interest to action deliberately short.",
    },
    {
      title: "Fluid System",
      text: "Spacing, type, and layout scale through reusable rules instead of one-off breakpoint fixes.",
    },
  ];

  return (
    <section
      ref={root}
      className="home-shell bg-[#0B1117] py-28 shadow-[0_0_0_100vmax_#0B1117] [clip-path:inset(0_-100vmax)] md:py-36"
    >
      <div className="content-shell grid gap-12 xl:grid-cols-[0.72fr_1.28fr] xl:gap-16">
        <div className="max-w-none xl:max-w-[58ch]">
          <SectionEyebrow>System Principles</SectionEyebrow>
          <h2 className="subsection-title max-w-[19ch] text-white">
            The rules that keep the system calm, direct, and extendable.
          </h2>
          <p className="body-safe body-safe--wide mt-5 text-base leading-[1.8] text-white/60">
            The site is built around a few repeatable decisions: restrained surfaces,
            clear hierarchy, and motion that supports reading instead of decorating it.
          </p>
        </div>

        <ol className="grid gap-x-8 gap-y-7 md:grid-cols-2" aria-label="System principles">
          {items.map((item, index) => (
            <li key={item.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
              <span className="pt-0.5 text-sm leading-7 text-white/34">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base font-medium leading-7 text-[rgba(58,175,169,0.78)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/66 md:text-[0.96rem]">
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Principles;
