// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Loader2, Plus, Trash2 } from "lucide-react";
// import Image from "next/image";
// import CreateLevelBadgeModal from "./CreateLevel";
// import { useDeleteBadge, useGetALlBadge } from "@/hooks/apiCalling";
// import { useSession } from "next-auth/react";
// import { Skeleton } from "@/components/ui/skeleton";

// const LevelsBadge = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const { data: session } = useSession();
//   const token = (session?.user as { accessToken: string })?.accessToken;

//   const { data: getAllBadge, isLoading } = useGetALlBadge(token);
//   const deleteBadge = useDeleteBadge(token);
//   const allLevels = getAllBadge?.data.data || [];

//   const handleDeleteBadge = (levelId: string) => {
//     deleteBadge.mutate(levelId);

//   };

//   return (
//     <div>
//       {/* Create Level Button */}
//       <div className="text-end mb-8">
//         <Button
//           className="bg-[#03383b] hover:bg-[#02292b]"
//           onClick={() => setOpenModal(true)}
//         >
//           <Plus />
//           Create Badge
//         </Button>
//       </div>

//       {/* Modal */}
//       <CreateLevelBadgeModal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//       />

//       {/* LOADING SKELETON */}
//       {isLoading && (
//         <div className="grid grid-cols-3 gap-6">
//           {Array.from({ length: 6 }).map((_, idx) => (
//             <div
//               key={idx}
//               className="shadow-[0px_1px_2px_0px_#0000000D] bg-white p-5 rounded-md border border-gray-200 space-y-6 relative"
//             >
//               <Skeleton className="h-5 w-32" />
//               <div className="flex items-center justify-between">
//                 <Skeleton className="h-4 w-24" />
//                 <Skeleton className="h-12 w-12 rounded-full" />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Level Grid */}
//       {!isLoading && (
//         <div className="grid grid-cols-3 gap-6">
//           {allLevels.map((level) => (
//             <div
//               key={level._id}
//               className="shadow-[0px_1px_2px_0px_#0000000D] bg-white p-5 rounded-md border border-gray-200 space-y-8 relative"
//             >
//               {/* Delete Icon at Top-Right of Card */}
//               {
//                 deleteBadge.isPending ? (
//                   <Loader2 className="absolute top-2 right-2 w-5 h-5 animate-spin" />
//                 ) : (
//                   <Trash2
//                     className="absolute top-2 right-2 w-5 h-5 cursor-pointer text-red-500"
//                     onClick={() => handleDeleteBadge(level._id)}
//                   />
//                 )

//               }


//               <div>
//                 <h2 className="text-[16px] text-[#343A40] font-semibold">
//                   Badges
//                 </h2>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="text-[#929292] font-medium text-[14px]">
//                     Badge Name: {level.name}
//                   </h2>
//                 </div>

//                 <div className="flex items-center gap-5">
//                   <div>
//                     <h2 className="text-[14px] text-[#929292] font-medium">
//                       Badges:
//                     </h2>
//                   </div>

//                   <div className="flex gap-2">
//                     {level.badge?.map((badgeUrl, index) => (
//                       <Image
//                         key={index}
//                         src={badgeUrl}
//                         width={30}
//                         height={30}
//                         alt={`badge-${index}`}
//                         className="rounded-full object-cover"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* No Data */}
//           {allLevels.length === 0 && (
//             <p className="text-gray-500 col-span-3 text-center">
//               No levels found.
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LevelsBadge;


"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import CreateLevelBadgeModal from "./CreateLevel";
import { useDeleteBadge, useGetALlBadge } from "@/hooks/apiCalling";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

const LevelsBadge = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;

  const { data: getAllBadge, isLoading } = useGetALlBadge(token);
  const deleteBadge = useDeleteBadge(token);
  const allLevels = getAllBadge?.data.data || [];

  // Track which card is being deleted
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteBadge = (levelId: string) => {
    setDeletingId(levelId);
    deleteBadge.mutate(levelId, {
      onSettled: () => setDeletingId(null), // Reset after delete finishes
    });
  };

  return (
    <div>
      {/* Create Level Button */}
      <div className="text-end mb-8">
        <Button
          className="bg-[#03383b] hover:bg-[#02292b]"
          onClick={() => setOpenModal(true)}
        >
          <Plus />
          Create Badge
        </Button>
      </div>

      {/* Modal */}
      <CreateLevelBadgeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      {/* LOADING SKELETON */}
      {isLoading && (
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="shadow-[0px_1px_2px_0px_#0000000D] bg-white p-5 rounded-md border border-gray-200 space-y-6 relative"
            >
              <Skeleton className="h-5 w-32" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Level Grid */}
      {!isLoading && (
        <div className="grid grid-cols-3 gap-6">
          {allLevels.map((level) => (
            <div
              key={level._id}
              className="shadow-[0px_1px_2px_0px_#0000000D] bg-white p-5 rounded-md border border-gray-200 space-y-8 relative"
            >
              {/* Delete Icon / Loader */}
              {deletingId === level._id ? (
                <Loader2 className="absolute top-2 right-2 w-5 h-5 animate-spin text-gray-500" />
              ) : (
                <Trash2
                  className="absolute top-2 right-2 w-5 h-5 cursor-pointer text-red-500"
                  onClick={() => handleDeleteBadge(level._id)}
                />
              )}

              <div>
                <h2 className="text-[16px] text-[#343A40] font-semibold">
                  Badges
                </h2>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[#929292] font-medium text-[14px]">
                    Badge Name: {level.name}
                  </h2>
                </div>

                <div className="flex items-center gap-5">
                  <div>
                    <h2 className="text-[14px] text-[#929292] font-medium">
                      Badges:
                    </h2>
                  </div>

                  <div className="flex gap-2">
                    {level.badge?.map((badgeUrl, index) => (
                      <Image
                        key={index}
                        src={badgeUrl}
                        width={30}
                        height={30}
                        alt={`badge-${index}`}
                        className="rounded-full object-cover"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* No Data */}
          {allLevels.length === 0 && (
            <p className="text-gray-500 col-span-3 text-center">
              No levels found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LevelsBadge;
