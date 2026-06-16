import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Particle } from '../types';

interface BalloonProps {
  key?: string;
  particle: Particle;
  onComplete: (id: string) => void;
}

export default function BalloonComponent({ particle, onComplete }: BalloonProps) {
  useEffect(() => {
    // Schedule state cleanup after the animation ends
    const timer = setTimeout(() => {
      onComplete(particle.id);
    }, particle.duration * 1000);

    return () => clearTimeout(timer);
  }, [particle.id, particle.duration, onComplete]);

  // Dimensions of a medium-sized balloon (around 40px width to 48px width)
  const balloonHeight = particle.size * 1.3;
  const knotSize = Math.max(6, particle.size * 0.15);

  return (
    <motion.div
      id={`balloon-${particle.id}`}
      className="absolute pointer-events-none flex flex-col items-center"
      style={{
        left: `${particle.x}%`,
        bottom: '-120px',
      }}
      initial={{
        y: '5vh',
        x: 0,
        rotate: particle.rotationStart,
        opacity: 0,
      }}
      animate={{
        y: '-115vh',
        x: [0, particle.sway, -particle.sway, particle.sway / 2],
        rotate: [particle.rotationStart, particle.rotationEnd],
        opacity: [0, 1, 1, 0.9, 0],
      }}
      transition={{
        duration: particle.duration,
        ease: 'easeOut',
      }}
    >
      {/* Balloon envelope with realistic 3D radial gradient highlight */}
      <div
        className="rounded-full shadow-lg"
        style={{
          width: `${particle.size}px`,
          height: `${balloonHeight}px`,
          background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${particle.color} 30%, ${particle.color} 100%)`,
          boxShadow: 'inset -5px -10px 15px rgba(0,0,0,0.2), 0 10px 15px -3px rgba(0,0,0,0.1)',
        }}
      />

      {/* Knot at the bottom */}
      <div
        className="rotate-45 -mt-1 shadow-sm"
        style={{
          width: `${knotSize}px`,
          height: `${knotSize}px`,
          backgroundColor: particle.color,
          borderBottomRightRadius: '2px',
        }}
      />

      {/* String hanging down */}
      <div
        className="w-[1.5px] bg-slate-300 dark:bg-slate-500 opacity-60 rounded-full"
        style={{
          height: `${particle.size * 1.2}px`,
          transformOrigin: 'top center',
          transform: 'rotate(2deg)',
        }}
      />
    </motion.div>
  );
}
