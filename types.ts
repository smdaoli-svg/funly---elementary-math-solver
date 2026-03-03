
export interface MathStep {
  stepNumber: number;
  description: string;
  imagePrompt: string;
  imageUrl?: string;
}

export interface MathProblemResult {
  originalText: string;
  steps: MathStep[];
}

export enum AppState {
  HOME = 'HOME',
  LOADING = 'LOADING',
  RESULT = 'RESULT'
}
