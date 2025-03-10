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
import { useState, useEffect } from "react"
import { MoonLoader } from "react-spinners"
import { AlertBox } from "@/components/alert-helper"
import { useSearchParams } from "next/navigation"
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Suspense } from "react"


const formScheme = z.object({
    password: z.string().min(8),
})


function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const [token, setToken] = useState<string | null>(null);
    const form = useForm<z.infer<typeof formScheme>>({
        resolver: zodResolver(formScheme),
        defaultValues: {
            password: "",
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({
        show: false,
        title: "",
        description: "",
        variant: "default" as "default" | "success" | "error",
    });

    useEffect(() => {
        setToken(searchParams.get("token"));
    }, [searchParams]);

    async function onSubmit(values: z.infer<typeof formScheme>) {
        setAlert({ show: false, title: "", description: "", variant: "default" })
        const { data, error } = await authClient.resetPassword({
            newPassword: values.password,
            token: token || ""
        }, {
            onRequest: (ctx) => {
                setIsLoading(true)
            },
            onSuccess: (ctx) => {
                setIsLoading(false)
                form.reset();
                setAlert({
                    show: true,
                    title: "Password Reset Success",
                    description: "Please login using your new password",
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


    if (!token) {
        return (
            <div className="flex flex-col items-center gap-8">
                <AlertBox
                    show={true}
                    title="Error"
                    description="Something is not quite right... Did you follow the exact link from the email?"
                    variant="error"
                />
                <Link href="/auth/signin"><Button>Return to Sign In</Button></Link>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col gap-6 w-120")}>
            <AlertBox show={alert.show} title={alert.title} description={alert.description} variant={alert.variant} />
            <Card>

                <CardHeader>
                    <CardTitle>Reset Your Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Minimum 8 Characters" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isLoading}>
                                <div className="flex gap-4 items-center">
                                    {isLoading ? (<MoonLoader size={20} />) : (null)}
                                    Reset Password
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

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center">
                <MoonLoader />
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    )
}
