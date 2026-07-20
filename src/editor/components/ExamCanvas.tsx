import React, { useRef, useEffect } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { Rnd } from 'react-rnd';
import { EditorElement } from '../types';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { MinisterialHeader, MinisterialFooter, PrivateHeader, PrivateFooter } from './templates/MinisterialTemplate';

const ElementRenderer = ({ element, updateElement, activePageIndex }: { element: EditorElement, updateElement: any, activePageIndex: number }) => {
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const { newlyCreatedElementId, setNewlyCreatedElementId } = useEditorStore();

  useEffect(() => {
    if (element.type === 'text' && contentEditableRef.current && document.activeElement !== contentEditableRef.current) {
      contentEditableRef.current.innerText = (element as any).content;
    }
  }, [(element as any).content, element.type]);

  useEffect(() => {
    if (element.type === 'text' && element.id === newlyCreatedElementId && contentEditableRef.current) {
      contentEditableRef.current.focus();
      // Position cursor at the end
      try {
        const range = window.document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(contentEditableRef.current);
        range.collapse(false);
        sel?.removeAllRanges();
        sel?.addRange(range);
      } catch (e) {
        console.warn('Focus range selection failed', e);
      }
      setNewlyCreatedElementId(null);
    }
  }, [newlyCreatedElementId, element.id, element.type, setNewlyCreatedElementId]);

  if (element.type === 'text') {
    return (
      <div 
        ref={contentEditableRef}
        style={{ 
          width: '100%', height: '100%', 
          fontSize: element.fontSize, fontFamily: element.fontFamily,
          fontWeight: element.fontWeight, color: element.color,
          textAlign: element.textAlign as any,
          outline: 'none',
          whiteSpace: 'pre-wrap'
        }}
        className="cursor-text"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          updateElement(activePageIndex, element.id, { content: e.currentTarget.innerText });
          // Renumber on change just in case
          setTimeout(() => {
            useEditorStore.getState().reorderAndRenumberQuestions(activePageIndex);
          }, 100);
        }}
      />
    );
  }

  if (element.type === 'image') {
    return (
      <img src={element.src} alt="element" style={{ width: '100%', height: '100%', objectFit: 'contain' }} crossOrigin="anonymous" referrerPolicy="no-referrer" />
    );
  }

  if (element.type === 'math') {
    return (
      <div 
        style={{ fontSize: element.fontSize, color: element.color, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        dangerouslySetInnerHTML={{ __html: katex.renderToString(element.latex, { displayMode: true, throwOnError: false }) }}
      />
    );
  }

  if (element.type === 'physics') {
    return (
      <div 
        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        dangerouslySetInnerHTML={{ __html: element.svgContent }}
      />
    );
  }

  return <div>Unknown Element</div>;
};

export const ExamCanvas = () => {
  const { document, activePageIndex, zoom, setZoom, updateElement, selectElement, selectedElementIds, clearSelection, snapToGrid, reorderAndRenumberQuestions } = useEditorStore();
  const page = document.pages[activePageIndex];
  const canvasRef = useRef<HTMLDivElement>(null);
  const metadata = document.metadata;

  // A4 dimensions in px (96 DPI)
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;
  const GRID_SIZE = 20; 

  // Auto zoom based on platform width
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 1024;
      setZoom(isMobile ? 85 : 100);
    }
  }, [setZoom]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      clearSelection();
    }
  };

  const isMinisterial = metadata.templateType === 'ministerial';
  const isPrivate = metadata.templateType === 'private';

  return (
    <div className="w-full min-h-full flex items-center justify-center bg-slate-200/40 p-4 md:p-8 overflow-auto select-none">
      <div 
        style={{ 
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'center center',
          transition: 'transform 0.15s ease-out',
          width: `${A4_WIDTH}px`,
          height: `${A4_HEIGHT}px`,
        }}
        className="shrink-0 shadow-2xl relative"
      >
        {/* The Paper */}
        <div 
          id={`exam-canvas-page-${activePageIndex}`}
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="bg-white relative flex flex-col h-full w-full"
          style={{
            backgroundImage: snapToGrid ? 'linear-gradient(to right, #f8f8f8 1px, transparent 1px), linear-gradient(to bottom, #f8f8f8 1px, transparent 1px)' : 'none',
            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
          }}
        >
          {isMinisterial && activePageIndex === 0 && <MinisterialHeader />}
          {isPrivate && activePageIndex === 0 && <PrivateHeader />}

          {/* Render draggable elements on top */}
          <div className="flex-1 relative w-full h-full">
            {page?.elements.map(el => (
              <Rnd
                key={el.id}
                position={{ x: el.x, y: el.y }}
                size={{ width: el.width, height: el.height }}
                onDragStop={(e, d) => {
                  updateElement(activePageIndex, el.id, { x: d.x, y: d.y });
                  // Renumber on drop to ensure correct numbering
                  if (el.type === 'text' && (el as any).isQuestion) {
                    setTimeout(() => {
                      reorderAndRenumberQuestions(activePageIndex);
                    }, 50);
                  }
                }}
                onResizeStop={(e, dir, ref, delta, position) => {
                  updateElement(activePageIndex, el.id, {
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10),
                    ...position
                  });
                }}
                dragGrid={snapToGrid ? [GRID_SIZE, GRID_SIZE] : [1, 1]}
                resizeGrid={snapToGrid ? [GRID_SIZE, GRID_SIZE] : [1, 1]}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  selectElement(el.id, e.shiftKey);
                }}
                className={`absolute ${selectedElementIds.includes(el.id) ? 'ring-2 ring-indigo-500 rounded' : 'hover:ring-1 hover:ring-slate-300'}`}
                style={{ zIndex: el.zIndex }}
                bounds="parent"
              >
                <ElementRenderer element={el} updateElement={updateElement} activePageIndex={activePageIndex} />
              </Rnd>
            ))}
          </div>

          {isMinisterial && activePageIndex === document.pages.length - 1 && <MinisterialFooter />}
          {isPrivate && activePageIndex === document.pages.length - 1 && <PrivateFooter />}
        </div>
      </div>
    </div>
  );
};

