"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ClimateToggleProps {
  view: "corporate" | "forensic";
  onToggle: () => void;
}

export function ClimateToggle({ view, onToggle }: ClimateToggleProps) {
  const isForensic = view === "forensic";

  return (
    <div className="fixed top-8 right-8 z-50">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <label className="cursor-pointer block relative group">
          <input 
            type="checkbox" 
            className="hidden" 
            checked={isForensic} 
            onChange={onToggle} 
          />
          
          <div 
            className={cn(
              "w-[200px] h-[80px] rounded-[40px] relative transition-all duration-500 border backdrop-blur-md shadow-2xl",
              isForensic 
                ? "bg-black/60 border-red-500/30 shadow-red-900/20" 
                : "bg-white/60 border-green-500/30 shadow-green-900/10"
            )}
            style={{
               boxShadow: isForensic 
                 ? "0 0 30px rgba(220, 38, 38, 0.15), inset 0 0 20px rgba(0,0,0,0.5)"
                 : "0 0 30px rgba(76, 175, 80, 0.15), inset 0 0 20px rgba(255,255,255,0.5)"
            }}
          >
            {/* Toggle Circle */}
            <div 
              className={cn(
                "w-[64px] h-[64px] rounded-full absolute top-1/2 -translate-y-1/2 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) flex items-center justify-center text-2xl shadow-lg z-10",
                isForensic
                   ? "left-[calc(100%-72px)] bg-gradient-to-br from-red-600 to-red-900 text-white shadow-red-900/40"
                   : "left-[8px] bg-gradient-to-br from-white to-green-100 text-green-700 shadow-black/5"
              )}
            >
              {isForensic ? "💀" : "🌱"}
            </div>

            {/* Labels */}
            <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
               <span 
                 className={cn(
                   "text-xs font-bold uppercase tracking-widest transition-all duration-300",
                   !isForensic ? "opacity-100 text-green-800 translate-x-16" : "opacity-0 -translate-x-4"
                 )}
               >
                 Green
               </span>
               <span 
                 className={cn(
                   "text-xs font-bold uppercase tracking-widest transition-all duration-300",
                   isForensic ? "opacity-100 text-red-200 -translate-x-16" : "opacity-0 translate-x-4"
                 )}
               >
                 Truth
               </span>
            </div>
          </div>
        </label>
      </motion.div>
    </div>
  );
}