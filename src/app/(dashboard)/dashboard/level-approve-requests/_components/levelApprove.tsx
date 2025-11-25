

// // "use client";

// // import { useState } from "react";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import { Checkbox } from "@/components/ui/checkbox";
// // import { Button } from "@/components/ui/button";
// // import { Skeleton } from "@/components/ui/skeleton";
// // import {
// //   useApproveLevel,
// //   useGetAllLevel,
// //   useGetAllLevelRequest,
// // } from "@/hooks/apiCalling";
// // import { useSession } from "next-auth/react";

// // export default function LevelApprovePage() {
// //   const { data: session } = useSession();
// //   const token = (session?.user as { accessToken: string })?.accessToken;

// //   // Get all levels for select box
// //   const { data: getAllBadge } = useGetAllLevel(token);
// //   const allLevels = getAllBadge?.data?.data ?? [];

// //   // State for modal and selected user/level
// //   const [open, setOpen] = useState(false);
// //   const [selectedUser, setSelectedUser] = useState<{
// //     userId: string;
// //     badgeId: string;
// //   } | null>(null);

// //   // Get all level requests
// //   const { data: levelData, isLoading } = useGetAllLevelRequest(token);
// //   const users = levelData?.data || [];

// //   // Approve mutation
// //   const approve = useApproveLevel(token, setOpen);

// //   // When checkbox clicked, set selected user
// //   const handleCheckboxClick = (userId: string, badgeId: string) => {
// //     setSelectedUser({ userId, badgeId });
// //     setOpen(true);
// //   };

// //   // When approve button clicked
// //   const handleApprove = () => {
// //     if (!selectedUser) return;

// //     approve.mutate({
// //       userId: selectedUser.userId,
// //       badgeId: selectedUser.badgeId,
// //     });
// //   };

// //   return (
// //     <div className="p-6">
// //       <Table>
// //         <TableHeader>
// //           <TableRow>
// //             <TableHead>Approve</TableHead>
// //             <TableHead>Name</TableHead>
// //             <TableHead>Email</TableHead>
// //             <TableHead>Profession</TableHead>
// //             <TableHead>Badge</TableHead>
// //           </TableRow>
// //         </TableHeader>

// //         <TableBody>
// //           {isLoading
// //             ? Array.from({ length: 5 }).map((_, i) => (
// //                 <TableRow key={i}>
// //                   <TableCell>
// //                     <Skeleton className="h-5 w-5 rounded-sm" />
// //                   </TableCell>
// //                   <TableCell>
// //                     <Skeleton className="h-5 w-32" />
// //                   </TableCell>
// //                   <TableCell>
// //                     <Skeleton className="h-5 w-40" />
// //                   </TableCell>
// //                   <TableCell>
// //                     <Skeleton className="h-5 w-36" />
// //                   </TableCell>
// //                   <TableCell>
// //                     <Skeleton className="h-5 w-10" />
// //                   </TableCell>
// //                 </TableRow>
// //               ))
// //             : users.map((user) => (
// //                 <TableRow key={user._id}>
// //                   <TableCell>
// //                     <Checkbox
// //                       onCheckedChange={() =>
// //                         handleCheckboxClick(
// //                           user._id,
// //                           selectedUser?.badgeId || ""
// //                         )
// //                       }
// //                     />
// //                   </TableCell>

// //                   <TableCell>
// //                     {user.firstName} {user.lastName}
// //                   </TableCell>
// //                   <TableCell>{user.email}</TableCell>
// //                   <TableCell>{user.professionTitle}</TableCell>

// //                   {/* Level Select Box */}
// //                   <TableCell>
// //                     <select
// //                       className="border px-2 py-1 rounded"
// //                       defaultValue={user.level} // current level
// //                       onChange={(e) => {
// //                         const selectedLevelId = e.target.value;
// //                         console.log("Selected Level ID:", selectedLevelId);

// //                         // Update selectedUser so modal can approve this level
// //                         setSelectedUser({
// //                           userId: user._id,
// //                           badgeId: selectedLevelId,
// //                         });
// //                       }}
// //                     >
// //                       {allLevels.map((level) => (
// //                         <option key={level._id} value={level._id}>
// //                           Badge {level.lavel}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </TableCell>
// //                 </TableRow>
// //               ))}
// //         </TableBody>
// //       </Table>

// //       {/* Approve Modal */}
// //       <Dialog open={open} onOpenChange={setOpen}>
// //         <DialogContent>
// //           <DialogHeader>
// //             <DialogTitle>Approve Level Request</DialogTitle>
// //           </DialogHeader>

// //           <div className="py-4">
// //             <p className="text-sm text-muted-foreground">
// //               Are you sure you want to approve this level request?
// //             </p>
// //           </div>

// //           <div className="flex justify-end gap-3">
// //             <Button variant="outline" onClick={() => setOpen(false)}>
// //               Cancel
// //             </Button>

// //             <Button onClick={handleApprove} disabled={approve.isPending}>
// //               {approve.isPending ? "Approving..." : "Approve"}
// //             </Button>
// //           </div>
// //         </DialogContent>
// //       </Dialog>
// //     </div>
// //   );
// // }

// "use client";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   useApproveLevel,
//   useGetAllLevel,
//   useGetAllLevelRequest,
// } from "@/hooks/apiCalling";
// import { useSession } from "next-auth/react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function LevelApprovePage() {
//   const { data: session } = useSession();
//   const token = (session?.user as { accessToken: string })?.accessToken;

//   // Get all levels for select box
//   const { data: getAllBadge } = useGetAllLevel(token);
//   const allLevels = getAllBadge?.data?.data ?? [];

//   // Get all level requests
//   const { data: levelData, isLoading } = useGetAllLevelRequest(token);
//   const users = levelData?.data || [];

//   // Approve mutation
//   const approve = useApproveLevel(token);

//   // Handle badge selection for a user
//   const handleLevelSelect = (userId: string, badgeId: string) => {
//     approve.mutate({
//       userId,
//       badgeId,
//     });
//   };

//   return (
//     <div className="p-6">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Profession</TableHead>
//             <TableHead>Badge</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {isLoading
//             ? Array.from({ length: 5 }).map((_, i) => (
//                 <TableRow key={i}>
//                   <TableCell>
//                     <Skeleton className="h-5 w-32" />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton className="h-5 w-40" />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton className="h-5 w-36" />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton className="h-5 w-24" />
//                   </TableCell>
//                 </TableRow>
//               ))
//             : users.map((user) => (
//                 <TableRow key={user._id}>
//                   <TableCell>
//                     {user.firstName} {user.lastName}
//                   </TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.professionTitle}</TableCell>

//                   {/* ShadCN Select for Badge */}
//                   <TableCell>
//                     <Select
//                       defaultValue={user.level || ""}
//                       onValueChange={(value) => handleLevelSelect(user._id, value)}
//                     >
//                       <SelectTrigger className="w-36">
//                         <SelectValue placeholder="Select Badge" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {allLevels.map((level) => (
//                           <SelectItem key={level._id} value={level._id}>
//                             Badge {level.lavel}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </TableCell>
//                 </TableRow>
//               ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useApproveLevel,
  useGetAllLevel,
  useGetAllLevelRequest,
} from "@/hooks/apiCalling";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LevelApprovePage() {
  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;

  // Get all levels for select box
  const { data: getAllBadge } = useGetAllLevel(token);
  const allLevels = getAllBadge?.data?.data ?? [];

  // Get all level requests
  const { data: levelData, isLoading } = useGetAllLevelRequest(token);
  const users = levelData?.data || [];

  // Approve mutation
  const approve = useApproveLevel(token);

  // State for confirmation modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    userId: string;
    badgeId: string;
  } | null>(null);

  // When a badge is selected, store user and badge and open modal
  const handleLevelSelect = (userId: string, badgeId: string) => {
    setSelectedUser({ userId, badgeId });
    setModalOpen(true);
  };

  // Confirm approval
  const handleApprove = () => {
    if (!selectedUser) return;
    approve.mutate({
      userId: selectedUser.userId,
      badgeId: selectedUser.badgeId,
    });
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Profession</TableHead>
            <TableHead>Request Level</TableHead>
            <TableHead>Badge</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-36" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>
              </TableRow>
            ))
            : users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.professionTitle}</TableCell>
                <TableCell>{user?.level}</TableCell>

                {/* ShadCN Select for Badge */}
                <TableCell>
                  <Select
                    defaultValue={String(user.level) || ""}
                    onValueChange={(value) =>
                      handleLevelSelect(user._id, value)
                    }
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Select Badge" />
                    </SelectTrigger>
                    <SelectContent>
                      {allLevels.map((level) => (
                        <SelectItem key={level._id} value={level._id}>
                          Badge {level.lavel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Confirmation Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Level Request</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to approve this level request?
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleApprove} disabled={approve.isPending}>
              {approve.isPending ? "Approving..." : "Approve"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
