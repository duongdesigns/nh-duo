import { useRef } from "react";

import HorizontalScrollRow from "../layout/HorizontalScrollRow";
import SectionEyebrow from "../layout/SectionEyebrow";

function Principles() {
  const root = useRef(null);
  const items = [
    "Muted dark palette with reserved accent usage",
    "Top navigation that transforms after first scroll",
    "Visual-first case studies with classic structure",
    "Moderate motion with occasional cinematic flourishes",
    "Simple contact flow with prominent action-led CTA",
    "Container queries, fluid type, and token-based styling",
  ];

  return (
    <section ref={root} className="home-shell py-16 md:py-24">
      <div className="content-shell rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
        <SectionEyebrow>System Principles</SectionEyebrow>
        <h2 className="sr-only">System Principles</h2>
        <HorizontalScrollRow
          className="mt-6 md:overflow-visible"
          rowClassName="md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3"
          gap="gap-4"
          itemClassName="w-[18rem] md:w-auto md:flex-shrink"
        >
          {items.map((item, index) => (
            <div key={item} className="rounded-[1.5rem] border border-white/10 bg-[#3B3B3B] p-5">
              <div className="type-label text-white/35">
                0{index + 1}
              </div>
              <div className="body-safe mt-4 text-lg leading-8 text-white/84">{item}</div>
            </div>
          ))}
        </HorizontalScrollRow>
      </div>
    </section>
  );
}

export default Principles;
