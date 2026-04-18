import React, { useRef } from "react";
import AnimatedHeadline from "../layout/AnimatedHeadline";
import { caseStudyImages } from "../../data/imagery";
import useEditorialReveal from "../../hooks/useEditorialReveal";

function CaseStudyBlock({ lang, title, index, setRef }) {
  const root = useRef(null);
  const renderImage = (image, className) => (
    <div key={image.src} className={`relative overflow-hidden rounded-[1.5rem] border border-white/10 ${className}`}>
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: image.position ?? "50% 50%" }}
        className="editorial-image h-full w-full object-cover"
      />
    </div>
  );

  const content = {
    Hero: {
      kicker: lang === "de" ? "Fallstudien-Hero" : "Case Study Hero",
      heading:
        lang === "de"
          ? "Atlas Case – eine visuell geführte Portfolio-Erzählung für Branding und digitale Arbeiten."
          : "Atlas Case — a visual-first portfolio narrative for branding and digital work.",
      text:
        lang === "de"
          ? "Führe mit den stärksten finalen Ansichten. Halte die Einleitung kompakt. Die Seite sollte sofort Ton, Qualität und Relevanz vermitteln."
          : "Lead with the strongest final frames. Keep the introduction concise. Let the page immediately communicate tone, polish, and relevance.",
      layout: "hero",
    },
    Overview: {
      kicker: lang === "de" ? "Projektüberblick" : "Project Overview",
      heading:
        lang === "de"
          ? "Definiere Produkt, Rolle, Zeitrahmen, Tools und die konkrete Herausforderung."
          : "Define the product, your role, timeline, tools, and the exact challenge being solved.",
      text:
        lang === "de"
          ? "Dieser Abschnitt sollte gut scannbar bleiben: Rolle, Zusammenarbeit, Deliverables, Zeitplan und ein klar formuliertes Problem."
          : "This section should stay scannable: role, collaborators, deliverables, timeline, and one focused problem statement.",
      layout: "overview",
    },
    Discovery: {
      kicker: lang === "de" ? "Exploration / Recherche" : "Exploration / Discovery",
      heading:
        lang === "de"
          ? "Zeige Recherche, Referenzen, Skizzen, Stimmung und was die visuelle Richtung geprägt hat."
          : "Show research, references, sketches, mood, and what shaped the visual direction.",
      text:
        lang === "de"
          ? "Beantworte drei Fragen: Warum hast du das getan, was hast du gelernt und wie hat das den nächsten Designschritt beeinflusst?"
          : "Answer three questions: why did you do it, what did you learn, and how did that shape the next design move.",
      layout: "media",
    },
    Process: {
      kicker: lang === "de" ? "Designprozess" : "Design Process",
      heading:
        lang === "de"
          ? "Gehe von groben Gedanken über zu Flows, Struktur, Interface-Entscheidungen und Iteration."
          : "Move from rough thinking into flows, structure, interface decisions, and iteration.",
      text:
        lang === "de"
          ? "Nutze GIFs oder Stills, um Entwicklung sichtbar zu machen. Betone Entscheidungen statt nur Artefakte."
          : "Use animated GIFs or stills to show progression. Emphasize decisions rather than just artifacts.",
      layout: "grid",
    },
    "Final Design": {
      kicker: lang === "de" ? "Finales Design" : "Final Design",
      heading:
        lang === "de"
          ? "Zeige das ausgearbeitete Ergebnis mit kontrollierten Galerien, starken Crops und präzisen Captions."
          : "Reveal the polished result with controlled galleries, strong crops, and sharp captions.",
      text:
        lang === "de"
          ? "Nutze Galerie-Layouts statt Carousels. Gib der Arbeit Luft. Reserviere Bewegung für Übergänge und Detail-Reveals."
          : "Use gallery layouts instead of carousels. Let the work breathe. Reserve motion for transitions and detail reveal.",
      layout: "gallery",
    },
    Impact: {
      kicker: lang === "de" ? "Wirkung" : "Impact",
      heading:
        lang === "de"
          ? "Fasse Ergebnisse, Reaktionen und veränderte Wirkung zusammen."
          : "Summarize outcomes, reaction, and what changed because of the work.",
      text:
        lang === "de"
          ? "Metriken können später folgen. Vorerst sollte der Abschnitt auf zentrale Ergebnisse, Learnings und Feedback ausgerichtet sein."
          : "Metrics can be added later. For now, structure the section for key outcomes, takeaways, and client or stakeholder feedback.",
      layout: "impact",
    },
    Learnings: {
      kicker: lang === "de" ? "Learnings" : "Learnings",
      heading:
        lang === "de"
          ? "Schließe mit dem ab, was dein Denken, Handwerk oder deinen Prozess geschärft hat."
          : "Close with what sharpened your thinking, craft, or process.",
      text:
        lang === "de"
          ? "Dieser Teil sollte reflektiert und konkret wirken. So wird die Fallstudie zu einer Design-Erzählung statt zu einem statischen Archiv."
          : "This should feel reflective and specific. It turns the case study into a design narrative rather than a static archive.",
      layout: "text",
    },
  }[title];

  useEditorialReveal(root, {
    dependencies: [lang, title],
    steps: [
      {
        target: "[data-case-copy]",
        from: { y: 26, opacity: 0, duration: 0.7 },
      },
      {
        target: "[data-case-media]",
        from: { y: 24, opacity: 0, duration: 0.68, stagger: 0.08 },
        position: "-=0.36",
      },
    ],
  });

  return (
    <section
      ref={(node) => {
        root.current = node;
        setRef(node);
      }}
      data-section={title}
      className="rounded-[2rem] border border-white/10 bg-white/5 p-5 md:p-8"
    >
      <div className="mb-6 flex items-center justify-between gap-4" data-case-copy>
        <div>
          <div className="type-label text-white/42">{content.kicker}</div>
          <AnimatedHeadline
            as="h2"
            className="heading-safe mt-3 max-w-[24ch] text-[clamp(1.85rem,5vw,3rem)] font-semibold leading-tight tracking-[0.05em]"
          >
            {content.heading}
          </AnimatedHeadline>
        </div>
        <div className="hidden rounded-full border border-white/12 px-3 py-1 text-xs text-white/42 md:block">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <p className="body-safe mt-0 text-base leading-[1.85] text-white/64 md:text-lg" data-case-copy>{content.text}</p>

      {content.layout === "hero" && (
        <div className="mt-8" data-case-media>
          {renderImage(caseStudyImages.hero[0], "aspect-[16/10]")}
        </div>
      )}

      {content.layout === "overview" && (
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            [lang === "de" ? "Rolle" : "Role", lang === "de" ? "Brand Designer / Digital Designer" : "Brand Designer / Digital Designer"],
            [lang === "de" ? "Zeitrahmen" : "Timeline", lang === "de" ? "8 Wochen" : "8 weeks"],
            [lang === "de" ? "Umfang" : "Scope", lang === "de" ? "Identität, Website, Fallstudien-System" : "Identity, website, case-study system"],
            ["Tools", "Figma, Adobe CC, React"],
          ].map(([label, value]) => (
            <div key={label} data-case-media className="rounded-[1.25rem] border border-white/10 bg-[#3B3B3B] p-4">
              <div className="type-label text-white/42">{label}</div>
              <div className="mt-3 text-base text-white/84">{value}</div>
            </div>
          ))}
        </div>
      )}

      {content.layout === "media" && (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {caseStudyImages.media.map((image) => (
            <div key={image.src} data-case-media>
              {renderImage(image, "aspect-[4/5]")}
            </div>
          ))}
        </div>
      )}

      {content.layout === "grid" && (
        <div className="mt-8 grid gap-4 md:grid-cols-6 md:grid-rows-2">
          <div data-case-media>{renderImage(caseStudyImages.grid[0], "aspect-[16/10] md:col-span-4 md:row-span-2 md:aspect-auto")}</div>
          <div data-case-media>{renderImage(caseStudyImages.grid[1], "aspect-[1/1] md:col-span-2")}</div>
          <div data-case-media>{renderImage(caseStudyImages.grid[2], "aspect-[1/1] md:col-span-2")}</div>
        </div>
      )}

      {content.layout === "gallery" && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div data-case-media>{renderImage(caseStudyImages.gallery[0], "aspect-[4/5]")}</div>
          <div data-case-media>{renderImage(caseStudyImages.gallery[1], "aspect-[4/5]")}</div>
          <div data-case-media>{renderImage(caseStudyImages.gallery[2], "aspect-[16/10] md:col-span-2")}</div>
        </div>
      )}

      {content.layout === "impact" && (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            lang === "de" ? "Klareres Projekt-Storytelling" : "Clearer project storytelling",
            lang === "de" ? "Hochwertigeres Content-Tempo" : "More premium content pacing",
            lang === "de" ? "Wiederverwendbares Template für künftige Fallstudien" : "Reusable template for future case studies",
          ].map((item) => (
            <div
              key={item}
              data-case-media
              className="body-safe rounded-[1.25rem] border border-white/10 bg-[#3B3B3B] p-5 text-lg leading-8 text-white/84"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default CaseStudyBlock;
