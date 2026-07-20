import { create } from 'zustand';
import { DocumentState, EditorElement, Page } from '../types';

interface EditorState {
  document: DocumentState;
  activePageIndex: number;
  selectedElementIds: string[];
  zoom: number;
  snapToGrid: boolean;
  showRulers: boolean;
  showGuides: boolean;
  
  // Actions
  setZoom: (zoom: number) => void;
  addPage: () => void;
  removePage: (index: number) => void;
  setActivePage: (index: number) => void;
  
  addElement: (pageIndex: number, element: EditorElement) => void;
  updateElement: (pageIndex: number, elementId: string, updates: Partial<EditorElement>) => void;
  removeElement: (pageIndex: number, elementId: string) => void;
  
  selectElement: (elementId: string, multi?: boolean) => void;
  clearSelection: () => void;
  
  toggleSnapToGrid: () => void;
  toggleRulers: () => void;
  
  // History (simplified for now)
  // undo: () => void;
  // redo: () => void;
}

const createInitialPage = (): Page => ({
  id: crypto.randomUUID(),
  elements: [],
});

export const useEditorStore = create<EditorState>((set) => ({
  document: {
    id: crypto.randomUUID(),
    title: 'اختبار جديد',
    pages: [createInitialPage()],
    paperSize: 'A4',
    orientation: 'portrait',
    margins: { top: 20, right: 20, bottom: 20, left: 20 },
  },
  activePageIndex: 0,
  selectedElementIds: [],
  zoom: 100, // percentage
  snapToGrid: false,
  showRulers: true,
  showGuides: true,

  setZoom: (zoom) => set({ zoom: Math.max(25, Math.min(400, zoom)) }),
  
  addPage: () => set((state) => ({
    document: {
      ...state.document,
      pages: [...state.document.pages, createInitialPage()]
    },
    activePageIndex: state.document.pages.length
  })),

  removePage: (index) => set((state) => {
    if (state.document.pages.length <= 1) return state; // Don't remove last page
    const newPages = [...state.document.pages];
    newPages.splice(index, 1);
    return {
      document: { ...state.document, pages: newPages },
      activePageIndex: Math.min(state.activePageIndex, newPages.length - 1)
    };
  }),

  setActivePage: (index) => set({ activePageIndex: index }),

  addElement: (pageIndex, element) => set((state) => {
    const newPages = [...state.document.pages];
    newPages[pageIndex].elements.push(element);
    return { document: { ...state.document, pages: newPages } };
  }),

  updateElement: (pageIndex, elementId, updates) => set((state) => {
    const newPages = [...state.document.pages];
    const elements = [...newPages[pageIndex].elements];
    const elIndex = elements.findIndex(e => e.id === elementId);
    if (elIndex >= 0) {
      elements[elIndex] = { ...elements[elIndex], ...updates } as EditorElement;
      newPages[pageIndex].elements = elements;
    }
    return { document: { ...state.document, pages: newPages } };
  }),

  removeElement: (pageIndex, elementId) => set((state) => {
    const newPages = [...state.document.pages];
    newPages[pageIndex].elements = newPages[pageIndex].elements.filter(e => e.id !== elementId);
    return { document: { ...state.document, pages: newPages } };
  }),

  selectElement: (elementId, multi = false) => set((state) => ({
    selectedElementIds: multi 
      ? [...state.selectedElementIds, elementId]
      : [elementId]
  })),

  clearSelection: () => set({ selectedElementIds: [] }),

  toggleSnapToGrid: () => set((state) => ({ snapToGrid: !state.snapToGrid })),
  toggleRulers: () => set((state) => ({ showRulers: !state.showRulers })),
}));
