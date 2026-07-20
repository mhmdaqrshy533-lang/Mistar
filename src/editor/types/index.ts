export type ElementType = 'text' | 'image' | 'math' | 'physics' | 'table' | 'shape';

export interface BaseElement {
  id: string;
  type: ElementType;
  x: number; // pixels
  y: number; // pixels
  width: number;
  height: number;
  rotation: number;
  isLocked: boolean;
  isHidden: boolean;
  zIndex: number;
}

export interface TextElement extends BaseElement {
  type: 'text';
  content: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  color: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
}

export interface MathElement extends BaseElement {
  type: 'math';
  latex: string;
  fontSize: number;
  color: string;
}

export interface PhysicsElement extends BaseElement {
  type: 'physics';
  svgContent: string;
  strokeColor: string;
  strokeWidth: number;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  src: string;
}

export type EditorElement = TextElement | MathElement | PhysicsElement | ImageElement;

export interface Page {
  id: string;
  elements: EditorElement[];
}

export interface DocumentState {
  id: string;
  title: string;
  pages: Page[];
  paperSize: 'A4' | 'A3' | 'Letter' | 'Legal';
  orientation: 'portrait' | 'landscape';
  margins: { top: number; right: number; bottom: number; left: number };
}
