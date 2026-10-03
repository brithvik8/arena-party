import React, { useRef, useEffect } from 'react';

/**
 * ArenaCanvas (Phase 6 Foundation)
 * HTML5 Canvas renderer placeholder for bumper arena physics and collisions.
 */
export function ArenaCanvas({ width = 800, height = 600 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw dark arena background preview
    ctx.fillStyle = '#0A1329';
    ctx.fillRect(0, 0, width, height);

    // Draw octagonal arena border
    ctx.strokeStyle = '#B9121B';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.42, 0, Math.PI * 2);
    ctx.stroke();

    // Draw center crosshair
    ctx.strokeStyle = '#232F53';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 40, 0, Math.PI * 2);
    ctx.stroke();
  }, [width, height]);

  return (
    <div className="relative rounded-xl overflow-hidden border-2 border-[#232F53] shadow-[0_12px_48px_rgba(0,0,0,0.8)] bg-[#0A1329] max-w-full">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="block max-w-full h-auto aspect-video"
      />
    </div>
  );
}
