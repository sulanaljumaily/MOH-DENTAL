import React from 'react';

export default function BentoCard({ 
  children, 
  className = '', 
  onClick, 
  span = '1', 
  color = 'blue' 
}) {
  const spanClass = span === '2' ? 'span-2' : span === 'full' ? 'span-full' : '';
  
  return (
    <div 
      className={`bento-card ${spanClass} ${color} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
