import React from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { Settings2, Trash2, Sliders, ChevronDown, AlignRight, AlignCenter, AlignLeft, AlignJustify } from 'lucide-react';

export const ExamProperties = () => {
  const { document, activePageIndex, selectedElementIds, updateElement, removeElement } = useEditorStore();
  const page = document.pages[activePageIndex];
  
  if (selectedElementIds.length === 0) return null;

  const selectedElementId = selectedElementIds[0]; 
  const element = page.elements.find(e => e.id === selectedElementId);

  if (!element) return null;

  const isQuestion = (element as any).isQuestion;

  const renderContent = () => (
    <div className="space-y-4" dir="rtl">
      {/* Element Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2 text-indigo-600 font-black text-sm">
          <Settings2 size={18} className="stroke-[2.5]" />
          <span>خصائص العنصر المحدد</span>
        </div>
        <button 
          onClick={() => removeElement(activePageIndex, element.id)}
          className="text-rose-600 hover:bg-rose-50 p-2 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold"
          title="حذف العنصر"
        >
          <Trash2 size={15} />
          <span>حذف</span>
        </button>
      </div>

      {/* Position inputs in dynamic grid */}
      <div className="grid grid-cols-2 gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
        <div>
          <label className="text-[10px] font-black text-slate-400 block mb-1">الموقع الأفقي X</label>
          <input 
            type="number" 
            value={element.x} 
            onChange={(e) => updateElement(activePageIndex, element.id, { x: Number(e.target.value) })}
            className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="text-[10px] font-black text-slate-400 block mb-1">الموقع العمودي Y</label>
          <input 
            type="number" 
            value={element.y} 
            onChange={(e) => updateElement(activePageIndex, element.id, { y: Number(e.target.value) })}
            className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Question Specific Marks property */}
      {isQuestion && (
        <div className="space-y-1 bg-rose-50 border border-rose-100 p-3 rounded-2xl">
          <label className="text-xs font-black text-rose-700 block">درجة هذا السؤال [تحديث تلقائي]</label>
          <div className="flex items-center gap-2 mt-1">
            <input 
              type="number" 
              value={(element as any).marks || 5} 
              onChange={(e) => {
                const newMarks = Number(e.target.value);
                updateElement(activePageIndex, element.id, { marks: newMarks });
                // Re-sync overall exam marks in the header
                setTimeout(() => {
                  const updatedPages = useEditorStore.getState().document.pages;
                  const total = updatedPages[activePageIndex].elements
                    .filter(el => el.type === 'text' && (el as any).isQuestion)
                    .reduce((sum, el) => sum + ((el as any).marks || 0), 0);
                  useEditorStore.getState().updateMetadata({ marks: String(total || 50) });
                }, 100);
              }}
              className="w-20 bg-white border border-rose-200 rounded-xl px-3 py-1.5 text-sm font-bold text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
              min="1"
            />
            <span className="text-xs font-bold text-rose-600">نقاط / درجات في ورقة الامتحان</span>
          </div>
        </div>
      )}

      {/* Text Element Properties */}
      {element.type === 'text' && (
        <div className="space-y-3.5">
          <div>
            <label className="text-[11px] font-black text-slate-400 block mb-1">حجم الخط</label>
            <input 
              type="number" 
              value={element.fontSize} 
              onChange={(e) => updateElement(activePageIndex, element.id, { fontSize: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-[11px] font-black text-slate-400 block mb-1">لون الخط والترقيم</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={element.color} 
                onChange={(e) => updateElement(activePageIndex, element.id, { color: e.target.value })}
                className="w-10 h-8 bg-slate-50 border border-slate-200 rounded-lg p-0.5 cursor-pointer"
              />
              <input 
                type="text" 
                value={element.color} 
                onChange={(e) => updateElement(activePageIndex, element.id, { color: e.target.value })}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 text-xs font-mono text-slate-600 font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-black text-slate-400 block mb-2">المحاذاة واتجاه النص</label>
            <div className="grid grid-cols-4 gap-1.5 bg-slate-50 p-1 rounded-xl">
              <button 
                onClick={() => updateElement(activePageIndex, element.id, { textAlign: 'right' })}
                className={`py-1.5 rounded-lg flex justify-center transition-all ${element.textAlign === 'right' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
              >
                <AlignRight size={16} />
              </button>
              <button 
                onClick={() => updateElement(activePageIndex, element.id, { textAlign: 'center' })}
                className={`py-1.5 rounded-lg flex justify-center transition-all ${element.textAlign === 'center' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
              >
                <AlignCenter size={16} />
              </button>
              <button 
                onClick={() => updateElement(activePageIndex, element.id, { textAlign: 'left' })}
                className={`py-1.5 rounded-lg flex justify-center transition-all ${element.textAlign === 'left' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
              >
                <AlignLeft size={16} />
              </button>
              <button 
                onClick={() => updateElement(activePageIndex, element.id, { textAlign: 'justify' })}
                className={`py-1.5 rounded-lg flex justify-center transition-all ${element.textAlign === 'justify' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
              >
                <AlignJustify size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Math Element Properties */}
      {element.type === 'math' && (
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-black text-slate-400 block mb-1">رموز LaTeX الرياضية</label>
            <textarea 
              value={(element as any).latex} 
              onChange={(e) => updateElement(activePageIndex, element.id, { latex: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-700 h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              dir="ltr"
            />
          </div>
          <div>
            <label className="text-[11px] font-black text-slate-400 block mb-1">حجم الخط الرياضي</label>
            <input 
              type="number" 
              value={(element as any).fontSize} 
              onChange={(e) => updateElement(activePageIndex, element.id, { fontSize: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop properties sidebar */}
      <aside className="w-66 bg-white border-r border-slate-200 z-15 shrink-0 hidden lg:flex flex-col p-4 space-y-4">
        {renderContent()}
      </aside>

      {/* Mobile properties Bottom Sheet */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 bg-white border-t border-slate-200 rounded-t-[2.5rem] shadow-[0_-15px_30px_rgba(0,0,0,0.15)] p-5 z-40 max-h-[45vh] overflow-y-auto">
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4"></div>
        {renderContent()}
      </div>
    </>
  );
};
