export interface FallacyDetail {
  name: string;
  description: string;
  example: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  fallacyName: string;
  explanation: string;
}

export interface SlideQuiz {
  questionTitle: string;
  scenario: string;
  options: QuizOption[];
  correctFallacy: string;
  fallacyBreakdowns: FallacyDetail[];
  discussionPrompt: string;
}

export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  curriculumStandard: string;
  contentProse: string;
  bulletPoints: string[];
  speakerNotes: string;
  layoutSuggestion: string;
  quiz?: SlideQuiz;
}

export type ThemeMode = "indigo" | "neutral" | "emerald";
