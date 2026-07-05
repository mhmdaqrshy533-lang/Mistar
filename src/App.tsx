/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import FinalResults from './pages/FinalResults';
import DailyPlan from './pages/DailyPlan';
import Attendance from './pages/Attendance';
import AIGenerator from './pages/AIGenerator';
import AnalyticalDashboard from './pages/AnalyticalDashboard';
import TimetableScheduler from './pages/TimetableScheduler';
import BubbleSheetProcessor from './pages/BubbleSheetProcessor';
import Badges from './pages/Badges';
import Certificates from './pages/Certificates';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Construction } from 'lucide-react';
import VisionCanvas from './pages/VisionCanvas';
import SmartGrading from './pages/SmartGrading';
import GradeRecords from './pages/GradeRecords';
import SmartMemos from './pages/SmartMemos';
import OfficialMemos from './pages/OfficialMemos';
import TermPlan from './pages/TermPlan';
import { Section } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<string>('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard onSelect={setActivePage} onOpenBadges={() => setActivePage('badges')} />;
      case 'exams':
        return <AIGenerator onBack={() => setActivePage('dashboard')} />;
      case 'automation':
        return <BubbleSheetProcessor onBack={() => setActivePage('dashboard')} />;
      case 'monthly':
        return <AnalyticalDashboard onBack={() => setActivePage('dashboard')} />;
      case 'daily':
        return <DailyPlan onBack={() => setActivePage('dashboard')} />;
      case 'term_plan':
        return <TermPlan onBack={() => setActivePage('dashboard')} />;
      case 'attendance':
        return <Attendance onBack={() => setActivePage('dashboard')} />;
      case 'results':
        return <FinalResults onBack={() => setActivePage('dashboard')} />;
      case 'progress_cards':
        return <GradeRecords onBack={() => setActivePage('dashboard')} />;
      case 'certificates':
        return <Certificates onBack={() => setActivePage('dashboard')} />;
      case 'badges':
        return <Badges onBack={() => setActivePage('dashboard')} />;
      case 'book_editor':
        return <SmartMemos onBack={() => setActivePage('dashboard')} />;
      case 'official_memos':
        return <OfficialMemos onBack={() => setActivePage('dashboard')} />;
      default:
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center select-none font-sans">
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 max-w-md w-full">
              <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Construction size={40} />
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-2">قريباً جداً</h2>
              <p className="text-slate-500 font-bold mb-8">
                القسم ({activePage}) قيد التطوير ليتكامل مع نموذج الذكاء الاصطناعي السيادي.
              </p>
              <button 
                onClick={() => setActivePage('dashboard')}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-purple-600/30 hover:shadow-2xl transition-all"
              >
                <ArrowRight size={20} />
                العودة للرئيسية
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

