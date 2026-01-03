"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, animate } from "framer-motion";
import { ClimateToggle } from "@/components/ui/climate-toggle";
import { RainEffect } from "@/components/ui/rain-effect";
import { ImpactGlobe } from "@/components/ui/impact-globe";
import { DeceptionCard } from "@/components/ui/deception-card";
import { ToxicityWidget } from "@/components/ui/toxicity-widget";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { EmissionsChart } from "@/components/ui/emissions-chart";
import { AbstractCanvas } from "@/components/ui/abstract-canvas";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { ClimateComparison } from "@/components/ui/climate-comparison";
import { TemperatureTimeline } from "@/components/ui/temperature-timeline";
import { ActionView } from "@/components/ui/action-view";
import { CallOfDutyIntro } from "@/components/ui/call-of-duty-intro";
import { TacticalFrame } from "@/components/ui/tactical-frame";
import { corporateGreenwashingData } from "@/data/corporateGreenwashing";
import { audioController } from "@/lib/audio-controller";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const [view, setView] = useState<"corporate" | "forensic">("corporate");
  const [showActionView, setShowActionView] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);
  
  // Briefing State
  const [isBriefing, setIsBriefing] = useState(false);
  const [briefingStatus, setBriefingStatus] = useState("");
  const [scanningTarget, setScanningTarget] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  
  // Section Refs for Autopilot
  const heroRef = useRef<HTMLElement>(null);
  const globeSectionRef = useRef<HTMLElement>(null);
  const databaseRef = useRef<HTMLElement>(null);
  const emissionsRef = useRef<HTMLElement>(null);
  const comparisonRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const isHeroInView = useInView(heroRef, { amount: 0.5 });

  // Update Audio Mode based on View
  useEffect(() => {
    audioController.setMode(view);
  }, [view]);

  // Handle Intro Steps
  const handleIntroStep = useCallback((step: number) => {
    setIntroStep(step);
  }, []);

  // Dark, intense colors for COD feel
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    view === "corporate"
      ? ["#051a05", "#022c02", "#0a3a0a"] // Deep dark green
      : ["#0a0505", "#1a0505", "#2d0a0a"] // Deep dark red
  );

  const handleToggle = () => {
    if (isBriefing) return; // Disable toggle during briefing
    setView((prev) => (prev === "corporate" ? "forensic" : "corporate"));
    audioController.playSFX("click");
  };

  const handleReviewData = () => {
    if (databaseRef.current) {
      audioController.playSFX("click");
      const target = databaseRef.current.offsetTop;
      animate(window.scrollY, target, {
        duration: 1.5,
        ease: "easeInOut",
        onUpdate: (latest) => window.scrollTo(0, latest)
      });
    }
  };

  const handleIntroManualReview = () => {
      setShowIntro(false);
      setIsBriefing(false);
      audioController.playSFX("click");
  };

  // Block User Scroll during Briefing
  useEffect(() => {
    if (isBriefing) {
      // Prevent user from scrolling manually, but allow window.scrollTo
      const preventDefault = (e: Event) => e.preventDefault();
      
      // Add non-passive listeners to block scroll
      window.addEventListener('wheel', preventDefault, { passive: false });
      window.addEventListener('touchmove', preventDefault, { passive: false });
      window.addEventListener('keydown', (e) => {
          if(["ArrowUp","ArrowDown","Space","PageUp","PageDown","Home","End"].includes(e.code)) {
              preventDefault(e);
          }
      }, { passive: false });

      return () => {
        window.removeEventListener('wheel', preventDefault);
        window.removeEventListener('touchmove', preventDefault);
        // @ts-ignore
        window.removeEventListener('keydown', preventDefault);
      };
    }
  }, [isBriefing]);

  // --- BRIEFING AUTOPILOT SEQUENCE ---
  const runBriefingSequence = async () => {
    // Start Sequence
    setIsBriefing(true);
    setShowIntro(false);
    
    // Ensure we start at top
    window.scrollTo(0, 0);

    // Helper to scroll smoothly
    const scrollToSection = async (ref: React.RefObject<HTMLElement | null>, duration: number, label: string) => {
      if (!ref.current) return;
      setBriefingStatus(label);
      
      const start = window.scrollY;
      const target = ref.current.offsetTop; // Scroll to top of section
      
      await animate(start, target, {
        duration: duration,
        ease: "easeInOut",
        onUpdate: (latest) => window.scrollTo(0, latest)
      });
    };

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      // 1. Hero Hover (Hold Corporate)
      setBriefingStatus("ESTABLISHING BASELINE...");
      setView("corporate");
      await wait(3000);

      // 2. Move to Globe (The Reveal)
      await scrollToSection(globeSectionRef, 2, "SCANNING GLOBAL INFRASTRUCTURE...");
      audioController.playSFX("scan"); // Enhance scanner feeling
      await wait(1500);
      
      // Trigger "Threat Detected" switch
      audioController.playSFX("alarm");
      setView("forensic");
      setBriefingStatus("!!! ANOMALIES DETECTED !!!");
      await wait(3000); // Let them see the globe turn red

      // 3. Move to Database
      // Start Data Stream Audio Loop
      audioController.startDataStream();
      await scrollToSection(databaseRef, 1.5, "ACCESSING TARGET DATABASE...");
      
      // SIMULATE SCANNING SPECIFIC TARGETS
      setBriefingStatus("IDENTIFYING HIGH VALUE TARGETS...");
      const targetNames = ["SHELL", "EXXON", "BP", "NESTLÉ", "COCA-COLA", "VOLKSWAGEN"];
      
      for (const target of targetNames) {
        setScanningTarget(target);
        audioController.playSFX("acquire");
        // Random short wait to simulate searching
        await wait(600 + Math.random() * 400); 
      }
      setScanningTarget(null);

      // Stop Data Stream
      audioController.stopDataStream();

      // 4. Move to Charts
      audioController.playSFX("scan");
      await scrollToSection(emissionsRef, 2, "ANALYZING EMISSIONS DATA...");
      await wait(3000); // Let graphs animate

      // 5. Move to Comparison
      await scrollToSection(comparisonRef, 2, "VERIFYING CORPORATE CLAIMS...");
      await wait(4000); // Read the table

      // 6. Move to Timeline (Slow Pan through years)
      setBriefingStatus("RECONSTRUCTING TIMELINE...");
      // First scroll to top of timeline
      if (timelineRef.current) {
         const start = window.scrollY;
         const topOfTimeline = timelineRef.current.offsetTop;
         await animate(start, topOfTimeline, { duration: 1.5, ease: "easeInOut", onUpdate: (v) => window.scrollTo(0, v) });
         
         await wait(1000);

         // Now slowly pan down through the years
         setBriefingStatus("ANALYZING HISTORICAL DATA...");
         // Using a low thrum or specific SFX if available, or just rely on drone
         const endOfTimeline = timelineRef.current.offsetTop + timelineRef.current.offsetHeight - window.innerHeight;
         
         await animate(topOfTimeline, endOfTimeline, {
            duration: 15, // 15 seconds to scroll through years
            ease: "linear",
            onUpdate: (latest) => window.scrollTo(0, latest)
         });
      }
      
      await wait(1000);

      // 7. Move to CTA
      audioController.playSFX("success"); // A subtle success chime for completion
      await scrollToSection(ctaRef, 2, "MISSION BRIEFING COMPLETE");
      await wait(2000);

    } catch (e) {
      console.log("Briefing interrupted", e);
    } finally {
      // End Briefing
      setIsBriefing(false);
      setBriefingStatus("MANUAL CONTROL ENGAGED");
      audioController.stopDataStream(); // Safety stop
      audioController.playSFX("scan");
      setTimeout(() => setBriefingStatus(""), 3000);
    }
  };

  const handleManualOverride = () => {
     setIsBriefing(false);
     setBriefingStatus("MANUAL OVERRIDE");
     setScanningTarget(null);
     audioController.stopDataStream();
     setTimeout(() => setBriefingStatus(""), 2000);
  };

  return (
    <>
      <style jsx global>{`
        /* Hide Scrollbar during Briefing to maintain cinematic look */
        ${isBriefing ? `
          ::-webkit-scrollbar { display: none; }
          body { -ms-overflow-style: none; scrollbar-width: none; }
        ` : ''}
      `}</style>

      {/* Global CRT & Noise Overlay - Persistent */}
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      <div className="fixed inset-0 pointer-events-none z-[60] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] opacity-20" />
      
      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-[59] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

      {/* Cinematic Bars & Overlay (Briefing Mode) */}
      <AnimatePresence>
        {isBriefing && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[80] pointer-events-none"
           >
              {/* Letterbox Bars */}
              <div className="absolute top-0 left-0 right-0 h-[10vh] bg-black z-[81] border-b border-white/10" />
              <div className="absolute bottom-0 left-0 right-0 h-[10vh] bg-black z-[81] border-t border-white/10" />
              
              {/* REC UI - MOVED DOWN to clear bars */}
              <div className="absolute top-[15vh] right-8 flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_red]" />
                 <span className="text-red-600 font-mono font-bold tracking-widest text-sm">REC</span>
              </div>
              <div className="absolute top-[15vh] left-8 text-white/50 font-mono text-xs">
                 TAPE_001_CLASSIFIED_INTEL
              </div>

              {/* Status Text Center Bottom */}
              <div className="absolute bottom-[15vh] left-0 right-0 text-center">
                 <motion.span 
                   key={briefingStatus}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="inline-block bg-black/80 backdrop-blur border border-red-500/30 px-6 py-2 text-xs font-mono text-green-400 tracking-[0.2em] shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                 >
                   {briefingStatus}
                 </motion.span>
              </div>
              
              {/* Manual Override Button (Pointer events auto to allow clicking) */}
              <div className="absolute bottom-[15vh] right-8 pointer-events-auto">
                 <button 
                   onClick={handleManualOverride}
                   className="text-[10px] text-white/30 hover:text-white border border-white/10 hover:border-white/50 px-3 py-2 uppercase tracking-widest transition-all bg-black hover:bg-white/10"
                 >
                   [ ESC ] SKIP
                 </button>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
      
      {/* TARGET LOCK HUD OVERLAY */}
      <AnimatePresence>
         {scanningTarget && (
            <motion.div
               initial={{ opacity: 0, scale: 1.2 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.8 }}
               className="fixed inset-0 z-[85] pointer-events-none flex items-center justify-center"
            >
               <div className="relative w-64 h-64 border-2 border-red-500/50 rounded-lg flex items-center justify-center bg-black/20 backdrop-blur-sm">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500" />
                  
                  <div className="text-center space-y-2">
                     <div className="text-red-500 text-[10px] font-mono tracking-widest animate-pulse">TARGET LOCKED</div>
                     <div className="text-white text-2xl font-black font-mono tracking-tight bg-red-900/50 px-2 py-1">
                        {scanningTarget}
                     </div>
                     <div className="text-red-400 text-[10px] font-mono">MATCH: 99.9%</div>
                  </div>
                  
                  {/* Crosshairs */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                     <div className="w-full h-px bg-red-500" />
                     <div className="h-full w-px bg-red-500 absolute" />
                  </div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      <AnimatePresence>
        {showIntro && (
           <motion.div 
             className="fixed inset-0 z-[100]"
             exit={{ opacity: 0, pointerEvents: "none" }}
             transition={{ duration: 0.8 }}
           >
             <CallOfDutyIntro 
                onComplete={runBriefingSequence} 
                onStepChange={handleIntroStep} 
                onManualReview={handleIntroManualReview}
             />
           </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ backgroundColor }}
        className={`min-h-screen w-full relative overflow-x-hidden text-white font-sans ${showIntro ? "h-screen overflow-hidden" : ""}`}
      >
        {showActionView && <ActionView onBack={() => setShowActionView(false)} />}
        
        {/* Scroll Progress Bar (Tactical) */}
        {!isBriefing && (
          <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-900">
             <motion.div
              className={`h-full origin-left ${view === "corporate" ? "bg-green-500 shadow-[0_0_10px_#22c55e]" : "bg-red-500 shadow-[0_0_10px_#ef4444]"}`}
              style={{ scaleX: scrollYProgress }}
             />
          </div>
        )}

        {/* HUD Elements */}
        <div className="fixed top-6 left-6 z-40 hidden md:block">
           <div className="text-[10px] font-mono text-gray-500 tracking-widest space-y-1">
             <div>OP: CLIMATE_SAVERS</div>
             <div>STATUS: {isBriefing ? "AUTO_PILOT" : (view === "corporate" ? "HOPE_MODE" : "ACTION_MODE")}</div>
             <div>SECURE: {isBriefing ? "BYPASSING..." : "FALSE"}</div>
           </div>
        </div>

        {/* Hide toggle during briefing to avoid UI cut-off */}
        {!isBriefing && <ClimateToggle view={view} onToggle={handleToggle} />}
        
        {isHeroInView && !showIntro && !isBriefing && <ScrollIndicator view={view} />}

        <RainEffect
          intensity={Math.min(scrollYProgress.get() * 1.2, 1)}
          color={view === "forensic" ? "rgba(220, 50, 50, 0.4)" : "rgba(100, 255, 150, 0.2)"}
          speed={1.5}
        />

        {/* Hero Section */}
        <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <AbstractCanvas theme={view} />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: showIntro ? 0 : 0.5 }}
            className="text-center space-y-6 max-w-5xl relative z-10"
          >
            <div className={`text-xs font-mono tracking-[0.3em] mb-4 ${view === "corporate" ? "text-green-500" : "text-red-500"}`}>
               {view === "corporate" ? "// COMMUNITY_FEED" : "// CRITICAL_INTEL"}
            </div>
            
            <AnimatePresence mode="wait">
              <motion.h1
                key={view}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className={`text-6xl md:text-9xl font-black tracking-tighter uppercase ${
                  view === "corporate"
                    ? "text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-green-900"
                    : "text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-900 drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                }`}
              >
                {view === "corporate" ? "CLIMATE SAVERS" : "CLIMATE CHEATERS"}
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`p-${view}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className={`text-xl md:text-2xl font-mono ${
                  view === "corporate" ? "text-green-400/80" : "text-red-400/80"
                }`}
              >
                {view === "corporate"
                  ? "CELEBRATING A SUSTAINABLE FUTURE"
                  : "EXPOSING THE GAPS IN PROGRESS"}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* New Visual Indicator: Scroll for Impact */}
          {!showIntro && !isBriefing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ delay: 2, duration: 2, repeat: Infinity }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
            >
              <span className={`text-[10px] font-mono tracking-[0.3em] uppercase ${view === "corporate" ? "text-green-500/70" : "text-red-500/70"}`}>
                Scroll for Impact
              </span>
              <div className={`w-px h-12 bg-gradient-to-b opacity-50 ${view === "corporate" ? "from-green-500 to-transparent" : "from-red-500 to-transparent"}`} />
            </motion.div>
          )}
        </section>

        {/* Globe Section - THIS IS WHERE INTRO REVEALS TO */}
        <section ref={globeSectionRef} className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative">
          <TacticalFrame view={view} title="Global Impact" className="w-full max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 flex justify-center relative">
                <ImpactGlobe 
                    companies={corporateGreenwashingData} 
                    view={view}
                    // Animation is now triggered by view state mostly
                    triggerAnimation={!showIntro}
                />
              </div>
              
              <div className="space-y-6">
                <div className="text-right space-y-2">
                   <h2 className={`text-4xl font-bold uppercase ${view === "corporate" ? "text-green-500" : "text-red-500"}`}>
                     {view === "corporate" ? "Global Partners" : "Target Zones"}
                   </h2>
                   <p className="text-sm font-mono text-gray-400">
                     {view === "corporate" ? "Connecting the world sustainably." : "Identifying high-emission sectors."}
                   </p>
                </div>
                
                {view === "forensic" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <ToxicityWidget
                      aqi={corporateGreenwashingData[0].pollutionData.aqi}
                      co2ppm={corporateGreenwashingData[0].pollutionData.co2ppm}
                      wasteDischarge={corporateGreenwashingData[0].pollutionData.wasteDischarge}
                      location={corporateGreenwashingData[0].hqLocation.label}
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </TacticalFrame>
        </section>

        {/* Wall of Shame with Pagination */}
        <section ref={databaseRef} className="min-h-screen px-4 py-20">
          <TacticalFrame view={view} title="Intel Database" className="max-w-7xl mx-auto">
             <div className="mb-12 text-center">
                <h2 className={`text-5xl font-black uppercase tracking-tight mb-4 ${view === "corporate" ? "text-green-500" : "text-red-500"}`}>
                  {view === "corporate" ? "Leadership Board" : "The Wall of Shame"}
                </h2>
                <div className="h-1 w-24 mx-auto bg-current opacity-50" />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {corporateGreenwashingData.slice(0, visibleCount).map((company, index) => (
                <DeceptionCard
                  key={company.id}
                  company={company}
                  index={index}
                  isVisible={view === "forensic"}
                />
              ))}
            </div>
            
            {/* Show More Button */}
            {visibleCount < corporateGreenwashingData.length && (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <button
                  onClick={() => setVisibleCount(prev => prev + 9)}
                  className="group relative px-8 py-3 bg-black/50 border border-red-500/30 text-red-500 font-mono text-sm tracking-[0.2em] uppercase transition-all hover:bg-red-500/10 hover:border-red-500 hover:text-red-400"
                >
                  <span className="relative z-10">Load More Intel ({corporateGreenwashingData.length - visibleCount} Remaining)</span>
                  <div className="absolute inset-0 bg-red-500/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </button>
              </motion.div>
            )}
          </TacticalFrame>
        </section>

        {/* Emissions Charts */}
        <section ref={emissionsRef} className="min-h-screen px-4 py-20">
            {view === "forensic" ? (
             <TacticalFrame view={view} title="Emissions Data" className="max-w-7xl mx-auto">
                <div className="mb-12">
                   <h2 className="text-4xl font-black text-red-500 uppercase">Trend Analysis</h2>
                   <p className="font-mono text-red-400 text-sm mt-2">DATA SOURCE: ATMOSPHERIC SENSORS ARRAY</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {corporateGreenwashingData.slice(0, 4).map((company, index) => (
                    <EmissionsChart key={company.id} company={company} />
                  ))}
                </div>
             </TacticalFrame>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <div className="text-green-500 font-mono text-xl animate-pulse">
                        [DATA REDACTED BY CORPORATE POLICY]
                    </div>
                </div>
            )}
        </section>

        {/* Comparison Table */}
        <section ref={comparisonRef} className="min-h-screen flex items-center justify-center px-4 py-20">
             {view === "forensic" ? (
             <TacticalFrame view={view} title="Fact Check" className="max-w-6xl w-full">
                <div className="mb-8 text-center">
                   <h2 className="text-4xl font-black text-red-500 uppercase">Verification Matrix</h2>
                </div>
                <ComparisonTable />
             </TacticalFrame>
             ) : (
                <div className="text-green-500 font-mono text-xl animate-pulse">
                    [COMPLIANCE RECORDS ENCRYPTED]
                </div>
             )}
        </section>

        {/* Quote */}
        {view === "forensic" && (
          <section className="min-h-[50vh] flex items-center justify-center px-4 py-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl relative"
            >
               <div className="absolute -top-10 -left-10 text-9xl text-red-900/20 font-serif">“</div>
               <blockquote className="text-3xl md:text-5xl font-black text-center text-white leading-tight">
                 THE GREATEST THREAT TO OUR PLANET IS THE BELIEF THAT SOMEONE ELSE WILL SAVE IT.
               </blockquote>
               <div className="text-center mt-6 font-mono text-red-500 tracking-widest">— ROBERT SWAN</div>
            </motion.div>
          </section>
        )}

        {/* Climate Timeline */}
        <section ref={timelineRef} className="min-h-screen">
             {view === "forensic" ? (
               <TemperatureTimeline />
             ) : (
                <div className="h-full flex items-center justify-center">
                    <div className="text-green-500 font-mono text-xl animate-pulse">
                        [HISTORICAL DATA UNAVAILABLE]
                    </div>
                </div>
             )}
        </section>

        {/* CTA */}
        <section ref={ctaRef} className="min-h-[60vh] flex items-center justify-center px-4 pb-20 pt-0 relative -mt-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.1)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="text-center space-y-8 max-w-3xl relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`text-5xl md:text-7xl font-black uppercase ${view === "corporate" ? "text-green-500" : "text-white"}`}
            >
              {view === "corporate" ? "Join Us" : "Take Action"}
            </motion.h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <motion.button
                  onClick={() => setShowActionView(true)}
                  whileHover={{ scale: 1.05, letterSpacing: "0.2em" }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-16 py-6 border-2 text-xl font-bold tracking-widest uppercase transition-all duration-300 ${
                    view === "corporate"
                      ? "border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
                      : "border-red-500 text-red-500 hover:bg-red-500 hover:text-black shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                  }`}
                >
                  SPREAD THE CAUSE
                </motion.button>

                <motion.button
                  onClick={handleReviewData}
                  whileHover={{ scale: 1.05, letterSpacing: "0.2em" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-gray-600 text-gray-400 font-mono text-sm tracking-widest uppercase hover:text-white hover:border-white transition-all bg-black/40 backdrop-blur"
                >
                   REVIEW INTEL
                </motion.button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-white/10 bg-black/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center font-mono text-xs text-gray-600">
            <p className="mb-4">
              {view === "forensic" 
                ? "// DATA SOURCE: CLASSIFIED // UNAUTHORIZED ACCESS LOGGED //" 
                : "© 2024 CSI. All Rights Reserved. Building a better tomorrow."}
            </p>
            <a 
              href="https://taha-usman.vercel.app/" 
              target="_blank" 
              className="inline-block px-4 py-2 border border-gray-800 hover:border-gray-600 hover:text-gray-400 transition-colors"
            >
              DESIGNED BY TAHA PRODUCTION
            </a>
          </div>
        </footer>
      </motion.div>
    </>
  );
}

export default App;