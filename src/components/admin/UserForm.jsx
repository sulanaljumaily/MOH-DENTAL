import React, { useState, useEffect } from 'react';
import { getDirectorates, addUser } from '../../data/store';
import { Shield, User, Key, Check, Square, CheckSquare } from 'lucide-react';

export default function UserForm({ onSuccess, onClose }) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [specialization, setSpecialization] = useState('health'); // 'health' or 'specialized'
  const [directorateId, setDirectorateId] = useState('');
  const [sectorId, setSectorId] = useState('');
  const [assignedCenterIds, setAssignedCenterIds] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const directorates = getDirectorates();
  const selectedDir = directorates.find(d => d.id === parseInt(directorateId));
  const sectors = selectedDir ? selectedDir.sectors : [];
  const selectedSector = sectors.find(s => s.id === parseInt(sectorId));

  // Determine which list of centers to show
  const availableCenters = specialization === 'health'
    ? (selectedSector ? selectedSector.healthCenters : [])
    : (selectedDir ? selectedDir.specializedCenters : []);

  // Reset sector and centers list when directorate/specialization changes
  useEffect(() => {
    setSectorId('');
    setAssignedCenterIds([]);
  }, [directorateId, specialization]);

  // Reset centers list when sector changes
  useEffect(() => {
    setAssignedCenterIds([]);
  }, [sectorId]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName || !username || !password || !directorateId) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (specialization === 'health' && !sectorId) {
      setError('يرجى اختيار القطاع الصحي');
      return;
    }

    if (assignedCenterIds.length === 0) {
      setError('يرجى تحديد مركز واحد على الأقل وتخويله للمقيّم');
      return;
    }

    const userData = {
      fullName,
      username,
      password,
      role: 'evaluator',
      specialization,
      directorateIds: [parseInt(directorateId)],
      sectorId: specialization === 'health' ? parseInt(sectorId) : null,
      assignedCenterIds,
      evaluationsCompleted: 0,
      totalAssigned: assignedCenterIds.length
    };

    try {
      addUser(userData);
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء الحساب. قد يكون اسم المستخدم مكرر.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
      <div className="modal-body flex-1 overflow-y-auto pr-xs" style={{ maxHeight: '60vh' }}>
        {error && (
          <div className="badge badge-red w-full mb-md justify-center py-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="badge badge-green w-full mb-md justify-center py-sm">
            <Check size={16} className="ml-sm" /> تم إنشاء الحساب بنجاح!
          </div>
        )}

        <div className="form-group">
          <label className="form-label">الاسم الكامل للموظف/اللجنة</label>
          <input
            type="text"
            className="form-input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="مثال: د. محمد علي أو لجنة تقييم الرصافة"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">اسم المستخدم</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">كلمة المرور</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">الاختصاص والتقييم</label>
          <select
            className="form-select"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
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
            onChange={(e) => setDirectorateId(e.target.value)}
            required
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

        {/* Authorized Centers Checkbox List */}
        {availableCenters.length > 0 && (
          <div className="form-group mt-md border-t pt-md">
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
      </div>

      <div className="modal-footer mt-md">
        <button type="submit" className="btn btn-primary flex-1">
          إنشاء الحساب وتخويل الصلاحيات
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          إلغاء
        </button>
      </div>
    </form>
  );
}
