import React, { useState } from 'react';
import { ExamToolbar } from './components/ExamToolbar';
import { ExamCanvas } from './components/ExamCanvas';
import { ExamProperties } from './components/ExamProperties';
import { ExamProjectsDashboard } from './components/ExamProjectsDashboard';
import { NewExamDialog } from './components/NewExamDialog';
import { useExamProjectsStore } from './store/useExamProjectsStore';
import { useEditorStore } from './store/useEditorStore';
import { ExamMetadata } from './types';

export default function ExamEditor({ onBack }: { onBack?: () => void }) {
  const [viewMode, setViewMode] = useState<'projects' | 'editor'>('projects');
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);

  const { createProject } = useExamProjectsStore();
  const { setDocument } = useEditorStore();

  const handleCreateNew = (meta: Partial<ExamMetadata>, title: string) => {
    const newProj = createProject(meta, title);
    if (newProj && newProj.document) {
      setDocument(newProj.document);
      setViewMode('editor');
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 overflow-hidden pb-14 lg:pb-0" dir="rtl">
      {viewMode === 'projects' ? (
        <ExamProjectsDashboard 
          onOpenProject={() => setViewMode('editor')} 
        />
      ) : (
        <>
          <ExamToolbar 
            onBack={onBack} 
            onOpenProjectsList={() => setViewMode('projects')}
            onNewProject={() => setIsNewDialogOpen(true)}
          />
          <div className="flex flex-1 overflow-hidden">
            <main className="flex-1 relative overflow-auto custom-scrollbar flex justify-center bg-slate-200/50">
              <ExamCanvas />
            </main>
            <ExamProperties />
          </div>
        </>
      )}

      <NewExamDialog 
        isOpen={isNewDialogOpen} 
        onClose={() => setIsNewDialogOpen(false)}
        onCreate={handleCreateNew}
      />
    </div>
  );
}


