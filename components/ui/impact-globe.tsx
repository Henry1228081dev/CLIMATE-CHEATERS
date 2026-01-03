"use client";

import createGlobe, { type COBEOptions } from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Company } from "@/data/corporateGreenwashing";

const DEFAULT_CONFIG: Partial<COBEOptions> = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16000,
  baseColor: [0.3, 0.3, 0.3],
  markerColor: [1, 0.5, 0.5],
  glowColor: [1, 1, 1],
  markers: [],
};

interface ImpactGlobeProps {
  className?: string;
  companies?: Company[];
  view?: "corporate" | "forensic";
  onMarkerClick?: (company: Company) => void;
  triggerAnimation?: boolean;
}

export function ImpactGlobe({ 
  className, 
  companies = [],
  view = "corporate",
  onMarkerClick,
  triggerAnimation = true
}: ImpactGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeInstanceRef = useRef<any>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [scanTarget, setScanTarget] = useState<Company | null>(null);

  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const isInViewRef = useRef(false);
  
  useEffect(() => {
    isInViewRef.current = isInView;
  }, [isInView]);

  // Scanner Effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isHovered && companies.length > 0) {
        interval = setInterval(() => {
            const random = companies[Math.floor(Math.random() * companies.length)];
            setScanTarget(random);
        }, 1500);
        // Set initial
        if (!scanTarget) setScanTarget(companies[0]);
    } else {
        setScanTarget(null);
    }
    return () => clearInterval(interval);
  }, [isHovered, companies]);

  // Configuration based on view
  const isForensic = view === "forensic";

  const configRef = useRef({
    baseColor: [0.05, 0.2, 0.1],
    markerColor: [0.5, 1, 0.5],
    glowColor: [0.1, 0.3, 0.15],
    mapBrightness: 8
  });

  useEffect(() => {
    if (isForensic) {
        configRef.current = {
            baseColor: [0.2, 0.05, 0.05],
            markerColor: [1, 0.2, 0.2],
            glowColor: [0.5, 0, 0],
            mapBrightness: 2.0
        };
    } else {
        configRef.current = {
            baseColor: [0.05, 0.2, 0.1],
            markerColor: [0.5, 1, 0.5],
            glowColor: [0.1, 0.3, 0.15],
            mapBrightness: 8
        };
    }
  }, [isForensic]);

  const targetMarkersRef = useRef<any[]>([]);
  
  useEffect(() => {
    targetMarkersRef.current = companies.map((company) => ({
      location: [company.hqLocation.lat, company.hqLocation.lng] as [number, number],
      size: isForensic 
        ? 0.03 + (company.deceptionScore / 100) * 0.05 
        : 0.05,
    }));
  }, [companies, isForensic]);

  const animationProgressRef = useRef(0);

  const onRender = useCallback((state: Record<string, any>) => {
    // Rotation speed
    phiRef.current += 0.002;
    state.phi = phiRef.current;
    state.width = widthRef.current * 2;
    state.height = widthRef.current * 2;

    // Apply mutable config
    state.baseColor = configRef.current.baseColor;
    state.markerColor = configRef.current.markerColor;
    state.glowColor = configRef.current.glowColor;
    state.mapBrightness = configRef.current.mapBrightness;

    // Physics-based Spring Logic for Markers
    if (triggerAnimation && isInViewRef.current && animationProgressRef.current < 1) {
      animationProgressRef.current += 0.015; // Slower increment for weightier feel
      if (animationProgressRef.current > 1) animationProgressRef.current = 1;
    } else if (!triggerAnimation) {
       animationProgressRef.current = 0;
    }

    const t = animationProgressRef.current;
    // Elastic Bounce Out: Overshoots slightly and settles
    // Math: c4 * (t - 1)^2 * ((c4 + 1) * (t - 1) + c4) + 1 where c4 = (2 * PI) / 3
    // Simplified spring simulation:
    const ease = t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1;

    state.markers = targetMarkersRef.current.map(m => ({
      location: m.location,
      size: m.size * ease
    }));
  }, [triggerAnimation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      widthRef.current = canvas.offsetWidth;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let hasLoaded = false;

    const globe = createGlobe(canvas, {
      ...DEFAULT_CONFIG,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        onRender(state);
        if (!hasLoaded) {
          hasLoaded = true;
          setIsLoading(false);
        }
      },
    } as COBEOptions);

    globeInstanceRef.current = globe;

    return () => {
      globe.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, [onRender]); 

  return (
    <div 
        ref={containerRef} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn("relative aspect-square w-full max-w-2xl mx-auto flex items-center justify-center cursor-crosshair", className)}
    >
       <AnimatePresence mode="popLayout">
          {isInView && (
             <>
                {/* Inner Circle Ring */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                    animate={{ opacity: 0.3, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full border border-dashed animate-[spin_40s_linear_infinite]",
                    isForensic ? "border-red-500" : "border-green-500"
                )} />
                
                {/* Outer Brackets */}
                <motion.div 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%]"
                >
                    <div className={cn("absolute top-0 left-0 w-8 h-8 border-t border-l", isForensic ? "border-red-500" : "border-green-500")} />
                    <div className={cn("absolute top-0 right-0 w-8 h-8 border-t border-r", isForensic ? "border-red-500" : "border-green-500")} />
                    <div className={cn("absolute bottom-0 left-0 w-8 h-8 border-b border-l", isForensic ? "border-red-500" : "border-green-500")} />
                    <div className={cn("absolute bottom-0 right-0 w-8 h-8 border-b border-r", isForensic ? "border-red-500" : "border-green-500")} />
                </motion.div>

                {/* Scanning Line */}
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 0.5 }}
                   className="absolute inset-0 overflow-hidden rounded-full pointer-events-none"
                >
                    <div className={cn(
                        "absolute left-0 right-0 h-px shadow-[0_0_20px_2px_currentColor] animate-[scan_3s_linear_infinite]",
                        isForensic ? "bg-red-500 text-red-500" : "bg-green-500 text-green-500"
                    )} />
                </motion.div>
             </>
          )}
      </AnimatePresence>

      <canvas
        ref={canvasRef}
        className={cn(
          "size-full [contain:layout_paint_size] transition-opacity duration-1000 z-10",
          isLoading ? "opacity-0" : "opacity-100"
        )}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className={cn(
            "w-12 h-12 border-4 rounded-full animate-spin",
            isForensic 
              ? "border-red-500/30 border-t-red-500" 
              : "border-green-500/30 border-t-green-500"
          )} />
        </div>
      )}
      
      {/* Legend overlay */}
      <AnimatePresence>
        {isInView && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-xs font-mono z-30 pointer-events-none"
            >
                <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full animate-pulse", isForensic ? "bg-red-500" : "bg-green-500")} />
                <span className={isForensic ? "text-red-400 font-bold" : "text-green-400 font-bold"}>
                    {isForensic ? "THREAT DETECTED" : "SYSTEM ONLINE"}
                </span>
                </div>
                <div className={isForensic ? "text-red-500/70" : "text-green-500/70"}>
                    TARGETS: {companies.length}
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* TACTICAL SCANNER OVERLAY ON HOVER */}
      <AnimatePresence>
         {isHovered && scanTarget && (
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
             >
                 <div className="bg-black/80 backdrop-blur border border-white/20 p-4 min-w-[200px] text-center space-y-2 relative">
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-white" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-white" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white" />
                    
                    <div className="text-[10px] text-red-500 font-mono tracking-widest animate-pulse mb-1">
                        SATELLITE LOCK ACQUIRED
                    </div>
                    <div className="text-xl font-black text-white uppercase tracking-tight">
                        {scanTarget.company}
                    </div>
                    <div className="flex justify-between text-xs font-mono text-gray-400 border-t border-white/10 pt-2">
                        <span>{scanTarget.hqLocation.label}</span>
                        <span className="text-red-400">SCORE: {scanTarget.deceptionScore}</span>
                    </div>
                 </div>
             </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}
