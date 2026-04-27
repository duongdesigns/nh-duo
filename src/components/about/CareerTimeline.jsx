import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

function CareerTimeline({ items }) {
  const root = useRef(null);
  const isInView = useInView(root, {
    once: true,
    amount: 0.35,
  });
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = isInView && !prefersReducedMotion;

  return (
    <section
      ref={root}
      data-about-block
      aria-labelledby="about-career-title"
      className="bg-[#050506] py-28 shadow-[0_0_0_100vmax_#050506] [clip-path:inset(0_-100vmax)] md:py-36"
    >
      <div className="grid gap-8">
        <div>
          <div className="text-sm leading-6 text-white/42">Werdegang</div>
          <h2
            id="about-career-title"
            className="subsection-title mt-4 max-w-[18ch] text-white md:max-w-[62%]"
          >
            Drei Platzhalter-Stationen für die aktuelle Praxis.
          </h2>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-auto left-[0.42rem] top-0 h-full w-px bg-white/10 md:left-0 md:right-0 md:top-[1.06rem] md:h-px md:w-full"
          />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-auto left-[0.42rem] top-0 h-full w-px origin-top bg-[rgba(214,161,31,0.78)] md:hidden"
            initial={prefersReducedMotion ? false : { scaleY: 0 }}
            animate={
              shouldAnimate || prefersReducedMotion
                ? { scaleY: 1 }
                : { scaleY: 0 }
            }
            transition={{ duration: 3.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[1.06rem] hidden h-px origin-left bg-[rgba(214,161,31,0.78)] md:block"
            initial={prefersReducedMotion ? false : { scaleX: 0 }}
            animate={
              shouldAnimate || prefersReducedMotion
                ? { scaleX: 1 }
                : { scaleX: 0 }
            }
            transition={{ duration: 3.2, ease: [0.22, 1, 0.36, 1] }}
          />

          <ol className="grid gap-7 md:grid-cols-3 md:gap-6">
            {items.map((item, index) => (
              <motion.li
                key={item.title}
                className="relative pl-8 md:pl-0 md:pt-12"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                animate={
                  shouldAnimate || prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 18 }
                }
                transition={{
                  duration: 1.15,
                  delay: 0.55 + index * 0.42,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 h-3 w-3 rounded-full border border-[rgba(214,161,31,0.78)] bg-[#070708] shadow-[0_0_0_5px_rgba(214,161,31,0.12)] md:top-[0.68rem]"
                />
                <div className="text-sm leading-6 text-white/34">{item.period}</div>
                <h3 className="mt-3 text-[1.08rem] font-medium leading-tight tracking-[-0.035em] text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  {item.text}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default CareerTimeline;
