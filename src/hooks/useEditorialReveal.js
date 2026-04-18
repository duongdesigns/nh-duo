import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function useEditorialReveal(
  root,
  {
    start = "top 82%",
    end,
    scrub = false,
    once = true,
    defaults = { ease: "power3.out" },
    steps = [],
    dependencies = [],
  } = {}
) {
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !steps.length) return;

      const timeline = gsap.timeline({
        defaults,
        scrollTrigger: {
          trigger: root.current,
          start,
          end,
          scrub,
          once,
          invalidateOnRefresh: true,
        },
      });

      steps.forEach(({ target, from, position }) => {
        timeline.from(target, from, position);
      });

      // Page content is mounted inside React/Framer transitions, so let layout settle
      // before forcing ScrollTrigger to measure and activate any above-the-fold reveals.
      const refreshId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });

      return () => {
        cancelAnimationFrame(refreshId);
      };
    },
    { scope: root, dependencies: [prefersReducedMotion, ...dependencies] }
  );
}
