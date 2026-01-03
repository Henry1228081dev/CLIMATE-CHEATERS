"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audioController } from "@/lib/audio-controller";
import { Activity, X, ShieldAlert, Cpu, Database, Wifi, AlertTriangle } from "lucide-react";

export function CallOfDutyIntro({ 
    onComplete, 
    onStepChange, 
    onManualReview 
}: { 
    onComplete: () => void, 
    onStepChange?: (step: number) => void,
    onManualReview: () => void
}) {
  const [step, setStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const speedRef = useRef(1);
  const elapsedRef = useRef(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleStart = useCallback(() => {
    audioController.initialize();
    setHasStarted(true);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let frameId: number;
    let lastTime = performance.now();
    let lastPlayedStep = -1;

    const timeline = [
      { time: 0, step: 0 },
      { time: 4000, step: 1 },
      { time: 8000, step: 2 },
      { time: 13000, step: 3 },
      { time: 18000, step: 4 },
      { time: 23000, step: 5 },
      { time: 28000, step: 6 },
      { time: 34000, step: 7 },
      { time: 38000, step: 8 },
      { time: 45000, step: 9 },
    ];

    const loop = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;
      elapsedRef.current += dt * speedRef.current;

      let currentStep = 0;
      for (const phase of timeline) {
        if (elapsedRef.current >= phase.time) {
          currentStep = phase.step;
        }
      }

      if (currentStep !== lastPlayedStep) {
          if (currentStep === 0) audioController.playSFX("glitch"); 
          if (currentStep === 1) audioController.playSFX("scan");    
          if (currentStep === 2) audioController.playSFX("success"); 
          if (currentStep === 3) audioController.playSFX("scan");    
          if (currentStep === 4) audioController.playSFX("glitch");  
          if (currentStep === 5) audioController.playSFX("glitch");  
          if (currentStep === 7) audioController.playSFX("alarm");   
          if (currentStep === 8) audioController.playSFX("success"); 
          lastPlayedStep = currentStep;
      }

      setStep(currentStep);
      onStepChange?.(currentStep);

      if (elapsedRef.current >= 45000) return;
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [hasStarted, onStepChange]);

  if (!hasStarted) {
      return (
          <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer" onClick={handleStart}>
              <div className="relative z-10 font-tactical text-center space-y-4 p-8 border border-green-500/20 bg-black/80 backdrop-blur-sm">
                  <div className="w-16 h-16 mx-auto border-2 border-green-500 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse shadow-[0_0_20px_#22c55e]" />
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-green-500 text-3xl tracking-[0.3em] font-bold">INITIATE UPLINK</h1>
                    <p className="text-green-500/50 text-base uppercase tracking-widest font-mono">[ CLICK TO COMMENCE ]</p>
                  </div>
              </div>
          </div>
      )
  }

  return (
    <div className={`fixed inset-0 z-[100] font-tactical text-white overflow-hidden select-none bg-black transition-colors duration-1000 ${step >= 8 ? "cursor-default" : "cursor-wait"}`}>
       
       {/* High-Density Background Intel */}
       <div className="absolute inset-0 opacity-[0.15]">
          <IntelBackground />
       </div>

       {/* HUD Sidebar Left */}
       <div className="absolute left-0 top-0 bottom-0 w-64 border-r border-white/5 bg-black/40 backdrop-blur-sm z-30 p-6 flex flex-col justify-between">
          <div className="space-y-8">
            <TacticalMonitor id="01" label="TAC_MON_01" status="ACTIVE" color={step >= 7 ? "red" : "green"} />
            <div className="space-y-1">
               {['SYS_SIG_4692: WAITING', 'SYS_SIG_7303: WAITING', 'SYS_SIG_7654: WAITING', 'SYS_SIG_7548: READY'].map((s, i) => (
                 <div key={i} className="text-[10px] font-mono text-white/20">{s}</div>
               ))}
            </div>
            <TacticalMonitor id="03" label="TAC_MON_03" status="READY" color={step >= 7 ? "red" : "green"} />
          </div>
          <div className="space-y-4">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                <span className="text-xs font-mono text-green-500 tracking-tighter uppercase font-bold">> PROTOCOL: SAVERS_INIT</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                <span className="text-xs font-mono text-green-500 tracking-tighter uppercase font-bold">> ACCESS: GRANTED</span>
             </div>
          </div>
       </div>

       {/* HUD Sidebar Right */}
       <div className="absolute right-0 top-0 bottom-0 w-64 border-l border-white/5 bg-black/40 backdrop-blur-sm z-30 p-6 flex flex-col justify-between text-right">
          <div className="space-y-8">
             <div className="space-y-1">
                <div className="flex items-center justify-end gap-2">
                   <div className={`w-2 h-2 rounded-full ${step >= 7 ? "bg-red-500 shadow-[0_0_10px_red]" : "bg-green-500"}`} />
                   <span className={`text-xs font-bold tracking-widest uppercase ${step >= 7 ? "text-red-500" : "text-green-500"}`}>
                      {step >= 7 ? "NET: COMPROMISED" : "NET: ENCRYPTED"}
                   </span>
                </div>
                <div className="text-[10px] font-mono text-white/40 uppercase">UPLINK: 1106 TB/s</div>
                <div className="text-[10px] font-mono text-white/40 uppercase">LATENCY: 6ms</div>
             </div>
             <div className="space-y-1">
                {['SYS_SIG_905: WAITING', 'SYS_SIG_969: WAITING', 'SYS_SIG_6501: WAITING', 'SYS_SIG_1856: READY'].map((s, i) => (
                  <div key={i} className="text-[10px] font-mono text-white/20">{s}</div>
                ))}
             </div>
             <TacticalMonitor id="02" label="TAC_MON_02" status="SCANNING" color={step >= 7 ? "red" : "green"} reverse />
          </div>
       </div>

       {/* Bottom Status Bar */}
       <div className="absolute bottom-0 left-64 right-64 h-12 border-t border-white/5 bg-black/60 backdrop-blur-md z-30 flex items-center px-8">
          <div className={`text-[10px] font-mono tracking-[0.4em] uppercase font-bold ${step >= 7 ? "text-red-500" : "text-green-500/40"}`}>
             {step >= 7 ? "> CRITICAL WARNING: DECEPTION DETECTED" : "> SYSTEM IDLE // STANDBY FOR INSTRUCTIONS"}
          </div>
       </div>

       {/* Central Content */}
       <div className="absolute inset-0 flex flex-col items-center justify-center z-40 px-4 pointer-events-none">
          <AnimatePresence mode="wait">
            {step >= 1 && step < 8 && (
                <motion.div
                    key="terminal"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="relative w-full max-w-2xl bg-black/80 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] pointer-events-auto overflow-hidden rounded-lg backdrop-blur-md"
                >
                    <div className="bg-zinc-900/80 px-4 py-2 flex items-center justify-between border-b border-white/10">
                        <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                           <Database size={12} />
                           <span>SECURE_DATA_UPLINK.EXE</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 bg-zinc-700 rounded-sm" />
                            <div className="w-2.5 h-2.5 bg-red-900 rounded-sm" />
                        </div>
                    </div>
                    
                    <div className="p-12 min-h-[350px] flex items-center justify-center bg-black relative">
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center w-full max-w-sm">
                                <div className="text-green-500 font-mono text-xs mb-4 uppercase tracking-[0.3em] font-bold">Establishing Secure Handshake...</div>
                                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden p-[1px]">
                                    <motion.div className="h-full bg-green-500 shadow-[0_0_10px_#22c55e]" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3.5, ease: "linear" }} />
                                </div>
                            </motion.div>
                        )}
                        {step === 2 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                                <div className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                    PROJECT:<br/><span className="text-green-500">CLIMATE SAVERS</span>
                                </div>
                            </motion.div>
                        )}
                        {step === 3 && (
                            <div className="text-center space-y-4">
                                <div className="text-6xl font-black text-green-500">2015</div>
                                <div className="text-2xl font-bold uppercase tracking-widest text-white">THE GLOBAL PROMISE</div>
                                <p className="text-green-400/50 font-mono text-[10px] max-w-xs mx-auto uppercase">Paris Agreement Ratified: Humanity pledges to hold 1.5°C.</p>
                            </div>
                        )}
                        {step === 4 && (
                            <div className="text-center space-y-4">
                                <div className="text-6xl font-black text-yellow-500">2019</div>
                                <div className="text-2xl font-bold uppercase tracking-widest text-white">THE GREAT DECEPTION</div>
                                <p className="text-yellow-400/50 font-mono text-[10px] max-w-xs mx-auto uppercase">Carbon Credits markets explode. Verification systems compromised.</p>
                            </div>
                        )}
                        {step === 5 && (
                            <div className="text-center space-y-4">
                                <div className="text-6xl font-black text-red-600">2023</div>
                                <div className="text-2xl font-bold uppercase tracking-widest text-white">SYSTEM FAILURE</div>
                                <div className="text-red-500/80 font-mono text-[10px] tracking-widest break-all px-6">
                                   FFFFFFFFF FFFFFFFFF FFFFFFFFF FFFFFFFFF FFFFFFFFF FFFFFFFFF FFFFFFFFF FFFFFFFFF
                                </div>
                                <p className="text-red-400/70 font-mono text-[10px] max-w-xs mx-auto uppercase">Agreement violated. Emissions peak. The 1.5°C threshold breached in silence.</p>
                            </div>
                        )}
                        {step === 6 && (
                            <div className="text-center px-6">
                                <div className="text-2xl font-serif italic text-white leading-relaxed">
                                    "The greatest threat to our planet is the belief that someone else will save it."
                                </div>
                                <div className="mt-4 text-[10px] font-mono text-zinc-500 tracking-[0.5em]">— ROBERT SWAN</div>
                            </div>
                        )}
                        {step === 7 && (
                            <div className="text-center space-y-4">
                                <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.2, repeat: Infinity }} className="text-5xl md:text-7xl font-black text-red-600 uppercase tracking-widest">
                                    THREAT
                                </motion.div>
                                <div className="text-red-500 font-mono text-xs uppercase font-bold tracking-[0.2em]">Malicious Greenwashing Detected</div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}

            {step >= 8 && (
               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center w-full max-w-3xl relative z-40 pointer-events-auto">
                 {/* Logo Background HUD */}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-[500px] h-[500px] rounded-full border-4 border-red-500/20 border-dashed animate-[spin_60s_linear_infinite]" />
                    <div className="absolute w-[450px] h-[450px] rounded-full border border-red-500/10 border-dotted animate-[spin_30s_linear_infinite_reverse]" />
                    <div className="absolute w-[600px] h-[600px] border border-red-500/5 rounded-full" />
                 </div>

                 <div className="relative p-12 flex flex-col items-center text-center">
                    <h1 className="text-7xl md:text-[10rem] font-tactical font-black text-white leading-[0.8] uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                        CLIMATE<br /><span className="text-red-600">CHEATERS</span>
                    </h1>
                    <p className="mt-8 text-red-300 font-mono tracking-[0.8em] text-sm uppercase font-bold">MISSION: EXPOSE THE TRUTH</p>
                    
                    <div className="flex flex-col md:flex-row gap-6 mt-16 w-full max-w-md">
                        <motion.button 
                           onClick={onComplete} 
                           whileHover={{ scale: 1.05, backgroundColor: '#ef4444' }}
                           className="flex-1 py-4 bg-red-700 text-white font-black text-sm uppercase tracking-widest transition-all"
                        >
                           [ START MISSION ]
                        </motion.button>
                        <motion.button 
                           onClick={onManualReview} 
                           whileHover={{ scale: 1.05, borderColor: '#fff' }}
                           className="flex-1 py-4 border-2 border-white/20 text-zinc-400 font-bold text-sm uppercase tracking-widest backdrop-blur-md transition-all hover:text-white"
                        >
                           MANUAL REVIEW
                        </motion.button>
                    </div>
                 </div>
               </motion.div>
            )}
          </AnimatePresence>
       </div>
    </div>
  );
}

function TacticalMonitor({ id, label, status, color, reverse = false }: { id: string, label: string, status: string, color: 'green' | 'red', reverse?: boolean }) {
    return (
        <div className={`space-y-3 ${reverse ? 'text-right' : ''}`}>
            <div className="flex items-center gap-2 justify-start">
               {!reverse && <Activity size={14} className={color === 'red' ? 'text-red-500' : 'text-green-500'} />}
               <span className={`text-[10px] font-black tracking-widest uppercase ${color === 'red' ? 'text-red-500' : 'text-green-500'}`}>{label}</span>
               {reverse && <Activity size={14} className={color === 'red' ? 'text-red-500' : 'text-green-500'} />}
            </div>
            <div className={`p-3 bg-${color}-500/5 border border-${color}-500/10 rounded font-mono text-[9px] h-16 relative overflow-hidden`}>
               <div className="opacity-40 leading-tight">
                  {`ID: 0x${Math.random().toString(16).substr(2, 6).toUpperCase()}`}<br/>
                  {`STAT: ${status}`}<br/>
                  {`ENC: AES_256`}
               </div>
               <div className={`absolute bottom-0 ${reverse ? 'left-0' : 'right-0'} p-1 text-[8px] opacity-60`}>0{id}</div>
            </div>
        </div>
    )
}

function IntelBackground() {
    const [lines, setLines] = useState<string[]>([]);
    useEffect(() => {
        const genLine = () => `0x${Math.random().toString(16).substr(2, 8).toUpperCase()}  F${Math.random().toString(16).substr(2, 4).toUpperCase()}  A${Math.random().toString(16).substr(2, 6).toUpperCase()}  ${Math.random().toString(16).substr(2, 10).toUpperCase()}`;
        setLines(Array.from({length: 40}, genLine));
        const interval = setInterval(() => {
            setLines(prev => [genLine(), ...prev.slice(0, 39)]);
        }, 150);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden font-mono text-[9px] leading-relaxed select-none pointer-events-none">
            <div className="columns-3 md:columns-5 gap-8 p-12 text-white/5 uppercase">
                {lines.map((l, i) => <div key={i} className="whitespace-nowrap">{l}</div>)}
            </div>
        </div>
    )
}