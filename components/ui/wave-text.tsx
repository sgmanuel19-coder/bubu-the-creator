"use client";

import { motion } from "framer-motion";

interface WaveTextProps {
  text: string;
  className?: string;
}

function WaveText({ text = "", className = "" }: WaveTextProps) {
  return (
    <motion.span
      className={`inline-block cursor-default ${className}`}
      whileHover="hover"
      initial="initial"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            initial: { y: 0, scale: 1 },
            hover: {
              y: -5,
              scale: 1.15,
              transition: {
                type: "spring",
                stiffness: 320,
                damping: 14,
                delay: index * 0.028,
              },
            },
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export { WaveText };
