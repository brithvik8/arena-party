import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button.jsx';
import { ArenaCanvas } from '../components/game/ArenaCanvas.jsx';
import { ArrowLeft, Trophy, Timer, Shield, Flame, Activity } from 'lucide-react';

export function Game() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(45);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
      
      {/* Top Navigation & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0E0E0E] p-4 rounded-xl border border-[#232F53] shadow-xl">
        <Button
          variant="ghost"
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigate('/lobby')}
        >
          RETURN TO LOBBY
        </Button>

        {/* Center: Chrono */}
        <div className="flex items-center gap-3 bg-[#0A1329] px-6 py-2 rounded-lg border border-[#232F53]">
          <Timer className="w-5 h-5 text-[#B9121B] animate-pulse" />
          <span className="font-code text-3xl font-black tracking-widest text-[#FDFDFD]">
            00:{String(seconds).padStart(2, '0')}
          </span>
          <span className="font-code text-xs px-2 py-0.5 rounded bg-[#B9121B] text-[#FDFDFD] font-bold">
            ROUND 1 / 5
          </span>
        </div>

        {/* Right: Results preview CTA */}
        <Button
          variant="secondary"
          size="sm"
          icon={Trophy}
          onClick={() => navigate('/results')}
        >
          VIEW RESULTS SCREEN
        </Button>
      </div>

      {/* Screen Title & Phase 1 Scope Clarification */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#B9121B]" />
          <span className="font-code text-xs text-[#00DAF3] font-bold uppercase">
            PHASE 1 ARCHITECTURAL FOUNDATION // CANVAS PREVIEW
          </span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#FDFDFD] uppercase">
          COMBAT ARENA CANVAS
        </h1>
        <p className="font-body text-sm text-[#94A3B8]">
          The HTML5 Canvas rendering viewport and physics simulation will be mounted here in Phase 6. Real-time WASD and bumper dash mechanics are intentionally reserved for Phase 6.
        </p>
      </div>

      {/* Main Canvas Frame */}
      <div className="w-full flex justify-center py-4">
        <ArenaCanvas width={800} height={500} />
      </div>

      {/* Simulated Keybinding Cockpit Footer */}
      <div className="bg-[#0E0E0E] p-4 rounded-xl border border-[#232F53] flex flex-wrap items-center justify-between gap-4 font-code text-xs text-[#94A3B8]">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="bg-[#14234B] px-2 py-1 rounded text-[#00DAF3] font-bold">WASD: MOVE</span>
          <span className="bg-[#B9121B] px-2 py-1 rounded text-[#FDFDFD] font-bold">SPACE: BUMP DASH</span>
          <span className="bg-[#14234B] px-2 py-1 rounded text-[#FDFDFD]">[E]: NITRO BOOST</span>
        </div>
        <div className="flex items-center gap-2 text-[#00DAF3]">
          <Activity className="w-4 h-4" />
          <span>NET PHYSICS: 60 Ticks/sec (Reserved for Phase 6)</span>
        </div>
      </div>

    </div>
  );
}
