import { useRef } from "react";

import AnimatedHeadline from "../layout/AnimatedHeadline";
import SectionEyebrow from "../layout/SectionEyebrow";
import SimpleContactForm from "./SimpleContactForm";

function ContactSection() {
  const root = useRef(null);
  return (
    <section ref={root} className="home-shell pb-20 pt-8 md:pb-28 md:pt-12">
      <div className="content-shell w-full">
        <div className="grid gap-14 xl:gap-20">
          <div className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr] xl:items-start xl:gap-14">
            <div className="max-w-none xl:max-w-[60ch]">
              <SectionEyebrow>Contact</SectionEyebrow>
              <AnimatedHeadline
                as="h2"
                className="section-title heading-safe max-w-[18ch]"
              >
                Shape a portfolio, identity, or layout that feels built — not templated.
              </AnimatedHeadline>
              <p className="body-safe body-safe--wide mt-6 text-base leading-[1.85] text-white/60 md:text-lg">
                Keep the form direct and low-friction. Ask only for what matters. Use motion with restraint.
              </p>
            </div>

            <div>
              <SimpleContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
