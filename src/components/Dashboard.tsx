import React, { useState, useEffect } from 'react';
import { 
  FileSignature, 
  QrCode, 
  GraduationCap, 
  FileSpreadsheet, 
  BookOpen, 
  BarChart3, 
  UserCheck, 
  FileText, 
  ClipboardList, 
  Calendar, 
  Stamp, 
  BookMarked, 
  FlaskConical, 
  LayoutTemplate, 
  Database, 
  Layers, 
  Sparkles, 
  Settings, 
  Search, 
  Star, 
  Clock, 
  Plus, 
  ExternalLink, 
  Shield, 
  Check, 
  ChevronLeft, 
  Code,
  Filter,
  Trash2,
  Printer,
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRole } from '../context/RoleContext';

// Define the core application portal items
interface EducationalApp {
  id: string;
  title: string;
  category: 'exams' | 'docs' | 'affairs' | 'plans' | 'resources';
  categoryLabel: string;
  icon: any;
  colorGradient: string;
  borderColor: string;
  description: string;
  tags: string[];
  actionRoute: string;
  badge?: string;
}

const ALL_EDUCATIONAL_APPS: EducationalApp[] = [
  {
    id: 'exams_section',
    title: 'محرر الامتحانات (RDE)',
    category: 'exams',
    categoryLabel: 'الامتحانات والأتمتة',
    icon: FileSignature,
    colorGradient: 'from-blue-600 to-indigo-700',
    borderColor: 'hover:border-blue-500',
    description: 'استوديو متكامل لإنشاء الامتحانات الوزارية والمدرسية مع توزيع الدرجات والنماذج المتعددة (A-B-C-D).',
    tags: ['امتحانات وزارية', 'نماذج متعددة', 'بنك الأسئلة'],
    actionRoute: 'exams_section',
    badge: 'أساسي'
  },
  {
    id: 'bubble_sheets',
    title: 'نظام الأتمتة (OMR)',
    category: 'exams',
    categoryLabel: 'الامتحانات والأتمتة',
    icon: QrCode,
    colorGradient: 'from-purple-600 to-violet-800',
    borderColor: 'hover:border-purple-500',
    description: 'تصميم وإدارة أوراق إجابة التظليل الآلي المؤتمتة مع أكواد QR والبارکود.',
    tags: ['أوراق تظليل', 'تصحيح آلي', 'باركود'],
    actionRoute: 'bubble_sheets',
  },
  {
    id: 'certificates_section',
    title: 'محرر الشهادات',
    category: 'docs',
    categoryLabel: 'الوثائق والشهادات',
    icon: GraduationCap,
    colorGradient: 'from-amber-500 to-amber-700',
    borderColor: 'hover:border-amber-500',
    description: 'منظومة إصدار شهادات النجاح والتفوق مع الصور الشخصية، والأختام، والتوقيعات الرقمية.',
    tags: ['نجاح وتفوق', 'صور شخصية', 'أختام رقمية'],
    actionRoute: 'certificates_section',
  },
  {
    id: 'grades_section',
    title: 'محرر كشوف الدرجات',
    category: 'affairs',
    categoryLabel: 'الشؤون التعليمية والدرجات',
    icon: BarChart3,
    colorGradient: 'from-rose-600 to-pink-700',
    borderColor: 'hover:border-rose-500',
    description: 'نظام إدارة درجات متقدم لحساب المتوسطات، النسب، واستخراج الإحصائيات والرسوم البيانية.',
    tags: ['حساب تلقائي', 'إحصائيات', 'رسوم بيانية'],
    actionRoute: 'grades_section',
  },
  {
    id: 'attendance_section',
    title: 'محرر الحضور والغياب',
    category: 'affairs',
    categoryLabel: 'الشؤون التعليمية والدرجات',
    icon: UserCheck,
    colorGradient: 'from-green-600 to-emerald-800',
    borderColor: 'hover:border-green-500',
    description: 'سجل إلكتروني دقيق لرصد الحضور، الغياب، التأخير، والأعذار مع تقارير شاملة.',
    tags: ['رصد يومي', 'أعذار', 'تقارير غياب'],
    actionRoute: 'attendance_section',
  },
  {
    id: 'plans_section',
    title: 'محرر التحضير',
    category: 'plans',
    categoryLabel: 'التحضير والكتب',
    icon: BookOpen,
    colorGradient: 'from-cyan-600 to-blue-700',
    borderColor: 'hover:border-cyan-500',
    description: 'إعداد خطط التحضير اليومية والأسبوعية والفصلية مع الأهداف والأنشطة والتقويم.',
    tags: ['تحضير يومي', 'أهداف', 'وسائل تعليمية'],
    actionRoute: 'plans_section',
  },
  {
    id: 'letters_section',
    title: 'محرر الخطابات',
    category: 'docs',
    categoryLabel: 'الوثائق والشهادات',
    icon: FileText,
    colorGradient: 'from-slate-700 to-slate-900',
    borderColor: 'hover:border-slate-600',
    description: 'صياغة الخطابات الرسمية، القرارات، التعاميم، والمذكرات بالهوية المعتمدة.',
    tags: ['قرارات', 'تعاميم', 'مذكرات'],
    actionRoute: 'document_editor',
  },
  {
    id: 'meetings_section',
    title: 'محرر الاجتماعات',
    category: 'docs',
    categoryLabel: 'الوثائق والشهادات',
    icon: ClipboardList,
    colorGradient: 'from-indigo-600 to-violet-800',
    borderColor: 'hover:border-indigo-500',
    description: 'إعداد محاضر الاجتماعات، جداول الأعمال، وتوثيق القرارات والتوقيعات.',
    tags: ['محاضر', 'جداول أعمال', 'قرارات'],
    actionRoute: 'reports_section',
  },
  {
    id: 'reports_section',
    title: 'محرر التقارير',
    category: 'affairs',
    categoryLabel: 'الشؤون التعليمية والدرجات',
    icon: FileSpreadsheet,
    colorGradient: 'from-teal-600 to-emerald-800',
    borderColor: 'hover:border-teal-500',
    description: 'بناء التقارير التحليلية للطلاب والمعلمين والمدرسة مع الرسوم البيانية.',
    tags: ['أداء الطلاب', 'رسوم بيانية', 'جداول'],
    actionRoute: 'reports_section',
  },
  {
    id: 'books_section',
    title: 'محرر الكتب والمناهج',
    category: 'plans',
    categoryLabel: 'التحضير والكتب',
    icon: BookMarked,
    colorGradient: 'from-violet-700 to-indigo-900',
    borderColor: 'hover:border-violet-500',
    description: 'تأليف الملازم والكتب المدرسية مع الفهرسة وإدارة الصفحات ورؤوس وتذييل مخصصة.',
    tags: ['كتب', 'ملازم', 'فهرسة'],
    actionRoute: 'books_section',
  },
  {
    id: 'admin_affairs',
    title: 'الشؤون الإدارية',
    category: 'affairs',
    categoryLabel: 'الشؤون التعليمية والدرجات',
    icon: Stamp,
    colorGradient: 'from-orange-600 to-amber-700',
    borderColor: 'hover:border-orange-500',
    description: 'إدارة النماذج الإدارية، التكليفات، الإخلاء، الإجازات، والنقل.',
    tags: ['تكليفات', 'إجازات', 'نماذج'],
    actionRoute: 'forms_section',
  }
];

export default function Dashboard({ onSelect, onOpenBadges }: { onSelect: (id: string, action?: 'open' | 'new') => void, onOpenBadges: () => void }) {
  const { currentRole, headerInfo } = useRole();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real project stats loaded from localStorage
  const [appStats, setAppStats] = useState<Record<string, { count: number, lastModified: string | null }>>({});

  useEffect(() => {
    // Load actual document stats from local storage (Raqeem Document Engine storage)
    const loadStats = () => {
      try {
        const storedDocs = JSON.parse(localStorage.getItem('raqeem_documents') || '[]');
        const stats: Record<string, { count: number, lastModified: string | null }> = {};
        
        ALL_EDUCATIONAL_APPS.forEach(app => {
          stats[app.id] = { count: 0, lastModified: null };
        });

        if (Array.isArray(storedDocs)) {
          storedDocs.forEach(doc => {
            if (doc.appId && stats[doc.appId]) {
              stats[doc.appId].count++;
              if (!stats[doc.appId].lastModified || new Date(doc.updatedAt) > new Date(stats[doc.appId].lastModified!)) {
                stats[doc.appId].lastModified = doc.updatedAt;
              }
            }
          });
        }
        setAppStats(stats);
      } catch (e) {
        console.error('Failed to load document stats', e);
      }
    };
    loadStats();
    
    // Listen for storage changes if multiple tabs are open
    window.addEventListener('storage', loadStats);
    return () => window.removeEventListener('storage', loadStats);
  }, []);

  const filteredApps = ALL_EDUCATIONAL_APPS.filter(app => {
    return searchQuery.trim() === '' || 
      app.title.includes(searchQuery) || 
      app.description.includes(searchQuery) ||
      app.tags.some(t => t.includes(searchQuery));
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'لا يوجد';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-8 font-sans select-none bg-slate-50 min-h-full" dir="rtl">
      
      {/* Platform Portal Header - Microsoft 365 / Creative Cloud Style */}
      <div className="bg-slate-900 rounded-3xl p-6 md:p-10 text-white shadow-2xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 transform translate-x-10 -translate-y-10 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 transform -translate-x-10 translate-y-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black border border-white/10 text-slate-300">
              <Shield size={14} className="text-violet-400" />
              <span>نظام الإنتاج الموحد (Raqeem Document Engine)</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              بوابة تطبيقات الرقيم
            </h1>
            <p className="text-slate-400 font-bold text-sm max-w-2xl leading-relaxed">
              مركز أدوات متكامل يتيح لك الوصول إلى محررات متخصصة مبنية على محرك واحد قوي. جميع الأدوات حقيقية، تعمل دون اتصال، وتحفظ أعمالك محلياً بصيغة آمنة.
            </p>
          </div>

          <div className="flex flex-col gap-3 min-w-[240px]">
            <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white font-black flex items-center justify-center text-xl shadow-md">
                {headerInfo.authorName ? headerInfo.authorName.charAt(0) : 'R'}
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-white">{headerInfo.authorName || 'المستخدم الحالي'}</p>
                <p className="text-[11px] font-bold text-violet-300 mt-1">{currentRole.title} | {headerInfo.schoolName || 'المنصة الوطنية'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Hub Search Bar */}
        <div className="mt-8 relative max-w-3xl">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن التطبيقات، المحررات، أو الأدوات (مثل: الامتحانات، الدرجات، الشهادات)..."
            className="w-full pl-4 pr-14 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-sm font-bold text-white placeholder-slate-400 focus:outline-none focus:bg-white/10 focus:border-violet-500 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Educational Apps Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <Layers className="text-violet-600" size={24} />
            <span>التطبيقات الإنتاجية</span>
          </h2>
        </div>

        {filteredApps.length === 0 ? (
          <div className="p-16 text-center bg-white rounded-3xl border border-slate-200 space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Search size={32} />
            </div>
            <p className="text-slate-500 font-bold text-lg">لم يتم العثور على أي تطبيق يطابق "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredApps.map((app) => {
              const Icon = app.icon;
              const stats = appStats[app.id] || { count: 0, lastModified: null };

              return (
                <div
                  key={app.id}
                  className="bg-white rounded-3xl p-1 border border-slate-200 hover:border-violet-300 shadow-sm hover:shadow-xl transition-all flex flex-col h-[280px] group"
                >
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br ${app.colorGradient} text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                        <Icon size={28} className="stroke-[2]" />
                      </div>
                      <div className="pt-1">
                        <h3 className="font-black text-slate-900 text-lg leading-tight mb-1 group-hover:text-violet-700 transition-colors">
                          {app.title}
                        </h3>
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg inline-block">
                          {app.categoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs font-bold text-slate-600 leading-relaxed mb-4 flex-1">
                      {app.description}
                    </p>

                    {/* Real Stats */}
                    <div className="flex items-center justify-between text-[11px] font-black text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-slate-400">المشاريع</span>
                        <span className="text-slate-800 text-sm">{stats.count}</span>
                      </div>
                      <div className="w-px h-8 bg-slate-200"></div>
                      <div className="flex flex-col gap-1 text-left">
                        <span className="text-slate-400">آخر تعديل</span>
                        <span className="text-slate-700">{formatDate(stats.lastModified)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-2 border-t border-slate-100 grid grid-cols-2 gap-2 shrink-0">
                    <button 
                      onClick={() => onSelect(app.actionRoute, 'open')}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs font-black transition-colors"
                    >
                      <FolderOpen size={16} />
                      <span>فتح مساحة العمل</span>
                    </button>
                    <button 
                      onClick={() => onSelect(app.actionRoute, 'new')}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 hover:bg-violet-600 text-white rounded-2xl text-xs font-black transition-colors shadow-sm"
                    >
                      <Plus size={16} />
                      <span>مستند جديد</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}

