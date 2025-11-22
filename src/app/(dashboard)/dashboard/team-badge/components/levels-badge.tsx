// // "use client";

// // import { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Plus } from "lucide-react";
// // import Image from "next/image";
// // import CreateLevelBadgeModal from "./CreateLevel";
// // import { useGetAllLevel } from "@/hooks/apiCalling";
// // import { useSession } from "next-auth/react";

// // const LevelsBadge = () => {
// //   const [openModal, setOpenModal] = useState(false);
// //    const { data: session } = useSession();
// //       const token = (session?.user as { accessToken: string })?.accessToken;

// //   const getAllBadge = useGetAllLevel(token)



// //   return (
// //     <div>
// //       {/* Create Level Button */}
// //       <div className="text-end mb-8">
// //         <Button
// //           className="bg-[#03383b] hover:bg-[#02292b]"
// //           onClick={() => setOpenModal(true)}
// //         >
// //           <Plus />
// //           Create Level
// //         </Button>
// //       </div>

// //       {/* Modal */}
// //       <CreateLevelBadgeModal open={openModal} onClose={() => setOpenModal(false)} />

// //       {/* Level Grid */}
// //       <div className="grid grid-cols-3 gap-6">
// //         {Array.from({ length: 12 }).map((_, index) => (
// //           <div
// //             key={index}
// //             className="shadow-[0px_1px_2px_0px_#0000000D] bg-white p-5 rounded-md border border-gray-200 space-y-8"
// //           >
// //             <div>
// //               <h2 className="text-[16px] text-[#343A40] font-semibold">
// //                 Levels & Badges
// //               </h2>
// //             </div>

// //             <div className="flex items-center justify-between opacity-60">
// //               <div>
// //                 <h2 className="text-[#929292] font-medium text-[14px]">
// //                   Level Name: 01
// //                 </h2>
// //               </div>

// //               <div className="flex items-center gap-5">
// //                 <div>
// //                   <h2 className="text-[14px] text-[#929292] font-medium">
// //                     Level Badge:
// //                   </h2>
// //                 </div>

// //                 <div>
// //                   <Image
// //                     src={"/levels-badge.png"}
// //                     alt="levels-badge.png"
// //                     width={1000}
// //                     height={1000}
// //                     className="h-12 w-12 rounded-full"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default LevelsBadge;

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
// import Image from "next/image";
// import CreateLevelBadgeModal from "./CreateLevel";
// import { useGetAllLevel } from "@/hooks/apiCalling";
// import { useSession } from "next-auth/react";

// const LevelsBadge = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const { data: session } = useSession();
//   const token = (session?.user as { accessToken: string })?.accessToken;

//   const { data: getAllBadge, isLoading } = useGetAllLevel(token);

//   const allLevels = getAllBadge?.data?.data ?? [];

//   return (
//     <div>
//       {/* Create Level Button */}
//       <div className="text-end mb-8">
//         <Button
//           className="bg-[#03383b] hover:bg-[#02292b]"
//           onClick={() => setOpenModal(true)}
//         >
//           <Plus />
//           Create Level
//         </Button>
//       </div>

//       {/* Modal */}
//       <CreateLevelBadgeModal open={openModal} onClose={() => setOpenModal(false)} />

//       {/* Loading State */}
//       {isLoading && <p>Loading...</p>}

//       {/* Level Grid */}
//       <div className="grid grid-cols-3 gap-6">
//         {allLevels.map((level) => (
//           <div
//             key={level._id}
//             className="shadow-[0px_1px_2px_0px_#0000000D] bg-white p-5 rounded-md border border-gray-200 space-y-8"
//           >
//             <div>
//               <h2 className="text-[16px] text-[#343A40] font-semibold">
//                 Levels & Badges
//               </h2>
//             </div>

//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-[#929292] font-medium text-[14px]">
//                   Level: {level.lavel}
//                 </h2>
//               </div>

//               <div className="flex items-center gap-5">
//                 <div>
//                   <h2 className="text-[14px] text-[#929292] font-medium">
//                     Badge:
//                   </h2>
//                 </div>

//                 <div className="flex gap-2">
//                   <Image
//                     src={level.badge[0]}
//                     alt="badge"
//                     width={50}
//                     height={50}
//                     className="h-12 w-12 rounded-full object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* No Data */}
//         {allLevels.length === 0 && !isLoading && (
//           <p className="text-gray-500">No levels found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LevelsBadge;

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import CreateLevelBadgeModal from "./CreateLevel";
import { useGetAllLevel } from "@/hooks/apiCalling";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

const LevelsBadge = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;

  const { data: getAllBadge, isLoading } = useGetAllLevel(token);

  const allLevels = getAllBadge?.data?.data ?? [];

  return (
    <div>
      {/* Create Level Button */}
      <div className="text-end mb-8">
        <Button
          className="bg-[#03383b] hover:bg-[#02292b]"
          onClick={() => setOpenModal(true)}
        >
          <Plus />
          Create Level
        </Button>
      </div>

      {/* Modal */}
      <CreateLevelBadgeModal open={openModal} onClose={() => setOpenModal(false)} />

      {/* LOADING SKELETON */}
      {isLoading && (
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="shadow-[0px_1px_2px_0px_#0000000D] bg-white p-5 rounded-md border border-gray-200 space-y-6"
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
              className="shadow-[0px_1px_2px_0px_#0000000D] bg-white p-5 rounded-md border border-gray-200 space-y-8"
            >
              <div>
                <h2 className="text-[16px] text-[#343A40] font-semibold">
                  Levels & Badges
                </h2>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[#929292] font-medium text-[14px]">
                    Level: {level.lavel}
                  </h2>
                </div>

                <div className="flex items-center gap-5">
                  <div>
                    <h2 className="text-[14px] text-[#929292] font-medium">
                      Badge:
                    </h2>
                  </div>

                  <div className="flex gap-2">
                    <Image
                      src={level.badge[0]}
                      alt="badge"
                      width={50}
                      height={50}
                      className="h-12 w-12 rounded-full object-cover"
                    />
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
