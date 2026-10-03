import React from 'react';
import { useSocket } from '../../hooks/useSocket.js';

export function Footer() {
  const { isConnected, socketId } = useSocket();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 h-10 bg-[#0E0E0E]/95 backdrop-blur-md border-t border-[#232F53]/50">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between font-code text-[11px] text-[#94A3B8]">
        
        {/* Left: Mode indication */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#B9121B] rotate-45" />
          <span>ROOM:</span>
          <span className="text-[#FDFDFD] font-bold">COMPETITIVE // PHASE 1</span>
        </div>

        {/* Center: Tactical hotkey reminders */}
        <div className="hidden md:flex items-center gap-6 text-[#94A3B8]">
          <span><strong className="text-[#00DAF3]">[ESC]</strong> SETTINGS</span>
          <span><strong className="text-[#00DAF3]">[TAB]</strong> ROSTER</span>
          <span><strong className="text-[#B9121B]">[SPACE]</strong> READY</span>
        </div>

        {/* Right: Live socket status & ID */}
        <div className="flex items-center gap-2">
          {isConnected ? (
            <span className="text-[#00DAF3] font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00DAF3] animate-ping" />
              SOCKET CONNECTED {socketId ? `[#${socketId.slice(-4)}]` : ''}
            </span>
          ) : (
            <span className="text-[#B9121B] font-bold">
              SOCKET DISCONNECTED
            </span>
          )}
        </div>

      </div>
    </footer>
  );
}
