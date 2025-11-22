import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAddLevel } from "@/hooks/apiCalling";
import { useSession } from "next-auth/react";

interface CreateLevelBadgeModalProps {
    open: boolean;
    onClose: (open: boolean) => void;
}

export default function CreateLevelBadgeModal({
    open,
    onClose,
}: CreateLevelBadgeModalProps) {
    const [level, setLevel] = useState("");
    const [badgeFile, setBadgeFile] = useState<File | null>(null);
    const { data: session } = useSession();
    const token = (session?.user as { accessToken: string })?.accessToken;

    const addLevel = useAddLevel(token);

    const handleSubmit = () => {
        if (level && badgeFile) {
            addLevel.mutate({ level, badge: badgeFile })
            setLevel("");
            setBadgeFile(null);
            onClose(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg rounded-2xl p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Create level & Badge
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-6 mt-4">
                    {/* Level Input */}
                    <div className="grid gap-2">
                        <Label>Level</Label>
                        <Input
                            placeholder="01"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            className="h-11"
                        />
                    </div>

                    {/* Badge File Upload */}
                    <div className="grid gap-2">
                        <Label>Level Badge</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setBadgeFile(e.target.files?.[0] || null)
                            }
                            className="h-11 flex items-center"
                        />
                    </div>

                    {/* Submit Button */}
                    <Button
                        onClick={handleSubmit}
                        className="w-full h-11 bg-[#147575] hover:bg-[#147575]/90 text-white rounded-xl text-sm font-medium"
                    >
                        Create
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
