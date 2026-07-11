import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, Building2, ChevronRight, Lock } from 'lucide-react';

export default function ComingSoon({ type }) {
  const navigate = useNavigate();

  const config = {
    health: {
      color: 'green',
      icon: Stethoscope,
      title: 'بوابة تقييم المراكز الصحية',
    },
    specialized: {
      color: 'purple',
      icon: Building2,
      title: 'بوابة تقييم المراكز التخصصية',
    },
  }[type] || {
    color: 'blue',
    icon: Lock,
    title: 'قسم قيد التطوير',
  };

  const Icon = config.icon;

  return (
    <div className="coming-soon">
      <motion.div
        className={`coming-soon-icon ${config.color}`}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
      >
        <Icon size={40} />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {config.title}
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        هذا القسم قيد التطوير حالياً في إطار المرحلة الثانية من تحديث أنظمة الرقابة الميدانية في وزارة الصحة العراقية. سيتضمن قريباً استمارات واستبيانات تفاعلية كاملة مع شريط تقدم ونظام تقييم تفصيلي.
      </motion.p>

      <motion.button
        className="btn btn-secondary"
        onClick={() => navigate('/')}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <ChevronRight size={18} /> العودة لصفحة الدخول
      </motion.button>
    </div>
  );
}
