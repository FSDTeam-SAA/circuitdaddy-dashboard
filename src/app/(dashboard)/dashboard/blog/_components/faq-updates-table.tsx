import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useDeleteFaq, useGetAllFaq } from '@/hooks/apiCalling'
import { Faq } from '@/types/faq';
import { Pencil, Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { useState } from 'react';



export default function FAQUpdatesTable() {

    const { data: session } = useSession();
    const token = (session?.user as { accessToken: string })?.accessToken;

    const allFaq = useGetAllFaq(1, 10)
    const faqItems = allFaq.data?.data

    const [deleteTarget, setDeleteTarget] = useState<Faq | null>(null);

    const deleteMutation = useDeleteFaq(token as string);

    const confirmDelete = (faq: Faq) => {
        setDeleteTarget(faq);
    };


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
            <h2 className="text-base font-medium text-foreground mb-6">Recent FAQ Updates</h2>
            <div className=" rounded-lg bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#F9FAFB]">
                            <TableHead className="text-sm font-medium  py-[26px] px-[32px] text-foreground">Question</TableHead>
                            <TableHead className="text-sm font-medium text-foreground">Category</TableHead>
                            <TableHead className="text-sm font-medium text-foreground text-right">
                                Last Updated
                            </TableHead>
                            <TableHead className="text-sm font-medium text-foreground text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {faqItems && faqItems.map((item) => (
                            <TableRow key={item._id} className="border-b border-border hover:bg-muted/30">
                                <TableCell className="text-sm text-muted-foreground">{item?.title}</TableCell>
                                <TableCell className="text-sm text-foreground py-[26px] px-[32px]">
                                    <div
                                        className="line-clamp-3"
                                        dangerouslySetInnerHTML={{
                                            __html: item?.description.length > 100
                                                ? item?.description.slice(0, 100) + "..."
                                                : item?.description,
                                        }}
                                    />
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground text-right">
                                    {new Date(item.createdAt).toLocaleString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </TableCell>
                                <TableCell className="py-4 pr-6">
                                    <div className="flex items-center justify-end gap-6">
                                        <Link href={`/dashboard/faq/${item._id}`} className="text-gray-500 hover:text-gray-700">
                                            <button className="text-green-600 hover:text-green-700">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                        </Link>
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
                        Are you sure you want to delete <strong>{deleteTarget?.title}</strong>? This action cannot be undone.
                    </p>
                    <AlertDialogFooter className="flex justify-end gap-2">
                        <Button variant="outline" onClick={cancelDelete}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </AlertDialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
