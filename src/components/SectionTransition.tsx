import React from 'react';

interface SectionTransitionProps {
  from: string;
  to: string;
}

export default function SectionTransition({ from, to }: SectionTransitionProps) {
  return (
    <div
      className="section-transition"
      data-parallax="0.04"
      style={
        {
          '--from': from,
          '--to': to,
        } as React.CSSProperties
      }
    />
  );
}
