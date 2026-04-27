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
              <SectionEyebrow>Kontakt</SectionEyebrow>
              <AnimatedHeadline
                as="h2"
                className="subsection-title heading-safe max-w-[20ch] text-white"
              >
                Platzhalter für eine Anfrage zu Portfolio, Identity oder digitalem Layout.
              </AnimatedHeadline>
              <p className="body-safe body-safe--wide mt-5 text-base leading-[1.8] text-white/60">
                Dieser Bereich führt später direkt zur Kontaktaufnahme und hält die Anfrage bewusst kurz.
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
