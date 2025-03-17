import React from "react";
import { IFeature } from "@/types/features";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Tag } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/utils/format";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { getVariant } from "../theme/variants";

export const FeaturePage = ({ feature }: Readonly<{ feature: IFeature }>) => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 card p-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{feature.name}</h1>
                    {feature.isHighlighted && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Star
                                        className={cn(
                                            "h-5 w-5",
                                            getVariant("warning", {
                                                invert: true,
                                            })
                                        )}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Highlighted Feature</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={`/fleet-management/features/${feature.id}#edit`}>
                                    <Button variant="outline">Edit Feature</Button>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit this feature's details</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button>View Cars</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>View all cars with this feature</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                <div className="md:col-span-2">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Feature Information</CardTitle>
                            <CardDescription>Details about the feature</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="outline" className="capitalize">
                                        {feature.category}
                                    </Badge>
                                    {feature.isHighlighted && (
                                        <Badge variant="warning">Highlighted</Badge>
                                    )}
                                </div>

                                {feature.shortDescription && (
                                    <div>
                                        <h3 className="text-sm font-medium mb-2">
                                            Short Description
                                        </h3>
                                        <p className="text-sm">{feature.shortDescription}</p>
                                    </div>
                                )}

                                {feature.description && (
                                    <div>
                                        <h3 className="text-sm font-medium mb-2">
                                            Full Description
                                        </h3>
                                        <p className="text-sm whitespace-pre-line">
                                            {feature.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Feature Stats</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Tag className="h-5 w-5 text-muted-foreground" />
                                        <span>Cars</span>
                                    </div>
                                    <span className="font-bold">24</span>
                                </div>

                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Star className="h-5 w-5 text-muted-foreground" />
                                        <span>Highlighted</span>
                                    </div>
                                    <Badge
                                        variant={feature.isHighlighted ? "success" : "secondary"}
                                    >
                                        {feature.isHighlighted ? "Yes" : "No"}
                                    </Badge>
                                </div>

                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Tag className="h-5 w-5 text-muted-foreground" />
                                        <span>Status</span>
                                    </div>
                                    <Badge variant={feature.isActive ? "success" : "destructive"}>
                                        {feature.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>System Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Code</span>
                            <span>{feature.code}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Slug</span>
                            <span>{feature.slug}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Created</span>
                            <span>{formatDate(new Date(feature.createdAt))}</span>
                        </div>
                        {feature.updatedAt && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Updated</span>
                                <span>{formatDate(new Date(feature.updatedAt))}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">ID</span>
                            <span className="font-mono text-xs">{feature.id}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
