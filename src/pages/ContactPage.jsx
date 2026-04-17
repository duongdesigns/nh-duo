import React from "react";
import { Mail } from "lucide-react";

import SectionEyebrow from "../components/layout/SectionEyebrow";
import SimpleContactForm from "../components/home/SimpleContactForm";

function ContactPage({ lang }) {
  return (
    <section className="px-4 pb-20 pt-32 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <SectionEyebrow>{lang === "de" ? "Direkter Kontakt" : "Direct Contact"}</SectionEyebrow>
          <div className="text-[clamp(2.4rem,5vw,5.4rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
            {lang === "de" ? "Beginne mit dem Wesentlichen." : "Start with the essentials."}
          </div>
          <div className="mt-4 max-w-lg text-base leading-[1.8] text-white/62 md:text-lg">
            {lang === "de"
              ? "Ein einfaches Formular, klare Absicht und eine deutliche Aktion. Das ist der Conversion-Punkt, also sollte er ruhig, schnell und bewusst wirken."
              : "A simple form, clear intent, and one prominent action. This is the conversion point, so it should feel calm, fast, and deliberate."}
          </div>
          <div className="mt-8 flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-[#3B3B3B] p-4 text-white/72">
            <Mail size={18} /> hello@nhduo.studio
          </div>
        </div>
        <SimpleContactForm lang={lang} />
      </div>
    </section>
  );
}

export default ContactPage;
