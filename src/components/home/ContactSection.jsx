import React from "react";

import SectionEyebrow from "../layout/SectionEyebrow";
import SimpleContactForm from "./SimpleContactForm";

function ContactSection({ lang }) {
  return (
    <section className="px-4 pb-20 pt-4 md:px-8 md:pb-28">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <SectionEyebrow>{lang === "de" ? "Kontakt" : "Contact"}</SectionEyebrow>
          <div className="text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
            {lang === "de"
              ? "Lass uns ein Portfolio, eine Identität oder eine Fallstudie gestalten, die gebaut wirkt – nicht vorgefertigt."
              : "Let’s shape a portfolio, identity, or case study that feels built — not templated."}
          </div>
          <div className="mt-4 max-w-md text-base leading-[1.75] text-white/62">
            {lang === "de"
              ? "Halte das Formular direkt und reibungsarm. Frage nur nach dem, was wirklich zählt. Setze Bewegung mit Zurückhaltung ein."
              : "Keep the form direct and low-friction. Ask only for what matters. Use motion with restraint."}
          </div>
        </div>
        <SimpleContactForm lang={lang} />
      </div>
    </section>
  );
}

export default ContactSection;
