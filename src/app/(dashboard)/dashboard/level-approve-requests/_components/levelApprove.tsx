// "use client";

// import { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   useApproveLevelOnly,
//   useGetAllLevel,
//   useRejectOnly,
// } from "@/hooks/apiCalling";
// import { useSession } from "next-auth/react";

// export default function LevelApprovePage() {
//   const { data: session } = useSession();
//   const token = (session?.user as { accessToken: string })?.accessToken;

//   const { data: levelData, isLoading } = useGetAllLevel(token);
//   const users = levelData?.data || [];

//   // Approve/Reject mutation
//   const approve = useApproveLevelOnly(token);
//   const reject = useRejectOnly(token);

//   // State for confirmation modal
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<{
//     userId: string;
//     action: "approve" | "reject";
//   } | null>(null);

//   // When Accept/Reject is clicked
//   const handleAction = (userId: string, action: "approve" | "reject") => {
//     console.log("Clicked Action - User ID:", userId, "Action:", action); // log here
//     setSelectedUser({ userId, action });
//     setModalOpen(true);
//   };

//   // Confirm action
//   const handleConfirm = () => {
//     if (!selectedUser) return;
//     approve.mutate({
//       userId: selectedUser.userId,
//     });
//     setModalOpen(false);
//   };

//   return (
//     <div className="p-6">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Profession</TableHead>
//             <TableHead>Request Level</TableHead>
//             <TableHead>Action</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {isLoading
//             ? Array.from({ length: 5 }).map((_, i) => (
//               <TableRow key={i}>
//                 <TableCell>
//                   <Skeleton className="h-5 w-32" />
//                 </TableCell>
//                 <TableCell>
//                   <Skeleton className="h-5 w-40" />
//                 </TableCell>
//                 <TableCell>
//                   <Skeleton className="h-5 w-36" />
//                 </TableCell>
//                 <TableCell>
//                   <Skeleton className="h-5 w-24" />
//                 </TableCell>
//                 <TableCell>
//                   <Skeleton className="h-5 w-36" />
//                 </TableCell>
//               </TableRow>
//             ))
//             : users.map((user) => (
//               <TableRow key={user._id}>
//                 <TableCell>
//                   {user.firstName} {user.lastName}
//                 </TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.professionTitle}</TableCell>
//                 <TableCell>{user?.level}</TableCell>
//                 <TableCell className="flex gap-2">
//                   <Button
//                     variant="outline"
//                     onClick={() => handleAction(user._id, "approve")}
//                   >
//                     Accept
//                   </Button>
//                   <Button
//                     variant="destructive"
//                     onClick={() => handleAction(user._id, "reject")}
//                   >
//                     Reject
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//         </TableBody>
//       </Table>

//       {/* Confirmation Modal */}
//       <Dialog open={modalOpen} onOpenChange={setModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>
//               {selectedUser?.action === "approve"
//                 ? "Approve Level Request"
//                 : "Reject Level Request"}
//             </DialogTitle>
//           </DialogHeader>

//           <div className="py-4">
//             <p className="text-sm text-muted-foreground">
//               {selectedUser?.action === "approve"
//                 ? "Are you sure you want to approve this level request?"
//                 : "Are you sure you want to reject this level request?"}
//             </p>
//           </div>

//           <div className="flex justify-end gap-3">
//             <Button variant="outline" onClick={() => setModalOpen(false)}>
//               Cancel
//             </Button>

//             <Button onClick={handleConfirm} disabled={approve.isPending}>
//               {approve.isPending
//                 ? selectedUser?.action === "approve"
//                   ? "Approving..."
//                   : "Rejecting..."
//                 : selectedUser?.action === "approve"
//                   ? "Approve"
//                   : "Reject"}
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
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
  useApproveLevelOnly,
  useGetAllLevel,
  useRejectOnly,
} from "@/hooks/apiCalling";
import { useSession } from "next-auth/react";

export default function LevelApprovePage() {
  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;

  const { data: levelData, isLoading } = useGetAllLevel(token);
  const users = levelData?.data || [];

  // Approve/Reject mutation
  const approve = useApproveLevelOnly(token);
  const reject = useRejectOnly(token);

  // State for confirmation modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    userId: string;
    action: "approve" | "reject";
  } | null>(null);

  // When Accept/Reject is clicked
  const handleAction = (userId: string, action: "approve" | "reject") => {
    console.log("Clicked Action - User ID:", userId, "Action:", action); // log here
    setSelectedUser({ userId, action });
    setModalOpen(true);
  };

  // Confirm action
  const handleConfirm = () => {
    if (!selectedUser) return;

    if (selectedUser.action === "approve") {
      approve.mutate({
        userId: selectedUser.userId,
      });
    } else if (selectedUser.action === "reject") {
      reject.mutate({
        userId: selectedUser.userId,
      });
    }

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
            <TableHead>Action</TableHead>
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
                  <TableCell>
                    <Skeleton className="h-5 w-36" />
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
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleAction(user._id, "approve")}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleAction(user._id, "reject")}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

      {/* Confirmation Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedUser?.action === "approve"
                ? "Approve Level Request"
                : "Reject Level Request"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              {selectedUser?.action === "approve"
                ? "Are you sure you want to approve this level request?"
                : "Are you sure you want to reject this level request?"}
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>

            <Button
              onClick={handleConfirm}
              disabled={approve.isPending || reject.isPending}
            >
              {approve.isPending || reject.isPending
                ? selectedUser?.action === "approve"
                  ? "Approving..."
                  : "Rejecting..."
                : selectedUser?.action === "approve"
                ? "Approve"
                : "Reject"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
