export interface MonthlyEarningsItem {
  month: string;
  totalEarnings: number;
}

export interface MonthlyEarningsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: MonthlyEarningsItem[];
}
