

// "use client"

// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { ChevronRight } from "lucide-react"
// import { useGetAllProjectCompleted } from "@/hooks/apiCalling"
// import { useSession } from "next-auth/react"

// export default function RecentPendingApprovals() {
//   const { data: session } = useSession();
//   const token = (session?.user as { accessToken: string })?.accessToken;

//   const { data: activeProject, isLoading } = useGetAllProjectCompleted(token);

//   const projects = activeProject?.data ?? [];
//  console.log(projects)
//   return (
//     <Card className="p-6">
//       <div>
//         {/* Header */}
//         <div className="mb-4 flex items-center py-[22px] px-4 justify-between">
//           <h2 className="text-[14px] font-semibold text-[#147575]">
//             Completed Projects
//           </h2>
//           <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
//             View All
//             <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>

//         {/* Loading State */}
//         {isLoading && <p className="text-center">Loading...</p>}

//         <div className="space-y-[24px]">
//           {projects.map((project) => {
//             const progressPercentage = project.progress ?? 0;

//             return (
//               <Card
//                 key={project._id}
//                 className="border-[#EEEEEE] shadow-none hover:shadow-sm transition"
//               >
//                 <CardHeader>
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <h2 className="text-sm font-medium mb-2 text-[#147575]">
//                         {project.title}
//                       </h2>

//                       <p className="mt-1 text-[12px] text-[#68706A]">
//                         {project.client?.firstName} {project.client?.lastName}
//                       </p>
//                     </div>

//                     {/* Engineers Avatars */}
//                     <div className="flex -space-x-2">
//                       {project.engineers?.slice(0, 3).map((eng: { profileImage: string; firstName: string; lastName: string }, i: number) => (
//                         <Avatar key={i} className="h-8 w-8 border-2 border-white">
//                           <AvatarImage src={eng.profileImage} />
//                           <AvatarFallback className="bg-gray-300 text-xs">
//                             {eng.firstName?.[0]}
//                             {eng.lastName?.[0]}
//                           </AvatarFallback>
//                         </Avatar>
//                       ))}
//                     </div>
//                   </div>
//                 </CardHeader>

//                 <CardContent className="space-y-3">
//                   <div className="flex items-center justify-between text-sm">
//                     <div className="flex items-center mb-4 gap-3">
//                       <Badge
//                         variant="secondary"
//                         className="bg-[#E6EBEB] text-[#00383B] py-1 px-3 rounded-full"
//                       >
//                         {project.status}
//                       </Badge>

//                       <span className="text-[#9E9E9E] text-[12px] font-normal">
//                         Start: {new Date(project.startDate).toLocaleDateString()}
//                       </span>
//                     </div>

//                     <Badge
//                       variant="secondary"
//                       className="bg-[#FEE2E2] text-[#991B1B] py-1 px-3 rounded-full"
//                     >
//                       Due: {new Date(project.deliveryDate).toLocaleDateString()}
//                     </Badge>
//                   </div>

//                   {/* Progress Bar */}
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-gray-700">
//                         {progressPercentage}/100
//                       </span>
//                       <span className="font-medium text-gray-700">
//                         {progressPercentage}%
//                       </span>
//                     </div>
//                     <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
//                       <div
//                         className="h-full rounded-full bg-teal-600 transition-all"
//                         style={{ width: `${progressPercentage}%` }}
//                       />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </div>
//     </Card>
//   );
// }

"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import { useGetAllProjectCompleted } from "@/hooks/apiCalling"
import { useSession } from "next-auth/react"

export default function RecentPendingApprovals() {
  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;

  const { data: activeProject, isLoading } = useGetAllProjectCompleted(token);

  const projects = activeProject?.data ?? [];

  return (
    <Card className="p-6">
      <div>
        {/* Header */}
        <div className="mb-4 flex items-center py-[22px] px-4 justify-between">
          <h2 className="text-[14px] font-semibold text-[#147575]">
            Completed Projects
          </h2>
          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
            View All
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Loading State */}
        {isLoading && <p className="text-center">Loading...</p>}

        <div className="space-y-[24px]">
          {/* No Data Found */}
          {!isLoading && projects.length === 0 && (
            <p className="text-center text-gray-500 py-6">
              No Completed Projects Found
            </p>
          )}

          {/* Projects List */}
          {projects.map((project) => {
            const progressPercentage = project.progress ?? 0;

            return (
              <Card
                key={project._id}
                className="border-[#EEEEEE] shadow-none hover:shadow-sm transition"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-sm font-medium mb-2 text-[#147575]">
                        {project.title}
                      </h2>

                      <p className="mt-1 text-[12px] text-[#68706A]">
                        {project.client?.firstName} {project.client?.lastName}
                      </p>
                    </div>

                    {/* Engineers Avatars */}
                    <div className="flex -space-x-2">
                      {project.engineers?.slice(0, 3).map((eng, i) => (
                        <Avatar key={i} className="h-8 w-8 border-2 border-white">
                          <AvatarImage src={eng.profileImage} />
                          <AvatarFallback className="bg-gray-300 text-xs">
                            {eng.firstName?.[0]}
                            {eng.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center mb-4 gap-3">
                      <Badge
                        variant="secondary"
                        className="bg-[#E6EBEB] text-[#00383B] py-1 px-3 rounded-full"
                      >
                        {project.status}
                      </Badge>

                      <span className="text-[#9E9E9E] text-[12px] font-normal">
                        Start: {new Date(project.startDate).toLocaleDateString()}
                      </span>
                    </div>

                    <Badge
                      variant="secondary"
                      className="bg-[#FEE2E2] text-[#991B1B] py-1 px-3 rounded-full"
                    >
                      Due: {new Date(project.deliveryDate).toLocaleDateString()}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">
                        {progressPercentage}/100
                      </span>
                      <span className="font-medium text-gray-700">
                        {progressPercentage}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-teal-600 transition-all"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

