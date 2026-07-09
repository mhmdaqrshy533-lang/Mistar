import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Sparkles, Printer, Edit3, X, Palette, 
  Settings, Image as ImageIcon, Database, PlusCircle, 
  PenTool, Circle, ArrowUpRight, Type, Check, Download,
  Square, Triangle, Wand2, Battery, Magnet, ZoomIn, ZoomOut, Trash2
} from 'lucide-react';

export default function AIGenerator({ onBack }: { onBack: () => void }) {
  const [questions, setQuestions] = useState<any[]>([]);
  
  // Paper Info
  const [showPaperInfo, setShowPaperInfo] = useState(false);
  const [paperInfo, setPaperInfo] = useState({
    governorate: 'محافظة تعز',
    directorate: 'مديرية التعزية',
    school: 'مدرسة عمار بن ياسر',
    teacher: 'م. سهيل الهزبري',
    subject: 'الفيزياء',
    grade: 'الثالث الثانوي',
    section: 'أ',
    term: 'الفصل الدراسي الأول',
    year: '2026-2027',
    examTitle: 'اختبار نهاية الفصل الدراسي الأول',
    time: 'ساعتان',
    score: '100',
    day: 'الأحد',
    date: '2026/01/15',
    hijriDate: '1448/07/01',
    formNumber: '1',
    language: 'عربي',
    direction: 'RTL',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Coat_of_arms_of_Yemen.svg'
  });

  // Themes & Templates
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [activeTheme, setActiveTheme] = useState<'theme-black' | 'theme-navy' | 'theme-green'>('theme-black');
  const [activeTemplate, setActiveTemplate] = useState('standard');

  // Add Question Dialog
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [savedBank, setSavedBank] = useState<any[]>([]);

  // Physics Drawing State
  const [showPhysicsDraw, setShowPhysicsDraw] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [physicsQText, setPhysicsQText] = useState('');
  const [aiCorrectEnabled, setAiCorrectEnabled] = useState(true);
  
  useEffect(() => {
    const saved = localStorage.getItem('mistar_question_bank');
    if (saved) {
      setSavedBank(JSON.parse(saved));
    }
    // Load some mock data if empty
    if (questions.length === 0) {
      setQuestions([
        { type: 'tf', text: 'تسارع الجاذبية الأرضية ثابت في جميع أجزاء الكرة الأرضية.' },
        { type: 'mcq', text: 'وحدة قياس القوة هي:', options: ['نيوتن', 'جول', 'وات', 'باسكال'] }
      ]);
    }
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setPaperInfo(prev => ({ ...prev, logo: ev.target!.result as string }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const importFromBank = (q: any) => {
    setQuestions([...questions, q]);
    setShowAddDialog(false);
  };

  const addNewQuestion = (type: string) => {
    if (type === 'physics') {
      setShowPhysicsDraw(true);
      setShowAddDialog(false);
      return;
    }
    const newQ = type === 'tf' 
      ? { type: 'tf', text: 'سؤال صح وخطأ جديد...' }
      : { type: 'mcq', text: 'سؤال اختيارات جديد...', options: ['أ', 'ب', 'ج', 'د'] };
    setQuestions([...questions, newQ]);
    setShowAddDialog(false);
  };

  const savePhysicsQuestion = () => {
    if (canvasRef.current) {
      const imgData = canvasRef.current.toDataURL('image/png');
      setQuestions([...questions, { type: 'physics', text: physicsQText, image: imgData }]);
      setShowPhysicsDraw(false);
      setPhysicsQText('');
    }
  };

  // Drawing Canvas Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };
  const stopDrawing = () => {
    setIsDrawing(false);
    if (aiCorrectEnabled && canvasRef.current) {
      // Simulate AI correction by just adding a clean shape or smoothing
      // In a real app this would analyze paths. Here we just add a small glow to indicate "processed".
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.shadowColor = 'rgba(79, 70, 229, 0.2)';
        ctx.shadowBlur = 4;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }
  };
  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const getThemeVars = () => {
    switch (activeTheme) {
      case 'theme-navy': return { '--border-color': '#1e3a8a', '--bg-table-header': '#f0f4f8' } as React.CSSProperties;
      case 'theme-green': return { '--border-color': '#047857', '--bg-table-header': '#f0fdf4' } as React.CSSProperties;
      case 'theme-black':
      default: return { '--border-color': '#000000', '--bg-table-header': '#f2f2f2' } as React.CSSProperties;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 select-none font-sans pb-24" dir="rtl">
      <style>
        {`
          @media print {
            body * { visibility: hidden; }
            .print-area, .print-area * { visibility: visible; }
            .print-area { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 20px; box-shadow: none !important; border: 4px double black !important; }
            .no-print { display: none !important; }
          }
          .circle-choice {
             width: 24px; height: 24px; border-radius: 50%; border: 1.5px solid var(--border-color); 
             display: inline-flex; justify-content: center; align-items: center; font-size: 10px; font-weight: bold;
             background: white; color: var(--border-color); margin-left: 8px;
          }
        `}
      </style>

      {/* Header */}
      <div className="max-w-5xl mx-auto bg-slate-900 text-white p-6 rounded-[2rem] mb-8 flex items-center justify-between shadow-xl no-print">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all">
            <ArrowRight size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-black flex items-center gap-2">محرر الاختبارات المتقدم</h1>
            <p className="text-slate-400 text-sm mt-1">قم بتصميم وتعديل ورقة الامتحان باحترافية عالية</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowPaperInfo(true)} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all">
            <Settings size={18} /> ترويسة الورقة
          </button>
          <button onClick={() => setShowTemplateDialog(true)} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all">
            <Palette size={18} /> القوالب والمظهر
          </button>
          <button onClick={() => window.print()} className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
            <Printer size={18} /> طباعة
          </button>
        </div>
      </div>

      {/* Main A4 Canvas */}
      <div 
        className="print-area w-[210mm] min-h-[297mm] mx-auto p-[15mm_12mm] bg-white shadow-2xl relative font-serif text-black"
        style={{ ...getThemeVars(), border: '4px double var(--border-color)' }}
      >
        {/* Header Section */}
        <div className="grid grid-cols-3 items-center border-b-[3px] border-double pb-3 mb-4 text-center" style={{ borderColor: 'var(--border-color)' }}>
          <div className="text-right text-[13px] leading-[1.7] font-bold">
            <div>الجمهورية اليمنية</div>
            <div>وزارة التربية والتعليم</div>
            <div>مكتب التربية ب{paperInfo.governorate}</div>
            <div>{paperInfo.directorate} - {paperInfo.school}</div>
          </div>
          <div className="flex flex-col items-center">
            <img src={paperInfo.logo} alt="الشعار" className="h-[65px] object-contain mb-1" />
            <span className="border px-3 py-0.5 text-[11px] font-bold mt-1" style={{ borderColor: 'var(--border-color)' }}>{paperInfo.examTitle}</span>
            <span className="text-[10px] font-bold mt-1">العام الدراسي {paperInfo.year}</span>
          </div>
          <div className="text-left text-[13px] leading-[1.7]">
            <div><b>المادة:</b> {paperInfo.subject}</div>
            <div><b>الصف:</b> {paperInfo.grade} - <b>الشعبة:</b> {paperInfo.section}</div>
            <div><b>الزمن:</b> {paperInfo.time} - <b>الدرجة:</b> {paperInfo.score}</div>
            <div><b>التاريخ:</b> {paperInfo.date} م</div>
          </div>
        </div>

        {/* Student Info Bar */}
        <div className="flex border-[1.5px] my-4 text-[14px] bg-slate-50" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex-[2.5] p-[6px_10px]"><b>اسم الطالب الثلاثي:</b> ........................................................................</div>
          <div className="flex-1 p-[6px_10px] border-r-[1.5px]" style={{ borderColor: 'var(--border-color)' }}><b>رقم الجلوس:</b> .....................</div>
        </div>

        {/* Questions Area */}
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={idx} className="relative group hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors border border-transparent hover:border-slate-200">
              
              {/* Delete Button (No Print) */}
              <button 
                onClick={() => setQuestions(questions.filter((_, i) => i !== idx))}
                className="absolute top-2 left-2 p-1.5 bg-red-100 text-red-600 rounded-md opacity-0 group-hover:opacity-100 transition-opacity no-print"
              >
                <X size={14} />
              </button>

              <div className="flex items-start gap-2">
                <span className="font-bold text-[14.5px] whitespace-nowrap">{idx + 1}.</span>
                <div className="flex-1">
                  
                  {q.type === 'tf' && (
                    <div className="flex items-center justify-between border-b border-dashed border-slate-300 pb-2">
                      <div className="font-bold text-[14.5px]">{q.text}</div>
                      <div className="flex shrink-0">
                        <div className="circle-choice">ص</div>
                        <div className="circle-choice">خ</div>
                      </div>
                    </div>
                  )}

                  {q.type === 'mcq' && (
                    <div>
                      <div className="font-bold text-[14.5px] mb-2">{q.text}</div>
                      <div className="grid grid-cols-4 gap-4">
                        {q.options.map((opt: string, oIdx: number) => (
                          <div key={oIdx} className="flex items-center gap-2">
                            <div className="circle-choice">{['أ','ب','ج','د'][oIdx]}</div>
                            <span className="text-[13.5px]">{opt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {q.type === 'direct' && (
                    <div className="pb-8">
                      <div className="font-bold text-[14.5px] mb-2">{q.text}</div>
                      <div className="border-b border-dotted border-slate-400 w-full mt-4"></div>
                      <div className="border-b border-dotted border-slate-400 w-full mt-6"></div>
                    </div>
                  )}

                  {q.type === 'complete' && (
                    <div className="pb-4">
                      <div className="font-bold text-[14.5px] mb-2">{q.text}</div>
                    </div>
                  )}

                  {q.type === 'match' && (
                    <div className="pb-4">
                      <div className="font-bold text-[14.5px] mb-2">{q.text || 'صل من العمود (أ) ما يناسبه من العمود (ب):'}</div>
                      <div className="grid grid-cols-2 gap-8 text-center text-[13.5px]">
                        <div className="border p-2">العمود أ</div>
                        <div className="border p-2">العمود ب</div>
                      </div>
                    </div>
                  )}

                  {q.type === 'order' && (
                    <div className="pb-4">
                      <div className="font-bold text-[14.5px] mb-2">{q.text || 'رتب الأحداث التالية:'}</div>
                      <div className="flex gap-4">
                         <div className="circle-choice">( )</div>
                         <div className="circle-choice">( )</div>
                         <div className="circle-choice">( )</div>
                      </div>
                    </div>
                  )}

                  {q.type === 'qr' && (
                    <div className="pb-4">
                      <div className="font-bold text-[14.5px] mb-2">{q.text || 'امسح الرمز الشريطي التالي:'}</div>
                      <div className="w-24 h-24 border-2 border-black flex items-center justify-center bg-slate-100">
                        <span className="text-[10px] font-bold">QR CODE</span>
                      </div>
                    </div>
                  )}

                  {q.type === 'barcode' && (
                    <div className="pb-4">
                      <div className="font-bold text-[14.5px] mb-2">{q.text || 'الرمز الشريطي:'}</div>
                      <div className="w-40 h-16 border-2 border-black flex items-center justify-center bg-slate-100">
                        <span className="text-[10px] font-bold">||| | || |||| | |||</span>
                      </div>
                    </div>
                  )}

                  {q.type === 'physics' && (
                    <div>
                      <div className="font-bold text-[14.5px] mb-2">{q.text}</div>
                      {q.image && (
                        <div className="border border-slate-300 p-2 inline-block bg-white mt-2">
                          <img src={q.image} alt="رسم توضيحي" className="max-w-[300px] h-auto object-contain" />
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t-2 flex justify-between items-center font-bold text-sm" style={{ borderColor: 'var(--border-color)' }}>
          <p>توقيع المعلم: .................................</p>
          <p>توقيع المدير: .................................</p>
          <p>تمنياتنا لكم بالتوفيق والنجاح</p>
        </div>
      </div>

      {/* Floating Add Button */}
      <button 
        onClick={() => setShowAddDialog(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:scale-105 hover:bg-indigo-700 transition-all no-print z-50"
      >
        <PlusCircle size={32} />
      </button>

      {/* Paper Info Dialog */}
      <AnimatePresence>
        {showPaperInfo && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center no-print overflow-y-auto">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl p-8 w-full max-w-4xl shadow-2xl my-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-800">بيانات الترويسة والورقة الشاملة</h3>
                <button onClick={() => setShowPaperInfo(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">المحافظة</label>
                  <input type="text" value={paperInfo.governorate} onChange={(e) => setPaperInfo({...paperInfo, governorate: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-bold text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">المديرية</label>
                  <input type="text" value={paperInfo.directorate} onChange={(e) => setPaperInfo({...paperInfo, directorate: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-bold text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">المدرسة</label>
                  <input type="text" value={paperInfo.school} onChange={(e) => setPaperInfo({...paperInfo, school: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-bold text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">اسم المعلم</label>
                  <input type="text" value={paperInfo.teacher} onChange={(e) => setPaperInfo({...paperInfo, teacher: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-bold text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">المادة</label>
                  <input type="text" value={paperInfo.subject} onChange={(e) => setPaperInfo({...paperInfo, subject: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-bold text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">الصف</label>
                  <input type="text" value={paperInfo.grade} onChange={(e) => setPaperInfo({...paperInfo, grade: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-bold text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">الشعبة</label>
                  <input type="text" value={paperInfo.section} onChange={(e) => setPaperInfo({...paperInfo, section: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-bold text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">العام الدراسي</label>
                  <input type="text" value={paperInfo.year} onChange={(e) => setPaperInfo({...paperInfo, year: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-bold text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">الفصل</label>
                  <input type="text" value={paperInfo.term} onChange={(e) => setPaperInfo({...paperInfo, term: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-bold text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">الزمن</label>
                  <input type="text" value={paperInfo.time} onChange={(e) => setPaperInfo({...paperInfo, time: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-bold text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">الدرجة</label>
                  <input type="text" value={paperInfo.score} onChange={(e) => setPaperInfo({...paperInfo, score: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-bold text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">رقم النموذج</label>
                  <input type="text" value={paperInfo.formNumber} onChange={(e) => setPaperInfo({...paperInfo, formNumber: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-bold text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">اليوم</label>
                  <input type="text" value={paperInfo.day} onChange={(e) => setPaperInfo({...paperInfo, day: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-bold text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">التاريخ الميلادي</label>
                  <input type="text" value={paperInfo.date} onChange={(e) => setPaperInfo({...paperInfo, date: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-bold text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">التاريخ الهجري</label>
                  <input type="text" value={paperInfo.hijriDate} onChange={(e) => setPaperInfo({...paperInfo, hijriDate: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-bold text-sm" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-500 mb-2">تغيير الشعار أو الختم (اختياري)</label>
                <div className="flex items-center gap-4">
                  <img src={paperInfo.logo} alt="Current" className="w-16 h-16 object-contain border border-slate-200 rounded-lg bg-slate-50 p-1" />
                  <div className="relative overflow-hidden">
                    <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
                      <ImageIcon size={16} /> رفع شعار مخصص
                    </button>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                  <button className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-emerald-200 ml-auto">
                    حفظ كقالب جديد
                  </button>
                </div>
              </div>
              <button onClick={() => setShowPaperInfo(false)} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700">حفظ وتطبيق</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Question Dialog */}
      <AnimatePresence>
        {showAddDialog && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center no-print">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl p-8 w-full max-w-4xl shadow-2xl flex flex-col max-h-[85vh]">
              <div className="flex justify-between items-center mb-6 shrink-0">
                <h3 className="text-xl font-black text-slate-800">إضافة سؤال للاختبار</h3>
                <button onClick={() => setShowAddDialog(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
              </div>
              
              <div className="flex gap-6 overflow-hidden flex-1">
                {/* Left: Create New */}
                <div className="w-1/2 border-l border-slate-200 pl-6 flex flex-col h-full">
                  <h4 className="font-bold text-slate-600 mb-4 flex items-center gap-2"><PenTool size={18} /> إنشاء سؤال جديد</h4>
                  <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto pr-2">
                    <button onClick={() => addNewQuestion('direct')} className="bg-slate-50 hover:bg-indigo-50 border border-slate-200 p-3 rounded-xl text-right font-bold text-sm transition-colors text-slate-700">سؤال مباشر</button>
                    <button onClick={() => addNewQuestion('mcq')} className="bg-slate-50 hover:bg-indigo-50 border border-slate-200 p-3 rounded-xl text-right font-bold text-sm transition-colors text-slate-700">اختيار من متعدد</button>
                    <button onClick={() => addNewQuestion('tf')} className="bg-slate-50 hover:bg-indigo-50 border border-slate-200 p-3 rounded-xl text-right font-bold text-sm transition-colors text-slate-700">صح وخطأ</button>
                    <button onClick={() => addNewQuestion('complete')} className="bg-slate-50 hover:bg-indigo-50 border border-slate-200 p-3 rounded-xl text-right font-bold text-sm transition-colors text-slate-700">أكمل الفراغ</button>
                    <button onClick={() => addNewQuestion('match')} className="bg-slate-50 hover:bg-indigo-50 border border-slate-200 p-3 rounded-xl text-right font-bold text-sm transition-colors text-slate-700">سؤال مزاوجة (وصل)</button>
                    <button onClick={() => addNewQuestion('order')} className="bg-slate-50 hover:bg-indigo-50 border border-slate-200 p-3 rounded-xl text-right font-bold text-sm transition-colors text-slate-700">سؤال ترتيب</button>
                    
                    <button onClick={() => addNewQuestion('physics')} className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 p-3 rounded-xl text-right font-bold text-sm transition-colors text-emerald-800 flex justify-between col-span-2">
                      محرر الرسم الحر (فيزياء/هندسة) <ArrowUpRight size={16} />
                    </button>
                    
                    <button onClick={() => addNewQuestion('image')} className="bg-orange-50 hover:bg-orange-100 border border-orange-200 p-3 rounded-xl text-right font-bold text-sm transition-colors text-orange-800">إضافة صورة</button>
                    <button onClick={() => addNewQuestion('table')} className="bg-orange-50 hover:bg-orange-100 border border-orange-200 p-3 rounded-xl text-right font-bold text-sm transition-colors text-orange-800">إضافة جدول</button>
                    <button onClick={() => addNewQuestion('math')} className="bg-blue-50 hover:bg-blue-100 border border-blue-200 p-3 rounded-xl text-right font-bold text-sm transition-colors text-blue-800">معادلة رياضية</button>
                    <button onClick={() => addNewQuestion('chem')} className="bg-blue-50 hover:bg-blue-100 border border-blue-200 p-3 rounded-xl text-right font-bold text-sm transition-colors text-blue-800">معادلة كيميائية</button>
                    
                    <button onClick={() => addNewQuestion('qr')} className="bg-slate-100 hover:bg-slate-200 border border-slate-300 p-3 rounded-xl text-right font-bold text-sm transition-colors text-slate-700">رمز استجابة QR</button>
                    <button onClick={() => addNewQuestion('barcode')} className="bg-slate-100 hover:bg-slate-200 border border-slate-300 p-3 rounded-xl text-right font-bold text-sm transition-colors text-slate-700">باركود Barcode</button>
                  </div>
                </div>

                {/* Right: Bank & AI */}
                <div className="w-1/2 flex flex-col h-full">
                  <div className="flex gap-2 mb-4">
                    <button className="flex-1 bg-indigo-600 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700"><Sparkles size={16} /> توليد بالذكاء الاصطناعي</button>
                  </div>
                  <h4 className="font-bold text-slate-600 mb-2 flex items-center gap-2"><Database size={18} /> الاستيراد من بنك الأسئلة</h4>
                  <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                    {savedBank.length === 0 ? (
                      <div className="text-center text-slate-400 mt-10">
                        <Database size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-sm font-bold">البنك فارغ</p>
                      </div>
                    ) : (
                      savedBank.map((q, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center justify-between hover:border-indigo-200 transition-colors cursor-pointer" onClick={() => importFromBank(q)}>
                          <div className="flex-1">
                            <div className="text-xs font-bold text-indigo-600 mb-1">{q.type === 'tf' ? 'صح وخطأ' : 'اختيارات'}</div>
                            <div className="text-sm font-bold text-slate-800 line-clamp-2">{q.text}</div>
                          </div>
                          <button className="bg-white border border-slate-200 p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 shrink-0 mr-4">
                            <PlusCircle size={20} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Physics Drawing Editor Dialog */}
      <AnimatePresence>
        {showPhysicsDraw && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center no-print">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl p-6 w-full max-w-4xl shadow-2xl flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <PenTool className="text-emerald-500" />
                  محرر الرسوم الفيزيائية والهندسية
                </h3>
                <button onClick={() => setShowPhysicsDraw(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="col-span-1 space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">صيغة السؤال</label>
                    <textarea 
                      value={physicsQText}
                      onChange={(e) => setPhysicsQText(e.target.value)}
                      placeholder="مثال: من خلال الرسم الموضح، احسب الشد في الخيط..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold resize-none h-32 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={aiCorrectEnabled} onChange={(e) => setAiCorrectEnabled(e.target.checked)} className="w-5 h-5 accent-emerald-600 rounded" />
                      <span className="text-sm font-bold text-emerald-900 flex items-center gap-1">
                        <Sparkles size={16} /> تفعيل التصحيح الذكي للأشكال
                      </span>
                    </label>
                    <p className="text-xs text-emerald-700 mt-2">سيقوم النظام بتعديل الخطوط المتعرجة لتصبح مستقيمة أو دائرية بانتظام.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={clearCanvas} className="bg-slate-100 text-slate-700 font-bold py-2 rounded-lg text-sm hover:bg-slate-200">مسح اللوحة</button>
                    <button onClick={savePhysicsQuestion} className="bg-emerald-600 text-white font-bold py-2 rounded-lg text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-600/20">إدراج في الورقة</button>
                  </div>
                </div>

                <div className="col-span-2 flex flex-col gap-4">
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] bg-white relative cursor-crosshair h-[400px]">
                    <canvas 
                      ref={canvasRef}
                      width={600}
                      height={400}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseOut={stopDrawing}
                      className="w-full h-full"
                      style={{ touchAction: 'none' }}
                    />
                    
                    {/* Mock Tools overlay */}
                    <div className="absolute top-2 right-2 bg-white shadow-lg rounded-xl p-2 flex flex-col gap-1 border border-slate-100 max-h-[380px] overflow-y-auto w-12 items-center custom-scrollbar">
                      <button className="p-2 bg-emerald-50 rounded-lg text-emerald-600 mb-2 border border-emerald-200" title="قلم حر"><PenTool size={16}/></button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="خط مستقيم"><ArrowUpRight size={16}/></button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="دائرة"><Circle size={16}/></button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="مربع"><Square size={16}/></button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="مثلث"><Triangle size={16}/></button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="نص"><Type size={16}/></button>
                      <div className="w-8 h-px bg-slate-200 my-1"></div>
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-indigo-500 bg-indigo-50" title="تصحيح الأشكال الذكي (AI)"><Wand2 size={16}/></button>
                      <div className="w-8 h-px bg-slate-200 my-1"></div>
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="بطارية"><Battery size={16}/></button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="مغناطيس"><Magnet size={16}/></button>
                      <div className="w-8 h-px bg-slate-200 my-1"></div>
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="تكبير"><ZoomIn size={16}/></button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="تصغير"><ZoomOut size={16}/></button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-red-500 mt-2" title="حذف"><Trash2 size={16}/></button>
                    </div>
                  </div>

                  {/* Keyboard for Physics/Math */}
                  <div className="bg-slate-100 border border-slate-200 rounded-xl p-3">
                    <div className="text-xs font-bold text-slate-500 mb-2">لوحة إدراج الرموز والمعادلات (إدراج في الرسم)</div>
                    <div className="grid grid-cols-10 gap-2">
                      {['1', '2', '3', '4', '5', '+', '-', '=', '×', '÷'].map(sym => (
                        <button key={sym} className="bg-white border border-slate-200 p-2 rounded-lg font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600">{sym}</button>
                      ))}
                      {['6', '7', '8', '9', '0', '(', ')', '√', 'π', 'θ'].map(sym => (
                        <button key={sym} className="bg-white border border-slate-200 p-2 rounded-lg font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600">{sym}</button>
                      ))}
                      {['α', 'β', 'γ', 'Δ', 'Ω', 'μ', 'Σ', '∞', '∫', 'V'].map(sym => (
                        <button key={sym} className="bg-white border border-slate-200 p-2 rounded-lg font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600">{sym}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Themes Dialog */}
      <AnimatePresence>
        {showTemplateDialog && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center no-print">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl p-8 w-full max-w-3xl shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-800">مظهر وقوالب الاختبار</h3>
                <button onClick={() => setShowTemplateDialog(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
              </div>
              
              <h4 className="font-bold text-sm text-slate-500 mb-3">القوالب الجاهزة</h4>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { id: 'theme-black', name: 'النموذج الوزاري الرسمي', desc: 'قالب رسمي صارم للشهادة الثانوية العامة.', color: '#000000', bg: '#ffffff' },
                  { id: 'theme-navy', name: 'النموذج الأزرق الملكي', desc: 'مناسب للامتحانات الشهرية والتجريبية.', color: '#1e3a8a', bg: '#f0f4f8' },
                  { id: 'theme-green', name: 'النموذج الأخضر الإداري', desc: 'مناسب للمسارات العلمية والجامعية.', color: '#047857', bg: '#f0fdf4' }
                ].map(t => (
                  <div key={t.id} className={`border-2 rounded-2xl overflow-hidden transition-all ${activeTheme === t.id ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <div className="h-32 p-4 flex flex-col items-center justify-center relative border-b border-slate-200" style={{ backgroundColor: t.bg }}>
                      <div className="w-16 h-16 rounded-full border-4 shadow-sm" style={{ borderColor: t.color }}></div>
                      <div className="w-3/4 h-2 rounded mt-4 opacity-20" style={{ backgroundColor: t.color }}></div>
                      <div className="w-1/2 h-2 rounded mt-2 opacity-20" style={{ backgroundColor: t.color }}></div>
                      
                      {activeTheme === t.id && (
                        <div className="absolute top-3 left-3 bg-indigo-600 text-white p-1 rounded-full">
                          <Check size={16} />
                        </div>
                      )}
                    </div>
                    <div className="p-4 bg-white">
                      <h4 className="font-bold text-slate-800 mb-1">{t.name}</h4>
                      <p className="text-xs text-slate-500 mb-4">{t.desc}</p>
                      <div className="flex gap-2">
                        <button onClick={() => setActiveTheme(t.id as any)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-lg text-sm transition-colors">استخدام وتطبيق</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setShowTemplateDialog(false)} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700">تطبيق المظهر</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
