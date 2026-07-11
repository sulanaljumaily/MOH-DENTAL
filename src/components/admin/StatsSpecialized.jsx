import React, { useState } from 'react';
import { getDirectorates } from '../../data/store';
import {
  Building2, Search, BarChart3, CheckCircle, Clock, Award, Activity,
  ShieldCheck, Layers, TrendingUp, TrendingDown, FlaskConical, Wrench,
  BookOpen, Zap, ScanLine
} from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, RadarChart,
  Radar, PolarGrid, PolarAngleAxis
} from 'recharts';

import StatCard from '../ui/StatCard';

// ── Unit name lookup ──────────────────────────────────────────────────
const UNIT_NAMES = {
  1: 'الفحص',
  2: 'الحشو',
  3: 'القلع',
  4: 'التنظيف',
  5: 'جراحة الفم',
  6: 'تقويم الأسنان',
  7: 'الأطفال',
  8: 'الزراعة',
  9: 'التركيبات',
  10: 'العناية المنظمة',
  11: 'أمراض اللثة',
};

const PER_UNIT_KEYS = ['daily_reg', 'spend_reg', 'docs_reg', 'chairs', 'materials', 'inf_control'];
const UNIT_KEY_LABELS = { daily_reg: 'السجلات اليومية', spend_reg: 'الصرف', docs_reg: 'توثيق الحالات', chairs: 'الكراسي', materials: 'المواد', inf_control: 'السيطرة على العدوى' };
const GLOBAL_INF_KEYS = ['inf_waste_reg', 'inf_injury_reg', 'inf_vaccines'];
const GLOBAL_INF_MAX  = { inf_waste_reg: 30, inf_injury_reg: 30, inf_vaccines: 40 }; // max points per key

function getScoreClass(pct) {
  if (pct >= 85) return 'good';
  if (pct >= 65) return 'warning';
  return 'danger';
}

/** Compute per-domain compliance across a list of evaluated specialized centers */
function computeUnitDomainKPIs(centers) {
  const evalCenters = centers.filter(c => c.answers);
  if (!evalCenters.length) return { chairs: 0, materials: 0, records: 0, infControl: 0, globalInf: 0 };

  let chairsSum = 0, matsSum = 0, recSum = 0, infSum = 0, total = 0;
  let globalInfSum = 0, globalInfTotal = 0;

  evalCenters.forEach(c => {
    const units = c.availableUnits || [];
    units.forEach(u => {
      const chairVal  = c.answers?.[`u_${u}_chairs`] ?? 0;
      const matsVal   = c.answers?.[`u_${u}_materials`] ?? 0;
      const regSumVal = (c.answers?.[`u_${u}_daily_reg`] ?? 0) + (c.answers?.[`u_${u}_spend_reg`] ?? 0) + (c.answers?.[`u_${u}_docs_reg`] ?? 0);
      const infVal    = c.answers?.[`u_${u}_inf_control`] ?? 0;
      chairsSum += chairVal;
      matsSum   += matsVal;
      recSum    += regSumVal;
      infSum    += infVal;
      total     += 1;
    });
    // global infection control (score out of 100)
    const gWaste = c.answers?.inf_waste_reg ?? 0;
    const gInjury = c.answers?.inf_injury_reg ?? 0;
    const gVacc  = c.answers?.inf_vaccines ?? 0;
    globalInfSum   += gWaste + gInjury + gVacc;
    globalInfTotal += 100;
  });

  const chairs    = total > 0 ? Math.round((chairsSum / (total * 10)) * 100) : 0;
  const materials = total > 0 ? Math.round((matsSum   / (total * 10)) * 100) : 0;
  const records   = total > 0 ? Math.round((recSum    / (total * 30)) * 100) : 0;
  const infControl= total > 0 ? Math.round((infSum    / (total * 10)) * 100) : 0;
  const globalInf = globalInfTotal > 0 ? Math.round((globalInfSum / globalInfTotal) * 100) : 0;

  return { chairs, materials, records, infControl, globalInf };
}

/** Average units coverage across all evaluated centers */
function avgUnitCoverage(centers) {
  const ev = centers.filter(c => c.availableUnits && c.availableUnits.length > 0);
  if (!ev.length) return 0;
  return Math.round(ev.reduce((s, c) => s + c.availableUnits.length, 0) / ev.length);
}

/** Build per-unit cross-center compliance radar */
function buildUnitRadar(centers) {
  const unitMap = {};
  const evalCenters = centers.filter(c => c.answers);
  evalCenters.forEach(c => {
    (c.availableUnits || []).forEach(u => {
      if (!unitMap[u]) unitMap[u] = { sum: 0, max: 0 };
      const unitKeys = PER_UNIT_KEYS.map(k => `u_${u}_${k}`);
      unitKeys.forEach(k => {
        unitMap[u].sum += c.answers?.[k] ?? 0;
        unitMap[u].max += 10;
      });
    });
  });
  return Object.entries(unitMap).slice(0, 8).map(([u, { sum, max }]) => ({
    unit: UNIT_NAMES[parseInt(u)] ?? `وحدة ${u}`,
    score: max > 0 ? Math.round((sum / max) * 100) : 0,
  }));
}

const tooltipStyle = {
  backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)',
  color: 'var(--text-primary)', fontFamily: 'Cairo', fontSize: 11
};

export default function StatsSpecialized() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDirId, setSelectedDirId] = useState('all');
  const directorates = getDirectorates();

  // ── Flatten centers ──────────────────────────────────────────────────
  const centers = [];
  directorates.forEach((dir) => {
    if (selectedDirId !== 'all' && dir.id !== parseInt(selectedDirId)) return;
    dir.specializedCenters.forEach((center) => {
      centers.push({ ...center, directorateId: dir.id, directorateName: dir.name });
    });
  });

  const filteredCenters = centers.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase())
      || c.directorateName?.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'all') return matchesSearch;
    return matchesSearch && (filter === 'pending' ? (c.status === 'pending' || c.status === 'in-progress') : c.status === filter);
  });

  // ── Stats ────────────────────────────────────────────────────────────
  const totalCount     = centers.length;
  const evaluatedList  = centers.filter(c => c.status === 'evaluated');
  const evaluatedCount = evaluatedList.length;
  const pendingCount   = centers.filter(c => c.status === 'pending' || c.status === 'in-progress').length;
  const completionRate = totalCount > 0 ? Math.round((evaluatedCount / totalCount) * 100) : 0;
  const avgScore       = evaluatedCount > 0 ? Math.round(evaluatedList.reduce((s, c) => s + (c.score || 0), 0) / evaluatedCount) : 0;
  const avgStage1      = evaluatedCount > 0 ? Math.round(evaluatedList.reduce((s, c) => s + (c.stage1Score || 0), 0) / evaluatedCount) : 0;
  const avgStage2      = evaluatedCount > 0 ? Math.round(evaluatedList.reduce((s, c) => s + (c.stage2Score || 0), 0) / evaluatedCount) : 0;
  const unitCoverage   = avgUnitCoverage(centers);

  // ── KPIs ────────────────────────────────────────────────────────────
  const kpis = computeUnitDomainKPIs(evaluatedList);

  // ── Score distribution pie ───────────────────────────────────────────
  let excellent = 0, good = 0, fair = 0, poor = 0;
  evaluatedList.forEach(c => {
    if (c.score >= 85) excellent++;
    else if (c.score >= 70) good++;
    else if (c.score >= 50) fair++;
    else poor++;
  });
  const pieData = [
    { name: 'ممتاز (≥85%)', value: excellent, color: '#10b981' },
    { name: 'جيد (70-85%)', value: good,      color: '#3b82f6' },
    { name: 'مقبول (50-70%)', value: fair,    color: '#f59e0b' },
    { name: 'ضعيف (<50%)', value: poor,        color: '#ef4444' },
  ].filter(d => d.value > 0);

  // ── Bar chart: stage1 vs stage2 vs total ────────────────────────────
  const barList = evaluatedList.slice(0, 6);
  const barChartData = barList.map(c => ({
    name: c.name.replace('مركز أسنان تخصصي ', 'م.ت ').replace('مركز تخصصي ', 'م.ت '),
    'الملاك والسجلات': c.stage1Score || 0,
    'الأجهزة والوقاية': c.stage2Score || 0,
    'المجموع': c.score || 0,
  }));
  if (barList.length > 1) {
    barChartData.push({
      name: 'المعدل',
      'الملاك والسجلات': avgStage1,
      'الأجهزة والوقاية': avgStage2,
      'المجموع': avgScore,
    });
  }

  // ── Unit radar (cross-center performance per unit) ───────────────────
  const unitRadarData = buildUnitRadar(evaluatedList);

  // ── Stage 1 vs Stage 2 radial gauge ─────────────────────────────────
  const gaugeData = [
    { name: 'المرحلة الأولى (ملاك وسجلات)', value: avgStage1, fill: '#a855f7' },
    { name: 'المرحلة الثانية (أجهزة ووقاية)', value: avgStage2, fill: '#3b82f6' },
  ];

  // ── Top / Bottom ─────────────────────────────────────────────────────
  const sorted = [...evaluatedList].sort((a, b) => (b.score || 0) - (a.score || 0));
  const topCenter    = sorted[0];
  const bottomCenter = sorted[sorted.length - 1];

  return (
    <div className="flex flex-col gap-lg">

      {/* ── Section 1: Core Stats Bento ──────────────────────────────── */}
      <div className="bento-grid">
        <StatCard value={totalCount}              label="إجمالي المراكز التخصصية"    icon={Building2}  color="purple" />
        <StatCard value={evaluatedCount}          label="المراكز المقيّمة"           icon={CheckCircle} color="green" />
        <StatCard value={`${completionRate}%`}    label="نسبة إتمام التقييم"          icon={TrendingUp}  color="blue" />
        <StatCard value={`${avgScore}%`}          label="معدل الدرجة الكلية"         icon={Award}       color="orange" />
        <StatCard value={`${avgStage1}%`}         label="معدل المرحلة الأولى (50%)" icon={Layers}      color="purple" />
        <StatCard value={`${avgStage2}%`}         label="معدل المرحلة الثانية (50%)" icon={ShieldCheck} color="blue" />
        <StatCard value={pendingCount}            label="المراكز المتبقية للتقييم"  icon={Clock}       color="orange" />
        <StatCard value={unitCoverage || '—'}     label="متوسط الوحدات التخصصية"    icon={Zap}         color="cyan" />
      </div>

      {/* ── Section 2: KPI Indicators ────────────────────────────────── */}
      {evaluatedCount > 0 && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <Activity size={16} style={{ color: 'var(--accent-purple)' }} />
            <span className="text-primary font-bold" style={{ fontSize: 'var(--text-sm)' }}>مؤشرات الأداء التخصصية — مستخرجة من بيانات التقييم الميداني للوحدات</span>
          </div>

          <div className="kpi-grid">
            {/* Chairs compliance */}
            <div className={`kpi-card ${getScoreClass(kpis.chairs)}`}>
              <div className="kpi-label"><Wrench size={13} /> نسبة سلامة الكراسي لجميع الوحدات</div>
              <div className="kpi-value">{kpis.chairs}%</div>
              <div className="kpi-sub">من مجموع {evaluatedList.reduce((s, c) => s + (c.availableUnits?.length || 0), 0)} وحدة مقيّمة</div>
              <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${kpis.chairs}%` }} /></div>
            </div>

            {/* Materials compliance */}
            <div className={`kpi-card ${getScoreClass(kpis.materials)}`}>
              <div className="kpi-label"><FlaskConical size={13} /> نسبة توفر المواد الصرفية لكل وحدة</div>
              <div className="kpi-value">{kpis.materials}%</div>
              <div className="kpi-sub">ضمن المرحلة الأولى — الملاك والتجهيزات</div>
              <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${kpis.materials}%` }} /></div>
            </div>

            {/* Records compliance */}
            <div className={`kpi-card ${getScoreClass(kpis.records)}`}>
              <div className="kpi-label"><BookOpen size={13} /> مؤشر إدامة سجلات كل وحدة</div>
              <div className="kpi-value">{kpis.records}%</div>
              <div className="kpi-sub">السجلات اليومية + الصرف + توثيق الحالات</div>
              <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${kpis.records}%` }} /></div>
            </div>

            {/* Per-unit Infection control */}
            <div className={`kpi-card ${getScoreClass(kpis.infControl)}`}>
              <div className="kpi-label"><ShieldCheck size={13} /> ضبط العدوى الوحدوي (لكل وحدة)</div>
              <div className="kpi-value">{kpis.infControl}%</div>
              <div className="kpi-sub">السيطرة على العدوى ضمن كل وحدة تخصصية</div>
              <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${kpis.infControl}%` }} /></div>
            </div>

            {/* Global infection control */}
            <div className={`kpi-card ${getScoreClass(kpis.globalInf)}`}>
              <div className="kpi-label"><ScanLine size={13} /> مؤشر السيطرة على العدوى المركزي</div>
              <div className="kpi-value">{kpis.globalInf}%</div>
              <div className="kpi-sub">تسجيل نفايات + إصابات + التطعيمات (100 نقطة)</div>
              <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${kpis.globalInf}%` }} /></div>
            </div>

            {/* Stage 1 indicator */}
            <div className="kpi-card purple">
              <div className="kpi-label"><Layers size={13} /> معدل المرحلة الأولى (50%)</div>
              <div className="kpi-value">{avgStage1}<span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>/100</span></div>
              <div className="kpi-sub">الملاك والإحصائيات والسجلات والتجهيزات</div>
              <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${avgStage1}%` }} /></div>
            </div>

            {/* Stage 2 indicator */}
            <div className="kpi-card info">
              <div className="kpi-label"><ShieldCheck size={13} /> معدل المرحلة الثانية (50%)</div>
              <div className="kpi-value">{avgStage2}<span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>/100</span></div>
              <div className="kpi-sub">الأجهزة والوقاية والسيطرة على العدوى</div>
              <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${avgStage2}%` }} /></div>
            </div>

            {/* Top center */}
            {topCenter && (
              <div className="kpi-card good">
                <div className="kpi-label"><TrendingUp size={13} /> أفضل مركز تخصصي مقيّم</div>
                <div className="kpi-value" style={{ fontSize: 'var(--text-lg)', fontWeight: 800 }}>{topCenter.name}</div>
                <div className="kpi-sub">{topCenter.directorateName}</div>
                <div style={{ marginTop: 8 }}>
                  <span className="badge badge-green" style={{ fontSize: 10 }}>الدرجة: {topCenter.score}%</span>
                </div>
              </div>
            )}

            {/* Bottom center */}
            {bottomCenter && bottomCenter.id !== topCenter?.id && (
              <div className="kpi-card danger">
                <div className="kpi-label"><TrendingDown size={13} /> المركز الأحوج للمتابعة</div>
                <div className="kpi-value" style={{ fontSize: 'var(--text-lg)', fontWeight: 800 }}>{bottomCenter.name}</div>
                <div className="kpi-sub">{bottomCenter.directorateName}</div>
                <div style={{ marginTop: 8 }}>
                  <span className="badge badge-red" style={{ fontSize: 10 }}>الدرجة: {bottomCenter.score}%</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Section 3: Charts side-by-side ───────────────────────────── */}
      {evaluatedCount > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>

          {/* Pie: score distribution */}
          {pieData.length > 0 && (
            <div className="chart-container" style={{ marginBottom: 0 }}>
              <h3 className="chart-title flex items-center gap-sm">
                <Building2 size={16} className="text-accent-purple" /> توزيع درجات المراكز التخصصية
              </h3>
              <div style={{ width: '100%', height: 220, direction: 'ltr' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                      {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontFamily: 'Cairo', fontSize: 10, paddingTop: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Bar: stage1 vs stage2 vs total */}
          {barChartData.length > 0 && (
            <div className="chart-container" style={{ marginBottom: 0 }}>
              <h3 className="chart-title flex items-center gap-sm">
                <BarChart3 size={16} className="text-accent-purple" /> مقارنة المرحلتين والدرجة الكلية
              </h3>
              <div style={{ width: '100%', height: 220, direction: 'ltr' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 5, right: 0, left: -28, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={8} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontFamily: 'Cairo', fontSize: 9 }} />
                    <Bar dataKey="الملاك والسجلات"  fill="#a855f7" radius={[2,2,0,0]} />
                    <Bar dataKey="الأجهزة والوقاية" fill="#3b82f6" radius={[2,2,0,0]} />
                    <Bar dataKey="المجموع"           fill="#10b981" radius={[2,2,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Radar: per-unit performance */}
          {unitRadarData.length > 2 && (
            <div className="chart-container" style={{ marginBottom: 0 }}>
              <h3 className="chart-title flex items-center gap-sm">
                <ShieldCheck size={16} className="text-accent-blue" /> أداء الوحدات التخصصية الاحترافية
              </h3>
              <div style={{ width: '100%', height: 220, direction: 'ltr' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={unitRadarData}>
                    <PolarGrid stroke="rgba(0,0,0,0.06)" />
                    <PolarAngleAxis dataKey="unit" style={{ fontSize: 9, fontFamily: 'Cairo' }} />
                    <Radar name="الامتثال %" dataKey="score" stroke="#a855f7" fill="#a855f7" fillOpacity={0.25} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, 'نسبة الامتثال']} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Section 4: Filters & List ─────────────────────────────────── */}
      <div className="flex flex-col gap-sm">
        <div className="flex gap-sm w-full">
          <div className="search-box flex-1" style={{ marginBottom: 0 }}>
            <Search className="search-box-icon" />
            <input type="text" placeholder="ابحث عن مركز تخصصي..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex-1">
            <select className="form-select py-xs text-xs w-full" value={selectedDirId}
              onChange={e => setSelectedDirId(e.target.value)}>
              <option value="all">كل الدوائر الصحية...</option>
              {directorates.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-sm flex-wrap">
        {[['all', 'الكل', totalCount], ['evaluated', 'تم التقييم', evaluatedCount], ['pending', 'قيد الانتظار', pendingCount]].map(([val, lbl, cnt]) => (
          <button key={val} className={`chip ${filter === val ? 'active' : ''}`} onClick={() => setFilter(val)}>
            {lbl} ({cnt})
          </button>
        ))}
      </div>

      {/* Centers List */}
      <div className="flex flex-col" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
        {filteredCenters.length === 0 ? (
          <div className="p-xl text-center text-secondary text-xs">لا توجد نتائج مطابقة.</div>
        ) : filteredCenters.map(c => (
          <div key={`${c.directorateId}-${c.id}`} className="list-item" style={{ borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}>
            <div className={`list-item-dot ${c.status === 'evaluated' ? 'green' : 'blue'}`} />
            <div className="flex-grow">
              <span className="text-sm font-bold text-primary block">{c.name}</span>
              <span className="text-secondary text-xxs block mt-xs">{c.directorateName}</span>
              {c.availableUnits && (
                <div className="flex gap-xs mt-xs flex-wrap">
                  <span style={{ fontSize: 9, color: 'var(--text-tertiary)', background: 'var(--bg-tertiary)', borderRadius: 4, padding: '1px 5px' }}>
                    {c.availableUnits.length} وحدة تخصصية
                  </span>
                  {c.status === 'evaluated' && (
                    <>
                      <span style={{ fontSize: 9, color: '#a855f7', background: 'rgba(168,85,247,0.1)', borderRadius: 4, padding: '1px 5px' }}>م١: {c.stage1Score}%</span>
                      <span style={{ fontSize: 9, color: '#3b82f6', background: 'rgba(59,130,246,0.1)', borderRadius: 4, padding: '1px 5px' }}>م٢: {c.stage2Score}%</span>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col items-center gap-xs">
              {c.status === 'evaluated'
                ? <span className="badge badge-purple text-xs font-bold">{c.score}%</span>
                : <span className="badge badge-blue text-xs">قيد الانتظار</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
