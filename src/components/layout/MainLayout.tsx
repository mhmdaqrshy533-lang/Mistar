import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { motion, AnimatePresence } from 'motion/react';
import { useOS } from '../../context/OSContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { activeApplet } = useOS();

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans" dir="rtl">
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
        {/* Persistent TopBar */}
        <TopBar />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeApplet}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
