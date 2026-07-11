import React from 'react';

export default function ProgressBar({ value, max = 100, color = 'blue', label }) {
  const percentage = Math.min(Math.max(0, Math.round((value / max) * 100)), 100);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-sm">
          <span className="text-secondary text-xs">{label}</span>
          <span className="text-primary text-xs font-bold">{percentage}%</span>
        </div>
      )}
      <div className={`progress-bar ${color}`}>
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
