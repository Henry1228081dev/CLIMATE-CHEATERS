"use client";

// Added React import to resolve missing namespace error and fix JSX children detection
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Radio, Globe, ShieldAlert, Terminal, Activity, Cpu, Database, Wifi, ShieldCheck } from "lucide-react";
import { audioController } from "@/lib/audio-controller";

export function ActionView({ onBack }: { onBack: () => void }) {
   const [transmitting, setTransmitting] = useState<string | null>(null);
   const [hackingPhase, setHackingPhase] = useState(0);
   const [hackingComplete, setHackingComplete] = useState(false);

   useEffect(() => {
      audioController.playSFX("scan");
      const t1 = setTimeout(() => setHackingPhase(1), 2500);
      const t2 = setTimeout(() => setHackingPhase(2), 5000);
      const t3 = setTimeout(() => setHackingComplete(true), 7000);
      return () => {
         clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      };
   }, []);

   const handleShare = (platform: string) => {
      setTransmitting(platform);
      audioController.playSFX("upload");
      setTimeout(() => {
         audioController.playSFX("success");
         const shareText = "Exposing the truth! Join the movement. #ClimateCheerers";
         const url = window.location.href;
         let link = "";
         if (platform === 'twitter') link = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
         if (platform === 'linkedin') link = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
         if (platform === 'facebook') link = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
         if (link) window.open(link, '_blank');
         setTransmitting(null);
      }, 1200);
   };

   return (
      <motion.div
         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
         className="fixed inset-0 z-[110] bg-black font-mono text-green-500 h-screen overflow-hidden flex flex-col"
      >
         {/* Background Grid Pattern */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

         {/* HEADER HUD */}
         <header className="flex justify-between items-center px-4 py-3 md:px-6 md:py-4 border-b border-green-500/10 bg-black/80 backdrop-blur-md relative z-30 shrink-0">
            <div className="flex items-center gap-4 md:gap-6">
               <button onClick={onBack} className="flex items-center gap-2 hover:bg-green-500/10 px-3 py-1 border border-green-500/30 rounded text-[10px] uppercase font-bold text-green-500">
                  <ArrowLeft size={12} />
                  <span>[ ABORT ]</span>
               </button>
               <div className="hidden md:block text-[10px] text-green-500/40 uppercase tracking-widest font-mono border-l border-green-500/20 pl-6">
                  LOCATION: SECTOR_04_UPLINK // ENCRYPTED_CHANNEL
               </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
               <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_red]" />
               <span className="text-red-500 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">LIVE UPLINK</span>
            </div>
         </header>

         {/* MAIN HUD LAYOUT */}
         <main className="flex-1 flex flex-col md:flex-row p-2 md:p-4 gap-4 overflow-hidden relative z-20">

            {/* LEFT HUD SIDEBAR - Hidden on mobile */}
            <div className="hidden md:flex w-64 flex-col gap-4 opacity-50 shrink-0">
               <SidebarPanel title="NET_TRAFFIC_MONITOR">
                  <div className="text-[9px] space-y-1 font-mono uppercase">
                     <div className="text-green-400">&gt; ESTABLISHING SECURE HANDSHAKE ...</div>
                     <div>&gt; PACKET_LOSS: 0.00%</div>
                     <div>&gt; PING: 12ms</div>
                     <div>&gt; UPLINK: STABLE [GIGABIT]</div>
                     <div>&gt; ENCRYPTION: AES-256-GCM</div>
                     <div className="text-zinc-500">PROXY CHAIN: SINGAPORE -&gt; PARIS -&gt; TULSA</div>
                  </div>
               </SidebarPanel>
               <SidebarPanel title="DATABASE_QUERY" icon={<Database size={14} />}>
                  <div className="text-[9px] space-y-1 font-mono uppercase text-green-500/70">
                     <div>&gt; SELECT * FROM TARGETS</div>
                     <div>&gt; WHERE DECEPTION_SCORE &gt; 90</div>
                     <div>&gt; ORDER BY CO2_IMPACT DESC</div>
                     <div>&gt; RETURN LIMIT 100</div>
                     <div className="pt-2 text-green-400">RESULTS_BUFFERED: 458 ENTRIES</div>
                  </div>
               </SidebarPanel>
            </div>

            {/* CENTER ACTION AREA */}
            <div className="flex-1 flex items-center justify-center relative w-full h-full">
               <AnimatePresence mode="wait">
                  {!hackingComplete ? (
                     <motion.div
                        key="hacking"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="w-full max-w-sm bg-black border border-green-500/30 p-6 md:p-8 rounded shadow-2xl space-y-6 relative m-4"
                     >
                        {/* Terminal Decoration */}
                        <div className="absolute top-0 left-0 right-0 bg-green-500/10 px-4 py-1 flex justify-between items-center border-b border-green-500/20">
                           <span className="text-[9px] font-bold tracking-widest">SYSTEM_OVERRIDE_CONSOLE</span>
                           <div className="flex gap-1.5">
                              <div className="w-2 h-2 rounded-full border border-green-500/30" />
                              <div className="w-2 h-2 rounded-full border border-red-500/30" />
                           </div>
                        </div>

                        <div className="text-center space-y-6 pt-4">
                           <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.3em] text-white">
                              {hackingPhase === 0 ? "SHREDDING FIREWALLS" : hackingPhase === 1 ? "INJECTING PAYLOAD" : "SECURING UPLINK"}
                           </h2>
                           <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                              <motion.div className="h-full bg-green-500 shadow-[0_0_10px_#22c55e]" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 7, ease: "linear" }} />
                           </div>
                           <div className="text-[8px] font-mono text-green-500/40 text-left h-24 overflow-hidden uppercase">
                              {Array.from({ length: 8 }).map((_, i) => (
                                 <div key={i} className="flex justify-between border-b border-white/5 pb-1 mb-1">
                                    <span>&gt; SYSCALL_{Math.floor(Math.random() * 999)} // MEM_OFFSET_0x{Math.random().toString(16).substr(2, 6).toUpperCase()}</span>
                                    <span>OK</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </motion.div>
                  ) : transmitting ? (
                     <div className="text-center space-y-4">
                        <div className="w-10 h-10 mx-auto border-2 border-green-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(34,197,94,0.3)]" />
                        <div className="text-sm font-black uppercase tracking-[0.4em] text-white">TRANSMITTING VERIFIED INTEL...</div>
                     </div>
                  ) : (
                     <motion.div key="ready" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl flex flex-col items-center">
                        <div className="w-full bg-black/40 backdrop-blur-xl border border-green-500/20 p-6 md:p-10 rounded-2xl relative">
                           {/* Corner Brackets */}
                           <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-green-500/40" />
                           <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-green-500/40" />
                           <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-green-500/40" />
                           <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-green-500/40" />

                           <div className="text-center space-y-6 md:space-y-8">
                              <ShieldAlert className="w-12 h-12 md:w-16 md:h-16 mx-auto text-green-500 opacity-60 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                              <h1 className="text-3xl md:text-5xl lg:text-7xl font-tactical font-black text-white uppercase tracking-tighter leading-none">Spread The Cause</h1>

                              <div className="bg-green-500/5 border-l-4 border-green-500 p-4 md:p-6 text-left space-y-3">
                                 <div className="text-[10px] md:text-xs font-bold text-green-400 uppercase tracking-widest font-mono flex items-center gap-2">
                                    <Terminal size={12} />
                                    <span>DIRECTIVE: Disseminate verified forensic intel.</span>
                                 </div>
                                 <div className="text-[10px] md:text-xs font-bold text-green-400 uppercase tracking-widest font-mono flex items-center gap-2">
                                    <Wifi size={12} />
                                    <span>IMPACT: Maximum public awareness.</span>
                                 </div>
                                 <div className="text-[10px] md:text-xs font-bold text-green-400 uppercase tracking-widest font-mono flex items-center gap-2">
                                    <ShieldCheck size={12} />
                                    <span>STATUS: Ready for deployment.</span>
                                 </div>
                              </div>

                              <div className="grid grid-cols-3 gap-3 md:gap-6">
                                 <ChannelButton icon={<Send size={18} />} label="TWITTER" onClick={() => handleShare('twitter')} />
                                 <ChannelButton icon={<Radio size={18} />} label="LINKEDIN" onClick={() => handleShare('linkedin')} />
                                 <ChannelButton icon={<Globe size={18} />} label="FACEBOOK" onClick={() => handleShare('facebook')} />
                              </div>

                              <button onClick={() => window.open("https://sdgs.un.org/goals", "_blank")} className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.6em] font-black text-green-500/40 hover:text-white transition-all">
                                 [ ACCESS_UN_GLOBAL_DATA ]
                              </button>
                           </div>
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>

            {/* RIGHT HUD SIDEBAR - Hidden on mobile */}
            <div className="hidden md:flex w-64 flex-col gap-4 opacity-50 shrink-0">
               <SidebarPanel title="SYSTEM_RESOURCES" icon={<Cpu size={14} />}>
                  <div className="text-[10px] space-y-3 font-mono">
                     <div className="space-y-1">
                        <div className="flex justify-between"><span>CPU_0: 45% / 34°C</span></div>
                        <div className="h-1 w-full bg-zinc-900"><div className="h-full bg-green-500 w-[45%]" /></div>
                     </div>
                     <div className="space-y-1">
                        <div className="flex justify-between"><span>CPU_1: 82% / 58°C</span></div>
                        <div className="h-1 w-full bg-zinc-900"><div className="h-full bg-green-500 w-[82%]" /></div>
                     </div>
                     <div className="flex justify-between"><span>RAM: 8.2GB / 16.0GB</span></div>
                     <div className="flex justify-between text-green-400"><span>GPU: 0% USED</span></div>
                     <div className="flex justify-between text-zinc-500"><span>COOLING: LIQUID_ACTIVE</span></div>
                  </div>
               </SidebarPanel>
               <SidebarPanel title="SYSTEM_LOG">
                  <div className="text-[9px] font-mono uppercase space-y-1 text-green-500/40">
                     <div>sh spread_truth.sh --force --global</div>
                     <div className="text-green-500">&gt; payload injection ...</div>
                     <div>&gt; 24,000 public nodes ...</div>
                     <div>&gt; directive ...</div>
                     <motion.div animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1.5 h-3 bg-green-500" />
                  </div>
               </SidebarPanel>
            </div>
         </main>

         <footer className="px-4 py-3 md:px-6 md:py-3 border-t border-green-500/10 text-[8px] md:text-[9px] text-green-500/20 uppercase font-black flex justify-between tracking-[0.2em] md:tracking-[0.5em] bg-black relative z-30 shrink-0">
            <span>ID: 0x{Math.random().toString(36).substr(2, 4).toUpperCase()}</span>
            <span className="hidden md:inline">ESTABLISHED_HARD_UPLINK</span>
            <span>SYSTEM_STABLE</span>
         </footer>
      </motion.div>
   );
}

// Fixed SidebarPanel definition to use the imported React namespace for ReactNode
function SidebarPanel({ title, children, icon }: { title: string, children?: React.ReactNode, icon?: any }) {
   return (
      <div className="border border-green-500/20 bg-black/40 p-4 rounded-lg flex-1 overflow-hidden flex flex-col">
         <div className="flex items-center gap-2 mb-4 border-b border-green-500/10 pb-2">
            {icon ? icon : <Activity size={14} />}
            <span className="text-[10px] font-black uppercase tracking-widest text-green-500">{title}</span>
            <div className="flex-1" />
            <div className="flex gap-1">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
               <div className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
            </div>
         </div>
         <div className="flex-1 overflow-hidden">
            {children}
         </div>
      </div>
   )
}

function ChannelButton({ icon, label, onClick }: { icon: any, label: string, onClick: () => void }) {
   return (
      <button onClick={onClick} className="group flex flex-col items-center justify-center h-16 md:h-20 border border-green-500/20 bg-black hover:border-green-500 hover:bg-green-500/5 transition-all rounded-xl relative overflow-hidden">
         <div className="text-green-500 group-hover:text-white transition-colors mb-2 z-10">{icon}</div>
         <div className="text-[8px] md:text-[9px] font-black text-green-500/60 group-hover:text-white transition-colors uppercase tracking-widest z-10">{label}</div>
         <div className="absolute inset-0 bg-green-500/5 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />
      </button>
   )
}