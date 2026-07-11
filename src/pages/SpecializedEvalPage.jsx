import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getDirectorates, 
  submitSpecializedCenterEvaluation,
  getCurrentUser,
  logoutUser,
  updateUser,
  getDirectorateStats
} from '../data/store';
import ProgressBar from '../components/ui/ProgressBar';
import { 
  Building2, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Award, 
  ClipboardCheck, 
  MapPin, 
  User, 
  LogOut, 
  Shield, 
  Calendar,
  Key,
  BarChart3,
  Compass,
  FileSpreadsheet
} from 'lucide-react';

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

const getSelectedColorStyle = (score) => {
  if (score === 0) {
    return {
      btn: { borderColor: '#ef4444', color: '#b91c1c', backgroundColor: '#fef2f2', fontWeight: 'bold' },
      circle: { borderColor: '#ef4444', backgroundColor: '#ef4444', color: '#ffffff' }
    };
  }
  if (score === 10 || score === 20) {
    return {
      btn: { borderColor: '#3b82f6', color: '#1d4ed8', backgroundColor: '#eff6ff', fontWeight: 'bold' },
      circle: { borderColor: '#3b82f6', backgroundColor: '#3b82f6', color: '#ffffff' }
    };
  }
  if (score === 30 || score === 40) {
    return {
      btn: { borderColor: '#22c55e', color: '#15803d', backgroundColor: '#f0fdf4', fontWeight: 'bold' },
      circle: { borderColor: '#22c55e', backgroundColor: '#22c55e', color: '#ffffff' }
    };
  }
  return { btn: {}, circle: {} };
};

export default function SpecializedEvalPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [activePortalTab, setActivePortalTab] = useState('eval'); // 'eval', 'stats', 'profile'

  // Selection state
  const [directorateId, setDirectorateId] = useState('');
  const [centerId, setCenterId] = useState('');
  const [isEvaluationStarted, setIsEvaluationStarted] = useState(false);

  // Wizard state
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // goes up to availableUnits.length
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [stage1ScoreSaved, setStage1ScoreSaved] = useState(0);
  const [stage2ScoreSaved, setStage2ScoreSaved] = useState(0);

  // Profile tab state
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Authentication check
  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== 'evaluator' || user.specialization !== 'specialized') {
      navigate('/');
    } else {
      setCurrentUser(user);
    }
  }, [navigate]);

  if (!currentUser) return null;

  const userDirIds = currentUser.directorateIds || (currentUser.directorateId ? [currentUser.directorateId] : []);
  const directorates = getDirectorates().filter(d => 
    userDirIds.includes(d.id)
  );

  const selectedDir = directorates.find(d => d.id === parseInt(directorateId));
  const specializedCenters = selectedDir ? selectedDir.specializedCenters : [];
  const selectedCenter = specializedCenters.find(c => c.id === parseInt(centerId));

  const availableUnits = selectedCenter?.availableUnits || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const activeUnits = specializedUnitsList.filter(u => availableUnits.includes(u.id));
  const totalSteps = activeUnits.length + 1; // available units + central infection control

  const handleStart = () => {
    if (!directorateId || !centerId) return;
    setIsEvaluationStarted(true);
    setCurrentStepIndex(0);
    const currentCenter = specializedCenters.find(c => c.id === parseInt(centerId));
    setAnswers(currentCenter?.answers || {});
    setIsSubmitted(false);
  };

  const handleAnswerSelect = (questionId, score) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  const handleTextChange = (field, val) => {
    setAnswers(prev => ({
      ...prev,
      [field]: val
    }));
  };

  // Check step completion
  const isStepComplete = () => {
    if (currentStepIndex < activeUnits.length) {
      // It is a unit evaluation step (requires Stats, Records, Staff & Equipment rating)
      const u = activeUnits[currentStepIndex];
      return (
        answers[`u_${u.id}_stats_score`] !== undefined &&
        answers[`u_${u.id}_equip_score`] !== undefined
      );
    } else {
      // Central infection control step
      return (
        answers.inf_waste_reg !== undefined &&
        answers.inf_injury_reg !== undefined &&
        answers.inf_vaccines !== undefined
      );
    }
  };

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    if (!isStepComplete()) {
      alert('يرجى اختيار درجات التقييم للحقول الحالية.');
      return;
    }

    // Calculations
    let maxStatsPoints = activeUnits.length * 30;
    let maxEquipPoints = (activeUnits.length * 30) + 100; // units equip + central infection control

    let achievedStatsPoints = 0;
    let achievedEquipPoints = 0;

    activeUnits.forEach(u => {
      achievedStatsPoints += (answers[`u_${u.id}_stats_score`] || 0);
      achievedEquipPoints += (answers[`u_${u.id}_equip_score`] || 0);
    });

    // Central infection control
    achievedEquipPoints += (answers.inf_waste_reg || 0);
    achievedEquipPoints += (answers.inf_injury_reg || 0);
    achievedEquipPoints += (answers.inf_vaccines || 0);

    const statsPercentage = Math.round((achievedStatsPoints / maxStatsPoints) * 100);
    const equipPercentage = Math.round((achievedEquipPoints / maxEquipPoints) * 100);
    
    // Final score is 50% stage 1 + 50% stage 2
    const calculatedPercentage = Math.round((statsPercentage * 0.5) + (equipPercentage * 0.5));

    // Save to store
    submitSpecializedCenterEvaluation(
      parseInt(directorateId),
      parseInt(centerId),
      calculatedPercentage,
      answers,
      statsPercentage,
      equipPercentage
    );

    // Update user completed stats
    updateUser(currentUser.id, {
      evaluationsCompleted: currentUser.evaluationsCompleted + 1
    });

    // Reload current user state
    setCurrentUser(getCurrentUser());

    setStage1ScoreSaved(statsPercentage);
    setStage2ScoreSaved(equipPercentage);
    setFinalScore(calculatedPercentage);
    setIsSubmitted(true);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!passwordInput) return;
    updateUser(currentUser.id, { password: passwordInput });
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setPasswordInput('');
    }, 1500);
  };

  return (
    <div className="app-layout">
      {/* Top Header */}
      <header className="page-header" style={{ padding: 'var(--space-md) var(--space-lg)', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)', position: 'sticky', top: 0, zIndex: 10 }}>
        {/* Right side: App Branding */}
        <div className="flex items-center gap-md">
          <div className="user-avatar purple" style={{ width: 36, height: 36 }}>
            <Building2 size={18} />
          </div>
          <div>
            <h1 className="page-title" style={{ fontSize: 'var(--text-md)' }}>منصة التقييم الصحي</h1>
          </div>
        </div>

        {/* Left side: Page details next to logout button */}
        <div className="flex items-center gap-md">
          <div style={{ textAlign: 'left' }}>
            <p className="page-subtitle" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0 }}>{currentUser.fullName}</p>
          </div>
          <button className="back-btn" onClick={handleLogout} title="تسجيل الخروج">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="app-content page-container">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: EVALUATION */}
          {activePortalTab === 'eval' && (
            <motion.div
              key="eval-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              {!isEvaluationStarted ? (
                <div className="flex flex-col gap-lg">
                  <div className="empty-state py-md">
                    <div className="empty-state-icon purple">
                      <Building2 size={32} />
                    </div>
                    <h2 className="empty-state-title">تقييم تخصصي جديد</h2>
                    <p className="empty-state-desc">تعديل وتقييم المراكز التخصصية لطب الأسنان بناءً على الأقسام والوحدات المتوفرة محلياً بالمركز.</p>
                  </div>

                  <div className="p-md bg-card rounded-lg border border-color flex flex-col gap-md">
                    <div className="form-group mb-xs">
                      <label className="form-label flex items-center gap-sm"><MapPin size={16} /> دائرة الصحة</label>
                      <select
                        className="form-select"
                        value={directorateId}
                        onChange={(e) => {
                          setDirectorateId(e.target.value);
                          setCenterId('');
                        }}
                      >
                        <option value="">اختر دائرة الصحة...</option>
                        {directorates.map((dir) => (
                          <option key={dir.id} value={dir.id}>{dir.name}</option>
                        ))}
                      </select>
                    </div>

                    {directorateId && (
                      <div className="form-group mb-xs">
                        <label className="form-label flex items-center gap-sm"><Building2 size={16} /> المركز التخصصي للأسنان</label>
                        <select
                          className="form-select"
                          value={centerId}
                          onChange={(e) => setCenterId(e.target.value)}
                        >
                          <option value="">اختر المركز التخصصي...</option>
                           {specializedCenters
                            .filter(sc => currentUser.assignedCenterIds && currentUser.assignedCenterIds.length > 0 
                              ? currentUser.assignedCenterIds.includes(sc.id) 
                              : true)
                            .map((sc) => (
                              <option key={sc.id} value={sc.id}>
                                {sc.name} {sc.status === 'evaluated' ? `(تم تقييمه: ${sc.score}%)` : '(لم يقيّم)'}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}

                    <button
                      className="btn btn-purple btn-full mt-sm"
                      disabled={!centerId}
                      onClick={handleStart}
                    >
                      بدء عملية التقييم
                    </button>
                  </div>
                </div>
              ) : !isSubmitted ? (
                <div className="flex flex-col gap-lg">
                  {/* Progress Summary */}
                  <div className="p-md bg-card rounded-lg border border-color flex flex-col gap-sm">
                    <div className="flex justify-between text-xs text-secondary">
                      <span>المركز: <strong className="text-primary">{selectedCenter?.name}</strong></span>
                      <span>الخطوة: {currentStepIndex + 1} من {totalSteps}</span>
                    </div>
                    <ProgressBar value={currentStepIndex} max={totalSteps - 1} color="purple" />
                  </div>

                  {/* STEP 0 to N-1: Unit Specific Form */}
                  {currentStepIndex < activeUnits.length && (
                    <div className="flex flex-col gap-sm">
                      <div className="p-sm bg-card rounded-lg border border-color flex items-center justify-between shadow-sm" style={{ borderRight: '4px solid #a855f7', background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(168, 85, 247, 0.05) 100%)' }}>
                        <h2 className="text-sm font-bold text-primary flex items-center gap-xs m-0">
                          <Compass size={16} className="text-accent-purple" /> {activeUnits[currentStepIndex].name}
                        </h2>
                        <span className="badge badge-purple text-xxs font-bold">تقييم الأقسام</span>
                      </div>

                      {/* Responsive Grid side-by-side on desktop to reduce scrolling */}
                      <div className="grid cols-1 lg:cols-2 gap-sm" style={{ alignItems: 'start' }}>
                        
                        {/* Staff, Stats, and Records (Max 30) */}
                        <div className="p-sm bg-card rounded-lg border border-color flex flex-col gap-sm">
                          <div className="border-b border-color pb-xs">
                            <h3 className="text-xs font-bold text-primary flex items-center gap-xs m-0">
                              المرحلة الأولى: الملاك والإحصائيات والسجلات <span className="text-accent-purple text-xxs font-bold mr-xs">(30 نقطة)</span>
                            </h3>
                          </div>
                          <p className="text-secondary text-xxs mt-0" style={{ margin: 0 }}>تقييم سجل المراجعين اليومي، سجل صرف المواد، وسجل نشاطات الأطباء الاختصاص بالقسم:</p>
                          
                          <div className="flex flex-col gap-xs">
                            {[
                              { val: 0, label: 'غير نظامي ومعدوم السجلات بالكامل (0 نقطة)' },
                              { val: 10, label: 'سجلات متوفرة جزئياً أو غير مدامة (10 نقاط)' },
                              { val: 20, label: 'سجلات مكتملة ونظامية ومطابقة (20 نقطة)' },
                              { val: 30, label: 'سجلات نموذجية وإحصاءات دقيقة وملاك مرخص (30 نقطة)' }
                            ].map((opt) => {
                              const isSelected = answers[`u_${activeUnits[currentStepIndex].id}_stats_score`] === opt.val;
                              const currentStyle = isSelected ? getSelectedColorStyle(opt.val) : {};
                              return (
                                <button
                                  key={opt.val}
                                  className="btn justify-between text-right btn-sm border py-xs px-sm"
                                  style={isSelected ? currentStyle.btn : { borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                                  onClick={() => handleAnswerSelect(`u_${activeUnits[currentStepIndex].id}_stats_score`, opt.val)}
                                >
                                  <span className="text-xs">{opt.label}</span>
                                  <div className="w-3.5 h-3.5 rounded-full border flex items-center justify-center" style={isSelected ? currentStyle.circle : { borderColor: 'var(--border-color)' }}>
                                    {isSelected && <Check size={8} />}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Equipment, Supplies and Infection Control (Max 30) */}
                        <div className="p-sm bg-card rounded-lg border border-color flex flex-col gap-sm">
                          <div className="border-b border-color pb-xs">
                            <h3 className="text-xs font-bold text-primary flex items-center gap-xs m-0">
                              المرحلة الثانية: الأجهزة والمستلزمات ومكافحة العدوى بالقسم <span className="text-accent-purple text-xxs font-bold mr-xs">(30 نقطة)</span>
                            </h3>
                          </div>
                          <p className="text-secondary text-xxs mt-0" style={{ margin: 0 }}>تقييم كفاءة عمل كراسي الأسنان، أجهزة التعقيم، مستلزمات مكافحة العدوى بالقسم:</p>
                          
                          <div className="flex flex-col gap-xs">
                            {[
                              { val: 0, label: 'أجهزة عاطلة ومستلزمات معدومة والتعقيم ضعيف (0 نقطة)' },
                              { val: 10, label: 'أجهزة تعمل جزئياً ومستلزمات متقطعة (10 نقاط)' },
                              { val: 20, label: 'أجهزة صالحة ومستلزمات متوفرة والتزام بالوقاية (20 نقطة)' },
                              { val: 30, label: 'أجهزة ممتازة وصيانة دورية وأدوات معقمة بالكامل (30 نقطة)' }
                            ].map((opt) => {
                              const isSelected = answers[`u_${activeUnits[currentStepIndex].id}_equip_score`] === opt.val;
                              const currentStyle = isSelected ? getSelectedColorStyle(opt.val) : {};
                              return (
                                <button
                                  key={opt.val}
                                  className="btn justify-between text-right btn-sm border py-xs px-sm"
                                  style={isSelected ? currentStyle.btn : { borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                                  onClick={() => handleAnswerSelect(`u_${activeUnits[currentStepIndex].id}_equip_score`, opt.val)}
                                >
                                  <span className="text-xs">{opt.label}</span>
                                  <div className="w-3.5 h-3.5 rounded-full border flex items-center justify-center" style={isSelected ? currentStyle.circle : { borderColor: 'var(--border-color)' }}>
                                    {isSelected && <Check size={8} />}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  )}

                  {/* LAST STEP: Central Infection Control Form */}
                  {currentStepIndex === activeUnits.length && (
                    <div className="flex flex-col gap-md">
                      <div className="p-sm bg-card rounded-lg border border-color flex items-center justify-between shadow-sm" style={{ borderRight: '4px solid #a855f7', background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(168, 85, 247, 0.05) 100%)' }}>
                        <h2 className="text-sm font-bold text-primary flex items-center gap-xs m-0">
                          <FileSpreadsheet size={16} className="text-accent-purple" /> وحدة مكافحة العدوى المركزية
                        </h2>
                        <span className="badge badge-purple text-xxs font-bold">100 نقطة</span>
                      </div>

                      {/* Waste Disposal (Max 30) */}
                      <div className="p-sm bg-card rounded-lg border border-color flex flex-col gap-xs">
                        <span className="text-xs font-bold text-primary block">سجل النفايات الطبية وعزلها (30 نقطة)</span>
                        <div className="flex gap-xs mt-xxs">
                          {[
                            { val: 0, label: 'غير مدام (0)' },
                            { val: 30, label: 'مدام ونظامي (30)' }
                          ].map((opt) => {
                            const isSelected = answers.inf_waste_reg === opt.val;
                            const currentStyle = isSelected ? getSelectedColorStyle(opt.val) : {};
                            return (
                              <button
                                key={opt.val}
                                className="btn flex-1 py-xs border"
                                style={isSelected ? currentStyle.btn : { borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                                onClick={() => handleAnswerSelect('inf_waste_reg', opt.val)}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Sharp injuries registry (Max 30) */}
                      <div className="p-sm bg-card rounded-lg border border-color flex flex-col gap-xs">
                        <span className="text-xs font-bold text-primary block">سجل الوخز وإجراءات حماية الكوادر (30 نقطة)</span>
                        <div className="flex gap-xs mt-xxs">
                          {[
                            { val: 0, label: 'غير مدام (0)' },
                            { val: 30, label: 'مدام ونظامي (30)' }
                          ].map((opt) => {
                            const isSelected = answers.inf_injury_reg === opt.val;
                            const currentStyle = isSelected ? getSelectedColorStyle(opt.val) : {};
                            return (
                              <button
                                key={opt.val}
                                className="btn flex-1 py-xs border"
                                style={isSelected ? currentStyle.btn : { borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                                onClick={() => handleAnswerSelect('inf_injury_reg', opt.val)}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Vaccine status (Max 40) */}
                      <div className="p-sm bg-card rounded-lg border border-color flex flex-col gap-xs">
                        <span className="text-xs font-bold text-primary block">الموقف التلقيحي للأطباء والكوادر في المركز (40 نقطة)</span>
                        <div className="flex flex-col gap-xs mt-xxs">
                          {[
                            { val: 0, label: 'نسبة التلقيح أقل من 50% بالمركز (0 نقطة)' },
                            { val: 20, label: 'نسبة التلقيح أكثر من 50% بالمركز (20 نقطة)' },
                            { val: 40, label: 'جميع الأطباء والكوادر ملقحين بالكامل (40 نقطة)' }
                          ].map((opt) => {
                            const isSelected = answers.inf_vaccines === opt.val;
                            return (
                              <button
                                key={opt.val}
                                className="btn justify-between text-right btn-sm border py-sm"
                                style={isSelected ? { backgroundColor: '#faf5ff', borderColor: '#a855f7', color: '#6b21a8', fontWeight: 'bold' } : { borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                                onClick={() => handleAnswerSelect('inf_vaccines', opt.val)}
                              >
                                <span className="text-xs">{opt.label}</span>
                                <div className="w-4 h-4 rounded-full border flex items-center justify-center" style={isSelected ? { backgroundColor: '#a855f7', borderColor: '#a855f7', color: '#fff' } : { borderColor: 'var(--border-color)' }}>
                                  {isSelected && <Check size={10} />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Footer controls */}
                  <div className="flex justify-between items-center gap-md mt-sm bg-secondary/20 p-sm rounded-lg border border-color">
                    <button
                      className="btn btn-secondary flex-1 py-xs"
                      onClick={handlePrev}
                      disabled={currentStepIndex === 0}
                    >
                      <ChevronRight size={16} /> السابق
                    </button>

                    {currentStepIndex === totalSteps - 1 ? (
                      <button
                        className="btn btn-purple flex-1 py-xs"
                        onClick={handleSubmit}
                        disabled={!isStepComplete()}
                      >
                        تقديم التقييم التخصصي <ClipboardCheck size={16} />
                      </button>
                    ) : (
                      <button
                        className="btn btn-purple flex-1 py-xs"
                        onClick={handleNext}
                        disabled={!isStepComplete()}
                      >
                        التالي <ChevronLeft size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="empty-state py-lg flex flex-col gap-lg">
                  <div className="coming-soon-icon purple mx-auto">
                    <Award size={44} />
                  </div>

                  <div>
                    <h1 className="empty-state-title text-xl">تم تقديم التقييم التخصصي!</h1>
                    <p className="empty-state-desc mt-sm">
                      تم حفظ التقييم لمركز <strong>{selectedCenter?.name}</strong> بنجاح بناءً على الوحدات المتوفرة بالمركز.
                    </p>
                  </div>

                  <div className="p-md bg-card rounded-2xl border border-color flex flex-col items-center justify-center max-w-sm w-full mx-auto gap-sm">
                    <span className="text-secondary text-xxs block">الدرجة النهائية الكلية</span>
                    <span className="text-5xl font-black text-primary">{finalScore}%</span>
                    
                    <div className="flex flex-col gap-xs w-full border-t border-color/40 pt-sm mt-xs">
                      <div className="flex justify-between text-xxs text-secondary">
                        <span>نسبة الملاك والإحصائيات والسجلات:</span>
                        <strong className="text-primary">{stage1ScoreSaved}%</strong>
                      </div>
                      <div className="flex justify-between text-xxs text-secondary">
                        <span>نسبة الأجهزة ومستلزمات الوقاية:</span>
                        <strong className="text-primary">{stage2ScoreSaved}%</strong>
                      </div>
                    </div>

                    <span className={`badge mt-xs py-xs px-xl font-bold text-xs ${
                      finalScore >= 85 ? 'badge-green' : finalScore >= 70 ? 'badge-blue' : finalScore >= 50 ? 'badge-orange' : 'badge-red'
                    }`}>
                      {finalScore >= 85 ? 'ممتاز' : finalScore >= 70 ? 'جيد' : finalScore >= 50 ? 'مقبول' : 'ضعيف'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-sm w-full max-w-xs mx-auto">
                    <button
                      className="btn btn-purple"
                      onClick={() => setIsEvaluationStarted(false)}
                    >
                      تقييم مركز تخصصي آخر
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: SPECIALIZED STATISTICS */}
          {activePortalTab === 'stats' && (
            <motion.div
              key="stats-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-md"
            >
              {directorates.map((dir) => {
                return (
                  <div key={dir.id} className="flex flex-col gap-sm">
                    <div className="flex items-center gap-sm px-xs mt-sm mb-xs">
                      <MapPin size={16} className="text-accent-purple" />
                      <h2 className="text-base font-extrabold text-primary">{dir.name}</h2>
                    </div>

                    {dir.specializedCenters.length === 0 ? (
                      <p className="text-secondary text-xs text-center py-md bg-card rounded-lg border border-color">
                        لا توجد مراكز تخصصية تابعة لهذه الدائرة.
                      </p>
                    ) : (
                      <div className="flex flex-col gap-xs">
                        {dir.specializedCenters
                          .filter(sc => currentUser.assignedCenterIds && currentUser.assignedCenterIds.length > 0 
                            ? currentUser.assignedCenterIds.includes(sc.id) 
                            : true)
                          .map((sc) => (
                            <div 
                              key={sc.id} 
                              className="list-item cursor-pointer hover:bg-card-hover transition-all"
                              onClick={() => {
                                setDirectorateId(dir.id.toString());
                                setCenterId(sc.id.toString());
                                setIsEvaluationStarted(true);
                                setCurrentStepIndex(0);
                                setAnswers(sc.answers || {});
                                setIsSubmitted(false);
                                setActivePortalTab('eval');
                              }}
                            >
                              <div className={`list-item-dot ${sc.status === 'evaluated' ? 'green' : 'blue'}`} />
                              <span className="text-xs text-primary font-bold flex-1">{sc.name}</span>
                              <div>
                                {sc.status === 'evaluated' ? (
                                  <div className="flex items-center gap-xs">
                                    {sc.stage1Score !== undefined && (
                                      <span className="text-xxs text-secondary">({sc.stage1Score}% / {sc.stage2Score}%)</span>
                                    )}
                                    <span className="badge badge-purple text-xxs font-bold">{sc.score}%</span>
                                  </div>
                                ) : (
                                  <span className="badge badge-blue text-xxs">قيد الانتظار</span>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* TAB 3: PROFILE */}
          {activePortalTab === 'profile' && (
            <motion.div
              key="profile-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-lg"
            >
              <div className="flex items-center gap-md p-md bg-card rounded-lg border border-color">
                <div className="user-avatar blue font-bold text-lg">
                  {currentUser.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="user-name text-lg">{currentUser.fullName}</h3>
                  <span className="badge badge-blue mt-sm">مقيّم مراكز تخصصية معتمد</span>
                </div>
              </div>

              <div className="flex flex-col gap-md bg-card rounded-lg border border-color p-md">
                <div className="flex justify-between items-center p-sm border-b">
                  <span className="text-secondary flex items-center gap-sm">
                     اسم المستخدم
                  </span>
                  <span className="text-primary font-bold">{currentUser.username}</span>
                </div>

                <div className="flex justify-between items-center p-sm border-b">
                  <span className="text-secondary flex items-center gap-sm">
                     صلاحية التقييم
                  </span>
                  <span className="text-primary font-bold">تقييم عيادات الأسنان التخصصية والمستشفيات</span>
                </div>

                <div className="flex justify-between items-center p-sm border-b">
                  <span className="text-secondary flex items-center gap-sm">
                     الدوائر المخولة
                  </span>
                  <span className="text-primary font-bold text-xs" style={{ maxWidth: '60%', textAlign: 'left' }}>
                    {directorates.map(d => d.name.replace('دائرة صحة ', '')).join('، ')}
                  </span>
                </div>

                <div className="flex justify-between items-center p-sm border-b">
                  <span className="text-secondary flex items-center gap-sm">
                     تاريخ التسجيل
                  </span>
                  <span className="text-primary font-bold">{currentUser.createdAt}</span>
                </div>
              </div>

              {/* Password update */}
              <form onSubmit={handleResetPassword} className="p-md bg-card rounded-lg border border-color flex flex-col gap-sm">
                <h4 className="text-primary font-bold mb-xs flex items-center gap-sm">
                  <Key size={18} /> تغيير كلمة المرور الخاصة بك
                </h4>
                
                {passwordSuccess && (
                  <div className="badge badge-green py-xs justify-center mb-sm">
                    تم تغيير كلمة المرور بنجاح!
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

                <button type="submit" className="btn btn-primary btn-sm align-self-start mt-sm">
                  حفظ كلمة المرور الجديدة
                </button>
              </form>

              <button className="btn btn-danger w-full py-md" onClick={handleLogout}>
                <LogOut size={16} /> تسجيل الخروج من البوابة
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Bottom Nav Bar */}
      <div className="bottom-nav">
        <button
          className={`bottom-nav-item ${activePortalTab === 'eval' ? 'active' : ''}`}
          onClick={() => {
            setActivePortalTab('eval');
            setIsEvaluationStarted(false);
          }}
        >
          <ClipboardCheck className="bottom-nav-item-icon" />
          <span className="bottom-nav-item-label">التقييم</span>
        </button>

        <button
          className={`bottom-nav-item ${activePortalTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActivePortalTab('stats')}
        >
          <BarChart3 className="bottom-nav-item-icon" />
          <span className="bottom-nav-item-label">الإحصائيات</span>
        </button>

        <button
          className={`bottom-nav-item ${activePortalTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActivePortalTab('profile')}
        >
          <User className="bottom-nav-item-icon" />
          <span className="bottom-nav-item-label">الحساب</span>
        </button>
      </div>
    </div>
  );
}
