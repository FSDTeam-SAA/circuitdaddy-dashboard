export interface DashboardOverviewResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: DashboardOverviewData;
}

export interface DashboardOverviewData {
    totalErning: string;         
    totaActivelUser: number;
    totalActiveProject: number;
    totalPandingProject: number;
    totalCompletedProject: number;
}
