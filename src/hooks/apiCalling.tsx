
import { addLevel, approveLevel, getAllBadge, getAllBadgeRequest } from "@/lib/badge";
import { addBlog, deleteBlog, editBlog, getAllBlog, getSingleBlog } from "@/lib/blog";
import { getOverview } from "@/lib/dashboardOverview";
import { addFaq, deleteFaq, editFaq, getAllFaq, getSingelFaq } from "@/lib/faq";
import { addIndustry, deleteIndustry, editIndustry, getAllIndustries, getSingleIndustry } from "@/lib/industries";
import { MonthlyEarningsResponse } from "@/lib/platformGroth";
import { changePassword, getProfile, updateAvatar, updateProfileInfo, updateStatus } from "@/lib/profileinfo";
import { addService, deleteService, editService, getAllActiveProject, getAllGrowth, getAllProjectCompleted, getAllService, getAllServiceStast, getSingleService } from "@/lib/service";
import { getAllUser } from "@/lib/user";
import { BadgeLevelResponse } from "@/types/badgelevel";
import { BadgeResponse } from "@/types/badgeType";
import { BlogResponse, SingelBlogResponse } from "@/types/blog";
import { DashboardOverviewResponse } from "@/types/dashboardStach";
import { FaqResponse, SingleFaqResponse } from "@/types/faq";
import { IndustryResponse, SingleIndustry } from "@/types/industries";
import { ProjectsResponse } from "@/types/project";
import { ServicesResponse, SingleService } from "@/types/service";
import { GetAllUsersResponse } from "@/types/user";
import { UserProfileResponse } from "@/types/userDataType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "sonner";


export function useGetAllBlog(page?: number, limit?: number) {
    return useQuery<BlogResponse>({
        queryKey: ["blog", page, limit],
        queryFn: () => {
            return getAllBlog({ page, limit })
        },
    })
}

export function useGetSingelBlog(id: string) {
    return useQuery<SingelBlogResponse>({
        queryKey: ["blog", id],
        queryFn: () => {
            return getSingleBlog(id)
        },
    })
}

export function useAddBlog(token: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { title: string, description: string, image: File }) => addBlog(token, payload),
        onSuccess: () => {
            toast.success("blog add successful");
            queryClient.invalidateQueries({ queryKey: ["blog"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "add failed");
            else toast.error("add failed");
        },
    });
}

export function useEditBlog(token: string, id: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: (payload: { title: string, description: string, image: File }) => editBlog(token, payload, id),
        onSuccess: () => {
            toast.success("blog add successful");
            queryClient.invalidateQueries({ queryKey: ["blog"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "add failed");
            else toast.error("add failed");
        },
    });
}

export function useDeleteBlog(token: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteBlog(token, id),
        onSuccess: () => {
            toast.success("blog Delete successful");
            queryClient.invalidateQueries({ queryKey: ["blog"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "delete failed");
            else toast.error("delete failed");
        },
    });
}

export function useAddFaq(token: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { title: string, description: string, }) => addFaq(token, payload),
        onSuccess: () => {
            toast.success("faq add successful");
            queryClient.invalidateQueries({ queryKey: ["faq"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "add failed");
            else toast.error("add failed");
        },
    });
}

export function useGetAllFaq(page?: number, limit?: number) {
    return useQuery<FaqResponse>({
        queryKey: ["faq", page, limit],
        queryFn: () => {
            return getAllFaq({ page, limit })
        },
    })
}

export function useEditFaq(token: string, id: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { title: string, description: string, }) => editFaq(token, payload, id),
        onSuccess: (success) => {
            toast.success(success.message || "faq update successful");
            queryClient.invalidateQueries({ queryKey: ["faq"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "edit failed");
            else toast.error("edit failed");
        },
    });
}

export function useGetSingelFaq(id: string) {
    return useQuery<SingleFaqResponse>({
        queryKey: ["faq", id],
        queryFn: () => {
            return getSingelFaq(id)
        },
    })
}

export function useDeleteFaq(token: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteFaq(token, id),
        onSuccess: (success) => {
            toast.success(success.message || "faq Delete successful");
            queryClient.invalidateQueries({ queryKey: ["faq"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "delete failed");
            else toast.error("delete failed");
        },
    });
}

export function useGetAllIndustry(page?: number, limit?: number) {
    return useQuery<IndustryResponse>({
        queryKey: ["industry", page, limit],
        queryFn: () => {
            return getAllIndustries({ page, limit })
        },
    })
}

export function useDeleteIndustry(token: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteIndustry(token, id),
        onSuccess: (success) => {
            toast.success(success.message || "industry Delete successful");
            queryClient.invalidateQueries({ queryKey: ["industry"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "delete failed");
            else toast.error("delete failed");
        },
    });
}

export function useAddIndustry(token: string, onSuccessCallback?: () => void, formReset?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { name: string, discription: string, status: string, image: File }) => addIndustry(token, payload),
        onSuccess: () => {
            toast.success("industry add successful");
            queryClient.invalidateQueries({ queryKey: ["industry"] });
            if (onSuccessCallback) onSuccessCallback();
            if (formReset) formReset();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "add failed");
            else toast.error("add failed");
        },
    });
}

export function useGetSingelIndustry(id: string) {
    return useQuery<SingleIndustry>({
        queryKey: ["industry", id],
        queryFn: () => {
            return getSingleIndustry(id)
        },
    })
}

export function useEditIndustry(token: string, id: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { name: string, discription: string, status: string, image: File }) => editIndustry(token, id, payload),
        onSuccess: () => {
            toast.success("industry update successful");
            queryClient.invalidateQueries({ queryKey: ["industry"] });
            if (onSuccessCallback) onSuccessCallback();

        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "add failed");
            else toast.error("add failed");
        },
    });
}

export function useGetAllService(page?: number, limit?: number) {
    console.log(page, limit)
    return useQuery<ServicesResponse>({
        queryKey: ["service", page, limit],
        queryFn: () => {
            return getAllService({ page, limit })
        },
    })
}

export function useServiceDelete(token: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteService(token, id),
        onSuccess: (success) => {
            toast.success(success.message || "service Delete successful");
            queryClient.invalidateQueries({ queryKey: ["service"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "delete failed");
            else toast.error("delete failed");
        },
    });
}

export function useAddCategory(token: string, onSuccessCallback?: () => void, formReset?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { name: string, discription: string, image:File }) => addService(token, payload),
        onSuccess: () => {
            toast.success("service add successful");
            queryClient.invalidateQueries({ queryKey: ["service"] });
            if (onSuccessCallback) onSuccessCallback();
            if (formReset) formReset();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "add failed");
            else toast.error("add failed");
        },
    });
}

export function useGetSingelService(id: string) {
    return useQuery<SingleService>({
        queryKey: ["service", id],
        queryFn: () => {
            return getSingleService(id)
        },
    })
}

export function useEditService(token: string, id: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { name: string, description: string, image: File }) => editService(token, id, payload),
        onSuccess: () => {
            toast.success("service update successful");
            queryClient.invalidateQueries({ queryKey: ["service"] });
            if (onSuccessCallback) onSuccessCallback();

        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "add failed");
            else toast.error("add failed");
        },
    });
}

export function useGetAllUser(page?: number, limit?: number) {
    return useQuery<GetAllUsersResponse>({
        queryKey: ["user", page, limit],
        queryFn: () => {
            return getAllUser({ page, limit })
        },
    })
}

export function useProfileInfoUpdate(token: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: FormData) => updateProfileInfo(token, payload),
        onSuccess: () => {
            toast.success("Profile updated successfully");
            queryClient.invalidateQueries({ queryKey: ["me"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "Update failed");
            else toast.error("Update failed");
        },
    });
}

export function useChnagePassword(
    token: string, onSuccessCallback?: () => void) {
    return useMutation({
        mutationFn: (payload: { oldPassword: string; newPassword: string }) =>
            changePassword(token, payload),
        onSuccess: (data) => {
            toast.success(data?.message || "Password updated successfully");
            signOut({ callbackUrl: "/" });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "Update failed");
            else toast.error("Update failed");
        },
    });
}

export function useProfileQuery(token: string | undefined) {
    return useQuery<UserProfileResponse>({
        queryKey: ["me"],
        queryFn: () => {
            if (!token) throw new Error("Token is missing")
            return getProfile(token)
        },
        enabled: !!token,
    })
}

export function useProfileAvatarUpdate(token: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { avatar: File }) => updateAvatar(token, payload),
        onSuccess: () => {
            toast.success("Profile updated successfully");
            queryClient.invalidateQueries({ queryKey: ["me"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "Update failed");
            else toast.error("Update failed");
        },
    });
}

export function useGetAllOverview( token: string) {
    return useQuery<DashboardOverviewResponse>({
        queryKey: ["overview"],
        queryFn: () => {
            return getOverview(token)
        },
    })
}

export function useGetAllServiceStats() {
    return useQuery<ServicesResponse>({
        queryKey: ["service1"],
        queryFn: () => {
            return getAllServiceStast()
        },
    })
}

export function useGetAllGrowthStats(token: string) {
    return useQuery<MonthlyEarningsResponse>({
        queryKey: ["growth"],
        queryFn: () => {
            return getAllGrowth(token)
        },
    })
}

export function useGetAllActiveProject(token:string) {
    return useQuery<ProjectsResponse>({
        queryKey: ["active-project"],
        queryFn: () => {
            return getAllActiveProject(token)
        },
    })
}

export function useGetAllProjectCompleted(token:string) {
    return useQuery<ProjectsResponse>({
        queryKey: ["completed-project"],
        queryFn: () => {
            return getAllProjectCompleted(token)
        },
    })
}

export function useGetAllLevel(token:string) {
    return useQuery<BadgeResponse>({
        queryKey: ["level"],
        queryFn: () => {
            return getAllBadge(token)
        },
    })
}

export function useAddLevel(token: string,  onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { level: string, badges: File[] }) => addLevel(token, payload),
        onSuccess: () => {
            toast.success("level add successful");
            queryClient.invalidateQueries({ queryKey: ["level"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "add failed");
            else toast.error("add failed");
        },
    });
}

export function useUserStatusUpdate(token: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { status: string, id: string }) => updateStatus(token, payload),
        onSuccess: () => {
            toast.success("Status updated successfully");
            queryClient.invalidateQueries({ queryKey: ["me"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "Update failed");
            else toast.error("Update failed");
        },
    });
}

export function useGetAllLevelRequest(token:string) {
    return useQuery<BadgeLevelResponse>({
        queryKey: ["badge-request"],
        queryFn: () => {
            return getAllBadgeRequest(token)
        },
    })
}

export function useApproveLevel(token: string,onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { userId: string, badgeId: string }) => approveLevel(token, payload),
        onSuccess: () => {
            toast.success("Request approved successfully");
            queryClient.invalidateQueries({ queryKey: ["level-request"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "Update failed");
            else toast.error("Update failed");
        },
    });
}

