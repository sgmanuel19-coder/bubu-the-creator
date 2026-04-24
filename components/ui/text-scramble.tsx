"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?";

export function TextScramble({
  text,
  className,
  style,
  trigger = true,
  delay = 0,
  speed = 2,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  trigger?: boolean;
  delay?: number;
  speed?: number;
}) {
  const [display, setDisplay] = useState(() => text.replace(/[^ \n]/g, CHARS[0]));
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    const totalFrames = Math.ceil((text.replace(/ /g, "").length / speed) * 5);

    const timeout = setTimeout(() => {
      const animate = () => {
        frame++;
        const resolved = Math.floor((frame / totalFrames) * text.length);
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (char === " " || char === "\n") return char;
              if (i < resolved) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        if (frame < totalFrames) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setDisplay(text);
        }
      };
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [text, trigger, delay, speed]);

  return (
    <span className={className} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {display}
    </span>
  );
}
