import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Snowflake as SnowflakeIcon } from 'lucide-react';
import { Particle } from '../types';

interface SnowflakeProps {
  key?: string;
  particle: Particle;
  onComplete: (id: string) => void;
}

export default function SnowflakeComponent({ particle, onComplete }: SnowflakeProps) {
  useEffect(() => {
    // Schedule state cleanup after the animation ends
    const timer = setTimeout(() => {
      onComplete(particle.id);
    }, particle.duration * 1000);

    return () => clearTimeout(timer);
  }, [particle.id, particle.duration, onComplete]);

  return (
    <motion.div
      id={`snowflake-${particle.id}`}
      className="absolute pointer-events-none text-sky-400/80 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
      style={{
        left: `${particle.x}%`,
        top: '-40px',
      }}
      initial={{
        y: '-5vh',
        x: 0,
        rotate: particle.rotationStart,
        scale: 0.8,
        opacity: 0,
      }}
      animate={{
        y: '105vh',
        x: [0, particle.sway, -particle.sway, particle.sway / 2],
        rotate: particle.rotationEnd,
        scale: [0.8, 1.1, 1, 1.1, 1],
        opacity: [0, 1, 1, 0.8, 0],
      }}
      transition={{
        duration: particle.duration,
        ease: 'linear',
      }}
    >
      <SnowflakeIcon
        size={particle.size}
        className="stroke-[1.5px]"
        style={{ color: particle.color }}
      />
    </motion.div>
  );
}
