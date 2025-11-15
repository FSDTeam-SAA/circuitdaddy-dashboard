
'use client'

import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { useAddFaq } from '@/hooks/apiCalling'
import { useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'

// Dynamically import React Quill for Next.js SSR compatibility
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface FormData {
    title: string
    description: string
}

export default function AddFaqForm() {
    const { register, handleSubmit, control, reset } = useForm<FormData>()
    const { data: session } = useSession();
    const token = (session?.user as { accessToken: string })?.accessToken;
    const addFaqMutation = useAddFaq(token as string);

    const onSubmit = (data: FormData) => {
        addFaqMutation.mutate({
            title: data.title,
            description: data.description,
        })

        reset()
    }

    const handleCancel = () => {
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-[16px] font-medium text-[#343A40] mb-2">
                    Title
                </label>
                <Input
                    id="title"
                    className='py-6 px-4 border border-gray-300 bg-transparent rounded-md focus:outline-none text-gray-900 placeholder-gray-400'
                    placeholder="Write Here"
                    {...register('title', { required: true })}
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-[#343A40] mb-2">
                    Description
                </label>
                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                        <ReactQuill
                            theme="snow"
                            {...field}
                            onChange={(value) => field.onChange(value)}
                        />
                    )}
                />
            </div>

            <div className="flex justify-end gap-2">
                <Button className='bg-transparent border border-[#F2415A] text-[#F2415A]' type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button className="px-10 py-2 bg-[#00383B] flex gap-1  text-white rounded-md hover:bg-teal-700 transition-colors" type="submit">Add {addFaqMutation.isPending ? <Loader2 className="animate-spin" /> : null}</Button>
            </div>
        </form>
    )
}
