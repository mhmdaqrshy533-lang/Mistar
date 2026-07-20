import React, { useRef, useEffect } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { Rnd } from 'react-rnd';
import { EditorElement } from '../types';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const ElementRenderer = ({ element, updateElement, activePageIndex }: { element: EditorElement, updateElement: any, activePageIndex: number }) => {
  const contentEditableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (element.type === 'text' && contentEditableRef.current && document.activeElement !== contentEditableRef.current) {
      contentEditableRef.current.innerText = element.content;
    }
  }, [element.content, element.type]);

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
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          updateElement(activePageIndex, element.id, { content: e.currentTarget.innerText });
        }}
      />
    );
  }

  if (element.type === 'image') {
    return (
      <img src={element.src} alt="element" style={{ width: '100%', height: '100%', objectFit: 'contain' }} crossOrigin="anonymous" />
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
  const { document, activePageIndex, zoom, updateElement, selectElement, selectedElementIds, clearSelection, snapToGrid } = useEditorStore();
  const page = document.pages[activePageIndex];
  const canvasRef = useRef<HTMLDivElement>(null);

  // A4 dimensions in px (96 DPI)
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;
  const GRID_SIZE = 20; // 20px grid

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      clearSelection();
    }
  };

  return (
    <div 
      className="p-10 min-h-full flex items-start justify-center"
      style={{ transformOrigin: 'top center' }}
    >
      <div 
        style={{ 
          transform: `scale(${zoom / 100})`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        {/* The Paper */}
        <div 
          id={`exam-canvas-page-${activePageIndex}`}
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="bg-white shadow-xl relative"
          style={{
            width: A4_WIDTH,
            height: A4_HEIGHT,
            backgroundImage: snapToGrid ? 'linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)' : 'none',
            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
          }}
        >
          {page?.elements.map(el => (
            <Rnd
              key={el.id}
              position={{ x: el.x, y: el.y }}
              size={{ width: el.width, height: el.height }}
              onDragStop={(e, d) => updateElement(activePageIndex, el.id, { x: d.x, y: d.y })}
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
              className={`${selectedElementIds.includes(el.id) ? 'ring-2 ring-indigo-500' : 'hover:ring-1 hover:ring-slate-300'}`}
              style={{ zIndex: el.zIndex }}
              bounds="parent"
            >
              <ElementRenderer element={el} updateElement={updateElement} activePageIndex={activePageIndex} />
            </Rnd>
          ))}
        </div>
      </div>
    </div>
  );
};
