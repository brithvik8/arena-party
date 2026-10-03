import React from 'react';

/**
 * Leaderboard Standings Row
 */
export function LeaderboardRow({
  rank,
  name,
  color,
  wins = 0,
  knockouts = 0,
  points = 0,
  isChampion = false,
}) {
  return (
    <tr className={`border-b border-[#232F53]/40 transition-colors ${
      isChampion ? 'bg-[#B9121B]/15 hover:bg-[#B9121B]/25' : 'hover:bg-[#14234B]/40'
    }`}>
      <td className="py-3 px-4 text-center">
        <span className={`inline-flex items-center justify-center w-7 h-7 rounded font-display font-black text-xs ${
          isChampion ? 'bg-[#B9121B] text-[#FDFDFD]' : 'bg-[#14234B] text-[#94A3B8]'
        }`}>
          {String(rank).padStart(2, '0')}
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <span 
            className="w-3 h-3 rounded-full shrink-0" 
            style={{ backgroundColor: color }}
          />
          <span className="font-display font-bold text-sm text-[#FDFDFD]">
            {name}
          </span>
          {isChampion && (
            <span className="bg-[#B9121B] text-[#FDFDFD] font-code text-[9px] px-1.5 py-0.5 rounded font-bold">
              CHAMPION
            </span>
          )}
        </div>
      </td>
      <td className="py-3 px-4 text-center font-code text-sm text-[#FDFDFD]">
        {wins}
      </td>
      <td className="py-3 px-4 text-center font-code text-sm text-[#FDFDFD]">
        {knockouts}
      </td>
      <td className="py-3 px-4 text-right font-display font-black text-base text-[#FDFDFD]">
        {points.toLocaleString()} PTS
      </td>
    </tr>
  );
}
