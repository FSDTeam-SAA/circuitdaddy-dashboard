

'use client';

import React, { useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useAddBlog } from '@/hooks/apiCalling';
import { useSession } from 'next-auth/react';

export default function AddBlog() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;

  const addBlogMutation = useAddBlog(token);

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = () => {
    setFile(null);
  };


  const handleSubmit = () => {
    const description = quill?.root.innerHTML || '';


    addBlogMutation.mutate({
      title: title,
      description: description,
      image: file as File,
    });


  };

  return (
    <div className="w-full mx-auto p-6 rounded-lg">
      {/* Post Title */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Post Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write Here"
          className="w-full px-4 py-3 border border-gray-300 bg-transparent rounded-md focus:outline-none text-gray-900 placeholder-gray-400"
        />
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <div className="border border-gray-300 rounded-md overflow-hidden h-[400px]">
          <div ref={quillRef} className="h-full" />
        </div>
      </div>

      {/* Image Upload (Single Image Preview Inside Field) */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Blog Image
        </label>

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

          {/* Show image preview or upload prompt */}
          {file ? (
            <div className="relative w-full h-full flex justify-center items-center">
              <Image
                src={URL.createObjectURL(file)}
                alt="Preview"
                width={500}
                height={700}
                className="w-full h-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={removeFile}
                className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 rounded-full p-1 shadow-md transition"
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
      <div className="flex justify-end gap-3">
        
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2 flex items-center justify-center bg-teal-600  gap-1 text-white rounded-md hover:bg-teal-700 transition-colors"
        >
          Add {addBlogMutation.isPending && <Loader2 className="animate-spin w-[10px] h-[10px] "/>}
        </button>
      </div>
    </div>
  );
}
