"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2, Plus, User } from "lucide-react"

type Status = "Approved" | "Pending" | "Blocked"

interface UserData {
    id: string
    name: string
    email: string
    role: string
    joinedDate: string
    status: Status
    lastActive: string
}

const users: UserData[] = [
    {
        id: "1",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        role: "Team Ticket",
        joinedDate: "2023-05-12",
        status: "Approved",
        lastActive: "2025-10-08",
    },
    {
        id: "2",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        role: "Team Ticket",
        joinedDate: "2023-05-12",
        status: "Approved",
        lastActive: "2025-10-08",
    },
    {
        id: "3",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        role: "Team Ticket",
        joinedDate: "2023-05-12",
        status: "Approved",
        lastActive: "2025-10-08",
    },
    {
        id: "4",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        role: "Team Ticket",
        joinedDate: "2023-05-12",
        status: "Pending",
        lastActive: "2025-10-08",
    },
    {
        id: "5",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        role: "Team Ticket",
        joinedDate: "2023-05-12",
        status: "Pending",
        lastActive: "2025-10-08",
    },
    {
        id: "6",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        role: "Team Ticket",
        joinedDate: "2023-05-12",
        status: "Pending",
        lastActive: "2025-10-08",
    },
    {
        id: "7",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        role: "Team Ticket",
        joinedDate: "2023-05-12",
        status: "Blocked",
        lastActive: "2025-10-08",
    },
    {
        id: "8",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        role: "Team Ticket",
        joinedDate: "2023-05-12",
        status: "Blocked",
        lastActive: "2025-10-08",
    },
    {
        id: "9",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        role: "Team Ticket",
        joinedDate: "2023-05-12",
        status: "Blocked",
        lastActive: "2025-10-08",
    },
]

function getStatusVariant(status: Status): "default" | "secondary" | "destructive" {
    switch (status) {
        case "Approved":
            return "default"
        case "Pending":
            return "secondary"
        case "Blocked":
            return "destructive"
    }
}

export function UserManagementTable() {
    return (
        <div className="">
            <div className="flex items-center justify-end mb-6">
                <Button className="bg-[#00383B] hover:bg-emerald-800 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Add new User
                </Button>
            </div>

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
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="bg-muted text-muted-foreground">
                                                    <User className="h-4 w-4" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium text-foreground">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-muted-foreground">{user.email}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-foreground">{user.role}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-foreground">{user.joinedDate}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <Badge variant={getStatusVariant(user.status)} className="font-normal">
                                            {user.status}
                                        </Badge>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-foreground">{user.lastActive}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                                <span className="sr-only">Edit user</span>
                                            </Button>
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
