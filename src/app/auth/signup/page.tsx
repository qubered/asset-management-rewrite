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
} from "@/components/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { authClient } from "@/lib/auth-client";
import { useState } from "react"
import { MoonLoader } from "react-spinners"
import { AlertBox } from "@/components/alert-helper"
import { UploadButton } from "@/lib/uploadthing"
import { toast } from "sonner";
import { Camera } from "lucide-react";

const formScheme = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters"
  })

})



export default function SignUpForm() {

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      fullName: "",
      email: "",
      password: ""
    }
  });
  const [userImage, setUserImage] = useState("")
  const [userName, setUserName] = useState("H I")
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    title: "",
    description: "",
    variant: "default" as "default" | "success" | "error",
  })

  async function onSubmit(values: z.infer<typeof formScheme>) {
    setAlert({ show: false, title: "", description: "", variant: "default" })
    const { data, error } = await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.fullName,
      image: userImage,
      callbackURL: "/main"

    }, {
      onRequest: (ctx) => {
        setIsLoading(true)
      },
      onSuccess: (ctx) => {
        setIsLoading(false)
        form.reset();
        setAlert({
          show: true,
          title: "Sign Up Successful",
          description: "Your account has been created successfully. Please check your email to verify your account.",
          variant: "success",
        })
      },
      onError: (ctx) => {
        setIsLoading(false)
        setAlert({
          show: true,
          title: "Sign Up Failed",
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
          <CardTitle>Sign up to make a new account</CardTitle>
          <CardDescription>
            Complete the form to sign up for a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
              <div className="flex gap-4 items-center">
                <div className="relative group w-16 h-16">
                  <Avatar className="h-full w-full">
                    <AvatarImage src={userImage} alt={`New User Profile Image`} />
                    <AvatarFallback>{(userName)?.split(" ").map(([firstLetter]) => firstLetter?.toUpperCase()).join("")}</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        console.log("Files: ", res);
                        setUserImage(res[0].ufsUrl);
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(`ERROR! ${error.message}`);
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
                </div>
                <div>
                  Profile Image
                  <p className="text-sm text-muted-foreground">Choose your profile image, max 4mb</p>
                </div>
              </div>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setUserName(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>This is your account&apos;s display name</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@doe.com" {...field} />
                    </FormControl>
                    <FormDescription>You will need to verify this email to login.</FormDescription>
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
                      <Input placeholder="john@doe.com" type="password" {...field} />
                    </FormControl>
                    <FormDescription>Minimum 8 Characters.</FormDescription>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                <div className="flex gap-4 items-center">
                  {isLoading ? (<MoonLoader size={20} />) : (null)}
                  Sign Up
                </div>

              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
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
