interface Badge {
  _id: string;
  name: string;
  badge: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

interface UserData {
  _id: string;
  email: string;
  role: string;
  status: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  professionTitle: string;
  bio: string;
  rate: number;
  skills: string[];
  expertise: string[];
  industry: string;
  service: string;
  location: string;
  walletBalance: number;
  balance: number;
  totalEarned: number;
  completedProjectsCount: number;
  level: number;
  avgRating: number;
  ismanager: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastLogin: string;
  stripeAccountId: string;
  experience: number;
  gitHubLink: string;
  badgeUpdateRequest: boolean;
  userstatus: string;
  badgeRequest: string;
  badge: Badge;
  lavelUpdateRequest: boolean;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
}

export interface LevelUpResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: UserData[];
}
