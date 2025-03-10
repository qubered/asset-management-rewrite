"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { UploadButton, UploadDropzone } from "@/lib/uploadthing"
import { Camera } from "lucide-react"
import { useState } from "react"
import { MoonLoader } from "react-spinners"

const formSchema = z.object({
    fullName: z.string().min(2, "Minimum 2 Characters").max(30, "Maximum 30 Characters"),
    email: z.string().email().optional(),
    userImage: z.string().optional(),
})

export default function AccountSettings({ onClose }: { onClose?: () => void }) {
    const [userImageLoading, setUserImageLoading] = useState(false)
    const { data: session } = authClient.useSession()
    const [userImage, setUserImage] = useState(session?.user.image || "")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: session?.user.name,
            email: session?.user.email,
            userImage: session?.user.image || ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await authClient.updateUser({
            name: values.fullName,
            image: userImage
        }, {
            onSuccess: () => {
                toast.success("Profile Updated")
                if (onClose) onClose()
            },
            onError: (ctx) => {
                toast.error(ctx.error.statusText)
            },
        })

    }
    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex gap-4 items-center">
                    <div className="relative group">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={userImage} alt={`${session?.user.name} Profile Image`} />
                            <AvatarFallback>JN</AvatarFallback>
                        </Avatar>
                        {userImageLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full">
                                <MoonLoader size={20} color="white" />
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <UploadButton
                                    endpoint="imageUploader"
                                    onUploadBegin={() => {
                                        setUserImageLoading(true);
                                    }}
                                    onClientUploadComplete={(res) => {
                                        console.log("Files: ", res);
                                        setUserImage(res[0].ufsUrl);
                                        setUserImageLoading(false);
                                    }}
                                    onUploadError={(error: Error) => {
                                        toast.error(`ERROR! ${error.message}`);
                                        setUserImageLoading(false);
                                    }}
                                    content={{
                                        button: () => (
                                            <div className="flex flex-col items-center text-white">
                                                <Camera className="h-6 w-6" />
                                            </div>
                                        ),
                                        allowedContent: () => ""
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder={session?.user.name} {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder={session?.user.email} disabled {...field} />
                            </FormControl>
                            <FormDescription>
                                You cannot update your email.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Update Profile</Button>
            </form>
        </Form>
    )
}