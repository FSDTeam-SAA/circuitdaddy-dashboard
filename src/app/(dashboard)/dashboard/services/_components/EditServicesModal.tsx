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
// import { useAddIndustry, useGetSingelIndustry } from "@/hooks/apiCalling"
// import { useSession } from "next-auth/react"
// import { Loader2 } from "lucide-react"

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

//     const addIndustryMutation = useAddIndustry(token, onClose, form.reset)
//     const singelIndustry = useGetSingelIndustry(id);
//     console.log("singelIndustry", singelIndustry.data?.data);

//     const onSubmit = (values: z.infer<typeof formSchema>) => {
//         addIndustryMutation.mutate({
//             name: values.name,
//             status: values.status.toLowerCase(),
//             description: values.description || "",
//         })
//         form.reset()
//     }

//     return (
//         <Dialog open={open} onOpenChange={onClose}>
//             <DialogContent className="max-w-lg p-0 overflow-hidden rounded-xl">
//                 <div className="p-6">
//                     <DialogHeader>
//                         <DialogTitle className="text-xl font-semibold text-[#282828]">Edit New Industry</DialogTitle>
//                     </DialogHeader>

//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">

//                             {/* Industry Name */}
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
//                                 name="description"
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
//                                     Update Service {addIndustryMutation.isPending && <Loader2 className="animate-spin" />}
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
import { useEffect } from "react"

const formSchema = z.object({
    name: z.string().min(1, "Industry name is required"),
    category: z.string(),
    description: z.string().optional(),
})

interface EditIndustryModalProps {
    open: boolean
    id: string
    onClose: () => void
}

export default function EditServiceModal({ open, onClose, id }: EditIndustryModalProps) {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            category: "",
            description: "",
        },
    })

    const { data: session } = useSession();
    const token = (session?.user as { accessToken: string })?.accessToken;

    const updateIndustryMutation = useEditService(token, id, onClose)
    const singelService = useGetSingelService(id)


    useEffect(() => {
        if (singelService.data?.data) {
            const industry = singelService.data.data

            form.reset({
                name: industry.serviceName || "",
                category: industry.category || "",
                description: industry.description || "",
            })
        }
    }, [singelService.data, form])

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        updateIndustryMutation.mutate({
            name: values.name,
            category: values.category,
            description: values.description || "",
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

                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#374151] ">Category</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Healthcare" {...field} />
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

                            <DialogFooter className="pt-4 mt-6 flex items-center justify-end gap-3">
                                <Button variant="outline" type="button" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-[#003D39] text-white hover:bg-[#002a28]">
                                    Update Service
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
