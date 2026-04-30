"use client";

import { motion } from "framer-motion";

interface ShiningTextProps {
  text: string;
  className?: string;
  gradient?: string;
  duration?: number;
}

export function ShiningText({
  text,
  className = "",
  gradient = "linear-gradient(110deg, #a8c4ff 10%, #ffffff 38%, #cddeff 52%, #a8c4ff 72%)",
  duration = 2.4,
}: ShiningTextProps) {
  return (
    <motion.span
      className={`bg-clip-text text-transparent inline-block ${className}`}
      style={{ backgroundImage: gradient, backgroundSize: "200% 100%" }}
      initial={{ backgroundPosition: "200% 0" }}
      animate={{ backgroundPosition: "-200% 0" }}
      transition={{ repeat: Infinity, duration, ease: "linear" }}
    >
      {text}
    </motion.span>
  );
}
