export type ResourceType = 'note' | 'book' | 'slides' | 'video' | 'case' | 'paper' | 'tool';

export type CategoryTopic = 
  | 'Anatomy & Physiology'
  | 'Psychoacoustics'
  | 'Pediatric Audiology'
  | 'Vestibular & Balance'
  | 'Electrophysiology (ABR/OAE)'
  | 'Hearing Aids & Amplification'
  | 'Cochlear Implants'
  | 'Tinnitus & Hyperacusis'
  | 'Auditory Processing (APD)';

export interface EducationalResource {
  id: string;
  title: string;
  type: ResourceType;
  topic: CategoryTopic;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  author: string;
  institution?: string;
  description: string;
  contentMarkdown?: string;
  readTimeOrDuration: string;
  downloadUrl?: string;
  externalLink?: string;
  tags: string[];
  pdfPages?: number;
  slidesCount?: number;
  videoYoutubeId?: string;
  fileSize?: string;
  rating: number;
  featured?: boolean;
  dateAdded: string;
}

export interface AnatomicalStructure {
  id: string;
  name: string;
  latinName?: string;
  region: 'outer' | 'middle' | 'inner' | 'neural';
  description: string;
  clinicalSignificance: string;
  pathologyAssociation: string[];
  frequencyResponseHz?: number; // For cochlear tonotopic mapping
  svgCoordinates: { cx: number; cy: number; r: number };
  position3D: [number, number, number];
  keyFunctions: string[];
}

export interface ThresholdPoint {
  frequency: number; // e.g. 125, 250, 500, 1000, 2000, 4000, 8000
  decibels: number;  // -10 to 120 dB HL
}

export interface AudiogramData {
  rightEarAir: ThresholdPoint[];
  rightEarBone?: ThresholdPoint[];
  leftEarAir: ThresholdPoint[];
  leftEarBone?: ThresholdPoint[];
  maskingUsedRight?: boolean;
  maskingUsedLeft?: boolean;
}

export interface ClinicalCase {
  id: string;
  title: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  chiefComplaint: string;
  historyOfPresentIllness: string;
  otoscopyFindings: string;
  audiogram: AudiogramData;
  tympanometry: {
    typeRight: 'Type A' | 'Type As' | 'Type Ad' | 'Type B' | 'Type C';
    typeLeft: 'Type A' | 'Type As' | 'Type Ad' | 'Type B' | 'Type C';
    peakPressureRight: number; // daPa
    peakPressureLeft: number;
    complianceRight: number; // ml
    complianceLeft: number;
  };
  acousticReflexes: string;
  oaeResults: string;
  correctDiagnosis: string;
  differentialDiagnoses: string[];
  diagnosticExplanation: string;
  recommendedManagement: string[];
  quizQuestions: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface BookmarkItem {
  id: string;
  title: string;
  type: ResourceType;
  dateAdded: string;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  resourceId?: string;
}
