"use client"
import { authClient } from "@/lib/auth-client";

async function handleSignOut() {
    return await authClient.signOut()
}

export default function SignOut() {
    const { data: session } = authClient.useSession() 
    handleSignOut()
    if (!session) {
       return(
        <div>Bye!</div>
       ) 
    }
}