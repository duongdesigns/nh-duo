import { motion, useReducedMotion } from "framer-motion";

const buttonTransition = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1],
};

function MotionButton({ children, className = "", ...props }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      className={className}
      whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.015 }}
      whileTap={prefersReducedMotion ? undefined : { y: 0, scale: 0.985 }}
      transition={buttonTransition}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default MotionButton;
