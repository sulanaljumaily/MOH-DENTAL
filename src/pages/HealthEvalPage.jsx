import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getDirectorates, 
  submitHealthCenterEvaluation,
  getCurrentUser,
  logoutUser,
  updateUser,
  getDirectorateStats
} from '../data/store';
import ProgressBar from '../components/ui/ProgressBar';
import { 
  Stethoscope, 
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
  FolderOpen,
  ChevronDown,
  ChevronUp,
  BarChart3,
  TrendingUp
} from 'lucide-react';

const questionGroups = [
  {
    id: 1,
    title: 'أجهزة ومواد الأسنان (المؤشرات)',
    questions: [
      { id: 'q_chair', text: 'هل كرسي الأسنان والملحقات الطبية تعمل بشكل صحيح؟', options: [
        { score: 0, label: 'عاطل' },
        { score: 1, label: 'صالح مع وجود أعطال بسيطة' },
        { score: 2, label: 'صالح بالكامل' }
      ]},
      { id: 'q_xray', text: 'هل يتوفر جهاز الأشعة مع حاجز رصاصي؟', options: [
        { score: 0, label: 'غير موجود' },
        { score: 1, label: 'موجود بدون حاجز رصاصي' },
        { score: 2, label: 'موجود مع حاجز رصاصي' }
      ]},
      { id: 'q_materials', text: 'هل تتوفر مواد الأسنان الأساسية بالقسم؟', options: [
        { score: 0, label: 'غير متوفرة' },
        { score: 2, label: 'متوفرة بالكامل' }
      ]},
      { id: 'q_fridge', text: 'هل تتوفر ثلاجة حفظ المواد وتستخدم بشكل صحيح؟', options: [
        { score: 0, label: 'غير موجودة' },
        { score: 1, label: 'موجودة ولا تستخدم لحفظ مواد الاسنان' },
        { score: 2, label: 'موجودة وتستخدم لحفظ مواد الاسنان' }
      ]}
    ]
  },
  {
    id: 2,
    title: 'السجلات الطبية والإحالات (المؤشرات)',
    questions: [
      { id: 'q_daily_reg', text: 'سجل المراجعين اليومي', options: [
        { score: 0, label: 'غير نظامي وغير مدام' },
        { score: 1, label: 'نظامي وغير مدام' },
        { score: 2, label: 'نظامي ومدام' }
      ]},
      { id: 'q_spend_reg', text: 'سجل صرف المواد', options: [
        { score: 0, label: 'غير نظامي وغير مدام' },
        { score: 1, label: 'نظامي وغير مدام' },
        { score: 2, label: 'نظامي ومدام' }
      ]},
      { id: 'q_referrals', text: 'الإحالات الطبية للوحدة', options: [
        { score: 0, label: 'يوجد إحالات غير نظامية' },
        { score: 1, label: 'لا يوجد إحالات غير نظامية' },
        { score: 2, label: 'إحالات نظامية' }
      ]}
    ]
  },
  {
    id: 3,
    title: 'برنامج العناية المنظمة (المؤشرات)',
    questions: [
      { id: 'q_ocp_reg', text: 'سجل برنامج العناية المنظمة', options: [
        { score: 0, label: 'غير نظامي وغير مدام' },
        { score: 1, label: 'نظامي وغير مدام' },
        { score: 2, label: 'نظامي ومدام' }
      ]},
      { id: 'q_ocp_visits', text: 'سجل الزيارات التثقيفية بالوحدة', options: [
        { score: 0, label: 'غير موجود' },
        { score: 1, label: 'موجود ولا يتم العمل به' },
        { score: 2, label: 'موجود ويتم العمل به' }
      ]},
      { id: 'q_ocp_card', text: 'بطاقة علاج العناية المنظمة', options: [
        { score: 0, label: 'غير متوفرة' },
        { score: 1, label: 'متوفرة ولا يتم العمل بها' },
        { score: 2, label: 'متوفرة ويتم العمل بها' }
      ]},
      { id: 'q_ocp_dentists', text: 'شمول جميع أطباء الأسنان في الوحدة بالبرنامج', options: [
        { score: 0, label: 'أقل من نصف عدد أطباء الأسنان' },
        { score: 1, label: 'أكثر من نصف عدد أطباء الأسنان' },
        { score: 2, label: 'جميع أطباء الأسنان' }
      ]},
      { id: 'q_ocp_parents', text: 'حضور مجالس أولياء الأمور للمدارس', options: [
        { score: 0, label: 'أقل من نصف عدد المدارس' },
        { score: 1, label: 'أكثر من نصف عدد المدارس' },
        { score: 2, label: 'جميع المدارس' }
      ]},
      { id: 'q_ocp_school', text: 'إعلام المدرسة بكتاب رسمي بأسماء الطلاب المصابين', options: [
        { score: 0, label: 'لا يوجد تبليغ' },
        { score: 1, label: 'تبليغ أقل من نصف عدد المدارس' },
        { score: 2, label: 'تبليغ جميع المدارس' }
      ]},
      { id: 'q_ocp_parent_card', text: 'بطاقة ولي الأمر للتلاميذ المصابين', options: [
        { score: 0, label: 'لا توجد بطاقة' },
        { score: 1, label: 'وجود بطاقة وتبليغ نصف عدد المصابين' },
        { score: 2, label: 'تبليغ جميع المصابين' }
      ]},
      { id: 'q_ocp_workshop', text: 'مشاركة أطباء الأسنان في ورشة تعريفية عن العناية المنظمة', options: [
        { score: 0, label: 'أقل من نصف عدد أطباء الأسنان' },
        { score: 1, label: 'أكثر من نصف عدد أطباء الأسنان' },
        { score: 2, label: 'جميع أطباء الأسنان' }
      ]}
    ]
  },
  {
    id: 4,
    title: 'السيطرة على العدوى والوقاية (المؤشرات)',
    questions: [
      { id: 'q_inf_prec', text: 'الإجراءات الوقائية لأطباء الأسنان في العيادة', options: [
        { score: 0, label: 'غير ملتزمين' },
        { score: 2, label: 'ملتزمين بالكامل' }
      ]},
      { id: 'q_inf_safety', text: 'صندوق الأمان (Safety box) للتخلص من الحقن الحادة', options: [
        { score: 0, label: 'غير موجود' },
        { score: 2, label: 'موجود ومتوفر' }
      ]},
      { id: 'q_inf_waste', text: 'عزل وتصنيف النفايات الطبية', options: [
        { score: 0, label: 'لا يوجد عزل' },
        { score: 2, label: 'يوجد عزل بشكل كامل' }
      ]},
      { id: 'q_inf_ultra', text: 'وجود جهاز التنظيف بالموجات فوق الصوتية (Ultrasonic cleaner)', options: [
        { score: 0, label: 'غير موجود' },
        { score: 1, label: 'موجود وعاطل' },
        { score: 2, label: 'موجود وصالح للعمل' }
      ]},
      { id: 'q_inf_autoclave', text: 'وجود جهاز تعقيم حراري (Autoclave) وصلاحيته', options: [
        { score: 0, label: 'غير موجود' },
        { score: 1, label: 'موجود وعاطل' },
        { score: 2, label: 'موجود وصالح للعمل' }
      ]},
      { id: 'q_inf_clean', text: 'نظافة الغرفة والعيادة بشكل عام', options: [
        { score: 0, label: 'غير نظيفة' },
        { score: 2, label: 'نظيفة ومطهرة' }
      ]},
      { id: 'q_inf_vaccine', text: 'الموقف اللقاحي لأطباء الأسنان في الوحدة', options: [
        { score: 0, label: 'أقل من 50%' },
        { score: 1, label: 'أكثر من 50%' },
        { score: 2, label: 'الجميع ملقحين' }
      ]},
      { id: 'q_inf_extractor', text: 'مفرغة الهواء وصلاحيتها بالعيادة', options: [
        { score: 0, label: 'غير موجودة' },
        { score: 1, label: 'موجودة وعاطلة' },
        { score: 2, label: 'موجودة وصالحة للعمل' }
      ]},
      { id: 'q_inf_wrapper', text: 'جهاز تغليف وتكييس الأدوات والمعقمات', options: [
        { score: 0, label: 'غير متوفر' },
        { score: 1, label: 'متوفر وغير معمول به' },
        { score: 2, label: 'متوفر ومعمول به' }
      ]},
      { id: 'q_inf_guidelines', text: 'وجود الدلائل الإرشادية والبوسترات التوعوية بالوحدة', options: [
        { score: 0, label: 'غير موجودة' },
        { score: 2, label: 'موجودة ومعروضة' }
      ]},
      { id: 'q_inf_tools', text: 'أدوات القلع وجاهزيتها للعمل', options: [
        { score: 0, label: 'صدئة أو مكسرة' },
        { score: 2, label: 'معقمة وممتازة وصالحة' }
      ]},
      { id: 'q_inf_training', text: 'دورات تدريبية مستمرة في مكافحة العدوى للكادر', options: [
        { score: 0, label: 'عدم الاشتراك' },
        { score: 1, label: 'مشاركة نصف أطباء الأسنان' },
        { score: 2, label: 'مشاركة الجميع' }
      ]}
    ]
  }
];

export default function HealthEvalPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [activePortalTab, setActivePortalTab] = useState('eval'); // 'eval', 'stats', 'profile'

  // Selection state
  const [directorateId, setDirectorateId] = useState('');
  const [sectorId, setSectorId] = useState('');
  const [centerId, setCenterId] = useState('');
  const [isEvaluationStarted, setIsEvaluationStarted] = useState(false);

  // Wizard state
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0); // 0: Service, 1: Equip/Mat, 2: Records, 3: OCP, 4: Infection
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [serviceScoreSaved, setServiceScoreSaved] = useState(0);
  const [indicatorScoreSaved, setIndicatorScoreSaved] = useState(0);

  // Stats tab state
  const [expandedSectorId, setExpandedSectorId] = useState(null);

  // Profile tab state
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Authentication check
  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== 'evaluator' || user.specialization !== 'health') {
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
  const sectors = selectedDir ? selectedDir.sectors : [];
  const selectedSector = sectors.find(s => s.id === parseInt(sectorId));
  const healthCenters = selectedSector ? selectedSector.healthCenters : [];
  const selectedCenter = healthCenters.find(c => c.id === parseInt(centerId));

  const handleStart = () => {
    if (!directorateId || !sectorId || !centerId) return;
    setIsEvaluationStarted(true);
    setCurrentGroupIndex(0);
    const currentCenter = healthCenters.find(c => c.id === parseInt(centerId));
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
    if (currentGroupIndex === 0) {
      // Step 0: Service outcomes (requires 4 counts and 4 ratings out of 10)
      return (
        answers.c_fillings !== undefined && answers.c_fillings !== '' &&
        answers.s_fillings !== undefined &&
        answers.c_extractions !== undefined && answers.c_extractions !== '' &&
        answers.s_extractions !== undefined &&
        answers.c_cleaning !== undefined && answers.c_cleaning !== '' &&
        answers.s_cleaning !== undefined &&
        answers.c_exam !== undefined && answers.c_exam !== '' &&
        answers.s_exam !== undefined
      );
    } else {
      // Steps 1 to 4: Indicators question groups
      const grp = questionGroups[currentGroupIndex - 1];
      return grp.questions.every(q => answers[q.id] !== undefined);
    }
  };

  // Calculate total questions (1 step of 4 ratings + 27 indicators = 31 items)
  const totalSteps = questionGroups.length + 1; // 5 steps
  
  // Count answered items
  const getAnsweredCount = () => {
    let count = 0;
    if (answers.s_fillings !== undefined) count++;
    if (answers.s_extractions !== undefined) count++;
    if (answers.s_cleaning !== undefined) count++;
    if (answers.s_exam !== undefined) count++;
    
    questionGroups.forEach(g => {
      g.questions.forEach(q => {
        if (answers[q.id] !== undefined) count++;
      });
    });
    return count;
  };

  const handleNext = () => {
    if (currentGroupIndex < totalSteps - 1) {
      setCurrentGroupIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    if (!isStepComplete()) {
      alert('يرجى إكمال جميع الحقول والخيارات في الخطوة الحالية.');
      return;
    }

    // 1. Service Score (out of 40 points)
    const serviceScore = (answers.s_fillings || 0) + (answers.s_extractions || 0) + (answers.s_cleaning || 0) + (answers.s_exam || 0);

    // 2. Indicators Score (out of 54 points)
    let indicatorPointsAchieved = 0;
    questionGroups.forEach(g => {
      g.questions.forEach(q => {
        indicatorPointsAchieved += (answers[q.id] || 0);
      });
    });

    const maxIndicatorPoints = 27 * 2; // 54 points
    const indicatorPercentage = (indicatorPointsAchieved / maxIndicatorPoints) * 100;
    const weightedIndicatorScore = Math.round(indicatorPercentage * 0.6); // 60% weight

    const calculatedPercentage = Math.round(serviceScore + (indicatorPercentage * 0.6));

    // Save to store
    submitHealthCenterEvaluation(
      parseInt(directorateId),
      parseInt(sectorId),
      parseInt(centerId),
      calculatedPercentage,
      answers,
      serviceScore,
      weightedIndicatorScore
    );

    // Update user completed stats
    updateUser(currentUser.id, {
      evaluationsCompleted: currentUser.evaluationsCompleted + 1
    });

    // Reload current user state
    setCurrentUser(getCurrentUser());

    setServiceScoreSaved(serviceScore);
    setIndicatorScoreSaved(weightedIndicatorScore);
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

  const getSectorStats = (sector) => {
    const total = sector.healthCenters.length;
    const evaluated = sector.healthCenters.filter(c => c.status === 'evaluated').length;
    const scores = sector.healthCenters
      .filter(c => c.status === 'evaluated' && c.score != null)
      .map(c => c.score);
    const avgScore = scores.length > 0 
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) 
      : 0;

    return { total, evaluated, avgScore };
  };

  return (
    <div className="app-layout">
      {/* Top Header */}
      <header className="page-header" style={{ padding: 'var(--space-md) var(--space-lg)', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)', position: 'sticky', top: 0, zIndex: 10 }}>
        {/* Right side: App Branding */}
        <div className="flex items-center gap-md">
          <div className="user-avatar green" style={{ width: 36, height: 36 }}>
            <Stethoscope size={18} />
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
          
          {/* TAB 1: EVALUATION FORM */}
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
                    <div className="empty-state-icon green">
                      <Stethoscope size={32} />
                    </div>
                    <h2 className="empty-state-title">استمارة تقييم جديدة</h2>
                    <p className="empty-state-desc">تقييم المراكز الصحية على مرحلتين: نتيجة الخدمة المقدمة (40%) ومؤشرات الأجهزة والمواد والسجلات والوقاية (60%).</p>
                  </div>

                  <div className="p-md bg-card rounded-lg border border-color flex flex-col gap-md">
                    <div className="form-group mb-xs">
                      <label className="form-label flex items-center gap-sm"><MapPin size={16} /> دائرة الصحة</label>
                      <select
                        className="form-select"
                        value={directorateId}
                        onChange={(e) => {
                          setDirectorateId(e.target.value);
                          setSectorId('');
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
                        <label className="form-label flex items-center gap-sm"><MapPin size={16} /> القطاع الصحي</label>
                        <select
                          className="form-select"
                          value={sectorId}
                          onChange={(e) => {
                            setSectorId(e.target.value);
                            setCenterId('');
                          }}
                        >
                          <option value="">اختر القطاع...</option>
                          {sectors.map((sec) => (
                            <option key={sec.id} value={sec.id}>{sec.name}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {sectorId && (
                      <div className="form-group mb-xs">
                        <label className="form-label flex items-center gap-sm"><MapPin size={16} /> المركز الصحي العام</label>
                        <select
                          className="form-select"
                          value={centerId}
                          onChange={(e) => setCenterId(e.target.value)}
                        >
                          <option value="">اختر المركز الصحي...</option>
                           {healthCenters
                            .filter(hc => currentUser.assignedCenterIds && currentUser.assignedCenterIds.length > 0 
                              ? currentUser.assignedCenterIds.includes(hc.id) 
                              : true)
                            .map((hc) => (
                              <option key={hc.id} value={hc.id}>
                                {hc.name} {hc.status === 'evaluated' ? `(تم تقييمه: ${hc.score}%)` : '(لم يقيّم)'}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}

                    <button
                      className="btn btn-primary btn-full mt-sm"
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
                      <span>الخطوة الحالية: {currentGroupIndex + 1} من {totalSteps}</span>
                    </div>
                    <ProgressBar value={currentGroupIndex} max={totalSteps - 1} color="green" />
                  </div>

                  {/* STEP 0: Service Outcomes Form */}
                  {currentGroupIndex === 0 && (
                    <div className="flex flex-col gap-md">
                      <div className="p-md bg-card rounded-lg border border-color flex items-center justify-between shadow-sm" style={{ borderRight: '4px solid #22c55e', background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(34, 197, 94, 0.05) 100%)' }}>
                        <h2 className="text-base font-bold text-primary flex items-center gap-xs m-0">
                          <TrendingUp size={18} className="text-accent-green" /> المرحلة الأولى: نتيجة الخدمة المقدمة
                        </h2>
                        <span className="badge badge-green text-xxs font-bold">الوزن: 40%</span>
                      </div>
                      <p className="text-secondary text-xs px-xs">أدخل عدد الحالات المنجزة شهرياً لكل اختصاص مع تقييم كفاءتها من 0 (ضعيف) إلى 10 نقاط (ممتاز):</p>

                      {[
                        { id: 'fillings', label: 'خدمات الحشوات وعلاجات الحشو المنجزة' },
                        { id: 'extractions', label: 'خدمات قلع الأسنان البسيطة والجراحية' },
                        { id: 'cleaning', label: 'خدمات إزالة التكلسات وتنظيف اللثة' },
                        { id: 'exam', label: 'خدمات الفحص السريري مع العلاج والإحالات' }
                      ].map((service) => {
                        const countVal = answers[`c_${service.id}`] || '';
                        const scoreVal = answers[`s_${service.id}`];

                        return (
                          <div key={service.id} className="p-md bg-card rounded-lg border border-color flex flex-col gap-sm">
                            <span className="text-sm font-bold text-primary block">{service.label}</span>
                            
                            <div className="grid cols-2 gap-sm items-center">
                              <div>
                                <label className="text-xxs text-secondary block mb-xs">عدد الحالات في الشهر السابق</label>
                                <input
                                  type="number"
                                  placeholder="أدخل عدد الحالات..."
                                  className="form-input py-xs px-sm text-xs"
                                  value={countVal}
                                  onChange={(e) => handleTextChange(`c_${service.id}`, parseInt(e.target.value) || 0)}
                                />
                              </div>

                              <div>
                                <label className="text-xxs text-secondary block mb-xs">التقييم الفعلي للخدمة (0 - 10)</label>
                                <select
                                  className="form-select py-xs text-xs"
                                  value={scoreVal === undefined ? '' : scoreVal}
                                  onChange={(e) => handleAnswerSelect(`s_${service.id}`, parseInt(e.target.value))}
                                >
                                  <option value="">اختر التقييم...</option>
                                  {[...Array(11).keys()].map((n) => (
                                    <option key={n} value={n}>{n} نقاط</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* STEPS 1-4: Indicators Questions */}
                  {currentGroupIndex > 0 && (
                    <div className="flex flex-col gap-sm">
                      <div className="p-sm bg-card rounded-lg border border-color flex items-center justify-between shadow-sm" style={{ borderRight: '4px solid #22c55e', background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(34, 197, 94, 0.05) 100%)' }}>
                        <h2 className="text-sm font-bold text-primary flex items-center gap-xs m-0">
                          <Stethoscope size={16} className="text-accent-green" /> {questionGroups[currentGroupIndex - 1].title}
                        </h2>
                        <span className="badge badge-green text-xxs font-bold">الخطوة {currentGroupIndex} من {totalSteps}</span>
                      </div>

                      <div className="flex flex-col gap-sm">
                        {questionGroups[currentGroupIndex - 1].questions.map((q, idx) => {
                          const currentAnswer = answers[q.id];
                          return (
                            <div 
                              key={q.id} 
                              className="p-sm bg-card rounded-lg border border-color flex flex-col gap-sm shadow-sm transition-all"
                              style={{
                                borderRight: currentAnswer !== undefined 
                                  ? (currentAnswer === 2 ? '4px solid #22c55e' : currentAnswer === 1 ? '4px solid #f59e0b' : '4px solid #ef4444')
                                  : '4px solid var(--border-color)'
                              }}
                            >
                              <div className="flex items-start gap-sm">
                                <div 
                                  className="rounded p-xs flex items-center justify-center font-bold text-xs" 
                                  style={{ 
                                    width: 22, 
                                    height: 22, 
                                    flexShrink: 0,
                                    backgroundColor: currentAnswer !== undefined
                                      ? (currentAnswer === 2 ? 'rgba(34, 197, 94, 0.15)' : currentAnswer === 1 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)')
                                      : 'var(--secondary-color)',
                                    color: currentAnswer !== undefined
                                      ? (currentAnswer === 2 ? '#16a34a' : currentAnswer === 1 ? '#d97706' : '#dc2626')
                                      : 'var(--text-secondary)'
                                  }}
                                >
                                  {idx + 1}
                                </div>
                                <p className="text-xs font-bold text-primary" style={{ margin: 0 }}>{q.text}</p>
                              </div>

                              {/* Score Options */}
                              <div className="flex flex-col gap-xs">
                                {q.options.map((opt) => {
                                  const isSelected = currentAnswer === opt.score;
                                  let btnStyle = {};
                                  let badgeStyle = {};

                                  if (isSelected) {
                                    if (opt.score === 2) {
                                      btnStyle = { backgroundColor: '#f0fdf4', borderColor: '#22c55e', color: '#15803d', fontWeight: 'bold' };
                                      badgeStyle = { borderColor: '#22c55e', backgroundColor: '#22c55e', color: '#ffffff' };
                                    } else if (opt.score === 1) {
                                      btnStyle = { backgroundColor: '#fffbeb', borderColor: '#f59e0b', color: '#b45309', fontWeight: 'bold' };
                                      badgeStyle = { borderColor: '#f59e0b', backgroundColor: '#f59e0b', color: '#ffffff' };
                                    } else {
                                      btnStyle = { backgroundColor: '#fef2f2', borderColor: '#ef4444', color: '#b91c1c', fontWeight: 'bold' };
                                      badgeStyle = { borderColor: '#ef4444', backgroundColor: '#ef4444', color: '#ffffff' };
                                    }
                                  } else {
                                    btnStyle = { borderColor: 'var(--border-color)', color: 'var(--text-secondary)' };
                                    badgeStyle = { borderColor: 'var(--border-color)' };
                                  }

                                  return (
                                    <button
                                      key={opt.score}
                                      className="btn text-right justify-between w-full btn-sm border py-xs px-sm transition-all"
                                      style={btnStyle}
                                      onClick={() => handleAnswerSelect(q.id, opt.score)}
                                    >
                                      <span className="text-xs">{opt.label}</span>
                                      <div 
                                        className="w-4 h-4 rounded-full border flex items-center justify-center transition-all"
                                        style={badgeStyle}
                                      >
                                        {isSelected && <Check size={10} />}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Footer controls */}
                  <div className="flex justify-between items-center gap-md mt-sm bg-secondary/20 p-sm rounded-lg border border-color">
                    <button
                      className="btn btn-secondary flex-1 py-xs"
                      onClick={handlePrev}
                      disabled={currentGroupIndex === 0}
                    >
                      <ChevronRight size={16} /> السابق
                    </button>

                    {currentGroupIndex === totalSteps - 1 ? (
                      <button
                        className="btn btn-primary flex-1 py-xs"
                        onClick={handleSubmit}
                        disabled={!isStepComplete()}
                      >
                        تقديم التقييم المزدوج <ClipboardCheck size={16} />
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary flex-1 py-xs"
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
                  <div className="coming-soon-icon green mx-auto">
                    <Award size={44} />
                  </div>

                  <div>
                    <h1 className="empty-state-title text-xl">تم تقديم التقييم بنجاح!</h1>
                    <p className="empty-state-desc mt-sm">
                      تم حفظ تقييم مركز <strong>{selectedCenter?.name}</strong> بنجاح وفقاً لنظام التقييم على مرحلتين.
                    </p>
                  </div>

                  <div className="p-md bg-card rounded-2xl border border-color flex flex-col items-center justify-center max-w-sm w-full mx-auto gap-sm">
                    <span className="text-secondary text-xxs block">النتيجة النهائية للمركز (100%)</span>
                    <span className="text-5xl font-black text-primary">{finalScore}%</span>
                    
                    <div className="flex flex-col gap-xs w-full border-t border-color/40 pt-sm mt-xs">
                      <div className="flex justify-between text-xxs text-secondary">
                        <span>مرحلة الخدمة المقدمة (40%):</span>
                        <strong className="text-primary">{serviceScoreSaved} من 40</strong>
                      </div>
                      <div className="flex justify-between text-xxs text-secondary">
                        <span>مرحلة المؤشرات العامة (60%):</span>
                        <strong className="text-primary">{indicatorScoreSaved} من 60</strong>
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
                      className="btn btn-primary"
                      onClick={() => setIsEvaluationStarted(false)}
                    >
                      تقييم مركز صحي آخر
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: SECTORS STATISTICS */}
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
                    {/* Directorate header display */}
                    <div className="flex items-center gap-sm px-xs mt-sm mb-xs">
                      <MapPin size={16} className="text-accent-green" />
                      <h2 className="text-base font-extrabold text-primary">{dir.name}</h2>
                    </div>

                    {/* Sectors under this directorate */}
                    {dir.sectors.length === 0 ? (
                      <p className="text-secondary text-xs text-center py-md bg-card rounded-lg border border-color">
                        لا توجد قطاعات صحية في هذه الدائرة.
                      </p>
                    ) : (
                      dir.sectors
                        .map(sector => {
                          const assignedHCs = sector.healthCenters.filter(hc => 
                            currentUser.assignedCenterIds && currentUser.assignedCenterIds.length > 0 
                              ? currentUser.assignedCenterIds.includes(hc.id) 
                              : true
                          );
                          return { ...sector, healthCenters: assignedHCs };
                        })
                        .filter(sector => sector.healthCenters.length > 0)
                        .map((sector) => {
                          const isExpanded = expandedSectorId === sector.id;
                          const sectorStats = getSectorStats(sector);
                          const progressPercent = sectorStats.total > 0 
                            ? Math.round((sectorStats.evaluated / sectorStats.total) * 100)
                            : 0;

                          return (
                            <div key={sector.id} className="border border-color rounded-lg overflow-hidden bg-card transition-all">
                              <div 
                                className="flex items-center justify-between p-md cursor-pointer hover:bg-card-hover"
                                onClick={() => setExpandedSectorId(isExpanded ? null : sector.id)}
                              >
                                <div className="flex items-center gap-md">
                                  {isExpanded ? <ChevronUp size={16} className="text-secondary" /> : <ChevronDown size={16} className="text-secondary" />}
                                  <div>
                                    <span className="font-bold text-sm text-primary block">{sector.name}</span>
                                    <span className="text-secondary text-xxs block mt-xs">
                                      التقييم: {sectorStats.evaluated} من {sectorStats.total} مركز صحي
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-md">
                                  {sectorStats.evaluated > 0 && (
                                    <span className="badge badge-green text-xxs font-bold">{sectorStats.avgScore}%</span>
                                  )}
                                  <span className="badge badge-blue text-xxs">
                                    إنجاز {progressPercent}%
                                  </span>
                                </div>
                              </div>

                              {isExpanded && (
                                <div className="p-md bg-tertiary/20 border-t border-color/40 flex flex-col gap-xs">
                                  {sector.healthCenters.map((hc) => (
                                    <div 
                                      key={hc.id} 
                                      className="list-item py-xs px-sm bg-card/60 cursor-pointer hover:bg-card-hover transition-all"
                                      onClick={() => {
                                        setDirectorateId(dir.id.toString());
                                        setSectorId(sector.id.toString());
                                        setCenterId(hc.id.toString());
                                        setIsEvaluationStarted(true);
                                        setCurrentGroupIndex(0);
                                        setAnswers(hc.answers || {});
                                        setIsSubmitted(false);
                                        setActivePortalTab('eval');
                                      }}
                                    >
                                      <div className={`list-item-dot ${
                                        hc.status === 'evaluated' ? 'green' : hc.status === 'in-progress' ? 'orange' : 'blue'
                                      }`} />
                                      <span className="text-xs text-primary flex-1">{hc.name}</span>
                                      <div>
                                        {hc.status === 'evaluated' ? (
                                          <div className="flex items-center gap-xs">
                                            {hc.serviceScore !== undefined && (
                                              <span className="text-xxs text-secondary">({hc.serviceScore} + {hc.indicatorScore})</span>
                                            )}
                                            <span className="badge badge-green text-xxs font-bold">{hc.score}%</span>
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
                        })
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* TAB 3: PROFILE MANAGEMENT */}
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
                  <span className="badge badge-blue mt-sm">مقيّم مراكز صحية معتمد</span>
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
                  <span className="text-primary font-bold">تقييم عيادات الأسنان في المراكز العامة</span>
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

      {/* Bottom Nav Bar for portal */}
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
