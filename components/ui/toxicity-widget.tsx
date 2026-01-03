"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ToxicityWidgetProps {
  aqi: number;
  co2ppm: number;
  wasteDischarge: string;
  location: string;
  className?: string;
}

export function ToxicityWidget({
  aqi,
  co2ppm,
  wasteDischarge,
  location,
  className,
}: ToxicityWidgetProps) {
  const getAQIColor = (value: number) => {
    if (value > 180) return "text-red-500";
    if (value > 150) return "text-orange-500";
    if (value > 100) return "text-yellow-500";
    return "text-green-500";
  };

  const getAQILabel = (value: number) => {
    if (value > 180) return "Hazardous";
    if (value > 150) return "Very Unhealthy";
    if (value > 100) return "Unhealthy";
    return "Moderate";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("", className)}
    >
      <Card className="p-6 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border-red-500/30 text-white">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Local Toxicity</h3>
            <span className="text-xs text-red-400">⚠️ LIVE DATA</span>
          </div>

          <div className="text-xs text-gray-400 flex items-center gap-1">
            📍 {location}
          </div>

          <div className="space-y-3">
            {/* AQI */}
            <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Air Quality Index</p>
                <p className={cn("text-3xl font-black", getAQIColor(aqi))}>{aqi}</p>
                <p className="text-xs font-semibold text-red-400">{getAQILabel(aqi)}</p>
              </div>
              <div className="text-4xl">💨</div>
            </div>

            {/* CO2 */}
            <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
              <div className="space-y-1">
                <p className="text-xs text-gray-400">CO₂ Concentration</p>
                <p className="text-2xl font-black text-orange-500">{co2ppm} ppm</p>
                <p className="text-xs text-orange-400">Above safe levels</p>
              </div>
              <div className="text-4xl">🏭</div>
            </div>

            {/* Waste */}
            <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Waste Discharge</p>
                <p className="text-lg font-black text-amber-500">{wasteDischarge}</p>
                <p className="text-xs text-amber-400">Annual output</p>
              </div>
              <div className="text-4xl">☢️</div>
            </div>
          </div>

          <div className="pt-3 border-t border-red-500/20 text-xs text-center text-red-400">
            Data reflects local environmental impact
          </div>
        </div>
      </Card>
    </motion.div>
  );
}