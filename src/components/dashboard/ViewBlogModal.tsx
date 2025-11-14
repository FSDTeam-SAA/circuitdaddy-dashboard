// "use client"

// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";

// interface ViewBlogModalProps {
//   open: boolean;
//   onClose: () => void;
//   blog: any | null;
// }

// const ViewBlogModal = ({ open, onClose, blog }: ViewBlogModalProps) => {
//   if (!blog) return null;

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-semibold text-gray-800">
//             {blog.title}
//           </DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4 mt-3">

//           {/* Status Badge */}
//           <Badge
//             className={`text-xs py-1 px-4 rounded-xl ${
//               blog.published
//                 ? "bg-[#28A7451A] text-[#28A745]"
//                 : "bg-[#854D0E1A] text-[#854D0E]"
//             }`}
//           >
//             {blog.published ? "Published" : "Draft"}
//           </Badge>

//           {/* Date */}
//           <p className="text-sm text-gray-500">
//             {new Date(blog.createdAt).toLocaleDateString()}
//           </p>

//           {/* Content */}
//           <div
//             className="prose max-w-full text-gray-700"
//             dangerouslySetInnerHTML={{ __html: blog.content }}
//           ></div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ViewBlogModal;


"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Blog } from "@/types/blog";

interface ViewBlogModalProps {
    open: boolean;
    onClose: () => void;
    blog:  Blog;
}

const ViewBlogModal = ({ open, onClose, blog }: ViewBlogModalProps) => {
    if (!blog) return null;
    console.log(blog);
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-800">
                        {blog.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-3">

                    {/* Blog Image */}
                    {blog.featuredImage && (
                        <Image
                            src={blog.featuredImage}
                            alt="Blog Image"
                            width={500}
                            height={300}
                            className="w-full rounded-lg object-cover max-h-72"
                        />
                    )}

                    {/* Status Badge */}
                    <Badge
                        className={`text-xs py-1 px-4 rounded-xl ${blog.published
                                ? "bg-[#28A7451A] text-[#28A745]"
                                : "bg-[#854D0E1A] text-[#854D0E]"
                            }`}
                    >
                        {blog.published ? "Published" : "Draft"}
                    </Badge>

                    {/* Date */}
                    <p className="text-sm text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                    </p>

                    {/* HTML Content */}
                    <div
                        className="prose max-w-full text-gray-700"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    ></div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewBlogModal;
