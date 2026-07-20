import React from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { Settings2, Trash2 } from 'lucide-react';

export const ExamProperties = () => {
  const { document, activePageIndex, selectedElementIds, updateElement, removeElement } = useEditorStore();
  const page = document.pages[activePageIndex];
  
  if (selectedElementIds.length === 0) return null;

  const selectedElementId = selectedElementIds[0]; // just handle single select for now
  const element = page.elements.find(e => e.id === selectedElementId);

  if (!element) return null;

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col z-10 shrink-0 p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2 text-slate-800 font-bold">
          <Settings2 size={18} />
          <span>الخصائص</span>
        </div>
        <button 
          onClick={() => removeElement(activePageIndex, element.id)}
          className="text-red-500 hover:bg-red-50 p-1 rounded"
          title="حذف العنصر"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="space-y-3">
        {/* Common Properties */}
        <div>
          <label className="text-xs font-bold text-slate-500 block mb-1">الموقع X</label>
          <input 
            type="number" 
            value={element.x} 
            onChange={(e) => updateElement(activePageIndex, element.id, { x: Number(e.target.value) })}
            className="w-full border border-slate-200 rounded p-1 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 block mb-1">الموقع Y</label>
          <input 
            type="number" 
            value={element.y} 
            onChange={(e) => updateElement(activePageIndex, element.id, { y: Number(e.target.value) })}
            className="w-full border border-slate-200 rounded p-1 text-sm"
          />
        </div>

        {/* Text Properties */}
        {element.type === 'text' && (
          <>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">حجم الخط</label>
              <input 
                type="number" 
                value={element.fontSize} 
                onChange={(e) => updateElement(activePageIndex, element.id, { fontSize: Number(e.target.value) })}
                className="w-full border border-slate-200 rounded p-1 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">اللون</label>
              <input 
                type="color" 
                value={element.color} 
                onChange={(e) => updateElement(activePageIndex, element.id, { color: e.target.value })}
                className="w-full h-8 border border-slate-200 rounded p-0.5"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">المحاذاة</label>
              <select 
                value={element.textAlign} 
                onChange={(e) => updateElement(activePageIndex, element.id, { textAlign: e.target.value as any })}
                className="w-full border border-slate-200 rounded p-1 text-sm"
              >
                <option value="right">يمين</option>
                <option value="center">وسط</option>
                <option value="left">يسار</option>
                <option value="justify">ضبط</option>
              </select>
            </div>
          </>
        )}

        {/* Math Properties */}
        {element.type === 'math' && (
          <>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">معادلة LaTeX</label>
              <textarea 
                value={element.latex} 
                onChange={(e) => updateElement(activePageIndex, element.id, { latex: e.target.value })}
                className="w-full border border-slate-200 rounded p-1 text-sm h-24 text-left"
                dir="ltr"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">حجم الخط</label>
              <input 
                type="number" 
                value={element.fontSize} 
                onChange={(e) => updateElement(activePageIndex, element.id, { fontSize: Number(e.target.value) })}
                className="w-full border border-slate-200 rounded p-1 text-sm"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
