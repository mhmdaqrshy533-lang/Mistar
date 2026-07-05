import React, { useState } from 'react';
import { 
  ArrowRight, 
  Mail,
  Loader2,
  Wand2,
  Printer,
  Copy,
  PenTool,
  CheckCircle2,
  Building
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function OfficialMemos({ onBack }: { onBack: () => void }) {
  const [purpose, setPurpose] = useState('');
  const [recipient, setRecipient] = useState('مدير المدرسة');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMemo, setGeneratedMemo] = useState<string | null>(null);

  const recipients = ['مدير المدرسة', 'إدارة التوجيه', 'ولي أمر طالب', 'لجنة الاختبارات'];

  const handleGenerate = async () => {
    if (!purpose) return;
    setIsGenerating(true);
    
    // Simulate AI generation with proper administrative language
    setTimeout(() => {
      let title = "مذكرة رسمية";
      if (recipient === 'مدير المدرسة') title = "موضوع: إشعار وتوضيح حالة إدارية";
      if (recipient === 'ولي أمر طالب') title = "إشعار بشأن المستوى الأكاديمي/السلوكي";
      
      const date = new Date().toLocaleDateString('ar-YE');
      
      const memo = `
الجمهورية اليمنية
وزارة التربية والتعليم
إدارة التربية والتعليم

التاريخ: ${date}

الأخ / ${recipient} المحترم،
تحية طيبة وبعد،،،

${title}

بناءً على الصلاحيات المخولة لنا والمتابعة المستمرة لسير العملية التعليمية، نرفع إليكم هذه المذكرة بخصوص:
(${purpose})

حيث لوحظ من خلال المتابعة والتقييم ما يستدعي اتخاذ الإجراءات اللازمة لضمان سير العملية التربوية والتعليمية على أكمل وجه. وعليه، نأمل التكرم بالاطلاع والتوجيه بما ترونه مناسباً وفقاً للوائح المنظمة.

وتفضلوا بقبول خالص التحيات والتقدير،،،

مقدم الطلب/المعلم:
التوقيع: .....................
      `.trim();
      
      setGeneratedMemo(memo);
      setIsGenerating(false);
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 select-none font-sans" dir="rtl">
      <style>
        {`
          @media print {
            body * { visibility: hidden; }
            .print-area, .print-area * { visibility: visible; }
            .print-area { position: absolute; left: 0; top: 0; width: 100%; padding: 40px; background: white; }
            .no-print { display: none !important; }
            .watermark {
               position: fixed;
               top: 50%;
               left: 50%;
               transform: translate(-50%, -50%);
               opacity: 0.05;
               font-size: 8rem;
               font-weight: 900;
               color: black;
               z-index: -1;
               white-space: nowrap;
               pointer-events: none;
            }
          }
        `}
      </style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 shadow-xl relative overflow-hidden rounded-[2rem] mb-8 flex items-center justify-between border-b border-slate-800 no-print">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="relative z-10 flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20 transition-all"
            >
              <ArrowRight size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-black text-white flex items-center gap-3">
                المذكرات الرسمية الذكية
                <span className="bg-slate-700 text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-widest font-black">AI Powered</span>
              </h1>
              <p className="text-slate-400 font-medium text-sm mt-1">
                صياغة قانونية وإدارية احترافية للخطابات الرسمية والإنذارات بضغطة زر.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8 no-print">
          {/* Controls */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
              
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Building size={16} className="text-slate-500" />
                الجهة الموجه إليها الخطاب
              </label>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {recipients.map(rec => (
                  <label key={rec} className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${recipient === rec ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                    <input 
                      type="radio" 
                      name="recipient" 
                      value={rec}
                      checked={recipient === rec}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="hidden"
                    />
                    <span className="font-bold text-xs text-center w-full">{rec}</span>
                  </label>
                ))}
              </div>

              <label className="block text-sm font-bold text-slate-700 mb-2">غرض المذكرة أو صلب الموضوع</label>
              <textarea 
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="مثال: أريد إبلاغ المدير بأن هناك نقص في مقاعد الصف، أو إنذار للطالب أحمد لتكرار غيابه بدون عذر..."
                rows={5}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-800 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all mb-6 resize-none leading-relaxed"
              />

              <button 
                onClick={handleGenerate}
                disabled={!purpose || isGenerating}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-900/20"
              >
                {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <PenTool size={20} />}
                {isGenerating ? 'جاري الصياغة الإدارية...' : 'صياغة المذكرة الرسمية'}
              </button>
            </div>
          </div>

          {/* Results Preview */}
          <div className="md:col-span-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 min-h-[600px] flex flex-col">
              {!generatedMemo && !isGenerating && (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 opacity-60 py-32">
                  <Mail size={64} className="mb-4 text-slate-300" />
                  <p className="font-bold text-lg">صياغة الخطابات الرسمية</p>
                  <p className="text-sm mt-2 max-w-sm text-center">أدخل غرض الخطاب، وسيقوم النظام باختيار الألفاظ الإدارية والقانونية المناسبة وتنسيقها جاهزة للطباعة.</p>
                </div>
              )}

              {isGenerating && (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-600 py-32">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Wand2 size={48} />
                  </motion.div>
                  <p className="font-bold mt-6 animate-pulse text-lg">تطبيق القواعد الإدارية واللغة الرسمية...</p>
                </div>
              )}

              {generatedMemo && !isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                      <CheckCircle2 size={24} className="text-emerald-500" />
                      معاينة المذكرة
                    </h2>
                    
                    <div className="flex gap-2">
                      <button className="text-sm font-bold text-white bg-emerald-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors" onClick={handlePrint}>
                        <Printer size={16} />
                        طباعة رسمية
                      </button>
                    </div>
                  </div>
                  
                  {/* Print Area Container */}
                  <div className="print-area bg-white text-black p-8 border border-slate-200 rounded-xl shadow-inner mx-auto w-full max-w-3xl font-serif leading-loose relative">
                     <div className="watermark">وزارة التربية والتعليم</div>
                     <pre className="whitespace-pre-wrap font-bold text-lg font-serif">
                       {generatedMemo}
                     </pre>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
