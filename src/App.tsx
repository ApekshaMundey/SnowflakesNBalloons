/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Particle } from './types';
import ParticleSystem from './components/ParticleSystem';
import ControlPanel from './components/ControlPanel';

function getPastTime(minutesAgo: number) {
  const d = new Date();
  d.setMinutes(d.getMinutes() - minutesAgo);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

function getFormattedTime() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

export default function App() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [snowflakeTimeLeft, setSnowflakeTimeLeft] = useState(0);
  const [balloonTimeLeft, setBalloonTimeLeft] = useState(0);
  
  // Real-time system log event state
  const [logs, setLogs] = useState<string[]>([
    `[${getPastTime(4)}] Presentational environment initialized`,
    `[${getPastTime(2)}] Hardware acceleration check: SKIA_OK`,
    `[${getPastTime(1)}] Atmospheric simulation core: STANDBY`,
  ]);

  const logEndRef = useRef<HTMLDivElement>(null);

  // Helper to push logs dynamically
  const pushLog = useCallback((message: string) => {
    setLogs((prev) => [...prev, `[${getFormattedTime()}] ${message}`]);
  }, []);

  // Auto scroll logs console to bottom
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Synchronized countdown timer: runs every 50ms for fluent status updates
  useEffect(() => {
    const tick = 50;
    const timer = setInterval(() => {
      setSnowflakeTimeLeft((prev) => {
        if (prev > 0 && prev - tick <= 0) {
          pushLog('Snowflake flurry completed');
        }
        return Math.max(0, prev - tick);
      });
      setBalloonTimeLeft((prev) => {
        if (prev > 0 && prev - tick <= 0) {
          pushLog('Balloon flight completed');
        }
        return Math.max(0, prev - tick);
      });
    }, tick);

    return () => clearInterval(timer);
  }, [pushLog]);

  // Snowflake Spawner Effect
  useEffect(() => {
    if (snowflakeTimeLeft <= 0) return;

    const spawnSnowflake = () => {
      const id = `${Date.now()}-${Math.random()}`;
      
      // Premium dark aesthetic palette: icy slivers, crystalline pearls, and luxurious golden flecks
      const snowflakeColors = [
        '#E2E8F0', // Ice silver
        '#F1F5F9', // Frost white
        '#CBD5E1', // Dull slate
        '#BA9F65', // Muted gold contrast
        '#C5A059', // Classic Aura gold
        '#FFFFFF', // Pure light
      ];
      const randomColor = snowflakeColors[Math.floor(Math.random() * snowflakeColors.length)];

      const newParticle: Particle = {
        id,
        type: 'snowflake',
        x: Math.random() * 92 + 4,              // Keep inside screen padding
        size: Math.floor(Math.random() * 10) + 16, // Medium size range (16px to 26px)
        duration: Math.random() * 1.5 + 4.5,    // 4.5s to 6.0s (pleasing pace)
        color: randomColor,
        sway: Math.random() * 60 - 30,          // Sways -30px to 30px wide
        rotationStart: Math.random() * 360,
        rotationEnd: Math.random() * 360 + 120 * (Math.random() > 0.5 ? 1 : -1),
        createdAt: Date.now(),
      };

      setParticles((prev) => [...prev, newParticle]);
    };

    // Initial burst snowflake
    spawnSnowflake();

    // Constant flow interval every 120ms
    const interval = setInterval(spawnSnowflake, 120);
    return () => clearInterval(interval);
  }, [snowflakeTimeLeft > 0]);

  // Balloon Spawner Effect
  useEffect(() => {
    if (balloonTimeLeft <= 0) return;

    const spawnBalloon = () => {
      const id = `${Date.now()}-${Math.random()}`;

      // Velvet / jewel tone colors that look spectacular on the #09090B deep black frame
      const balloonColors = [
        '#C5A059', // Aura Gold Accent
        '#0E7490', // Deep Cyan/Teal
        '#9F1239', // Velvet Ruby
        '#6d28d9', // Regal Purple
        '#1d4ed8', // Sapphire Slate
        '#BE185D', // Rosé Velvet
      ];
      const randomColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];

      const newParticle: Particle = {
        id,
        type: 'balloon',
        x: Math.random() * 88 + 6,              // Keep balloons slightly inset from left/right edges
        size: Math.floor(Math.random() * 8) + 38, // Medium size range (38px to 46px)
        duration: Math.random() * 1.5 + 5.0,    // 5.0s to 6.5s to cross screen
        color: randomColor,
        sway: Math.random() * 60 - 30,          // Organic drift width
        rotationStart: Math.random() * 14 - 7,  // Subtle initial tilt
        rotationEnd: Math.random() * 24 - 12,   // Gradual vertical alignment sway
        createdAt: Date.now(),
      };

      setParticles((prev) => [...prev, newParticle]);
    };

    // Initial burst balloon
    spawnBalloon();

    // Balanced interval of 240ms to avoid overwhelming, cluttered overlays
    const interval = setInterval(spawnBalloon, 240);
    return () => clearInterval(interval);
  }, [balloonTimeLeft > 0]);

  // Command to initiate a 5-second snowflake cycle
  const handleTriggerSnowflakes = useCallback(() => {
    setSnowflakeTimeLeft(5000);
    pushLog('Snowflake trigger requested -> system emission engaging [5.0s]');
  }, [pushLog]);

  // Command to initiate a 5-second balloon cycle
  const handleTriggerBalloons = useCallback(() => {
    setBalloonTimeLeft(5000);
    pushLog('Balloon trigger requested -> system buoyancy engaging [5.0s]');
  }, [pushLog]);

  // Removes a stale particle once it completes its transition
  const handleRemoveParticle = useCallback((id: string) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <main className="relative min-h-screen bg-[#09090B] text-[#F4F4F5] flex flex-col justify-between overflow-hidden font-sans select-none">
      
      {/* Floating Presentation Particles Layer */}
      <ParticleSystem 
        particles={particles} 
        onRemoveParticle={handleRemoveParticle} 
      />

      {/* Top Navigation Console */}
      <nav className="h-16 border-b border-[#27272A] flex items-center justify-between px-6 md:px-10 bg-[#09090B] shrink-0 relative z-10">
        <div className="flex items-center gap-3">
          {/* Rotating corporate gold diamond glyph */}
          <div className="w-5 h-5 border-2 border-[#C5A059] transform rotate-45 transition-transform duration-1000 hover:rotate-225" />
          <span className="font-display font-semibold text-sm tracking-[2px] uppercase text-[#C5A059]">
            Aura Console
          </span>
        </div>
        <div className="flex items-center gap-6 text-[11px] font-mono text-[#71717A] tracking-wider uppercase">
          <span className="hidden sm:inline">Environmental System v4.2</span>
          <span className="hidden sm:inline text-[#27272A]">•</span>
          <span>Node 08-B Active</span>
        </div>
      </nav>

      {/* Split Operations Workspace */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-[300px_1fr] overflow-hidden relative z-10">
        
        {/* Left Side Program Telemetry Pane */}
        <aside className="border-b lg:border-b-0 lg:border-r border-[#27272A] p-6 lg:p-8 bg-[#0F0F11] flex flex-col gap-8 shrink-0">
          
          {/* Section: Simulation Parameters */}
          <div>
            <h3 className="text-[10px] text-[#71717A] font-display font-bold tracking-[2px] uppercase mb-4">
              Simulation Parameters
            </h3>
            <div className="flex flex-col gap-3">
              <div className="p-4 bg-[#18181B] border border-[#27272A] rounded-xs">
                <div className="text-[11px] text-[#A1A1AA] mb-1">Particle Scale</div>
                <div className="text-sm font-medium font-display text-white">Medium (1.0x)</div>
              </div>
              <div className="p-4 bg-[#18181B] border border-[#27272A] rounded-xs">
                <div className="text-[11px] text-[#A1A1AA] mb-1">Cycle Duration</div>
                <div className="text-sm font-medium font-display text-white">5.00 Seconds</div>
              </div>
            </div>
          </div>

          {/* Section: Real-Time Event Logs */}
          <div className="flex-grow flex flex-col min-h-[160px] lg:min-h-0">
            <h3 className="text-[10px] text-[#71717A] font-display font-bold tracking-[2px] uppercase mb-4">
              Diagnostic Event Log
            </h3>
            <div className="flex-grow bg-[#141417] border border-[#27272A] p-4 font-mono text-[11px] leading-relaxed custom-scrollbar overflow-y-auto max-h-[220px] lg:max-h-none rounded-xs">
              <div className="space-y-2">
                {logs.map((log, index) => (
                  <div key={index} className="text-[#A1A1AA] transition-opacity duration-200">
                    <span className="text-[#C5A059]">{log.substring(0, 9)}</span>
                    <span className="text-zinc-300">{log.substring(9)}</span>
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>
            </div>
          </div>

        </aside>

        {/* Right Side Simulator Core Stage */}
        <section className="relative px-6 py-12 lg:px-16 lg:py-24 flex flex-col items-center justify-center bg-[#09090B]">
          
          {/* Exquisite Gold Radial Grid Gridline Layer */}
          <div 
            className="absolute inset-0 opacity-4 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#C5A059 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="text-center mb-12 max-w-xl relative">
            <h1 className="text-4xl lg:text-5xl font-display font-light tracking-[-1px] mb-4 text-white">
              Atmospheric Trigger
            </h1>
            <p className="text-[#A1A1AA] font-sans text-sm sm:text-base leading-relaxed">
              Select a visual sequence to initiate the environmental simulation. Each premium sequence renders a full-screen canvas interaction for a controlled 5-second window.
            </p>
          </div>

          {/* Primary Operations Deck */}
          <div className="w-full max-w-2xl relative z-10">
            <ControlPanel
              onTriggerSnowflakes={handleTriggerSnowflakes}
              onTriggerBalloons={handleTriggerBalloons}
              snowflakeTimeLeft={snowflakeTimeLeft}
              balloonTimeLeft={balloonTimeLeft}
              totalParticles={particles.length}
            />
          </div>

          {/* System status message */}
          <div className="mt-12 text-[11px] text-[#71717A] tracking-[2px] uppercase flex items-center gap-2.5 font-display font-semibold select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]"></span>
            </span>
            Manual Override Engaged
          </div>

        </section>

      </div>

      {/* High-Elegance Footer */}
      <footer className="h-12 border-t border-[#27272A] flex items-center justify-between px-6 md:px-10 bg-[#09090B] text-[10px] text-[#52525B] font-mono tracking-wider uppercase shrink-0 relative z-10">
        <div>© 2026 Aura Dynamics Corporation</div>
        <div className="hidden sm:block">Precision Interface Design</div>
      </footer>

    </main>
  );
}


