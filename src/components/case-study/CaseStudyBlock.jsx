import React, { useRef } from "react";
import AnimatedHeadline from "../layout/AnimatedHeadline";
import { caseStudyImages } from "../../data/imagery";

function CaseStudyBlock({ title, index, setRef }) {
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
      kicker: "Case Study Hero",
      heading: "Atlas Case — a visual-first portfolio narrative for branding and digital work.",
      text: "Lead with the strongest final frames. Keep the introduction concise. Let the page immediately communicate tone, polish, and relevance.",
      layout: "hero",
    },
    Overview: {
      kicker: "Project Overview",
      heading: "Define the product, your role, timeline, tools, and the exact challenge being solved.",
      text: "This section should stay scannable: role, collaborators, deliverables, timeline, and one focused problem statement.",
      layout: "overview",
    },
    Discovery: {
      kicker: "Exploration / Discovery",
      heading: "Show research, references, sketches, mood, and what shaped the visual direction.",
      text: "Answer three questions: why did you do it, what did you learn, and how did that shape the next design move.",
      layout: "media",
    },
    Process: {
      kicker: "Design Process",
      heading: "Move from rough thinking into flows, structure, interface decisions, and iteration.",
      text: "Use animated GIFs or stills to show progression. Emphasize decisions rather than just artifacts.",
      layout: "media",
    },
    "Final Design": {
      kicker: "Final Design",
      heading: "Reveal the polished result with controlled galleries, strong crops, and sharp captions.",
      text: "Use gallery layouts instead of carousels. Let the work breathe. Reserve motion for transitions and detail reveal.",
      layout: "gallery",
    },
    Impact: {
      kicker: "Impact",
      heading: "Summarize outcomes, reaction, and what changed because of the work.",
      text: "Metrics can be added later. For now, structure the section for key outcomes, takeaways, and client or stakeholder feedback.",
      layout: "impact",
    },
    Learnings: {
      kicker: "Learnings",
      heading: "Close with what sharpened your thinking, craft, or process.",
      text: "This should feel reflective and specific. It turns the case study into a design narrative rather than a static archive.",
      layout: "text",
    },
  }[title];

  return (
    <section
      ref={(node) => {
        root.current = node;
        setRef(node);
      }}
      data-case-block
      data-section={title}
      className="rounded-[2rem] border border-white/10 bg-white/5 p-5 md:p-8"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
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

      <p className="body-safe mt-0 text-base leading-[1.85] text-white/64 md:text-lg">{content.text}</p>

      {content.layout === "hero" && (
        <div className="mt-8">
          {renderImage(caseStudyImages.hero[0], "aspect-[16/10]")}
        </div>
      )}

      {content.layout === "overview" && (
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Role", "Brand Designer / Digital Designer"],
            ["Timeline", "8 weeks"],
            ["Scope", "Identity, website, case-study system"],
            ["Tools", "Figma, Adobe CC, React"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[1.25rem] border border-white/10 bg-[#3B3B3B] p-4">
              <div className="type-label text-white/42">{label}</div>
              <div className="mt-3 text-base text-white/84">{value}</div>
            </div>
          ))}
        </div>
      )}

      {content.layout === "media" && (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {caseStudyImages.media.map((image) => (
            <div key={image.src}>
              {renderImage(image, "aspect-[4/5]")}
            </div>
          ))}
        </div>
      )}

      {content.layout === "gallery" && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div>{renderImage(caseStudyImages.gallery[0], "aspect-[4/5]")}</div>
          <div>{renderImage(caseStudyImages.gallery[1], "aspect-[4/5]")}</div>
          <div>{renderImage(caseStudyImages.gallery[2], "aspect-[16/10] md:col-span-2")}</div>
        </div>
      )}

      {content.layout === "impact" && (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            "Clearer project storytelling",
            "More premium content pacing",
            "Reusable template for future case studies",
          ].map((item) => (
            <div
              key={item}
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
