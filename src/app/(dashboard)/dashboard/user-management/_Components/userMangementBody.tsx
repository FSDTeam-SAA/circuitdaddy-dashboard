"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGetAllUser, useUserStatusUpdate } from "@/hooks/apiCalling"
import { useState, useEffect, useMemo } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSession } from "next-auth/react"
import { ReusablePagination } from "@/components/pagination"

type Status = "active" | "Pending" | "Blocked"

export function UserManagementTable() {
    const { data: session } = useSession()
    const token = (session?.user as { accessToken: string })?.accessToken

    // ---------- PAGINATION STATE ----------
    const [page, setPage] = useState(1)
    const limit = 10

    // ---------- FETCH USERS ----------
    const { data: userData, isLoading, refetch } = useGetAllUser(page, limit)
    const data = useMemo(() => userData?.data || [], [userData])

    const totalResults = userData?.meta?.total || 0
    const totalPages = Math.ceil(totalResults / limit)

    // ---------- STATUS STATE ----------
    const [statusMap, setStatusMap] = useState<Record<string, Status>>({})
    const updateUserStatus = useUserStatusUpdate(token as string)

    // Update statusMap whenever new data is fetched
    useEffect(() => {
        if (data) {
            const map: Record<string, Status> = {}
            data.forEach((user) => {
                map[user._id] = user.status as Status
            })
            setStatusMap(map)
        }
    }, [data])

    const handleStatusChange = (userId: string, newStatus: Status) => {
        setStatusMap((prev) => ({ ...prev, [userId]: newStatus }))
        updateUserStatus.mutate({ status: newStatus, id: userId }, {
            onSuccess: () => refetch() // optional: refetch after update
        })
    }

    return (
        <div className="">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#EDEEF1]">
                            <tr className="bg-muted/30">
                                <th className="text-left py-6 px-8 text-sm font-medium text-muted-foreground">Name</th>
                                <th className="text-left py-6 px-8 text-sm font-medium text-muted-foreground">Email</th>
                                <th className="text-left py-6 px-8 text-sm font-medium text-muted-foreground">Role</th>
                                <th className="text-left py-6 px-8 text-sm font-medium text-muted-foreground">Joined Date</th>
                                <th className="text-left py-6 px-8 text-sm font-medium text-muted-foreground">Status</th>
                                <th className="text-left py-6 px-8 text-sm font-medium text-muted-foreground">Last Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, idx) => (
                                    <tr key={idx} className="border-b border-border last:border-0">
                                        <td className="py-6 px-8">
                                            <div className="h-8 w-32 bg-gray-200 rounded" />
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="h-4 w-24 bg-gray-200 rounded" />
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="h-4 w-20 bg-gray-200 rounded" />
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="h-4 w-24 bg-gray-200 rounded" />
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="h-4 w-20 bg-gray-200 rounded" />
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="h-4 w-24 bg-gray-200 rounded" />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                data.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                                    >
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
                                            <Select
                                                value={statusMap[user._id] || user.status}
                                                onValueChange={(value) =>
                                                    handleStatusChange(user._id, value as Status)
                                                }
                                            >
                                                <SelectTrigger className="w-[120px]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="Pending">Pending</SelectItem>
                                                    <SelectItem value="Blocked">Blocked</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-sm text-foreground">
                                                {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "N/A"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ---------- PAGINATION ---------- */}
                {totalPages > 1 && (
                    <div className="mt-4">
                        <ReusablePagination
                            currentPage={page}
                            totalPages={totalPages}
                            totalResults={totalResults}
                            resultsPerPage={limit}
                            onPageChange={(newPage) => setPage(newPage)}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
