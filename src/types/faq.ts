export interface Faq {
  _id: string;
  title: string;
  description: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface FaqResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: Faq[];
}

export interface SingleFaq {
  _id: string;
  title: string;
  description: string;
  createdAt: string;   // ISO date string
  updatedAt: string;   // ISO date string
  __v: number;
}

export interface SingleFaqResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: SingleFaq;
}
