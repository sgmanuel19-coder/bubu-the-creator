"use client";
import { useEffect, useState } from "react";

export function Typewriter({
  text,
  className,
  style,
  delay = 0,
  speed = 55,
  showCursor = true,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  speed?: number;
  showCursor?: boolean;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setDone(false);

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return (
    <span className={className} style={style}>
      {displayed}
      {showCursor && (
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: "3px",
            height: "0.85em",
            marginLeft: "4px",
            verticalAlign: "middle",
            background: "currentColor",
            borderRadius: "1px",
            animation: done ? "cursor-blink 1.1s step-start infinite" : "none",
            opacity: done ? undefined : 1,
          }}
        />
      )}
    </span>
  );
}
