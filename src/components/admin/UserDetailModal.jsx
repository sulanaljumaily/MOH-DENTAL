import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import ProgressBar from '../ui/ProgressBar';
import { getDirectorates, deleteUser, updateUser } from '../../data/store';
import { 
  User, 
  Shield, 
  Calendar, 
  MapPin, 
  ClipboardCheck, 
  AlertTriangle, 
  Key, 
  Trash2, 
  Check, 
  Square, 
  CheckSquare,
  Lock
} from 'lucide-react';

export default function UserDetailModal({ user, isOpen, onClose, onUserDeleted, onUserUpdated }) {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Reset Password states
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Edit Permissions states
  const [specialization, setSpecialization] = useState('');
  const [directorateId, setDirectorateId] = useState('');
  const [sectorId, setSectorId] = useState('');
  const [assignedCenterIds, setAssignedCenterIds] = useState([]);
  const [permissionsSuccess, setPermissionsSuccess] = useState(false);
  const [permissionsError, setPermissionsError] = useState('');

  const directorates = getDirectorates();

  // Populate edit states when user changes or tab becomes active
  useEffect(() => {
    if (user) {
      setSpecialization(user.specialization || 'health');
      setDirectorateId(user.directorateIds && user.directorateIds.length > 0 ? user.directorateIds[0].toString() : '');
      setSectorId(user.sectorId ? user.sectorId.toString() : '');
      setAssignedCenterIds(user.assignedCenterIds || []);
    }
  }, [user, activeTab]);

  const selectedDir = directorates.find(d => d.id === parseInt(directorateId));
  const sectors = selectedDir ? selectedDir.sectors : [];
  const selectedSector = sectors.find(s => s.id === parseInt(sectorId));

  // Determine which list of centers to show
  const availableCenters = specialization === 'health'
    ? (selectedSector ? selectedSector.healthCenters : [])
    : (selectedDir ? selectedDir.specializedCenters : []);

  // Reset sector and centers list when directorate/specialization changes in edit form
  const handleDirChange = (val) => {
    setDirectorateId(val);
    setSectorId('');
    setAssignedCenterIds([]);
  };

  const handleSpecChange = (val) => {
    setSpecialization(val);
    setSectorId('');
    setAssignedCenterIds([]);
  };

  const handleCenterToggle = (centerId) => {
    setAssignedCenterIds(prev => 
      prev.includes(centerId)
        ? prev.filter(id => id !== centerId)
        : [...prev, centerId]
    );
  };

  const handleSelectAll = () => {
    if (assignedCenterIds.length === availableCenters.length) {
      setAssignedCenterIds([]); // Deselect all
    } else {
      setAssignedCenterIds(availableCenters.map(c => c.id)); // Select all
    }
  };

  if (!user) return null;

  const getDirectorateNames = (dirIds = []) => {
    if (!dirIds || dirIds.length === 0) return 'غير محدد';
    return dirIds
      .map(id => {
        const dir = directorates.find(d => d.id === id);
        return dir ? dir.name : '';
      })
      .filter(Boolean)
      .join('، ');
  };

  const getSectorName = (dirIds = [], secId) => {
    if (!dirIds || dirIds.length === 0) return '';
    for (const dirId of dirIds) {
      const dir = directorates.find((d) => d.id === dirId);
      if (dir) {
        const sec = dir.sectors.find((s) => s.id === secId);
        if (sec) return sec.name;
      }
    }
    return '';
  };

  const handleDelete = () => {
    if (confirm(`هل أنت متأكد من حذف حساب المستخدم ${user.fullName}؟`)) {
      deleteUser(user.id);
      onUserDeleted();
      onClose();
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!passwordInput) return;
    updateUser(user.id, { password: passwordInput });
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setPasswordInput('');
    }, 1500);
  };

  const handleSavePermissions = (e) => {
    e.preventDefault();
    setPermissionsError('');
    setPermissionsSuccess(false);

    if (!directorateId) {
      setPermissionsError('يرجى اختيار دائرة الصحة');
      return;
    }

    if (specialization === 'health' && !sectorId) {
      setPermissionsError('يرجى اختيار القطاع الصحي');
      return;
    }

    if (assignedCenterIds.length === 0) {
      setPermissionsError('يرجى اختيار مركز واحد على الأقل وتخويله');
      return;
    }

    const updates = {
      specialization,
      directorateIds: [parseInt(directorateId)],
      sectorId: specialization === 'health' ? parseInt(sectorId) : null,
      assignedCenterIds,
      totalAssigned: assignedCenterIds.length
    };

    updateUser(user.id, updates);
    setPermissionsSuccess(true);
    if (onUserUpdated) onUserUpdated();
    setTimeout(() => {
      setPermissionsSuccess(false);
    }, 1500);
  };

  // Completion percentage
  const completionRate = user.totalAssigned > 0 
    ? Math.round((user.evaluationsCompleted / user.totalAssigned) * 100) 
    : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="تفاصيل حساب المستخدم" size="medium">
      {/* Tabs */}
      <div className="modal-tabs overflow-x-auto whitespace-nowrap scrollbar-none flex">
        <button
          className={`modal-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          نظرة عامة
        </button>
        <button
          className={`modal-tab ${activeTab === 'permissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('permissions')}
        >
          تخويل الصلاحيات
        </button>
        <button
          className={`modal-tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          إحصائيات التقدم
        </button>
        <button
          className={`modal-tab ${activeTab === 'other' ? 'active' : ''}`}
          onClick={() => setActiveTab('other')}
        >
          إعدادات أخرى
        </button>
      </div>

      <div className="modal-body flex-1 overflow-y-auto pr-xs" style={{ maxHeight: '60vh' }}>
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-lg">
            <div className="flex items-center gap-md p-md bg-card rounded-lg border border-color">
              <div className="user-avatar blue font-bold text-lg" style={{ width: 44, height: 44 }}>
                {user.fullName.charAt(0)}
              </div>
              <div>
                <h3 className="user-name text-lg">{user.fullName}</h3>
                <span className="badge badge-blue mt-sm">
                  {user.role === 'admin' ? 'مدير النظام' : 'مقيّم معتمد'}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-md">
              <div className="flex justify-between items-center p-sm border-b">
                <span className="text-secondary flex items-center gap-sm">
                  <User size={16} /> اسم المستخدم
                </span>
                <span className="text-primary font-bold">{user.username}</span>
              </div>

              <div className="flex justify-between items-center p-sm border-b">
                <span className="text-secondary flex items-center gap-sm">
                  <Shield size={16} /> الاختصاص
                </span>
                <span className="text-primary font-bold">
                  {user.specialization === 'health' 
                    ? 'تقييم المراكز الصحية العامة' 
                    : user.specialization === 'specialized' 
                    ? 'تقييم المراكز التخصصية'
                    : 'مدير النظام'}
                </span>
              </div>

              {user.directorateIds && user.directorateIds.length > 0 && (
                <div className="flex justify-between items-center p-sm border-b">
                  <span className="text-secondary flex items-center gap-sm">
                    <MapPin size={16} /> دوائر الصحة المخولة
                  </span>
                  <span className="text-primary font-bold text-xs" style={{ maxWidth: '60%', textAlign: 'left' }}>
                    {getDirectorateNames(user.directorateIds)}
                  </span>
                </div>
              )}

              {user.specialization === 'health' && user.sectorId && (
                <div className="flex justify-between items-center p-sm border-b">
                  <span className="text-secondary flex items-center gap-sm">
                    <MapPin size={16} /> القطاع الصحي
                  </span>
                  <span className="text-primary font-bold">
                    {getSectorName(user.directorateIds, user.sectorId)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center p-sm border-b">
                <span className="text-secondary flex items-center gap-sm">
                  <ClipboardCheck size={16} /> المراكز المخولة
                </span>
                <span className="badge badge-blue text-xs font-bold">
                  {user.assignedCenterIds ? user.assignedCenterIds.length : 0} مركز
                </span>
              </div>

              <div className="flex justify-between items-center p-sm border-b">
                <span className="text-secondary flex items-center gap-sm">
                  <Calendar size={16} /> تاريخ الإنشاء
                </span>
                <span className="text-primary font-bold">{user.createdAt}</span>
              </div>
            </div>
          </div>
        )}

        {/* PERMISSIONS / AUTHORIZATIONS TAB */}
        {activeTab === 'permissions' && (
          <form onSubmit={handleSavePermissions} className="flex flex-col gap-md">
            <h4 className="text-primary font-bold mb-xs flex items-center gap-sm">
              <Lock size={18} /> تعديل صلاحيات وتخويلات الحساب
            </h4>

            {permissionsSuccess && (
              <div className="badge badge-green w-full justify-center py-sm">
                تم تحديث الصلاحيات والتخويلات بنجاح!
              </div>
            )}

            {permissionsError && (
              <div className="badge badge-red w-full justify-center py-sm">
                {permissionsError}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">الاختصاص والتقييم</label>
              <select
                className="form-select"
                value={specialization}
                onChange={(e) => handleSpecChange(e.target.value)}
                disabled={user.role === 'admin'}
              >
                <option value="health">تقييم المراكز الصحية العامة (وحدة الأسنان)</option>
                <option value="specialized">تقييم المراكز التخصصية لطب الأسنان</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">دائرة الصحة التابع لها</label>
              <select
                className="form-select"
                value={directorateId}
                onChange={(e) => handleDirChange(e.target.value)}
                required
                disabled={user.role === 'admin'}
              >
                <option value="">اختر دائرة الصحة...</option>
                {directorates.map((dir) => (
                  <option key={dir.id} value={dir.id}>
                    {dir.name}
                  </option>
                ))}
              </select>
            </div>

            {specialization === 'health' && directorateId && (
              <div className="form-group">
                <label className="form-label">القطاع الصحي التابع له</label>
                <select
                  className="form-select"
                  value={sectorId}
                  onChange={(e) => setSectorId(e.target.value)}
                  required
                  disabled={user.role === 'admin'}
                >
                  <option value="">اختر القطاع...</option>
                  {sectors.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Checkbox centers list */}
            {user.role !== 'admin' && availableCenters.length > 0 && (
              <div className="form-group mt-xs pt-xs border-t border-color/40">
                <div className="flex justify-between items-center mb-sm">
                  <label className="form-label mb-0 font-bold text-primary">المراكز المخولة بالتقييم</label>
                  <button
                    type="button"
                    className="btn btn-secondary btn-xs py-xxs px-sm text-xxs font-bold"
                    onClick={handleSelectAll}
                  >
                    {assignedCenterIds.length === availableCenters.length ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
                  </button>
                </div>
                
                <div className="flex flex-col gap-xs p-xs bg-secondary/20 rounded border border-color max-h-40 overflow-y-auto">
                  {availableCenters.map((center) => {
                    const isChecked = assignedCenterIds.includes(center.id);
                    return (
                      <label
                        key={center.id}
                        className="flex items-center gap-sm p-sm hover:bg-card/40 rounded cursor-pointer transition-all border border-transparent hover:border-color"
                        onClick={() => handleCenterToggle(center.id)}
                        style={{ userSelect: 'none' }}
                      >
                        {isChecked ? (
                          <CheckSquare size={16} className={specialization === 'health' ? 'text-accent-green' : 'text-accent-purple'} />
                        ) : (
                          <Square size={16} className="text-secondary" />
                        )}
                        <span className="text-xs text-primary font-medium">{center.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {user.role !== 'admin' && (
              <button type="submit" className="btn btn-primary btn-full mt-sm">
                حفظ تعديلات الصلاحيات والتخويلات
              </button>
            )}
          </form>
        )}

        {/* PROGRESS STATS TAB */}
        {activeTab === 'stats' && (
          <div className="flex flex-col gap-lg">
            <div className="bento-grid cols-2 gap-md">
              <div className="stat-card green">
                <div className="stat-card-header">
                  <div className="stat-card-icon">
                    <ClipboardCheck size={20} />
                  </div>
                </div>
                <div className="stat-card-value">{user.evaluationsCompleted}</div>
                <div className="stat-card-label">الزيارات المنجزة</div>
              </div>

              <div className="stat-card blue">
                <div className="stat-card-header">
                  <div className="stat-card-icon">
                    <User size={20} />
                  </div>
                </div>
                <div className="stat-card-value">{user.totalAssigned}</div>
                <div className="stat-card-label">المراكز المخصصة</div>
              </div>
            </div>

            <div className="p-md bg-card rounded-lg border border-color flex flex-col gap-sm">
              <span className="text-secondary text-sm">نسبة إنجاز المهام المسندة</span>
              <ProgressBar 
                value={user.evaluationsCompleted} 
                max={user.totalAssigned || 1} 
                color={completionRate > 75 ? 'green' : completionRate > 40 ? 'orange' : 'red'} 
                label="التقدم الإجمالي"
              />
            </div>

            <div className="empty-state py-md">
              <p className="empty-state-title text-sm">سجل الزيارات والتقييمات الأخيرة</p>
              <p className="empty-state-desc text-xs">
                {user.evaluationsCompleted > 0 
                  ? 'تم إرسال كافة استمارات التقييم بنجاح إلى قاعدة بيانات إحصائيات الوزارة.'
                  : 'لم يقم هذا المقيّم بأي زيارة ميدانية حتى الآن.'}
              </p>
            </div>
          </div>
        )}

        {/* OTHER SETTINGS TAB */}
        {activeTab === 'other' && (
          <div className="flex flex-col gap-lg">
            {user.role !== 'admin' && (
              <div className="p-md bg-card rounded-lg border border-red-500/20">
                <h4 className="text-primary font-bold mb-xs flex items-center gap-sm text-red-400">
                  <AlertTriangle size={18} /> منطقة إجراءات الخطورة
                </h4>
                <p className="text-secondary text-xs mb-md">
                  حذف حساب المقيّم سيؤدي إلى إلغاء صلاحية الوصول الخاصة به فوراً.
                </p>
                <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                  <Trash2 size={16} /> حذف هذا الحساب نهائياً
                </button>
              </div>
            )}

            <form onSubmit={handleResetPassword} className="p-md bg-card rounded-lg border border-color flex flex-col gap-sm">
              <h4 className="text-primary font-bold mb-xs flex items-center gap-sm">
                <Key size={18} /> تعيين كلمة مرور جديدة للمستخدم
              </h4>
              
              {passwordSuccess && (
                <div className="badge badge-green py-xs justify-center mb-sm">
                  تم تحديث كلمة المرور للمستخدم!
                </div>
              )}

              <div className="form-group mb-xs">
                <input
                  type="password"
                  className="form-input"
                  placeholder="كلمة المرور الجديدة"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-secondary btn-sm align-self-start mt-sm">
                تحديث كلمة المرور
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary btn-full" onClick={onClose}>
          إغلاق النافذة
        </button>
      </div>
    </Modal>
  );
}
