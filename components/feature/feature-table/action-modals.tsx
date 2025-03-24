"use client"

import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { formatDate } from "@/utils/format"
import { IFeature } from "@/types/feature"
import { cn } from "@/lib/utils"
import { getVariant } from "@/components/theme/variants"

export function FeatureDetailModal({
    feature,
    open,
    onClose,
}: {
    feature: IFeature
    open: boolean
    onClose: () => void
}) {
    const router = useRouter()

    const handleViewFullDetails = () => {
        router.push(`/fleet-management/features/${feature.id}`)
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {feature.name}
                        {feature.isHighlighted && <Star className={cn("h-4 w-4", getVariant('warning', {
                            invert: true
                        }))} />}
                    </DialogTitle>
                    <DialogDescription>Feature details and information</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                            {feature.category}
                        </Badge>
                        {feature.isHighlighted && <Badge variant="warning">Highlighted</Badge>}
                    </div>

                    {feature.shortDescription && (
                        <div className="p-4 border rounded-lg">
                            <h3 className="text-sm font-medium mb-2">Short Description</h3>
                            <p className="text-sm">{feature.shortDescription}</p>
                        </div>
                    )}

                    {feature.description && (
                        <div className="p-4 border rounded-lg">
                            <h3 className="text-sm font-medium mb-2">Full Description</h3>
                            <p className="text-sm whitespace-pre-line">{feature.description}</p>
                        </div>
                    )}

                    <div className="p-4 border rounded-lg">
                        <h3 className="text-sm font-medium mb-2">System Information</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <span className="text-muted-foreground">Code:</span> {feature.code}
                            </div>
                            <div>
                                <span className="text-muted-foreground">Slug:</span> {feature.slug}
                            </div>
                            <div>
                                <span className="text-muted-foreground">Created:</span> {formatDate(new Date(feature.createdAt))}
                            </div>
                            {feature.updatedAt && (
                                <div>
                                    <span className="text-muted-foreground">Updated:</span> {formatDate(new Date(feature.updatedAt))}
                                </div>
                            )}
                            <div>
                                <span className="text-muted-foreground">Status:</span> {feature.isActive ? "Active" : "Inactive"}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mt-4">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Button onClick={handleViewFullDetails}>View Full Details</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

