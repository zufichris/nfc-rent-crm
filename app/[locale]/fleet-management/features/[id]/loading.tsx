import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function FeatureDetailsLoading() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-6 w-64 mb-6" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-32 mb-2" />
                            <Skeleton className="h-4 w-48" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-32" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {Array(3)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                                            <Skeleton className="h-5 w-24" />
                                            <Skeleton className="h-5 w-12" />
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Array(3)
                            .fill(0)
                            .map((_, i) => (
                                <Skeleton key={i} className="h-64 w-full" />
                            ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

