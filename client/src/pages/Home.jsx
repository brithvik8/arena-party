import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button.jsx';
import { 
  Zap, 
  LogIn, 
  Users, 
  Timer, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  Activity,
  Flame,
  Radio,
  Sliders
} from 'lucide-react';

export function Home() {
  const navigate = useNavigate();
  const [quickCode, setQuickCode] = useState('X7K9P');
  const [joinedMsg, setJoinedMsg] = useState('');

  const handleQuickJoin = (e) => {
    e.preventDefault();
    if (quickCode.trim().length >= 4) {
      setJoinedMsg('CONNECTING TO ARENA...');
      setTimeout(() => {
        navigate(`/join?code=${quickCode.trim().toUpperCase()}`);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col w-full pb-16">
      
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-[#0A1329] pt-12 pb-20 border-b border-[#232F53]/40 bg-tactical-grid">
        
        {/* Ambient Glows */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#B9121B]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[420px] h-[420px] bg-[#00DAF3]/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission Briefing */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Live Status Header */}
            <div className="flex items-center gap-2 w-fit px-3 py-1 rounded bg-[#14234B] border border-[#232F53] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#B9121B] animate-ping" />
              <span className="font-code text-[11px] uppercase tracking-wider text-[#FDFDFD] font-bold">
                SEASON 04 LIVE
              </span>
              <span className="text-[#94A3B8] text-xs">/</span>
              <span className="font-code text-[11px] text-[#00DAF3] font-bold">
                NET_VER: 2.4.9
              </span>
            </div>

            {/* Headline Stack */}
            <div className="flex flex-col">
              <span className="font-code text-xs text-[#94A3B8] tracking-[0.25em] uppercase mb-1">
                ARCADE BUMPER COMBAT NETWORK
              </span>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-[#FDFDFD] uppercase tracking-tight leading-none drop-shadow-md">
                PARTY <span className="text-[#B9121B] drop-shadow-[0_0_24px_rgba(185,18,27,0.7)]">ARENA</span>
              </h1>
              <p className="font-display text-sm sm:text-base uppercase text-[#00DAF3] tracking-wide mt-3 flex flex-wrap items-center gap-2 font-bold">
                <span>ENTER THE ARENA.</span>
                <span className="text-[#94A3B8]">■</span>
                <span>BUMP.</span>
                <span className="text-[#94A3B8]">■</span>
                <span>SURVIVE.</span>
                <span className="text-[#94A3B8]">■</span>
                <span className="text-[#B9121B]">WIN.</span>
              </p>
            </div>

            {/* Description */}
            <p className="font-body text-base sm:text-lg text-[#94A3B8] max-w-xl leading-relaxed">
              A lightning-fast, high-stakes 2–8 player bumper combat brawler. Create a private room, configure custom arena modifiers, push your rivals into the void, and claim the championship crown.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                icon={Zap}
                onClick={() => navigate('/create')}
              >
                CREATE ROOM
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={LogIn}
                onClick={() => navigate('/join')}
              >
                JOIN ROOM
              </Button>
            </div>

            {/* Quick Code Switchboard */}
            <form onSubmit={handleQuickJoin} className="p-3 rounded bg-[#14234B]/80 border border-[#232F53] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 max-w-lg shadow-lg">
              <div className="flex items-center gap-2 pl-1">
                <span className="font-code text-xs text-[#94A3B8] uppercase font-bold">
                  HAVE A CODE?
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    maxLength={5}
                    value={quickCode}
                    onChange={(e) => setQuickCode(e.target.value.toUpperCase())}
                    className="w-28 sm:w-32 bg-[#0A1329] text-[#FDFDFD] border border-[#232F53] focus:border-[#00DAF3] rounded font-code text-base text-center uppercase tracking-widest px-2 py-1.5 outline-none font-bold transition-colors"
                    placeholder="X7K9P"
                  />
                  <span className="absolute right-2 top-2 text-[10px] font-code text-[#94A3B8] pointer-events-none">#</span>
                </div>
                <Button
                  type="submit"
                  variant="accent"
                  size="sm"
                  icon={ArrowRight}
                >
                  JOIN
                </Button>
              </div>
            </form>
            {joinedMsg && (
              <span className="font-code text-xs text-[#00DAF3] animate-pulse">
                {joinedMsg}
              </span>
            )}

            {/* Netcode Badges */}
            <div className="flex items-center gap-4 pt-1 font-code text-xs text-[#94A3B8]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-[#00DAF3]" />
                <span className="uppercase">60Hz Tickrate</span>
              </div>
              <span className="text-[#232F53]">|</span>
              <div className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#B9121B]" />
                <span className="uppercase">Socket.IO Sub-15ms Netcode</span>
              </div>
            </div>

          </div>

          {/* Right Column: Tactical Radar Arena Showcase */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            <div className="relative w-full max-w-[500px] aspect-square rounded-xl bg-[#0F1C3F] border-2 border-[#232F53] p-3 shadow-2xl flex flex-col overflow-hidden">
              
              {/* Tactical Top Bar */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#14234B] rounded border-b border-[#232F53] text-[#FDFDFD] font-code text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#B9121B]" />
                  <span className="tracking-widest uppercase font-bold">RADAR_SIM // LIVE_GRID</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#1B2D5D] text-[#00DAF3] font-bold">
                    SURVIVORS: 4/4
                  </span>
                  <span className="text-[#B9121B] font-bold">00:43</span>
                </div>
              </div>

              {/* Dynamic SVG Tactical Arena */}
              <div className="relative w-full flex-1 flex items-center justify-center bg-[#0A1329] overflow-hidden my-2 rounded">
                <svg className="w-full h-full select-none" viewBox="0 0 500 500">
                  <defs>
                    <radialGradient id="voidGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#14234B" stopOpacity="0.8" />
                      <stop offset="70%" stopColor="#0A1329" />
                      <stop offset="100%" stopColor="#B9121B" stopOpacity="0.3" />
                    </radialGradient>
                  </defs>

                  <rect width="500" height="500" fill="url(#voidGradient)" />

                  {/* Outer Hexagonal Boundary */}
                  <polygon
                    points="250,25 440,135 440,365 250,475 60,365 60,135"
                    fill="#0F1C3F"
                    stroke="#B9121B"
                    strokeWidth="3"
                    strokeDasharray="10,5"
                  />

                  {/* Inner Floor Grid */}
                  <polygon
                    points="250,60 410,152 410,348 250,440 90,348 90,152"
                    fill="#14234B"
                    stroke="#232F53"
                    strokeWidth="1.5"
                  />

                  {/* Center Core */}
                  <circle cx="250" cy="250" r="32" fill="#0A1329" stroke="#00DAF3" strokeWidth="2" />
                  <circle cx="250" cy="250" r="14" fill="#B9121B" />

                  {/* PLAYER 1: Neon Cyan Bumper */}
                  <g transform="translate(190, 180)">
                    <circle cx="0" cy="0" r="22" fill="#00DAF3" fillOpacity="0.3" stroke="#00DAF3" strokeWidth="2.5" />
                    <circle cx="0" cy="0" r="14" fill="#00DAF3" />
                    <circle cx="0" cy="0" r="6" fill="#0A1329" />
                    <text x="-20" y="-28" fill="#00DAF3" fontFamily="Space Mono" fontSize="9" fontWeight="bold">P1:VIPER</text>
                  </g>

                  {/* PLAYER 2: Scarlet Red Bumper */}
                  <g transform="translate(280, 230)">
                    <circle cx="0" cy="0" r="22" fill="#B9121B" fillOpacity="0.3" stroke="#B9121B" strokeWidth="2.5" />
                    <circle cx="0" cy="0" r="14" fill="#B9121B" />
                    <circle cx="0" cy="0" r="6" fill="#FDFDFD" />
                    <text x="-20" y="36" fill="#B9121B" fontFamily="Space Mono" fontSize="9" fontWeight="bold">P2:CRUSH</text>
                  </g>

                  {/* Collision Sparks */}
                  <g transform="translate(235, 205)">
                    <circle cx="0" cy="0" r="10" fill="#FFDAD6" opacity="0.8" />
                    <line x1="-8" y1="-8" x2="8" y2="8" stroke="#FDFDFD" strokeWidth="2" />
                    <line x1="8" y1="-8" x2="-8" y2="8" stroke="#FDFDFD" strokeWidth="2" />
                  </g>

                  {/* PLAYER 3: Amber Bumper */}
                  <g transform="translate(340, 160)">
                    <circle cx="0" cy="0" r="20" fill="#FFB300" fillOpacity="0.3" stroke="#FFB300" strokeWidth="2" />
                    <circle cx="0" cy="0" r="13" fill="#FFB300" />
                    <text x="-20" y="-25" fill="#FFB300" fontFamily="Space Mono" fontSize="9" fontWeight="bold">P3:NOVA</text>
                  </g>

                  {/* PLAYER 4: Toxic Lime Bumper */}
                  <g transform="translate(130, 320)">
                    <circle cx="0" cy="0" r="20" fill="#39FF14" fillOpacity="0.3" stroke="#39FF14" strokeWidth="2" />
                    <circle cx="0" cy="0" r="13" fill="#39FF14" />
                    <text x="-22" y="32" fill="#39FF14" fontFamily="Space Mono" fontSize="9" fontWeight="bold">P4:GLITCH</text>
                  </g>
                </svg>

                {/* Real-time Indicator Pill */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none px-2 font-code text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-[#0E0E0E]/90 text-[#00DAF3] border border-[#232F53]">
                    ACTIVE MOD: SLIPPERY ICE
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#B9121B] text-[#FDFDFD] font-bold">
                    DANGER RIM
                  </span>
                </div>
              </div>

              {/* Bottom Telemetry Ticker */}
              <div className="px-3 py-1 bg-[#14234B] flex items-center justify-between border-t border-[#232F53] font-code text-[11px] text-[#94A3B8]">
                <div className="flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-[#00DAF3]" />
                  <span>VELOCITY: 880px/s</span>
                </div>
                <div className="flex items-center gap-1 text-[#B9121B]">
                  <Flame className="w-3.5 h-3.5" />
                  <span>KNOCKOUT IMPACT: 4.2G</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* LIVE MATCHES STRIP */}
      <section className="w-full bg-[#0F1C3F] border-b border-[#232F53]/40 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-code text-xs text-[#94A3B8]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#00DAF3] animate-pulse" />
            <span className="text-[#FDFDFD] font-bold">1,842 ARENAS IN COMBAT</span>
            <span>·</span>
            <span>7,368 BUMPERS KNOCKED OFF TODAY</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase">FEATURED ARENAS:</span>
            <span className="px-2 py-0.5 rounded bg-[#14234B] text-[#00DAF3] border border-[#232F53]">
              #NEON_CHAOS (7/8)
            </span>
            <span className="px-2 py-0.5 rounded bg-[#14234B] text-[#B9121B] border border-[#232F53]">
              #SUDDEN_DEATH (4/4)
            </span>
          </div>
        </div>
      </section>

      {/* THE 4 PILLARS FEATURE BENTO GRID */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 flex flex-col gap-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-[#B9121B]" />
              <span className="font-code text-xs text-[#B9121B] uppercase font-bold">
                TACTICAL PILLARS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#FDFDFD] tracking-tight">
              ENGINEERED FOR INSTANT MAYHEM
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-[#94A3B8] max-w-md">
            Zero friction. Jump directly into physics-driven multiplayer combat with zero installations and low latency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pillar 1: 2-8 PLAYERS */}
          <div className="group relative p-6 rounded-xl bg-[#0F1C3F] border border-[#232F53] hover:border-[#B9121B] transition-all flex flex-col justify-between shadow-xl">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-code text-[11px] px-2 py-0.5 rounded bg-[#B9121B] text-[#FDFDFD] font-bold">
                  PILLAR // 01
                </span>
                <Users className="w-6 h-6 text-[#B9121B]" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-[#FDFDFD] group-hover:text-[#B9121B] transition-colors">
                2–8 PLAYERS
              </h3>
              <p className="font-body text-sm text-[#94A3B8]">
                Instant private room matchmaking. Battle your closest friends locally or jump into public lobbies against skilled tactical brawlers worldwide.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#232F53] flex items-center justify-between font-code text-xs text-[#00DAF3] font-bold">
              <span>UP TO 8 SLOTS</span>
              <div className="flex gap-1">
                {[...Array(8)].map((_, i) => (
                  <span key={i} className={`w-2 h-2 rounded-xs ${i < 4 ? 'bg-[#00DAF3]' : 'bg-[#232F53]'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Pillar 2: FAST ROUNDS */}
          <div className="group relative p-6 rounded-xl bg-[#0F1C3F] border border-[#232F53] hover:border-[#00DAF3] transition-all flex flex-col justify-between shadow-xl">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-code text-[11px] px-2 py-0.5 rounded bg-[#00DAF3] text-[#0A1329] font-black">
                  PILLAR // 02
                </span>
                <Timer className="w-6 h-6 text-[#00DAF3]" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-[#FDFDFD] group-hover:text-[#00DAF3] transition-colors">
                FAST ROUNDS
              </h3>
              <p className="font-body text-sm text-[#94A3B8]">
                60-second adrenaline-fueled brawls where one misstep knocks you out. High stakes, continuous momentum, and instantaneous rematches.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#232F53] flex items-center justify-between font-code text-xs text-[#FDFDFD]">
              <span className="text-[#00DAF3] font-bold">60s CLOCK</span>
              <span className="text-[#94A3B8]">NO RESPAWN</span>
            </div>
          </div>

          {/* Pillar 3: PRIVATE ROOMS */}
          <div className="group relative p-6 rounded-xl bg-[#0F1C3F] border border-[#232F53] hover:border-[#3C486D] transition-all flex flex-col justify-between shadow-xl">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-code text-[11px] px-2 py-0.5 rounded bg-[#3C486D] text-[#FDFDFD] font-bold">
                  PILLAR // 03
                </span>
                <Lock className="w-6 h-6 text-[#00DAF3]" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-[#FDFDFD] group-hover:text-[#00DAF3] transition-colors">
                PRIVATE ROOMS
              </h3>
              <p className="font-body text-sm text-[#94A3B8]">
                Create invite-only arenas in one tap. Share a crisp 5-character alphanumeric room code directly to Discord, Slack, or instant message.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#232F53] flex items-center justify-between font-code text-xs">
              <span className="bg-[#14234B] px-2 py-0.5 rounded text-[#00DAF3] font-bold">
                #X7K9P
              </span>
              <span className="text-[#94A3B8]">ONE-CLICK SHARE</span>
            </div>
          </div>

          {/* Pillar 4: MULTIPLE GAME MODES */}
          <div className="group relative p-6 rounded-xl bg-[#0F1C3F] border border-[#232F53] hover:border-[#B9121B] transition-all flex flex-col justify-between shadow-xl">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-code text-[11px] px-2 py-0.5 rounded bg-[#B9121B] text-[#FDFDFD] font-bold">
                  PILLAR // 04
                </span>
                <Sparkles className="w-6 h-6 text-[#B9121B]" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-[#FDFDFD] group-hover:text-[#B9121B] transition-colors">
                MULTIPLE MODES
              </h3>
              <p className="font-body text-sm text-[#94A3B8]">
                Toggle live hazards: Classic Bump, Slippery Ice, Shrinking Ring perimeter, Low Gravity vortex, and Bouncy Laser walls.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#232F53] flex flex-wrap gap-1 font-code text-[9px]">
              <span className="px-1.5 py-0.5 rounded bg-[#14234B] text-[#00DAF3]">ICE</span>
              <span className="px-1.5 py-0.5 rounded bg-[#14234B] text-[#B9121B]">SHRINK</span>
              <span className="px-1.5 py-0.5 rounded bg-[#14234B] text-[#FFB300]">LOW-G</span>
              <span className="px-1.5 py-0.5 rounded bg-[#14234B] text-[#39FF14]">LASERS</span>
            </div>
          </div>

        </div>

      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="w-full bg-[#0A1329] border-t-2 border-[#B9121B] py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
          <span className="font-code text-xs bg-[#B9121B] text-[#FDFDFD] px-3 py-1 rounded uppercase tracking-widest font-black">
            PUBLIC SERVER CLUSTER ONLINE
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#FDFDFD] tracking-tight">
            READY TO CLAIM THE CROWN?
          </h2>
          <p className="font-body text-base text-[#94A3B8] max-w-xl">
            Grab up to 7 friends or rival brawlers. Spin up your custom match in less than 5 seconds. No download required.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              icon={Zap}
              onClick={() => navigate('/create')}
            >
              HOST ARENA NOW
            </Button>
          </div>
          <div className="pt-4 font-code text-[11px] text-[#94A3B8] flex items-center gap-3">
            <span>PARTY ARENA NETWORKS</span>
            <span>•</span>
            <span>BROWSER WEBGPU / CANVAS READY</span>
            <span>•</span>
            <span>LATENCY OPTIMIZED</span>
          </div>
        </div>
      </section>

    </div>
  );
}
