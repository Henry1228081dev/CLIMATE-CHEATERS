"use client";

import React from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import type { Company } from "@/data/corporateGreenwashing";

interface EmissionsChartProps {
  company: Company;
}

export const EmissionsChart: React.FC<EmissionsChartProps> = ({ company }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="bg-black/80 border border-red-500/20 p-6 relative overflow-hidden group">
         {/* Background Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
         
         {/* Header */}
         <div className="flex justify-between items-end mb-6 relative z-10 border-b border-red-500/20 pb-2">
            <div>
               <div className="text-red-500 text-[10px] font-mono tracking-widest mb-1">TARGET ANALYTICS</div>
               <h3 className="text-white text-lg font-bold font-mono uppercase">{company.company}</h3>
            </div>
            <div className="text-right">
                <div className="text-red-400 font-mono text-xs">EMISSIONS TREND</div>
                <div className="text-red-500 font-black text-xl">CRITICAL</div>
            </div>
         </div>

         {/* Chart Area */}
         <div className="h-[200px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={company.emissions}>
                <defs>
                  <linearGradient id={`gradient-${company.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ef444420" vertical={false} />
                <XAxis 
                  dataKey="year" 
                  stroke="#ef444460"
                  style={{ fontSize: "10px", fontFamily: "monospace" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#ef444460"
                  style={{ fontSize: "10px", fontFamily: "monospace" }}
                  tickLine={false}
                  axisLine={false}
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#000",
                    border: "1px solid #ef4444",
                    color: "#ef4444",
                    fontFamily: "monospace",
                    fontSize: "12px"
                  }}
                  itemStyle={{ color: "#fff" }}
                  cursor={{ stroke: "#ef4444", strokeWidth: 1, strokeDasharray: "4 4" }}
                />
                <Area
                  type="monotone"
                  dataKey="co2"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill={`url(#gradient-${company.id})`}
                  dot={{ fill: "#000", stroke: "#ef4444", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#fff", stroke: "#ef4444" }}
                  isAnimationActive={true}
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
         </div>

         {/* Decorative Corners */}
         <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-500" />
         <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-500" />
         <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-500" />
         <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-500" />
      </div>
    </motion.div>
  );
}