import React, { useEffect, useState, useRef } from "react";

interface TextScrambleProps {
  text: string;
  speed?: number;
  scrambleSpeed?: number;
  className?: string;
}

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function TextScramble({ text, speed = 50, scrambleSpeed = 30, className }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 2; // Scramble speed control
    }, scrambleSpeed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, scrambleSpeed]);

  return <span className={className}>{displayText}</span>;
}