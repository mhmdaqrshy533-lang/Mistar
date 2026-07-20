import React from 'react';
import { ExamToolbar } from './components/ExamToolbar';
import { ExamCanvas } from './components/ExamCanvas';
import { ExamProperties } from './components/ExamProperties';

export default function ExamEditor({ onBack }: { onBack?: () => void }) {
  return (
    <div className="flex flex-col h-full bg-slate-100 overflow-hidden pb-14 lg:pb-0" dir="rtl">
      <ExamToolbar onBack={onBack} />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-auto custom-scrollbar flex justify-center bg-slate-200/50">
          <ExamCanvas />
        </main>
        <ExamProperties />
      </div>
    </div>
  );
}

