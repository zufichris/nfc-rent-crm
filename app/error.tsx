"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function ErrorPage({
    error,
    reset,
}: Readonly<{
    error: Error & { digest?: string }
    reset: () => void
}>) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-6 py-16 text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-destructive/10">
                <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Something went wrong!</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
                {error.message || "An unexpected error occurred. We've been notified and are working to fix the issue."}
            </p>
            <div className="flex gap-4">
                <Button onClick={() => reset()} variant="default">
                    Try again
                </Button>
                <Button onClick={() => (window.location.href = "/")} variant="outline">
                    Go back home
                </Button>
            </div>
            {error.digest && <p className="mt-4 text-sm text-muted-foreground">Error ID: {error.digest}</p>}
        </div>
    )
}

