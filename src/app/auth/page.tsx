"use client";
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

async function handleSignOut() {
    await authClient.signOut();
}

export default function AuthPage() {
    const { data: session } = authClient.useSession()
    return (
        <>
            <h1 className="text-2xl font-bold">{session?.user.name}</h1>
            <p>{session?.user.email}</p>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </>
    )

}