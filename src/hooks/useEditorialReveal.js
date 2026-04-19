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
      if (!steps.length) return;

      const targets = steps.flatMap(({ target }) => gsap.utils.toArray(target, root.current));

      if (prefersReducedMotion) {
        gsap.set(targets, {
          clearProps: "opacity,transform,filter,clipPath,willChange",
        });
        return;
      }

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
        timeline.from(
          target,
          {
            immediateRender: false,
            ...from,
          },
          position
        );
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
        timeline.scrollTrigger?.kill();
        timeline.kill();
        gsap.set(targets, {
          clearProps: "opacity,transform,filter,clipPath,willChange",
        });
      };
    },
    { scope: root, dependencies: [prefersReducedMotion, ...dependencies] }
  );
}
