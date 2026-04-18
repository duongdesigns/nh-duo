import React, { useRef } from "react";
import { Mail } from "lucide-react";

import useEditorialReveal from "../hooks/useEditorialReveal";
import AnimatedHeadline from "../components/layout/AnimatedHeadline";
import SectionEyebrow from "../components/layout/SectionEyebrow";
import SimpleContactForm from "../components/home/SimpleContactForm";

function ContactPage({ lang }) {
  const root = useRef(null);

  useEditorialReveal(root, {
    dependencies: [lang],
    steps: [
      {
        target: "[data-contact-page-copy]",
        from: { y: 26, opacity: 0, duration: 0.72 },
      },
      {
        target: "[data-contact-page-form]",
        from: { y: 24, opacity: 0, duration: 0.72 },
        position: "-=0.44",
      },
    ],
  });

  return (
    <section ref={root} className="page-shell">
      <div className="content-shell grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8" data-contact-page-copy>
          <SectionEyebrow>{lang === "de" ? "Direkter Kontakt" : "Direct Contact"}</SectionEyebrow>
          <AnimatedHeadline as="h1" className="page-title max-w-[18ch]">
            {lang === "de" ? "Beginne mit dem Wesentlichen." : "Start with the essentials."}
          </AnimatedHeadline>
          <p className="body-safe mt-4 text-base leading-[1.8] text-white/62 md:text-lg">
            {lang === "de"
              ? "Ein einfaches Formular, klare Absicht und eine deutliche Aktion. Das ist der Conversion-Punkt, also sollte er ruhig, schnell und bewusst wirken."
              : "A simple form, clear intent, and one prominent action. This is the conversion point, so it should feel calm, fast, and deliberate."}
          </p>
          <a
            className="body-safe mt-8 flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-[#3B3B3B] p-4 text-white/72"
            href="mailto:hello@nhduo.studio"
          >
            <Mail size={18} /> hello@nhduo.studio
          </a>
        </div>
        <div data-contact-page-form>
          <SimpleContactForm lang={lang} />
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
