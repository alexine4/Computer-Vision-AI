

export interface User {
  userId?: number;
  userName?: string;
  email: string;
  password: string;
  rootLevel?: number;
}

export interface RecognitionLog {
  recognotionResultId: number;
  detectObject: string;
  confidenceScore: number;
  createdAt: Date
  ai_modelId: number;
  cameraId: number
}