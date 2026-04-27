import { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

function SkillBar({ label, value }) {
  const progressId = useId();
  const progressRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(progressRef, {
    once: true,
    amount: 0.72,
  });
  const progress = prefersReducedMotion ? value / 100 : (isInView ? value / 100 : 0);

  return (
    <li className="grid gap-2.5">
      <div className="flex items-center justify-between gap-3">
        <span id={progressId} className="text-sm text-white/74 md:text-[0.96rem]">
          {label}
        </span>
      </div>

      <div
        ref={progressRef}
        role="progressbar"
        aria-labelledby={progressId}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={`${label}: ${value}%`}
        className="skill-bar-track relative h-2.5 overflow-hidden rounded-full border border-white/10 bg-white/[0.07]"
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,rgba(214,161,31,0.9),rgba(242,193,78,0.76))] shadow-[0_0_18px_rgba(214,161,31,0.16)]"
          initial={prefersReducedMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: progress }}
          transition={{
            duration: prefersReducedMotion ? 0 : 3,
            ease: "easeInOut",
          }}
          style={{
            width: "100%",
            originX: 0,
          }}
        />
      </div>
    </li>
  );
}

export default SkillBar;
