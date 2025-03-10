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
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    currentPassword: z.string().min(8, "Your password should be atleast 8 characters"),
    newPassword: z.string().min(8, "New password needs to be atleast 8 characters"),
    revokeSessions: z.boolean(),
})

export default function PasswordSettings({ onClose }: { onClose?: () => void }) {
    const router = useRouter()
    const { data: session } = authClient.useSession()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            revokeSessions: true,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await authClient.changePassword({
            newPassword: values.newPassword,
            currentPassword: values.currentPassword,
            revokeOtherSessions: values.revokeSessions,
        }, {
            onSuccess: () => {
                toast.success("Password Changed")
                if (values.revokeSessions) {
                    setTimeout(async () => {
                        await authClient.signOut();
                        router.refresh()
                    }, 300)
                }



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
                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Your current password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Your New Password" type="password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Minimum 8 Characters
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="revokeSessions"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Log out everywhere
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                <Button type="submit">Change Password</Button>
            </form>
        </Form>
    )
}