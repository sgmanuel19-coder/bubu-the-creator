"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  gradientColors?: string;
  gradientAnimationDuration?: number;
  className?: string;
  textClassName?: string;
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      gradientColors = "linear-gradient(90deg, #00ff87, #cc44ff, #00ff87)",
      gradientAnimationDuration = 2,
      className,
      textClassName,
      ...props
    },
    ref
  ) => {
    const textVariants: Variants = {
      initial: { backgroundPosition: "0 0" },
      animate: {
        backgroundPosition: "100% 0",
        transition: {
          duration: gradientAnimationDuration,
          repeat: Infinity,
          repeatType: "reverse" as const,
        },
      },
    };

    return (
      <div
        ref={ref}
        className={`flex justify-center items-center ${className || ""}`}
        {...props}
      >
        <motion.span
          className={textClassName}
          style={{
            background: gradientColors,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          {text}
        </motion.span>
      </div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
