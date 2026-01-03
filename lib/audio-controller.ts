
export class AudioController {
  ctx: AudioContext | null = null;
  masterGain: GainNode | null = null;
  droneNodes: { oscillators: OscillatorNode[], gain: GainNode } | null = null;
  dataStreamNode: { oscillator: OscillatorNode, gain: GainNode, timer: number } | null = null;
  isInitialized = false;

  constructor() {}

  initialize() {
    if (this.isInitialized) return;
    
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AudioContextClass();
    
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.4;
    this.masterGain.connect(this.ctx.destination);
    
    this.isInitialized = true;
    this.startDrone();
  }

  startDrone() {
    if (!this.ctx || !this.masterGain) return;

    // Create drone gain node for separate volume control
    const droneGain = this.ctx.createGain();
    droneGain.gain.value = 0; // Start silent, ramp up
    droneGain.connect(this.masterGain);

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const osc3 = this.ctx.createOscillator();

    // Base configuration (Dark Ambient)
    osc1.type = "sawtooth";
    osc1.frequency.value = 55; // A1
    
    osc2.type = "sine";
    osc2.frequency.value = 55.5; // Slight detune
    
    osc3.type = "triangle";
    osc3.frequency.value = 27.5; // Sub octave

    // Filter to dampen the sawtooth
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 200;

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(droneGain);

    osc1.start();
    osc2.start();
    osc3.start();

    // Fade in
    droneGain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 4);

    this.droneNodes = {
      oscillators: [osc1, osc2, osc3],
      gain: droneGain
    };
  }

  startDataStream() {
    if (!this.ctx || !this.masterGain || this.dataStreamNode) return;

    const gain = this.ctx.createGain();
    gain.gain.value = 0.05;
    gain.connect(this.masterGain);

    const osc = this.ctx.createOscillator();
    osc.type = "square";
    osc.connect(gain);
    osc.start();

    // Create a rhythmic bleeping pattern
    const now = this.ctx.currentTime;
    let nextTime = now;
    
    const scheduleBeeps = () => {
        if (!this.dataStreamNode || !this.ctx) return;
        
        // Schedule slight frequency variations for "computing" sound
        const freq = Math.random() > 0.5 ? 800 : 1200;
        osc.frequency.setValueAtTime(freq, nextTime);
        
        // Envelope
        gain.gain.setValueAtTime(0.02, nextTime);
        gain.gain.exponentialRampToValueAtTime(0.001, nextTime + 0.05);

        nextTime += Math.random() * 0.1 + 0.05; // Random interval between 50ms and 150ms
        
        this.dataStreamNode.timer = window.setTimeout(scheduleBeeps, 50);
    };

    this.dataStreamNode = {
        oscillator: osc,
        gain: gain,
        timer: window.setTimeout(scheduleBeeps, 50)
    };
  }

  stopDataStream() {
    if (this.dataStreamNode) {
        clearTimeout(this.dataStreamNode.timer);
        this.dataStreamNode.oscillator.stop();
        this.dataStreamNode.gain.disconnect();
        this.dataStreamNode = null;
    }
  }

  setMode(mode: "corporate" | "forensic") {
    if (!this.ctx || !this.droneNodes) return;

    const { oscillators } = this.droneNodes;
    const now = this.ctx.currentTime;
    
    // Smooth transition params
    const timeConstant = 2;

    if (mode === "forensic") {
        // More dissonance, higher tension
        oscillators[0].frequency.setTargetAtTime(58, now, timeConstant); // Clash
        oscillators[1].frequency.setTargetAtTime(55, now, timeConstant);
        oscillators[2].frequency.setTargetAtTime(110, now, timeConstant); // Higher sub
    } else {
        // Deep, calm, secure
        oscillators[0].frequency.setTargetAtTime(55, now, timeConstant);
        oscillators[1].frequency.setTargetAtTime(55.2, now, timeConstant);
        oscillators[2].frequency.setTargetAtTime(27.5, now, timeConstant);
    }
  }

  playSFX(type: "click" | "glitch" | "alarm" | "scan" | "upload" | "success" | "acquire") {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.masterGain);

    const now = this.ctx.currentTime;

    switch (type) {
        case "click":
            osc.type = "square";
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start();
            osc.stop(now + 0.05);
            break;
            
        case "glitch":
            // Noise burst
            const bufferSize = this.ctx.sampleRate * 0.1;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;
            const noiseGain = this.ctx.createGain();
            noiseGain.gain.value = 0.05;
            noise.connect(noiseGain);
            noiseGain.connect(this.masterGain);
            noise.start();
            break;

        case "alarm":
             // Nuclear Siren / Reactor Warning - Intense pitch bend
            const osc1 = this.ctx.createOscillator();
            osc1.type = "sawtooth";
            // Start low, ramp up high, ramp down (Air raid style)
            osc1.frequency.setValueAtTime(150, now);
            osc1.frequency.linearRampToValueAtTime(400, now + 1.5);
            osc1.frequency.linearRampToValueAtTime(150, now + 3.0);
            
            const gain1 = this.ctx.createGain();
            gain1.gain.setValueAtTime(0, now);
            gain1.gain.linearRampToValueAtTime(0.35, now + 0.5);
            gain1.gain.linearRampToValueAtTime(0.35, now + 2.5);
            gain1.gain.linearRampToValueAtTime(0, now + 3.0);

            // Dissonant sub-tone
            const osc2 = this.ctx.createOscillator();
            osc2.type = "square";
            osc2.frequency.setValueAtTime(140, now); // Tritone-ish dissonance
            osc2.frequency.linearRampToValueAtTime(390, now + 1.5);
            osc2.frequency.linearRampToValueAtTime(140, now + 3.0);
            
            const gain2 = this.ctx.createGain();
            gain2.gain.setValueAtTime(0.1, now);
            gain2.gain.linearRampToValueAtTime(0.1, now + 2.5);
            gain2.gain.linearRampToValueAtTime(0, now + 3.0);

            osc1.connect(gain1);
            gain1.connect(this.masterGain);
            
            osc2.connect(gain2);
            gain2.connect(this.masterGain);

            osc1.start();
            osc2.start();
            
            osc1.stop(now + 3.1);
            osc2.stop(now + 3.1);
            break;

        case "scan":
            // High pitched data sweep
            osc.type = "sine";
            osc.frequency.setValueAtTime(2000, now);
            osc.frequency.exponentialRampToValueAtTime(4000, now + 0.2);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.02, now + 0.1);
            gain.gain.linearRampToValueAtTime(0, now + 0.2);
            osc.start();
            osc.stop(now + 0.2);
            break;
            
        case "acquire":
             // Target lock sound (sharp beep)
            osc.type = "square";
            osc.frequency.setValueAtTime(1200, now);
            osc.frequency.setValueAtTime(1200, now + 0.05);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            osc.start();
            osc.stop(now + 0.1);
            break;

        case "upload":
            // Rising modem-like tones
            osc.type = "square";
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.linearRampToValueAtTime(1200, now + 1.5);
            
            // Modulation
            const lfo = this.ctx.createOscillator();
            lfo.frequency.value = 15;
            const lfoGain = this.ctx.createGain();
            lfoGain.gain.value = 500;
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start();
            lfo.stop(now + 1.5);

            gain.gain.setValueAtTime(0.05, now);
            gain.gain.linearRampToValueAtTime(0, now + 1.5);
            
            osc.start();
            osc.stop(now + 1.5);
            break;

        case "success":
            // Positive chime
            osc.type = "sine";
            osc.frequency.setValueAtTime(880, now); // A5
            osc.frequency.setValueAtTime(1108.73, now + 0.1); // C#6
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1);
            osc.start();
            osc.stop(now + 1);
            break;
    }
  }

  stop() {
    this.stopDataStream();
    if (this.droneNodes) {
        this.droneNodes.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 1);
        setTimeout(() => {
            this.droneNodes?.oscillators.forEach(o => o.stop());
            this.ctx?.close();
        }, 1000);
    }
  }
}

export const audioController = new AudioController();
