import React from "react";

import HorizontalScrollRow from "../layout/HorizontalScrollRow";
import SectionEyebrow from "../layout/SectionEyebrow";

function Principles({ lang }) {
  const items = lang === "de"
    ? [
        "Gedimmte dunkle Palette mit bewusst eingesetzter Akzentfarbe",
        "Top-Navigation, die sich nach dem ersten Scrollen transformiert",
        "Visuell geführte Fallstudien mit klassischer Struktur",
        "Dosierte Bewegung mit gelegentlichen cineastischen Akzenten",
        "Einfacher Kontaktfluss mit klarer Call-to-Action",
        "Container Queries, fluide Typografie und tokenbasierte Gestaltung",
      ]
    : [
        "Muted dark palette with reserved accent usage",
        "Top navigation that transforms after first scroll",
        "Visual-first case studies with classic structure",
        "Moderate motion with occasional cinematic flourishes",
        "Simple contact flow with prominent action-led CTA",
        "Container queries, fluid type, and token-based styling",
      ];

  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
        <SectionEyebrow>{lang === "de" ? "Systemprinzipien" : "System Principles"}</SectionEyebrow>
        <HorizontalScrollRow
          className="mt-6 md:overflow-visible"
          rowClassName="md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3"
          gap="gap-4"
          itemClassName="w-[18rem] md:w-auto md:flex-shrink"
        >
          {items.map((item, index) => (
            <div key={item} className="rounded-[1.5rem] border border-white/10 bg-[#3B3B3B] p-5">
              <div className="font-mono-accent text-xs uppercase tracking-[0.24em] text-white/35">
                0{index + 1}
              </div>
              <div className="mt-4 text-lg leading-8 text-white/84">{item}</div>
            </div>
          ))}
        </HorizontalScrollRow>
      </div>
    </section>
  );
}

export default Principles;
