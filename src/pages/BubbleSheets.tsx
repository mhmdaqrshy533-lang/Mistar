import React, { useState } from 'react';
import { ArrowRight, Printer, Settings2, FileText } from 'lucide-react';

export default function BubbleSheets({ onBack }: { onBack: () => void }) {
  const [activeTemplate, setActiveTemplate] = useState('yemen_hs');

  const renderYemenTemplate = () => (
    <div className="bg-white mx-auto print:mx-0 w-[210mm] h-[297mm] p-8 border-2 border-black flex flex-col font-sans relative" dir="rtl">
      {/* Header */}
      <div className="flex justify-between border-b-2 border-black pb-4 mb-4">
        {/* Right */}
        <div className="w-[30%] text-center border border-black p-2 rounded-xl text-sm font-bold leading-relaxed">
          الجمهورية اليمنية<br/>
          وزارة التربية والتعليم<br/>
          مكتب التربية والتعليم بالمحافظة<br/>
          المدرسة: .........................
        </div>
        {/* Center */}
        <div className="w-[35%] text-center border border-black p-2 rounded-xl">
          <p className="font-bold mb-2">بسم الله الرحمن الرحيم</p>
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/06/Coat_of_arms_of_Yemen.svg" alt="شعار" className="h-12 mx-auto mb-2 opacity-80" />
          <p className="text-sm font-bold">اختبار مادة: .................</p>
        </div>
        {/* Left */}
        <div className="w-[30%] border border-black p-2 rounded-xl text-sm font-bold leading-relaxed">
          اسم الطالب: .........................<br/>
          رقم الجلوس: .........................<br/>
          الشعبة/الصف: .........................<br/>
          التاريخ: ....../....../202 م
        </div>
      </div>

      {/* Instructions */}
      <div className="border border-black p-4 text-center font-bold mb-6 rounded-xl bg-slate-50">
        <h2 className="text-lg border-b border-black inline-block pb-1 px-4 mb-3">ورقة الإجابة (بابل شيت)</h2>
        <div className="text-sm flex justify-center gap-8">
          <p>تظليل الدائرة بالكامل <span className="inline-block w-4 h-4 bg-black rounded-full align-middle"></span> حتى يتم احتساب الدرجة.</p>
          <p>استخدم القلم الرصاص (HB) أو الجاف الأسود/الأزرق.</p>
        </div>
      </div>

      {/* Tables */}
      <div className="flex gap-6 flex-1">
        {/* Q1 True/False */}
        <div className="flex-1 border-2 border-black rounded-xl overflow-hidden flex flex-col">
          <div className="bg-slate-100 border-b-2 border-black p-2 text-center font-bold">السؤال الأول (صح / خطأ)</div>
          <table className="w-full text-center flex-1 text-sm">
            <thead>
              <tr className="border-b border-black bg-slate-50">
                <th className="py-2 border-l border-black w-16">الرقم</th>
                <th className="py-2 border-l border-black">صح (✓)</th>
                <th className="py-2">خطأ (✗)</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 20 }).map((_, i) => (
                <tr key={i} className="border-b border-slate-300 last:border-b-0">
                  <td className="py-1.5 border-l border-black font-bold">{i + 1}</td>
                  <td className="py-1.5 border-l border-black">
                    <div className="w-5 h-5 rounded-full border border-slate-400 mx-auto"></div>
                  </td>
                  <td className="py-1.5">
                    <div className="w-5 h-5 rounded-full border border-slate-400 mx-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Q2 MCQ */}
        <div className="flex-1 border-2 border-black rounded-xl overflow-hidden flex flex-col">
          <div className="bg-slate-100 border-b-2 border-black p-2 text-center font-bold">السؤال الثاني (اختيار من متعدد)</div>
          <table className="w-full text-center flex-1 text-sm">
            <thead>
              <tr className="border-b border-black bg-slate-50">
                <th className="py-2 border-l border-black w-12">الرقم</th>
                <th className="py-2 border-l border-black">أ</th>
                <th className="py-2 border-l border-black">ب</th>
                <th className="py-2 border-l border-black">ج</th>
                <th className="py-2">د</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 20 }).map((_, i) => (
                <tr key={i} className="border-b border-slate-300 last:border-b-0">
                  <td className="py-1.5 border-l border-black font-bold">{i + 1}</td>
                  <td className="py-1.5 border-l border-black"><div className="w-5 h-5 rounded-full border border-slate-400 mx-auto"></div></td>
                  <td className="py-1.5 border-l border-black"><div className="w-5 h-5 rounded-full border border-slate-400 mx-auto"></div></td>
                  <td className="py-1.5 border-l border-black"><div className="w-5 h-5 rounded-full border border-slate-400 mx-auto"></div></td>
                  <td className="py-1.5"><div className="w-5 h-5 rounded-full border border-slate-400 mx-auto"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderEgyptTemplate = () => (
    <div className="bg-white mx-auto print:mx-0 w-[210mm] h-[297mm] p-10 font-sans text-sm relative border-2 border-black" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-start mb-6 border-b-2 border-black pb-4">
        {/* ID Grid */}
        <div className="flex items-start gap-2">
          <div className="text-center font-bold mt-2">رقم الجلوس:</div>
          <div className="flex border border-black p-1">
            {Array.from({ length: 6 }).map((_, col) => (
              <div key={col} className="flex flex-col items-center px-1 border-l border-slate-300 last:border-0">
                <div className="w-6 h-6 border border-black mb-1"></div>
                {Array.from({ length: 10 }).map((_, row) => (
                  <div key={row} className="w-4 h-4 rounded-full border border-slate-400 mb-1 flex items-center justify-center text-[8px] text-slate-500">
                    {row}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="text-right space-y-3 font-bold">
          <p>مدرسة / ..................................................</p>
          <p>امتحان إتمام الشهادة الـ / .................................</p>
          <p>مادة / .....................................................</p>
          <p>اسم الطالب / .............................................</p>
        </div>
      </div>

      <div className="text-center font-bold mb-6 pb-2 border-b-2 border-black">
        تظليل الدائرة بالكامل هكذا <span className="inline-block w-4 h-4 bg-black rounded-full align-middle mx-1"></span> حتى يتم احتساب الدرجات.
      </div>

      {/* Grid of 55 Questions */}
      <div className="flex justify-between gap-4 px-4">
        {/* Column 1: 1-20 */}
        <div className="flex flex-col gap-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-6 text-left font-bold">{i + 1}</span>
              {['أ', 'ب', 'ج', 'د'].map(opt => (
                <div key={opt} className="w-5 h-5 rounded-full border border-slate-400 flex items-center justify-center text-[10px] text-slate-500">{opt}</div>
              ))}
            </div>
          ))}
        </div>
        {/* Column 2: 21-40 */}
        <div className="flex flex-col gap-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i + 20} className="flex items-center gap-3">
              <span className="w-6 text-left font-bold">{i + 21}</span>
              {['أ', 'ب', 'ج', 'د'].map(opt => (
                <div key={opt} className="w-5 h-5 rounded-full border border-slate-400 flex items-center justify-center text-[10px] text-slate-500">{opt}</div>
              ))}
            </div>
          ))}
        </div>
        {/* Column 3: 41-60 */}
        <div className="flex flex-col gap-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i + 40} className="flex items-center gap-3">
              <span className="w-6 text-left font-bold">{i + 41}</span>
              {['أ', 'ب', 'ج', 'د'].map(opt => (
                <div key={opt} className="w-5 h-5 rounded-full border border-slate-400 flex items-center justify-center text-[10px] text-slate-500">{opt}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUniversityTemplate = () => (
    <div className="bg-white mx-auto print:mx-0 w-[210mm] h-[297mm] p-6 font-sans text-xs relative" dir="ltr">
      <div className="flex justify-between border-b-2 border-red-500 pb-2 mb-4">
        {/* ID Area */}
        <div className="flex border border-red-500 p-1 bg-red-50/20">
          {Array.from({ length: 8 }).map((_, col) => (
            <div key={col} className="flex flex-col items-center px-0.5 border-l border-red-200 last:border-0">
              <div className="text-[10px] text-red-600 mb-1">ID</div>
              {Array.from({ length: 10 }).map((_, row) => (
                <div key={row} className="w-3.5 h-3.5 rounded-full border border-red-300 mb-0.5 flex items-center justify-center text-[8px] text-red-500">
                  {row}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="text-right text-red-600 font-bold text-xl">جامعة دمشق</div>
      </div>

      <div className="flex justify-between">
        {/* Columns 1-4 */}
        {[0, 1, 2, 3].map(colIdx => (
          <div key={colIdx} className="flex flex-col gap-1 w-[23%] bg-red-50/10 p-2 rounded-lg border border-red-100">
            {Array.from({ length: 30 }).map((_, i) => {
              const qNum = colIdx * 30 + i + 1;
              return (
                <div key={qNum} className="flex items-center justify-between">
                  <span className="w-6 text-right font-bold text-red-700">{qNum}.</span>
                  {['A', 'B', 'C', 'D', 'E'].map(opt => (
                    <div key={opt} className="w-3.5 h-3.5 rounded-full border border-red-400 flex items-center justify-center text-[8px] text-red-500">{opt}</div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-12" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <ArrowRight className="text-slate-600" />
            </button>
            <div className="w-10 h-10 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center">
              <FileText size={24} />
            </div>
            <h1 className="text-2xl font-black text-slate-800 font-serif">نماذج بابل شيت (Bubble Sheets)</h1>
          </div>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors"
          >
            <Printer size={18} />
            طباعة الورقة (A4)
          </button>
        </div>
      </header>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 mt-8 print:hidden flex gap-4 mb-8">
        <button 
          onClick={() => setActiveTemplate('yemen_hs')}
          className={`flex-1 p-4 rounded-2xl border-2 font-bold transition-all ${activeTemplate === 'yemen_hs' ? 'border-violet-600 bg-violet-50 text-violet-700' : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300'}`}
        >
          نموذج (1) - مزدوج (صح/خطأ واختيارات)
        </button>
        <button 
          onClick={() => setActiveTemplate('egypt_hs')}
          className={`flex-1 p-4 rounded-2xl border-2 font-bold transition-all ${activeTemplate === 'egypt_hs' ? 'border-violet-600 bg-violet-50 text-violet-700' : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300'}`}
        >
          نموذج (2) - 60 سؤال (رقم جلوس)
        </button>
        <button 
          onClick={() => setActiveTemplate('univ_ds')}
          className={`flex-1 p-4 rounded-2xl border-2 font-bold transition-all ${activeTemplate === 'univ_ds' ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-200 bg-white text-slate-600 hover:border-red-300'}`}
        >
          نموذج (3) - 120 سؤال (جامعي)
        </button>
      </div>

      {/* Render Area */}
      <div className="flex justify-center print:block print:w-full print:h-full">
        <div className="shadow-2xl print:shadow-none bg-white">
          {activeTemplate === 'yemen_hs' && renderYemenTemplate()}
          {activeTemplate === 'egypt_hs' && renderEgyptTemplate()}
          {activeTemplate === 'univ_ds' && renderUniversityTemplate()}
        </div>
      </div>
      
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}
