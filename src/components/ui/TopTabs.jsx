import React from 'react';

export default function TopTabs({ tabs = [], activeTab, onChange }) {
  if (tabs.length <= 1) return null;

  return (
    <div className="top-tabs">
      <div className="top-tabs-inner">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`top-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
