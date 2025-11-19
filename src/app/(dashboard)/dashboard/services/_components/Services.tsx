"use client";

import { AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

import {  useGetAllService, useServiceDelete } from "@/hooks/apiCalling";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import AddServicesModal from "./ServicesModal";
import EditServiceModal from "./EditServicesModal";
import { Service } from "@/types/service";

export default function ServicesTable() {
    const { data: session } = useSession();
    const token = (session?.user as { accessToken: string })?.accessToken;

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);

    const allService = useGetAllService(1, 10);
    const allServices = allService.data?.data;
    const isLoading = allService.isLoading;
   
    const deleteMutation = useServiceDelete(token as string);

    const confirmDelete = (service: Service) => setDeleteTarget(service);
    const handleDelete = () => {
        if (deleteTarget) {
            deleteMutation.mutate(deleteTarget._id, {
                onSuccess: () => setDeleteTarget(null),
            });
        }
    };
    const cancelDelete = () => setDeleteTarget(null);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-teal-900 hover:bg-teal-800 flex text-white gap-2"
                    size="lg"
                >
                    <Plus className="w-4 h-4" />
                    Add New Service
                </Button>
            </div>

            <div className="rounded-lg bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#F9FAFB]">
                            <TableHead className="text-sm font-medium py-[26px] px-[32px]">
                                Service Name                            </TableHead>
                            <TableHead className="text-sm font-medium text-right">
                                Category
                            </TableHead>
                            <TableHead className="text-sm font-medium text-right">
                                Users
                            </TableHead>
                            <TableHead className="text-sm font-medium text-right">
                                Status
                            </TableHead>
                            <TableHead className="text-sm font-medium px-4 text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading &&
                            Array.from({ length: 5 }).map((_, idx) => (
                                <TableRow key={idx} className="border-b border-border">
                                    <TableCell className="px-8 py-6">
                                        <Skeleton className="h-4 w-40" />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Skeleton className="h-4 w-10 ml-auto" />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Skeleton className="h-6 w-20 ml-auto rounded-full" />
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <div className="flex justify-end gap-6">
                                            <Skeleton className="h-4 w-4" />
                                            <Skeleton className="h-4 w-4" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}

                        {/* 👉 ACTUAL DATA */}
                        {!isLoading &&
                            allServices?.map((item) => (
                                <TableRow
                                    key={item._id}
                                    className="border-b border-border hover:bg-muted/30"
                                >
                                    <TableCell className="text-sm py-6 px-8 text-[#424242]">
                                        {item?.serviceName}
                                    </TableCell>

                                    <TableCell className="text-sm text-muted-foreground text-right">
                                        {item?.category || 0}
                                    </TableCell>

                                    <TableCell className="text-sm text-muted-foreground text-right">
                                        {item?.status === "active" ? (
                                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                                                Inactive
                                            </span>
                                        )}
                                    </TableCell>

                                    <TableCell className="py-4 pr-6">
                                        <div className="flex items-center justify-end gap-6">
                                            <button
                                                onClick={() => {
                                                    setSelectedId(item._id);
                                                    setIsEditModalOpen(true);
                                                }}
                                                className="text-green-600 hover:text-green-700"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() => confirmDelete(item)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>

            {/* DELETE CONFIRMATION MODAL */}
            <Dialog open={!!deleteTarget} onOpenChange={cancelDelete}>
                <DialogContent>
                    <AlertDialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                    </AlertDialogHeader>

                    <p className="py-4 text-gray-700">
                        Are you sure you want to delete{" "}
                        <strong>{deleteTarget?.serviceName}</strong>? This action cannot be undone.
                    </p>

                    <AlertDialogFooter className="flex justify-end gap-2">
                        <Button variant="outline" onClick={cancelDelete}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </DialogContent>
            </Dialog>

            {/* ADD MODAL */}
            <AddServicesModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

            {/* EDIT MODAL */}
            <EditServiceModal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                id={selectedId || ""}
            />
        </div>
    );
}
