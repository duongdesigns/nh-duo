import { useRef } from "react";
import { Mail } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

import AnimatedHeadline from "../components/layout/AnimatedHeadline";
import SectionEyebrow from "../components/layout/SectionEyebrow";
import SimpleContactForm from "../components/home/SimpleContactForm";

function ContactPage() {
  const root = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        return;
      }

      const atmosphere = root.current?.querySelector("[data-page-atmosphere]");
      if (!atmosphere) return;

      gsap.fromTo(
        atmosphere,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.15,
          ease: "power3.out",
          overwrite: "auto",
        }
      );
    },
    { scope: root, dependencies: [prefersReducedMotion] }
  );

  return (
    <section ref={root} className="page-shell">
      <div
        aria-hidden="true"
        data-page-atmosphere
        className="page-atmosphere page-atmosphere--contact"
      />
      <div className="content-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <SectionEyebrow>Direct Contact</SectionEyebrow>
          <AnimatedHeadline as="h1" className="page-title max-w-[18ch]">
            Start with the essentials.
          </AnimatedHeadline>
          <p className="body-safe mt-4 text-base leading-[1.8] text-white/62 md:text-lg">
            A simple form, clear intent, and one prominent action. This is the conversion point, so it should feel calm, fast, and deliberate.
          </p>
          <a
            aria-label="Send an email to hello@nhduo.studio"
            className="body-safe mt-8 flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-[#3B3B3B] p-4 text-white/72"
            href="mailto:hello@nhduo.studio"
          >
            <Mail size={18} /> hello@nhduo.studio
          </a>
        </div>
        <div>
          <SimpleContactForm />
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
