import { useRef } from "react";

import SectionEyebrow from "../layout/SectionEyebrow";

function Principles() {
  const root = useRef(null);
  const items = [
    {
      title: "Ruhige Präsenz",
      text: "Platzhalter für dunkle Flächen, gedämpfte Kontraste und sparsame Akzente.",
    },
    {
      title: "Kompakte Navigation",
      text: "Platzhalter für eine Navigation, die beim Scrollen ruhiger und dichter wird.",
    },
    {
      title: "Fallstudien zuerst",
      text: "Platzhalter für Projektseiten mit klarer Struktur und editorialem Lesefluss.",
    },
    {
      title: "Zurückhaltende Bewegung",
      text: "Platzhalter für dezente Übergänge, die Reihenfolge und Orientierung unterstützen.",
    },
    {
      title: "Direkter Kontakt",
      text: "Platzhalter für ein kurzes Formular mit klarer Handlung und wenigen Feldern.",
    },
    {
      title: "Fluides System",
      text: "Platzhalter für skalierbare Abstände, Typografie und Layoutregeln.",
    },
  ];

  return (
    <section
      ref={root}
      className="home-shell bg-[#050506] py-28 shadow-[0_0_0_100vmax_#050506] [clip-path:inset(0_-100vmax)] md:py-36"
    >
      <div className="content-shell grid gap-12 xl:grid-cols-[0.72fr_1.28fr] xl:gap-16">
        <div className="max-w-none xl:max-w-[58ch]">
          <SectionEyebrow>Systemprinzipien</SectionEyebrow>
          <h2 className="subsection-title max-w-[19ch] text-white">
            Platzhalter für Regeln, die das System ruhig, direkt und erweiterbar halten.
          </h2>
          <p className="body-safe body-safe--wide mt-5 text-base leading-[1.8] text-white/60">
            Dieser Abschnitt beschreibt später wiederholbare Gestaltungsentscheidungen,
            klare Hierarchie und Bewegung, die das Lesen unterstützt.
          </p>
        </div>

        <ol className="grid gap-x-8 gap-y-7 md:grid-cols-2" aria-label="Systemprinzipien">
          {items.map((item, index) => (
            <li key={item.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
              <span className="pt-0.5 text-sm leading-7 text-white/34">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base font-medium leading-7 text-[rgba(214,161,31,0.78)]">
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
