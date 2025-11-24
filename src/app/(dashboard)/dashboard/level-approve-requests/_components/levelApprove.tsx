"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useApproveLevel, useGetAllLevelRequest } from "@/hooks/apiCalling";
import { useSession } from "next-auth/react";

export default function LevelApprovePage() {
    const { data: session } = useSession();
    const token = (session?.user as { accessToken: string })?.accessToken;

    const [open, setOpen] = useState(false);
    const { data: levelData, isLoading } = useGetAllLevelRequest(token);
    const approve = useApproveLevel(token, setOpen);

    const users = levelData?.data || [];

    const [selectedUser, setSelectedUser] = useState<{ userId: string; badgeId: string } | null>(null);

    const handleCheckboxClick = (userId: string, badgeId: string) => {
        setSelectedUser({ userId, badgeId });
        setOpen(true);
    };

    const handleApprove = () => {
        if (!selectedUser) return;

        approve.mutate({
            userId: selectedUser.userId,
            badgeId: selectedUser.badgeId,
        });
    };

    return (
        <div className="p-6">

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Approve</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Profession</TableHead>
                        <TableHead>Level</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isLoading ? (
                        // 🔥 Skeleton rows
                        Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-5 w-5 rounded-sm" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-36" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-10" /></TableCell>
                            </TableRow>
                        ))
                    ) : (
                        users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>
                                    <Checkbox
                                        onCheckedChange={() =>
                                            handleCheckboxClick(user._id, user.badge)
                                        }
                                    />
                                </TableCell>

                                <TableCell>{user.firstName} {user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.professionTitle}</TableCell>
                                <TableCell>{user.level}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {/* Approve Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
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
                        <Button variant="outline" onClick={() => setOpen(false)}>
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
