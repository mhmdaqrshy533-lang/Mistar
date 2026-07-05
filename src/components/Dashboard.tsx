/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { 
  FileText, 
  Printer, 
  Calendar, 
  UserX, 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Contact2, 
  TrendingUp, 
  Award, 
  Library, 
  Mail, 
  Calculator, 
  School, 
  Gamepad2,
  Youtube,
  Send,
  MessageCircle,
  HelpCircle,
  Settings,
  Lock,
  Brain,
  Sparkles,
  AlertTriangle,
  Trophy,
  Activity,
  Zap,
  ScanLine,
  ChevronLeft,
  FileSpreadsheet
} from 'lucide-react';
import { Section } from '../types';

export const sections: Section[] = [
  { id: 'exams', title: 'محرر امتحانات', icon: 'FileText', description: 'اشتقاق ونمذجة الأسئلة', color: 'bg-indigo-500' },
  { id: 'automation', title: 'محرر أتمتة', icon: 'ScanLine', description: 'توليد وتصحيح بابل شيت بالكاميرا', color: 'bg-purple-500' },
  { id: 'monthly', title: 'المحصلات الشهرية', icon: 'Activity', description: 'إدخال درجات وتحليل مستوى الفصل', color: 'bg-blue-500' },
  { id: 'daily', title: 'الخطة اليومية', icon: 'BookOpen', description: 'توليد السيناريو والأهداف', color: 'bg-cyan-500' },
  { id: 'term_plan', title: 'الخطة الفصلية', icon: 'Calendar', description: 'توزيع المنهج تلقائياً', color: 'bg-teal-500' },
  { id: 'attendance', title: 'غياب الطلاب', icon: 'UserX', description: 'رصد ذكي وتحليل تسرب', color: 'bg-rose-500' },
  { id: 'results', title: 'النتائج النهائية', icon: 'GraduationCap', description: 'حساب المعدلات وتقارير وصفية', color: 'bg-amber-500' },
  { id: 'student_cards', title: 'بطاقات طلابية', icon: 'Contact2', description: 'هويات الطلاب مع كود QR', color: 'bg-orange-500' },
  { id: 'progress_cards', title: 'بطاقات التقدم', icon: 'TrendingUp', description: 'تقارير أداء دورية', color: 'bg-emerald-500' },
  { id: 'certificates', title: 'الشهادات', icon: 'Award', description: 'شهائد بقوالب رسمية', color: 'bg-pink-500' },
  { id: 'book_editor', title: 'محرر الكتب', icon: 'Library', description: 'تلاخيص والملازم المدرسية', color: 'bg-sky-500' },
  { id: 'official_memos', title: 'مذكرات رسمية', icon: 'Mail', description: 'صياغة خطابات إدارية ذكية', color: 'bg-slate-700' },
  { id: 'accounting', title: 'المحاسب المدرسي', icon: 'Calculator', description: 'الرسوم والإحصائيات المالية', color: 'bg-lime-600' },
  { id: 'multi_school', title: 'مدارس أخرى', icon: 'School', description: 'إدارة أكثر من مدرسة ومقارنات', color: 'bg-violet-500' },
  { id: 'toolbox', title: 'إضافي', icon: 'Gamepad2', description: 'صندوق أدوات وألعاب صفية', color: 'bg-fuchsia-500' }
];

const iconMap: Record<string, any> = {
  FileText, Printer, Calendar, UserX, LayoutDashboard, BookOpen, GraduationCap, Contact2, TrendingUp, Award, Library, Mail, Calculator, School, Gamepad2, Zap, Activity, ScanLine, Brain, FileSpreadsheet
};

import { useGamification } from '../core/GamificationSystem';

export default function Dashboard({ onSelect, onOpenBadges }: { onSelect: (id: string) => void, onOpenBadges: () => void }) {
  const { progress, showCelebration, addProgress } = useGamification();

  const completeTask = () => {
    addProgress(15);
  };

  const strokeDashoffset = 125.6 - (125.6 * progress) / 100;

  return (
    <div className="min-h-screen bg-purple-50/30 pb-12 select-none relative">
      <AnimatePresence>
        {showCelebration && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-purple-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-3xl p-8 flex flex-col items-center shadow-[0_0_100px_#facc15]"
            >
               <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-4 relative">
                 <div className="absolute inset-0 rounded-full animate-ping bg-yellow-400 opacity-20" />
                 <Trophy className="text-yellow-500" size={48} />
               </div>
               <h2 className="text-3xl font-black text-purple-900 mb-2">بطل الإنجاز!</h2>
               <p className="text-purple-600 font-bold">أتممت 100% من مهامك اليومية بامتياز.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ERP Header Section */}
      <header className="bg-slate-900 text-white pt-12 pb-32 px-6 shadow-xl relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="text-center md:text-right flex items-center gap-6">
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 hidden md:block shadow-2xl relative">
              {progress === 100 && (
                <div className="absolute -inset-2 bg-indigo-500 rounded-2xl blur-xl opacity-40 animate-pulse" />
              )}
              <div className="w-20 h-20 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-4xl border border-slate-700 shadow-inner relative overflow-hidden group">
                <Activity className="text-indigo-500" size={40} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">Offline-First Engine</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                مِسْطار <span className="text-indigo-400">ERP</span>
              </h1>
              <p className="text-slate-400 font-medium text-lg max-w-md leading-relaxed">
                عقل إداري خوارزمي. معالجة بيانات صامتة وقرارات استباقية.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-3 bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-lg">
             <div className="relative w-24 h-24 flex items-center justify-center group cursor-pointer" onClick={completeTask}>
               {/* Background circle */}
               <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
                 <circle cx="22" cy="22" r="20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                 <motion.circle 
                   cx="22" cy="22" r="20" 
                   fill="none" 
                   stroke={progress === 100 ? "#6366f1" : "#475569"} 
                   strokeWidth="4" 
                   strokeLinecap="round"
                   strokeDasharray="125.6"
                   animate={{ strokeDashoffset }}
                   transition={{ duration: 1, ease: "easeOut" }}
                   className={progress === 100 ? "drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" : ""}
                 />
               </svg>
               <div className="text-center z-10">
                 <span className="text-xl font-black">{progress}%</span>
               </div>
               {/* Hover tooltip hint */}
               <div className="absolute -bottom-8 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                 اضغط لرفع معدل المعالجة
               </div>
             </div>
             <button 
               onClick={onOpenBadges}
               className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors bg-slate-900 px-3 py-1.5 rounded-full border border-slate-700"
             >
               <Activity size={14} />
               سجلات النظام
             </button>
          </div>
        </div>
      </header>

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto -mt-10 px-6 relative z-20">
        <div className="bg-white p-3 rounded-2xl shadow-xl flex justify-between items-center gap-2 border border-purple-100">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-colors font-bold">
            <Youtube size={20} />
            <span className="hidden sm:inline">يوتيوب</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition-colors font-bold">
            <Send size={20} />
            <span className="hidden sm:inline">تليجرام</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-50 text-green-600 border border-green-100 hover:bg-green-100 transition-colors font-bold">
            <MessageCircle size={20} />
            <span className="hidden sm:inline">واتساب</span>
          </button>
          <div className="h-8 w-px bg-purple-100 mx-2" />
          <button className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center hover:bg-purple-100 transition-colors border border-purple-100">
            <HelpCircle size={22} />
          </button>
          <button className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center hover:bg-purple-100 transition-colors border border-purple-100">
            <Settings size={22} />
          </button>
          <button className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/30">
            <Lock size={22} />
          </button>
        </div>
      </div>

      {/* AI Insights Banner */}
      <div className="max-w-6xl mx-auto mt-8 px-6">
        <div className="bg-gradient-to-l from-indigo-900 to-purple-800 rounded-3xl p-6 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border border-purple-500/30">
          <div className="absolute -left-12 -top-12 text-white/5 rotate-12 pointer-events-none">
            <Brain size={160} />
          </div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
              <AlertTriangle className="text-yellow-400" size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                تنبؤ سلوكي استباقي 
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-mono text-purple-100">AI</span>
              </h3>
              <p className="text-purple-200 text-sm leading-relaxed max-w-2xl">
                الطالب "أمير الخضر حسين" يعاني من تراجع مستمر في مادة الرياضيات (معدل الانحدار 15%). أقترح إجراء حصة تقوية في موضوع "المعادلات الخطية" بناءً على مستواه في الشهر الماضي لتفادي رسوبه المتوقع.
              </p>
            </div>
          </div>
          <button 
            onClick={() => onSelect('tools')}
            className="bg-white text-purple-900 px-6 py-3 rounded-xl font-black shadow-lg hover:shadow-xl transition-all whitespace-nowrap z-10"
          >
            فتح المستشار التربوي
          </button>
        </div>
      </div>

      {/* Grid View */}
      <main className="max-w-6xl mx-auto mt-10 px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-purple-600 rounded-full" />
            الأقسام الذكية
          </h2>
          <span className="bg-purple-100 text-purple-800 border border-purple-200 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">15 قسم</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {sections.map((section, index) => {
            const Icon = iconMap[section.icon];
            const isAI = ['exams', 'vision_grading', 'attendance', 'daily', 'tools'].includes(section.id);
            return (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelect(section.id)}
                className={`group relative bg-white p-5 rounded-3xl shadow-sm hover:shadow-xl border ${isAI ? 'border-purple-200 shadow-purple-900/5' : 'border-purple-100'} transition-all text-center flex flex-col items-center gap-4 cursor-pointer`}
              >
                {isAI && (
                  <div className="absolute top-3 right-3 text-purple-500 animate-pulse">
                    <Sparkles size={16} />
                  </div>
                )}
                <div className={`p-4 rounded-2xl ${section.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-[15px] mb-1.5">{section.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-3 left-0 right-0 px-2 pointer-events-none">
                    {section.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
