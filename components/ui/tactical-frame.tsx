"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { audioController } from "@/lib/audio-controller";

interface TacticalFrameProps {
  children?: React.ReactNode;
  view: "corporate" | "forensic";
  title?: string;
  className?: string;
}

export function TacticalFrame({ children, view, title, className }: TacticalFrameProps) {
  const isForensic = view === "forensic";
  const [coords, setCoords] = useState("34.0522° N, 118.2437° W");
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
        audioController.playSFX("scan");
    }
  }, [isInView]);

  // Simulate updating coordinates
  useEffect(() => {
    const interval = setInterval(() => {
      setCoords(`${(Math.random() * 90).toFixed(4)}° N, ${(Math.random() * 180).toFixed(4)}° W`);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const borderColor = isForensic ? "border-red-500/30" : "border-green-500/30";
  const accentColor = isForensic ? "bg-red-500" : "bg-green-500";
  const textColor = isForensic ? "text-red-500" : "text-green-500";

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn("relative p-6 md:p-10", className)}
    >
      {/* Corner Brackets */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left */}
        <div className={cn("absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 transition-colors duration-500", borderColor)} />
        {/* Top Right */}
        <div className={cn("absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 transition-colors duration-500", borderColor)} />
        {/* Bottom Left */}
        <div className={cn("absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 transition-colors duration-500", borderColor)} />
        {/* Bottom Right */}
        <div className={cn("absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 transition-colors duration-500", borderColor)} />
        
        {/* Center Crosshairs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 flex justify-center items-center">
             <div className={cn("w-1 h-2", accentColor)} />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 flex justify-center items-center">
             <div className={cn("w-1 h-2", accentColor)} />
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-16 w-1 flex justify-center items-center">
             <div className={cn("h-1 w-2", accentColor)} />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-16 w-1 flex justify-center items-center">
             <div className={cn("h-1 w-2", accentColor)} />
        </div>
      </div>

      {/* Header Info */}
      <div className="absolute top-2 left-10 right-10 flex justify-between items-center text-[10px] font-mono tracking-widest opacity-60 pointer-events-none">
        <span className={cn("transition-colors duration-500", textColor)}>
          {title ? `// SECTOR: ${title.toUpperCase()}` : "// SECTOR: UNKNOWN"}
        </span>
        <span className={cn("transition-colors duration-500", textColor)}>
           LOC: {coords}
        </span>
      </div>

      {/* Side Data Lines */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 space-y-1 pointer-events-none opacity-30">
        {[...Array(10)].map((_, i) => (
           <div key={i} className={cn("w-1 h-1 rounded-full", accentColor)} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Scanline Overlay (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,6px_100%] pointer-events-none z-0 opacity-50 mix-blend-overlay" />
    </motion.div>
  );
}