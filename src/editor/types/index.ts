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
  isQuestion?: boolean;
  questionNumber?: number;
  marks?: number;
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

export interface ExamMetadata {
  governorate: string;
  directorate: string;
  school: string;
  stage: string;       // المرحلة
  grade: string;       // الصف
  division: string;    // الشعبة
  subject: string;     // المادة
  semester: string;    // الفصل الدراسي
  round: string;       // الدور
  academicYear: string;// العام الدراسي
  examTitle: string;   // عنوان الاختبار
  time: string;        // الزمن
  marks: string;       // الدرجة الكلية
  examType: string;    // نوع الاختبار
  teacherName: string;
  schoolPrincipal?: string; // اسم مدير المدرسة
  templateType: 'none' | 'ministerial' | 'private' | 'automated' | 'bubblesheet';
  modelCode?: 'أ' | 'ب' | 'ج' | 'د';
  themePreset?: 'classic' | 'luxury_blue' | 'emerald_green' | 'royal_crimson' | 'imperial_purple' | 'noble_gold';
  themePrimaryColor?: string;
  themeBorderColor?: string;
  themeBorderStyle?: 'double' | 'solid' | 'dashed' | 'groove' | 'ridge';
  themeBorderWidth?: string;
  themeHeaderBg?: string;
  themeIntroBg?: string;
  themeIntroTextColor?: string;
  themeAccentColor?: string;
}

export interface DocumentState {
  id: string;
  title: string;
  pages: Page[];
  paperSize: 'A4' | 'A3' | 'Letter' | 'Legal';
  orientation: 'portrait' | 'landscape';
  margins: { top: number; right: number; bottom: number; left: number };
  metadata: ExamMetadata;
}

