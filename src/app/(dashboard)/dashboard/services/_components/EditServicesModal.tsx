
// "use client"

// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogFooter,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
// } from "@/components/ui/form"
// import { useEditService, useGetSingelService } from "@/hooks/apiCalling"
// import { useSession } from "next-auth/react"
// import { Loader2 } from "lucide-react"
// import { useEffect } from "react"

// const formSchema = z.object({
//     name: z.string().min(1, "Industry name is required"),
//     category: z.string(),
//     description: z.string().optional(),
// })

// interface EditIndustryModalProps {
//     open: boolean
//     id: string
//     onClose: () => void
// }

// export default function EditServiceModal({ open, onClose, id }: EditIndustryModalProps) {

//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             name: "",
//             category: "",
//             description: "",
//         },
//     })

//     const { data: session } = useSession();
//     const token = (session?.user as { accessToken: string })?.accessToken;

//     const updateIndustryMutation = useEditService(token, id, onClose)
//     const singelService = useGetSingelService(id)


//     useEffect(() => {
//         if (singelService.data?.data) {
//             const industry = singelService.data.data

//             form.reset({
//                 name: industry.serviceName || "",
//                 category: industry.category || "",
//                 description: industry.description || "",
//             })
//         }
//     }, [singelService.data, form])

//     const onSubmit = (values: z.infer<typeof formSchema>) => {
//         updateIndustryMutation.mutate({
//             name: values.name,
//             category: values.category,
//             description: values.description || "",
//         })
//     }

//     return (
//         <Dialog open={open} onOpenChange={onClose}>
//             <DialogContent className="max-w-lg p-0 overflow-hidden rounded-xl">
//                 <div className="p-6">
//                     <DialogHeader>
//                         <DialogTitle className="text-xl font-semibold text-[#282828]">
//                           Edit Service
//                         </DialogTitle>
//                     </DialogHeader>

//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">

//                             {/* 🔹 Name */}
//                             <FormField
//                                 control={form.control}
//                                 name="name"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel className="text-[#374151]">Service Name</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="MedTech & Healthcare" {...field} />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />

//                             <FormField
//                                 control={form.control}
//                                 name="category"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel className="text-[#374151] ">Category</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="Healthcare" {...field} />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />

//                             {/* 🔹 Description */}
//                             <FormField
//                                 control={form.control}
//                                 name="description"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel className="text-[#374151]">Description</FormLabel>
//                                         <FormControl>
//                                             <Textarea rows={4} placeholder="Service description and details..." {...field} />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />

//                             <DialogFooter className="pt-4 mt-6 flex items-center justify-end gap-3">
//                                 <Button variant="outline" type="button" onClick={onClose}>
//                                     Cancel
//                                 </Button>
//                                 <Button type="submit" className="bg-[#003D39] text-white hover:bg-[#002a28]">
//                                     Update Service
//                                     {updateIndustryMutation.isPending && (
//                                         <Loader2 className="animate-spin ml-2" size={18} />
//                                     )}
//                                 </Button>
//                             </DialogFooter>
//                         </form>
//                     </Form>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     )
// }


"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { useEditService, useGetSingelService } from "@/hooks/apiCalling"
import { useSession } from "next-auth/react"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"

const formSchema = z.object({
    name: z.string().min(1, "Service name is required"),
    description: z.string().optional(),
    image: z.any().optional(), // Accept file
})

interface EditServiceModalProps {
    open: boolean
    id: string
    onClose: () => void
}

export default function EditServiceModal({ open, onClose, id }: EditServiceModalProps) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            image: null,
        },
    })

    const { data: session } = useSession();
    const token = (session?.user as { accessToken: string })?.accessToken;

    const updateServiceMutation = useEditService(token, id, onClose)
    const singelService = useGetSingelService(id)

    const [preview, setPreview] = useState<string>("")

    useEffect(() => {
        if (singelService.data?.data) {
            const service = singelService.data.data

            form.reset({
                name: service.serviceName || "",
                description: service.description || "",
                image: null,
            })

            setPreview(service.image || "") // show existing image
        }
    }, [singelService.data, form])

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        updateServiceMutation.mutate({
            name: values.name,
            description: values.description || "",
            image: values.image[0],
        })
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-0 overflow-hidden rounded-xl">
                <div className="p-6">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-[#282828]">
                            Edit Service
                        </DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">

                            {/* 🔹 Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#374151]">Service Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="MedTech & Healthcare" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* 🔹 Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#374151]">Description</FormLabel>
                                        <FormControl>
                                            <Textarea rows={4} placeholder="Service description and details..." {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* 🔹 Image */}
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#374151]">Service Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    field.onChange(e.target.files)
                                                    if (e.target.files && e.target.files[0]) {
                                                        setPreview(URL.createObjectURL(e.target.files[0]))
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        {preview && (
                                            <Image
                                                width={900}
                                                height={900}
                                                src={preview}
                                                alt="Preview"
                                                className="mt-2 h-24 w-24 object-cover rounded-md"
                                            />
                                        )}
                                    </FormItem>
                                )}
                            />

                            <DialogFooter className="pt-4 mt-6 flex items-center justify-end gap-3">
                                <Button variant="outline" type="button" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-[#003D39] text-white hover:bg-[#002a28]">
                                    Update Service
                                    {updateServiceMutation.isPending && (
                                        <Loader2 className="animate-spin ml-2" size={18} />
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
