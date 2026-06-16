import { Snowflake, Sparkles } from 'lucide-react';

interface ControlPanelProps {
  onTriggerSnowflakes: () => void;
  onTriggerBalloons: () => void;
  snowflakeTimeLeft: number; // 0 to 5000 in ms
  balloonTimeLeft: number;    // 0 to 5000 in ms
  totalParticles: number;
}

export default function ControlPanel({
  onTriggerSnowflakes,
  onTriggerBalloons,
  snowflakeTimeLeft,
  balloonTimeLeft,
}: ControlPanelProps) {
  const isSnowActive = snowflakeTimeLeft > 0;
  const isBalloonActive = balloonTimeLeft > 0;

  return (
    <div className="flex flex-col gap-6 w-full items-center">
      
      {/* Exquisite Trigger Deck Grid */}
      <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center w-full">
        
        {/* Snowflakes Button Card */}
        <button
          id="btn-trigger-snowflakes"
          onClick={onTriggerSnowflakes}
          disabled={isSnowActive}
          className={`flex-[0_0_260px] h-[220px] bg-[#18181B] rounded-[2px] transition-all duration-300 flex flex-col items-center justify-center gap-5 border select-none group text-left ${
            isSnowActive
              ? 'border-[#27272A] opacity-90 cursor-not-allowed shadow-[inset_0_0_25px_rgba(56,189,248,0.04)]'
              : 'border-[#3f3f46] hover:border-[#C5A059] cursor-pointer shadow-md hover:shadow-[0_10px_30px_rgba(197,160,89,0.05)] translate-y-0 active:translate-y-0.5'
          }`}
        >
          {/* Visual Snowflake Symbol */}
          <div className="relative">
            <Snowflake 
              size={40} 
              className={`transition-transform duration-[8000ms] ease-linear ${
                isSnowActive ? 'animate-spin text-[#38bdf8]' : 'text-zinc-600 group-hover:text-[#F4F4F5]'
              }`} 
            />
            {isSnowActive && (
              <span className="absolute inset-0 animate-ping rounded-full bg-[#38bdf8]/10" />
            )}
          </div>

          <div className="text-center px-4">
            <div className={`font-display font-semibold tracking-[2px] uppercase text-[13px] transition-colors duration-300 ${
              isSnowActive ? 'text-[#38bdf8]' : 'text-white'
            }`}>
              Snowflakes
            </div>
            <div className="text-[10px] text-[#71717A] tracking-wider uppercase mt-2">
              {isSnowActive ? 'Descending Array Active' : 'Descending Array'}
            </div>
          </div>

          {/* Integrated Dynamic Status Progress */}
          {isSnowActive && (
            <div className="w-40 h-[2px] bg-[#27272A] rounded-full overflow-hidden mt-1">
              <div 
                className="h-full bg-[#38bdf8] transition-all duration-75 ease-linear"
                style={{ width: `${(snowflakeTimeLeft / 5000) * 100}%` }}
              />
            </div>
          )}
        </button>

        {/* Balloons Button Card */}
        <button
          id="btn-trigger-balloons"
          onClick={onTriggerBalloons}
          disabled={isBalloonActive}
          className={`flex-[0_0_260px] h-[220px] bg-[#18181B] rounded-[2px] transition-all duration-300 flex flex-col items-center justify-center gap-5 border select-none group text-left ${
            isBalloonActive
              ? 'border-[#27272A] opacity-90 cursor-not-allowed shadow-[inset_0_0_25px_rgba(197,160,89,0.04)]'
              : 'border-[#C5A059] hover:border-[#D7B573] cursor-pointer shadow-[0_4px_16px_rgba(197,160,89,0.08)] hover:shadow-[0_10px_30px_rgba(197,160,89,0.12)] translate-y-0 active:translate-y-0.5'
          }`}
        >
          {/* Visual Balloon Sparkle Symbol */}
          <div className="relative">
            <Sparkles 
              size={40} 
              className={`transition-colors duration-300 ${
                isBalloonActive ? 'text-[#C5A059] animate-pulse' : 'text-[#C5A059] group-hover:text-[#D7B573]'
              }`} 
            />
            {isBalloonActive && (
              <span className="absolute inset-0 animate-ping rounded-full bg-[#C5A059]/10" />
            )}
          </div>

          <div className="text-center px-4">
            <div className={`font-display font-semibold tracking-[2px] uppercase text-[13px] transition-colors duration-300 ${
              isBalloonActive ? 'text-[#C5A059]' : 'text-[#C5A059]'
            }`}>
              Balloons
            </div>
            <div className={`text-[10px] tracking-wider uppercase mt-2 transition-colors duration-300 ${
              isBalloonActive ? 'text-[#A1A1AA]' : 'text-[#71717A]'
            }`}>
              {isBalloonActive ? 'Ascending Float Active' : 'Ascending Float'}
            </div>
          </div>

          {/* Integrated Dynamic Status Progress */}
          {isBalloonActive && (
            <div className="w-40 h-[2px] bg-[#27272A] rounded-full overflow-hidden mt-1">
              <div 
                className="h-full bg-[#C5A059] transition-all duration-75 ease-linear"
                style={{ width: `${(balloonTimeLeft / 5000) * 100}%` }}
              />
            </div>
          )}
        </button>

      </div>

      {/* Mini Active Simulation Timer Status Block */}
      {(isSnowActive || isBalloonActive) && (
        <div className="mt-2 text-[10px] font-mono text-[#71717A] tracking-widest uppercase animate-fade-in flex items-center gap-2">
          <span>Active sequence countdown: </span>
          <span className="text-white font-semibold">
            {isSnowActive ? `${(snowflakeTimeLeft / 1000).toFixed(1)}s` : `${(balloonTimeLeft / 1000).toFixed(1)}s`}
          </span>
        </div>
      )}

    </div>
  );
}

