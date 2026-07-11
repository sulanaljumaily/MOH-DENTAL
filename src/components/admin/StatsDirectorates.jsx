import React, { useState } from 'react';
import { getDirectorates, getDirectorateStats } from '../../data/store';
import ProgressBar from '../ui/ProgressBar';
import StatCard from '../ui/StatCard';
import DirectorateStatsModal from './DirectorateStatsModal';
import {
  Building, MapPin, Award, TrendingUp, CheckCircle2, Activity,
  ShieldCheck, Users, Stethoscope, Building2, ChevronRight,
  BarChart3, AlertTriangle, TrendingDown, Filter
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, Legend, PieChart, Pie, Cell
} from 'recharts';

function getScoreClass(pct) {
  if (pct >= 85) return 'excellent';
  if (pct >= 70) return 'good';
  if (pct >= 50) return 'fair';
  return 'poor';
}

function getScoreColor(pct) {
  if (pct >= 85) return '#10b981';
  if (pct >= 70) return '#3b82f6';
  if (pct >= 50) return '#f59e0b';
  return '#ef4444';
}

function ScoreBadge({ score, fallback = 'قيد الانتظار' }) {
  if (!score && score !== 0) return <span className="score-badge pending">{fallback}</span>;
  return (
    <span className={`score-badge ${getScoreClass(score)}`}>
      {score}%
    </span>
  );
}

export default function StatsDirectorates() {
  const directorates = getDirectorates();
  const [selectedDir, setSelectedDir] = useState(null);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'highest' | 'lowest' | 'progress'

  // ── Build enriched directorate data ─────────────────────────────────
  const enriched = directorates.map((dir, idx) => {
    const stats = getDirectorateStats(dir.id);
    return { dir, stats, idx };
  }).filter(({ stats }) => stats);

  // Sort
  let sorted = [...enriched];
  if (sortBy === 'highest') {
    sorted.sort((a, b) => (b.stats.avgHealthScore || 0) - (a.stats.avgHealthScore || 0));
  } else if (sortBy === 'lowest') {
    sorted.sort((a, b) => (a.stats.avgHealthScore || 0) - (b.stats.avgHealthScore || 0));
  } else if (sortBy === 'progress') {
    sorted.sort((a, b) => {
      const pA = a.stats.totalHealthCenters > 0 ? a.stats.evaluatedHealth / a.stats.totalHealthCenters : 0;
      const pB = b.stats.totalHealthCenters > 0 ? b.stats.evaluatedHealth / b.stats.totalHealthCenters : 0;
      return pB - pA;
    });
  }

  // ── Global KPIs across all directorates ─────────────────────────────
  const totalHealthCenters  = enriched.reduce((s, { stats }) => s + (stats.totalHealthCenters || 0), 0);
  const totalEvaluated      = enriched.reduce((s, { stats }) => s + (stats.evaluatedHealth || 0), 0);
  const totalSpecialized    = enriched.reduce((s, { stats }) => s + (stats.totalSpecialized || 0), 0);
  const totalSpecEvaluated  = enriched.reduce((s, { stats }) => s + (stats.evaluatedSpecialized || 0), 0);
  const completionRate      = totalHealthCenters > 0 ? Math.round((totalEvaluated / totalHealthCenters) * 100) : 0;
  const dirsWithData        = enriched.filter(({ stats }) => stats.evaluatedHealth > 0);
  const avgScore            = dirsWithData.length > 0
    ? Math.round(dirsWithData.reduce((s, { stats }) => s + (stats.avgHealthScore || 0), 0) / dirsWithData.length) : 0;
  const topDir              = [...enriched].sort((a, b) => (b.stats.avgHealthScore || 0) - (a.stats.avgHealthScore || 0))[0];
  const bottomDir           = [...enriched].filter(({ stats }) => stats.evaluatedHealth > 0).sort((a, b) => (a.stats.avgHealthScore || 0) - (b.stats.avgHealthScore || 0))[0];

  // ── Chart data ───────────────────────────────────────────────────────
  const chartData = enriched.map(({ dir, stats }) => ({
    name: dir.name.replace('دائرة صحة ', '').replace('/ ', '').substring(0, 12),
    'مراكز مقيّمة': stats.evaluatedHealth,
    'باقي المراكز': stats.totalHealthCenters - stats.evaluatedHealth,
    'معدل التقييم': stats.avgHealthScore || 0,
  }));

  const tooltipStyle = {
    backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)',
    color: 'var(--text-primary)', fontFamily: 'Cairo', fontSize: 11
  };

  return (
    <div className="flex flex-col gap-lg">

      {/* ── Section 1: Global KPIs ──────────────────────────────────── */}
      <div className="bento-grid">
        <StatCard value={enriched.length}         label="الدوائر الصحية المسجلة"     icon={Building}    color="blue" />
        <StatCard value={totalHealthCenters}       label="إجمالي المراكز الصحية"      icon={Stethoscope}  color="green" />
        <StatCard value={totalSpecialized}         label="المراكز التخصصية"           icon={Building2}   color="purple" />
        <StatCard value={`${completionRate}%`}     label="نسبة إتمام التقييم"         icon={Activity}    color="orange" />
        <StatCard value={totalEvaluated}           label="مراكز صحية مقيّمة"          icon={CheckCircle2} color="green" />
        <StatCard value={`${avgScore}%`}           label="معدل الدرجة الوطني"         icon={Award}       color="orange" />
        <StatCard value={totalSpecEvaluated}       label="مراكز تخصصية مقيّمة"       icon={ShieldCheck}  color="purple" />
        <StatCard value={totalHealthCenters - totalEvaluated} label="مراكز بانتظار التقييم" icon={TrendingUp} color="blue" />
      </div>

      {/* ── Section 2: Bar Chart ────────────────────────────────────── */}
      {totalEvaluated > 0 && (
        <div className="chart-container" style={{ marginBottom: 0 }}>
          <h3 className="chart-title flex items-center gap-sm">
            <BarChart3 size={16} className="text-accent-green" /> توزيع التقييمات المنجزة حسب الدوائر الصحية
          </h3>
          <div style={{ width: '100%', height: 240, direction: 'ltr' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 0, left: -28, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={8} tickLine={false} angle={-35} textAnchor="end" height={60} />
                <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontFamily: 'Cairo', fontSize: 9 }} />
                <Bar dataKey="مراكز مقيّمة" fill="#10b981" radius={[2,2,0,0]} stackId="a" />
                <Bar dataKey="باقي المراكز" fill="#e2e8f0" radius={[2,2,0,0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ── Section 3: Controls ─────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-sm">
        <div className="flex gap-xs flex-wrap">
          <span className="text-secondary text-xxs font-bold flex items-center gap-xs">
            <Filter size={12} /> الترتيب:
          </span>
          {[['default', 'افتراضي'], ['highest', 'الأعلى تقييماً'], ['lowest', 'الأدنى تقييماً'], ['progress', 'الأكثر تقدماً']].map(([val, lbl]) => (
            <button key={val} className={`chip ${sortBy === val ? 'active' : ''}`} style={{ fontSize: 10 }}
              onClick={() => setSortBy(val)}>{lbl}</button>
          ))}
        </div>
        <div className="flex gap-xs">
          <button className={`btn btn-sm ${viewMode === 'cards' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('cards')} style={{ fontSize: 11, padding: '4px 12px' }}>
            🗂️ بطاقات
          </button>
          <button className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('table')} style={{ fontSize: 11, padding: '4px 12px' }}>
            📊 جدول
          </button>
        </div>
      </div>

      {/* ── Section 4a: Cards View ───────────────────────────────────── */}
      {viewMode === 'cards' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>
          {sorted.map(({ dir, stats }, rank) => {
            const progressHealth = stats.totalHealthCenters > 0
              ? Math.round((stats.evaluatedHealth / stats.totalHealthCenters) * 100) : 0;
            const progressSpec = stats.totalSpecialized > 0
              ? Math.round((stats.evaluatedSpecialized / stats.totalSpecialized) * 100) : 0;
            const scoreColor = getScoreColor(stats.avgHealthScore || 0);

            return (
              <div key={dir.id} className="dir-kpi-card" style={{ cursor: 'pointer' }}
                onClick={() => setSelectedDir(dir)}>

                {/* Header */}
                <div className="dir-kpi-card-header">
                  <div style={{ flex: 1 }}>
                    <div className="dir-kpi-card-name">{dir.name}</div>
                    <div className="text-secondary text-xxs flex items-center gap-xs mt-xs">
                      <MapPin size={11} /> {dir.location}
                    </div>
                  </div>
                  <div className="dir-rank-badge" style={{ background: `${scoreColor}20`, color: scoreColor }}>
                    #{rank + 1}
                  </div>
                </div>

                {/* Mini stats row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 'var(--space-md)' }}>
                  {[
                    { label: 'القطاعات', value: stats.sectors, color: '#3b82f6' },
                    { label: 'مراكز صحية', value: `${stats.evaluatedHealth}/${stats.totalHealthCenters}`, color: '#10b981' },
                    { label: 'تخصصية', value: `${stats.evaluatedSpecialized}/${stats.totalSpecialized}`, color: '#a855f7' },
                    { label: 'معدل التقييم', value: `${stats.avgHealthScore || 0}%`, color: scoreColor },
                  ].map((item, i) => (
                    <div key={i} style={{
                      background: `${item.color}08`, border: `1px solid ${item.color}20`,
                      borderRadius: 8, padding: '6px 4px', textAlign: 'center'
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: item.color }}>{item.value}</div>
                      <div style={{ fontSize: 9, color: 'var(--text-tertiary)', marginTop: 2 }}>{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* Progress bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: 9, color: 'var(--text-secondary)' }}>إنجاز المراكز الصحية</span>
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#10b981' }}>{progressHealth}%</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 9999, background: 'var(--border-color)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${progressHealth}%`, background: '#10b981', borderRadius: 9999, transition: 'width 0.8s ease' }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: 9, color: 'var(--text-secondary)' }}>إنجاز المراكز التخصصية</span>
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#a855f7' }}>{progressSpec}%</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 9999, background: 'var(--border-color)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${progressSpec}%`, background: '#a855f7', borderRadius: 9999, transition: 'width 0.8s ease' }} />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 8, borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {stats.avgHealthScore > 0 && (
                      <span className={`score-badge ${getScoreClass(stats.avgHealthScore)}`}>
                        صحي: {stats.avgHealthScore}%
                      </span>
                    )}
                    {stats.avgSpecScore > 0 && (
                      <span className={`score-badge ${getScoreClass(stats.avgSpecScore)}`}>
                        تخصصي: {stats.avgSpecScore}%
                      </span>
                    )}
                  </div>
                  <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Section 4b: Table View ───────────────────────────────────── */}
      {viewMode === 'table' && (
        <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--bg-card)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table" style={{ minWidth: 780 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'right', paddingRight: 'var(--space-lg)' }}>#</th>
                  <th style={{ textAlign: 'right' }}>دائرة الصحة</th>
                  <th>القطاعات</th>
                  <th>المراكز الصحية (مقيّم/إجمالي)</th>
                  <th>المراكز التخصصية (مقيّم/إجمالي)</th>
                  <th>معدل التقييم الصحي</th>
                  <th>معدل التقييم التخصصي</th>
                  <th>تقدم الإنجاز</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map(({ dir, stats }, rank) => {
                  const progress = stats.totalHealthCenters > 0
                    ? Math.round((stats.evaluatedHealth / stats.totalHealthCenters) * 100) : 0;
                  return (
                    <tr key={dir.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedDir(dir)}>
                      <td style={{ textAlign: 'right', paddingRight: 'var(--space-lg)', color: 'var(--text-muted)', fontWeight: 700 }}>
                        {rank + 1}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, fontSize: 11 }}>{dir.name}</div>
                        <div style={{ fontSize: 9, color: 'var(--text-tertiary)' }}>{dir.location}</div>
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 700 }}>{stats.sectors}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ fontWeight: 800, color: '#10b981' }}>{stats.evaluatedHealth}</span>
                        <span style={{ color: 'var(--text-muted)' }}> / {stats.totalHealthCenters}</span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ fontWeight: 800, color: '#a855f7' }}>{stats.evaluatedSpecialized}</span>
                        <span style={{ color: 'var(--text-muted)' }}> / {stats.totalSpecialized}</span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <ScoreBadge score={stats.avgHealthScore || null} />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <ScoreBadge score={stats.avgSpecScore || null} />
                      </td>
                      <td style={{ minWidth: 90, paddingLeft: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ flex: 1, height: 6, background: 'var(--border-color)', borderRadius: 99, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${progress}%`, background: progress >= 70 ? '#10b981' : progress >= 40 ? '#f59e0b' : '#ef4444', transition: 'width 0.8s ease', borderRadius: 99 }} />
                          </div>
                          <span style={{ fontSize: 9, fontWeight: 700, minWidth: 28 }}>{progress}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedDir && (
        <DirectorateStatsModal
          directorate={selectedDir}
          isOpen={!!selectedDir}
          onClose={() => setSelectedDir(null)}
        />
      )}
    </div>
  );
}
