import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { loginUser } from '../data/store';
import Modal from '../components/ui/Modal';
import { 
  Shield, 
  Stethoscope, 
  Building2, 
  ChevronLeft, 
  UserCheck, 
  Lock, 
  Eye,
  CheckCircle
} from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

  // Modal selector states
  const [modalType, setModalType] = useState(null); // null, 'health', 'specialized'
  const [loginError, setLoginError] = useState('');

  const handleAdminLogin = () => {
    const session = loginUser('admin', 'admin123');
    if (session) {
      navigate('/admin');
    }
  };

  const handleMockLogin = (username) => {
    const session = loginUser(username, '123456'); // All mock evaluators use 123456
    if (session) {
      setModalType(null);
      if (session.specialization === 'health') {
        navigate('/health-eval');
      } else {
        navigate('/specialized-eval');
      }
    } else {
      setLoginError('فشل تسجيل الدخول التلقائي للمستخدم');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="login-page">
      {/* Animated Background shapes */}
      <div className="login-bg">
        <div className="login-bg-shape" />
        <div className="login-bg-shape" />
        <div className="login-bg-shape" />
      </div>

      <motion.div
        className="login-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Ministry Logo */}
        <motion.div className="login-logo" variants={itemVariants}>
          <Shield size={36} className="text-white" />
        </motion.div>

        {/* Title */}
        <motion.h1 className="login-title" variants={itemVariants}>
          منصة التقييم الصحي
        </motion.h1>

        {/* Subtitle */}
        <motion.p className="login-subtitle" variants={itemVariants}>
          وزارة الصحة العراقية
          <br />
          نظام تقييم المراكز الصحية والتخصصية لطب الأسنان
        </motion.p>

        {/* Quick Access Buttons */}
        <motion.div className="login-buttons" variants={itemVariants}>
          <button
            className="login-btn blue"
            onClick={handleAdminLogin}
          >
            <div className="login-btn-icon">
              <Shield size={22} />
            </div>
            <div className="login-btn-text">
              <h3>إدارة النظام والإحصائيات</h3>
              <p>حساب الإدارة والتحكم في الدوائر والمستخدمين</p>
            </div>
            <ChevronLeft className="login-btn-arrow" size={20} />
          </button>

          <button
            className="login-btn green"
            onClick={() => {
              setLoginError('');
              setModalType('health');
            }}
          >
            <div className="login-btn-icon">
              <Stethoscope size={22} />
            </div>
            <div className="login-btn-text">
              <h3>تقييم المراكز الصحية</h3>
              <p>تقييم المراكز العامة التي تحتوي على عيادة أسنان</p>
            </div>
            <ChevronLeft className="login-btn-arrow" size={20} />
          </button>

          <button
            className="login-btn purple"
            onClick={() => {
              setLoginError('');
              setModalType('specialized');
            }}
          >
            <div className="login-btn-icon">
              <Building2 size={22} />
            </div>
            <div className="login-btn-text">
              <h3>تقييم المراكز التخصصية</h3>
              <p>زيارة وتقييم عيادات الأسنان التخصصية والمستشفيات</p>
            </div>
            <ChevronLeft className="login-btn-arrow" size={20} />
          </button>
        </motion.div>

        {/* Footer */}
        <motion.div className="login-footer" variants={itemVariants}>
          <p>وزارة الصحة العراقية • دائرة الأمور الفنية</p>
          <p className="text-secondary mt-xs" style={{ fontSize: '10px' }}>
            جمهورية العراق © 2024
          </p>
        </motion.div>
      </motion.div>

      {/* Mock User Selector Modal */}
      <Modal 
        isOpen={!!modalType} 
        onClose={() => setModalType(null)} 
        title={modalType === 'health' ? 'دخول بوابة تقييم المراكز الصحية' : 'دخول بوابة تقييم المراكز التخصصية'}
        size="small"
      >
        <div className="modal-body flex flex-col gap-md">
          <p className="text-secondary text-xs text-center mb-sm">
            يرجى اختيار أحد حسابات المقيّمين التجريبية المخولة للتسجيل الفوري:
          </p>

          {loginError && (
            <div className="badge badge-red py-sm w-full justify-center mb-sm">
              {loginError}
            </div>
          )}

          {modalType === 'health' ? (
            <div className="flex flex-col gap-sm">
              <button 
                className="list-item text-right justify-between w-full p-md hover:bg-card-hover"
                onClick={() => handleMockLogin('eval_health1')}
              >
                <div className="flex items-center gap-md">
                  <div className="user-avatar green font-bold" style={{ width: 32, height: 32 }}>م</div>
                  <div>
                    <span className="font-bold text-sm text-primary block">محمد حسين الجبوري</span>
                    <span className="text-secondary text-xxs block mt-xs">دائرة المخولة: صلاح الدين</span>
                  </div>
                </div>
                <UserCheck size={18} className="text-accent-green-light" />
              </button>

              <button 
                className="list-item text-right justify-between w-full p-md hover:bg-card-hover"
                onClick={() => handleMockLogin('eval_health2')}
              >
                <div className="flex items-center gap-md">
                  <div className="user-avatar green font-bold" style={{ width: 32, height: 32 }}>ف</div>
                  <div>
                    <span className="font-bold text-sm text-primary block">فاطمة عبد الرزاق</span>
                    <span className="text-secondary text-xxs block mt-xs">الدوائر المخولة: البصرة، صلاح الدين</span>
                  </div>
                </div>
                <UserCheck size={18} className="text-accent-green-light" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-sm">
              <button 
                className="list-item text-right justify-between w-full p-md hover:bg-card-hover"
                onClick={() => handleMockLogin('eval_spec1')}
              >
                <div className="flex items-center gap-md">
                  <div className="user-avatar purple font-bold" style={{ width: 32, height: 32 }}>ع</div>
                  <div>
                    <span className="font-bold text-sm text-primary block">علي كاظم الموسوي</span>
                    <span className="text-secondary text-xxs block mt-xs">الدائرة المخولة: بغداد / الرصافة</span>
                  </div>
                </div>
                <UserCheck size={18} className="text-accent-purple-light" />
              </button>

              <button 
                className="list-item text-right justify-between w-full p-md hover:bg-card-hover"
                onClick={() => handleMockLogin('eval_spec2')}
              >
                <div className="flex items-center gap-md">
                  <div className="user-avatar purple font-bold" style={{ width: 32, height: 32 }}>ز</div>
                  <div>
                    <span className="font-bold text-sm text-primary block">زينب حسن البصري</span>
                    <span className="text-secondary text-xxs block mt-xs">الدوائر المخولة: البصرة، بغداد الرصافة</span>
                  </div>
                </div>
                <UserCheck size={18} className="text-accent-purple-light" />
              </button>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary btn-full" onClick={() => setModalType(null)}>إلغاء</button>
        </div>
      </Modal>
    </div>
  );
}
