"use client";
import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { authClient } from "@/lib/auth-client";
import { useState } from "react"
import { MoonLoader } from "react-spinners"
import { AlertBox } from "@/components/alert-helper"
import Link from "next/link";
import { toast } from "sonner"

const formScheme = z.object({
    email: z.string().email(),

})



export default function SignInForm() {
    const form = useForm<z.infer<typeof formScheme>>({
        resolver: zodResolver(formScheme),
        defaultValues: {
            email: "",
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({
        show: false,
        title: "",
        description: "",
        variant: "default" as "default" | "success" | "error",
    })

    async function onSubmit(values: z.infer<typeof formScheme>) {
        setAlert({ show: false, title: "", description: "", variant: "default" })
        const { data, error } = await authClient.forgetPassword({
            email: values.email,
            redirectTo: "/auth/resetpassword"
        }, {
            onRequest: (ctx) => {
                setIsLoading(true)
            },
            onSuccess: (ctx) => {
                setIsLoading(false)
                form.reset();
                setAlert({
                    show: true,
                    title: "Password Reset Sent",
                    description: "Check your email for a link to reset your password",
                    variant: "success",
                })

            },
            onError: (ctx) => {
                setIsLoading(false)
                setAlert({
                    show: true,
                    title: "Password Reset Failed",
                    description: ctx.error.message || "An error occurred during sign up. Please try again.",
                    variant: "error",
                })
            }
        });
    }

    return (
        <div className={cn("flex flex-col gap-6 w-120")}>
            <AlertBox show={alert.show} title={alert.title} description={alert.description} variant={alert.variant} />
            <Card>

                <CardHeader>
                    <CardTitle>Request a password reset</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john@doe.com" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isLoading}>
                                <div className="flex gap-4 items-center">
                                    {isLoading ? (<MoonLoader size={20} />) : (null)}
                                    Send Request
                                </div>

                            </Button>
                        </form>
                        <div className="mt-4 text-center text-sm">
                            Here by accident?{" "}
                            <a href="/auth/signin" className="underline underline-offset-4">
                                Sign In
                            </a>
                        </div>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
