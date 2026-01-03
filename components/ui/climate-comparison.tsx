"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, CloudRain, CloudDrizzle, Sun, CloudSnow } from "lucide-react";

interface ClimateData {
  location: string;
  before: {
    temp: number;
    condition: string;
    humidity: number;
    icon: "snow" | "cloudy" | "sunny";
  };
  after: {
    temp: number;
    condition: string;
    humidity: number;
    icon: "rain" | "thunderstorm" | "drizzle";
  };
}

const climateComparisons: ClimateData[] = [
  {
    location: "Arctic Region",
    before: {
      temp: -10,
      condition: "Snow",
      humidity: 75,
      icon: "snow",
    },
    after: {
      temp: 5,
      condition: "Rain",
      humidity: 85,
      icon: "rain",
    },
  },
  {
    location: "Amazon Rainforest",
    before: {
      temp: 28,
      condition: "Cloudy",
      humidity: 80,
      icon: "cloudy",
    },
    after: {
      temp: 35,
      condition: "Thunderstorm",
      humidity: 65,
      icon: "thunderstorm",
    },
  },
  {
    location: "Coastal Cities",
    before: {
      temp: 22,
      condition: "Sunny",
      humidity: 60,
      icon: "sunny",
    },
    after: {
      temp: 29,
      condition: "Thunderstorm",
      humidity: 75,
      icon: "thunderstorm",
    },
  },
];

function getWeatherIcon(icon: string, size: number = 64) {
  const iconProps = { size, strokeWidth: 1.5 };
  
  switch (icon) {
    case "snow":
      return <CloudSnow {...iconProps} />;
    case "cloudy":
      return <Cloud {...iconProps} />;
    case "sunny":
      return <Sun {...iconProps} />;
    case "rain":
      return <CloudRain {...iconProps} />;
    case "thunderstorm":
      return <CloudDrizzle {...iconProps} />;
    case "drizzle":
      return <CloudDrizzle {...iconProps} />;
    default:
      return <Cloud {...iconProps} />;
  }
}

export function ClimateComparison() {
  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="text-center">
            <h3 className="text-2xl font-black text-gray-400 mb-1">Before</h3>
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500">
              1970s-1990s
            </p>
          </div>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-red-500/50 to-transparent" />
          <div className="text-center">
            <h3 className="text-2xl font-black text-red-500 mb-1">After</h3>
            <p className="text-xs font-mono uppercase tracking-widest text-red-400/70">
              2020s onwards
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="space-y-6">
        {climateComparisons.map((climate, index) => (
          <motion.div
            key={climate.location}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-center"
          >
            {/* Before Card */}
            <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-gray-700/70 hover:border-gray-600/70 transition-all backdrop-blur-sm shadow-xl shadow-black/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-300">
                    {climate.location}
                  </h4>
                  
                  <div className="flex items-center justify-center py-4">
                    <div className="text-gray-400">
                      {getWeatherIcon(climate.before.icon, 56)}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl font-black text-gray-200 tabular-nums mb-1">
                      {climate.before.temp > 0 ? '+' : ''}{climate.before.temp}°C
                    </div>
                    <p className="text-sm text-gray-400 font-medium">
                      {climate.before.condition}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-700/50">
                    <p className="text-xs text-gray-500 font-mono">
                      Humidity: {climate.before.humidity}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Arrow */}
            <div className="flex justify-center lg:px-4">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-red-950/50 border-2 border-red-500/50"
              >
                <svg
                  className="w-6 h-6 text-red-500"
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
            </div>

            {/* After Card */}
            <Card className="bg-gradient-to-br from-red-950/95 to-red-900/80 border-red-500/60 hover:border-red-500/80 transition-all shadow-xl shadow-red-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-red-100">
                    {climate.location}
                  </h4>
                  
                  <div className="flex items-center justify-center py-4">
                    <div className="text-red-400">
                      {getWeatherIcon(climate.after.icon, 56)}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl font-black text-red-200 tabular-nums mb-1">
                      +{climate.after.temp}°C
                    </div>
                    <p className="text-sm text-red-300 font-medium">
                      {climate.after.condition}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-red-500/30">
                    <p className="text-xs text-red-400/70 font-mono">
                      Humidity: {climate.after.humidity}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Impact Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-center pt-8"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-950/50 border border-red-500/30">
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-sm font-semibold text-red-400">
            Average global temperature increase: <span className="text-red-300 font-bold">+1.2°C since pre-industrial era</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}