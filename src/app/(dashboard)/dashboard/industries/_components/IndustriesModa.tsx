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
// import { useAddIndustry } from "@/hooks/apiCalling"
// import { useSession } from "next-auth/react"
// import { Loader2 } from "lucide-react"

// const formSchema = z.object({
//     name: z.string().min(1, "Industry name is required"),
//     status: z.string(),
//     discription: z.string().optional(),
// })

// interface AddIndustryModalProps {
//     open: boolean
//     onClose: () => void
// }

// export default function AddIndustryModal({ open, onClose }: AddIndustryModalProps) {
//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             name: "",
//             status: "Active",
//             discription: "",
//         },
//     })
//     const { data: session } = useSession();
//     const token = (session?.user as { accessToken: string })?.accessToken;

//     const addIndustryMutation = useAddIndustry(token, onClose, form.reset)

//     const onSubmit = (values: z.infer<typeof formSchema>) => {
//         addIndustryMutation.mutate({
//             name: values.name,
//             status: values.status.toLowerCase(),
//             discription: values.discription || "",
//         })
//         form.reset()
//     }

//     return (
//         <Dialog open={open} onOpenChange={onClose}>
//             <DialogContent className="max-w-lg p-0 overflow-hidden rounded-xl">
//                 <div className="p-6">
//                     <DialogHeader>
//                         <DialogTitle className="text-xl font-semibold text-[#282828]">Add New Industry</DialogTitle>
//                     </DialogHeader>

//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">

//                             {/* Industry Name */}
//                             <FormField
//                                 control={form.control}
//                                 name="name"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel className="text-[#374151] ">Industry Name</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="MedTech & Healthcare" {...field} />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />

//                             {/* Status */}
//                             <FormField
//                                 control={form.control}
//                                 name="status"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel className="text-[#374151]">Status</FormLabel>
//                                         <Select onValueChange={field.onChange} defaultValue={field.value}>
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

//                             {/* Description */}
//                             <FormField
//                                 control={form.control}
//                                 name="discription"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel className="text-[#374151]" >Description</FormLabel>
//                                         <FormControl>
//                                             <Textarea rows={4} placeholder="Service description and details..." {...field} />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />

//                             <DialogFooter className=" pt-4 mt-6 flex items-center justify-end gap-3">
//                                 <Button variant="outline" type="button" onClick={onClose}>
//                                     Cancel
//                                 </Button>
//                                 <Button type="submit" className="bg-[#003D39] text-white hover:bg-[#002a28]">
//                                     Add Service {addIndustryMutation.isPending && <Loader2 className="animate-spin" />}
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
import { useAddIndustry } from "@/hooks/apiCalling"
import { useSession } from "next-auth/react"
import { Loader2, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const formSchema = z.object({
    name: z.string().min(1, "Industry name is required"),
    status: z.string(),
    discription: z.string().optional(),
    image: z.any().optional(),
})

interface AddIndustryModalProps {
    open: boolean
    onClose: () => void
}

export default function AddIndustryModal({ open, onClose }: AddIndustryModalProps) {
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            status: "Active",
            discription: "",
            image: undefined,
        },
    })

    const { data: session } = useSession();
    const token = (session?.user as { accessToken: string })?.accessToken;

    const addIndustryMutation = useAddIndustry(token, onClose, form.reset)

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const payload = {
            name: values.name,
            status: values.status.toLowerCase(),
            discription: values.discription || "",
            image: values.image
        }
       
        addIndustryMutation.mutate(payload)
        form.reset()
        setPreviewImage(null)
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
            form.setValue("image", file)
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    const removeImage = () => {
        form.setValue("image", undefined)
        setPreviewImage(null)
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-0 overflow-hidden rounded-xl">
                <div className="p-6">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-[#282828]">
                            Add New Industry
                        </DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">

                            {/* Industry Name */}
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                name="discription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#374151]">Description</FormLabel>
                                        <FormControl>
                                            <Textarea rows={4} placeholder="Service description..." {...field} />
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
                                        <FormLabel className="text-[#374151]">Image</FormLabel>

                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </FormControl>

                                        {/* Preview */}
                                        {previewImage && (
                                            <div className="relative w-32 h-32 mt-3">
                                                <Image
                                                    fill
                                                    src={previewImage}
                                                    alt="Preview"
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
                                    </FormItem>
                                )}
                            />

                            {/* Buttons */}
                            <DialogFooter className="pt-4 mt-6 flex items-center justify-end gap-3">
                                <Button variant="outline" type="button" onClick={onClose}>
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    className="bg-[#003D39] text-white hover:bg-[#002a28]"
                                >
                                    Add Industry{" "}
                                    {addIndustryMutation.isPending && <Loader2 className="animate-spin ml-2" />}
                                </Button>
                            </DialogFooter>

                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
