
import { addBlog } from "@/lib/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";



// export function useGetAllBlog(page?: number, limit?: number) {
//     return useQuery<BlogResponse>({
//         queryKey: ["blog", page, limit],
//         queryFn: () => {
//             return getAllBlog({ page, limit })
//         },
//     })
// }

// export function useProfileQuery(token: string | undefined) {
//     return useQuery<UserProfileResponse>({
//         queryKey: ["me"],
//         queryFn: () => {
//             if (!token) throw new Error("Token is missing")
//             return getProfile(token)
//         },
//         enabled: !!token,
//     })
// }


export function useAddBlog(token: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload:{ title: string, description: string, image: File}) => addBlog(token, payload),
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

