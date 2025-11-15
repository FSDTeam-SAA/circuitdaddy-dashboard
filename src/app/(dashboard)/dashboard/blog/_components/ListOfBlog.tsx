'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetAllBlog } from '@/hooks/apiCalling'
import { ReusablePagination } from '@/components/pagination'
import { Skeleton } from "@/components/ui/skeleton"
import ViewBlogModal from '@/components/dashboard/ViewBlogModal'
import { Blog } from '@/types/blog'
import Link from 'next/link'

const ListOfBlog = () => {
    const [activeCategory, setActiveCategory] = useState('All')
    const [activeTab, setActiveTab] = useState('blog-posts')

    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [page, setPage] = useState(1)
    const { data, isLoading, isError } = useGetAllBlog(page, 10)

    const blogPosts = data?.data || []
    const meta = data?.meta

    const totalResults = meta?.total || 0
    const resultsPerPage = meta?.limit || 10
    const totalPages = Math.ceil(totalResults / resultsPerPage)

    const getContentPreview = (html: string, length = 60) => {
        const text = html.replace(/<[^>]+>/g, "");
        return text.length > length ? text.substring(0, length) + "..." : text;
    };

    const openModal = (blog: Blog) => {
        setSelectedBlog(blog);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBlog(null);
    };

    return (
        <div className="w-full min-h-screen p-6">

            {/* Category + Create Button */}
            <div className="flex items-center justify-between mb-8">
                <div className={`flex gap-2 ${activeTab === "faq" ? "hidden" : ""}`}>
                    {["All", "Development", "Design", "Marketing"].map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${activeCategory === category
                                ? "bg-[#B6D4D4] text-[#147575]"
                                : "text-gray-600 bg-[#F4F4F4] hover:text-gray-900"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <Button className="bg-teal-900 hover:bg-teal-800 flex text-white gap-2" size="lg">
                    <Plus className="w-4 h-4" />
                    New Post
                </Button>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="border-b border-gray-200 bg-[#FFFFFF] px-6 py-7 rounded-lg w-full justify-start h-auto">
                    <TabsTrigger
                        value="blog-posts"
                        className="rounded-none border-b-2 data-[state=active]:text-[#147575] font-medium text-[12px] data-[state=active]:border-[#147575] px-0 mr-8"
                    >
                        Blog Posts
                    </TabsTrigger>

                    <TabsTrigger
                        value="faq"
                        className="rounded-none border-b-2 border-transparent font-medium text-[12px] data-[state=active]:text-[#147575] data-[state=active]:border-[#147575] px-0"
                    >
                        FAQ Content
                    </TabsTrigger>
                </TabsList>

                {/* Blog Table */}
                <TabsContent value="blog-posts" className="mt-3">

                    {/* ERROR STATE */}
                    {isError && (
                        <div className="w-full py-10 text-center text-red-600 font-medium text-sm">
                            ❌ Failed to load blogs. Please refresh the page.
                        </div>
                    )}

                    {/* SKELETON LOADER */}
                    {isLoading && (
                        <div className="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {[...Array(5)].map((_, i) => (
                                            <TableHead key={i}>
                                                <Skeleton className="h-4 w-24" />
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {[...Array(5)].map((_, i) => (
                                        <TableRow key={i} className="border-b">
                                            <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-52" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                            <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-10 ml-auto" /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {/* MAIN DATA */}
                    {!isLoading && !isError && (
                        <div className="border-gray-200 rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="font-semibold text-[#424242] py-4 pl-6 text-sm">Title</TableHead>
                                        <TableHead className="font-semibold text-[#424242] py-4 text-sm">Description</TableHead>
                                        <TableHead className="font-semibold text-[#424242] py-4 text-sm">Date</TableHead>
                                        <TableHead className="font-semibold text-[#424242] py-4 text-sm">Status</TableHead>
                                        <TableHead className="font-semibold text-[#424242] py-4 pr-6 text-sm text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {blogPosts.map((post) => (
                                        <TableRow key={post._id} className="border-b hover:bg-gray-50">
                                            <TableCell className="py-7 pl-8 text-sm text-gray-700">{post.title}</TableCell>

                                            <TableCell className="py-4 text-sm text-gray-700">
                                                <div dangerouslySetInnerHTML={{ __html: getContentPreview(post.content, 80) }} />
                                            </TableCell>

                                            <TableCell className="py-4 text-sm text-gray-700">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </TableCell>

                                            <TableCell className="py-4">
                                                <Badge
                                                    className={`text-xs py-1 px-5 rounded-xl font-medium ${post.published
                                                        ? "bg-[#28A7451A] text-[#28A745]"
                                                        : "bg-[#854D0E1A] text-[#854D0E]"
                                                        }`}
                                                >
                                                    {post.published ? "Published" : "Draft"}
                                                </Badge>
                                            </TableCell>

                                            <TableCell className="py-4 pr-6">
                                                <div className="flex items-center justify-end gap-6">
                                                    <button
                                                        onClick={() => openModal(post)}
                                                        className="text-gray-500 hover:text-gray-700"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                  <Link href={`/dashboard/blog/${post._id}`} className="text-gray-500 hover:text-gray-700">
                                                    <button className="text-green-600 hover:text-green-700">
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                  </Link>
                                                    <button className="text-red-600 hover:text-red-700">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="faq" className="mt-6">
                    <div className="text-center py-12 text-gray-500">FAQ Content Tab (Empty)</div>
                </TabsContent>
            </Tabs>

            {!isLoading && !isError && totalPages > 1 && (
                <ReusablePagination
                    currentPage={page}
                    totalPages={totalPages}
                    totalResults={totalResults}
                    resultsPerPage={resultsPerPage}
                    onPageChange={setPage}
                />
            )}
            {selectedBlog && (
                <ViewBlogModal open={isModalOpen} onClose={closeModal} blog={selectedBlog} />
            )}
        </div>
    )
}

export default ListOfBlog
