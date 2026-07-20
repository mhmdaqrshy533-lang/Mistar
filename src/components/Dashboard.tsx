/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  FileSignature, 
  GraduationCap, 
  UserCheck, 
  Archive, 
  Bell, 
  Settings, 
  Plus,
  FileText,
  Users,
  Clock,
  BookOpen,
  Award,
  ChevronLeft
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard({ onSelect, onOpenBadges }: { onSelect: (id: string) => void, onOpenBadges: () => void }) {
  return (
    <div className="p-6 md:p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">مرحباً بك، أ. محمد</h2>
          <p className="text-slate-500 font-medium">إليك نظرة شاملة على نشاطك التعليمي ومستنداتك.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onSelect('exams_section')}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-bold transition-all shadow-xl shadow-slate-900/10 active:scale-95"
          >
            <Plus size={18} /> إنشاء اختبار جديد
          </button>
          <button 
            className="p-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
          >
            <Bell size={20} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'الاختبارات المنشأة', value: '42', icon: FileSignature, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'الطلاب النشطون', value: '340', icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'الوثائق الإدارية', value: '12', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'كشوف الدرجات', value: '18', icon: GraduationCap, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
            <div className="text-3xl font-black text-slate-800 mb-1">{stat.value}</div>
            <div className="text-sm font-bold text-slate-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Quick Access */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
              <Clock className="text-slate-400" size={24} />
              المستندات الأخيرة
            </h3>
            <button className="text-sm font-bold text-violet-600 hover:underline">عرض الكل</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'اختبار الرياضيات - نصف الفصل', type: 'اختبار وزاري', date: 'منذ ساعتين', theme: 'blue' },
              { title: 'كشف درجات الصف التاسع (أ)', type: 'كشف درجات', date: 'أمس', theme: 'emerald' },
              { title: 'سجل غياب شهر أكتوبر', type: 'حضور وغياب', date: 'منذ يومين', theme: 'amber' },
              { title: 'مذكرة استدعاء ولي أمر', type: 'وثيقة رسمية', date: 'منذ 3 أيام', theme: 'rose' },
            ].map((doc, i) => (
              <div key={i} className="bg-white border border-slate-200 p-5 rounded-3xl hover:border-violet-400 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-14 rounded-xl border-2 border-slate-100 flex items-center justify-center bg-slate-50 group-hover:border-violet-100 transition-colors`}>
                    <FileText size={24} className="text-slate-300 group-hover:text-violet-400 transition-colors" />
                  </div>
                  <div className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded-lg uppercase tracking-widest">{doc.date}</div>
                </div>
                <h4 className="font-black text-slate-800 mb-1 group-hover:text-violet-600 transition-colors">{doc.title}</h4>
                <p className="text-xs font-bold text-slate-400">{doc.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Categories / Sections */}
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-slate-800">الأقسام</h3>
          <div className="space-y-3">
            {[
              { id: 'exams_section', label: 'استوديو الامتحانات', icon: FileSignature, color: 'text-blue-600', bg: 'bg-blue-50' },
              { id: 'document_editor', label: 'الوثائق والتقارير', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { id: 'grades_section', label: 'إدارة الدرجات', icon: GraduationCap, color: 'text-rose-600', bg: 'bg-rose-50' },
              { id: 'attendance_section', label: 'الحضور والغياب', icon: UserCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
              { id: 'archive_section', label: 'أرشيف المعلم', icon: Archive, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            ].map((section) => (
              <button 
                key={section.id}
                onClick={() => onSelect(section.id)}
                className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl ${section.bg} ${section.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <section.icon size={20} />
                  </div>
                  <span className="font-bold text-slate-700">{section.label}</span>
                </div>
                <ChevronLeft size={16} className="text-slate-300 group-hover:text-slate-600 group-hover:-translate-x-1 transition-all" />
              </button>
            ))}
          </div>

          {/* Banner */}
          <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-6 rounded-[2rem] text-white space-y-4 shadow-xl shadow-violet-600/20">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Award size={20} />
            </div>
            <div>
              <h4 className="font-black text-lg">الرقيم AI بريميوم</h4>
              <p className="text-violet-100 text-xs font-medium">احصل على تصحيح آلي فائق السرعة وتوليد ذكي للأسئلة.</p>
            </div>
            <button className="w-full bg-white text-violet-600 py-3 rounded-xl font-black text-sm hover:bg-violet-50 transition-colors">
              ترقية الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

