import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function CarDetailsLoading() {
    return (
        <>
            <div className="mb-6">
                <Button variant="outline" size="sm" asChild>
                    <Link href="/fleet-management/vehicles">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Cars
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-3 space-y-6">
                    <Card className="w-full">
                        <CardHeader className="relative pb-0">
                            <div className="flex flex-col sm:flex-row justify-between items-start">
                                <div className="space-y-2">
                                    <Skeleton className="h-8 w-64" />
                                    <Skeleton className="h-4 w-96 max-w-full" />
                                </div>
                                <div className="flex gap-2 mt-2 sm:mt-0">
                                    <Skeleton className="h-9 w-20" />
                                    <Skeleton className="h-9 w-24" />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-4">
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-6 w-28" />
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                {Array(4)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Skeleton key={i + 1} className="h-20 w-full" />
                                    ))}
                            </div>

                            <Tabs defaultValue="details" className="mt-6">
                                <TabsList className="grid grid-cols-1 sm:grid-cols-3 mb-6">
                                    <TabsTrigger value="details">Details</TabsTrigger>
                                    <TabsTrigger value="specs">Specifications</TabsTrigger>
                                    <TabsTrigger value="features">Features</TabsTrigger>
                                </TabsList>

                                <TabsContent value="details" className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {Array(6)
                                            .fill(0)
                                            .map((_, i) => (
                                                <div key={i + 1}>
                                                    <Skeleton className="h-4 w-32 mb-2" />
                                                    <Skeleton className="h-5 w-full" />
                                                </div>
                                            ))}
                                    </div>

                                    <Separator className="my-4" />

                                    <div>
                                        <Skeleton className="h-4 w-32 mb-2" />
                                        <Skeleton className="h-20 w-full" />
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <Skeleton className="h-6 w-24" />
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {Array(3)
                                .fill(0)
                                .map((_, i) => (
                                    <Skeleton key={i + 1} className="h-24 w-full" />
                                ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-1">
                    <CardHeader>
                        <Skeleton className="h-6 w-24" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {Array(4)
                            .fill(0)
                            .map((_, i) => (
                                <div key={i + 1} className="flex items-center justify-between">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            ))}
                    </CardContent>
                </Card>

                <Card className="space-y-6 md:col-span-3">
                    <CardHeader>
                        <Skeleton className="h-6 w-24" />
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {Array(4)
                                .fill(0)
                                .map((_, i) => (
                                    <Skeleton key={i + 1} className="aspect-square rounded-md" />
                                ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}