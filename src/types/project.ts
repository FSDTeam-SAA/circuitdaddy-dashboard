export interface ProjectsResponse {
    statusCode: number;
    success: boolean;
    message: string;
    meta: {
        total: number;
        page: number;
        limit: number;
    };
    data: Project[];
}

export interface Project {
    _id: string;
    title: string;
    description: string;
    client: User;
    engineers: User[];
    approvedEngineers: User[];
    status: "pending" | "in_progress" | "completed" | "cancelled";
    totalPaid: number;
    ndaAgreement: string[];
    progress: number;
    totalTimeline: number;
    startDate: string;
    deliveryDate: string;
    lastUpdated: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    usedAmount?: number;
}

export interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage: string;
}
