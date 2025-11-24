export interface BadgeLevelUser {
  _id: string;
  email: string;
  role: string;
  status: string;
  firstName: string;
  lastName: string;
  phone: string;
  profileImage: string;
  professionTitle: string;
  bio: string;
  rate: number;
  experience: number;
  skills: string[];
  expertise: string[];
  industry: string;
  service: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  avgRating: number;
  balance: number;
  completedProjectsCount: number;
  lastLogin: string;
  level: number;
  ratingCount: number;
  totalEarned: number;
  totalRating: number;
  walletBalance: number;
  ismanager: boolean;
  stripeAccountId: string;
  lavelUpdateRequest: boolean;
  badge: string;
}

export interface BadgeLevelMeta {
  page: number;
  limit: number;
  total: number;
}

export interface BadgeLevelResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: BadgeLevelMeta;
  data: BadgeLevelUser[];
}
