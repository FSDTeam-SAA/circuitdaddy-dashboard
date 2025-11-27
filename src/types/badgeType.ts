export interface BadgeItem {
  _id: string;
  name: number;        // (If this is a typo in backend, keep it as 'lavel')
  badge: string[];      // Array of image URLs
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BadgeMeta {
  page: number;
  limit: number;
  total: number;
}

export interface BadgeResponseData {
  meta: BadgeMeta;
  data: BadgeItem[];
}

export interface BadgeResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: BadgeResponseData;
}
