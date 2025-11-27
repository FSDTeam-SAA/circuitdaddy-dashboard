export interface Badge {
  _id: string;
  name: string;
  badge: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface BadgeMeta {
  page: number;
  limit: number;
  total: number;
}

export interface BadgeData {
  meta: BadgeMeta;
  data: Badge[];
}

export interface BadgeResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: BadgeData;
}
