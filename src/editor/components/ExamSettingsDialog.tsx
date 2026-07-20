import React, { useState, useEffect } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { X, Award, MapPin, BookOpen, Clock } from 'lucide-react';
import { ExamMetadata } from '../types';

export const ExamSettingsDialog = ({ onClose }: { onClose: () => void }) => {
  const { document, updateMetadata } = useEditorStore();
  const metadata = document.metadata;

  // Local states to track stage and class for dynamic filtering
  const [selectedStage, setSelectedStage] = useState<string>(metadata.stage || 'الأساسي');
  const [selectedGrade, setSelectedGrade] = useState<string>(metadata.grade || 'التاسع الأساسي');

  const GOVERNORATES = [
    'أمانة العاصمة', 'صنعاء', 'عدن', 'تعز', 'إب', 'الحديدة', 'ذمار', 
    'حضرموت', 'لحج', 'أبين', 'البيضاء', 'شبوة', 'مأرب', 'الجوف', 
    'المهرة', 'سقطرى', 'حجة', 'صعدة', 'عمران', 'المحويت', 'ريمة'
  ];

  const DIRECTORATES = [
    'السبعين', 'معين', 'الوحدة', 'صنعاء القديمة', 'شعوب', 'الثورة', 'الصافية',
    'المنصورة', 'الشيخ عثمان', 'صالة', 'المظفر', 'السياني', 'المكلا'
  ];

  const STAGES = ['الأساسي', 'الثانوي'];

  const GRADES_BY_STAGE: Record<string, string[]> = {
    'الأساسي': [
      'الأول الأساسي', 'الثاني الأساسي', 'الثالث الأساسي', 
      'الرابع الأساسي', 'الخامس الأساسي', 'السادس الأساسي', 
      'السابع الأساسي', 'الثامن الأساسي', 'التاسع الأساسي'
    ],
    'الثانوي': [
      'الأول الثانوي', 'الثاني الثانوي', 'الثالث الثانوي'
    ]
  };

  const getSubjectsForGrade = (grade: string) => {
    if (grade.includes('الأول') || grade.includes('الثاني') || grade.includes('الثالث')) {
      if (grade.includes('الثانوي')) {
        return ['القرآن الكريم', 'التربية الإسلامية', 'اللغة العربية', 'الرياضيات', 'الفيزياء', 'الكيمياء', 'الأحياء', 'اللغة الإنجليزية', 'التاريخ', 'الجغرافيا', 'المجتمع'];
      }
      return ['القرآن الكريم', 'التربية الإسلامية', 'اللغة العربية', 'الرياضيات', 'العلوم'];
    }
    // High elementary basic grades 4-9
    return ['القرآن الكريم', 'التربية الإسلامية', 'اللغة العربية', 'الرياضيات', 'العلوم', 'الاجتماعيات', 'اللغة الإنجليزية'];
  };

  const DIVISIONS = ['أ', 'ب', 'ج', 'د', 'هـ', '1', '2', '3'];
  const SEMESTERS = ['الفصل الدراسي الأول', 'الفصل الدراسي الثاني', 'امتحان الدور الثاني'];
  const ROUNDS = ['الدور الأول', 'الدور الثاني', 'الدور الاستثنائي'];
  const ACADEMIC_YEARS = ['2024/2025م', '2025/2026م', '2026/2027م'];
  const TIMES = ['45 دقيقة', 'ساعة واحدة', 'ساعة ونصف', 'ساعتان', 'ثلاث ساعات'];
  const MARKS_OPTIONS = ['10', '15', '20', '30', '40', '50', '60', '80', '100'];
  const EXAM_TYPES = ['شهري', 'نصف فصلي', 'نهائي فصلي', 'تجريبي / وزاري'];

  const handleChange = (field: keyof ExamMetadata, value: string) => {
    updateMetadata({ [field]: value });
  };

  // Synchronize dynamic grade and stage selections
  const handleStageChange = (stage: string) => {
    setSelectedStage(stage);
    handleChange('stage', stage);
    
    // Auto-select first grade in that stage
    const defaultGrade = GRADES_BY_STAGE[stage][0];
    setSelectedGrade(defaultGrade);
    handleChange('grade', defaultGrade);

    // Auto-select first subject candidate
    const firstSubject = getSubjectsForGrade(defaultGrade)[0];
    handleChange('subject', firstSubject);
  };

  const handleGradeChange = (grade: string) => {
    setSelectedGrade(grade);
    handleChange('grade', grade);

    // Auto-select first subject candidate
    const candidates = getSubjectsForGrade(grade);
    handleChange('subject', candidates[0]);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans overflow-y-auto" dir="rtl">
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] border border-slate-100">
        
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <Award size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800">بيانات وتنسيق ورقة الامتحان</h2>
              <p className="text-xs font-semibold text-slate-400">تحكم ببيانات الترويسة الرسمية والدرجات</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body - Card-based Layout */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6 flex-1 bg-slate-50/30">
          
          {/* Card 1: Geographic & Administration */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-sm border-b border-slate-100 pb-2 mb-1">
              <MapPin size={18} />
              <span>البيانات الإدارية والجغرافية</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">المحافظة</label>
                <select 
                  value={metadata.governorate} 
                  onChange={(e) => handleChange('governorate', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  <option value="">اختر المحافظة...</option>
                  {GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">الإدارة التعليمية (المديرية)</label>
                <select 
                  value={metadata.directorate} 
                  onChange={(e) => handleChange('directorate', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  <option value="">اختر المديرية...</option>
                  {DIRECTORATES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-black text-slate-500">اسم المدرسة (قابل للتحرير)</label>
                <input 
                  type="text"
                  placeholder="اكتب اسم المدرسة هنا"
                  value={metadata.school} 
                  onChange={(e) => handleChange('school', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Academic details */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-sm border-b border-slate-100 pb-2 mb-1">
              <BookOpen size={18} />
              <span>بيانات الصف والمرحلة والمادة</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">المرحلة الدراسية</label>
                <select 
                  value={selectedStage} 
                  onChange={(e) => handleStageChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">الصف الدراسي</label>
                <select 
                  value={selectedGrade} 
                  onChange={(e) => handleGradeChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {(GRADES_BY_STAGE[selectedStage] || []).map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">المادة (مُرشحة تلقائياً)</label>
                <select 
                  value={metadata.subject} 
                  onChange={(e) => handleChange('subject', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {getSubjectsForGrade(selectedGrade).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">الشعبة</label>
                <select 
                  value={metadata.division} 
                  onChange={(e) => handleChange('division', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  <option value="">اختر الشعبة...</option>
                  {DIVISIONS.map(div => <option key={div} value={div}>{div}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Card 3: Exam properties & Teacher Sign-off */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-sm border-b border-slate-100 pb-2 mb-1">
              <Clock size={18} />
              <span>تفاصيل الاختبار والتوثيق</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">نوع الاختبار</label>
                <select 
                  value={metadata.examType} 
                  onChange={(e) => handleChange('examType', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {EXAM_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">الفصل الدراسي</label>
                <select 
                  value={metadata.semester} 
                  onChange={(e) => handleChange('semester', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {SEMESTERS.map(sem => <option key={sem} value={sem}>{sem}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">الدور</label>
                <select 
                  value={metadata.round} 
                  onChange={(e) => handleChange('round', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {ROUNDS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">العام الدراسي</label>
                <select 
                  value={metadata.academicYear} 
                  onChange={(e) => handleChange('academicYear', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {ACADEMIC_YEARS.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">زمن الاختبار</label>
                <select 
                  value={metadata.time} 
                  onChange={(e) => handleChange('time', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500">الدرجة الكلية</label>
                <select 
                  value={metadata.marks} 
                  onChange={(e) => handleChange('marks', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {MARKS_OPTIONS.map(m => <option key={m} value={m}>{m} درجات</option>)}
                </select>
              </div>

              <div className="space-y-1 md:col-span-3">
                <label className="text-xs font-black text-slate-500 font-sans">عنوان الاختبار التفصيلي</label>
                <input 
                  type="text"
                  placeholder="مثال: اختبار نهاية شهر محرم"
                  value={metadata.examTitle} 
                  onChange={(e) => handleChange('examTitle', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div className="space-y-1 md:col-span-3">
                <label className="text-xs font-black text-slate-500 font-sans">اسم المعلم المعد (قابل للتحرير)</label>
                <input 
                  type="text"
                  placeholder="اكتب اسم المعلم للتوقيع"
                  value={metadata.teacherName} 
                  onChange={(e) => handleChange('teacherName', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Action Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3.5 rounded-2xl font-black shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 transition-all text-sm"
          >
            حفظ البيانات ومزامنة الورقة
          </button>
        </div>
      </div>
    </div>
  );
};
