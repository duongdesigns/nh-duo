import { Children } from "react";

export default function HorizontalScrollRow({
  children,
  className = "",
  rowClassName = "",
  gap = "gap-6",
  itemClassName = "",
}) {
  const items = Children.toArray(children);

  return (
    <div className={`overflow-x-auto scroll-smooth no-scrollbar ${className}`.trim()}>
      <div className={`flex snap-x snap-mandatory ${gap} ${rowClassName}`.trim()}>
        {items.map((child, index) => (
          <div
            key={index}
            className={`snap-start flex-shrink-0 ${itemClassName}`.trim()}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
