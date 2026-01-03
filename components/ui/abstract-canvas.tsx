"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AbstractCanvasProps {
  className?: string;
  theme?: "corporate" | "forensic";
}

export function AbstractCanvas({ className, theme = "corporate" }: AbstractCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Vertical lines pattern similar to Braintrust
    const lines: Array<{
      x: number;
      height: number;
      speed: number;
      opacity: number;
      width: number;
      color: string;
    }> = [];

    const numLines = 40;
    const colors = theme === "corporate" 
      ? ["#4caf50", "#81c784", "#a5d6a7", "#c8e6c9"]
      : ["#ff0000", "#cc0000", "#990000", "#660000"];

    for (let i = 0; i < numLines; i++) {
      lines.push({
        x: (canvas.width / numLines) * i + Math.random() * 20,
        height: Math.random() * canvas.height * 0.8 + 50,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.1,
        width: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;
    let offset = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      offset += 0.2;

      lines.forEach((line, index) => {
        const yOffset = (offset * line.speed) % (canvas.height + line.height);
        const y = yOffset - line.height;

        // Draw glowing line
        ctx.save();
        ctx.globalAlpha = line.opacity;

        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = line.color;

        // Main line
        ctx.fillStyle = line.color;
        ctx.fillRect(line.x, y, line.width, line.height);

        // Accent highlights
        if (theme === "forensic" && Math.random() > 0.95) {
          ctx.fillStyle = "#ff6b6b";
          ctx.fillRect(line.x, y + Math.random() * line.height, line.width, 5);
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
    />
  );
}