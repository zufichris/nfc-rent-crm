import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const TableSkeleton = () => {
    return (
        <div className="space-y-4 card p-4">
            <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-32 backdrop-blur-lg animate-pulse" />
                <div className="flex space-x-2">
                    <Skeleton className="h-10 w-32 backdrop-blur-lg animate-pulse" />
                    <Skeleton className="h-10 w-32 backdrop-blur-lg animate-pulse" />
                    <Skeleton className="h-10 w-40 backdrop-blur-lg animate-pulse" />
                </div>
            </div>

            <div className="space-y-4">
                {/* Filters skeleton */}
                <div>
                    <Skeleton className="h-8 w-32 mb-4 backdrop-blur-lg animate-pulse" />
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, index) => (
                            <Skeleton
                                key={index + 1}
                                className="h-10 w-full backdrop-blur-lg animate-pulse"
                            />
                        ))}
                    </div>
                </div>

                {/* Table skeleton */}
                <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-y-2">
                        <thead>
                            <tr>
                                {[...Array(8)].map((_, index) => (
                                    <th key={index + 1} className="px-4 py-2">
                                        <Skeleton className="h-4 w-full backdrop-blur-lg animate-pulse" />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, rowIndex) => (
                                <tr key={rowIndex + 1} className="border-b border-slate-700">
                                    <td className="px-4 py-4">
                                        <Skeleton className="h-4 w-4 backdrop-blur-lg animate-pulse" />
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center space-x-3">
                                            <Skeleton className="h-10 w-10 rounded-full backdrop-blur-lg animate-pulse" />
                                            <div>
                                                <Skeleton className="h-4 w-32 mb-2 backdrop-blur-lg animate-pulse" />
                                                <Skeleton className="h-3 w-40 backdrop-blur-lg animate-pulse" />
                                            </div>
                                        </div>
                                    </td>
                                    {[...Array(5)].map((_, cellIndex) => (
                                        <td key={cellIndex + 1} className="px-4 py-4">
                                            <Skeleton className="h-6 w-20 backdrop-blur-lg animate-pulse" />
                                        </td>
                                    ))}
                                    <td className="px-4 py-4">
                                        <div className="flex items-center space-x-2">
                                            <Skeleton className="h-8 w-8 rounded-md backdrop-blur-lg animate-pulse" />
                                            <Skeleton className="h-8 w-8 rounded-md backdrop-blur-lg animate-pulse" />
                                            <Skeleton className="h-8 w-8 rounded-md backdrop-blur-lg animate-pulse" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination skeleton */}
                <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-48 backdrop-blur-lg animate-pulse" />
                    <div className="flex space-x-2">
                        {[...Array(5)].map((_, index) => (
                            <Skeleton
                                key={index + 1}
                                className="h-8 w-8 backdrop-blur-lg animate-pulse"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
