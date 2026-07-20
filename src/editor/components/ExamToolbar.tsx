import React, { useRef } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { ZoomIn, ZoomOut, Save, Download, Printer, Settings, Undo, Redo, LayoutGrid, Ruler, ArrowRight } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const ExamToolbar = ({ onBack }: { onBack?: () => void }) => {
  const { zoom, setZoom, snapToGrid, toggleSnapToGrid, showRulers, toggleRulers, document } = useEditorStore();

  const handleExportPDF = async () => {
    // Basic export for the active page
    const canvasElement = window.document.getElementById('exam-canvas-page-0'); // Will add this ID to canvas
    if (!canvasElement) return;

    try {
      const canvas = await html2canvas(canvasElement, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // A4 size in mm
      const pdfWidth = 210;
      const pdfHeight = 297;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${document.title}.pdf`);
    } catch (e) {
      console.error('Failed to generate PDF', e);
    }
  };

  return (
    <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm z-10 shrink-0">
      <div className="flex items-center gap-4">
        {onBack && (
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="عودة">
            <ArrowRight size={18} />
          </button>
        )}
        <h1 className="text-xl font-black text-slate-800">الرقيم</h1>
        <div className="h-6 w-px bg-slate-200 mx-2"></div>
        <span className="text-sm font-bold text-slate-600">{document.title}</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Undo / Redo */}
        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="تراجع">
          <Undo size={18} />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="إعادة">
          <Redo size={18} />
        </button>

        <div className="h-6 w-px bg-slate-200 mx-2"></div>

        {/* View Options */}
        <button 
          onClick={toggleSnapToGrid}
          className={`p-2 rounded-lg transition-colors ${snapToGrid ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-slate-100 text-slate-500'}`} 
          title="الشبكة"
        >
          <LayoutGrid size={18} />
        </button>
        <button 
          onClick={toggleRulers}
          className={`p-2 rounded-lg transition-colors ${showRulers ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-slate-100 text-slate-500'}`} 
          title="المسطرة"
        >
          <Ruler size={18} />
        </button>

        <div className="h-6 w-px bg-slate-200 mx-2"></div>

        {/* Zoom */}
        <button onClick={() => setZoom(zoom - 10)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
          <ZoomOut size={18} />
        </button>
        <span className="text-sm font-bold w-12 text-center text-slate-700" dir="ltr">{zoom}%</span>
        <button onClick={() => setZoom(zoom + 10)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
          <ZoomIn size={18} />
        </button>

        <div className="h-6 w-px bg-slate-200 mx-2"></div>

        {/* Export / Save */}
        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="حفظ">
          <Save size={18} />
        </button>
        <button onClick={handleExportPDF} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="تصدير PDF">
          <Download size={18} />
        </button>
        <button onClick={() => window.print()} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="طباعة">
          <Printer size={18} />
        </button>
      </div>
    </div>
  );
};
