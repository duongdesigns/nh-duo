import React, { useRef } from "react";

import useEditorialReveal from "../../hooks/useEditorialReveal";
import AnimatedHeadline from "../layout/AnimatedHeadline";
import SectionEyebrow from "../layout/SectionEyebrow";
import SimpleContactForm from "./SimpleContactForm";

function ContactSection({ lang }) {
  const root = useRef(null);

  useEditorialReveal(root, {
    dependencies: [lang],
    steps: [
      {
        target: "[data-contact-copy]",
        from: { y: 24, opacity: 0, duration: 0.68 },
      },
      {
        target: "[data-contact-form]",
        from: { y: 24, opacity: 0, duration: 0.72 },
        position: "-=0.46",
      },
    ],
  });

  return (
    <section ref={root} className="home-shell pb-20 pt-4 md:pb-28">
      <div className="content-shell grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8" data-contact-copy>
          <SectionEyebrow>{lang === "de" ? "Kontakt" : "Contact"}</SectionEyebrow>
          <AnimatedHeadline as="h2" className="section-title">
            {lang === "de"
              ? "Lass uns ein Portfolio, eine Identität oder eine Layout gestalten, die gebaut wirkt – nicht vorgefertigt."
              : "Let’s shape a portfolio, identity, or layout that feels built — not templated."}
          </AnimatedHeadline>
          <p className="body-safe mt-4 text-base leading-[1.75] text-white/62">
            {lang === "de"
              ? "Halte das Formular direkt und reibungsarm. Frage nur nach dem, was wirklich zählt. Setze Bewegung mit Zurückhaltung ein."
              : "Keep the form direct and low-friction. Ask only for what matters. Use motion with restraint."}
          </p>
        </div>
        <div data-contact-form>
          <SimpleContactForm lang={lang} />
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
