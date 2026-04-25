import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import AnimatedHeadline from "../layout/AnimatedHeadline";

function ImagePreview({ image, onClose }) {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      aria-label={`Image preview: ${image.alt}`}
      aria-modal="true"
      className="fixed inset-0 z-[140] flex h-dvh w-dvw items-center justify-center bg-[#05080B]/88 p-4 backdrop-blur-md md:p-8"
      role="dialog"
      onClick={onClose}
    >
      <button
        className="absolute right-4 top-4 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/72 transition hover:bg-white/12 hover:text-white focus-visible:text-white md:right-8 md:top-8"
        onClick={onClose}
        type="button"
      >
        Close
      </button>
      <figure
        className="grid max-h-[86dvh] w-full max-w-6xl gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative max-h-[78dvh] overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[0.03]">
          <img
            src={image.src}
            alt={image.alt}
            className="h-full max-h-[78dvh] w-full object-contain"
            decoding="async"
          />
        </div>
        <figcaption className="body-safe max-w-[72ch] text-sm leading-6 text-white/56">
          {image.alt}
        </figcaption>
      </figure>
    </div>,
    document.body
  );
}

function CaseStudyBlock({ content, index, setRef, title }) {
  const root = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (!previewImage) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setPreviewImage(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewImage]);

  if (!content) {
    return null;
  }

  const sectionNumber = String(index + 1).padStart(2, "0");

  const renderImage = (image, className) => (
    <button
      key={image.src}
      className={`case-study-image-frame rounded-[1.5rem] border border-white/10 ${className}`}
      onClick={() => setPreviewImage(image)}
      type="button"
      aria-label={`Preview image: ${image.alt}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: image.position ?? "50% 50%" }}
        className="editorial-image"
      />
    </button>
  );

  const getGalleryImageClass = (imageIndex) => {
    const masonryClasses = [
      "min-h-[14rem] md:col-span-2 md:row-span-2 md:min-h-[24rem]",
      "min-h-[14rem] md:min-h-0",
      "min-h-[14rem] md:min-h-0",
      "min-h-[14rem] md:row-span-2 md:min-h-0",
      "min-h-[14rem] md:min-h-0",
      "min-h-[14rem] md:col-span-2 md:min-h-0",
    ];

    return masonryClasses[imageIndex % masonryClasses.length];
  };

  return (
    <section
      ref={(node) => {
        root.current = node;
        setRef(node);
      }}
      data-case-block
      data-section={title}
      className="rounded-[2rem] border border-white/10 bg-[#121A22]/95 p-5 md:p-8"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <div className="type-label text-white/42">{content.kicker}</div>
          <AnimatedHeadline
            as="h2"
            className="heading-safe mt-3 max-w-[25ch] text-[clamp(1.35rem,3.1vw,2.15rem)] font-medium leading-[1.08] tracking-[-0.025em] text-white"
          >
            {content.heading}
          </AnimatedHeadline>
        </div>
        <div className="hidden rounded-full border border-white/12 px-3 py-1 text-xs text-white/42 md:block">
          {sectionNumber}
        </div>
      </div>

      <p className="body-safe mt-0 text-base leading-[1.85] text-white/64 md:text-lg">
        {content.text}
      </p>

      {content.layout === "hero" && content.image && (
        <div className="mt-8">{renderImage(content.image, "aspect-[16/10] min-h-[18rem]")}</div>
      )}

      {content.layout === "overview" && Array.isArray(content.details) && (
        <dl className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.details.map(([label, value]) => (
            <div
              key={label}
              className="rounded-[1.25rem] border border-white/10 bg-[#34383C] p-4"
            >
              <dt className="type-label text-white/42">{label}</dt>
              <dd className="mt-3 text-base text-white/84">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {content.layout === "media" && Array.isArray(content.media) && (
        <div className="mt-8 grid auto-rows-[minmax(18rem,1fr)] gap-4 md:grid-cols-3 md:auto-rows-[minmax(22rem,1fr)]">
          {content.media.map((image) => (
            renderImage(image, "min-h-[18rem] md:min-h-[22rem]")
          ))}
        </div>
      )}

      {content.layout === "gallery" && Array.isArray(content.gallery) && (
        <div className="mt-8 grid auto-rows-[minmax(14rem,1fr)] gap-3 md:grid-cols-3 md:auto-rows-[11rem] xl:auto-rows-[12rem]">
          {content.gallery.map((image, imageIndex) => (
            renderImage(image, getGalleryImageClass(imageIndex))
          ))}
        </div>
      )}

      {content.layout === "impact" && Array.isArray(content.items) && (
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {content.items.map((item) => (
            <li
              key={item}
              className="body-safe rounded-[1.25rem] border border-white/10 bg-[#34383C] p-5 text-lg leading-8 text-white/84"
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
              className="rounded-[1.25rem] border border-white/10 bg-[#34383C] p-5 text-base leading-8 text-white/76"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {previewImage && (
        <ImagePreview image={previewImage} onClose={() => setPreviewImage(null)} />
      )}
    </section>
  );
}

export default CaseStudyBlock;
