import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Image as ImageIcon, FileText, BrainCircuit, Loader2, BookOpen, PenTool, CheckCircle, Network, TrendingUp } from 'lucide-react';

export default function AITeacherWorkspace({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'ocr' | 'concepts' | 'questions' | 'correction' | 'kg' | 'adaptive'>('ocr');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  
  // States
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('');
  const [difficulty, setDifficulty] = useState('متوسط');
  const [qCount, setQCount] = useState(5);
  const [modelAnswer, setModelAnswer] = useState('');
  const [studentAnswer, setStudentAnswer] = useState('');

  const callApi = async (url: string, body: any, isFormData = false) => {
    setLoading(true); setResults(null);
    try {
      const options: RequestInit = { method: 'POST' };
      if (isFormData) {
        options.body = body;
      } else {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(body);
      }
      const res = await fetch(url, options);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      alert('حدث خطأ أثناء المعالجة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 select-none font-sans text-right" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50">
              <ArrowRight size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                <BrainCircuit className="text-indigo-600" />
                محركات الذكاء الاصطناعي (Teacher Intelligence)
              </h1>
              <p className="text-slate-500 text-sm">التطبيق الفعلي للمحركات الذكية بدون واجهات وهمية</p>
            </div>
          </div>
        </header>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-64 bg-slate-100 p-4 flex flex-col gap-2 border-l border-slate-200">
            {[
              { id: 'ocr', icon: <ImageIcon size={20} />, label: 'محرك OCR' },
              { id: 'concepts', icon: <BookOpen size={20} />, label: 'استخراج المفاهيم' },
              { id: 'questions', icon: <PenTool size={20} />, label: 'توليد الأسئلة' },
              { id: 'correction', icon: <CheckCircle size={20} />, label: 'التصحيح الذكي' },
              { id: 'kg', icon: <Network size={20} />, label: 'الرسم البياني المعرفي' },
              { id: 'adaptive', icon: <TrendingUp size={20} />, label: 'التعلم التكيفي' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setResults(null); }}
                className={`p-4 rounded-xl flex items-center gap-3 font-bold transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 p-8 bg-white min-h-[600px]">
            {activeTab === 'ocr' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-800">الوحدة الأولى: محرك استخراج النصوص (OCR)</h2>
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="block w-full" />
                <button onClick={() => {
                  const fd = new FormData(); fd.append('image', imageFile!);
                  callApi('/api/ocr/extract', fd, true);
                }} disabled={!imageFile || loading} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50 flex items-center gap-2">
                  {loading ? <Loader2 className="animate-spin" /> : <ImageIcon size={18} />} معالجة
                </button>
              </div>
            )}

            {activeTab === 'concepts' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-800">الوحدة الثانية: استخراج المفاهيم والأهداف</h2>
                <textarea value={textContent} onChange={(e) => setTextContent(e.target.value)} className="w-full h-40 p-4 border rounded-xl bg-slate-50" placeholder="أدخل نصاً تعليمياً..." />
                <button onClick={() => callApi('/api/concepts/analyze', { content: textContent })} disabled={!textContent || loading} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50">
                  {loading ? <Loader2 className="animate-spin" /> : 'تحليل النص'}
                </button>
              </div>
            )}

            {activeTab === 'questions' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-800">الوحدة الثالثة: توليد الأسئلة الذكي</h2>
                <textarea value={textContent} onChange={(e) => setTextContent(e.target.value)} className="w-full h-32 p-4 border rounded-xl bg-slate-50" placeholder="المحتوى التعليمي..." />
                <button onClick={() => callApi('/api/questions/generate', { content: textContent, difficulty, count: qCount, types: ['mcq', 'essay'] })} disabled={!textContent || loading} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50">
                  {loading ? <Loader2 className="animate-spin" /> : 'توليد أسئلة'}
                </button>
              </div>
            )}

            {activeTab === 'correction' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800">الوحدة الرابعة: التصحيح الذكي وتحليل الأخطاء</h2>
                <input value={textContent} onChange={(e) => setTextContent(e.target.value)} className="w-full p-4 border rounded-xl bg-slate-50" placeholder="نص السؤال..." />
                <textarea value={modelAnswer} onChange={(e) => setModelAnswer(e.target.value)} className="w-full h-24 p-4 border rounded-xl bg-slate-50" placeholder="الإجابة النموذجية..." />
                <textarea value={studentAnswer} onChange={(e) => setStudentAnswer(e.target.value)} className="w-full h-24 p-4 border rounded-xl bg-slate-50" placeholder="إجابة الطالب..." />
                <button onClick={() => callApi('/api/correction/analyze', { questionText: textContent, modelAnswer, studentAnswer })} disabled={!studentAnswer || !modelAnswer || loading} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50">
                  {loading ? <Loader2 className="animate-spin" /> : 'تصحيح ومقارنة'}
                </button>
              </div>
            )}

            {activeTab === 'kg' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800">الوحدة الخامسة: الرسم البياني المعرفي (Knowledge Graph)</h2>
                <textarea value={textContent} onChange={(e) => setTextContent(e.target.value)} className="w-full h-32 p-4 border rounded-xl bg-slate-50" placeholder="أدخل المفاهيم مفصولة بفواصل (مثال: الجاذبية، الكتلة، التسارع)..." />
                <button onClick={() => callApi('/api/knowledge-graph/build', { concepts: textContent.split(',').map(c => c.trim()) })} disabled={!textContent || loading} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50">
                  {loading ? <Loader2 className="animate-spin" /> : 'بناء الرسم البياني'}
                </button>
              </div>
            )}

            {activeTab === 'adaptive' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800">الوحدة السادسة: التعلم التكيفي (Adaptive Learning)</h2>
                <textarea value={textContent} onChange={(e) => setTextContent(e.target.value)} className="w-full h-24 p-4 border rounded-xl bg-slate-50" placeholder="ملف الطالب وسلوكه (مثال: طالب يواجه صعوبة في فهم المعادلات المعقدة)..." />
                <textarea value={studentAnswer} onChange={(e) => setStudentAnswer(e.target.value)} className="w-full h-24 p-4 border rounded-xl bg-slate-50" placeholder="الدرجات الأخيرة (مثال: 60 في الجبر، 90 في الهندسة)..." />
                <button onClick={() => callApi('/api/adaptive/recommend', { studentProfile: textContent, recentScores: [studentAnswer] })} disabled={!textContent || loading} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50">
                  {loading ? <Loader2 className="animate-spin" /> : 'توليد الخطة التكيفية'}
                </button>
              </div>
            )}

            {results && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 bg-slate-900 rounded-2xl shadow-xl overflow-hidden">
                <div className="text-emerald-400 font-bold text-sm mb-4">نجاح العملية (API Response)</div>
                <pre className="text-slate-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap max-h-96" dir="ltr">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
