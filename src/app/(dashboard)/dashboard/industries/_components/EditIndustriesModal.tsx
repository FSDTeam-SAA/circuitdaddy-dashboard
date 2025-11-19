
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
// import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "@/components/ui/select"
// import {  useEditIndustry, useGetSingelIndustry } from "@/hooks/apiCalling"
// import { useSession } from "next-auth/react"
// import { Loader2 } from "lucide-react"
// import { useEffect } from "react"

// const formSchema = z.object({
//     name: z.string().min(1, "Industry name is required"),
//     status: z.string(),
//     description: z.string().optional(),
// })

// interface EditIndustryModalProps {
//     open: boolean
//     id: string
//     onClose: () => void
// }

// export default function EditIndustryModal({ open, onClose, id }: EditIndustryModalProps) {

//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             name: "",
//             status: "Active",
//             description: "",
//         },
//     })

//     const { data: session } = useSession();
//     const token = (session?.user as { accessToken: string })?.accessToken;

//     const updateIndustryMutation = useEditIndustry(token, id, onClose)
//     const singelIndustry = useGetSingelIndustry(id)


//     useEffect(() => {
//         if (singelIndustry.data?.data) {
//             const industry = singelIndustry.data.data

//             form.reset({
//                 name: industry.name || "",
//                 status: industry.status === "active" ? "Active" : "Inactive",
//                 description: industry.discription || "",
//             })
//         }
//     }, [singelIndustry.data, form])

//     const onSubmit = (values: z.infer<typeof formSchema>) => {
//         updateIndustryMutation.mutate({
//             name: values.name,
//             status: values.status.toLowerCase(),
//             discription: values.description || "",
//         })
//     }

//     return (
//         <Dialog open={open} onOpenChange={onClose}>
//             <DialogContent className="max-w-lg p-0 overflow-hidden rounded-xl">
//                 <div className="p-6">
//                     <DialogHeader>
//                         <DialogTitle className="text-xl font-semibold text-[#282828]">
//                             Edit Industry
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
//                                         <FormLabel className="text-[#374151]">Industry Name</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="MedTech & Healthcare" {...field} />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />

//                             {/* 🔹 Status */}
//                             <FormField
//                                 control={form.control}
//                                 name="status"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel className="text-[#374151]">Status</FormLabel>
//                                         <Select onValueChange={field.onChange} value={field.value}>
//                                             <FormControl>
//                                                 <SelectTrigger>
//                                                     <SelectValue placeholder="Select Status" />
//                                                 </SelectTrigger>
//                                             </FormControl>
//                                             <SelectContent>
//                                                 <SelectItem value="Active">Active</SelectItem>
//                                                 <SelectItem value="Inactive">Inactive</SelectItem>
//                                             </SelectContent>
//                                         </Select>
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
//                                     Update Industry
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
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "@/components/ui/select"
import { useEditIndustry, useGetSingelIndustry } from "@/hooks/apiCalling"
import { useSession } from "next-auth/react"
import { Loader2, X } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"

const formSchema = z.object({
    name: z.string().min(1, "Industry name is required"),
    status: z.string(),
    description: z.string().optional(),
    image: z.any().optional(),  // ⬅ added
})

interface EditIndustryModalProps {
    open: boolean
    id: string
    onClose: () => void
}

export default function EditIndustryModal({ open, onClose, id }: EditIndustryModalProps) {

    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [existingImage, setExistingImage] = useState<string | null>(null)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            status: "Active",
            description: "",
            image: undefined,
        },
    })

    const { data: session } = useSession()
    const token = (session?.user as { accessToken: string })?.accessToken

    const updateIndustryMutation = useEditIndustry(token, id, onClose)
    const singelIndustry = useGetSingelIndustry(id)

    // Load existing industry data
    useEffect(() => {
        if (singelIndustry.data?.data) {
            const industry = singelIndustry.data.data

            form.reset({
                name: industry.name || "",
                status: industry.status === "active" ? "Active" : "Inactive",
                description: industry.discription || "",
            })

            setExistingImage(industry?.image || null)
        }
    }, [singelIndustry.data, form])

    // When user selects a new image
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            form.setValue("image", file)
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    const removeImage = () => {
        form.setValue("image", undefined)
        setPreviewImage(null)
    }

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const payload = {
            name: values.name,
            status: values.status.toLowerCase(),
            discription: values.description || "",
            image: values.image
        }

        updateIndustryMutation.mutate(payload)
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-0 overflow-hidden rounded-xl">
                <div className="p-6">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-[#282828]">
                            Edit Industry
                        </DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">

                            {/* Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#374151]">Industry Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="MedTech & Healthcare" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Status */}
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#374151]">Status</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
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

                            {/* Image Upload */}
                            <FormField
                                control={form.control}
                                name="image"
                                render={() => (
                                    <FormItem>
                                        <FormLabel className="text-[#374151]">Upload Image</FormLabel>
                                        <FormControl>
                                            <Input type="file" accept="image/*" onChange={handleImageChange} />
                                        </FormControl>

                                        {/* Show preview (when user selects image) */}
                                        {previewImage && (
                                            <div className="relative w-32 h-32 mt-3">
                                                <Image
                                                    src={previewImage}
                                                    alt="Preview"
                                                    width={500}
                                                    height={700}
                                                    className="w-full h-full object-cover rounded-md border"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        )}

                                        {/* Show existing image (from server) */}
                                        {!previewImage && existingImage && (
                                            <div className="w-32 h-32 mt-3">
                                                <Image
                                                    src={existingImage}
                                                    alt="Existing"
                                                    width={500}
                                                    height={700}
                                                    className="w-full h-full object-cover rounded-md border"
                                                />
                                            </div>
                                        )}
                                    </FormItem>
                                )}
                            />

                            <DialogFooter className="pt-4 mt-6 flex items-center justify-end gap-3">
                                <Button variant="outline" type="button" onClick={onClose}>
                                    Cancel
                                </Button>

                                <Button type="submit" className="bg-[#003D39] text-white hover:bg-[#002a28]">
                                    Update Industry
                                    {updateIndustryMutation.isPending && (
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
