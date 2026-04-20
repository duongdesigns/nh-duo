import { useEffect, useMemo, useRef, useState } from "react";

import { allPortfolioMedia } from "../../data/imagery";

const MAX_SLIDER_MEDIA = 10;

function shuffleMedia(items) {
  const nextItems = [...items];

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[swapIndex]] = [nextItems[swapIndex], nextItems[index]];
  }

  return nextItems;
}

export default function CredibilityStrip() {
  const root = useRef(null);
  const [trackMetrics, setTrackMetrics] = useState({
    top: { distance: 0, repeats: 2 },
    bottom: { distance: 0, repeats: 2 },
  });
  const topViewportRef = useRef(null);
  const bottomViewportRef = useRef(null);
  const topSequenceRef = useRef(null);
  const bottomSequenceRef = useRef(null);

  const [topTrackItems, bottomTrackItems] = useMemo(() => {
    const shuffledMedia = shuffleMedia(allPortfolioMedia).slice(
      0,
      Math.min(allPortfolioMedia.length, MAX_SLIDER_MEDIA)
    );

    if (shuffledMedia.length <= 1) {
      return [shuffledMedia, shuffledMedia];
    }

    const topItems = shuffledMedia.filter((_, index) => index % 2 === 0);
    const bottomItems = shuffledMedia.filter((_, index) => index % 2 === 1);

    return [
      topItems,
      bottomItems.length ? bottomItems : topItems.slice().reverse(),
    ];
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateTrackMetrics = (viewportNode, sequenceNode, key) => {
      if (!viewportNode || !sequenceNode) return;

      const viewportWidth = viewportNode.getBoundingClientRect().width;
      const sequenceWidth = sequenceNode.getBoundingClientRect().width;

      if (!viewportWidth || !sequenceWidth) return;

      const requiredRepeats = Math.max(
        2,
        Math.ceil(viewportWidth / sequenceWidth) + 1
      );

      setTrackMetrics((current) => {
        const nextTrack = {
          distance: sequenceWidth,
          repeats: requiredRepeats,
        };

        if (
          current[key].distance === nextTrack.distance &&
          current[key].repeats === nextTrack.repeats
        ) {
          return current;
        }

        return {
          ...current,
          [key]: nextTrack,
        };
      });
    };

    const measureTracks = () => {
      frameId = 0;
      updateTrackMetrics(topViewportRef.current, topSequenceRef.current, "top");
      updateTrackMetrics(
        bottomViewportRef.current,
        bottomSequenceRef.current,
        "bottom"
      );
    };

    const scheduleMeasure = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(measureTracks);
    };

    scheduleMeasure();
    window.addEventListener("resize", scheduleMeasure, { passive: true });

    return () => {
      window.removeEventListener("resize", scheduleMeasure);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [bottomTrackItems.length, topTrackItems.length]);

  const renderTrack = ({
    items,
    metrics,
    reverse = false,
    rowLabel,
    viewportRef,
    sequenceRef,
  }) => (
    <div ref={viewportRef} className="overflow-hidden py-3 -my-3 md:py-4 md:-my-4">
      <div
        className={`credibility-strip-track flex w-max items-center gap-3 md:gap-4 ${reverse ? "credibility-strip-track--reverse" : ""}`}
        aria-label={rowLabel}
        style={{ "--credibility-marquee-distance": `${metrics.distance}px` }}
      >
        {Array.from({ length: metrics.repeats }).map((_, groupIndex) => (
          <div
            key={`${rowLabel}-group-${groupIndex}`}
            ref={groupIndex === 0 ? sequenceRef : undefined}
            aria-hidden={groupIndex > 0 ? "true" : undefined}
            className="flex items-center gap-3 md:gap-4"
          >
            {items.map((image, index) => (
              <div
                key={`${rowLabel}-${groupIndex}-${image.src}-${index}`}
                className="credibility-strip-card relative h-20 w-32 overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/[0.03] md:h-24 md:w-40"
              >
                <img
                  src={image.src}
                  alt={image.alt ?? ""}
                  fetchPriority="low"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-90"
                  style={{ objectPosition: image.position ?? "50% 50%" }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,20,27,0.02),rgba(14,20,27,0.28))]" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section ref={root} className="home-shell pb-8 pt-6 md:pb-12 md:pt-8">
      <div className="content-shell px-1">
        <p className="subsection-title text-white/88">
          More work across identity, print, and digital systems.
        </p>
      </div>
      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 px-3 pt-8 md:px-4 md:pt-10">
        <div className="credibility-strip-stack flex flex-col gap-4 md:gap-6">
          {renderTrack({
            items: topTrackItems,
            metrics: trackMetrics.top,
            rowLabel: "Portfolio preview strip",
            viewportRef: topViewportRef,
            sequenceRef: topSequenceRef,
          })}
          {renderTrack({
            items: bottomTrackItems,
            metrics: trackMetrics.bottom,
            reverse: true,
            rowLabel: "Portfolio preview strip reverse",
            viewportRef: bottomViewportRef,
            sequenceRef: bottomSequenceRef,
          })}
        </div>
      </div>
    </section>
  );
}
