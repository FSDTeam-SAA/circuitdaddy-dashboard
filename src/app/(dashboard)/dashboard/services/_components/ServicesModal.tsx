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
import { useAddCategory } from "@/hooks/apiCalling"
import { useSession } from "next-auth/react"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(1, "Industry name is required"),
    category: z.string(),
    discription: z.string().optional(),
})

interface AddIndustryModalProps {
    open: boolean
    onClose: () => void
}

export default function AddServicesModal({ open, onClose }: AddIndustryModalProps) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            category: "",
            discription: "",
        },
    })
    const { data: session } = useSession();
    const token = (session?.user as { accessToken: string })?.accessToken;

    const addIndustryMutation = useAddCategory(token, onClose, form.reset)

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        addIndustryMutation.mutate({
            name: values.name,
            category: values.category,
            discription: values.discription || "",
        })
        form.reset()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-0 overflow-hidden rounded-xl">
                <div className="p-6">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-[#282828]">Add New Service</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">

                            {/* Industry Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#374151] ">Service Name</FormLabel>
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


                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="discription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#374151]" >Description</FormLabel>
                                        <FormControl>
                                            <Textarea rows={4} placeholder="Service description and details..." {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <DialogFooter className=" pt-4 mt-6 flex items-center justify-end gap-3">
                                <Button variant="outline" type="button" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-[#003D39] text-white hover:bg-[#002a28]">
                                    Add Service {addIndustryMutation.isPending && <Loader2 className="animate-spin" />}
                                </Button>
                            </DialogFooter>

                        </form>
                    </Form>
                </div>


            </DialogContent>
        </Dialog>
    )
}
