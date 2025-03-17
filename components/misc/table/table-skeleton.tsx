import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { StatCardSkeleton } from "../stat-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const TableSkeleton = () => {
    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
            </div>

            <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <Skeleton className="h-6 w-32 mb-2" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="h-9 w-24" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <div className="p-4">
                            <div className="grid gap-4">
                                <div className="flex justify-between items-center">
                                    <Skeleton className="h-8 w-full max-w-md" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-8 w-24" />
                                        <Skeleton className="h-8 w-24" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {Array(5)
                                        .fill(0)
                                        .map((_, i) => (
                                            <div key={i} className="flex justify-between items-center p-4 border rounded-md">
                                                <div className="flex flex-col">
                                                    <Skeleton className="h-5 w-32 mb-1" />
                                                    <Skeleton className="h-4 w-24" />
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Skeleton className="h-6 w-24" />
                                                    <Skeleton className="h-6 w-16" />
                                                    <Skeleton className="h-8 w-20" />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <Skeleton className="h-5 w-48" />
                        <div className="flex gap-1">
                            {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                    <Skeleton key={i} className="h-8 w-8" />
                                ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
