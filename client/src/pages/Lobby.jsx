import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/common/Button.jsx';
import { PlayerSlot } from '../components/lobby/PlayerSlot.jsx';
import { ArrowLeft, Rocket, Copy, Check, Users, Shield, Sliders } from 'lucide-react';
import { socket } from '../socket/socket.js';
import { useGameState } from '../hooks/useGameState.js';

export function Lobby() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomCode = searchParams.get('room') || 'X7K9P';
  const { playerName, playerColor } = useGameState();
  const [copied, setCopied] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const copyCode = () => {
    navigator.clipboard?.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleReady = () => {
    setIsReady(!isReady);
    socket.emit('player:ready', { ready: !isReady });
  };

  const mockPlayers = [
    { id: '1', name: playerName, color: playerColor, ready: isReady, isHost: true },
    { id: '2', name: 'CYBER_GHOST', color: '#00DAF3', ready: true, isHost: false },
    { id: '3', name: 'NEON_BLITZ', color: '#FFB300', ready: true, isHost: false },
    { id: '4', name: 'TOXIC_RAID', color: '#39FF14', ready: false, isHost: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-8">
      {/* Header Bar with Back and Room Access */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0E0E0E] p-4 rounded-xl border border-[#232F53] shadow-xl">
        <Button
          variant="ghost"
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigate('/')}
        >
          BACK TO HOME
        </Button>

        <div className="flex items-center gap-3">
          <span className="font-code text-xs text-[#94A3B8] hidden sm:inline">ROOM ACCESS:</span>
          <div className="bg-[#0A1329] px-4 py-1.5 rounded border border-[#232F53]">
            <span className="font-code text-lg font-black text-[#B9121B] tracking-[0.25em]">
              {roomCode}
            </span>
          </div>
          <button
            onClick={copyCode}
            className="px-3 py-1.5 rounded bg-[#14234B] hover:bg-[#1B2D5D] text-[#FDFDFD] font-code text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#232F53]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#00DAF3]" /> : <Copy className="w-3.5 h-3.5 text-[#00DAF3]" />}
            <span>{copied ? 'COPIED' : 'COPY'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 font-code text-xs">
          <span className="w-2 h-2 rounded-full bg-[#00DAF3] animate-pulse" />
          <span className="text-[#00DAF3] font-bold">4 / 8 SLOTS LOCKED</span>
        </div>
      </div>

      {/* Main Grid: Roster on Left, Match Config on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 8 Slots Roster */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#B9121B]" />
              <h2 className="font-display text-xl font-bold uppercase text-[#FDFDFD]">
                OPERATOR GRID // ROSTER
              </h2>
            </div>
            <span className="font-code text-xs text-[#94A3B8]">
              PHASE 1 FOUNDATION
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Slot 1: You / Host */}
            <PlayerSlot
              slotNumber={1}
              player={mockPlayers[0]}
              isHost={true}
              isCurrentUser={true}
            />

            {/* Slot 2 */}
            <PlayerSlot
              slotNumber={2}
              player={mockPlayers[1]}
            />

            {/* Slot 3 */}
            <PlayerSlot
              slotNumber={3}
              player={mockPlayers[2]}
            />

            {/* Slot 4 */}
            <PlayerSlot
              slotNumber={4}
              player={mockPlayers[3]}
            />

            {/* Slots 5–8: Empty */}
            {[5, 6, 7, 8].map((slot) => (
              <PlayerSlot
                key={slot}
                slotNumber={slot}
                onInvite={copyCode}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Match Configuration Card */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-6 rounded-xl bg-[#0F1C3F] border border-[#232F53] shadow-xl flex flex-col gap-6">
            
            <div className="flex items-center justify-between border-b border-[#232F53] pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#00DAF3]" />
                <h3 className="font-display text-lg font-bold uppercase text-[#FDFDFD]">
                  MATCH CONFIG
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#B9121B] text-[#FDFDFD] font-code text-[9px] font-black uppercase">
                HOST ONLY
              </span>
            </div>

            {/* Total Rounds */}
            <div className="flex flex-col gap-1.5">
              <span className="font-code text-xs text-[#94A3B8] uppercase font-bold">
                TOTAL ROUNDS TO WIN: <strong className="text-[#FDFDFD]">5</strong>
              </span>
              <span className="font-code text-[11px] text-[#00DAF3]">
                BEST OF SET (PHASE 7 INTEGRATION)
              </span>
            </div>

            {/* Active Modes Preview */}
            <div className="flex flex-col gap-2">
              <span className="font-code text-xs text-[#94A3B8] uppercase font-bold">
                PLANNED MODES
              </span>
              <div className="flex flex-col gap-1.5 font-code text-xs">
                <div className="p-2 rounded bg-[#14234B] flex items-center justify-between text-[#FDFDFD]">
                  <span>1. Classic Bump</span>
                  <span className="text-[#00DAF3] font-bold">STANDARD</span>
                </div>
                <div className="p-2 rounded bg-[#14234B] flex items-center justify-between text-[#FDFDFD]">
                  <span>2. Slippery Arena</span>
                  <span className="text-[#00DAF3] font-bold">ICE FRICTION</span>
                </div>
                <div className="p-2 rounded bg-[#14234B] flex items-center justify-between text-[#FDFDFD]">
                  <span>3. Shrinking Ring</span>
                  <span className="text-[#B9121B] font-bold">SUDDEN DEATH</span>
                </div>
              </div>
            </div>

            {/* Ready Toggle & Launch */}
            <div className="flex flex-col gap-3 pt-2">
              <Button
                variant={isReady ? 'accent' : 'secondary'}
                size="md"
                onClick={toggleReady}
                className="w-full"
              >
                {isReady ? 'READY TO BRAWL ✓' : 'MARK AS READY'}
              </Button>

              <Button
                variant="primary"
                size="lg"
                icon={Rocket}
                onClick={() => navigate('/game')}
                className="w-full"
              >
                ENTER ARENA PREVIEW
              </Button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
