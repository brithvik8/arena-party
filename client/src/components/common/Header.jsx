import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSocket } from '../../hooks/useSocket.js';
import { Shield, Wifi, WifiOff } from 'lucide-react';

export function Header() {
  const location = useLocation();
  const { isConnected } = useSocket();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/create', label: 'Create' },
    { path: '/join', label: 'Join' },
    { path: '/lobby', label: 'Lobby' },
    { path: '/game', label: 'Arena' },
    { path: '/results', label: 'Leaderboard' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0E0E0E]/90 backdrop-blur-md border-b-2 border-[#B9121B] shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand Wordmark */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 rounded bg-[#0A1329] border border-[#B9121B] flex items-center justify-center relative overflow-hidden group-hover:border-[#00DAF3] transition-colors">
            <span className="w-2.5 h-2.5 bg-[#B9121B] rotate-45 group-hover:scale-125 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold tracking-wider text-base text-[#FDFDFD]">
              PARTY <span className="text-[#B9121B]">ARENA</span>
            </span>
            <span className="font-code text-[9px] tracking-widest text-[#94A3B8] -mt-1 hidden sm:block">
              COMBAT BRAWLER
            </span>
          </div>
        </Link>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded text-xs font-code uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-[#B9121B] text-[#FDFDFD] font-bold shadow-[0_0_10px_rgba(185,18,27,0.5)]'
                    : 'text-[#94A3B8] hover:text-[#FDFDFD] hover:bg-[#14234B]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Connection Status Pill & Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#14234B] px-3 py-1.5 rounded border border-[#232F53] shadow-inner">
            {isConnected ? (
              <>
                <span className="w-2 h-2 rounded-full bg-[#00DAF3] animate-pulse" />
                <span className="font-code text-[11px] text-[#00DAF3] font-bold tracking-wider">
                  60Hz NET ONLINE
                </span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-[#B9121B]" />
                <span className="font-code text-[11px] text-[#B9121B] font-bold tracking-wider">
                  OFFLINE
                </span>
              </>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
