import React from 'react';
import { Users, Building2, BarChart3, FileSpreadsheet } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'users', label: 'المستخدمين', icon: Users },
    { id: 'directorates', label: 'دوائر الصحة', icon: Building2 },
    { id: 'stats', label: 'الإحصائيات', icon: BarChart3 },
    { id: 'reports', label: 'التقارير', icon: FileSpreadsheet }
  ];

  return (
    <div className="bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Icon className="bottom-nav-item-icon" />
            <span className="bottom-nav-item-label">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
