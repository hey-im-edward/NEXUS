"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function LogoutButton() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogout = async () => {
        try {
            setIsLoading(true)
            const supabase = createClient()

            const { error } = await supabase.auth.signOut()

            if (error) {
                throw error
            }

            toast({
                title: "Logged out",
                description: "You have been successfully logged out.",
            })

            router.push("/login")
            router.refresh()
        } catch (error: any) {
            console.error("Logout error:", error)
            toast({
                variant: "destructive",
                title: "Logout Failed",
                description: error.message || "Failed to log out. Please try again.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            variant="outline"
            onClick={handleLogout}
            disabled={isLoading}
        >
            {isLoading ? "Logging out..." : "Logout"}
        </Button>
    )
}
