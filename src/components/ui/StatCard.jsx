import React from 'react';

export default function StatCard({ 
  value, 
  label, 
  icon: Icon, 
  change, 
  isUp = true, 
  color = 'blue',
  className = '',
  onClick
}) {
  return (
    <div 
      className={`stat-card ${color} ${className}`} 
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <div className="stat-card-header">
        {Icon && (
          <div className="stat-card-icon">
            <Icon size={20} />
          </div>
        )}
        {change !== undefined && (
          <span className={`stat-card-badge ${isUp ? 'up' : 'down'}`}>
            {isUp ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
    </div>
  );
}
