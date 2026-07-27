import React, { useState } from 'react';
import { Search, Bell, Settings, User, HelpCircle, Download, CloudOff, Wifi, Smartphone, Shield, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { usePWA } from '../../hooks/usePWA';
import { PWAInstallModal } from '../PWAInstallModal';
import { RoleSelectorModal } from '../RoleSelectorModal';
import { ResourceCenterModal } from '../ResourceCenterModal';
import { useRole } from '../../context/RoleContext';

export const TopBar = () => {
  const { isInstallable, isOffline, installApp, isInstalled } = usePWA();
  const { currentRole, headerInfo } = useRole();
  const [isPWAModalOpen, setIsPWAModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shrink-0">
        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden md:flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-violet-100 focus-within:border-violet-300 transition-all">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="بحث عن اختبار، طالب، أو وثيقة رسمية..."
            className="bg-transparent border-none outline-none text-sm w-full font-bold text-slate-800"
          />
          <div className="flex items-center gap-1 bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-400">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>

        {/* User Info & Actions & PWA Indicators & Role Selector */}
        <div className="flex items-center gap-2.5 mr-auto md:mr-0">
          
          {/* Active Role Selector Badge */}
          <button
            onClick={() => setIsRoleModalOpen(true)}
            className="flex items-center gap-1.5 bg-violet-50 hover:bg-violet-100 border border-violet-200 text-violet-900 px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-sm active:scale-95"
            title="انقر لتبديل المستوى الإداري والترويسة"
          >
            <Shield size={14} className="text-violet-600" />
            <span className="hidden sm:inline">{currentRole.title}</span>
            <span className="sm:hidden">المستوى</span>
          </button>

          {/* National Resource Center Button */}
          <button
            onClick={() => setIsResourceModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-sm active:scale-95"
            title="الأختام، الشعارات، الرموز العلمية والمعادلات"
          >
            <Layers size={14} className="text-amber-600" />
            <span>الموارد الوطنية</span>
          </button>

          {/* Offline / Online Status Badge */}
          {isOffline ? (
            <div className="flex items-center gap-1.5 bg-rose-50 text-rose-600 border border-rose-100 px-2.5 py-1.5 rounded-xl text-xs font-black select-none animate-pulse">
              <CloudOff size={14} className="stroke-[2.5]" />
              <span className="hidden md:inline">أوفلاين</span>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-1 rounded-xl text-[10px] font-bold select-none">
              <Wifi size={12} className="stroke-[2.5]" />
              <span>أوفلاين جاهز</span>
            </div>
          )}

          {/* PWA Install Button / Launcher */}
          <button 
            onClick={() => {
              if (isInstallable) {
                installApp();
              } else {
                setIsPWAModalOpen(true);
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              isInstalled 
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' 
                : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md shadow-indigo-600/20 active:scale-95'
            }`}
            title="تثبيت التطبيق على جهازك أو عرضه دون إنترنت"
          >
            <Download size={14} className="stroke-[2.5]" />
            <span className="hidden sm:inline">{isInstalled ? 'PWA مثبت' : 'تثبيت PWA'}</span>
          </button>

          <div className="h-8 w-px bg-slate-200 mx-0.5 hidden sm:block"></div>

          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 relative transition-colors">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            
            <button 
              onClick={() => setIsRoleModalOpen(true)}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
            >
              <div className="flex flex-col items-end mr-1 hidden lg:flex">
                <span className="text-xs font-black text-slate-800">{headerInfo.authorName}</span>
                <span className="text-[10px] font-bold text-slate-400">{headerInfo.schoolName}</span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-white shadow-md font-black text-xs">
                R
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Modals */}
      <PWAInstallModal 
        isOpen={isPWAModalOpen} 
        onClose={() => setIsPWAModalOpen(false)} 
      />
      
      <RoleSelectorModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />

      <ResourceCenterModal
        isOpen={isResourceModalOpen}
        onClose={() => setIsResourceModalOpen(false)}
      />
    </>
  );
};
