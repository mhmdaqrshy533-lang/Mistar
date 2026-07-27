import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  FileSignature, 
  FileText, 
  GraduationCap, 
  UserCheck, 
  Archive, 
  LayoutTemplate, 
  Settings, 
  ChevronRight, 
  Menu,
  X,
  LogOut,
  HelpCircle,
  Bell,
  QrCode,
  Database,
  Code,
  ShieldCheck
} from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { useRole } from '../../context/RoleContext';

interface SidebarItemProps {
  id: string;
  label: string;
  icon: any;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: (id: string) => void;
  badge?: string;
}

const SidebarItem = ({ id, label, icon: Icon, isActive, isCollapsed, onClick, badge }: SidebarItemProps) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
      ${isActive 
        ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
  >
    <Icon size={20} className={`shrink-0 ${isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'}`} />
    {!isCollapsed && (
      <div className="flex items-center justify-between flex-1 overflow-hidden">
        <span className="font-bold text-xs whitespace-nowrap overflow-hidden transition-all duration-300">
          {label}
        </span>
        {badge && (
          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
            isActive ? 'bg-white/20 text-white' : 'bg-violet-50 text-violet-700 border border-violet-200'
          }`}>
            {badge}
          </span>
        )}
      </div>
    )}
    {isCollapsed && (
      <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
        {label}
      </div>
    )}
  </button>
);

export const Sidebar = () => {
  const { activeApplet, launchApplet } = useOS();
  const { currentRole } = useRole();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
    { id: 'exams_section', label: 'محرر الامتحانات', icon: FileSignature, badge: 'رئيسي' },
    { id: 'bubble_sheets', label: 'محرر أتمتة OMR', icon: QrCode, badge: 'أتمتة' },
    { id: 'document_editor', label: 'الوثائق والتعاميم', icon: FileText },
    { id: 'templates_gallery', label: 'مركز القوالب الرسمي', icon: LayoutTemplate, badge: 'جديد' },
    { id: 'question_bank', label: 'بنك الأسئلة', icon: Database },
    { id: 'grades_section', label: 'كشوف الدرجات والشهادات', icon: GraduationCap },
    { id: 'attendance_section', label: 'الحضور والخطط', icon: UserCheck },
    { id: 'archive_section', label: 'الأرشيف الوطني', icon: Archive },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 right-4 z-40 p-2 bg-white rounded-lg border border-slate-200 shadow-sm lg:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? '80px' : '260px',
          x: isMobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? '100%' : (0 as any))
        }}
        className={`fixed inset-y-0 right-0 bg-white border-l border-slate-200 z-50 flex flex-col transition-all duration-300 lg:relative lg:translate-x-0
          ${isCollapsed ? 'px-3' : 'px-4'}`}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between shrink-0 mb-2 border-b border-slate-100">
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-violet-600/20 font-black text-xl">
                R
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg text-slate-900 leading-tight">الرقيم</span>
                <span className="text-[10px] font-bold text-violet-600">المنصة الوطنية للوثائق</span>
              </div>
            </motion.div>
          )}
          {isCollapsed && (
            <div className="w-full flex justify-center">
              <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white font-black">
                R
              </div>
            </div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
          >
            <ChevronRight className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : 'rotate-0'}`} />
          </button>
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Current Active Role Badge */}
        {!isCollapsed && (
          <div className="my-2 p-2 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-2">
            <ShieldCheck size={16} className="text-violet-600 shrink-0" />
            <div className="truncate">
              <p className="text-[10px] font-bold text-slate-400">المستوى الحالي:</p>
              <p className="text-xs font-black text-slate-800 truncate">{currentRole.title}</p>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar py-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              {...item}
              isActive={activeApplet === item.id}
              isCollapsed={isCollapsed}
              onClick={(id) => {
                launchApplet(id);
                setIsMobileOpen(false);
              }}
            />
          ))}
        </nav>

        {/* Footer with Developer Attribution */}
        <div className={`mt-auto shrink-0 border-t border-slate-100 py-3 space-y-1 ${isCollapsed ? 'px-0' : ''}`}>
          
          {!isCollapsed && (
            <div className="p-2.5 bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 rounded-xl mb-2 text-center">
              <div className="flex items-center justify-center gap-1 text-[10px] font-black text-violet-800">
                <Code size={12} className="text-violet-600" />
                <span>برمجة وتطوير</span>
              </div>
              <p className="text-[11px] font-black text-indigo-950 mt-0.5">المهندس//: سهيل الهزبري</p>
            </div>
          )}

          <SidebarItem
            id="settings"
            label="الإعدادات والهوية"
            icon={Settings}
            isActive={activeApplet === 'settings'}
            isCollapsed={isCollapsed}
            onClick={launchApplet}
          />
        </div>
      </motion.aside>
    </>
  );
};
