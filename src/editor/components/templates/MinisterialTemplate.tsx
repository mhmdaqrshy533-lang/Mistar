import React from 'react';
import { useEditorStore } from '../../store/useEditorStore';

export const MinisterialHeader = () => {
  const { document } = useEditorStore();
  const meta = document.metadata;

  return (
    <div className="w-full flex flex-col items-center select-none bg-white p-2" dir="rtl">
      {/* Main Double Border Wrapper */}
      <div className="w-full border-4 border-double border-black p-2 flex flex-col">
        
        {/* Top Header Row with 3 Columns */}
        <div className="flex w-full justify-between items-stretch">
          
          {/* Right - Educational Directory Info */}
          <div className="w-[30%] text-[11px] font-bold leading-normal text-right text-black flex flex-col justify-between">
            <div>الجمهورية اليمنية</div>
            <div>وزارة التربية والتعليم</div>
            <div>مكتب التربية والتعليم م/ <span className="font-semibold text-slate-800">{meta.governorate || '...............'}</span></div>
            <div>إدارة التربية والتعليم بمديرية/ <span className="font-semibold text-slate-800">{meta.directorate || '...............'}</span></div>
            <div>مدرسة/ <span className="font-semibold text-slate-800">{meta.school || '...............................'}</span></div>
          </div>

          {/* Center - Stylized Eagle Emblem and Exam Title */}
          <div className="w-[40%] flex flex-col items-center justify-center border-x border-slate-300 px-2 text-center">
            {/* Custom vector national emblem (Yemeni Eagle) - 100% Offline */}
            <svg viewBox="0 0 100 85" className="w-14 h-10 text-neutral-800 mb-1" fill="currentColor">
              {/* Stylized Yemeni Eagle Vector */}
              <path d="M50 10 L54 22 L66 12 L61 28 L78 18 L68 35 L85 30 L72 45 L80 54 L60 50 L56 65 L50 53 L44 65 L40 50 L20 54 L28 45 L15 30 L32 35 L22 18 L39 28 L34 12 L46 22 Z" />
              {/* Shield details */}
              <ellipse cx="50" cy="38" rx="8" ry="10" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="50" y1="28" x2="50" y2="48" stroke="currentColor" strokeWidth="1" />
              {/* Bottom scroll ribbon */}
              <path d="M25 65 Q50 73 75 65 L73 61 Q50 68 27 61 Z" />
              <text x="50" y="77" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="currentColor">الجمهورية اليمنية</text>
            </svg>
            
            {/* Elegant Double Border Exam Title Box */}
            <div className="border border-black p-1 w-full bg-slate-50 rounded">
              <h2 className="text-[12px] font-extrabold text-black leading-tight">
                {meta.examTitle || 'اختبار نهاية الفصل الدراسي الأول'}
              </h2>
              <div className="text-[10px] font-bold text-neutral-600 mt-0.5">
                {meta.examType || 'امتحان تحريري'} - {meta.semester || 'الفصل الأول'}
              </div>
            </div>
          </div>

          {/* Left - Exam Technical Parameters */}
          <div className="w-[30%] text-[11px] font-bold leading-normal text-right pr-6 text-black flex flex-col justify-between">
            <div>الصف: <span className="font-semibold text-slate-800">{meta.grade || '................'}</span></div>
            <div>الشعبة: <span className="font-semibold text-slate-800">{meta.division || '................'}</span></div>
            <div>المادة: <span className="font-semibold text-slate-800">{meta.subject || '................'}</span></div>
            <div>الزمن: <span className="font-semibold text-slate-800">{meta.time || '................'}</span></div>
            <div>العام الدراسي: <span className="font-semibold text-slate-800">{meta.academicYear || '2025/2026م'}</span></div>
          </div>
        </div>

        {/* Middle Row - Beautiful Student Details & Grades Box */}
        <div className="w-full mt-3 border border-black rounded overflow-hidden grid grid-cols-12 text-center bg-slate-50/50">
          <div className="col-span-3 border-l border-black p-1 text-[10px] font-bold flex flex-col justify-center">
            <span>الرقم السري: ( ............ )</span>
          </div>
          <div className="col-span-6 border-l border-black p-1 text-[11px] font-bold flex flex-col justify-center text-right pr-3">
            <span>إسم الطالب رباعياً: ................................................................</span>
          </div>
          <div className="col-span-3 p-1 text-[10px] font-bold flex flex-col justify-center">
            <span>رقم الجلوس: ( ............ )</span>
          </div>
        </div>

        {/* Marks Matrix row */}
        <div className="w-full mt-2 border border-slate-400 rounded overflow-hidden grid grid-cols-12 text-center bg-slate-50 text-[10px] font-bold">
          <div className="col-span-2 border-l border-slate-400 p-1">الدرجة بالأرقام</div>
          <div className="col-span-3 border-l border-slate-400 p-1">الدرجة بالكتابة</div>
          <div className="col-span-3 border-l border-slate-400 p-1">توقيع المصحح</div>
          <div className="col-span-2 border-l border-slate-400 p-1">توقيع المراجع</div>
          <div className="col-span-2 p-1">الدرجة الكلية: <span className="text-rose-600 text-xs font-black">{meta.marks || '50'}</span></div>
        </div>

      </div>
      
      {/* Tear/Cut Section Line */}
      <div className="w-full flex items-center justify-between text-[9px] text-neutral-400 font-mono my-1 select-none overflow-hidden">
        <span className="shrink-0 pl-2">قـــص هنـــــــاء - - - - - - - - - - - - - - -</span>
        <span className="shrink-0 border-t border-dashed border-neutral-300 flex-1 mx-2"></span>
        <span className="shrink-0">✂ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span>
        <span className="shrink-0 border-t border-dashed border-neutral-300 flex-1 mx-2"></span>
        <span className="shrink-0 pr-2">- - - - - - - - - - - - - - - قـــص هنـــــــاء</span>
      </div>

      {/* Intro Question row with question/answer guide */}
      <div className="w-full flex justify-between border-b-2 border-black mt-1 mb-2 px-3 py-1 bg-neutral-900 text-white rounded">
        <div className="text-[11px] font-black w-24 text-center">الدرجة بالدرجات</div>
        <div className="flex-1 text-center text-[11px] font-extrabold tracking-wide">
          أجب مستعيناً بالله العلي القدير عن جميع الأسئلة التالية:
        </div>
        <div className="text-[11px] font-black w-24 text-center">رقم السؤال</div>
      </div>
    </div>
  );
};

export const MinisterialFooter = () => {
  const { document } = useEditorStore();
  const meta = document.metadata;

  return (
    <div className="w-full flex flex-col items-center mt-auto pb-4 px-4 select-none" dir="rtl">
      <div className="w-full border-t-2 border-double border-black mb-2"></div>
      
      {/* High-fidelity official signatures layout */}
      <div className="w-full grid grid-cols-3 text-center text-[11px] font-bold text-black mt-2 gap-4">
        <div className="flex flex-col items-center">
          <span className="text-neutral-500">معد الإختبار (المعلم)</span>
          <span className="text-slate-800 mt-1 font-extrabold">أ/ {meta.teacherName || '................'}</span>
          <span className="text-[9px] text-neutral-400 mt-2">التوقيع: .....................</span>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <span className="text-emerald-700 font-extrabold text-[12px] py-1 border-y border-dashed border-emerald-400 px-3 bg-emerald-50 rounded">
            انتهت الأسئلة وبحمد الله وتوفيقه
          </span>
          <span className="text-[9px] text-neutral-400 mt-2">محرر الرقيم - ذكي وبسيط</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-neutral-500 font-sans">مدير المدرسة</span>
          <span className="text-slate-800 mt-1 font-extrabold">{meta.schoolPrincipal || '................'}</span>
          <span className="text-[9px] text-neutral-400 mt-2">الختم والتوقيع: .....................</span>
        </div>
      </div>
    </div>
  );
};

export const PrivateHeader = () => {
  const { document } = useEditorStore();
  const meta = document.metadata;

  return (
    <div className="w-full flex flex-col items-center select-none bg-white p-3" dir="rtl">
      <div className="w-full border-2 border-indigo-600 rounded-2xl p-4 flex justify-between items-center bg-indigo-50/25">
        <div className="text-right text-[11px] font-bold leading-relaxed">
          <div className="text-indigo-700 text-sm font-black mb-1">{meta.school || 'مدرسة الرقيم النموذجية'}</div>
          <div>المادة: <span className="text-slate-700 font-semibold">{meta.subject || 'الرياضيات'}</span></div>
          <div>الصف: <span className="text-slate-700 font-semibold">{meta.grade || 'التاسع الأساسي'}</span></div>
        </div>
        <div className="text-center">
          <div className="text-sm font-black text-slate-800 tracking-wide mb-1">{meta.examTitle || 'اختبار نهاية الفصل الدراسي'}</div>
          <div className="text-[10px] text-indigo-600 font-extrabold bg-indigo-100/60 px-3 py-1 rounded-full">
            زمن الاختبار: {meta.time || 'ساعتان'}
          </div>
        </div>
        <div className="text-left text-[11px] font-bold leading-relaxed">
          <div>العام الدراسي: <span className="text-slate-700 font-semibold">{meta.academicYear || '2025/2026م'}</span></div>
          <div className="text-rose-600 mt-1">الدرجة الكلية: <span className="text-rose-700 text-sm font-black">{meta.marks || '50'}</span></div>
        </div>
      </div>
      
      {/* Student Details */}
      <div className="w-full mt-2 border border-dashed border-indigo-300 rounded-xl p-2.5 flex justify-between bg-slate-50/50 text-[11px] font-bold text-slate-600">
        <div>اسم الطالب: ................................................................</div>
        <div>الشعبة: ( {meta.division || 'أ'} )</div>
        <div>رقم الجلوس: ....................</div>
      </div>

      <div className="w-full border-b-2 border-indigo-600 my-2"></div>
    </div>
  );
};

export const PrivateFooter = () => {
  const { document } = useEditorStore();
  const meta = document.metadata;

  return (
    <div className="w-full flex justify-between px-8 py-3 bg-slate-50 border-t border-slate-100 mt-auto text-[11px] font-bold" dir="rtl">
      <div className="text-indigo-600">
        تمنياتنا لكم بالنجاح والتفوق الإبداعي
      </div>
      <div className="text-slate-700">
        معد المادة: أ/ {meta.teacherName || ' سهيل الهزبري'}
      </div>
    </div>
  );
};
