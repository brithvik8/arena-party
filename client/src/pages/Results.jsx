import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button.jsx';
import { LeaderboardRow } from '../components/results/LeaderboardRow.jsx';
import { ArrowLeft, RotateCcw, Trophy, Flame, Shield, Award } from 'lucide-react';

export function Results() {
  const navigate = useNavigate();

  const mockStandings = [
    { rank: 1, name: 'VIPER_01 (HOST)', color: '#B9121B', wins: 4, knockouts: 12, points: 4850, isChampion: true },
    { rank: 2, name: 'CYBER_GHOST', color: '#00DAF3', wins: 1, knockouts: 7, points: 3420, isChampion: false },
    { rank: 3, name: 'NEON_BLITZ', color: '#FFB300', wins: 0, knockouts: 5, points: 2890, isChampion: false },
    { rank: 4, name: 'TOXIC_RAID', color: '#39FF14', wins: 0, knockouts: 2, points: 1640, isChampion: false },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-8">
      
      {/* Top Bar with Back Navigation */}
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

      {/* Podium Spotlight Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#14234B] to-[#0A1329] p-8 border border-[#232F53] shadow-2xl flex flex-col items-center text-center">
        
        {/* Glow behind podium */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#B9121B]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2 mb-2">
          <span className="w-2 h-2 bg-[#B9121B] rotate-45" />
          <span className="font-code text-xs text-[#B9121B] font-bold uppercase tracking-widest">
            SESSION TERMINATED // ALL ROUNDS RESOLVED
          </span>
          <span className="w-2 h-2 bg-[#B9121B] rotate-45" />
        </div>

        <h1 className="relative z-10 font-display text-3xl sm:text-5xl font-black text-[#FDFDFD] uppercase tracking-tight">
          ARENA CHAMPION CROWNED!
        </h1>
        <p className="relative z-10 font-body text-sm sm:text-base text-[#94A3B8] max-w-lg mt-2">
          The Phase 1 leaderboard layout foundation. Scoring and final calculation engines will be fully wired in Phase 7.
        </p>

        {/* Champion Showcase Card */}
        <div className="relative z-10 mt-6 p-6 rounded-xl bg-[#0F1C3F] border-2 border-[#B9121B] shadow-[0_0_24px_rgba(185,18,27,0.4)] flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-[#B9121B] flex items-center justify-center shadow-lg border-2 border-[#FDFDFD]">
            <Trophy className="w-10 h-10 text-[#FDFDFD]" />
          </div>
          <span className="font-display text-2xl font-black text-[#FDFDFD] uppercase mt-3">
            VIPER_01
          </span>
          <span className="font-code text-xs text-[#00DAF3] font-bold">
            1ST PLACE · 4,850 PTS
          </span>
        </div>

      </div>

      {/* Standings Table Card */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#B9121B]" />
            <h2 className="font-display text-xl font-bold uppercase text-[#FDFDFD]">
              FINAL MATCH STANDINGS
            </h2>
          </div>
          <span className="font-code text-xs text-[#94A3B8]">
            SORTED BY TOTAL SCORE
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl bg-[#0F1C3F] border border-[#232F53] shadow-xl">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#14234B] text-[#94A3B8] font-code text-xs uppercase tracking-wider">
                <th className="py-3 px-4 w-16 text-center">RANK</th>
                <th className="py-3 px-4">OPERATOR</th>
                <th className="py-3 px-4 text-center">WINS</th>
                <th className="py-3 px-4 text-center">KNOCKOUTS</th>
                <th className="py-3 px-4 text-right">TOTAL SCORE</th>
              </tr>
            </thead>
            <tbody>
              {mockStandings.map((player) => (
                <LeaderboardRow
                  key={player.rank}
                  rank={player.rank}
                  name={player.name}
                  color={player.color}
                  wins={player.wins}
                  knockouts={player.knockouts}
                  points={player.points}
                  isChampion={player.isChampion}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#0E0E0E] border border-[#232F53] shadow-xl">
        <div className="flex items-center gap-2 font-code text-xs text-[#94A3B8]">
          <span className="w-2 h-2 rounded-full bg-[#39FF14]" />
          <span>MATCH COMPLETE · READY FOR REMATCH</span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate('/lobby')}
          >
            RETURN TO LOBBY
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={RotateCcw}
            onClick={() => navigate('/create')}
          >
            PLAY AGAIN
          </Button>
        </div>
      </div>

    </div>
  );
}
