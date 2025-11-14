
import { addBlog, getAllBlog } from "@/lib/blog";
import { BlogResponse } from "@/types/blog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";



// export function useGetAllBlog(page?: number, limit?: number) {
//     return useQuery<BlogResponse>({
//         queryKey: ["blog", page, limit],
//         queryFn: () => {
//             return getAllBlog({ page, limit })
//         },
//     })
// }

export function useGetAllBlog(page?: number, limit?: number) {
    return useQuery<BlogResponse>({
        queryKey: ["blog", page, limit],
        queryFn: () => {
            return getAllBlog({ page, limit })
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

