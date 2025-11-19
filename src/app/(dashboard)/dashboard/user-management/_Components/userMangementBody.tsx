"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"
import { useGetAllUser } from "@/hooks/apiCalling"

type Status = "active" | "Pending" | "Blocked"


function getStatusVariant(status: Status): "default" | "secondary" | "destructive" {
    switch (status) {
        case "active":
            return "default"
        case "Pending":
            return "secondary"
        case "Blocked":
            return "destructive"
    }
}

export function UserManagementTable() {
    const user = useGetAllUser(1, 10)
    const data = user.data?.data

    return (
        <div className="">

            <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#EDEEF1] ">
                            <tr className=" bg-muted/30 ">
                                <th className="text-left py-6 px-8 text-sm font-medium text-muted-foreground">Name</th>
                                <th className="text-left py-6 px-8 text-sm font-medium text-muted-foreground">Email</th>
                                <th className="text-left py-6 px-8 text-sm font-medium text-muted-foreground">Role</th>
                                <th className="text-left py-6 px-8 text-sm font-medium text-muted-foreground">Joined Date</th>
                                <th className="text-left py-6 px-8 text-sm font-medium text-muted-foreground">Status</th>
                                <th className="text-left py-6 px-8 text-sm font-medium text-muted-foreground">Last Active</th>
                                <th className="text-left py-6 px-8 text-sm font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((user) => (
                                <tr key={user._id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={user.profileImage} alt={user.firstName} />
                                                <AvatarFallback>{user.firstName}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium text-foreground">{user.firstName}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-muted-foreground">{user.email}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-foreground">{user.role}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-foreground">
                                            {new Date(user.createdAt).toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <Badge variant={getStatusVariant(user.status as Status)} className="font-normal">
                                            {user.status}
                                        </Badge>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-foreground">
                                            {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "N/A"}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Delete user</span>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
