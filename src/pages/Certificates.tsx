import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Award,
  Printer,
  Palette,
  Edit3,
  X,
  User,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const THEMES = [
  { id: 'classic', name: 'كلاسيكي (ذهبي)', borderUrl: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%25%22 height=%22100%25%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22none%22 stroke=%22%23b49040%22 stroke-width=%2220%22 stroke-dasharray=%2230,10%22/></svg>')" },
  { id: 'modern', name: 'عصري (أزرق)', borderUrl: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%25%22 height=%22100%25%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22none%22 stroke=%22%232563eb%22 stroke-width=%2215%22/></svg>')" },
  { id: 'minimal', name: 'بسيط (أخضر)', borderUrl: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%25%22 height=%22100%25%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22none%22 stroke=%22%230f766e%22 stroke-width=%2210%22 stroke-dasharray=%2210,10%22/></svg>')" },
];

export default function Certificates({ onBack }: { onBack: () => void }) {
  const [selectedTheme, setSelectedTheme] = useState('classic');
  const [editingField, setEditingField] = useState<string | null>(null);
  
  const [certData, setCertData] = useState(() => {
    const saved = localStorage.getItem('certificateData');
    if (saved) return JSON.parse(saved);
    return {
      title: 'شهادة شكر وتقدير',
      subtitle: 'تمنح إدارة المدرسة هذه الشهادة للطالب:',
      studentName: 'أحمد محمد عبدالله',
      reason: 'لتفوقه العلمي وحصوله على المركز الأول في الصف الثالث الإعدادي للعام الدراسي 2026-2027.',
      date: '2026/05/20',
      managerName: 'أ. صالح خالد',
      teacherName: 'أ. محمود سعيد'
    };
  });

  useEffect(() => {
    localStorage.setItem('certificateData', JSON.stringify(certData));
  }, [certData]);

  const activeTheme = THEMES.find(t => t.id === selectedTheme) || THEMES[0];

  const handleEdit = (field: string) => {
    setEditingField(field);
  };

  const handleSave = (val: string) => {
    if (editingField) {
      setCertData({ ...certData, [editingField]: val });
    }
    setEditingField(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" dir="rtl">
      <style>
        {`
          @media print {
            body * { visibility: hidden; }
            .print-area, .print-area * { visibility: visible; }
            .print-area { position: absolute; left: 0; top: 0; width: 100%; background: white; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; }
            .no-print { display: none !important; }
            @page { size: A4 landscape; margin: 0; }
          }
        `}
      </style>

      {/* Editing Dialog */}
      <AnimatePresence>
        {editingField && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 no-print"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-200"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <Edit3 size={20} className="text-indigo-500" /> تعديل النص
                </h3>
                <button onClick={() => setEditingField(null)} className="text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <textarea 
                defaultValue={(certData as any)[editingField]}
                onBlur={(e) => handleSave(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSave((e.target as any).value); } }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-indigo-500 min-h-[100px]"
                autoFocus
              />
              <button onClick={() => setEditingField(null)} className="w-full mt-4 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/20">
                حفظ
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 no-print">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors">
            <ArrowRight size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Award className="text-pink-600" size={24} /> محرر الشهادات
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-md">
            <Printer size={18} /> طباعة الشهادة
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 flex gap-6 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0 flex flex-col gap-6 no-print">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Palette size={18} className="text-rose-500" /> مظهر الشهادة (الثيم)
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    selectedTheme === theme.id ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 bg-white'
                  }`}
                >
                  <span className="font-medium text-slate-700">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Certificate Preview A4 Landscape */}
        <div className="flex-1 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex justify-center items-center p-8 print:p-0 print:bg-white print:border-none">
          <div 
            className="print-area w-[297mm] h-[210mm] bg-white shadow-2xl relative p-12 transition-all duration-300 print:shadow-none"
            style={{ 
              backgroundImage: activeTheme.borderUrl, 
              backgroundPosition: 'center', 
              backgroundSize: 'calc(100% - 20px) calc(100% - 20px)', 
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] no-print print:opacity-[0.05]">
              <h1 className="text-9xl font-black text-black transform -rotate-45 whitespace-nowrap">وزارة التربية والتعليم</h1>
            </div>

            <div className="w-full h-full border-[3px] border-double border-slate-300/50 p-12 flex flex-col items-center justify-center text-center relative z-10">
              
              <div className="absolute top-12 left-12 text-right">
                <p className="font-bold text-sm text-slate-500">التاريخ</p>
                <p 
                  onClick={() => handleEdit('date')} 
                  className="font-bold cursor-pointer hover:bg-slate-100 px-2 py-1 rounded"
                >
                  {certData.date}
                </p>
              </div>

              <div className="absolute top-12 right-12 text-center leading-tight">
                <p className="font-bold text-sm">الجمهورية اليمنية</p>
                <p className="font-bold text-sm">وزارة التربية والتعليم</p>
              </div>

              <Award size={64} className="text-yellow-500 mb-6" />

              <h1 
                onClick={() => handleEdit('title')} 
                className="text-5xl font-black text-slate-800 mb-8 cursor-pointer hover:bg-slate-50 px-6 py-2 rounded-2xl transition-colors font-serif"
              >
                {certData.title}
              </h1>

              <p 
                onClick={() => handleEdit('subtitle')}
                className="text-xl font-bold text-slate-600 mb-6 cursor-pointer hover:bg-slate-50 px-4 py-1 rounded-lg"
              >
                {certData.subtitle}
              </p>

              <h2 
                onClick={() => handleEdit('studentName')}
                className="text-4xl font-black text-indigo-700 mb-8 cursor-pointer hover:bg-indigo-50 px-6 py-2 rounded-xl"
              >
                {certData.studentName}
              </h2>

              <p 
                onClick={() => handleEdit('reason')}
                className="text-xl font-bold text-slate-700 max-w-2xl leading-relaxed cursor-pointer hover:bg-slate-50 p-4 rounded-xl"
              >
                {certData.reason}
              </p>

              <div className="w-full flex justify-between mt-16 px-16">
                <div className="text-center">
                  <p 
                    onClick={() => handleEdit('teacherName')}
                    className="font-bold text-lg mb-4 cursor-pointer hover:bg-slate-50 px-4 py-1 rounded-lg"
                  >
                    {certData.teacherName}
                  </p>
                  <p className="text-slate-500 border-t border-slate-300 pt-2 px-8">معلم المادة</p>
                </div>
                
                <div className="text-center">
                  <p 
                    onClick={() => handleEdit('managerName')}
                    className="font-bold text-lg mb-4 cursor-pointer hover:bg-slate-50 px-4 py-1 rounded-lg"
                  >
                    {certData.managerName}
                  </p>
                  <p className="text-slate-500 border-t border-slate-300 pt-2 px-8">مدير المدرسة</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
