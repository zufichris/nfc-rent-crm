import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { PageShell } from "@/components/layout/page-shell"

export default function EditCarLoading() {
    return (
            <Card className="container py-10">
            <CardHeader className="mb-8">
                <CardTitle className="text-3xl font-bold tracking-tight">Edit Brand</CardTitle>
                <CardDescription className="text-muted-foreground">
                    Update brand information with AI-powered suggestions and multi-language support.
                </CardDescription>
            </CardHeader>

            <div className="max-w-4xl mx-auto py-8">
                <div className="space-y-12">
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-5 w-24" />
                        </div>

                        <Progress value={20} className="h-2" />

                        <div className="flex gap-3 overflow-x-auto py-2">
                            {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                    <Skeleton key={i + 1} className="h-9 w-32 rounded-full" />
                                ))}
                        </div>
                    </div>

                    <Card>
                        <CardContent className="pt-6 space-y-8">
                            <div className="grid gap-6 sm:grid-cols-2">
                                {Array(6)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div key={i + 1} className="space-y-2">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-10 w-full" />
                                        </div>
                                    ))}
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                {Array(4)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div key={i} className="space-y-2">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-10 w-full" />
                                        </div>
                                    ))}
                            </div>

                            <Skeleton className="h-16 w-full rounded-lg" />
                        </CardContent>
                    </Card>

                    <div className="flex flex-col sm:flex-row justify-between gap-6">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>
            </div>
        </Card>
    )
}

