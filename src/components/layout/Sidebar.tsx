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
  Bell
} from 'lucide-react';
import { useOS } from '../../context/OSContext';

interface SidebarItemProps {
  id: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: (id: string) => void;
}

const SidebarItem = ({ id, label, icon: Icon, isActive, isCollapsed, onClick }: SidebarItemProps) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
      ${isActive 
        ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
  >
    <Icon size={20} className={`shrink-0 ${isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'}`} />
    {!isCollapsed && (
      <span className="font-bold text-sm whitespace-nowrap overflow-hidden transition-all duration-300">
        {label}
      </span>
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
    { id: 'exams_section', label: 'محرر الامتحانات', icon: FileSignature },
    { id: 'document_editor', label: 'الوثائق التعليمية', icon: FileText },
    { id: 'grades_section', label: 'كشوف الدرجات', icon: GraduationCap },
    { id: 'attendance_section', label: 'الحضور والغياب', icon: UserCheck },
    { id: 'archive_section', label: 'الأرشيف', icon: Archive },
    { id: 'templates_gallery', label: 'القوالب', icon: LayoutTemplate },
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
          x: isMobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? '100%' : 0)
        }}
        className={`fixed inset-y-0 right-0 bg-white border-l border-slate-200 z-50 flex flex-col transition-all duration-300 lg:relative lg:translate-x-0
          ${isCollapsed ? 'px-3' : 'px-4'}`}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between shrink-0 mb-4">
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-violet-600/20">
                <span className="font-black text-xl">R</span>
              </div>
              <span className="font-black text-xl text-slate-800">الرقيم</span>
            </motion.div>
          )}
          {isCollapsed && (
            <div className="w-full flex justify-center">
              <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white">
                <span className="font-black">R</span>
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

        {/* Menu Items */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar py-2">
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

        {/* Footer */}
        <div className={`mt-auto shrink-0 border-t border-slate-100 py-4 space-y-1.5 ${isCollapsed ? 'px-0' : ''}`}>
          <SidebarItem
            id="settings"
            label="الإعدادات"
            icon={Settings}
            isActive={activeApplet === 'settings'}
            isCollapsed={isCollapsed}
            onClick={launchApplet}
          />
          <SidebarItem
            id="help"
            label="مركز المساعدة"
            icon={HelpCircle}
            isActive={false}
            isCollapsed={isCollapsed}
            onClick={() => {}}
          />
          <div className="pt-2">
            <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors group relative`}>
              <LogOut size={20} className="shrink-0 group-hover:translate-x-1 transition-transform" />
              {!isCollapsed && <span className="font-bold text-sm">تسجيل الخروج</span>}
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
