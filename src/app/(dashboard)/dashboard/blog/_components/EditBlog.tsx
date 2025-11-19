'use client';

import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useEditBlog, useGetSingelBlog } from '@/hooks/apiCalling';
import { useSession } from 'next-auth/react';

export default function EditBlog({ id }: { id: string }) {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { data: session } = useSession();
    const token = (session?.user as { accessToken: string })?.accessToken;
    const getSingelBlog = useGetSingelBlog(id);
    const editBlogMutation = useEditBlog(token as string, id);

    const { quill, quillRef } = useQuill({
        theme: 'snow',
        modules: {
            toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['link', 'image'],
                [{ list: 'ordered' }, { list: 'bullet' }],
            ],
        },
        placeholder: 'Description here...',
    });


    useEffect(() => {
        const blog = getSingelBlog.data?.data;
        if (!blog || !quill) return;

        setTitle(blog.title);
        setPreviewImage(blog.featuredImage);

        quill.clipboard.dangerouslyPasteHTML(blog.content || "");
    }, [getSingelBlog.data, quill]);

    // image change
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setPreviewImage(URL.createObjectURL(droppedFile));
        }
    };

    const handleDragOver = (e: React.DragEvent) => e.preventDefault();

    const removeFile = () => {
        setFile(null);
        setPreviewImage(null); // clear preview so user can select a new one
    };

    const handleSubmit = () => {
        const description = quill?.root.innerHTML || "";

        editBlogMutation.mutate({
            title: title,
            description: description,
            image: file as File,
        })
    };

    return (
        <div className="w-full mx-auto p-6 rounded-lg">
            {/* Title */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Post Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Write Here"
                    className="w-full px-4 py-3 border border-gray-300 bg-transparent rounded-md"
                />
            </div>

            {/* Description */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <div className="border border-gray-300 rounded-md overflow-hidden h-[400px]">
                    <div ref={quillRef} className="h-full" />
                </div>
            </div>

            {/* Image Upload */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Blog Image</label>

                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 flex justify-center items-center h-56 cursor-pointer hover:border-gray-400 transition"
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    {previewImage ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={previewImage}
                                alt="Preview"
                                width={900}
                                height={900}
                                className="w-full h-full object-cover rounded-md"
                            />
                            <button
                                type="button"
                                onClick={removeFile}
                                className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-1 shadow"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm">Drag & drop or click to upload image</p>
                        </div>
                    )}

                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                    Update Blog {editBlogMutation.isPending && <Loader2 className="animate-spin w-[15px] h-[15px] inline-block ml-2" />}
                </button>
            </div>
        </div>
    );
}
