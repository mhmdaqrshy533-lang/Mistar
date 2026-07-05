/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles,
  Wand2,
  ListChecks,
  Save,
  Loader2,
  Image as ImageIcon,
  Copy,
  BrainCircuit,
  ShieldCheck,
  Printer,
  Edit3,
  X,
  Palette
} from 'lucide-react';

export default function AIGenerator({ onBack }: { onBack: () => void }) {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('متوسط');
  const [bloomLevel, setBloomLevel] = useState('شامل (جميع المستويات)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);
  const [activeModel, setActiveModel] = useState<number>(0);
  const [imageUploaded, setImageUploaded] = useState(false);
  
  // Interactive Editing State
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editQText, setEditQText] = useState('');
  const [editQAnswer, setEditQAnswer] = useState('');

  // Themes
  const [activeTheme, setActiveTheme] = useState<'theme-black' | 'theme-navy' | 'theme-green'>('theme-black');

  const bloomLevels = ['تذكر', 'فهم', 'تطبيق', 'تحليل', 'تقييم', 'ابتكار', 'شامل (جميع المستويات)'];
  const themes = [
    { id: 'theme-black', name: 'الأسود الوزاري التقليدي الصارم' },
    { id: 'theme-navy', name: 'الأزرق الملكي الرسمي' },
    { id: 'theme-green', name: 'الأخضر الإداري التعليمي' }
  ];

  const generateContent = async () => {
    if (!topic && !imageUploaded) return;
    setIsGenerating(true);
    
    // Simulate complex generation with 3 anti-cheat models
    setTimeout(() => {
      const generateModel = (modifier: string) => [
        { q: `ما هي أهم خصائص ${topic || 'الدرس المرفق'}؟ ${modifier}`, answer: 'خصائص معيارية تعتمد على الفهم.', type: 'مقال' },
        { q: `قارن بين المفاهيم الأساسية في هذا الموضوع. ${modifier}`, answer: 'مقارنة تحليلية دقيقة.', type: 'تحليل' },
        { q: 'اختر الإجابة الصحيحة: يعتمد هذا المبدأ على...', answer: 'الخيار ج', type: 'اختيار من متعدد' },
      ];

      setGeneratedQuestions([
        generateModel('(النموذج أ)'),
        generateModel('(النموذج ب) - ترتيب مختلف للأسئلة'),
        generateModel('(النموذج ج) - صياغة مختلفة لنفس الأهداف')
      ]);
      setActiveModel(0);
      setIsGenerating(false);
    }, 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const openEditDialog = (index: number) => {
    setEditQText(generatedQuestions[activeModel][index].q);
    setEditQAnswer(generatedQuestions[activeModel][index].answer);
    setEditingIndex(index);
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    const newQuestions = [...generatedQuestions];
    newQuestions[activeModel][editingIndex].q = editQText;
    newQuestions[activeModel][editingIndex].answer = editQAnswer;
    setGeneratedQuestions(newQuestions);
    setEditingIndex(null);
  };

  // Theme Styles
  const getThemeStyles = () => {
    switch (activeTheme) {
      case 'theme-navy':
        return 'font-serif border-[4px] border-double border-[#1e3a8a] bg-white';
      case 'theme-green':
        return 'font-serif border-[4px] border-double border-[#047857] bg-white';
      case 'theme-black':
      default:
        return 'font-serif border-[4px] border-double border-black bg-white';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 select-none font-sans" dir="rtl">
      <style>
        {`
          @media print {
            body * { visibility: hidden; }
            .print-area, .print-area * { visibility: visible; }
            .print-area { position: absolute; left: 0; top: 0; width: 100%; background: white; margin: 0; padding: 20px; }
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

      {/* Interactive Edit Side Panel */}
      <AnimatePresence>
        {editingIndex !== null && (
          <motion.div 
            initial={{ opacity: 0, x: -300 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-96 bg-white z-50 shadow-2xl border-r border-slate-200 no-print flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Edit3 size={20} className="text-indigo-500" />
                تعديل السؤال
              </h3>
              <button onClick={() => setEditingIndex(null)} className="text-slate-400 hover:text-slate-600 bg-white shadow-sm p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">صيغة السؤال</label>
                <textarea 
                  value={editQText}
                  onChange={(e) => setEditQText(e.target.value)}
                  rows={6}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 resize-none transition-all leading-relaxed"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">الإجابة النموذجية</label>
                <input 
                  type="text" 
                  value={editQAnswer}
                  onChange={(e) => setEditQAnswer(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
              <button 
                onClick={saveEdit}
                className="flex-1 bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
              >
                حفظ التعديلات
              </button>
              <button 
                onClick={() => setEditingIndex(null)}
                className="flex-1 bg-white border border-slate-200 text-slate-700 font-bold py-3.5 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
              >
                إلغاء
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
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
                محرر الامتحانات والأتمتة الذكي
                <span className="bg-indigo-500 text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-widest font-black">AI Powered</span>
              </h1>
              <p className="text-slate-400 font-medium text-sm mt-1">
                ارفع صورة أو اكتب عنوان الدرس وسيقوم النظام بتوليد 3 نماذج لمنع الغش (بابل شيت + مقالي) مبنية على مستويات بلوم.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
              
              <div className="mb-6 border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
                   onClick={() => setImageUploaded(!imageUploaded)}>
                <ImageIcon size={32} className={imageUploaded ? "text-indigo-500 mb-2" : "text-slate-400 mb-2"} />
                <span className="text-sm font-bold text-slate-600 text-center">
                  {imageUploaded ? "تم إرفاق صورة صفحة الكتاب بنجاح" : "ارفع صورة من صفحة الكتاب (اختياري)"}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-slate-200"></div>
                <span className="text-xs font-bold text-slate-400">أو</span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </div>

              <label className="block text-sm font-bold text-slate-700 mb-2">عنوان الدرس / المادة</label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="مثال: المعادلات الكيميائية"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all mb-6"
              />

              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <BrainCircuit size={16} className="text-indigo-500" />
                مستويات بلوم المعرفية
              </label>
              <select 
                value={bloomLevel}
                onChange={(e) => setBloomLevel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all mb-6 appearance-none"
              >
                {bloomLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              <label className="block text-sm font-bold text-slate-700 mb-2">مستوى الصعوبة</label>
              <div className="flex gap-2 mb-8">
                {['سهل', 'متوسط', 'صعب'].map(level => (
                  <button 
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${difficulty === level ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' : 'bg-slate-50 text-slate-500 border border-transparent'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              <button 
                onClick={generateContent}
                disabled={(!topic && !imageUploaded) || isGenerating}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-600/20"
              >
                {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
                {isGenerating ? 'جاري المعالجة وبناء النماذج...' : 'توليد النماذج الذكية'}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="md:col-span-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 min-h-[500px]">
              {generatedQuestions.length === 0 && !isGenerating && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60 py-32 no-print">
                  <ShieldCheck size={64} className="mb-4 text-slate-300" />
                  <p className="font-bold text-lg">أداة الأتمتة الذكية المعززة لمنع الغش</p>
                  <p className="text-sm mt-2 max-w-sm text-center">قم بإدخال المعطيات ليتم توليد 3 نماذج مختلفة للامتحان مع نماذج الإجابة (بابل شيت).</p>
                </div>
              )}

              {isGenerating && (
                <div className="h-full flex flex-col items-center justify-center text-indigo-600 py-32 no-print">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Sparkles size={48} />
                  </motion.div>
                  <p className="font-bold mt-6 animate-pulse text-lg">يتم الآن تحليل المحتوى وبناء 3 نماذج فريدة...</p>
                </div>
              )}

              {generatedQuestions.length > 0 && !isGenerating && (
                <div className="space-y-6">
                  {/* Theme Selector & Actions */}
                  <div className="flex flex-wrap justify-between items-center mb-6 gap-4 no-print border-b border-slate-100 pb-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2 bg-slate-100 p-1 rounded-xl w-fit">
                        {['النموذج أ', 'النموذج ب', 'النموذج ج'].map((model, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveModel(idx)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                              activeModel === idx ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                            }`}
                          >
                            {model}
                          </button>
                        ))}
                      </div>

                      <div className="flex gap-2 items-center">
                        <Palette size={16} className="text-slate-400" />
                        <span className="text-xs font-bold text-slate-500">اختر الثيم:</span>
                        {themes.map(t => (
                          <button
                            key={t.id}
                            onClick={() => setActiveTheme(t.id as any)}
                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                              activeTheme === t.id ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                            }`}
                          >
                            {t.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="text-sm font-bold text-slate-600 bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-100">
                        <Copy size={16} />
                        نسخ
                      </button>
                      <button onClick={handlePrint} className="text-sm font-bold text-white bg-indigo-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors">
                        <Printer size={16} />
                        طباعة رسمية
                      </button>
                    </div>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeModel + activeTheme}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 mb-6 flex items-start gap-3 no-print">
                        <ShieldCheck className="text-indigo-500 shrink-0 mt-0.5" size={20} />
                        <div>
                          <p className="text-sm font-bold text-indigo-900 mb-1">حماية ضد الغش مفعلة</p>
                          <p className="text-xs text-indigo-700">هذا النموذج يحتوي على أسئلة بترتيب وتنسيق مختلف كلياً عن النماذج الأخرى مع الحفاظ على نفس وزن التقييم ونفس الأهداف التعليمية حسب تصنيف بلوم ({bloomLevel}).</p>
                        </div>
                      </div>

                      {/* Interactive A4 Page */}
                      <div className={`print-area w-[210mm] min-h-[297mm] mx-auto p-[15mm_12mm] relative bg-white overflow-hidden mb-12 shadow-xl print:shadow-none print:m-0 ${getThemeStyles()}`}>
                        <div className="watermark absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
                          <span className="text-[8rem] font-black transform -rotate-45 whitespace-nowrap text-black">وزارة التربية والتعليم</span>
                        </div>
                        
                        <div className="relative z-10">
                          {/* Header */}
                          <div className="grid grid-cols-3 items-center border-b-[3px] border-double border-current pb-3 mb-4 text-center">
                            <div className="text-right text-sm leading-relaxed font-bold text-black">
                              <div>وزارة التربية والتعليم</div>
                              <div>مكتب التربية والتعليم بالمحافظة</div>
                              <div>إدارة الامتحانات والاختبارات الدورية</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 border-2 border-dashed border-slate-500 rounded-full flex items-center justify-center text-[10px] text-slate-500 mb-2">الشعار الرسمي</div>
                              <span className="border border-current text-black px-3 py-0.5 text-[11px] font-bold">وثيقة امتحانية رسمية</span>
                            </div>
                            <div className="text-left text-sm leading-relaxed font-bold text-black">
                              <div>المادة: {topic || '........'}</div>
                              <div>الصف: الثالث الثانوي</div>
                              <div>الزمن: ساعتان ونصف</div>
                              <div>الدورة: الفصل الدراسي الأول</div>
                            </div>
                          </div>

                          {/* Meta Data Line */}
                          <div className="flex border-[1.5px] border-current my-3 text-sm">
                            <div className="flex-[2.5] p-2 border-l-[1.5px] border-current text-black"><b>اسم الطالب / الإدخال الثلاثي:</b> ....................................................</div>
                            <div className="flex-1 p-2 border-l-[1.5px] border-current text-black"><b>رقم الجلوس:</b> .....................</div>
                            <div className="flex-1 p-2 text-black"><b>القاعة:</b> .............</div>
                          </div>

                          <div className="text-center font-serif text-[21px] font-bold my-4 text-black">
                            امتحانات النقل لنهاية الفصل الدراسي الأول لعام ٢٠٢٦ م (النموذج {['أ', 'ب', 'ج'][activeModel]})
                          </div>

                        {/* Questions */}
                        <div className="space-y-6">
                          {generatedQuestions[activeModel].map((item: any, idx: number) => (
                            <div 
                              key={idx} 
                              onClick={() => openEditDialog(idx)}
                              className="group rounded-xl hover:bg-slate-50 hover:shadow-sm transition-all cursor-pointer border border-transparent hover:border-indigo-200 relative mb-[22px]"
                            >
                              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity no-print">
                                <button className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200">
                                  <Edit3 size={16} />
                                </button>
                              </div>

                              <div className="flex items-center justify-between gap-4 mb-3 border-b-[1.5px] border-current pb-1">
                                <div className="font-bold text-[14.5px] flex-1 text-black">
                                  السؤال {idx + 1}: {item.q}
                                </div>
                                <div className="border border-current px-2 py-0.5 text-xs font-bold bg-[#f8fafc] text-black">
                                  الدرجة: ١٠
                                </div>
                              </div>

                              <div className="mt-2 text-sm text-black">
                                  <div className="no-print mb-2">
                                    <span className="text-sm text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100 inline-block">
                                      الإجابة النموذجية: {item.answer}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-300">
                                     <div className="font-bold pl-3 font-mono text-black">( &nbsp; &nbsp; )</div>
                                     <div className="flex-1">{item.q}</div>
                                  </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="mt-16 pt-6 border-t-2 border-current flex justify-between items-center font-bold text-sm text-black">
                          <p>معلم المادة: .................................</p>
                          <p>توقيع الموجه: .................................</p>
                          <p>تمنياتنا لكم بالنجاح والتوفيق</p>
                        </div>
                      </div>
                      </div>

                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
