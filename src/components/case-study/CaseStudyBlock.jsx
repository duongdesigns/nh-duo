import { useRef } from "react";

import AnimatedHeadline from "../layout/AnimatedHeadline";

function CaseStudyBlock({ content, index, setRef, title }) {
  const root = useRef(null);

  if (!content) {
    return null;
  }

  const renderImage = (image, className) => (
    <div
      key={image.src}
      className={`relative overflow-hidden rounded-[1.5rem] border border-white/10 ${className}`}
    >
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
            className="section-title heading-safe mt-3 max-w-[24ch] leading-tight"
          >
            {content.heading}
          </AnimatedHeadline>
        </div>
        <div className="hidden rounded-full border border-white/12 px-3 py-1 text-xs text-white/42 md:block">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <p className="body-safe mt-0 text-base leading-[1.85] text-white/64 md:text-lg">
        {content.text}
      </p>

      {content.layout === "hero" && content.image && (
        <div className="mt-8">{renderImage(content.image, "aspect-[16/10]")}</div>
      )}

      {content.layout === "overview" && Array.isArray(content.details) && (
        <dl className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.details.map(([label, value]) => (
            <div
              key={label}
              className="rounded-[1.25rem] border border-white/10 bg-[#3B3B3B] p-4"
            >
              <dt className="type-label text-white/42">{label}</dt>
              <dd className="mt-3 text-base text-white/84">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {content.layout === "media" && Array.isArray(content.media) && (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {content.media.map((image) => (
            <div key={image.src}>{renderImage(image, "aspect-[4/5]")}</div>
          ))}
        </div>
      )}

      {content.layout === "gallery" && Array.isArray(content.gallery) && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {content.gallery.map((image, imageIndex) => (
            <div
              key={image.src}
              className={imageIndex === 2 ? "md:col-span-2" : ""}
            >
              {renderImage(
                image,
                imageIndex === 2 ? "aspect-[16/10]" : "aspect-[4/5]"
              )}
            </div>
          ))}
        </div>
      )}

      {content.layout === "impact" && Array.isArray(content.items) && (
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {content.items.map((item) => (
            <li
              key={item}
              className="body-safe rounded-[1.25rem] border border-white/10 bg-[#3B3B3B] p-5 text-lg leading-8 text-white/84"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {content.layout === "text" && Array.isArray(content.notes) && (
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {content.notes.map((item) => (
            <li
              key={item}
              className="rounded-[1.25rem] border border-white/10 bg-[#3B3B3B] p-5 text-base leading-8 text-white/76"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default CaseStudyBlock;
