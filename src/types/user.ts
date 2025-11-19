export interface GetAllUsersResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: User[];
}

export interface User {
  _id: string;
  email: string;
  password: string;
  role: "user" | "engineer" | string;
  status: string;

  firstName?: string;
  lastName?: string;

  phone?: string;
  profileImage?: string;

  // Engineer fields
  professionTitle?: string;
  bio?: string;

  rate?: number;
  experience?: number;

  gitHubLink?: string;

  cv?: string;
  certifications?: string | string[];

  skills: string[];
  expertise: string[];

  industry?: string;
  service?: string;
  location?: string;

  walletBalance: number;
  balance: number;
  totalEarned: number;

  completedProjectsCount: number;

  totalRating: number;
  ratingCount: number;
  avgRating: number;

  badge: string[];
  level: number;

  createdAt: string;
  updatedAt: string;

  lastLogin?: string;

  verified?: boolean;

  stripeAccountId?: string;

  __v: number;
}
