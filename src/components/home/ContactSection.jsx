import { useRef } from "react";

import AnimatedHeadline from "../layout/AnimatedHeadline";
import SectionEyebrow from "../layout/SectionEyebrow";
import SimpleContactForm from "./SimpleContactForm";

function ContactSection() {
  const root = useRef(null);
  return (
    <section ref={root} className="home-shell py-28 md:py-36">
      <div className="content-shell w-full">
        <div className="grid gap-16 xl:gap-24">
          <div className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-start xl:gap-16">
            <div className="max-w-none xl:max-w-[60ch]">
              <SectionEyebrow>Contact</SectionEyebrow>
              <AnimatedHeadline
                as="h2"
                className="subsection-title heading-safe max-w-[20ch] text-white"
              >
                Shape a portfolio, identity, or layout that feels built — not templated.
              </AnimatedHeadline>
              <p className="body-safe body-safe--wide mt-5 text-base leading-[1.8] text-white/60">
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
