import React from 'react';

/**
 * Tactical Arcade Button
 * Implements micro-switch tactile feedback and shadow extrusion.
 */
export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'accent' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  className = '',
  disabled = false,
  onClick,
  ...props
}) {
  const baseStyles = 'relative inline-flex items-center justify-center font-display uppercase tracking-wider font-bold rounded transition-all select-none disabled:opacity-50 disabled:pointer-events-none active:translate-y-1';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-[#B9121B] text-[#FDFDFD] shadow-[0_4px_0_0_#680A0F] hover:bg-[#D41620] active:shadow-none hover:shadow-[0_4px_16px_rgba(185,18,27,0.5)] border border-[#111111]',
    secondary: 'bg-[#14234B] text-[#FDFDFD] hover:bg-[#1B2D5D] hover:text-[#00DAF3] border border-[#232F53] shadow-[0_3px_0_0_#111111]',
    accent: 'bg-[#00DAF3] text-[#0A1329] hover:bg-[#51E8FF] shadow-[0_4px_0_0_#006672] font-black',
    ghost: 'bg-transparent text-[#94A3B8] hover:text-[#FDFDFD] hover:bg-[#14234B] border border-transparent',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
    </button>
  );
}
