import React, { useState } from 'react';
import { getDirectorates } from '../../data/store';
import { 
  BarChart3, Search, MapPin, Award, TrendingUp, Download, Sparkles,
  ChevronRight, Building2, Stethoscope, Send, Building, CheckCircle,
  FileText, Activity, ShieldCheck, Users, Clock, FlaskConical, Wrench,
  BookOpen
} from 'lucide-react';

function getScoreClass(s) {
  if (!s && s !== 0) return 'pending';
  if (s >= 85) return 'excellent';
  if (s >= 70) return 'good';
  if (s >= 50) return 'fair';
  return 'poor';
}

function ScoreBadge({ score, pending = 'قيد الانتظار' }) {
  if (!score && score !== 0) return <span className="score-badge pending">{pending}</span>;
  return <span className={`score-badge ${getScoreClass(score)}`}>{score}%</span>;
}
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

export default function ReportsPanel() {
  const [activeSubTab, setActiveSubTab] = useState('overview'); // 'overview', 'directorates', 'ai'
  const [dirSubTab, setDirSubTab] = useState('health'); // 'health', 'specialized'
  
  // Filters
  const [selectedDirId, setSelectedDirId] = useState('all');
  const [selectedSectorId, setSelectedSectorId] = useState('all');
  const [sortBy, setSortBy] = useState('none'); // 'none', 'highest', 'lowest'
  const [searchTerm, setSearchTerm] = useState('');
  
  // AI Chat State
  const [aiPrompt, setAiPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'assistant',
      text: 'مرحباً بك في مساعد الذكاء الاصطناعي للتقارير. يمكنك أن تطلب مني صياغة تقارير شاملة أو تحليل الأداء لقطاع أو دائرة صحية معينة. على سبيل المثال: "اكتب تقريراً مفصلاً عن قطاع الكاظمية" أو "حلل درجات المراكز التخصصية في بغداد الرصافة".'
    }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const directorates = getDirectorates();

  // Extract all health centers
  const allHealthCenters = [];
  directorates.forEach(dir => {
    dir.sectors.forEach(sec => {
      sec.healthCenters.forEach(hc => {
        allHealthCenters.push({
          ...hc,
          sectorId: sec.id,
          sectorName: sec.name,
          directorateId: dir.id,
          directorateName: dir.name,
        });
      });
    });
  });

  // Extract all specialized centers
  const allSpecializedCenters = [];
  directorates.forEach(dir => {
    dir.specializedCenters.forEach(sc => {
      allSpecializedCenters.push({
        ...sc,
        directorateId: dir.id,
        directorateName: dir.name,
      });
    });
  });

  // Filters logic - Health Centers
  let filteredHCs = allHealthCenters.filter(c => {
    const matchesDir = selectedDirId === 'all' || c.directorateId === parseInt(selectedDirId);
    const matchesSector = selectedSectorId === 'all' || c.sectorId === parseInt(selectedSectorId);
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.sectorName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDir && matchesSector && matchesSearch;
  });

  if (sortBy === 'highest') {
    filteredHCs.sort((a, b) => (b.score || 0) - (a.score || 0));
  } else if (sortBy === 'lowest') {
    filteredHCs.sort((a, b) => (a.score || 0) - (b.score || 0));
  }

  // Filters logic - Specialized Centers
  let filteredSpecs = allSpecializedCenters.filter(c => {
    const matchesDir = selectedDirId === 'all' || c.directorateId === parseInt(selectedDirId);
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDir && matchesSearch;
  });

  if (sortBy === 'highest') {
    filteredSpecs.sort((a, b) => (b.score || 0) - (a.score || 0));
  } else if (sortBy === 'lowest') {
    filteredSpecs.sort((a, b) => (a.score || 0) - (b.score || 0));
  }

  // Statistics calculations
  const totalHCVal = allHealthCenters.length;
  const evaluatedHCVal = allHealthCenters.filter(c => c.status === 'evaluated').length;
  const avgHCScoreVal = Math.round(allHealthCenters.filter(c => c.status === 'evaluated' && c.score).reduce((acc, c) => acc + c.score, 0) / (evaluatedHCVal || 1));

  const totalSpecVal = allSpecializedCenters.length;
  const evaluatedSpecVal = allSpecializedCenters.filter(c => c.status === 'evaluated').length;
  const avgSpecScoreVal = Math.round(allSpecializedCenters.filter(c => c.status === 'evaluated' && c.score).reduce((acc, c) => acc + c.score, 0) / (evaluatedSpecVal || 1));

  // Chart data preparing - matching PDF 3D clustered columns
  // We take the filtered HCs that are evaluated, up to 7 items for clear visibility
  const evaluatedHCList = filteredHCs.filter(c => c.status === 'evaluated').slice(0, 8);
  const chartData = evaluatedHCList.map(c => ({
    name: c.name.replace('مركز صحي ', '').replace('م.ص ', ''),
    'الخدمة 40%': c.serviceScore || 0,
    'المؤشرات 60%': c.indicatorScore || 0,
    'النتيجة الكلية 100%': c.score || 0
  }));

  // Helper to export CSV/Excel with UTF-8 BOM for Arabic support
  const exportToExcel = (data, filename, headers, mapper) => {
    let csvContent = "\uFEFF"; // UTF-8 BOM
    csvContent += headers.join(",") + "\r\n";
    data.forEach(item => {
      const row = mapper(item);
      const escapeCsvVal = val => {
        if (val === undefined || val === null) return "";
        let str = String(val);
        str = str.replace(/"/g, '""');
        if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
          str = `"${str}"`;
        }
        return str;
      };
      csvContent += row.map(escapeCsvVal).join(",") + "\r\n";
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportExcel = (tabType) => {
    if (tabType === 'overview') {
      const summaryData = [
        { label: 'عدد الدوائر الصحية المقيّمة', value: directorates.length },
        { label: 'عدد المراكز الصحية العامة المقيّمة', value: evaluatedHCVal },
        { label: 'إجمالي المراكز الصحية العامة', value: totalHCVal },
        { label: 'معدل تقييم المراكز الصحية العام', value: `${avgHCScoreVal}%` },
        { label: 'عدد المراكز التخصصية المقيّمة', value: evaluatedSpecVal },
        { label: 'إجمالي المراكز التخصصية', value: totalSpecVal },
        { label: 'معدل تقييم المراكز التخصصية العام', value: `${avgSpecScoreVal}%` }
      ];
      exportToExcel(
        summaryData,
        "ملخص_التقرير_الوطني_العام",
        ["المؤشر الإحصائي", "القيمة"],
        (item) => [item.label, item.value]
      );
    } else if (tabType === 'health') {
      exportToExcel(
        filteredHCs,
        "تقرير_تقييم_المراكز_الصحية",
        ["اسم القطاع", "اسم المركز الصحي", "درجة الخدمة المقدمة (40%)", "نتيجة المؤشرات (60%)", "النتيجة النهائية (100%)", "الحالة"],
        (c) => [
          c.sectorName,
          c.name,
          c.status === 'evaluated' ? c.serviceScore : '—',
          c.status === 'evaluated' ? c.indicatorScore : '—',
          c.status === 'evaluated' ? `${c.score}%` : '—',
          c.status === 'evaluated' ? 'تم التقييم' : 'قيد الانتظار'
        ]
      );
    } else if (tabType === 'specialized') {
      exportToExcel(
        filteredSpecs,
        "تقرير_تقييم_المراكز_التخصصية",
        ["دائرة الصحة", "اسم المركز التخصصي", "درجة الملاك والسجلات (50%)", "درجة الأجهزة والوقاية (50%)", "النتيجة النهائية (100%)", "الحالة"],
        (c) => [
          c.directorateName,
          c.name,
          c.status === 'evaluated' ? `${c.stage1Score}%` : '—',
          c.status === 'evaluated' ? `${c.stage2Score}%` : '—',
          c.status === 'evaluated' ? `${c.score}%` : '—',
          c.status === 'evaluated' ? 'تم التقييم' : 'قيد الانتظار'
        ]
      );
    } else if (tabType === 'deviations') {
      const getStatusLabel = (ans, key, isMaterials = false) => {
        if (!ans) return "—";
        const val = ans[key];
        if (val === undefined || val === null) return "—";
        const isFailed = isMaterials ? (val === 0) : (val === 0 || val === 1);
        return isFailed ? "حيود" : "مطابق";
      };
      exportToExcel(
        filteredHCs,
        "تقرير_حيود_المؤشرات_الصحية",
        ["اسم القطاع", "اسم المركز الصحي", "كرسي الأسنان", "جهاز الأشعة", "المواد الطبية", "الثلاجة", "السجل اليومي", "سجل الصرف", "سجل الإحالة", "برنامج العناية المنظمة", "ورش البرنامج", "جهاز التعقيم", "الوقاية الشخصية", "النفايات الطبية"],
        (c) => [
          c.sectorName,
          c.name,
          getStatusLabel(c.answers, 'q_chair'),
          getStatusLabel(c.answers, 'q_xray'),
          getStatusLabel(c.answers, 'q_materials', true),
          getStatusLabel(c.answers, 'q_fridge'),
          getStatusLabel(c.answers, 'q_daily_reg'),
          getStatusLabel(c.answers, 'q_spend_reg'),
          getStatusLabel(c.answers, 'q_referrals'),
          getStatusLabel(c.answers, 'q_ocp_card'),
          getStatusLabel(c.answers, 'q_ocp_workshop'),
          getStatusLabel(c.answers, 'q_inf_autoclave'),
          getStatusLabel(c.answers, 'q_inf_prec'),
          getStatusLabel(c.answers, 'q_inf_waste')
        ]
      );
    }
  };

  const handlePrintPDF = () => {
    window.print();
  };

  // Helper to render failure badge for deviations table
  const renderDeviationBadge = (ans, key, isMaterials = false) => {
    if (!ans) return <span className="text-secondary" style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>-</span>;
    const val = ans[key];
    if (val === undefined || val === null) return <span className="text-secondary" style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>-</span>;
    
    const isFailed = isMaterials ? (val === 0) : (val === 0 || val === 1);
    if (isFailed) {
      return (
        <span 
          className="badge badge-red font-bold" 
          style={{ padding: '2px 6px', fontSize: '9px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
          title={isMaterials ? 'غير متوفرة' : 'عطل / غير مدام / غير مطابق'}
        >
          حيود ❌
        </span>
      );
    }
    return (
      <span 
        className="badge badge-green font-bold" 
        style={{ padding: '2px 6px', fontSize: '9px', backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.2)' }}
        title="مطابق ومعتمد"
      >
        مطابق ✔️
      </span>
    );
  };

  // AI Chat generation logic
  const handleAiSend = (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    const userMsg = aiPrompt;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setAiPrompt('');
    setIsAiLoading(true);

    setTimeout(() => {
      let aiResponse = '';
      if (userMsg.includes('الكاظمية')) {
        aiResponse = `### 📋 تقرير تقييم الأداء لقطاع سما الكاظمية للرعاية الأولية
**التاريخ: يوليو 2026**
**الحالة العامة للقطاع: جيد جداً (المعدل العام للقطاع: 76.8%)**

#### 1. توزيع المراكز والتقييمات:
* **م.ص النور**: حقق أعلى تقييم بنسبة **92.8%**، بأداء خدمات ممتاز (40/40) والتزام كبير بالمؤشرات.
* **م.ص الخطيب**: حقق تقييماً بنسبة **80%**، مع تميز في جودة الأجهزة ومكافحة العدوى.
* **م.ص الجوادين**: حقق تقييماً بنسبة **77%**.
* **م.ص العراق الجديد**: حقق تقييماً بنسبة **71.8%** (مقبول)، هناك ملاحظات على سجل صرف المواد.
* **م.ص الوفاء**: حقق تقييماً بنسبة **70.4%**.
* **م.ص الشهيد الصدر**: حقق أقل تقييم بنسبة **68.8%**، بسبب عطل جزئي في كرسي الأسنان وضعف شمول الأطباء بالبرنامج المنظم.

#### 2. التوصيات المقترحة:
1. إرسال لجان صيانة فورية لمعالجة كرسي الأسنان في **م.ص الشهيد الصدر**.
2. توفير ورشة تدريبية عاجلة لكادر **م.ص العراق الجديد** حول التوثيق وسجل صرف المواد.
3. تعميم تجربة **م.ص النور** في التنظيم الإداري والوقاية على بقية مراكز القطاع.`;
      } else if (userMsg.includes('صلاح الدين') || userMsg.includes('تكريت') || userMsg.includes('بيجي')) {
        aiResponse = `### 📋 تقرير أداء دائرة صحة صلاح الدين
**التاريخ: يوليو 2026**
**الهيكل الإداري:** 13 قطاعاً صحياً، ومركز تخصصي واحد في تكريت.

#### 1. أداء المراكز الصحية:
* نسبة التقييم العام للمراكز الصحية في المحافظة بلغت **78%**.
* تم تقييم مركز صحي تكريت ومركز صحي العلم، ويظهر التزام عالي بالسجلات والتوثيق بنسبة **90%**، بينما سجل التقييم حاجة إلى دعم المستلزمات الطبية في بعض الأقضية البعيدة مثل قطاع بيجي والشرقاط.

#### 2. أداء المركز التخصصي (تكريت):
* المركز حقق درجة تقييم **79%**.
* **المرحلة الأولى (الملاك والسجلات):** ممتازة بنسبة **82%** وتغطية كاملة لـ 11 وحدة تخصصية متوفرة بالمركز.
* **المرحلة الثانية (التعقيم والأجهزة):** بحاجة لتعزيز توفر مستلزمات مكافحة العدوى خصوصاً في وحدتي الجراحة وصناعة الأسنان.`;
      } else if (userMsg.includes('حيود') || userMsg.includes('مشاكل') || userMsg.includes('عطل') || userMsg.includes('مؤشرات')) {
        aiResponse = `### ⚠️ تقرير حيود ومشاكل مؤشرات المراكز الصحية الوطنية
**التاريخ: يوليو 2026**

أظهرت البيانات الميدانية المسجلة مجموعة من الانحرافات (الحيود) الحرجة التي تؤثر على جودة خدمات طب الأسنان:

| اسم القطاع | اسم المركز الصحي | كرسي الأسنان | جهاز الأشعة | نقص المواد | سجل صرف المواد | أجهزة التعقيم |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| قطاع الكاظمية | م.ص الشهيد الصدر | ❌ (عطل جزئي) | ✔️ | ✔️ | ✔️ | ❌ (صيانة) |
| قطاع الكاظمية | م.ص العراق الجديد | ✔️ | ✔️ | ✔️ | ❌ (غير مدام) | ✔️ |
| قطاع الأعظمية | م.ص الوزيرية (مسودة) | ❌ | ❌ | ❌ | ❌ | ❌ |

#### 🔍 الملاحظات والقرارات الإدارية الفورية:
1. **أجهزة التعقيم:** سجل مركز الشهيد الصدر في الكاظمية حيوداً في مؤشر تعقيم الغرفة، يتطلب إرسال فريق صيانة فورية.
2. **سجلات الصرف:** هناك حاجة لورش عمل تعريفية حول توثيق وإدامة سجل صرف المواد في قطاع الكاظمية (خصوصاً العراق الجديد).
3. **كفاءة الكراسي:** نسبة سلامة كراسي الأسنان الإجمالية في المراكز المقيّمة بلغت **83%**، ونوصي باستبدال صمامات الهواء لثلاثة كراسي بالسرعة الممكنة.`;
      } else {
        aiResponse = `### 📋 تقرير تحليلي عام لمؤشرات التقييم الوطني
**التاريخ: يوليو 2026**

* **نسبة إنجاز تقييم المراكز الصحية الوطنية:** بلغت **${avgHCScoreVal || 0}%** بمعدل أداء عام ممتاز.
* **النسبة الأعلى للمحافظات:** دائرة صحة بغداد الكرخ بلغت نسبة ممتازة خصوصاً في قطاع الكاظمية بفضل الالتزام الصارم ببروتوكولات التعقيم المركزي (CSSD) ومكافحة العدوى.
* **الفجوة الحرجة:** تتركز الفجوة في مرحلة "نتيجة الخدمة المقدمة 40%" نتيجة نقص الأطباء الأخصائيين في بعض القطاعات الفرعية، مما يؤثر على عدد الحالات والإنتاجية الكلية.
* **التوصيات:** تفعيل العيادات المتنقلة لدعم القطاعات الأقل إنتاجية وسرعة تجهيز المواد الأساسية لوحدات حشوات الجذور والأشعة الرقمية.`;
      }

      setChatHistory(prev => [...prev, { role: 'assistant', text: aiResponse }]);
      setIsAiLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-lg">
      {/* Official Print Header (Visible only when printing) */}
      <div className="print-header print-only" style={{ direction: 'rtl', fontFamily: 'Cairo, sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="user-avatar green font-bold text-center flex items-center justify-center" style={{ width: 44, height: 44, border: '2px solid #000', color: '#000', borderRadius: '8px', background: 'transparent' }}>
              <Stethoscope size={24} style={{ color: '#000' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '13pt', fontWeight: 'bold', margin: 0, color: '#000' }}>وزارة الصحة العراقية</h2>
              <p style={{ fontSize: '9pt', margin: '2px 0 0 0', color: '#475569' }}>دائرة الأمور الفنية - قسم صحة الفم والأسنان</p>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '15pt', fontWeight: 'black', margin: 0, color: '#000' }}>منصة التقييم الصحي الوطني</h1>
            <p style={{ fontSize: '9pt', margin: '4px 0 0 0', color: '#475569' }}>تقرير تقييم الأداء والامتثال الميداني للمؤسسات الصحية</p>
          </div>
          <div style={{ textAlign: 'left', fontSize: '8.5pt', color: '#475569' }}>
            <p>تاريخ الطباعة: {new Date().toLocaleDateString('ar-IQ')}</p>
            <p>الوقت: {new Date().toLocaleTimeString('ar-IQ')}</p>
          </div>
        </div>
      </div>
      
      {/* Top Navigation for Reports panel */}
      <div className="modal-tabs" style={{ marginBottom: 0 }}>
        <button
          className={`modal-tab ${activeSubTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('overview')}
        >
          نظرة عامة
        </button>
        <button
          className={`modal-tab ${activeSubTab === 'directorates' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('directorates')}
        >
          تقارير الدوائر والمراكز
        </button>
        <button
          className={`modal-tab ${activeSubTab === 'deviations' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('deviations')}
        >
          حيود ومشاكل المؤشرات (Page 3)
        </button>
        <button
          className={`modal-tab ${activeSubTab === 'ai' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('ai')}
        >
          <span className="flex items-center gap-xs"><Sparkles size={14} className="text-purple-400" /> تقارير بالذكاء الاصطناعي</span>
        </button>
      </div>

      {/* 📊 TAB 1: OVERVIEW */}
      {activeSubTab === 'overview' && (
        <div className="flex flex-col gap-lg">
          {/* Stats Bento Grid */}
          <div className="bento-grid">
            <div className="bento-card blue flex flex-col justify-between">
              <span className="text-secondary text-xxs flex items-center gap-xs"><Building size={14} /> إجمالي الدوائر المقيّمة</span>
              <strong className="text-3xl font-black text-primary mt-sm">{directorates.length}</strong>
              <span className="text-secondary text-xxs mt-xs">المحافظات العراقية المشمولة</span>
            </div>
            <div className="bento-card green flex flex-col justify-between">
              <span className="text-secondary text-xxs flex items-center gap-xs"><Stethoscope size={14} /> المراكز الصحية المقيّمة</span>
              <strong className="text-3xl font-black text-primary mt-sm">{evaluatedHCVal} <span className="text-xs text-secondary">/ {totalHCVal}</span></strong>
              <div className="flex items-center gap-xs mt-xs">
                <span className="badge badge-green text-xxs">المعدل: {avgHCScoreVal}%</span>
              </div>
            </div>
            <div className="bento-card purple flex flex-col justify-between">
              <span className="text-secondary text-xxs flex items-center gap-xs"><Building2 size={14} /> المراكز التخصصية المقيّمة</span>
              <strong className="text-3xl font-black text-primary mt-sm">{evaluatedSpecVal} <span className="text-xs text-secondary">/ {totalSpecVal}</span></strong>
              <div className="flex items-center gap-xs mt-xs">
                <span className="badge badge-purple text-xxs">المعدل: {avgSpecScoreVal}%</span>
              </div>
            </div>
            <div className="bento-card orange flex flex-col justify-between">
              <span className="text-secondary text-xxs flex items-center gap-xs"><Award size={14} /> أعلى المحافظات أداءً</span>
              <strong className="text-lg font-black text-primary mt-sm">بغداد / الكرخ</strong>
              <span className="text-secondary text-xxs mt-xs">معدل تقييم 83%</span>
            </div>
          </div>

          {/* KPI Cards */}
          {evaluatedHCVal > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Activity size={15} style={{ color: 'var(--accent-blue)' }} />
                <span className="text-primary font-bold" style={{ fontSize: 'var(--text-sm)' }}>مؤشرات الأداء الوطنية للمراكز الصحية</span>
              </div>
              <div className="kpi-grid">
                <div className="kpi-card info">
                  <div className="kpi-label"><Activity size={13} /> نسبة إتمام التقييم الوطني</div>
                  <div className="kpi-value">{totalHCVal > 0 ? Math.round((evaluatedHCVal/totalHCVal)*100) : 0}%</div>
                  <div className="kpi-sub">{evaluatedHCVal} مركز من أصل {totalHCVal}</div>
                  <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${totalHCVal > 0 ? (evaluatedHCVal/totalHCVal)*100 : 0}%` }} /></div>
                </div>
                <div className="kpi-card good">
                  <div className="kpi-label"><Award size={13} /> معدل الدرجة الوطني للمراكز الصحية</div>
                  <div className="kpi-value">{avgHCScoreVal}%</div>
                  <div className="kpi-sub">من خلال {evaluatedHCVal} مركز مقيّم</div>
                  <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${avgHCScoreVal}%` }} /></div>
                </div>
                <div className="kpi-card purple">
                  <div className="kpi-label"><Building2 size={13} /> معدل تقييم المراكز التخصصية</div>
                  <div className="kpi-value">{avgSpecScoreVal}%</div>
                  <div className="kpi-sub">من خلال {evaluatedSpecVal} مركز تخصصي</div>
                  <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${avgSpecScoreVal}%` }} /></div>
                </div>
                <div className="kpi-card warning">
                  <div className="kpi-label"><Clock size={13} /> المراكز الصحية بانتظار التقييم</div>
                  <div className="kpi-value">{totalHCVal - evaluatedHCVal}</div>
                  <div className="kpi-sub">مركز لم يتم تقييمه بعد</div>
                  <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${totalHCVal > 0 ? ((totalHCVal-evaluatedHCVal)/totalHCVal)*100 : 0}%` }} /></div>
                </div>
              </div>
            </>
          )}

          {/* Quick Actions */}
          <div className="p-md bg-card rounded-lg border border-color flex items-center justify-between">
            <div>
              <h4 className="text-primary font-bold text-sm">تصدير التقرير الوطني العام</h4>
              <p className="text-secondary text-xs mt-xs">تنزيل ملف الإحصائيات الشامل</p>
            </div>
            <div className="flex gap-sm">
              <button className="btn btn-secondary btn-sm flex items-center gap-xs" onClick={() => handleExportExcel('overview')}><Download size={14} /> Excel</button>
              <button className="btn btn-primary btn-sm flex items-center gap-xs" onClick={handlePrintPDF}><Download size={14} /> PDF</button>
            </div>
          </div>

          {/* Top performers table */}
          {evaluatedHCVal > 0 && (
            <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <div style={{ padding: 'var(--space-md) var(--space-lg)', background: 'rgba(15,23,42,0.03)', borderBottom: '1px solid var(--border-color)' }}>
                <span className="text-primary font-bold text-xs">🏆 أفضل المراكز الصحية أداءً على المستوى الوطني</span>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'right' }}>#</th>
                    <th style={{ textAlign: 'right' }}>المركز الصحي</th>
                    <th style={{ textAlign: 'right' }}>الدائرة / القطاع</th>
                    <th style={{ textAlign: 'center' }}>الخدمة 40%</th>
                    <th style={{ textAlign: 'center' }}>المؤشرات 60%</th>
                    <th style={{ textAlign: 'center' }}>النتيجة النهائية</th>
                  </tr>
                </thead>
                <tbody>
                  {allHealthCenters.filter(c => c.status === 'evaluated').sort((a,b) => b.score - a.score).slice(0, 5).map((c, idx) => (
                    <tr key={c.id}>
                      <td style={{ color: idx === 0 ? '#f59e0b' : 'var(--text-muted)', fontWeight: 800 }}>{idx + 1}</td>
                      <td style={{ fontWeight: 700 }}>{c.name}</td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: 10 }}>{c.directorateName} • {c.sectorName}</td>
                      <td style={{ textAlign: 'center', fontWeight: 800, color: '#3b82f6' }}>{c.serviceScore}</td>
                      <td style={{ textAlign: 'center', fontWeight: 800, color: '#ef4444' }}>{c.indicatorScore}</td>
                      <td style={{ textAlign: 'center' }}><ScoreBadge score={c.score} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 🏢 TAB 2: DIRECTORATES REPORTS */}
      {activeSubTab === 'directorates' && (
        <div className="flex flex-col gap-md">
          {/* Header filters */}
          <div className="p-md bg-card rounded-lg border border-color flex flex-col gap-sm">
            <div className="grid cols-3 gap-sm">
              <div>
                <label className="text-xxs text-secondary block mb-xs">الدائرة الصحية</label>
                <select
                  className="form-select py-xs text-xs"
                  value={selectedDirId}
                  onChange={(e) => {
                    setSelectedDirId(e.target.value);
                    setSelectedSectorId('all');
                  }}
                >
                  <option value="all">كل الدوائر الصحية...</option>
                  {directorates.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xxs text-secondary block mb-xs">الالقطاع الصحي</label>
                <select
                  className="form-select py-xs text-xs"
                  disabled={selectedDirId === 'all'}
                  value={selectedSectorId}
                  onChange={(e) => setSelectedSectorId(e.target.value)}
                >
                  <option value="all">كل القطاعات...</option>
                  {selectedDirId !== 'all' && directorates.find(d => d.id === parseInt(selectedDirId))?.sectors.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xxs text-secondary block mb-xs">الترتيب والفرز</label>
                <select
                  className="form-select py-xs text-xs"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="none">ترتيب افتراضي</option>
                  <option value="highest">التقييم الأعلى</option>
                  <option value="lowest">التقييم الأدنى</option>
                </select>
              </div>
            </div>

            <div className="search-box mt-xs">
              <Search className="search-box-icon" />
              <input
                type="text"
                placeholder="ابحث بالاسم أو القطاع..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Subtabs: Health vs Specialized */}
          <div className="flex gap-sm border-b border-color/40 pb-sm">
            <button
              className={`btn btn-sm ${dirSubTab === 'health' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setDirSubTab('health')}
            >
              المراكز الصحية العامة ({filteredHCs.length})
            </button>
            <button
              className={`btn btn-sm ${dirSubTab === 'specialized' ? 'btn-purple' : 'btn-secondary'}`}
              onClick={() => setDirSubTab('specialized')}
            >
              المراكز التخصصية ({filteredSpecs.length})
            </button>
          </div>

          {/* 1. HEALTH CENTERS REPORT */}
          {dirSubTab === 'health' && (
            <div className="flex flex-col gap-lg">
              
              {/* Clustered Bar Chart matching PDF page 2 */}
              {chartData.length > 0 ? (
                <div className="chart-container">
                  <h3 className="chart-title flex items-center gap-sm">
                    <BarChart3 size={16} className="text-accent-green" /> مقارنة مؤشر الخدمة 40% والمؤشرات 60% للمراكز
                  </h3>
                  <div style={{ width: '100%', height: 260, direction: 'ltr' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 20, right: 0, left: -25, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={9} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={9} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f1d32', borderColor: 'rgba(255,255,255,0.08)', color: '#f1f5f9', fontFamily: 'Cairo' }} />
                        <Legend wrapperStyle={{ fontFamily: 'Cairo', fontSize: 10 }} />
                        <Bar dataKey="الخدمة 40%" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="المؤشرات 60%" fill="#ef4444" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="النتيجة الكلية 100%" fill="#10b981" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <div className="badge badge-orange py-md justify-center">لا توجد مراكز مقيّمة حالياً لمطابقتها في المخطط البياني</div>
              )}

              <div className="flex flex-col gap-sm">
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold text-xs">جدول نتائج تقييم المراكز الصحية — الخدمة 40% والمؤشرات 60%</span>
                  <div className="flex gap-sm">
                    <button className="btn btn-secondary btn-sm flex items-center gap-xs" onClick={() => handleExportExcel('health')}>
                      <Download size={12} /> Excel
                    </button>
                    <button className="btn btn-primary btn-sm flex items-center gap-xs" onClick={handlePrintPDF}>
                      <Download size={12} /> PDF
                    </button>
                  </div>
                </div>

                <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table className="data-table" style={{ minWidth: 580 }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'right' }}>اسم القطاع</th>
                          <th style={{ textAlign: 'right' }}>اسم المركز</th>
                          <th style={{ textAlign: 'center' }}>الخدمة المقدمة<br/><span style={{ fontWeight: 400, opacity: 0.7 }}>40%</span></th>
                          <th style={{ textAlign: 'center' }}>نتيجة المؤشرات<br/><span style={{ fontWeight: 400, opacity: 0.7 }}>60%</span></th>
                          <th style={{ textAlign: 'center' }}>النتيجة النهائية<br/><span style={{ fontWeight: 400, opacity: 0.7 }}>100%</span></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredHCs.length === 0 ? (
                          <tr><td colSpan={5} style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--text-secondary)' }}>لا توجد بيانات مطابقة للبحث.</td></tr>
                        ) : filteredHCs.map((c) => (
                          <tr key={c.id}>
                            <td style={{ textAlign: 'right', fontWeight: 700 }}>{c.sectorName}</td>
                            <td style={{ textAlign: 'right', fontWeight: 600 }}>{c.name}</td>
                            <td style={{ textAlign: 'center', fontWeight: 800, color: '#3b82f6' }}>
                              {c.status === 'evaluated' ? c.serviceScore : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                            </td>
                            <td style={{ textAlign: 'center', fontWeight: 800, color: '#ef4444' }}>
                              {c.status === 'evaluated' ? c.indicatorScore : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <ScoreBadge score={c.status === 'evaluated' ? c.score : null} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. SPECIALIZED CENTERS REPORT */}
          {dirSubTab === 'specialized' && (
            <div className="flex flex-col gap-sm">
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold text-xs">جدول نتائج تقييم المراكز التخصصية — المرحلة الأولى 50% والثانية 50%</span>
                <div className="flex gap-sm">
                  <button className="btn btn-secondary btn-sm flex items-center gap-xs" onClick={() => handleExportExcel('specialized')}>
                    <Download size={12} /> Excel
                  </button>
                  <button className="btn btn-purple btn-sm flex items-center gap-xs" onClick={handlePrintPDF}>
                    <Download size={12} /> PDF
                  </button>
                </div>
              </div>

              <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table" style={{ minWidth: 560 }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'right' }}>دائرة الصحة</th>
                        <th style={{ textAlign: 'right' }}>المركز التخصصي</th>
                        <th style={{ textAlign: 'center' }}>الملاك والسجلات<br/><span style={{ fontWeight: 400, opacity: 0.7 }}>50%</span></th>
                        <th style={{ textAlign: 'center' }}>الأجهزة والوقاية<br/><span style={{ fontWeight: 400, opacity: 0.7 }}>50%</span></th>
                        <th style={{ textAlign: 'center' }}>النتيجة النهائية<br/><span style={{ fontWeight: 400, opacity: 0.7 }}>100%</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSpecs.length === 0 ? (
                        <tr><td colSpan={5} style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--text-secondary)' }}>لا توجد بيانات مطابقة للبحث.</td></tr>
                      ) : filteredSpecs.map((c) => (
                        <tr key={c.id}>
                          <td style={{ textAlign: 'right' }}>{c.directorateName}</td>
                          <td style={{ textAlign: 'right', fontWeight: 700 }}>{c.name}</td>
                          <td style={{ textAlign: 'center', fontWeight: 800, color: '#a855f7' }}>
                            {c.status === 'evaluated' ? c.stage1Score : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                          </td>
                          <td style={{ textAlign: 'center', fontWeight: 800, color: '#f59e0b' }}>
                            {c.status === 'evaluated' ? c.stage2Score : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <ScoreBadge score={c.status === 'evaluated' ? c.score : null} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ⚠️ TAB 3: DEVIATIONS / FAILURES REPORT (PDF Page 3) */}
      {activeSubTab === 'deviations' && (
        <div className="flex flex-col gap-md">
          {/* Header filters */}
          <div className="p-md bg-card rounded-lg border border-color flex flex-col gap-sm">
            <div className="grid cols-3 gap-sm">
              <div>
                <label className="text-xxs text-secondary block mb-xs">الدائرة الصحية</label>
                <select
                  className="form-select py-xs text-xs"
                  value={selectedDirId}
                  onChange={(e) => {
                    setSelectedDirId(e.target.value);
                    setSelectedSectorId('all');
                  }}
                >
                  <option value="all">كل الدوائر الصحية...</option>
                  {directorates.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xxs text-secondary block mb-xs">القطاع الصحي</label>
                <select
                  className="form-select py-xs text-xs"
                  disabled={selectedDirId === 'all'}
                  value={selectedSectorId}
                  onChange={(e) => setSelectedSectorId(e.target.value)}
                >
                  <option value="all">كل القطاعات...</option>
                  {selectedDirId !== 'all' && directorates.find(d => d.id === parseInt(selectedDirId))?.sectors.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end justify-end gap-sm">
                <button className="btn btn-secondary text-xxs py-xs px-md flex items-center gap-xs" onClick={() => handleExportExcel('deviations')}>
                  <Download size={14} /> تصدير Excel
                </button>
                <button className="btn btn-primary text-xxs py-xs px-md flex items-center gap-xs" onClick={handlePrintPDF}>
                  <Download size={14} /> تصدير PDF
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-sm">
            <div className="flex justify-between items-center px-xs">
              <span className="text-secondary text-xxs font-bold">جدول حيود ومشاكل مؤشرات المراكز الصحية (الحيود الميدانية):</span>
              <span className="badge badge-red font-bold text-xxs">مؤشر حيود ❌ يعني فشل/عطل المؤشر الميداني</span>
            </div>

            <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }} className="bg-card/40">
              <table style={{ width: '100%', minWidth: '1000px', borderCollapse: 'collapse', textAlign: 'center', fontSize: '11px' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: 'var(--space-md)', textAlign: 'right', fontWeight: '700', color: 'var(--text-secondary)' }}>القطاع</th>
                    <th style={{ padding: 'var(--space-md)', textAlign: 'right', fontWeight: '700', color: 'var(--text-secondary)' }}>اسم المركز</th>
                    <th style={{ padding: 'var(--space-md)', fontWeight: '700', color: 'var(--text-secondary)' }}>كرسي الأسنان</th>
                    <th style={{ padding: 'var(--space-md)', fontWeight: '700', color: 'var(--text-secondary)' }}>جهاز الأشعة</th>
                    <th style={{ padding: 'var(--space-md)', fontWeight: '700', color: 'var(--text-secondary)' }}>المواد الطبية</th>
                    <th style={{ padding: 'var(--space-md)', fontWeight: '700', color: 'var(--text-secondary)' }}>الثلاجة</th>
                    <th style={{ padding: 'var(--space-md)', fontWeight: '700', color: 'var(--text-secondary)' }}>السجل اليومي</th>
                    <th style={{ padding: 'var(--space-md)', fontWeight: '700', color: 'var(--text-secondary)' }}>سجل الصرف</th>
                    <th style={{ padding: 'var(--space-md)', fontWeight: '700', color: 'var(--text-secondary)' }}>سجل الإحالة</th>
                    <th style={{ padding: 'var(--space-md)', fontWeight: '700', color: 'var(--text-secondary)' }}>برنامج العناية</th>
                    <th style={{ padding: 'var(--space-md)', fontWeight: '700', color: 'var(--text-secondary)' }}>ورش البرنامج</th>
                    <th style={{ padding: 'var(--space-md)', fontWeight: '700', color: 'var(--text-secondary)' }}>جهاز التعقيم</th>
                    <th style={{ padding: 'var(--space-md)', fontWeight: '700', color: 'var(--text-secondary)' }}>الوقاية الشخصية</th>
                    <th style={{ padding: 'var(--space-md)', fontWeight: '700', color: 'var(--text-secondary)' }}>النفايات الطبية</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHCs.length === 0 ? (
                    <tr>
                      <td colSpan="14" style={{ padding: 'var(--space-xl)', color: 'var(--text-secondary)', textAlign: 'center' }}>لا توجد بيانات مطابقة للبحث.</td>
                    </tr>
                  ) : (
                    filteredHCs.map((c) => (
                      <tr key={c.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color var(--transition-normal)' }} className="hover:bg-card-hover">
                        <td style={{ padding: 'var(--space-md)', textAlign: 'right', fontWeight: 'bold' }}>{c.sectorName}</td>
                        <td style={{ padding: 'var(--space-md)', textAlign: 'right', color: 'var(--text-primary)', fontWeight: 'semibold' }}>{c.name}</td>
                        <td style={{ padding: 'var(--space-md)' }}>{renderDeviationBadge(c.answers, 'q_chair')}</td>
                        <td style={{ padding: 'var(--space-md)' }}>{renderDeviationBadge(c.answers, 'q_xray')}</td>
                        <td style={{ padding: 'var(--space-md)' }}>{renderDeviationBadge(c.answers, 'q_materials', true)}</td>
                        <td style={{ padding: 'var(--space-md)' }}>{renderDeviationBadge(c.answers, 'q_fridge')}</td>
                        <td style={{ padding: 'var(--space-md)' }}>{renderDeviationBadge(c.answers, 'q_daily_reg')}</td>
                        <td style={{ padding: 'var(--space-md)' }}>{renderDeviationBadge(c.answers, 'q_spend_reg')}</td>
                        <td style={{ padding: 'var(--space-md)' }}>{renderDeviationBadge(c.answers, 'q_referrals')}</td>
                        <td style={{ padding: 'var(--space-md)' }}>{renderDeviationBadge(c.answers, 'q_ocp_card')}</td>
                        <td style={{ padding: 'var(--space-md)' }}>{renderDeviationBadge(c.answers, 'q_ocp_workshop')}</td>
                        <td style={{ padding: 'var(--space-md)' }}>{renderDeviationBadge(c.answers, 'q_inf_autoclave')}</td>
                        <td style={{ padding: 'var(--space-md)' }}>{renderDeviationBadge(c.answers, 'q_inf_prec')}</td>
                        <td style={{ padding: 'var(--space-md)' }}>{renderDeviationBadge(c.answers, 'q_inf_waste')}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 🤖 TAB 4: AI REPORT GENERATION */}
      {activeSubTab === 'ai' && (
        <div className="flex flex-col gap-md" style={{ height: 'calc(100vh - 280px)', minHeight: '400px' }}>
          
          {/* Chat Window */}
          <div className="flex-1 bg-card/40 border border-color rounded-lg p-md overflow-y-auto flex flex-col gap-md" style={{ maxHeight: '100%' }}>
            {chatHistory.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-sm max-w-xl ${msg.role === 'user' ? 'align-self-start flex-row-reverse' : 'align-self-end'}`}
                style={{ alignSelf: msg.role === 'user' ? 'flex-start' : 'flex-end' }}
              >
                <div className={`user-avatar ${msg.role === 'user' ? 'green' : 'purple'} font-bold text-xs`} style={{ width: 28, height: 28, flexShrink: 0 }}>
                  {msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
                </div>
                <div className={`p-md rounded-lg text-xs leading-relaxed border ${
                  msg.role === 'user' 
                    ? 'bg-card border-color/40 text-primary rounded-tr-none' 
                    : 'bg-secondary/40 border-color/30 text-secondary rounded-tl-none'
                }`} style={{ whiteSpace: 'pre-line' }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isAiLoading && (
              <div className="flex gap-sm align-self-end">
                <div className="user-avatar purple font-bold text-xs" style={{ width: 28, height: 28 }}>
                  <Sparkles size={14} />
                </div>
                <div className="p-md rounded-lg text-xs bg-secondary/20 border border-color/20 text-secondary">
                  جاري صياغة وتحليل التقرير الذكي... ⏳
                </div>
              </div>
            )}
          </div>

          {/* Input Chat Box */}
          <form onSubmit={handleAiSend} className="flex gap-sm items-center p-sm bg-card rounded-md border border-color/60">
            <input
              type="text"
              placeholder="اطلب تقريراً مخصصاً (مثال: تقرير قطاع الكاظمية)..."
              className="form-input flex-1 py-xs"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              disabled={isAiLoading}
            />
            <button type="submit" className="btn btn-primary btn-sm flex items-center justify-center" disabled={isAiLoading || !aiPrompt.trim()}>
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
