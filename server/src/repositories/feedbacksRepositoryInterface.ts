export interface feedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepositoryInterface {
  create: (data: feedbackCreateData) => Promise<void>;
}