"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function ErrorPage(props: Readonly<{
    error?: Partial<Error & { digest: string, status: number }>,
    reset?: () => void
}>) {
    useEffect(() => {
        console.error(props.error)
    }, [props.error])

    return (
        <div className="flex bg-card h-[73vh]  card flex-col items-center justify-center  text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-destructive/10">
                <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            {props?.error?.status && <h2 className="mb-2 font-extrabold text-5xl  text-destructive">{props?.error?.status}</h2>}

            <h2 className="text-3xl font-bold tracking-tight mb-2">Something went wrong!</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
                {props?.error?.message ?? "An unexpected error occurred. We've been notified and are working to fix the issue."}
            </p>
            <div className="flex gap-4">
                <Button onClick={() => {
                    if (props.reset) {
                        props.reset()
                    }
                }} variant="default">
                    Try again
                </Button>
                <Button onClick={() => (window.location.href = "/")} variant="outline">
                    Go back home
                </Button>
            </div>
        </div>
    )
}

