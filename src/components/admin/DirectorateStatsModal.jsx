import React, { useState } from 'react';
import Modal from '../ui/Modal';
import ProgressBar from '../ui/ProgressBar';
import { getDirectorateStats } from '../../data/store';
import { 
  Building, 
  MapPin, 
  Stethoscope, 
  Building2, 
  Award, 
  TrendingUp, 
  CheckCircle,
  ChevronDown,
  ChevronUp,
  FolderOpen
} from 'lucide-react';

export default function DirectorateStatsModal({ directorate, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSectorId, setExpandedSectorId] = useState(null);

  if (!directorate || !isOpen) return null;

  const stats = getDirectorateStats(directorate.id);

  // Calculate sector-specific stats
  const getSectorStats = (sector) => {
    const total = sector.healthCenters.length;
    const evaluated = sector.healthCenters.filter(c => c.status === 'evaluated').length;
    const pending = sector.healthCenters.filter(c => c.status === 'pending').length;
    const inProgress = sector.healthCenters.filter(c => c.status === 'in-progress').length;
    
    const scores = sector.healthCenters
      .filter(c => c.status === 'evaluated' && c.score != null)
      .map(c => c.score);
    
    const avgScore = scores.length > 0 
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) 
      : 0;

    return { total, evaluated, pending, inProgress, avgScore };
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`إحصائيات تقييم: ${directorate.name}`} 
      size="medium"
    >
      {/* Tabs */}
      <div className="modal-tabs">
        <button
          className={`modal-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          نظرة عامة
        </button>
        <button
          className={`modal-tab ${activeTab === 'sectors' ? 'active' : ''}`}
          onClick={() => setActiveTab('sectors')}
        >
          القطاعات والمراكز الصحية ({directorate.sectors.length})
        </button>
        <button
          className={`modal-tab ${activeTab === 'specialized' ? 'active' : ''}`}
          onClick={() => setActiveTab('specialized')}
        >
          المراكز التخصصية ({directorate.specializedCenters.length})
        </button>
      </div>

      <div className="modal-body flex-1">
        {/* TAB 1: Overview */}
        {activeTab === 'overview' && stats && (
          <div className="flex flex-col gap-lg">
            <div className="flex items-center gap-md p-md bg-card rounded-lg">
              <div className="user-avatar blue font-bold text-lg">
                <Building size={20} />
              </div>
              <div>
                <h3 className="user-name text-lg">{directorate.name}</h3>
                <p className="text-secondary text-xs flex items-center gap-xs mt-sm">
                  <MapPin size={12} /> {directorate.location}
                </p>
              </div>
            </div>

            {directorate.description && (
              <p className="text-secondary text-sm bg-card p-md rounded-lg border border-color">
                {directorate.description}
              </p>
            )}

            {/* Quick Stats Grid */}
            <div className="bento-grid gap-sm">
              <div className="stat-card blue">
                <div className="stat-card-value text-xl">{stats.sectors}</div>
                <div className="stat-card-label">إجمالي القطاعات</div>
              </div>
              <div className="stat-card green">
                <div className="stat-card-value text-xl">{stats.totalHealthCenters}</div>
                <div className="stat-card-label">المراكز الصحية</div>
              </div>
              <div className="stat-card purple">
                <div className="stat-card-value text-xl">{stats.totalSpecialized}</div>
                <div className="stat-card-label">المراكز التخصصية</div>
              </div>
              <div className="stat-card cyan">
                <div className="stat-card-value text-xl">
                  {stats.evaluatedHealth + stats.evaluatedSpecialized} / {stats.totalHealthCenters + stats.totalSpecialized}
                </div>
                <div className="stat-card-label">المراكز المقيّمة</div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="p-md bg-card rounded-lg border border-color flex flex-col gap-md">
              <h4 className="text-primary font-bold text-xs">نسب التقييم المنجز</h4>
              <ProgressBar
                value={stats.evaluatedHealth}
                max={stats.totalHealthCenters || 1}
                color="green"
                label="المراكز الصحية العامة"
              />
              <ProgressBar
                value={stats.evaluatedSpecialized}
                max={stats.totalSpecialized || 1}
                color="purple"
                label="المراكز التخصصية لطب الأسنان"
              />
            </div>

            {/* Averages */}
            <div className="bento-grid">
              <div className="p-md bg-card rounded-lg border border-color flex items-center gap-md">
                <Award className="text-accent-orange" size={24} />
                <div>
                  <span className="text-secondary text-xxs block">معدل تقييم المراكز الصحية</span>
                  <strong className="text-primary text-base">{stats.avgHealthScore}%</strong>
                </div>
              </div>

              <div className="p-md bg-card rounded-lg border border-color flex items-center gap-md">
                <TrendingUp className="text-accent-purple-light" size={24} />
                <div>
                  <span className="text-secondary text-xxs block">معدل تقييم المراكز التخصصية</span>
                  <strong className="text-primary text-base">{stats.avgSpecScore}%</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Sectors */}
        {activeTab === 'sectors' && (
          <div className="flex flex-col gap-md">
            {directorate.sectors.length === 0 ? (
              <div className="empty-state py-md">
                <div className="empty-state-icon">
                  <FolderOpen size={28} />
                </div>
                <p className="empty-state-title">لا توجد قطاعات صحية</p>
                <p className="empty-state-desc">لم يتم تعريف أي قطاع صحي لهذه الدائرة بعد.</p>
              </div>
            ) : (
              directorate.sectors.map((sector) => {
                const isExpanded = expandedSectorId === sector.id;
                const sectorStats = getSectorStats(sector);
                const progressPercent = sectorStats.total > 0 
                  ? Math.round((sectorStats.evaluated / sectorStats.total) * 100)
                  : 0;

                return (
                  <div 
                    key={sector.id} 
                    className="border border-color rounded-lg overflow-hidden bg-card transition-all"
                  >
                    {/* Sector Header Trigger */}
                    <div 
                      className="flex items-center justify-between p-md cursor-pointer hover:bg-card-hover"
                      onClick={() => setExpandedSectorId(isExpanded ? null : sector.id)}
                    >
                      <div className="flex items-center gap-md">
                        {isExpanded ? <ChevronUp size={16} className="text-secondary" /> : <ChevronDown size={16} className="text-secondary" />}
                        <div>
                          <span className="font-bold text-sm text-primary block">{sector.name}</span>
                          <span className="text-secondary text-xxs block mt-xs">
                            التقييم: {sectorStats.evaluated} من {sectorStats.total} مركز
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-md">
                        {sectorStats.evaluated > 0 && (
                          <div className="text-left">
                            <span className="text-secondary text-xxs block">معدل التقييم</span>
                            <span className="badge badge-green text-xxs font-bold">{sectorStats.avgScore}%</span>
                          </div>
                        )}
                        <span className="badge badge-blue text-xxs">
                          إنجاز {progressPercent}%
                        </span>
                      </div>
                    </div>

                    {/* Expandable Sector Stats & Centers */}
                    {isExpanded && (
                      <div className="p-md bg-tertiary/20 border-t border-color/40 flex flex-col gap-md">
                        {/* Mini statistics for this sector */}
                        <div className="bento-grid gap-xs">
                          <div className="p-sm bg-card rounded border border-color/60 flex flex-col items-center">
                            <span className="text-primary font-bold text-xs">{sectorStats.evaluated}</span>
                            <span className="text-secondary" style={{ fontSize: '9px', marginTop: '2px' }}>تم التقييم</span>
                          </div>
                          <div className="p-sm bg-card rounded border border-color/60 flex flex-col items-center">
                            <span className="text-primary font-bold text-xs">{sectorStats.inProgress}</span>
                            <span className="text-secondary" style={{ fontSize: '9px', marginTop: '2px' }}>تحت التقييم</span>
                          </div>
                          <div className="p-sm bg-card rounded border border-color/60 flex flex-col items-center">
                            <span className="text-primary font-bold text-xs">{sectorStats.pending}</span>
                            <span className="text-secondary" style={{ fontSize: '9px', marginTop: '2px' }}>قيد الانتظار</span>
                          </div>
                        </div>

                        {/* List of health centers under sector */}
                        <div className="flex flex-col gap-xs mt-sm">
                          <span className="text-secondary font-bold" style={{ fontSize: '10px' }}>مراكز القطاع الصحية:</span>
                          {sector.healthCenters.length === 0 ? (
                            <p className="text-secondary text-xs text-center py-xs">لا توجد مراكز مضافة.</p>
                          ) : (
                            sector.healthCenters.map((hc) => (
                              <div key={hc.id} className="list-item py-xs px-sm bg-card/60">
                                <div className={`list-item-dot ${
                                  hc.status === 'evaluated' ? 'green' : hc.status === 'in-progress' ? 'orange' : 'blue'
                                }`} />
                                <span className="text-xs text-primary flex-1">{hc.name}</span>
                                <div>
                                  {hc.status === 'evaluated' ? (
                                    <span className="badge badge-green text-xxs font-bold">{hc.score}%</span>
                                  ) : hc.status === 'in-progress' ? (
                                    <span className="badge badge-orange text-xxs">تحت التقييم</span>
                                  ) : (
                                    <span className="badge badge-blue text-xxs">قيد الانتظار</span>
                                  )}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 3: Specialized Centers */}
        {activeTab === 'specialized' && (
          <div className="flex flex-col gap-md">
            {directorate.specializedCenters.length === 0 ? (
              <div className="empty-state py-md">
                <div className="empty-state-icon">
                  <Building2 size={28} />
                </div>
                <p className="empty-state-title">لا توجد مراكز تخصصية</p>
                <p className="empty-state-desc">لم يتم تعريف مراكز تخصصية تابعة لهذه الدائرة مباشرة.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-sm">
                {directorate.specializedCenters.map((sc) => (
                  <div key={sc.id} className="list-item">
                    <div className={`list-item-dot ${sc.status === 'evaluated' ? 'green' : 'blue'}`} />
                    <div className="flex-1">
                      <span className="text-sm font-bold text-primary block">{sc.name}</span>
                      <span className="text-secondary text-xxs mt-xs">تتبع الدائرة مباشرة</span>
                    </div>
                    <div>
                      {sc.status === 'evaluated' ? (
                        <span className="badge badge-purple text-xs font-bold">{sc.score}%</span>
                      ) : (
                        <span className="badge badge-blue text-xs">قيد الانتظار</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary btn-full" onClick={onClose}>
          إغلاق
        </button>
      </div>
    </Modal>
  );
}
