import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/common/Button.jsx';
import { ArrowLeft, LogIn, Key } from 'lucide-react';
import { socket } from '../socket/socket.js';
import { gameStore } from '../state/gameStore.js';

export function JoinRoom() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [roomCode, setRoomCode] = useState(searchParams.get('code') || '');
  const [playerName, setPlayerName] = useState(gameStore.getPlayerName());
  const [error, setError] = useState('');
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const codeFromUrl = searchParams.get('code');
    if (codeFromUrl) {
      setRoomCode(codeFromUrl.toUpperCase());
    }
  }, [searchParams]);

  const handleJoin = (e) => {
    e.preventDefault();
    const cleanCode = roomCode.trim().toUpperCase();
    if (cleanCode.length < 4) {
      setError('Please enter a valid 5-character room code.');
      return;
    }

    setConnecting(true);
    setError('');

    // Emit room:join event to backend
    socket.emit('room:join', { roomCode: cleanCode, playerName }, (response) => {
      setConnecting(false);
      if (response?.success && response?.room) {
        navigate(`/lobby?room=${response.room.id}`);
      } else {
        setError(response?.error || 'Room not found. Navigating to lobby preview...');
        setTimeout(() => {
          navigate(`/lobby?room=${cleanCode}`);
        }, 1000);
      }
    });

    // Fallback for preview mode
    setTimeout(() => {
      navigate(`/lobby?room=${cleanCode}`);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-8">
      {/* Back button */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigate('/')}
        >
          BACK TO HOME
        </Button>
      </div>

      {/* Screen Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#00DAF3]" />
          <span className="font-code text-xs text-[#00DAF3] font-bold uppercase">
            CHALLENGER AUTHENTICATION
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-[#FDFDFD] uppercase tracking-tight">
          JOIN PRIVATE ARENA
        </h1>
        <p className="font-body text-base text-[#94A3B8]">
          Enter your 5-character match access code provided by the room host to enter the multiplayer lobby.
        </p>
      </div>

      {/* Join Form Card */}
      <form onSubmit={handleJoin} className="p-6 sm:p-8 rounded-xl bg-[#0F1C3F] border border-[#232F53] shadow-2xl flex flex-col gap-6">
        
        {/* Room Code Field */}
        <div className="flex flex-col gap-2">
          <label className="font-code text-xs text-[#94A3B8] uppercase font-bold flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-[#00DAF3]" />
            5-DIGIT ARENA ACCESS KEY
          </label>
          <input
            type="text"
            maxLength={5}
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            className="w-full bg-[#0A1329] text-[#00DAF3] border-2 border-[#232F53] focus:border-[#00DAF3] rounded px-4 py-3 font-code font-bold text-2xl text-center uppercase tracking-[0.25em] outline-none transition-colors"
            placeholder="X7K9P"
            required
            autoFocus
          />
        </div>

        {/* Player Name Field */}
        <div className="flex flex-col gap-2">
          <label className="font-code text-xs text-[#94A3B8] uppercase font-bold">
            YOUR OPERATOR HANDLE
          </label>
          <input
            type="text"
            maxLength={16}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full bg-[#0A1329] text-[#FDFDFD] border border-[#232F53] focus:border-[#00DAF3] rounded px-4 py-2.5 font-display font-bold text-base outline-none transition-colors"
            placeholder="VIPER_01"
            required
          />
        </div>

        {error && (
          <div className="p-3 rounded bg-[#B9121B]/20 border border-[#B9121B] text-[#FDFDFD] font-code text-xs">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="accent"
            size="lg"
            icon={LogIn}
            disabled={connecting}
            className="w-full"
          >
            {connecting ? 'AUTHENTICATING NET...' : 'CONNECT TO ROOM'}
          </Button>
        </div>

      </form>
    </div>
  );
}
