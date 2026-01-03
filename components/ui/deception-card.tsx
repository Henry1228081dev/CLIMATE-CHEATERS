"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TextScramble } from "./text-scramble";
import { cn } from "@/lib/utils";
import type { Company } from "@/data/corporateGreenwashing";

interface DeceptionCardProps {
  company: Company;
  index: number;
  isVisible?: boolean;
}

export const DeceptionCard: React.FC<DeceptionCardProps> = ({ company, index, isVisible = true }) => {
  const isHighDeception = company.deceptionScore > 90;
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={
        isSelected 
          ? { opacity: 0, scale: 1.1, filter: "blur(4px)" }
          : isVisible
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } 
          : { opacity: 0, y: 50 }
      }
      whileHover={!isSelected ? { 
        y: -10, 
        scale: 1.02,
        zIndex: 10,
        transition: { duration: 0.3 }
      } : {}}
      transition={{
        duration: isSelected ? 0.3 : 0.5,
        delay: isSelected ? 0 : index * 0.05,
        ease: "easeOut",
      }}
      onClick={() => {
        setIsSelected(true);
        setTimeout(() => setIsSelected(false), 1200);
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer h-full"
    >
      <div
        className={cn(
          "relative bg-black/80 backdrop-blur-md border border-white/10 p-1 transition-all duration-300 group-hover:bg-black/90 h-full flex flex-col justify-between overflow-hidden",
          "before:absolute before:inset-0 before:bg-[url('/grid.svg')] before:opacity-5",
          isHighDeception && "shadow-[0_0_30px_rgba(239,68,68,0.1)] hover:shadow-[0_0_50px_rgba(239,68,68,0.4)] hover:border-red-500/50"
        )}
      >
        {/* Top Border Accent */}
        <div className={cn(
          "absolute top-0 left-0 right-0 h-1 transition-all duration-300",
          isHighDeception ? "bg-red-600 group-hover:h-1.5" : "bg-green-600 group-hover:h-1.5"
        )} />

        <div className="flex-1">
          {/* Header Section */}
          <div className="p-6 border-b border-white/5 space-y-2">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                  <div className="text-[10px] text-gray-500 font-mono tracking-widest">SUBJECT ID: {company.id.toUpperCase()}</div>
                  <h3 className="text-xl font-bold text-white tracking-tight uppercase leading-none font-tactical">
                      {isHovered ? (
                          <TextScramble text={company.company} speed={30} scrambleSpeed={15} />
                      ) : (
                          company.company
                      )}
                  </h3>
              </div>
              <div className={cn(
                  "px-2 py-1 text-xs font-bold font-mono border whitespace-nowrap",
                  isHighDeception ? "text-red-500 border-red-500/50 bg-red-950/30" : "text-green-500 border-green-500/50 bg-green-950/30"
              )}>
                  SCORE: {company.deceptionScore}
              </div>
            </div>
            <div className="text-xs text-gray-400 font-mono">SECTOR: {company.sector.toUpperCase()}</div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-6">
            {/* Claim Block */}
            <div className="relative pl-3 border-l-2 border-green-500/30">
                <div className="text-[9px] uppercase tracking-widest text-green-600 font-bold mb-1">Stated Mission</div>
                <p className="text-gray-300 text-sm italic font-medium leading-relaxed">"{company.claim}"</p>
            </div>

            {/* Reality Block */}
            <div className="relative pl-3 border-l-2 border-red-500/50 bg-red-950/10 py-2 pr-2">
                <div className="text-[9px] uppercase tracking-widest text-red-500 font-bold mb-1">Forensic Analysis</div>
                <p className="text-red-100/90 text-sm leading-relaxed">{company.evidence}</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 pt-2">
                <MetricBox label="AQI" value={company.pollutionData.aqi} color="text-red-400" />
                <MetricBox label="CO2 (PPM)" value={company.pollutionData.co2ppm} color="text-orange-400" />
                <MetricBox label="WASTE" value={company.pollutionData.wasteDischarge.split(' ')[0]} unit={company.pollutionData.wasteDischarge.split(' ')[1]} color="text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2 flex justify-between items-center text-[10px] text-gray-600 font-mono uppercase mt-auto">
            <span>LOC: {company.hqLocation.label}</span>
            <span className={cn(isHighDeception ? "text-red-900" : "text-green-900")}>/// END OF FILE ///</span>
        </div>
      </div>
      
      {/* Decorative "CONFIDENTIAL" Stamp Overlay on Hover */}
      {isHighDeception && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-red-500/10 text-red-500/10 text-4xl font-black uppercase tracking-widest -rotate-12 pointer-events-none p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20 backdrop-blur-[1px]">
             VERIFIED
          </div>
      )}
    </motion.div>
  );
}

function MetricBox({ label, value, unit, color }: { label: string, value: string | number, unit?: string, color: string }) {
    return (
        <div className="bg-white/5 p-2 rounded border border-white/5 flex flex-col items-center justify-center text-center">
            <span className="text-[8px] text-gray-500 font-mono mb-1">{label}</span>
            <span className={cn("text-lg font-bold tabular-nums leading-none", color)}>{value}</span>
            {unit && <span className="text-[8px] text-gray-500 truncate w-full">{unit}</span>}
        </div>
    )
}