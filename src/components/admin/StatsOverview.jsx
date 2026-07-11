import React from 'react';
import { getStats, getDirectorates, getDirectorateStats } from '../../data/store';
import StatCard from '../ui/StatCard';
import ProgressBar from '../ui/ProgressBar';
import { 
  Building, 
  Stethoscope, 
  Building2, 
  Users, 
  TrendingUp, 
  Award, 
  CheckCircle,
  BarChart2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';

export default function StatsOverview() {
  const stats = getStats();
  const directorates = getDirectorates();

  // Prepare chart data
  const chartData = directorates.map((dir) => {
    const dirStats = getDirectorateStats(dir.id);
    return {
      name: dir.name.replace('دائرة صحة ', ''),
      'مراكز صحية': dirStats.evaluatedHealth,
      'مراكز تخصصية': dirStats.evaluatedSpecialized,
    };
  });

  return (
    <div className="flex flex-col gap-lg">
      {/* Bento Grid Stats */}
      <div className="bento-grid">
        <StatCard
          value={stats.directorates}
          label="الدوائر الصحية"
          icon={Building}
          color="blue"
        />
        <StatCard
          value={stats.totalHealthCenters}
          label="إجمالي المراكز الصحية"
          icon={Stethoscope}
          color="green"
        />
        <StatCard
          value={stats.totalSpecialized}
          label="إجمالي المراكز التخصصية"
          icon={Building2}
          color="purple"
        />
        <StatCard
          value={stats.totalEvaluators}
          label="المقيّمين المخولين"
          icon={Users}
          color="cyan"
        />
        
        {/* Progress Cards (Full Width / Span 2) */}
        <div className="bento-card span-2 green flex flex-col gap-sm">
          <div className="flex justify-between items-center">
            <span className="text-secondary text-xs flex items-center gap-xs">
              <CheckCircle size={14} /> تقدم تقييم المراكز الصحية العامة
            </span>
            <span className="text-primary text-sm font-bold">{stats.healthEvalProgress}%</span>
          </div>
          <ProgressBar value={stats.evaluatedHealth} max={stats.totalHealthCenters || 1} color="green" />
          <p className="text-secondary text-xs">
            تم تقييم {stats.evaluatedHealth} من أصل {stats.totalHealthCenters} مركز صحي عام يحتوي على وحدة أسنان.
          </p>
        </div>

        <div className="bento-card span-2 purple flex flex-col gap-sm">
          <div className="flex justify-between items-center">
            <span className="text-secondary text-xs flex items-center gap-xs">
              <CheckCircle size={14} /> تقدم تقييم المراكز التخصصية لطب الأسنان
            </span>
            <span className="text-primary text-sm font-bold">{stats.specEvalProgress}%</span>
          </div>
          <ProgressBar value={stats.evaluatedSpecialized} max={stats.totalSpecialized || 1} color="purple" />
          <p className="text-secondary text-xs">
            تم تقييم {stats.evaluatedSpecialized} من أصل {stats.totalSpecialized} مركز أسنان تخصصي.
          </p>
        </div>

        <StatCard
          value={`${stats.avgHealthScore}%`}
          label="معدل تقييم المراكز الصحية"
          icon={Award}
          color="orange"
        />
        <StatCard
          value={`${stats.avgSpecScore}%`}
          label="معدل تقييم المراكز التخصصية"
          icon={TrendingUp}
          color="red"
        />
      </div>

      {/* Chart */}
      <div className="chart-container">
        <h3 className="chart-title flex items-center gap-sm">
          <BarChart2 size={18} className="text-accent-blue" />
          مقارنة التقييمات المنجزة حسب الدوائر الصحية
        </h3>
        <div style={{ width: '100%', height: 300, direction: 'ltr' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 0, left: -25, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                fontSize={9}
                tickLine={false}
                angle={-45}
                textAnchor="end"
                interval={0}
                height={60}
              />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f1d32', 
                  borderColor: 'rgba(255,255,255,0.08)',
                  color: '#f1f5f9',
                  fontFamily: 'Cairo'
                }}
              />
              <Legend 
                wrapperStyle={{ fontFamily: 'Cairo', fontSize: 11, paddingTop: 10 }}
              />
              <Bar dataKey="مراكز صحية" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="مراكز تخصصية" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
