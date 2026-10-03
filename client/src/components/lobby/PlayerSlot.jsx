import React from 'react';
import { User, CheckCircle, Clock } from 'lucide-react';

/**
 * Lobby Player Roster Slot Card
 */
export function PlayerSlot({
  slotNumber,
  player = null,
  isHost = false,
  isCurrentUser = false,
  onInvite,
}) {
  if (!player) {
    return (
      <div 
        onClick={onInvite}
        className="relative bg-[#0A1329]/60 hover:bg-[#14234B]/50 border-2 border-dashed border-[#232F53] rounded p-4 flex flex-col items-center justify-center gap-2 min-h-[200px] transition-all cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-full bg-[#14234B] flex items-center justify-center text-[#94A3B8] group-hover:text-[#00DAF3] group-hover:scale-110 transition-transform">
          <User className="w-6 h-6" />
        </div>
        <div className="text-center">
          <span className="font-display text-sm text-[#94A3B8] group-hover:text-[#FDFDFD] block">
            SLOT #{String(slotNumber).padStart(2, '0')}
          </span>
          <span className="font-code text-[10px] text-[#94A3B8] block mt-0.5">
            OPEN TO JOIN
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#14234B] border border-[#232F53] rounded p-4 flex flex-col justify-between shadow-xl min-h-[200px]">
      <div className="flex items-center justify-between">
        <span className="font-code text-xs text-[#00DAF3] font-bold">
          #{String(slotNumber).padStart(2, '0')} {isCurrentUser ? '// YOU' : ''}
        </span>
        {isHost && (
          <span className="px-1.5 py-0.5 rounded bg-[#B9121B] text-[#FDFDFD] font-code text-[9px] font-black uppercase">
            ★ HOST
          </span>
        )}
      </div>

      <div className="flex flex-col items-center my-3">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-2 border-[#111111]"
          style={{ backgroundColor: player.color || '#B9121B' }}
        >
          <span className="font-display font-black text-lg text-white">
            {player.name ? player.name[0] : 'P'}
          </span>
        </div>
        <span className="font-display font-bold text-sm text-[#FDFDFD] mt-2 truncate max-w-full">
          {player.name}
        </span>
      </div>

      <div className="w-full bg-[#0F1C3F] py-1.5 px-2 rounded flex items-center justify-between font-code text-[11px]">
        <span className={player.ready ? 'text-[#39FF14]' : 'text-[#94A3B8]'}>
          {player.ready ? 'READY' : 'WAITING'}
        </span>
        {player.ready ? (
          <CheckCircle className="w-3.5 h-3.5 text-[#39FF14]" />
        ) : (
          <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
        )}
      </div>
    </div>
  );
}
