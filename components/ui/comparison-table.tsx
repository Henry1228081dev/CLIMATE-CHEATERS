"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ComparisonData {
  metric: string;
  claimed: string;
  actual: string;
  trend: "up" | "down" | "neutral";
}

const comparisonData: ComparisonData[] = [
  {
    metric: "CO₂ Emissions (2019-2024)",
    claimed: "−30% reduction achieved",
    actual: "+18.4% net increase",
    trend: "up",
  },
  {
    metric: "Renewable Energy Portfolio",
    claimed: "Powers 80% of facilities",
    actual: "12.7% actual renewable usage",
    trend: "down",
  },
  {
    metric: "Recycled Content Usage",
    claimed: "≥50% post-consumer material",
    actual: "8.2% verified recycled content",
    trend: "down",
  },
  {
    metric: "Water Consumption (annual)",
    claimed: "40% less vs 2018 baseline",
    actual: "4.8% marginal decrease",
    trend: "down",
  },
  {
    metric: "Climate Policy Lobbying",
    claimed: "Zero anti-climate spending",
    actual: "$127.3M in opposing legislation",
    trend: "up",
  },
  {
    metric: "Supply Chain Emissions",
    claimed: "Scope 3 fully monitored",
    actual: "89% untracked/unreported",
    trend: "up",
  },
];

export function ComparisonTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="border border-red-500/30 bg-black/60 backdrop-blur-sm relative">
         {/* Corner Accents */}
         <div className="absolute top-0 left-0 w-2 h-2 bg-red-500" />
         <div className="absolute top-0 right-0 w-2 h-2 bg-red-500" />
         <div className="absolute bottom-0 left-0 w-2 h-2 bg-red-500" />
         <div className="absolute bottom-0 right-0 w-2 h-2 bg-red-500" />

        {/* Header Section */}
        <div className="p-6 border-b border-red-500/30 flex items-center justify-between bg-red-950/10">
            <div className="flex flex-col">
                <div className="text-[10px] text-red-500 font-mono tracking-widest mb-1">FILE: VS_ANALYSIS_001</div>
                <h3 className="text-2xl font-black text-white tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    Forensic Verification Matrix
                </h3>
            </div>
             <div className="flex gap-4 text-xs font-mono">
                <div className="px-2 py-1 border border-red-500/50 text-red-400 bg-red-500/10">
                    LIVE_FEED
                </div>
                <div className="px-2 py-1 border border-gray-600 text-gray-400">
                    ENCRYPTED
                </div>
             </div>
        </div>

        {/* Tactical Grid */}
        <div className="w-full text-left border-collapse">
            {/* Table Head */}
            <div className="grid grid-cols-12 border-b border-red-500/30 bg-black">
                <div className="col-span-4 p-3 text-[10px] font-bold uppercase tracking-widest text-gray-500 border-r border-red-500/10">Metric Analysis</div>
                <div className="col-span-3 p-3 text-[10px] font-bold uppercase tracking-widest text-blue-500/70 border-r border-red-500/10">Corporate Claim</div>
                <div className="col-span-3 p-3 text-[10px] font-bold uppercase tracking-widest text-red-500/70 border-r border-red-500/10">Forensic Reality</div>
                <div className="col-span-2 p-3 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">Delta</div>
            </div>

            {/* Table Body */}
            <div>
              {comparisonData.map((row, index) => (
                <motion.div 
                  key={row.metric}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="grid grid-cols-12 border-b border-red-500/10 hover:bg-red-500/5 transition-colors group"
                >
                  <div className="col-span-4 p-4 border-r border-red-500/10 flex items-center gap-3">
                       <span className="text-[10px] font-mono text-gray-600 group-hover:text-red-500 transition-colors">0{index + 1}</span>
                       <span className="text-sm font-bold text-gray-300 font-mono uppercase">{row.metric}</span>
                  </div>
                  
                  <div className="col-span-3 p-4 border-r border-red-500/10 flex items-center">
                       <span className="text-xs text-blue-300 font-mono bg-blue-900/10 px-2 py-1 border border-blue-500/20 w-full truncate">
                          {row.claimed}
                       </span>
                  </div>

                  <div className="col-span-3 p-4 border-r border-red-500/10 flex items-center relative overflow-hidden">
                       <div className="absolute inset-0 bg-red-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                       <span className="text-xs text-red-400 font-mono font-bold uppercase relative z-10 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]">
                          {row.actual}
                       </span>
                  </div>

                  <div className="col-span-2 p-4 flex items-center justify-end">
                    <div className={cn(
                      "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-2 py-1 border",
                      row.trend === "up" 
                        ? "text-red-500 border-red-500 bg-red-500/10 shadow-[0_0_10px_rgba(220,38,38,0.2)]" 
                        : "text-orange-500 border-orange-500 bg-orange-500/10"
                    )}>
                      {row.trend === "up" ? "CRITICAL" : "FAIL"}
                      <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", row.trend === "up" ? "bg-red-500" : "bg-orange-500")} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
        </div>
      </div>
    </motion.div>
  );
}