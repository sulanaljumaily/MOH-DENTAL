import React, { useState } from 'react';
import { getDirectorates } from '../../data/store';
import {
  Stethoscope, Search, BarChart3, CheckCircle, Clock, Award, Activity,
  AlertTriangle, ShieldCheck, BookOpen, Wrench, FlaskConical, Users,
  TrendingUp, TrendingDown
} from 'lucide-react';

import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, RadarChart,
  Radar, PolarGrid, PolarAngleAxis
} from 'recharts';
import StatCard from '../ui/StatCard';

// ── Indicator key groups matching the evaluation system ──────────────
const EQUIPMENT_KEYS   = ['q_chair', 'q_xray'];
const MATERIALS_KEYS   = ['q_materials', 'q_fridge'];
const RECORDS_KEYS     = ['q_daily_reg', 'q_spend_reg', 'q_referrals'];
const OCP_KEYS         = ['q_ocp_reg', 'q_ocp_visits', 'q_ocp_card', 'q_ocp_dentists', 'q_ocp_parents', 'q_ocp_school', 'q_ocp_parent_card', 'q_ocp_workshop'];
const INFECTION_KEYS   = ['q_inf_prec', 'q_inf_safety', 'q_inf_waste', 'q_inf_ultra', 'q_inf_autoclave', 'q_inf_clean', 'q_inf_vaccine', 'q_inf_extractor', 'q_inf_wrapper', 'q_inf_guidelines', 'q_inf_tools', 'q_inf_training'];

function groupCompliance(centers, keys) {
  const evaluated = centers.filter(c => c.answers);
  if (!evaluated.length) return 0;
  const maxPossible = evaluated.length * keys.length * 2;
  const actual = evaluated.reduce((sum, c) =>
    sum + keys.reduce((ks, k) => ks + (c.answers?.[k] ?? 0), 0), 0);
  return Math.round((actual / maxPossible) * 100);
}

function getScoreClass(pct) {
  if (pct >= 85) return 'good';
  if (pct >= 65) return 'warning';
  return 'danger';
}

function Trend({ val }) {
  if (val === null) return <span className="text-secondary" style={{ fontSize: 10 }}>—</span>;
  if (val > 0) return <span style={{ color: '#10b981', fontSize: 10, fontWeight: 700 }}>▲ {val}%</span>;
  if (val < 0) return <span style={{ color: '#ef4444', fontSize: 10, fontWeight: 700 }}>▼ {Math.abs(val)}%</span>;
  return <span className="text-secondary" style={{ fontSize: 10 }}>● 0%</span>;
}

export default function StatsHealthCenters() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDirId, setSelectedDirId] = useState('all');
  const [selectedSectorId, setSelectedSectorId] = useState('all');
  const directorates = getDirectorates();

  // ── Build flat centers list ──────────────────────────────────────────
  const centers = [];
  directorates.forEach((dir) => {
    if (selectedDirId !== 'all' && dir.id !== parseInt(selectedDirId)) return;
    dir.sectors.forEach((sec) => {
      if (selectedSectorId !== 'all' && sec.id !== parseInt(selectedSectorId)) return;
      sec.healthCenters.forEach((center) => {
        centers.push({ ...center, sectorId: sec.id, sectorName: sec.name, directorateId: dir.id, directorateName: dir.name });
      });
    });
  });

  const filteredCenters = centers.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase())
      || c.sectorName?.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'all') return matchesSearch;
    return matchesSearch && c.status === filter;
  });

  // ── Core counts ─────────────────────────────────────────────────────
  const totalCount      = centers.length;
  const evaluatedList   = centers.filter(c => c.status === 'evaluated');
  const evaluatedCount  = evaluatedList.length;
  const inProgressCount = centers.filter(c => c.status === 'in-progress').length;
  const pendingCount    = centers.filter(c => c.status === 'pending').length;
  const completionRate  = totalCount > 0 ? Math.round((evaluatedCount / totalCount) * 100) : 0;
  const avgScore        = evaluatedCount > 0
    ? Math.round(evaluatedList.reduce((s, c) => s + (c.score || 0), 0) / evaluatedCount) : 0;
  const avgService      = evaluatedCount > 0
    ? Math.round(evaluatedList.reduce((s, c) => s + (c.serviceScore || 0), 0) / evaluatedCount) : 0;
  const avgIndicator    = evaluatedCount > 0
    ? Math.round(evaluatedList.reduce((s, c) => s + (c.indicatorScore || 0), 0) / evaluatedCount) : 0;

  // ── Domain compliance KPIs (from answers) ───────────────────────────
  const equipmentRate   = groupCompliance(evaluatedList, EQUIPMENT_KEYS);
  const materialsRate   = groupCompliance(evaluatedList, MATERIALS_KEYS);
  const recordsRate     = groupCompliance(evaluatedList, RECORDS_KEYS);
  const ocpRate         = groupCompliance(evaluatedList, OCP_KEYS);
  const infectionRate   = groupCompliance(evaluatedList, INFECTION_KEYS);

  // Failure counts (any answer = 0 or 1 for critical keys)
  const chairFailures   = evaluatedList.filter(c => c.answers && (c.answers.q_chair === 0 || c.answers.q_chair === 1)).length;
  const autoclaveFail   = evaluatedList.filter(c => c.answers && (c.answers.q_inf_autoclave === 0 || c.answers.q_inf_autoclave === 1)).length;
  const materialsFail   = evaluatedList.filter(c => c.answers && c.answers.q_materials === 0).length;
  const registryFail    = evaluatedList.filter(c => c.answers && (c.answers.q_daily_reg === 0 || c.answers.q_daily_reg === 1)).length;
  const ocpFail         = evaluatedList.filter(c => c.answers && (c.answers.q_ocp_card === 0 || c.answers.q_ocp_card === 1)).length;

  // ── Score distribution for Pie Chart ────────────────────────────────
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

  // ── Radar chart data (domain compliance) ────────────────────────────
  const radarData = [
    { domain: 'الأجهزة',   score: equipmentRate },
    { domain: 'المواد',    score: materialsRate },
    { domain: 'السجلات',  score: recordsRate },
    { domain: 'العناية المنظمة', score: ocpRate },
    { domain: 'السيطرة على العدوى', score: infectionRate },
  ];

  // ── Comparative bar chart ────────────────────────────────────────────
  const barList = evaluatedList.slice(0, 7);
  const barChartData = barList.map(c => ({
    name: c.name.replace('مركز صحي ', 'م.ص '),
    'الخدمة 40%': c.serviceScore || 0,
    'المؤشرات 60%': c.indicatorScore || 0,
    'المجموع 100%': c.score || 0,
  }));
  if (barList.length > 1) {
    barChartData.push({
      name: 'المعدل',
      'الخدمة 40%': avgService,
      'المؤشرات 60%': avgIndicator,
      'المجموع 100%': avgScore,
    });
  }

  // ── Top / Bottom performers ──────────────────────────────────────────
  const sorted = [...evaluatedList].sort((a, b) => (b.score || 0) - (a.score || 0));
  const topCenter    = sorted[0];
  const bottomCenter = sorted[sorted.length - 1];

  const tooltipStyle = { backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)', fontFamily: 'Cairo', fontSize: 11 };

  return (
    <div className="flex flex-col gap-lg">

      {/* ── Section 1: Core Stats Bento ──────────────────────────────── */}
      <div className="bento-grid">
        <StatCard value={totalCount}         label="إجمالي المراكز الصحية"      icon={Stethoscope} color="green" />
        <StatCard value={evaluatedCount}     label="المراكز المقيّمة"             icon={CheckCircle} color="green" />
        <StatCard value={`${completionRate}%`} label="نسبة إتمام التقييم"        icon={TrendingUp}  color="blue" />
        <StatCard value={`${avgScore}%`}     label="معدل الدرجة النهائية"        icon={Award}       color="orange" />
      </div>

      {/* ── Section 2: KPI Indicators ────────────────────────────────── */}
      {evaluatedCount > 0 && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <Activity size={16} style={{ color: 'var(--accent-blue)' }} />
            <span className="text-primary font-bold" style={{ fontSize: 'var(--text-sm)' }}>مؤشرات الأداء الرئيسية (KPIs) — استناداً إلى بيانات التقييم الميداني</span>
          </div>

          <div className="kpi-grid">
            {/* 1. Infection Control */}
            <div className={`kpi-card ${getScoreClass(infectionRate)}`}>
              <div className="kpi-label"><ShieldCheck size={13} /> نسبة الالتزام بالسيطرة على العدوى</div>
              <div className="kpi-value">{infectionRate}%</div>
              <div className="kpi-sub">{autoclaveFail > 0 ? `${autoclaveFail} مركز يعاني من خلل في التعقيم` : 'جميع أجهزة التعقيم سليمة ✔'}</div>
              <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${infectionRate}%` }} /></div>
            </div>

            {/* 2. Equipment */}
            <div className={`kpi-card ${getScoreClass(equipmentRate)}`}>
              <div className="kpi-label"><Wrench size={13} /> نسبة سلامة الأجهزة والكراسي</div>
              <div className="kpi-value">{equipmentRate}%</div>
              <div className="kpi-sub">{chairFailures > 0 ? `${chairFailures} مركز سجّل عطلاً في الكرسي` : 'جميع الكراسي في حالة عمل ✔'}</div>
              <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${equipmentRate}%` }} /></div>
            </div>

            {/* 3. Registry/Records */}
            <div className={`kpi-card ${getScoreClass(recordsRate)}`}>
              <div className="kpi-label"><BookOpen size={13} /> مؤشر إدامة السجلات والوثائق</div>
              <div className="kpi-value">{recordsRate}%</div>
              <div className="kpi-sub">{registryFail > 0 ? `${registryFail} مركز يعاني من إخلال بالسجلات` : 'جميع السجلات محدّثة ✔'}</div>
              <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${recordsRate}%` }} /></div>
            </div>

            {/* 4. OCP – Oral Care Program */}
            <div className={`kpi-card ${getScoreClass(ocpRate)}`}>
              <div className="kpi-label"><Users size={13} /> برنامج العناية بصحة الفم المنظمة</div>
              <div className="kpi-value">{ocpRate}%</div>
              <div className="kpi-sub">{ocpFail > 0 ? `${ocpFail} مركز بحاجة إلى تفعيل برنامج العناية` : 'البرنامج مفعّل في كافة المراكز ✔'}</div>
              <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${ocpRate}%` }} /></div>
            </div>

            {/* 5. Materials supply */}
            <div className={`kpi-card ${getScoreClass(materialsRate)}`}>
              <div className="kpi-label"><FlaskConical size={13} /> مؤشر توفر المواد الأساسية</div>
              <div className="kpi-value">{materialsRate}%</div>
              <div className="kpi-sub">{materialsFail > 0 ? `${materialsFail} مركز يعاني من نقص المستلزمات` : 'المستلزمات متوفرة بجميع المراكز ✔'}</div>
              <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${materialsRate}%` }} /></div>
            </div>

            {/* 6. Service score ratio */}
            <div className="kpi-card info">
              <div className="kpi-label"><Activity size={13} /> معدل أداء الخدمات المقدمة (40%)</div>
              <div className="kpi-value">{avgService}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>/40</span></div>
              <div className="kpi-sub">المعدل من نقاط المرحلة الأولى (الخدمات)</div>
              <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${(avgService / 40) * 100}%` }} /></div>
            </div>

            {/* 7. Best performer */}
            {topCenter && (
              <div className="kpi-card good" style={{ gridColumn: 'span 1' }}>
                <div className="kpi-label"><TrendingUp size={13} /> أفضل مركز صحي مقيّم</div>
                <div className="kpi-value" style={{ fontSize: 'var(--text-lg)', fontWeight: 800 }}>{topCenter.name}</div>
                <div className="kpi-sub">{topCenter.directorateName} • {topCenter.sectorName}</div>
                <div style={{ marginTop: 8 }}>
                  <span className="badge badge-green" style={{ fontSize: 10 }}>الدرجة: {topCenter.score}%</span>
                </div>
              </div>
            )}

            {/* 8. Worst performer */}
            {bottomCenter && bottomCenter.id !== topCenter?.id && (
              <div className="kpi-card danger">
                <div className="kpi-label"><TrendingDown size={13} /> المركز الأحوج للمتابعة</div>
                <div className="kpi-value" style={{ fontSize: 'var(--text-lg)', fontWeight: 800 }}>{bottomCenter.name}</div>
                <div className="kpi-sub">{bottomCenter.directorateName} • {bottomCenter.sectorName}</div>
                <div style={{ marginTop: 8 }}>
                  <span className="badge badge-red" style={{ fontSize: 10 }}>الدرجة: {bottomCenter.score}%</span>
                </div>
              </div>
            )}

            {/* 9. Pending coverage */}
            <div className="kpi-card warning">
              <div className="kpi-label"><Clock size={13} /> المراكز المتبقية للتقييم</div>
              <div className="kpi-value">{pendingCount + inProgressCount}</div>
              <div className="kpi-sub">{pendingCount} قيد الانتظار • {inProgressCount} تحت التقييم</div>
              <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${100 - completionRate}%` }} /></div>
            </div>
          </div>
        </>
      )}

      {/* ── Section 3: Charts side-by-side ───────────────────────────── */}
      {evaluatedCount > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>

          {/* Pie: Score distribution */}
          {pieData.length > 0 && (
            <div className="chart-container" style={{ marginBottom: 0 }}>
              <h3 className="chart-title flex items-center gap-sm">
                <Stethoscope size={16} className="text-accent-green" /> توزيع درجات التقييم
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

          {/* Radar: Domain compliance */}
          <div className="chart-container" style={{ marginBottom: 0 }}>
            <h3 className="chart-title flex items-center gap-sm">
              <ShieldCheck size={16} className="text-accent-blue" /> مخطط الامتثال لمحاور التقييم
            </h3>
            <div style={{ width: '100%', height: 220, direction: 'ltr' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(0,0,0,0.06)" />
                  <PolarAngleAxis dataKey="domain" style={{ fontSize: 9, fontFamily: 'Cairo' }} />
                  <Radar name="الامتثال %" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, 'نسبة الامتثال']} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Clustered bar: service vs indicators vs total */}
          {barChartData.length > 0 && (
            <div className="chart-container" style={{ marginBottom: 0, gridColumn: 'span 1' }}>
              <h3 className="chart-title flex items-center gap-sm">
                <BarChart3 size={16} className="text-accent-green" /> مقارنة الخدمة ٤٠% والمؤشرات ٦٠%
              </h3>
              <div style={{ width: '100%', height: 220, direction: 'ltr' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 10, right: 0, left: -28, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={8} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontFamily: 'Cairo', fontSize: 9 }} />
                    <Bar dataKey="الخدمة 40%"    fill="#3b82f6" radius={[2,2,0,0]} />
                    <Bar dataKey="المؤشرات 60%" fill="#ef4444" radius={[2,2,0,0]} />
                    <Bar dataKey="المجموع 100%" fill="#10b981" radius={[2,2,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Section 4: Filter & List ─────────────────────────────────── */}
      <div className="flex flex-col gap-sm">
        <div className="search-box">
          <Search className="search-box-icon" />
          <input type="text" placeholder="ابحث بالاسم أو القطاع..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>

        <div className="flex gap-sm w-full">
          <div className="flex-1">
            <select className="form-select py-xs text-xs w-full" value={selectedDirId}
              onChange={e => { setSelectedDirId(e.target.value); setSelectedSectorId('all'); }}>
              <option value="all">كل الدوائر الصحية...</option>
              {directorates.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          {selectedDirId !== 'all' && (
            <div className="flex-1">
              <select className="form-select py-xs text-xs w-full" value={selectedSectorId}
                onChange={e => setSelectedSectorId(e.target.value)}>
                <option value="all">كل القطاعات...</option>
                {directorates.find(d => d.id === parseInt(selectedDirId))?.sectors.map(s =>
                  <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-sm flex-wrap">
        {[['all','الكل', totalCount], ['evaluated','تم التقييم', evaluatedCount], ['in-progress','تحت التقييم', inProgressCount], ['pending','قيد الانتظار', pendingCount]].map(([val, lbl, cnt]) => (
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
          <div key={`${c.directorateId}-${c.sectorId}-${c.id}`} className="list-item" style={{ borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}>
            <div className={`list-item-dot ${c.status === 'evaluated' ? 'green' : c.status === 'in-progress' ? 'orange' : 'blue'}`} />
            <div className="flex-grow">
              <span className="text-sm font-bold text-primary block">{c.name}</span>
              <span className="text-secondary text-xxs block mt-xs">{c.directorateName} • {c.sectorName}</span>
              {c.answers && (
                <div className="flex gap-xs mt-xs flex-wrap">
                  {c.answers.q_chair < 2    && <span className="badge badge-red"   style={{ fontSize: 9 }}>⚠ كرسي</span>}
                  {c.answers.q_materials === 0 && <span className="badge badge-red" style={{ fontSize: 9 }}>⚠ مواد</span>}
                  {c.answers.q_inf_autoclave < 2 && <span className="badge badge-red" style={{ fontSize: 9 }}>⚠ تعقيم</span>}
                  {c.answers.q_daily_reg < 2 && <span className="badge badge-orange" style={{ fontSize: 9 }}>⚠ سجلات</span>}
                  {c.answers.q_ocp_card < 2  && <span className="badge badge-orange" style={{ fontSize: 9 }}>⚠ برنامج عناية</span>}
                </div>
              )}
            </div>
            <div className="flex flex-col items-center gap-xs">
              {c.status === 'evaluated'
                ? <span className="badge badge-green text-xs font-bold">{c.score}%</span>
                : c.status === 'in-progress'
                  ? <span className="badge badge-orange text-xs">تحت التقييم</span>
                  : <span className="badge badge-blue text-xs">قيد الانتظار</span>}
              {c.status === 'evaluated' && (
                <div className="flex gap-xs">
                  <span style={{ fontSize: 9, color: '#3b82f6' }}>خ:{c.serviceScore}</span>
                  <span style={{ fontSize: 9, color: '#ef4444' }}>م:{c.indicatorScore}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
