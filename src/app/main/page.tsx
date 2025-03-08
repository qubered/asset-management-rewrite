"use client"
import { authClient } from "@/lib/auth-client";

export default function MainPage() {
    const { data: session } = authClient.useSession() 
    return (
        <div>Hello {session?.user.name}</div>
    )
}