"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollIndicatorProps {
  className?: string;
  view: "corporate" | "forensic";
}

export function ScrollIndicator({ className, view }: ScrollIndicatorProps) {
  const { scrollYProgress } = useScroll();

  return (
    <div className={cn("fixed bottom-8 left-1/2 -translate-x-1/2 z-40", className)}>
      <div className="flex flex-col items-center gap-3">
        {/* Progress Circle */}
        <div className="relative w-16 h-16">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className={view === "corporate" ? "text-green-300/30" : "text-red-500/30"}
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className={view === "corporate" ? "text-green-600" : "text-red-500"}
              style={{
                pathLength: scrollYProgress,
              }}
              strokeLinecap="round"
              strokeDasharray="0 1"
            />
          </svg>
          <div
            className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${
              view === "corporate" ? "text-green-800" : "text-red-500"
            }`}
          >
            <motion.span style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}>
              ↓
            </motion.span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`text-xs font-semibold uppercase tracking-wider ${
            view === "corporate" ? "text-green-700" : "text-red-500"
          }`}
        >
          Scroll
        </motion.div>
      </div>
    </div>
  );
}