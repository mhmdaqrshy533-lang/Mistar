import React, { useState } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { Type, Image as ImageIcon, Calculator, Magnet, LayoutTemplate, HelpCircle, Table, Square, Circle, Search, Plus } from 'lucide-react';
import { EditorElement } from '../types';
import { generateMinisterialTemplate } from '../utils/templates';

const MOCK_QUESTIONS = [
  { id: 'q1', subject: 'فيزياء', text: 'علل: لا يمكن استخدام قانون كولوم لحساب القوة بين شحنتين متحركتين؟' },
  { id: 'q2', subject: 'رياضيات', text: 'أوجد قيمة التكامل التالي: $\\int x^2 dx$' },
  { id: 'q3', subject: 'كيمياء', text: 'ما هو عدد التأكسد للكروم في مركب K2Cr2O7؟' }
];

export const ExamSidebar = () => {
  const { addElement, activePageIndex, document, updateElement, removeElement } = useEditorStore();
  const [activeTab, setActiveTab] = useState<'tools' | 'templates' | 'bank'>('tools');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddText = (content = 'نص جديد') => {
    const newText: EditorElement = {
      id: crypto.randomUUID(),
      type: 'text',
      x: 100, y: 100, width: 300, height: 60,
      rotation: 0, isLocked: false, isHidden: false, zIndex: 1,
      content,
      fontSize: 16, fontFamily: 'Arial', fontWeight: 'normal', color: '#000000', textAlign: 'right'
    };
    addElement(activePageIndex, newText);
  };

  const handleAddMath = () => {
    const newMath: EditorElement = {
      id: crypto.randomUUID(),
      type: 'math',
      x: 150, y: 150, width: 200, height: 60,
      rotation: 0, isLocked: false, isHidden: false, zIndex: 1,
      latex: 'f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi)\\,e^{2 \\pi i \\xi x} \\,d\\xi',
      fontSize: 18, color: '#000000'
    };
    addElement(activePageIndex, newMath);
  };

  const handleAddPhysics = () => {
    const newPhysics: EditorElement = {
      id: crypto.randomUUID(),
      type: 'physics',
      x: 200, y: 200, width: 100, height: 100,
      rotation: 0, isLocked: false, isHidden: false, zIndex: 1,
      svgContent: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="none"/><line x1="50" y1="50" x2="80" y2="20" stroke="red" stroke-width="2" marker-end="url(#arrowhead)"/><defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="red"/></marker></defs></svg>',
      strokeColor: '#000000', strokeWidth: 2
    };
    addElement(activePageIndex, newPhysics);
  };

  const handleApplyTemplate = (templateId: string) => {
    if (templateId === 'ministerial') {
      const templateElements = generateMinisterialTemplate();
      templateElements.forEach(el => addElement(activePageIndex, el));
    }
  };

  return (
    <div className="w-64 bg-white border-l border-slate-200 flex flex-col z-10 shrink-0">
      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('tools')}
          className={`flex-1 py-3 text-sm font-bold ${activeTab === 'tools' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          الأدوات
        </button>
        <button 
          onClick={() => setActiveTab('templates')}
          className={`flex-1 py-3 text-sm font-bold ${activeTab === 'templates' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          القوالب
        </button>
        <button 
          onClick={() => setActiveTab('bank')}
          className={`flex-1 py-3 text-sm font-bold ${activeTab === 'bank' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          البنك
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-6">
        {activeTab === 'tools' && (
          <>
            <div className="space-y-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">العناصر الأساسية</h3>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleAddText()} className="flex flex-col items-center justify-center p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors gap-2">
                  <Type size={20} className="text-slate-600" />
                  <span className="text-xs font-bold text-slate-700">نص</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors gap-2">
                  <ImageIcon size={20} className="text-slate-600" />
                  <span className="text-xs font-bold text-slate-700">صورة</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors gap-2">
                  <Table size={20} className="text-slate-600" />
                  <span className="text-xs font-bold text-slate-700">جدول</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">العلوم والرياضيات</h3>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleAddMath} className="flex flex-col items-center justify-center p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors gap-2">
                  <Calculator size={20} className="text-slate-600" />
                  <span className="text-xs font-bold text-slate-700">معادلة</span>
                </button>
                <button onClick={handleAddPhysics} className="flex flex-col items-center justify-center p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors gap-2">
                  <Magnet size={20} className="text-slate-600" />
                  <span className="text-xs font-bold text-slate-700">فيزياء</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">الأشكال</h3>
              <div className="flex gap-2">
                <button className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200"><Square size={18} /></button>
                <button className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200"><Circle size={18} /></button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800">معرض القوالب (الرقيم)</h3>
            <div 
              onClick={() => handleApplyTemplate('ministerial')}
              className="aspect-[1/1.4] bg-slate-100 border-2 border-slate-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-indigo-400 hover:shadow-lg transition-all"
            >
              <div className="text-center">
                <LayoutTemplate className="mx-auto mb-2 text-slate-400" size={32} />
                <span className="text-sm font-bold text-slate-700">وزاري يمني</span>
              </div>
            </div>
            <div className="aspect-[1/1.4] bg-slate-100 border-2 border-slate-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-indigo-400 transition-colors">
              <span className="text-sm font-bold text-slate-500">قالب المدارس الخاصة</span>
            </div>
          </div>
        )}

        {activeTab === 'bank' && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute right-2 top-2.5 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="ابحث عن سؤال..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pr-8 pl-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="space-y-2">
              {MOCK_QUESTIONS.filter(q => q.text.includes(searchQuery) || q.subject.includes(searchQuery)).map(q => (
                <div key={q.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg group hover:border-indigo-300 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{q.subject}</span>
                    <button 
                      onClick={() => handleAddText(q.text)}
                      className="text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-slate-700 line-clamp-3">{q.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
