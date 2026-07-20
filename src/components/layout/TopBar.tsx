import React from 'react';
import { Search, Bell, Settings, User, HelpCircle, Download, CloudOff, Wifi } from 'lucide-react';
import { motion } from 'motion/react';
import { usePWA } from '../../hooks/usePWA';

export const TopBar = () => {
  const { isInstallable, isOffline, installApp } = usePWA();

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shrink-0">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl hidden md:flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-violet-100 focus-within:border-violet-300 transition-all">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="بحث عن اختبار، طالب، أو وثيقة..."
          className="bg-transparent border-none outline-none text-sm w-full font-bold text-slate-800"
        />
        <div className="flex items-center gap-1 bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-400">
          <span>⌘</span>
          <span>K</span>
        </div>
      </div>

      {/* User Info & Actions & PWA Indicators */}
      <div className="flex items-center gap-4 mr-auto md:mr-0">
        
        {/* Offline / Online Status Badge */}
        {isOffline ? (
          <div className="flex items-center gap-1.5 bg-rose-50 text-rose-600 border border-rose-100 px-3 py-1.5 rounded-xl text-xs font-black select-none animate-pulse">
            <CloudOff size={14} className="stroke-[2.5]" />
            <span>يعمل دون اتصال</span>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-1 rounded-xl text-[10px] font-bold select-none">
            <Wifi size={12} className="stroke-[2.5]" />
            <span>متصل</span>
          </div>
        )}

        {/* PWA Install Button */}
        {isInstallable && (
          <button 
            onClick={installApp}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-black shadow-md shadow-indigo-600/20 active:scale-95 transition-all"
          >
            <Download size={14} className="stroke-[3]" />
            <span>تثبيت التطبيق</span>
          </button>
        )}

        <div className="hidden sm:flex flex-col items-end">
          <span className="text-xs font-black text-slate-400">العام الدراسي 2024/2025</span>
          <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 rounded-full">الفصل الأول</span>
        </div>

        <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>

        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 relative transition-colors">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          
          <div className="h-10 w-px bg-slate-100 mx-1"></div>

          <button className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200">
            <div className="flex flex-col items-end mr-1 hidden lg:flex">
              <span className="text-sm font-black text-slate-800">أ/ محمد الهزبري</span>
              <span className="text-[10px] font-bold text-slate-400">مدرسة النهضة الثانوية</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <User size={18} />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
