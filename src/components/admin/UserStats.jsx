import React from 'react';
import { getUsers, getStats } from '../../data/store';
import StatCard from '../ui/StatCard';
import ProgressBar from '../ui/ProgressBar';
import { Users, ClipboardCheck, TrendingUp, Sparkles } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function UserStats() {
  const users = getUsers().filter((u) => u.role !== 'admin');
  const stats = getStats();

  // Evaluator distribution chart data
  const chartData = [
    { name: 'مقيّم مراكز صحية', value: stats.healthEvaluators, color: '#10b981' },
    { name: 'مقيّم مراكز تخصصية', value: stats.specEvaluators, color: '#8b5cf6' },
  ].filter(d => d.value > 0);

  return (
    <div className="flex flex-col gap-lg">
      <div className="bento-grid">
        <StatCard
          value={stats.totalEvaluators}
          label="إجمالي المقيّمين"
          icon={Users}
          color="blue"
        />
        <StatCard
          value={stats.healthEvaluators}
          label="مقيّمي المراكز الصحية"
          icon={ClipboardCheck}
          color="green"
        />
        <StatCard
          value={stats.specEvaluators}
          label="مقيّمي المراكز التخصصية"
          icon={TrendingUp}
          color="purple"
        />
        <StatCard
          value={
            users.length > 0
              ? `${Math.round(
                  (users.reduce((acc, u) => acc + u.evaluationsCompleted, 0) /
                    (users.reduce((acc, u) => acc + u.totalAssigned, 0) || 1)) *
                    100
                )}%`
              : '0%'
          }
          label="معدل إنجاز اللجان"
          icon={Sparkles}
          color="orange"
        />
      </div>

      {/* Pie Chart */}
      {chartData.length > 0 && (
        <div className="chart-container">
          <h3 className="chart-title">توزيع اللجان والمقيّمين حسب الاختصاص</h3>
          <div style={{ width: '100%', height: 180, direction: 'ltr' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f1d32', 
                    borderColor: 'rgba(255,255,255,0.08)',
                    color: '#f1f5f9',
                    fontFamily: 'Cairo'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-lg mt-sm text-xs">
            <div className="flex items-center gap-xs">
              <span className="w-3 height-3 rounded-full bg-accent-green inline-block" style={{ width: 10, height: 10 }} />
              <span className="text-secondary">مراكز صحية ({stats.healthEvaluators})</span>
            </div>
            <div className="flex items-center gap-xs">
              <span className="w-3 height-3 rounded-full bg-accent-purple inline-block" style={{ width: 10, height: 10 }} />
              <span className="text-secondary">مراكز تخصصية ({stats.specEvaluators})</span>
            </div>
          </div>
        </div>
      )}

      {/* Evaluator Progress List */}
      <div className="flex flex-col gap-sm">
        <h4 className="text-secondary text-sm font-bold px-xs">تقدم عمل المقيّمين</h4>
        {users.length === 0 ? (
          <p className="text-secondary text-xs text-center py-md">لا يوجد مقيّمون مسجلون حالياً.</p>
        ) : (
          users.map((u) => {
            const completion = u.totalAssigned > 0 ? Math.round((u.evaluationsCompleted / u.totalAssigned) * 100) : 0;
            return (
              <div key={u.id} className="p-md bg-card rounded-lg flex flex-col gap-sm">
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold text-xs">{u.fullName}</span>
                  <span className="text-secondary text-xxs">
                    {u.evaluationsCompleted} من {u.totalAssigned} زيارة
                  </span>
                </div>
                <ProgressBar
                  value={u.evaluationsCompleted}
                  max={u.totalAssigned || 1}
                  color={u.specialization === 'health' ? 'green' : 'purple'}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
