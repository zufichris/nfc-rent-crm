"use client"

import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { IModel } from "@/types/brand"
import { Building } from "lucide-react"
import { formatDate } from "@/utils/format"

export function ModelDetailModal({
    model,
    open,
    onClose,
}: {
    model: IModel
    open: boolean
    onClose: () => void
}) {
    const router = useRouter()

    const handleViewFullDetails = () => {
        router.push(`/fleet-management/models/${model.id}`)
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">{model.name}</DialogTitle>
                    <DialogDescription>Model details and information</DialogDescription>
                </DialogHeader>

                <div className="flex items-center gap-4 mb-6">
                    <div>
                        <h2 className="text-xl font-bold">{model.name}</h2>
                        <div className="text-sm text-muted-foreground">Code: {model.code}</div>
                        {model.brand && (
                            <div className="flex items-center gap-1 text-sm mt-1">
                                <Building className="h-3 w-3" />
                                <span>Brand: {model.brand.name}</span>
                            </div>
                        )}
                    </div>
                </div>

                <Tabs defaultValue="details">
                    <TabsList className="grid grid-cols-2">
                        <TabsTrigger value="details">Model Details</TabsTrigger>
                        <TabsTrigger value="metadata">Metadata</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="space-y-4 mt-4">
                        {model.shortDescription && (
                            <div className="p-4 border rounded-lg">
                                <h3 className="text-sm font-medium mb-2">Description</h3>
                                <p className="text-sm">{model.shortDescription}</p>
                            </div>
                        )}

                        {model.description && (
                            <div className="p-4 border rounded-lg">
                                <h3 className="text-sm font-medium mb-2">Full Description</h3>
                                <p className="text-sm whitespace-pre-line">{model.description}</p>
                            </div>
                        )}

                        <div className="p-4 border rounded-lg">
                            <h3 className="text-sm font-medium mb-2">System Information</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="text-muted-foreground">Created:</span> {formatDate(new Date(model.createdAt))}
                                </div>
                                {model.updatedAt && (
                                    <div>
                                        <span className="text-muted-foreground">Updated:</span> {formatDate(new Date(model.updatedAt))}
                                    </div>
                                )}
                                <div>
                                    <span className="text-muted-foreground">Status:</span> {model.isActive ? "Active" : "Inactive"}
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="metadata" className="space-y-4 mt-4">
                        {model.metadata ? (
                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg">
                                    <h3 className="text-sm font-medium mb-2">Metadata</h3>
                                    <div className="space-y-2">
                                        {model.metadata.title && (
                                            <div>
                                                <span className="text-muted-foreground">Title:</span> {model.metadata.title}
                                            </div>
                                        )}
                                        {model.metadata.description && (
                                            <div>
                                                <span className="text-muted-foreground">Description:</span> {model.metadata.description}
                                            </div>
                                        )}
                                        {model.metadata.tags && model.metadata.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                <span className="text-muted-foreground">Tags:</span>
                                                {model.metadata.tags.map((tag, index) => (
                                                    <Badge key={index} variant="outline">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 border rounded-lg text-center">
                                <p className="text-muted-foreground">No metadata available for this model</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>

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

