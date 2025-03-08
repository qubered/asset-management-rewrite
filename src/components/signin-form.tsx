"use client";
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { authClient } from "@/lib/auth-client";
import { useState } from "react"
import { MoonLoader } from "react-spinners"
import { AlertBox } from "@/components/alert-helper"

const formScheme = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters"
  })

})



export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme)
  });
  const [ isLoading, setIsLoading ] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    title: "",
    description: "",
    variant: "default" as "default" | "success" | "error",
  })

  async function onSubmit(values: z.infer<typeof formScheme>) {
    setAlert({ show: false, title: "", description: "", variant: "default" })
    const { data, error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
    }, {
        onRequest: (ctx) => {
            setIsLoading(true)
        },
        onSuccess: (ctx) => {
            setIsLoading(false)
            form.reset();
            
        },
        onError: (ctx) => {
            setIsLoading(false)
            setAlert({
              show: true,
              title: "Sign In Failed",
              description: ctx.error.message || "An error occurred during sign up. Please try again.",
              variant: "error",
            })
        }
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <AlertBox show={alert.show} title={alert.title} description={alert.description} variant={alert.variant} />
      <Card>

        <CardHeader>
          <CardTitle>Sign In to your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {... form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@doe.com" {... field} />
                    </FormControl>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="john@doe.com" type="password" {... field} />
                    </FormControl>
                  </FormItem>
                )}
                />
                <Button type="submit" disabled={isLoading}>
                  <div className="flex gap-4 items-center">
                    {isLoading ? (<MoonLoader size={20}/>) : (null)}
                    Sign In
                  </div>

                </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
