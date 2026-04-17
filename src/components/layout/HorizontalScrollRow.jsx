import React from "react";
import { motion } from "framer-motion";

export default function HorizontalScrollRow({
  children,
  className = "",
  rowClassName = "",
  gap = "gap-6",
  itemClassName = "",
}) {
  const items = React.Children.toArray(children);

  return (
    <div className={`overflow-x-auto scroll-smooth no-scrollbar ${className}`.trim()}>
      <div className={`flex snap-x snap-mandatory ${gap} ${rowClassName}`.trim()}>
        {items.map((child, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`snap-start flex-shrink-0 ${itemClassName}`.trim()}
          >
            {child}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
