import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import ProgressBar from '../ui/ProgressBar';
import { 
  addDirectorate, 
  updateDirectorate, 
  getDirectorateStats 
} from '../../data/store';
import { 
  Building, 
  MapPin, 
  FileText, 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Activity,
  Stethoscope,
  Building2,
  Compass
} from 'lucide-react';

export default function DirectorateDetailModal({ 
  directorate, 
  isOpen, 
  onClose, 
  onSave 
}) {
  const isEditMode = !!directorate;
  const [activeTab, setActiveTab] = useState('overview');

  // Form State
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [sectors, setSectors] = useState([]);
  const [specializedCenters, setSpecializedCenters] = useState([]);

  // UI State
  const [expandedSectorId, setExpandedSectorId] = useState(null);
  const [newSectorName, setNewSectorName] = useState('');
  const [newCenterName, setNewCenterName] = useState('');
  const [newSpecName, setNewSpecName] = useState('');
  const [expandedSpecUnitsId, setExpandedSpecUnitsId] = useState(null);
  
  // Editing state for names
  const [editingId, setEditingId] = useState(null); // { type: 'sector'|'health'|'specialized', id, sectorId }
  const [editTempName, setEditTempName] = useState('');

  // Synchronize with prop changes
  useEffect(() => {
    if (directorate) {
      setName(directorate.name || '');
      setLocation(directorate.location || '');
      setDescription(directorate.description || '');
      setSectors(directorate.sectors || []);
      setSpecializedCenters(directorate.specializedCenters || []);
      setActiveTab('overview');
    } else {
      setName('');
      setLocation('');
      setDescription('');
      setSectors([]);
      setSpecializedCenters([]);
      setActiveTab('overview');
    }
    setExpandedSectorId(null);
    setNewSectorName('');
    setNewCenterName('');
    setNewSpecName('');
    setEditingId(null);
  }, [directorate, isOpen]);

  if (!isOpen) return null;

  // Basic Info Save
  const handleSaveBasicInfo = (e) => {
    e.preventDefault();
    if (!name || !location) return;

    const data = {
      name,
      location,
      description,
      sectors,
      specializedCenters
    };

    if (isEditMode) {
      updateDirectorate(directorate.id, data);
    } else {
      addDirectorate(data);
    }
    onSave();
    onClose();
  };

  // Synchronize changes to parent storage immediately for dynamic tabs
  const syncWithStore = (updatedSectors, updatedSpecs) => {
    if (!isEditMode) return;
    const data = {
      name,
      location,
      description,
      sectors: updatedSectors,
      specializedCenters: updatedSpecs
    };
    updateDirectorate(directorate.id, data);
    onSave(); // Refresh dashboard data
  };

  // ═══════════════════════════════════════════
  // القطاعات والمراكز الصحية
  // ═══════════════════════════════════════════

  const handleAddSector = () => {
    if (!newSectorName.trim()) return;
    const maxId = Math.max(0, ...sectors.map(s => s.id));
    const updated = [
      ...sectors,
      {
        id: maxId + 1,
        name: newSectorName.trim(),
        healthCenters: []
      }
    ];
    setSectors(updated);
    setNewSectorName('');
    syncWithStore(updated, specializedCenters);
  };

  const handleDeleteSector = (sectorId) => {
    if (confirm('هل أنت متأكد من حذف هذا القطاع وجميع المراكز الصحية التابعة له؟')) {
      const updated = sectors.filter(s => s.id !== sectorId);
      setSectors(updated);
      syncWithStore(updated, specializedCenters);
    }
  };

  const handleAddHealthCenter = (sectorId) => {
    if (!newCenterName.trim()) return;
    const updated = sectors.map(s => {
      if (s.id === sectorId) {
        const maxId = Math.max(0, ...s.healthCenters.map(c => c.id));
        return {
          ...s,
          healthCenters: [
            ...s.healthCenters,
            {
              id: maxId + 1,
              name: newCenterName.trim(),
              status: 'pending',
              score: null
            }
          ]
        };
      }
      return s;
    });
    setSectors(updated);
    setNewCenterName('');
    syncWithStore(updated, specializedCenters);
  };

  const handleDeleteHealthCenter = (sectorId, centerId) => {
    if (confirm('هل أنت متأكد من حذف هذا المركز الصحي؟')) {
      const updated = sectors.map(s => {
        if (s.id === sectorId) {
          return {
            ...s,
            healthCenters: s.healthCenters.filter(c => c.id !== centerId)
          };
        }
        return s;
      });
      setSectors(updated);
      syncWithStore(updated, specializedCenters);
    }
  };

  // ═══════════════════════════════════════════
  // المراكز التخصصية
  // ═══════════════════════════════════════════

  const handleAddSpecialized = () => {
    if (!newSpecName.trim()) return;
    const maxId = Math.max(0, ...specializedCenters.map(c => c.id));
    const updated = [
      ...specializedCenters,
      {
        id: maxId + 1,
        name: newSpecName.trim(),
        status: 'pending',
        score: null
      }
    ];
    setSpecializedCenters(updated);
    setNewSpecName('');
    syncWithStore(sectors, updated);
  };

  const handleDeleteSpecialized = (centerId) => {
    if (confirm('هل أنت متأكد من حذف هذا المركز التخصصي؟')) {
      const updated = specializedCenters.filter(c => c.id !== centerId);
      setExpandedSpecUnitsId(null);
      setSpecializedCenters(updated);
      syncWithStore(sectors, updated);
    }
  };

  const handleToggleUnit = (specId, unitId) => {
    const updated = specializedCenters.map(sc => {
      if (sc.id === specId) {
        const currentUnits = sc.availableUnits || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        const newUnits = currentUnits.includes(unitId)
          ? currentUnits.filter(u => u !== unitId)
          : [...currentUnits, unitId];
        return {
          ...sc,
          availableUnits: newUnits
        };
      }
      return sc;
    });
    setSpecializedCenters(updated);
    syncWithStore(sectors, updated);
  };

  const specializedUnitsList = [
    { id: 1, name: 'وحدة الفحص والتشخيص' },
    { id: 2, name: 'وحدة معالجة الاسنان' },
    { id: 3, name: 'وحدة حشوات الجذور' },
    { id: 4, name: 'وحدة امراض اللثة' },
    { id: 5, name: 'وحدة جراحة الفم والاسنان' },
    { id: 6, name: 'وحدة الاسنان الوقائي والاطفال' },
    { id: 7, name: 'وحدة الاشعة' },
    { id: 8, name: 'وحدة صناعة الاسنان ومختبر صناعة الاسنان' },
    { id: 9, name: 'وحدة تقويم الاسنان' },
    { id: 10, name: 'وحدة الليزر' },
    { id: 11, name: 'وحدة زراعة الاسنان' }
  ];

  // ═══════════════════════════════════════════
  // تعديل الأسماء
  // ═══════════════════════════════════════════

  const startEditing = (type, id, currentName, sectorId = null) => {
    setEditingId({ type, id, sectorId });
    setEditTempName(currentName);
  };

  const saveEditName = () => {
    if (!editTempName.trim() || !editingId) return;

    let updatedSectors = [...sectors];
    let updatedSpecs = [...specializedCenters];

    if (editingId.type === 'sector') {
      updatedSectors = sectors.map(s => 
        s.id === editingId.id ? { ...s, name: editTempName.trim() } : s
      );
      setSectors(updatedSectors);
    } else if (editingId.type === 'health') {
      updatedSectors = sectors.map(s => {
        if (s.id === editingId.sectorId) {
          return {
            ...s,
            healthCenters: s.healthCenters.map(c => 
              c.id === editingId.id ? { ...c, name: editTempName.trim() } : c
            )
          };
        }
        return s;
      });
      setSectors(updatedSectors);
    } else if (editingId.type === 'specialized') {
      updatedSpecs = specializedCenters.map(c => 
        c.id === editingId.id ? { ...c, name: editTempName.trim() } : c
      );
      setSpecializedCenters(updatedSpecs);
    }

    setEditingId(null);
    syncWithStore(updatedSectors, updatedSpecs);
  };

  // Stats calculation
  const stats = directorate ? getDirectorateStats(directorate.id) : null;
  const totalCenters = stats ? stats.totalHealthCenters + stats.totalSpecialized : 0;
  const totalEvaluated = stats ? stats.evaluatedHealth + stats.evaluatedSpecialized : 0;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isEditMode ? `تعديل وإدارة: ${name}` : 'إضافة دائرة صحة جديدة'} 
      size="medium"
    >
      {/* Tabs */}
      {isEditMode && (
        <div className="modal-tabs">
          <button
            className={`modal-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            نظرة عامة
          </button>
          <button
            className={`modal-tab ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            إحصائيات الدائرة
          </button>
          <button
            className={`modal-tab ${activeTab === 'sectors' ? 'active' : ''}`}
            onClick={() => setActiveTab('sectors')}
          >
            القطاعات ({sectors.length})
          </button>
          <button
            className={`modal-tab ${activeTab === 'specialized' ? 'active' : ''}`}
            onClick={() => setActiveTab('specialized')}
          >
            المراكز التخصصية ({specializedCenters.length})
          </button>
        </div>
      )}

      <div className="modal-body flex-1">
        {/* Tab 1: Overview Form */}
        {activeTab === 'overview' && (
          <form onSubmit={handleSaveBasicInfo} className="flex flex-col gap-md">
            <div className="form-group">
              <label className="form-label">اسم دائرة الصحة</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: دائرة صحة البصرة"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">المحافظة / الموقع الرئيسي</label>
              <input
                type="text"
                className="form-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="مثال: صلاح الدين - تكريت"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">معلومات ووصف الدائرة</label>
              <textarea
                className="form-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="تفاصيل إضافية عن الدائرة والتغطية الجغرافية..."
              />
            </div>

            {!isEditMode && (
              <div className="badge badge-orange py-sm w-full justify-center">
                ملاحظة: يمكنك إضافة القطاعات والمراكز بعد حفظ معلومات الدائرة.
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full mt-sm">
              {isEditMode ? 'حفظ معلومات الدائرة' : 'إنشاء الدائرة'}
            </button>
          </form>
        )}

        {/* Tab 2: Stats */}
        {activeTab === 'stats' && stats && (
          <div className="flex flex-col gap-lg">
            <div className="bento-grid">
              <div className="stat-card green">
                <div className="stat-card-header">
                  <div className="stat-card-icon">
                    <Stethoscope size={20} />
                  </div>
                </div>
                <div className="stat-card-value">{stats.avgHealthScore}%</div>
                <div className="stat-card-label">معدل تقييم المراكز الصحية</div>
              </div>

              <div className="stat-card purple">
                <div className="stat-card-header">
                  <div className="stat-card-icon">
                    <Building2 size={20} />
                  </div>
                </div>
                <div className="stat-card-value">{stats.avgSpecScore}%</div>
                <div className="stat-card-label">معدل تقييم المراكز التخصصية</div>
              </div>
            </div>

            <div className="p-md bg-card rounded-lg flex flex-col gap-md">
              <span className="text-secondary text-sm">مؤشر التقدم في التقييم الميداني</span>
              <ProgressBar
                value={stats.evaluatedHealth}
                max={stats.totalHealthCenters || 1}
                color="green"
                label="المراكز الصحية المقيّمة"
              />
              <ProgressBar
                value={stats.evaluatedSpecialized}
                max={stats.totalSpecialized || 1}
                color="purple"
                label="المراكز التخصصية المقيّمة"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Sectors Management */}
        {activeTab === 'sectors' && (
          <div className="flex flex-col gap-lg">
            {/* Add Sector Form */}
            <div className="flex gap-sm items-center p-sm bg-card rounded-md">
              <input
                type="text"
                className="form-input flex-1 py-xs"
                placeholder="اسم القطاع الجديد..."
                value={newSectorName}
                onChange={(e) => setNewSectorName(e.target.value)}
              />
              <button className="btn btn-primary btn-sm" onClick={handleAddSector}>
                <Plus size={16} /> إضافة قطاع
              </button>
            </div>

            {/* Sectors List */}
            <div className="flex flex-col gap-sm">
              {sectors.map((sec) => {
                const isExpanded = expandedSectorId === sec.id;
                const isEditing = editingId?.type === 'sector' && editingId?.id === sec.id;

                return (
                  <div key={sec.id} className="border border-color rounded-md overflow-hidden bg-card/20">
                    {/* Sector Header */}
                    <div className="flex items-center justify-between p-md border-b border-color/40 bg-card/40">
                      <div className="flex items-center gap-md flex-1">
                        <button
                          className="text-secondary"
                          onClick={() => setExpandedSectorId(isExpanded ? null : sec.id)}
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {isEditing ? (
                          <div className="flex items-center gap-xs">
                            <input
                              type="text"
                              className="form-input py-xxs px-sm text-sm"
                              value={editTempName}
                              onChange={(e) => setEditTempName(e.target.value)}
                            />
                            <button className="text-green-400 p-xs" onClick={saveEditName}>
                              <Check size={16} />
                            </button>
                          </div>
                        ) : (
                          <span className="font-bold text-sm text-primary">{sec.name}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-sm">
                        <span className="badge badge-blue text-xxs">
                          {sec.healthCenters.length} مراكز
                        </span>
                        {!isEditing && (
                          <button
                            className="text-secondary hover:text-white"
                            onClick={() => startEditing('sector', sec.id, sec.name)}
                          >
                            <Edit2 size={14} />
                          </button>
                        )}
                        <button
                          className="text-red-400 hover:text-red-500"
                          onClick={() => handleDeleteSector(sec.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Sector Centers Content */}
                    {isExpanded && (
                      <div className="p-md bg-secondary/20 flex flex-col gap-sm">
                        {/* Add Center */}
                        <div className="flex gap-sm items-center mb-sm">
                          <input
                            type="text"
                            className="form-input flex-1 py-xs text-xs"
                            placeholder="اسم المركز الصحي الجديد..."
                            value={newCenterName}
                            onChange={(e) => setNewCenterName(e.target.value)}
                          />
                          <button
                            className="btn btn-secondary btn-sm py-xs"
                            onClick={() => handleAddHealthCenter(sec.id)}
                          >
                            <Plus size={14} /> إضافة مركز صحي
                          </button>
                        </div>

                        {/* Centers List */}
                        {sec.healthCenters.length === 0 ? (
                          <p className="text-secondary text-xs text-center py-sm">
                            لا توجد مراكز صحية في هذا القطاع.
                          </p>
                        ) : (
                          sec.healthCenters.map((hc) => {
                            const isHCEditing = editingId?.type === 'health' && editingId?.id === hc.id && editingId?.sectorId === sec.id;
                            return (
                              <div key={hc.id} className="list-item py-xs">
                                <div className={`list-item-dot ${hc.status === 'evaluated' ? 'green' : hc.status === 'in-progress' ? 'orange' : 'blue'}`} />
                                <div className="flex-1">
                                  {isHCEditing ? (
                                    <div className="flex items-center gap-xs">
                                      <input
                                        type="text"
                                        className="form-input py-xxs px-sm text-xs"
                                        value={editTempName}
                                        onChange={(e) => setEditTempName(e.target.value)}
                                      />
                                      <button className="text-green-400 p-xs" onClick={saveEditName}>
                                        <Check size={14} />
                                      </button>
                                    </div>
                                  ) : (
                                    <span className="text-xs text-primary">{hc.name}</span>
                                  )}
                                </div>
                                <div className="flex items-center gap-sm">
                                  {hc.status === 'evaluated' && (
                                    <span className="badge badge-green text-xxs font-bold">{hc.score}%</span>
                                  )}
                                  {!isHCEditing && (
                                    <button
                                      className="text-secondary hover:text-white"
                                      onClick={() => startEditing('health', hc.id, hc.name, sec.id)}
                                    >
                                      <Edit2 size={12} />
                                    </button>
                                  )}
                                  <button
                                    className="text-red-400 hover:text-red-500"
                                    onClick={() => handleDeleteHealthCenter(sec.id, hc.id)}
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Specialized Centers Management */}
        {activeTab === 'specialized' && (
          <div className="flex flex-col gap-lg">
            {/* Add Specialized Center */}
            <div className="flex gap-sm items-center p-sm bg-card rounded-md">
              <input
                type="text"
                className="form-input flex-1 py-xs"
                placeholder="اسم المركز التخصصي الجديد..."
                value={newSpecName}
                onChange={(e) => setNewSpecName(e.target.value)}
              />
              <button className="btn btn-primary btn-sm" onClick={handleAddSpecialized}>
                <Plus size={16} /> إضافة مركز
              </button>
            </div>

            {/* Specialized Centers List */}
            <div className="flex flex-col gap-xs">
              {specializedCenters.length === 0 ? (
                <div className="empty-state py-lg">
                  <p className="empty-state-title text-sm">لا توجد مراكز تخصصية</p>
                  <p className="empty-state-desc text-xs">أضف مركزاً تخصصياً يتبع الدائرة مباشرة.</p>
                </div>
              ) : (
                specializedCenters.map((sc) => {
                  const isSCEditing = editingId?.type === 'specialized' && editingId?.id === sc.id;
                  const availableUnits = sc.availableUnits || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
                  const isUnitsExpanded = expandedSpecUnitsId === sc.id;

                  return (
                    <div key={sc.id} className="flex flex-col gap-xs p-sm bg-card rounded-md border border-color/40">
                      <div className="flex items-center justify-between">
                        <div className={`list-item-dot ${sc.status === 'evaluated' ? 'green' : 'blue'}`} />
                        <div className="flex-grow flex-1 px-sm">
                          {isSCEditing ? (
                            <div className="flex items-center gap-xs">
                              <input
                                type="text"
                                className="form-input py-xxs px-sm text-xs"
                                value={editTempName}
                                onChange={(e) => setEditTempName(e.target.value)}
                              />
                              <button className="text-green-400 p-xs" onClick={saveEditName}>
                                <Check size={14} />
                              </button>
                            </div>
                          ) : (
                            <div>
                              <span className="text-sm font-bold text-primary block">{sc.name}</span>
                              <button
                                className="btn btn-secondary text-xxs px-xs py-xxs mt-xs flex items-center gap-xs"
                                onClick={() => setExpandedSpecUnitsId(isUnitsExpanded ? null : sc.id)}
                                style={{ height: 'auto', border: '1px solid var(--border-color)' }}
                              >
                                <Compass size={10} /> الوحدات المتوفرة ({availableUnits.length}/11)
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-sm">
                          {sc.status === 'evaluated' && (
                            <span className="badge badge-purple text-xxs font-bold">{sc.score}%</span>
                          )}
                          {!isSCEditing && (
                            <button
                              className="text-secondary hover:text-white"
                              onClick={() => startEditing('specialized', sc.id, sc.name)}
                            >
                              <Edit2 size={12} />
                            </button>
                          )}
                          <button
                            className="text-red-400 hover:text-red-500"
                            onClick={() => handleDeleteSpecialized(sc.id)}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>

                      {isUnitsExpanded && (
                        <div className="grid cols-2 gap-sm p-sm mt-xs bg-secondary/20 rounded border border-color/40">
                          <span className="text-secondary text-xxs col-span-2 font-bold mb-xs block">تحديد الأقسام والوحدات المتوفرة في هذا المركز التخصصي:</span>
                          {specializedUnitsList.map(unit => {
                            const isChecked = availableUnits.includes(unit.id);
                            return (
                              <label key={unit.id} className="flex items-center gap-xs text-xxs cursor-pointer text-secondary hover:text-primary p-xs bg-card/40 rounded">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleToggleUnit(sc.id, unit.id)}
                                  className="form-checkbox"
                                  style={{ width: '12px', height: '12px' }}
                                />
                                <span className="text-xxs">{unit.name}</span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
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
