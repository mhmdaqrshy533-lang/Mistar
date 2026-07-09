/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { 
  FileText, CalendarDays, UserCheck, LayoutDashboard, 
  Users, GraduationCap, Database, Award, Archive, Library, 
  Settings, FileSignature, Trophy, Search, Plus, Bell, HelpCircle,
  Activity, Send, ChevronDown, CheckCircle2, Wifi, HardDrive, Database as DatabaseIcon
} from 'lucide-react';
import { Section } from '../types';

export const sections: (Section & { stat: string })[] = [
  { id: 'exams_section', title: 'إنشاء الامتحانات', icon: 'FileSignature', description: 'إنشاء الامتحانات وأوراق العمل والاختبارات.', stat: 'آخر تعديل: اليوم', color: 'bg-violet-600/20 text-violet-400 border-violet-500/30' },
  { id: 'grades_section', title: 'كشوف الدرجات', icon: 'GraduationCap', description: 'إدارة السجلات الأكاديمية والدرجات.', stat: 'الرصد: مكتمل', color: 'bg-blue-600/20 text-blue-400 border-blue-500/30' },
  { id: 'attendance_section', title: 'الحضور والغياب', icon: 'UserCheck', description: 'إدارة الحضور اليومي وكشوف الغياب.', stat: 'عدد السجلات: 142 سجل', color: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30' },
  { id: 'certificates_section', title: 'الشهادات والنتائج', icon: 'Award', description: 'إصدار الشهادات والتقارير النهائية.', stat: 'تم الإصدار: 320', color: 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30' },
  { id: 'document_editor', title: 'الوثائق الإدارية', icon: 'FileText', description: 'تعاميم ومذكرات ومحاضر رسمية.', stat: 'عدد القوالب: 24 قالب', color: 'bg-purple-600/20 text-purple-400 border-purple-500/30' },
  { id: 'question_bank', title: 'بنك الأسئلة', icon: 'Database', description: 'إدارة وتصنيف الأسئلة المتراكمة.', stat: 'الأسئلة: 5,430', color: 'bg-sky-600/20 text-sky-400 border-sky-500/30' },
  { id: 'archive_section', title: 'الأرشيف والبحث', icon: 'Archive', description: 'أرشفة الوثائق وإمكانية البحث السريع.', stat: 'مؤرشف: 12,453', color: 'bg-slate-600/20 text-slate-400 border-slate-500/30' },
  { id: 'library_section', title: 'القوالب والتصاميم', icon: 'Library', description: 'قوالب جاهزة للطباعة والنشر.', stat: 'جديد: 5 قوالب', color: 'bg-teal-600/20 text-teal-400 border-teal-500/30' },
  { id: 'settings', title: 'الإعدادات وإدارة النظام', icon: 'Settings', description: 'تخصيص النظام وصلاحيات الوصول.', stat: 'التحديثات: جاهز', color: 'bg-gray-600/20 text-gray-400 border-gray-500/30' }
];

const iconMap: Record<string, any> = {
  FileText, FileSignature, UserCheck, GraduationCap, Users, CalendarDays, Database, Award, Archive, Library, Settings
};

export default function Dashboard({ onSelect, onOpenBadges }: { onSelect: (id: string) => void, onOpenBadges: () => void }) {
  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const quickCreateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (quickCreateRef.current && !quickCreateRef.current.contains(event.target as Node)) {
        setShowQuickCreate(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0914] via-[#101223] to-[#0A101D] text-slate-200 font-sans select-none overflow-hidden flex flex-col relative" dir="rtl">
      {/* Dynamic Background Pattern & Glassmorphism elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Top Header */}
      <header className="relative z-30 flex items-center justify-between px-8 py-4 border-b border-white/5 bg-white/[0.02] backdrop-blur-xl">
        <div className="flex items-center gap-6 flex-1">
          {/* Global Search */}
          <div className="relative w-full max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث في الطلاب، الوثائق، الامتحانات، والأرشيف..."
              className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 pr-10 pl-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Quick Create */}
          <div className="relative" ref={quickCreateRef}>
            <button 
              onClick={() => setShowQuickCreate(!showQuickCreate)}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-violet-900/20"
            >
              <Plus size={18} />
              <span>إنشاء سريع</span>
              <ChevronDown size={16} className={`transition-transform ${showQuickCreate ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showQuickCreate && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-[#13182b] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
                >
                  <div className="flex flex-col">
                    <button onClick={() => onSelect('exams_section')} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-right text-sm">
                      <FileSignature size={16} className="text-violet-400" /> امتحان جديد
                    </button>
                    <button onClick={() => onSelect('certificates_section')} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-right text-sm border-t border-white/5">
                      <Award size={16} className="text-blue-400" /> شهادة جديدة
                    </button>
                    <button onClick={() => onSelect('grades_section')} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-right text-sm border-t border-white/5">
                      <GraduationCap size={16} className="text-cyan-400" /> كشف درجات
                    </button>
                    <button onClick={() => onSelect('document_editor')} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-right text-sm border-t border-white/5">
                      <FileText size={16} className="text-teal-400" /> مذكرة إدارية
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition-colors relative">
            <Bell size={18} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
          </button>
          
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition-colors">
            <HelpCircle size={18} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar relative z-20 pb-16">
        <div className="max-w-6xl mx-auto px-8 pt-12 pb-8">
          
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-l from-white to-slate-400 mb-4 tracking-tight">
              الرَّقِيم | الجيل الجديد لإدارة الوثائق التعليمية
            </h1>
            <p className="text-slate-400 text-lg">
              كل ما يحتاجه المعلم والإدارة المدرسية في منصة واحدة.
            </p>
          </div>

          {/* Info Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12 text-xs md:text-sm font-medium">
            <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300">مدرسة اليرموك النموذجية</div>
            <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300">العام الدراسي 2026/2027</div>
            <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300">الفصل الأول</div>
            <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-300">أ.م</div>
              أحمد محمد
            </div>
            <div className="px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center gap-2">
              <Wifi size={14} /> متصل محلياً
            </div>
            <div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={14} /> الحفظ التلقائي مفعل
            </div>
          </div>

          {/* 3x3 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => {
              const Icon = iconMap[section.icon];
              
              return (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onSelect(section.id)}
                  className="group relative flex flex-col items-start p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all text-right cursor-pointer overflow-hidden backdrop-blur-md shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  
                  <div className={`p-4 rounded-xl mb-6 transition-transform duration-300 group-hover:scale-110 ${section.color} border`}>
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-100 mb-2">{section.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                    {section.description}
                  </p>
                  
                  <div className="w-full flex items-center justify-between pt-4 border-t border-white/5 text-xs text-slate-500 font-mono">
                    <span>{section.stat}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

        </div>
      </main>

      {/* Bottom Bar */}
      <footer className="relative z-30 flex items-center justify-between px-6 py-3 border-t border-white/5 bg-[#080b14]/80 backdrop-blur-md text-[11px] text-slate-500 font-mono">
        <div className="flex items-center gap-4">
          <span className="text-slate-400 font-bold">Raqeem OS 1.0</span>
          <span className="flex items-center gap-1.5"><DatabaseIcon size={12} className="text-teal-500" /> SQLite Ready</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><Archive size={12} /> 12,453 Document Archived</span>
          <span className="flex items-center gap-1.5"><HardDrive size={12} /> Storage 12.4 GB</span>
        </div>
      </footer>
    </div>
  );
}
