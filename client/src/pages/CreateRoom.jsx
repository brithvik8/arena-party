import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button.jsx';
import { ArrowLeft, Zap, Sliders, Shield } from 'lucide-react';
import { socket } from '../socket/socket.js';
import { gameStore } from '../state/gameStore.js';

export function CreateRoom() {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState(gameStore.getPlayerName());
  const [rounds, setRounds] = useState(5);
  const [status, setStatus] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    setStatus('ALLOCATING ARENA ROOM...');

    // Emit room:create event to backend
    socket.emit('room:create', { playerName, rounds }, (response) => {
      if (response?.success && response?.room) {
        navigate(`/lobby?room=${response.room.id}`);
      } else {
        // Fallback navigation for offline / dev preview
        navigate('/lobby?room=ALPHA9');
      }
    });

    // Fallback if socket is offline or test mode
    setTimeout(() => {
      navigate('/lobby?room=ALPHA9');
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-8">
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
          <span className="w-2 h-2 bg-[#B9121B]" />
          <span className="font-code text-xs text-[#B9121B] font-bold uppercase">
            HOST ALLOCATION CONSOLE
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-[#FDFDFD] uppercase tracking-tight">
          CREATE PRIVATE ROOM
        </h1>
        <p className="font-body text-base text-[#94A3B8]">
          Configure your arena parameters, choose rounds to win, and invite up to 7 challengers to your private combat grid.
        </p>
      </div>

      {/* Room Setup Form Card */}
      <form onSubmit={handleCreate} className="p-6 sm:p-8 rounded-xl bg-[#0F1C3F] border border-[#232F53] shadow-2xl flex flex-col gap-6">
        
        {/* Host Name Field */}
        <div className="flex flex-col gap-2">
          <label className="font-code text-xs text-[#94A3B8] uppercase font-bold">
            YOUR OPERATOR HANDLE
          </label>
          <input
            type="text"
            maxLength={16}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full bg-[#0A1329] text-[#FDFDFD] border border-[#232F53] focus:border-[#00DAF3] rounded px-4 py-3 font-display font-bold text-lg outline-none transition-colors"
            placeholder="VIPER_01"
            required
          />
        </div>

        {/* Total Rounds Selector */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="font-code text-xs text-[#94A3B8] uppercase font-bold">
              TOTAL ROUNDS TO WIN
            </label>
            <span className="font-code text-xs text-[#00DAF3] font-bold">
              BEST OF SET
            </span>
          </div>
          <div className="flex items-center gap-3">
            {[3, 5, 7, 10].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setRounds(num)}
                className={`flex-1 py-3 rounded font-code font-bold text-sm transition-all border ${
                  rounds === num
                    ? 'bg-[#B9121B] text-[#FDFDFD] border-[#B9121B] shadow-[0_0_12px_rgba(185,18,27,0.5)]'
                    : 'bg-[#14234B] text-[#94A3B8] border-[#232F53] hover:text-[#FDFDFD]'
                }`}
              >
                {num} ROUNDS
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col gap-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={Zap}
            className="w-full"
          >
            INITIALIZE ROOM & LOBBY
          </Button>
          {status && (
            <span className="font-code text-xs text-center text-[#00DAF3] animate-pulse">
              {status}
            </span>
          )}
        </div>

      </form>
    </div>
  );
}
