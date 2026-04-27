const defaultColors = {
  line: "240 240 240",
  accent: "214 161 31",
  signal: "242 193 78",
};

const primaryPaths = [
  "M-260 128C-70 210 84 230 262 158C480 70 598 6 792 78C980 148 948 278 1130 320C1308 362 1444 244 1700 304",
  "M-250 444C-54 344 136 424 318 354C514 279 596 202 780 244C934 278 996 388 1162 374C1338 360 1472 268 1704 410",
  "M-260 768C-46 642 132 752 334 650C500 566 534 486 718 500C906 514 984 628 1166 580C1342 534 1458 442 1702 544",
];

const accentPaths = [
  "M-220 250C-20 286 132 160 330 210C508 254 562 362 736 354C918 346 1004 246 1182 300C1376 358 1488 448 1684 374",
];

const signalPaths = [
  "M-180 596C48 546 182 470 396 520C602 568 704 684 928 626C1136 572 1280 464 1648 514",
];

function ContourMap({ className, paths, signal = false }) {
  return (
    <svg
      className={className}
      viewBox="-260 0 1960 920"
      preserveAspectRatio="xMidYMid slice"
    >
      {paths.map((path) => (
        <path
          key={`base-${path}`}
          className="background-motion__line"
          d={path}
          pathLength="1"
        />
      ))}
      {paths.map((path, index) => (
        <path
          key={`trace-${path}`}
          className={signal ? "background-motion__signal" : "background-motion__trace"}
          d={path}
          pathLength="1"
          style={{ "--trace-delay": signal ? `${index * -7}s` : `${index * -3.8}s` }}
        />
      ))}
    </svg>
  );
}

function BackgroundMotion({
  enabled = true,
  colors = defaultColors,
  intensity = 1,
}) {
  if (!enabled) {
    return null;
  }

  const safeIntensity = Math.min(Math.max(intensity, 0), 1.4);

  return (
    <div
      aria-hidden="true"
      className="background-motion"
      style={{
        "--motion-line": colors.line,
        "--motion-accent": colors.accent,
        "--motion-signal": colors.signal,
        "--motion-strength": safeIntensity,
      }}
    >
      <ContourMap
        className="background-motion__map background-motion__map--slow"
        paths={primaryPaths}
      />
      <ContourMap
        className="background-motion__map background-motion__map--accent"
        paths={accentPaths}
      />
      <ContourMap
        className="background-motion__map background-motion__map--signal"
        paths={signalPaths}
        signal
      />
    </div>
  );
}

export default BackgroundMotion;
