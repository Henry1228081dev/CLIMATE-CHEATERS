"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TimelineEvent {
  year: number;
  beforeTemp: number;
  afterTemp: number;
  subtitle: string;
  description: string;
  corporateAction: string;
}

const timelineData: TimelineEvent[] = [
  {
    year: 2015,
    beforeTemp: 1.1,
    afterTemp: 1.1,
    subtitle: 'After Corporate "Solutions"',
    description: "The world before corporate greenwashing took hold.",
    corporateAction: "Paris Agreement signed - corporations pledge sustainability",
  },
  {
    year: 2018,
    beforeTemp: 1.2,
    afterTemp: 1.8,
    subtitle: 'After Corporate "Solutions"',
    description: "As 'green' promises multiplied, so did emissions.",
    corporateAction: "Record year for corporate sustainability pledges",
  },
  {
    year: 2020,
    beforeTemp: 1.3,
    afterTemp: 2.4,
    subtitle: 'After Corporate "Solutions"',
    description: "The pandemic pause revealed the truth—then they accelerated.",
    corporateAction: "Post-pandemic 'green recovery' promises surge",
  },
  {
    year: 2023,
    beforeTemp: 1.4,
    afterTemp: 2.9,
    subtitle: 'After Corporate "Solutions"',
    description: "The hottest year on record. Corporate emissions at all-time high.",
    corporateAction: "1,200+ companies now claim 'net-zero commitments'",
  },
  {
    year: 2024,
    beforeTemp: 1.5,
    afterTemp: 3.2,
    subtitle: "Present Day",
    description: "We're running out of time. They're running out of excuses.",
    corporateAction: "Greenwashing lawsuits reach record numbers",
  },
];

export function TemperatureTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Title Section */}
      <div className="relative z-10 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center space-y-4"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white">
            Temperature Impact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]">
              Timeline
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-medium max-w-3xl mx-auto">
            Tracking the acceleration of climate change through corporate deception
          </p>
        </motion.div>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        
        {/* Timeline Events */}
        <div className="space-y-12">
          {timelineData.map((event, index) => (
            <TimelineCard
              key={event.year}
              event={event}
              index={index}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface TimelineCardProps {
  event: TimelineEvent;
  index: number;
  isLast: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ event, index, isLast }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start center", "end center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  const tempIncrease = event.afterTemp - event.beforeTemp;
  const severity = tempIncrease > 1.5 ? "critical" : tempIncrease > 1 ? "high" : "medium";

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      className="relative flex flex-col md:flex-row items-stretch gap-8 md:gap-16"
    >
      {/* Left Side: Timeline Visuals */}
      <div className="relative flex-shrink-0 ml-6 md:ml-0 md:w-1/4 md:text-right flex flex-col items-center md:items-end">
          
          {/* Animated Dot */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
            className="relative z-10"
          >
            <div className="relative">
              {/* Pulsing Ring */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute inset-0 rounded-full ${
                  severity === "critical"
                    ? "bg-red-500"
                    : severity === "high"
                    ? "bg-orange-500"
                    : "bg-yellow-500"
                }`}
              />
              {/* Solid Dot */}
              <div
                className={`relative w-6 h-6 rounded-full border-4 border-black ${
                  severity === "critical"
                    ? "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)]"
                    : severity === "high"
                    ? "bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,1)]"
                    : "bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,1)]"
                }`}
              />
            </div>
          </motion.div>

          {/* CONNECTING LINE: Only drawn if not last item. Anchored to this dot, extends down */}
          {!isLast && (
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-6 bottom-[-48px] md:bottom-[-48px] w-0.5 bg-gradient-to-b from-red-500 via-red-500/50 to-red-900/10 right-[11px] md:right-[11px] z-0"
              />
          )}

          {/* Year Label */}
          <div className="hidden md:block mt-4 pr-6">
            <div className="text-6xl lg:text-7xl font-black text-red-500 tabular-nums tracking-tighter drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              {event.year}
            </div>
            <div className="mt-2 text-xs uppercase tracking-widest text-gray-500 font-bold">
              Year {index + 1}
            </div>
          </div>
      </div>

      {/* Right Side: Content Card */}
      <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.2, duration: 0.8 }}
          className="flex-1 pb-12"
        >
          {/* Mobile Year */}
          <div className="md:hidden mb-6 text-center">
            <div className="text-5xl font-black text-red-500 tabular-nums tracking-tighter">
              {event.year}
            </div>
          </div>

          {/* Card */}
          <div
            className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 ${
              severity === "critical"
                ? "border-red-500/50 bg-gradient-to-br from-red-950/50 via-red-900/30 to-black/50 shadow-[0_0_40px_rgba(239,68,68,0.15)]"
                : severity === "high"
                ? "border-orange-500/50 bg-gradient-to-br from-orange-950/50 via-orange-900/30 to-black/50 shadow-[0_0_40px_rgba(249,115,22,0.15)]"
                : "border-yellow-500/50 bg-gradient-to-br from-yellow-950/50 via-yellow-900/30 to-black/50 shadow-[0_0_40px_rgba(234,179,8,0.15)]"
            } backdrop-blur-xl`}
          >
            {/* Animated Background Gradient */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  "radial-gradient(circle at 0% 0%, rgba(239,68,68,0.2) 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 100%, rgba(239,68,68,0.2) 0%, transparent 50%)",
                  "radial-gradient(circle at 0% 0%, rgba(239,68,68,0.2) 0%, transparent 50%)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <div className="relative p-6 md:p-8 space-y-6">
              {/* Temperature Comparison */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-1">
                  <p className="text-xs font-mono uppercase tracking-widest text-gray-400 font-bold">
                    Before Impact
                  </p>
                  <div className="text-3xl md:text-4xl font-black text-gray-300 tabular-nums">
                    +{event.beforeTemp.toFixed(1)}°C
                  </div>
                </div>

                {/* Arrow */}
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center"
                >
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </motion.div>

                <div className="space-y-1 text-right">
                  <p className="text-xs font-mono uppercase tracking-widest text-gray-400 font-bold">
                    {event.subtitle}
                  </p>
                  <div
                    className={`text-3xl md:text-4xl font-black tabular-nums ${
                      severity === "critical"
                        ? "text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                        : severity === "high"
                        ? "text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                        : "text-yellow-400 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]"
                    }`}
                  >
                    +{event.afterTemp.toFixed(1)}°C
                  </div>
                </div>
              </div>

              {/* Temperature Increase Bar */}
              <div className="relative h-2 bg-gray-800/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(tempIncrease / 3) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.6, duration: 1, ease: "easeOut" }}
                  className={`absolute inset-y-0 left-0 rounded-full ${
                    severity === "critical"
                      ? "bg-gradient-to-r from-red-600 to-red-500"
                      : severity === "high"
                      ? "bg-gradient-to-r from-orange-600 to-orange-500"
                      : "bg-gradient-to-r from-yellow-600 to-yellow-500"
                  }`}
                />
                {/* Glow Effect */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(tempIncrease / 3) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.6, duration: 1, ease: "easeOut" }}
                  className={`absolute inset-y-0 left-0 rounded-full blur-sm ${
                    severity === "critical"
                      ? "bg-red-500/50"
                      : severity === "high"
                      ? "bg-orange-500/50"
                      : "bg-yellow-500/50"
                  }`}
                />
              </div>

              {/* Increase Delta */}
              <div className="flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 1.2, duration: 0.4, type: "spring" }} // Delayed pop-in
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                    severity === "critical"
                      ? "bg-red-500/20 border border-red-500/50"
                      : severity === "high"
                      ? "bg-orange-500/20 border border-orange-500/50"
                      : "bg-yellow-500/20 border border-yellow-500/50"
                  }`}
                >
                  <span
                    className={`text-lg font-bold tabular-nums ${
                      severity === "critical"
                        ? "text-red-400"
                        : severity === "high"
                        ? "text-orange-400"
                        : "text-yellow-400"
                    }`}
                  >
                    +{tempIncrease.toFixed(1)}°C increase
                  </span>
                </motion.div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

              {/* Description */}
              <div className="space-y-3">
                <p className="text-base md:text-lg text-gray-300 italic leading-relaxed">
                  {event.description}
                </p>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-black/30 border border-gray-800">
                  <p className="text-sm text-gray-400 leading-relaxed">
                    <span className="font-semibold text-gray-300">Corporate Response: </span>
                    {event.corporateAction}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
    </motion.div>
  );
}