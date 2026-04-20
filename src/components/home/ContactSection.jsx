import React, { useRef } from "react";

import AnimatedHeadline from "../layout/AnimatedHeadline";
import SectionEyebrow from "../layout/SectionEyebrow";
import SimpleContactForm from "./SimpleContactForm";

function ContactSection() {
  const root = useRef(null);
  return (
    <section ref={root} className="home-shell pb-20 pt-4 md:pb-28">
      <div className="content-shell grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <SectionEyebrow>Contact</SectionEyebrow>
          <AnimatedHeadline
            as="h2"
            className="section-title heading-safe max-w-[18ch]"
          >
            Shape a portfolio, identity, or layout that feels built — not templated.
          </AnimatedHeadline>
          <p className="body-safe mt-4 text-base leading-[1.75] text-white/62">
            Keep the form direct and low-friction. Ask only for what matters. Use motion with restraint.
          </p>
        </div>
        <div>
          <SimpleContactForm />
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
