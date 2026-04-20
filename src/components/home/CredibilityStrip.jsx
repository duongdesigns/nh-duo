import React from "react";

import { featuredPreviewImages, projectImages } from "../../data/imagery";

const stripItems = [
  projectImages["nord-form"],
  featuredPreviewImages[0],
  projectImages["signal-duo"],
  featuredPreviewImages[1],
  projectImages["atlas-case"],
  featuredPreviewImages[2],
];

export default function CredibilityStrip() {
  return (
    <section className="home-shell pb-6 pt-2 md:pb-10 md:pt-3">
      <div className="content-shell">
        <div className="mb-4 px-1 md:mb-5">
          <p className="subsection-title text-white/88">
            More work across identity, print, and digital systems.
          </p>
        </div>
        <div className="overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/[0.025] px-3 py-3 md:px-4">
        <div
          className="credibility-strip-track flex w-max items-center gap-3 md:gap-4"
        >
          {[...stripItems, ...stripItems].map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="credibility-strip-card relative h-20 w-32 overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/[0.03] md:h-24 md:w-40"
            >
              <img
                src={image.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-90"
                style={{ objectPosition: image.position ?? "50% 50%" }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,20,27,0.02),rgba(14,20,27,0.28))]" />
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
