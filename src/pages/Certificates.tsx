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
  { id: 'graduation', name: 'شهادة تخرج (عرضي)', isPortrait: false, 
    bgClass: 'bg-[radial-gradient(circle_at_top_right,#fcfaf2,#ffffff)] border-[10px] border-double border-[#1e3a8a] text-slate-800' 
  },
  { id: 'appreciation', name: 'شهادة تفوق (عرضي)', isPortrait: false, 
    bgClass: 'bg-[#fffdf9] border border-slate-200 text-slate-800' 
  },
  { id: 'attendance', name: 'شهادة حضور (عرضي)', isPortrait: false, 
    bgClass: 'bg-white border border-slate-300 text-slate-800' 
  },
  { id: 'academic', name: 'شهادة أكاديمية (طولي)', isPortrait: true, 
    bgClass: 'bg-white border-[20px] border-transparent text-slate-800' 
  },
];

export default function Certificates({ onBack }: { onBack: () => void }) {
  const [selectedTheme, setSelectedTheme] = useState('graduation');
  const [editingField, setEditingField] = useState<string | null>(null);
  
  const [certData, setCertData] = useState(() => {
    const saved = localStorage.getItem('certificateData');
    if (saved) return JSON.parse(saved);
    return {
      institution: 'مدرسة عباد بن بشر الابتدائية',
      subHeader: 'إدارة الامتحانات والاختبارات الدورية',
      title: 'شهادة تخرج',
      subtitle: 'وثيقة رسمية معتمدة',
      bodyPre: 'يسر إدارة المدرسة أن تمنح هذه الشهادة للطالب المتميز:',
      studentName: 'سهيل الهزبري',
      bodyPost: 'لتخرجه من المرحلة الابتدائية للعام الدراسي ١٤٤٧ هـ، متمنين له دوام التوفيق والنجاح في مسيرته العلمية.',
      sign1: 'مدير المدرسة: محمود البلوي',
      sign2: 'الموجه الطلابي: عبدالإله الشريف'
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

  const renderDecorations = () => {
    switch(activeTheme.id) {
      case 'graduation':
        return (
          <>
            <div className="absolute inset-1 border-2 border-[#b45309] pointer-events-none z-0"></div>
            <div className="absolute top-[15px] right-[15px] w-[60px] h-[60px] border-2 border-b-0 border-l-0 border-[#b45309] pointer-events-none z-10"></div>
            <div className="absolute top-[15px] left-[15px] w-[60px] h-[60px] border-2 border-b-0 border-r-0 border-[#b45309] pointer-events-none z-10"></div>
            <div className="absolute bottom-[15px] right-[15px] w-[60px] h-[60px] border-2 border-t-0 border-l-0 border-[#b45309] pointer-events-none z-10"></div>
            <div className="absolute bottom-[15px] left-[15px] w-[60px] h-[60px] border-2 border-t-0 border-r-0 border-[#b45309] pointer-events-none z-10"></div>
          </>
        );
      case 'appreciation':
        return (
          <>
            <div className="absolute bottom-0 left-0 w-[220px] h-[220px] bg-[linear-gradient(135deg,transparent_50%,#0f172a_50%)] pointer-events-none z-0"></div>
            <div className="absolute top-0 right-[50px] w-[100px] h-[160px] bg-[#0f172a] z-10 flex justify-center pb-5" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 85%, 0% 100%)' }}>
              <div className="mt-4 w-[70px] h-[70px] bg-[linear-gradient(135deg,#bf953f,#fcf6ba,#b38728,#fbf5b7,#aa771c)] rounded-full flex justify-center items-center text-[10px] font-black text-[#0f172a] text-center shadow-md">
                متميز<br/>بالعطاء
              </div>
            </div>
          </>
        );
      case 'attendance':
        return (
          <>
            <div className="absolute top-0 left-0 right-0 h-[35px] bg-[linear-gradient(90deg,#1e40af,#3b82f6,transparent)] z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 60%)' }}></div>
            <div className="absolute bottom-0 left-0 right-0 h-[45px] bg-[linear-gradient(270deg,#1e40af,#60a5fa,transparent)] z-10" style={{ clipPath: 'polygon(15% 0, 100% 40%, 100% 100%, 0 100%)' }}></div>
          </>
        );
      case 'academic':
        return (
          <div className="absolute inset-0 border-[20px] border-transparent pointer-events-none z-10" style={{ borderImage: 'linear-gradient(45deg, #064e3b, #047857, #065f46, #0f766e) 30 round' }}>
            <div className="absolute inset-0.5 border-2 border-[#064e3b]"></div>
          </div>
        );
      default: return null;
    }
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

        {/* Certificate Preview */}
        <div className="flex-1 bg-slate-100 rounded-2xl border border-slate-200 overflow-auto flex justify-center items-center p-8 print:p-0 print:bg-white print:border-none print:overflow-visible">
          <div 
            className={`print-area bg-white shadow-2xl relative transition-all duration-300 print:shadow-none overflow-hidden ${activeTheme.bgClass} ${activeTheme.isPortrait ? 'w-[210mm] h-[297mm] p-[20mm_18mm]' : 'w-[297mm] h-[210mm] p-[16mm_20mm]'}`}
          >
            {renderDecorations()}

            {/* Watermark */}
            <div className="absolute inset-0 flex justify-center items-center opacity-[0.04] pointer-events-none z-0">
              <span className="text-[10rem] font-black transform -rotate-45 whitespace-nowrap text-slate-900">وزارة التعليم</span>
            </div>

            <div className={`relative z-20 flex flex-col h-full ${activeTheme.isPortrait ? 'justify-start' : 'justify-between'}`}>
              
              {/* Header */}
              <div className={`flex ${activeTheme.isPortrait ? 'flex-col gap-4 text-center items-center mb-8' : 'justify-between items-center mb-6'}`}>
                <div className={`text-[13px] font-bold leading-relaxed ${activeTheme.isPortrait ? 'text-center' : 'text-right'}`}>
                  <div className="cursor-pointer hover:bg-black/5 rounded px-1" onClick={() => handleEdit('institution')}>{certData.institution}</div>
                  <div className="font-normal text-slate-600 text-[12px] mt-1 cursor-pointer hover:bg-black/5 rounded px-1" onClick={() => handleEdit('subHeader')}>{certData.subHeader}</div>
                </div>
                <div className="w-[90px] h-[90px] border-2 border-dashed border-slate-400 rounded-full flex justify-center items-center text-slate-400 text-xs font-bold">
                  الشعار
                </div>
              </div>

              {/* Body */}
              <div className={`text-center ${activeTheme.isPortrait ? 'flex-1 flex flex-col justify-center' : ''}`}>
                <h1 
                  onClick={() => handleEdit('title')} 
                  className={`font-serif font-bold mb-2 cursor-pointer hover:bg-black/5 rounded px-4 py-1 transition-colors ${activeTheme.id === 'academic' ? 'text-[48px] text-[#047857]' : activeTheme.id === 'appreciation' ? 'text-[42px] text-[#1e3a8a]' : 'text-[42px] text-[#0f172a]'}`}
                >
                  {certData.title}
                </h1>

                <p 
                  onClick={() => handleEdit('subtitle')}
                  className="text-[18px] font-bold text-slate-500 mb-8 tracking-wide cursor-pointer hover:bg-black/5 rounded px-4 py-1 inline-block"
                >
                  {certData.subtitle}
                </p>

                <div className="text-[17px] leading-[2.2] text-slate-700 mx-auto max-w-[85%]">
                  <span onClick={() => handleEdit('bodyPre')} className="cursor-pointer hover:bg-black/5 rounded px-2">{certData.bodyPre}</span>
                  <br />
                  <div 
                    onClick={() => handleEdit('studentName')}
                    className={`font-serif text-[32px] font-bold border-b-2 border-dotted px-4 py-1 inline-block my-3 cursor-pointer hover:bg-black/5 rounded ${activeTheme.id === 'academic' ? 'text-[#064e3b] border-[#047857]' : 'text-[#1e3a8a] border-[#b45309]'}`}
                  >
                    {certData.studentName}
                  </div>
                  <br />
                  <span onClick={() => handleEdit('bodyPost')} className="cursor-pointer hover:bg-black/5 rounded px-2">{certData.bodyPost}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-end mt-12 px-8">
                <div className="text-center font-bold text-[14px] text-slate-800">
                  <div onClick={() => handleEdit('sign1')} className="cursor-pointer hover:bg-black/5 rounded px-2 pb-1">{certData.sign1}</div>
                  <div className="w-[140px] border-t-[1.5px] border-slate-400 mt-8 mb-1 mx-auto"></div>
                </div>
                
                <div className="text-center font-bold text-[14px] text-slate-800">
                  <div onClick={() => handleEdit('sign2')} className="cursor-pointer hover:bg-black/5 rounded px-2 pb-1">{certData.sign2}</div>
                  <div className="w-[140px] border-t-[1.5px] border-slate-400 mt-8 mb-1 mx-auto"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
