import React from "react";

interface AEDSymbolProps {
  className?: string;
  size?: number;
}

export default function AEDSymbol({ className = "", size = 20 }: AEDSymbolProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AED"
    >
      <path d="M 25 20 A 30 30 0 0 1 25 80 L 35 80 A 20 20 0 0 0 35 20 L 25 20 Z"
            fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      
      <line x1="25" y1="20" x2="25" y2="80" 
            stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
      
      <line x1="30" y1="40" x2="70" y2="40" 
            stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
      
      <line x1="30" y1="60" x2="70" y2="60" 
            stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
    </svg>
  );
}

// Inline version for use in text
export function AEDInline({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <AEDSymbol size={16} className="mr-1" />
    </span>
  );
}

