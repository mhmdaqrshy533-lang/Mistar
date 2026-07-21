import React from 'react';
import { useEditorStore } from '../../store/useEditorStore';

export const THEME_PRESETS_CLASSES: Record<string, {
  mainBorder: string;
  borderStyle: string;
  borderWidth: string;
  textPrimary: string;
  textSecondary: string;
  boxBg: string;
  boxBorder: string;
  studentBg: string;
  studentBorder: string;
  matrixBg: string;
  matrixBorder: string;
  cutLine: string;
  cutText: string;
  introBg: string;
  introText: string;
  accentText: string;
  eagleColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
}> = {
  classic: {
    mainBorder: 'border-slate-900',
    borderStyle: 'border-double',
    borderWidth: 'border-[6px]',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-neutral-700',
    boxBg: 'bg-slate-50',
    boxBorder: 'border-slate-900',
    studentBg: 'bg-slate-50/70',
    studentBorder: 'border-slate-900',
    matrixBg: 'bg-slate-50/50',
    matrixBorder: 'border-slate-400',
    cutLine: 'border-neutral-300',
    cutText: 'text-neutral-400',
    introBg: 'bg-slate-900',
    introText: 'text-white',
    accentText: 'text-rose-600',
    eagleColor: 'text-neutral-800',
    badgeBg: 'bg-rose-50',
    badgeBorder: 'border-rose-200',
    badgeText: 'text-rose-700'
  },
  luxury_blue: {
    mainBorder: 'border-blue-900',
    borderStyle: 'border-double',
    borderWidth: 'border-[6px]',
    textPrimary: 'text-blue-900',
    textSecondary: 'text-blue-700',
    boxBg: 'bg-blue-50/80',
    boxBorder: 'border-amber-500',
    studentBg: 'bg-blue-50/50',
    studentBorder: 'border-blue-900',
    matrixBg: 'bg-blue-50/30',
    matrixBorder: 'border-blue-200',
    cutLine: 'border-blue-200',
    cutText: 'text-blue-400',
    introBg: 'bg-blue-900',
    introText: 'text-amber-300',
    accentText: 'text-amber-600',
    eagleColor: 'text-blue-800',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-200',
    badgeText: 'text-amber-700'
  },
  emerald_green: {
    mainBorder: 'border-emerald-900',
    borderStyle: 'border-double',
    borderWidth: 'border-[6px]',
    textPrimary: 'text-emerald-900',
    textSecondary: 'text-emerald-700',
    boxBg: 'bg-emerald-50/80',
    boxBorder: 'border-emerald-600',
    studentBg: 'bg-emerald-50/50',
    studentBorder: 'border-emerald-900',
    matrixBg: 'bg-emerald-50/30',
    matrixBorder: 'border-emerald-200',
    cutLine: 'border-emerald-200',
    cutText: 'text-emerald-400',
    introBg: 'bg-emerald-950',
    introText: 'text-emerald-50',
    accentText: 'text-red-600',
    eagleColor: 'text-emerald-800',
    badgeBg: 'bg-emerald-50',
    badgeBorder: 'border-emerald-200',
    badgeText: 'text-emerald-700'
  },
  royal_crimson: {
    mainBorder: 'border-rose-950',
    borderStyle: 'border-double',
    borderWidth: 'border-[6px]',
    textPrimary: 'text-rose-950',
    textSecondary: 'text-rose-800',
    boxBg: 'bg-rose-50',
    boxBorder: 'border-rose-800',
    studentBg: 'bg-rose-50/50',
    studentBorder: 'border-rose-950',
    matrixBg: 'bg-rose-50/30',
    matrixBorder: 'border-rose-200',
    cutLine: 'border-rose-200',
    cutText: 'text-rose-400',
    introBg: 'bg-rose-950',
    introText: 'text-rose-100',
    accentText: 'text-rose-600',
    eagleColor: 'text-rose-900',
    badgeBg: 'bg-rose-50',
    badgeBorder: 'border-rose-200',
    badgeText: 'text-rose-700'
  },
  imperial_purple: {
    mainBorder: 'border-violet-950',
    borderStyle: 'border-double',
    borderWidth: 'border-[6px]',
    textPrimary: 'text-violet-950',
    textSecondary: 'text-violet-800',
    boxBg: 'bg-violet-50',
    boxBorder: 'border-violet-800',
    studentBg: 'bg-violet-50/50',
    studentBorder: 'border-violet-950',
    matrixBg: 'bg-violet-50/30',
    matrixBorder: 'border-violet-200',
    cutLine: 'border-violet-200',
    cutText: 'text-violet-400',
    introBg: 'bg-violet-950',
    introText: 'text-violet-100',
    accentText: 'text-fuchsia-600',
    eagleColor: 'text-violet-900',
    badgeBg: 'bg-violet-50',
    badgeBorder: 'border-violet-200',
    badgeText: 'text-violet-700'
  },
  noble_gold: {
    mainBorder: 'border-amber-950',
    borderStyle: 'border-double',
    borderWidth: 'border-[6px]',
    textPrimary: 'text-amber-950',
    textSecondary: 'text-amber-800',
    boxBg: 'bg-amber-50',
    boxBorder: 'border-amber-700',
    studentBg: 'bg-amber-50/50',
    studentBorder: 'border-amber-950',
    matrixBg: 'bg-amber-50/30',
    matrixBorder: 'border-amber-200',
    cutLine: 'border-amber-200',
    cutText: 'text-amber-400',
    introBg: 'bg-amber-900',
    introText: 'text-amber-50',
    accentText: 'text-amber-600',
    eagleColor: 'text-amber-900',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-200',
    badgeText: 'text-amber-700'
  }
};

export const getMinisterialTheme = (meta: any) => {
  const presetKey = meta.themePreset || 'classic';
  const base = { ...THEME_PRESETS_CLASSES[presetKey] || THEME_PRESETS_CLASSES.classic };
  
  if (meta.themeBorderStyle) {
    if (meta.themeBorderStyle === 'double') {
      base.borderStyle = 'border-double';
      base.borderWidth = 'border-[6px]';
    } else if (meta.themeBorderStyle === 'solid') {
      base.borderStyle = 'border-solid';
      base.borderWidth = 'border-4';
    } else if (meta.themeBorderStyle === 'dashed') {
      base.borderStyle = 'border-dashed';
      base.borderWidth = 'border-2';
    } else if (meta.themeBorderStyle === 'groove') {
      base.borderStyle = 'border-groove';
      base.borderWidth = 'border-4';
    } else if (meta.themeBorderStyle === 'ridge') {
      base.borderStyle = 'border-ridge';
      base.borderWidth = 'border-[6px]';
    }
  }

  if (meta.themeBorderWidth) {
    base.borderWidth = meta.themeBorderWidth;
  }
  
  return base;
};

export const MinisterialHeader = () => {
  const { document } = useEditorStore();
  const meta = document.metadata;
  const theme = getMinisterialTheme(meta);

  return (
    <div className="w-full flex flex-col items-center select-none bg-white p-2" dir="rtl">
      {/* Main Double Border Wrapper */}
      <div className={`w-full ${theme.mainBorder} ${theme.borderStyle} ${theme.borderWidth} p-2 flex flex-col transition-all duration-300`}>
        
        {/* Top Header Row with 3 Columns */}
        <div className="flex w-full justify-between items-stretch">
          
          {/* Right - Educational Directory Info */}
          <div className={`w-[30%] text-[11px] font-bold leading-normal text-right ${theme.textPrimary} flex flex-col justify-between`}>
            <div>الجمهورية اليمنية</div>
            <div>وزارة التربية والتعليم</div>
            <div>مكتب التربية والتعليم م/ <span className="font-extrabold">{meta.governorate || '...............'}</span></div>
            <div>إدارة التربية والتعليم بمديرية/ <span className="font-extrabold">{meta.directorate || '...............'}</span></div>
            <div>مدرسة/ <span className="font-extrabold">{meta.school || '...............................'}</span></div>
          </div>

          {/* Center - Stylized Eagle Emblem and Exam Title */}
          <div className="w-[40%] flex flex-col items-center justify-center border-x border-slate-300 px-2 text-center">
            {/* Custom vector national emblem (Yemeni Eagle) - 100% Offline */}
            <svg viewBox="0 0 100 85" className={`w-14 h-10 ${theme.eagleColor} mb-1`} fill="currentColor">
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
            <div className={`border-2 ${theme.boxBorder} p-1 w-full ${theme.boxBg} rounded transition-colors`}>
              <h2 className={`text-[12px] font-black ${theme.textPrimary} leading-tight`}>
                {meta.examTitle || 'اختبار نهاية الفصل الدراسي الأول'}
              </h2>
              <div className={`text-[10px] font-bold ${theme.textSecondary} mt-0.5`}>
                {meta.examType || 'امتحان تحريري'} - {meta.semester || 'الفصل الأول'}
              </div>
            </div>
          </div>

          {/* Left - Exam Technical Parameters */}
          <div className={`w-[30%] text-[11px] font-bold leading-normal text-right pr-6 ${theme.textPrimary} flex flex-col justify-between`}>
            <div>الصف: <span className="font-extrabold">{meta.grade || '................'}</span></div>
            <div>الشعبة: <span className="font-extrabold">{meta.division || '................'}</span></div>
            <div>المادة: <span className="font-extrabold">{meta.subject || '................'}</span></div>
            <div>الزمن: <span className="font-extrabold">{meta.time || '................'}</span></div>
            <div>العام الدراسي: <span className="font-extrabold">{meta.academicYear || '2025/2026م'}</span></div>
          </div>
        </div>

        {/* Middle Row - Beautiful Student Details & Grades Box */}
        <div className={`w-full mt-3 border ${theme.studentBorder} rounded overflow-hidden grid grid-cols-12 text-center ${theme.studentBg} transition-colors`}>
          <div className={`col-span-3 border-l ${theme.studentBorder} p-1 text-[10px] font-bold flex flex-col justify-center ${theme.textPrimary}`}>
            <span>الرقم السري: ( ............ )</span>
          </div>
          <div className={`col-span-6 border-l ${theme.studentBorder} p-1 text-[11px] font-bold flex flex-col justify-center text-right pr-3 ${theme.textPrimary}`}>
            <span>إسم الطالب رباعياً: ................................................................</span>
          </div>
          <div className={`col-span-3 p-1 text-[10px] font-bold flex flex-col justify-center ${theme.textPrimary}`}>
            <span>رقم الجلوس: ( ............ )</span>
          </div>
        </div>

        {/* Marks Matrix row */}
        <div className={`w-full mt-2 border ${theme.matrixBorder} rounded overflow-hidden grid grid-cols-12 text-center ${theme.matrixBg} text-[10px] font-bold transition-colors`}>
          <div className={`col-span-2 border-l ${theme.matrixBorder} p-1 ${theme.textPrimary}`}>الدرجة بالأرقام</div>
          <div className={`col-span-3 border-l ${theme.matrixBorder} p-1 ${theme.textPrimary}`}>الدرجة بالكتابة</div>
          <div className={`col-span-3 border-l ${theme.matrixBorder} p-1 ${theme.textPrimary}`}>توقيع المصحح</div>
          <div className={`col-span-2 border-l ${theme.matrixBorder} p-1 ${theme.textPrimary}`}>توقيع المراجع</div>
          <div className={`col-span-2 p-1 ${theme.textPrimary}`}>الدرجة الكلية: <span className={`${theme.accentText} text-xs font-black`}>{meta.marks || '50'}</span></div>
        </div>

      </div>
      
      {/* Tear/Cut Section Line */}
      <div className={`w-full flex items-center justify-between text-[9px] ${theme.cutText} font-mono my-1 select-none overflow-hidden`}>
        <span className="shrink-0 pl-2">قـــص هنـــــــاء - - - - - - - - - - - - - - -</span>
        <span className="shrink-0 border-t border-dashed border-neutral-300 flex-1 mx-2"></span>
        <span className="shrink-0">✂ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span>
        <span className="shrink-0 border-t border-dashed border-neutral-300 flex-1 mx-2"></span>
        <span className="shrink-0 pr-2">- - - - - - - - - - - - - - - قـــص هنـــــــاء</span>
      </div>

      {/* Intro Question row with question/answer guide */}
      <div className={`w-full flex justify-between border-b-2 ${theme.mainBorder} mt-1 mb-2 px-3 py-1 ${theme.introBg} ${theme.introText} rounded transition-colors`}>
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
  const theme = getMinisterialTheme(meta);

  return (
    <div className="w-full flex flex-col items-center mt-auto pb-4 px-4 select-none" dir="rtl">
      <div className={`w-full border-t-2 ${theme.borderStyle} ${theme.mainBorder} mb-2`}></div>
      
      {/* High-fidelity official signatures layout */}
      <div className="w-full grid grid-cols-3 text-center text-[11px] font-bold text-black mt-2 gap-4">
        <div className="flex flex-col items-center">
          <span className="text-neutral-500 font-bold">معد الإختبار (المعلم)</span>
          <span className={`mt-1 font-black ${theme.textPrimary}`}>أ/ {meta.teacherName || '................'}</span>
          <span className="text-[9px] text-neutral-400 mt-2 font-medium">التوقيع: .....................</span>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <span className={`${theme.badgeText} font-black text-[12px] py-1 border-y border-dashed ${theme.badgeBorder} px-3 ${theme.badgeBg} rounded transition-all duration-300`}>
            انتهت الأسئلة وبحمد الله وتوفيقه
          </span>
          <span className="text-[9px] text-neutral-400 mt-2 font-medium">محرر الرقيم - ذكي وبسيط</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-neutral-500 font-sans font-bold font-sans">مدير المدرسة</span>
          <span className={`mt-1 font-black ${theme.textPrimary}`}>{meta.schoolPrincipal || '................'}</span>
          <span className="text-[9px] text-neutral-400 mt-2 font-medium">الختم والتوقيع: .....................</span>
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
