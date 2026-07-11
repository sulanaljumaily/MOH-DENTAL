import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getUsers, 
  getDirectorates, 
  getStats, 
  deleteUser, 
  deleteDirectorate,
  resetData
} from '../data/store';

// UI Components
import BottomNav from '../components/ui/BottomNav';
import TopTabs from '../components/ui/TopTabs';
import StatCard from '../components/ui/StatCard';
import Modal from '../components/ui/Modal';

// User Components
import UserList from '../components/admin/UserList';
import UserForm from '../components/admin/UserForm';
import UserDetailModal from '../components/admin/UserDetailModal';

// Directorate Components
import DirectorateList from '../components/admin/DirectorateList';
import DirectorateDetailModal from '../components/admin/DirectorateDetailModal';

// Stats Components
import StatsOverview from '../components/admin/StatsOverview';
import StatsDirectorates from '../components/admin/StatsDirectorates';
import StatsSpecialized from '../components/admin/StatsSpecialized';
import StatsHealthCenters from '../components/admin/StatsHealthCenters';
import ReportsPanel from '../components/admin/ReportsPanel';

// Icons
import { 
  Users, 
  Building2, 
  BarChart3, 
  Plus, 
  LogOut, 
  ShieldAlert, 
  Activity, 
  Stethoscope, 
  FolderPlus,
  Compass,
  RotateCcw
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeMainTab, setActiveMainTab] = useState('users'); // 'users', 'directorates', 'stats'
  const [activeSubTab, setActiveSubTab] = useState('overview'); // for Stats tab

  // Data State
  const [users, setUsers] = useState([]);
  const [directorates, setDirectorates] = useState([]);
  const [stats, setStats] = useState({});

  // Modal States
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddDirOpen, setIsAddDirOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDir, setSelectedDir] = useState(null);

  // Load Data
  const refreshData = () => {
    setUsers(getUsers());
    setDirectorates(getDirectorates());
    setStats(getStats());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleLogout = () => {
    if (confirm('هل تريد تسجيل الخروج والعودة للقائمة الرئيسية؟')) {
      navigate('/');
    }
  };

  const handleResetDatabase = () => {
    if (confirm('🚨 تحذير: سيتم إعادة تعيين قاعدة البيانات بالكامل إلى النسخة الافتراضية وحذف أي تغييرات أو إضافات قمت بها. هل أنت متأكد؟')) {
      resetData();
      refreshData();
      alert('تمت إعادة تعيين قاعدة البيانات بنجاح!');
      window.location.reload();
    }
  };

  // Sub-tabs configuration for stats
  const statsTabs = [
    { id: 'overview', label: 'نظرة عامة' },
    { id: 'directorates', label: 'إحصائيات الدوائر' },
    { id: 'specialized', label: 'المراكز التخصصية' },
    { id: 'health', label: 'المراكز الصحية' }
  ];

  return (
    <div className="app-layout">
      {/* Top Header */}
      <header className="page-header" style={{ padding: 'var(--space-md) var(--space-lg)', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)', position: 'sticky', top: 0, zIndex: 10 }}>
        {/* Right side: App Branding */}
        <div className="flex items-center gap-md">
          <div className="user-avatar blue" style={{ width: 36, height: 36 }}>
            <ShieldAlert size={18} />
          </div>
          <div>
            <h1 className="page-title" style={{ fontSize: 'var(--text-md)' }}>منصة التقييم الصحي</h1>
          </div>
        </div>

        {/* Left side: Page details next to logout button */}
        <div className="flex items-center gap-md">
          <div style={{ textAlign: 'left' }}>
            <p className="page-subtitle" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0 }}>مسؤول النظام العام</p>
          </div>
          <button className="back-btn" onClick={handleLogout} title="تسجيل الخروج">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Top Sub-tabs (Visible only under Stats main tab) */}
      {activeMainTab === 'stats' && (
        <TopTabs 
          tabs={statsTabs} 
          activeTab={activeSubTab} 
          onChange={setActiveSubTab} 
        />
      )}

      {/* Main Content Area */}
      <main className={`app-content page-container ${activeMainTab === 'stats' ? 'with-top-tabs' : ''}`}>
        
        {/* TAB 1: USERS */}
        {activeMainTab === 'users' && (
          <div className="flex flex-col gap-lg">
            {/* Horizontal Stats Grid (2 per row) */}
            <div className="bento-grid">
              <StatCard
                value={users.length}
                label="إجمالي الحسابات"
                icon={Users}
                color="blue"
              />
              <StatCard
                value={users.filter(u => u.specialization === 'health').length}
                label="لجان المراكز الصحية"
                icon={Stethoscope}
                color="green"
              />
              <StatCard
                value={users.filter(u => u.specialization === 'specialized').length}
                label="لجان المراكز التخصصية"
                icon={Building2}
                color="purple"
              />
              <StatCard
                value={users.reduce((acc, u) => acc + u.evaluationsCompleted, 0)}
                label="إجمالي التقييمات المنجزة"
                icon={Activity}
                color="orange"
              />
            </div>

            {/* Actions Bar */}
            <div className="flex justify-between items-center bg-card p-md rounded-lg border border-color">
              <div className="flex flex-col">
                <span className="text-primary font-bold text-sm">حسابات لجان التقييم</span>
                <span className="text-secondary text-xs">تخويل وتعديل صلاحيات الموظفين</span>
              </div>
              <button 
                className="btn btn-primary btn-sm flex items-center gap-xs"
                onClick={() => setIsAddUserOpen(true)}
              >
                <Plus size={16} /> إضافة مستخدم
              </button>
            </div>

            {/* Users List */}
            <UserList 
              users={users} 
              onSelectUser={setSelectedUser}
              onDeleteUser={(id) => {
                if (confirm('هل أنت متأكد من حذف هذا الحساب؟')) {
                  deleteUser(id);
                  refreshData();
                }
              }}
            />
          </div>
        )}

        {/* TAB 2: DIRECTORATES */}
        {activeMainTab === 'directorates' && (
          <div className="flex flex-col gap-lg">
            {/* Horizontal Stats Grid (2 per row) */}
            <div className="bento-grid">
              <StatCard
                value={directorates.length}
                label="الدوائر الصحية"
                icon={Building2}
                color="blue"
              />
              <StatCard
                value={stats.totalSectors || 0}
                label="إجمالي القطاعات"
                icon={Compass}
                color="cyan"
              />
              <StatCard
                value={stats.totalHealthCenters || 0}
                label="المراكز الصحية"
                icon={Stethoscope}
                color="green"
              />
              <StatCard
                value={stats.totalSpecialized || 0}
                label="المراكز التخصصية"
                icon={Building2}
                color="purple"
              />
            </div>

            {/* Actions Bar */}
            <div className="flex justify-between items-center bg-card p-md rounded-lg border border-color">
              <div className="flex flex-col">
                <span className="text-primary font-bold text-sm">تنظيم دوائر الصحة والمراكز</span>
                <span className="text-secondary text-xs">إضافة وتوزيع المحافظات والقطاعات والعيادات</span>
              </div>
              <div className="flex gap-sm">
                <button 
                  className="btn btn-secondary btn-sm flex items-center gap-xs"
                  onClick={handleResetDatabase}
                  style={{ color: '#f87171', borderColor: 'rgba(248, 113, 113, 0.2)' }}
                >
                  <RotateCcw size={16} /> إعادة تعيين قاعدة البيانات
                </button>
                <button 
                  className="btn btn-primary btn-sm flex items-center gap-xs"
                  onClick={() => setIsAddDirOpen(true)}
                >
                  <Plus size={16} /> إضافة دائرة صحية
                </button>
              </div>
            </div>

            {/* Directorates List */}
            <DirectorateList 
              directorates={directorates}
              onSelectDirectorate={setSelectedDir}
              onDeleteDirectorate={(id) => {
                if (confirm('هل أنت متأكد من حذف هذه الدائرة وجميع قطاعاتها ومراكزها بشكل كامل؟')) {
                  deleteDirectorate(id);
                  refreshData();
                }
              }}
            />
          </div>
        )}

        {/* TAB 3: STATISTICS */}
        {activeMainTab === 'stats' && (
          <div className="flex flex-col">
            {activeSubTab === 'overview' && <StatsOverview />}
            {activeSubTab === 'directorates' && <StatsDirectorates />}
            {activeSubTab === 'specialized' && <StatsSpecialized />}
            {activeSubTab === 'health' && <StatsHealthCenters />}
          </div>
        )}

        {/* TAB 4: REPORTS */}
        {activeMainTab === 'reports' && (
          <ReportsPanel />
        )}

      </main>

      {/* Bottom Navigation */}
      <BottomNav 
        activeTab={activeMainTab} 
        setActiveTab={setActiveMainTab} 
      />

      {/* Modals */}
      
      {/* 1. Add User Modal */}
      <Modal 
        isOpen={isAddUserOpen} 
        onClose={() => setIsAddUserOpen(false)} 
        title="إنشاء حساب لجنة تقييم جديدة"
        size="medium"
      >
        <UserForm 
          onSuccess={() => {
            setIsAddUserOpen(false);
            refreshData();
          }}
          onClose={() => setIsAddUserOpen(false)}
        />
      </Modal>

      {/* 2. Add Directorate Modal */}
      <DirectorateDetailModal 
        directorate={null}
        isOpen={isAddDirOpen}
        onClose={() => setIsAddDirOpen(false)}
        onSave={() => {
          setIsAddDirOpen(false);
          refreshData();
        }}
      />

      {/* 3. User Details Modal */}
      {selectedUser && (
        <UserDetailModal 
          user={selectedUser}
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          onUserDeleted={refreshData}
          onUserUpdated={refreshData}
        />
      )}

      {/* 4. Directorate Details & Management Modal */}
      {selectedDir && (
        <DirectorateDetailModal 
          directorate={selectedDir}
          isOpen={!!selectedDir}
          onClose={() => setSelectedDir(null)}
          onSave={refreshData}
        />
      )}
    </div>
  );
}
