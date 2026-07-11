import React, { useState } from 'react';
import { getDirectorateStats } from '../../data/store';
import ProgressBar from '../ui/ProgressBar';
import { Search, Building, MapPin, Trash2, Edit3, ArrowLeft, ChevronLeft } from 'lucide-react';

export default function DirectorateList({ directorates, onSelectDirectorate, onDeleteDirectorate }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDirs = directorates.filter((dir) =>
    dir.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dir.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-md">
      {/* Search Bar */}
      <div className="search-box">
        <Search className="search-box-icon" />
        <input
          type="text"
          placeholder="ابحث عن دائرة صحة بالاسم أو المحافظة..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Directorate List */}
      {filteredDirs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Building size={32} />
          </div>
          <p className="empty-state-title">لا توجد دوائر صحة</p>
          <p className="empty-state-desc">يرجى إضافة دائرة صحة جديدة للبدء.</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {filteredDirs.map((dir) => {
            const stats = getDirectorateStats(dir.id) || {
              sectors: 0,
              totalHealthCenters: 0,
              totalSpecialized: 0,
              evaluatedHealth: 0,
              evaluatedSpecialized: 0,
              healthProgress: 0,
              specProgress: 0,
            };

            const totalCenters = stats.totalHealthCenters + stats.totalSpecialized;
            const totalEvaluated = stats.evaluatedHealth + stats.evaluatedSpecialized;
            const totalProgress = totalCenters > 0 ? Math.round((totalEvaluated / totalCenters) * 100) : 0;

            return (
              <div
                key={dir.id}
                className="dir-card"
                onClick={() => onSelectDirectorate(dir)}
              >
                <div className="dir-card-header">
                  <div>
                    <h3 className="dir-card-name">{dir.name}</h3>
                    <div className="flex items-center gap-xs mt-sm text-secondary text-xs">
                      <MapPin size={12} />
                      <span>{dir.location}</span>
                    </div>
                  </div>
                  <div className="user-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="btn btn-secondary btn-icon btn-sm"
                      onClick={() => onSelectDirectorate(dir)}
                      title="تعديل وإدارة الدائرة"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      className="btn btn-danger btn-icon btn-sm"
                      onClick={() => onDeleteDirectorate(dir.id)}
                      title="حذف الدائرة"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="dir-card-stats mb-md">
                  <div className="dir-stat">
                    <span className="dir-stat-value">{stats.sectors}</span>
                    <span className="dir-stat-label">قطاعات</span>
                  </div>
                  <div className="dir-stat">
                    <span className="dir-stat-value">{stats.totalHealthCenters}</span>
                    <span className="dir-stat-label">مراكز صحية</span>
                  </div>
                  <div className="dir-stat">
                    <span className="dir-stat-value">{stats.totalSpecialized}</span>
                    <span className="dir-stat-label">تخصصية أسنان</span>
                  </div>
                </div>

                <div className="mt-sm">
                  <ProgressBar
                    value={totalEvaluated}
                    max={totalCenters || 1}
                    color="blue"
                    label="نسبة إنجاز التقييم الإجمالية"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
