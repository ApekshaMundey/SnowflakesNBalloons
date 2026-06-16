import { Particle } from '../types';
import SnowflakeComponent from './SnowflakeComponent';
import BalloonComponent from './BalloonComponent';

interface ParticleSystemProps {
  particles: Particle[];
  onRemoveParticle: (id: string) => void;
}

export default function ParticleSystem({ particles, onRemoveParticle }: ParticleSystemProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => {
        if (p.type === 'snowflake') {
          return (
            <SnowflakeComponent
              key={p.id}
              particle={p}
              onComplete={onRemoveParticle}
            />
          );
        } else {
          return (
            <BalloonComponent
              key={p.id}
              particle={p}
              onComplete={onRemoveParticle}
            />
          );
        }
      })}
    </div>
  );
}
