"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface RainEffectProps {
  className?: string;
  intensity?: number; // 0 to 1
  color?: string;
  speed?: number;
}

interface Raindrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

export function RainEffect({ 
  className, 
  intensity = 0.3,
  color = "rgba(200, 220, 255, 0.5)",
  speed = 1
}: RainEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Calculate number of raindrops based on intensity
    const dropCount = Math.floor(intensity * 500);
    const raindrops: Raindrop[] = [];

    // Initialize raindrops
    for (let i = 0; i < dropCount; i++) {
      raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 5 + 3,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    // Lightning effect variables
    let lightningTimeout: ReturnType<typeof setTimeout> | null = null;
    let showLightning = false;
    let lightningOpacity = 0;

    const triggerLightning = () => {
      if (intensity > 0.8) {
        showLightning = true;
        lightningOpacity = 0.3;
        setTimeout(() => {
          showLightning = false;
        }, 100);
        
        // Schedule next lightning randomly
        lightningTimeout = setTimeout(triggerLightning, Math.random() * 5000 + 3000);
      }
    };

    // Start lightning cycle if high intensity
    if (intensity > 0.8) {
      triggerLightning();
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw lightning flash
      if (showLightning && lightningOpacity > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${lightningOpacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        lightningOpacity *= 0.9;
      }

      // Draw and update raindrops
      raindrops.forEach((drop) => {
        ctx.strokeStyle = color.replace(/[\d.]+\)/, `${drop.opacity})`);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        // Update position
        drop.y += drop.speed * speed;
        drop.x += 0.5 * speed;

        // Reset if off screen
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
        if (drop.x > canvas.width) {
          drop.x = 0;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
      if (lightningTimeout) clearTimeout(lightningTimeout);
    };
  }, [intensity, color, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none fixed inset-0 z-0", className)}
    />
  );
}