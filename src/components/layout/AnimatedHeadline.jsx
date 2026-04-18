import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

function AnimatedHeadline({
  as: Component = "h2",
  children,
  className = "",
}) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const [isInitiallyVisible, setIsInitiallyVisible] = useState(false);
  const [hasCheckedInitialVisibility, setHasCheckedInitialVisibility] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [measuredLines, setMeasuredLines] = useState([]);

  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.5,
    margin: "0px 0px -20% 0px",
  });

  const shouldRenderStatic = typeof children !== "string" || prefersReducedMotion;
  const textContent = typeof children === "string" ? children : "";
  const parts = useMemo(() => textContent.split(/(\s+)/), [textContent]);
  const chunkedLines = useMemo(() => {
    const sourceLines = measuredLines.length ? measuredLines : (textContent ? [textContent] : []);

    return sourceLines.map((line) => {
      const words = line.trim().split(/\s+/).filter(Boolean);
      const groups = [];

      for (let index = 0; index < words.length; index += 3) {
        groups.push(words.slice(index, index + 3).join(" "));
      }

      return groups.length ? groups : [line];
    });
  }, [measuredLines, textContent]);

  useEffect(() => {
    const node = containerRef.current;

    if (!node || typeof window === "undefined") return;

    const rect = node.getBoundingClientRect();
    const isVisibleOnLoad = rect.top < window.innerHeight && rect.bottom > 0;

    setIsInitiallyVisible(isVisibleOnLoad);
    setHasCheckedInitialVisibility(true);
  }, []);

  useEffect(() => {
    if (shouldRenderStatic) return;
    if (!hasCheckedInitialVisibility || isInitiallyVisible) return;
    if (!isInView || hasStarted) return;

    setHasStarted(true);
  }, [hasCheckedInitialVisibility, hasStarted, isInView, isInitiallyVisible, shouldRenderStatic]);

  useLayoutEffect(() => {
    if (shouldRenderStatic) return;
    if (typeof window === "undefined") return;

    const measureNode = measureRef.current;
    if (!measureNode) return;

    const computeLines = () => {
      const partNodes = Array.from(measureNode.querySelectorAll("[data-part-index]"));
      if (!partNodes.length) {
        setMeasuredLines(textContent ? [textContent] : []);
        return;
      }

      const grouped = [];
      let currentTop = null;
      let currentLine = [];

      partNodes.forEach((node) => {
        const top = node.offsetTop;
        const value = node.getAttribute("data-value") || "";

        if (currentTop === null) {
          currentTop = top;
        }

        if (top !== currentTop) {
          grouped.push(currentLine.join(""));
          currentLine = [value];
          currentTop = top;
        } else {
          currentLine.push(value);
        }
      });

      if (currentLine.length) {
        grouped.push(currentLine.join(""));
      }

      setMeasuredLines(grouped);
    };

    computeLines();

    const resizeObserver = new ResizeObserver(() => {
      computeLines();
    });

    resizeObserver.observe(measureNode);

    return () => {
      resizeObserver.disconnect();
    };
  }, [parts, shouldRenderStatic, textContent]);

  if (shouldRenderStatic) {
    return <Component className={className}>{children}</Component>;
  }

  if (hasCheckedInitialVisibility && isInitiallyVisible) {
    return (
      <Component ref={containerRef} className={className}>
        {children}
      </Component>
    );
  }

  return (
    <Component ref={containerRef} className={className}>
      <span
        ref={measureRef}
        aria-hidden="true"
        className="invisible absolute left-0 top-0 -z-10 block whitespace-pre-wrap pointer-events-none"
        style={{ width: "100%" }}
      >
        {parts.map((part, index) => (
          <span
            key={`${part}-${index}`}
            data-part-index={index}
            data-value={part}
          >
            {part}
          </span>
        ))}
      </span>
      <span className="relative inline-block whitespace-pre-wrap">
        {chunkedLines.map((lineGroups, lineIndex) => (
          <span key={lineIndex} className="block relative">
            {lineIndex > 0 && <span className="block h-[0.04em]" aria-hidden="true" />}
            {lineGroups.map((group, groupIndex) => {
              const sequenceIndex = chunkedLines
                .slice(0, lineIndex)
                .reduce((total, groups) => total + groups.length, 0) + groupIndex;

              const groupText = groupIndex < lineGroups.length - 1 ? `${group} ` : group;

              return (
                <span key={`${group}-${groupIndex}`} className="relative inline-block whitespace-pre">
                  <span className="inline-block whitespace-pre opacity-[0.14] blur-[1.5px]">
                    {groupText}
                  </span>

                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 text-current"
                    initial={{
                      opacity: 0,
                      filter: "blur(1.5px)",
                      WebkitMaskSize: "0% 100%",
                      maskSize: "0% 100%",
                    }}
                    animate={hasStarted ? {
                      opacity: 1,
                      filter: "blur(0px)",
                      WebkitMaskSize: "200% 100%",
                      maskSize: "200% 100%",
                    } : {
                      opacity: 0,
                      filter: "blur(1.5px)",
                      WebkitMaskSize: "0% 100%",
                      maskSize: "0% 100%",
                    }}
                    transition={{
                      opacity: {
                        duration: 0.9,
                        delay: sequenceIndex * 0.25,
                        ease: [0.16, 1, 0.3, 1],
                      },
                      filter: {
                        duration: 0.9,
                        delay: sequenceIndex * 0.25,
                        ease: [0.16, 1, 0.3, 1],
                      },
                      WebkitMaskSize: {
                        duration: 1.3,
                        delay: sequenceIndex * 0.25,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      maskSize: {
                        duration: 1.3,
                        delay: sequenceIndex * 0.25,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.88) 84%, rgba(0,0,0,0.45) 94%, rgba(0,0,0,0.12) 98%, transparent 100%)",
                      maskImage:
                        "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.88) 84%, rgba(0,0,0,0.45) 94%, rgba(0,0,0,0.12) 98%, transparent 100%)",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                    }}
                  >
                    {groupText}
                  </motion.span>
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </Component>
  );
}

export default AnimatedHeadline;
