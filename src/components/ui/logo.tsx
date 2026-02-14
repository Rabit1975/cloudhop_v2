import React from 'react';
import { cn } from '@/lib/utils';

export interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className, size = 32, showText = true }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* CloudHop Logo SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Cloud shape */}
        <path
          d="M32 21.5C32 26.1944 28.1944 30 23.5 30H13.5C8.80558 30 5 26.1944 5 21.5C5 17.1855 8.24394 13.6212 12.4286 13.069C12.9157 8.57211 16.7118 5 21.25 5C26.166 5 30.2223 9.02322 30.2223 14.0208C30.2223 14.3875 30.2014 14.7477 30.1607 15.101C32.3685 16.2738 34 18.6771 34 21.5H32Z"
          fill="currentColor"
          className="text-cyan-400"
        />
        {/* Rabbit head */}
        <circle cx="28" cy="12" r="4" fill="#1a1a1a" stroke="white" strokeWidth="2" />
        {/* Rabbit ear */}
        <path
          d="M18 18L24 22L18 26V18Z"
          fill="#1a1a1a"
        />
      </svg>
      
      {/* CloudHop Text */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            CloudHop
          </span>
          <span className="text-xs text-white/60">
            Gaming Platform
          </span>
        </div>
      )}
    </div>
  );
}
