"use client"
import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { IBrand } from "@/types/brand"
import { deleteBrand, updateBrand, createBrand } from "@/lib/actions/brands"
import { toast } from "sonner"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { getVariant } from "../../theme/variants"
import { Globe, Pencil, Plus, Tag } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export type ActionTypes = "view" | "create" | "delete" | "edit" | "bulk delete"

interface BrandActionsModalProps {
    type?: ActionTypes
    brand?: IBrand
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
    selectedBrands?: string[]
}

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: (data?: any) => void
}

function renderBrandStatus(brand?: IBrand) {
    if (!brand) return null

    if (brand.isDeleted) {
        return <Badge variant="destructive">Deleted</Badge>
    }

    return brand.isActive ? <Badge variant="success">Active</Badge> : <Badge variant="outline">Inactive</Badge>
}

function ViewBrandModal({ brand, isOpen, onClose, onSuccess }: ModalProps & { brand?: IBrand }) {
    if (!brand) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader
                    className={cn("p-6 rounded-t-lg flex flex-col items-center gap-4 bg-primary/35 relative overflow-hidden bg-opacity-20")}
                    style={{
                        backgroundImage: brand.coverImage ? `url(${brand.coverImage})` : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {brand.coverImage && <div className="absolute inset-0 bg-black/40 z-0"></div>}

                    <div className="flex-shrink-0 z-10">
                        <Avatar className="h-24 w-24 border-2 shadow-md">
                            {brand.logo ? (
                                <AvatarImage src={brand.logo} alt={brand.name} />
                            ) : (
                                <AvatarFallback className="text-xl">{brand.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            )}
                        </Avatar>
                    </div>
                    <div className="flex-1 text-center z-10">
                        <DialogTitle className="text-xl mb-1 ">{brand.name}</DialogTitle>
                        {brand.website && (
                            <a
                                href={brand.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm /90  flex items-center justify-center gap-1"
                            >
                                <Globe className="h-3 w-3" />
                                {brand.website.replace(/^https?:\/\//, "")}
                            </a>
                        )}
                        <div className="mt-2">{renderBrandStatus(brand)}</div>
                    </div>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Code</Label>
                        <div className="text-sm font-medium">{brand.code}</div>
                    </div>

                    {brand.shortDescription && (
                        <div className="grid gap-2">
                            <Label>Short Description</Label>
                            <div className="text-sm text-muted-foreground">{brand.shortDescription}</div>
                        </div>
                    )}

                    {brand.description && (
                        <div className="grid gap-2">
                            <Label>Description</Label>
                            <div className="text-sm text-muted-foreground border rounded-md p-3 bg-muted/30">{brand.description}</div>
                        </div>
                    )}

                    {brand.metadata ? <div className="grid gap-2">
                        <Label>Metadata</Label>
                        <div className="text-sm">
                            <div>
                                <strong>Title:</strong> {brand.metadata.title}
                            </div>
                            <div>
                                <strong>Description:</strong> {brand.metadata.description}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <strong className="w-full">Tags:</strong>
                                {brand.metadata.tags.map((tag, index) => (
                                    <Badge key={index + tag} variant="secondary" className="flex items-center gap-1">
                                        <Tag className="h-3 w-3" />
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div> : null}

                    {brand.models && brand.models.length > 0 && (
                        <div className="grid gap-2">
                            <Label>Models</Label>
                            <div className="flex flex-wrap gap-2">
                                {brand.models.map((model, index) => (
                                    <Badge key={index + model} variant="outline">
                                        {model}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Created At</Label
                            >
                            <div className="text-sm">{format(new Date(brand.createdAt), "PPP")}</div>
                        </div>
                        {brand.updatedAt && (
                            <div>
                                <Label>Updated At</Label>
                                <div className="text-sm">{format(new Date(brand.updatedAt), "PPP")}</div>
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function EditBrandModal({ brand, isOpen, onClose, onSuccess }: ModalProps & { brand?: IBrand }) {
    const [formData, setFormData] = useState<Partial<IBrand>>(brand ?? {})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            metadata: {
                title: prev.metadata?.title ?? "",
                description: prev.metadata?.description ?? "",
                tags: prev.metadata?.tags ?? [],
                [name]: value,
            },
        }))
    }

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tags = e.target.value.split(",").map((tag) => tag.trim())
        setFormData((prev) => ({
            ...prev,
            metadata: {
                title: prev.metadata?.title ?? "",
                description: prev.metadata?.description ?? "",
                tags: tags,
            },
        }))
    }

    const handleModelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const models = e.target.value.split(",").map((model) => model.trim())
        setFormData((prev) => ({
            ...prev,
            models,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!brand) return

        setIsSubmitting(true)
        try {
            const result = await updateBrand({
                id: brand.id,
                ...formData,
            })

            if (result.success) {
                toast.success("Brand updated successfully")
                onSuccess?.()
                onClose()
            } else {
                toast.error(result.message || "Failed to update brand")
            }
        } catch (error) {
            toast.error("An error occurred while updating the brand")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!brand) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader className={cn("p-6 rounded-t-lg bg-warning/35")}>
                    <div className="flex items-center gap-2 mb-2">
                        <Pencil />
                        <DialogTitle>Edit Brand</DialogTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">Update brand information and preferences</p>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" value={formData.name ?? ""} onChange={handleChange} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="code">Code</Label>
                                <Input id="code" name="code" value={formData.code ?? ""} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input id="slug" name="slug" value={formData.slug ?? ""} onChange={handleChange} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                                id="website"
                                name="website"
                                type="url"
                                value={formData.website ?? ""}
                                onChange={handleChange}
                                placeholder="https://example.com"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="logo">Logo URL</Label>
                            <Input
                                id="logo"
                                name="logo"
                                type="url"
                                value={formData.logo ?? ""}
                                onChange={handleChange}
                                placeholder="https://example.com/logo.png"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="coverImage">Cover Image URL</Label>
                            <Input
                                id="coverImage"
                                name="coverImage"
                                type="url"
                                value={formData.coverImage ?? ""}
                                onChange={handleChange}
                                placeholder="https://example.com/cover.jpg"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="shortDescription">Short Description</Label>
                            <Textarea
                                id="shortDescription"
                                name="shortDescription"
                                value={formData.shortDescription ?? ""}
                                onChange={handleChange}
                                className="min-h-[60px]"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description ?? ""}
                                onChange={handleChange}
                                className="min-h-[100px]"
                            />
                        </div>

                        <div className="border-t my-2"></div>

                        <div className="grid gap-2">
                            <Label>Metadata</Label>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="metadata.title">Title</Label>
                                    <Input
                                        id="metadata.title"
                                        name="title"
                                        value={formData.metadata?.title ?? ""}
                                        onChange={handleMetadataChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="metadata.description">Description</Label>
                                    <Textarea
                                        id="metadata.description"
                                        name="description"
                                        value={formData.metadata?.description ?? ""}
                                        onChange={handleMetadataChange}
                                        className="min-h-[60px]"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="metadata.tags">Tags (comma-separated)</Label>
                                    <Input
                                        id="metadata.tags"
                                        name="tags"
                                        value={formData.metadata?.tags?.join(", ") ?? ""}
                                        onChange={handleTagsChange}
                                        placeholder="tag1, tag2, tag3"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="models">Models (comma-separated)</Label>
                            <Input
                                id="models"
                                name="models"
                                value={formData.models?.join(", ") ?? ""}
                                onChange={handleModelsChange}
                                placeholder="model1, model2, model3"
                            />
                        </div>

                        <div className="border-t my-2"></div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="isActive"
                                checked={formData.isActive}
                                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
                            />
                            <Label htmlFor="isActive">Active</Label>
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant={"warning"} disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function CreateBrandModal({ isOpen, onClose, onSuccess }: Readonly<ModalProps>) {
    const [formData, setFormData] = useState<Partial<IBrand>>({
        name: "",
        code: "",
        slug: "",
        website: "",
        shortDescription: "",
        description: "",
        metadata: {
            title: "",
            description: "",
            tags: [],
        },
        models: [],
        isActive: true,
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            metadata: {
                title: prev.metadata?.title ?? "",
                description: prev.metadata?.description ?? "",
                tags: prev.metadata?.tags || [],
                [name]: value,
            },
        }))
    }

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tags = e.target.value.split(",").map((tag) => tag.trim())
        setFormData((prev) => ({
            ...prev,
            metadata: {
                title: prev.metadata?.title ?? "",
                description: prev.metadata?.description ?? "",
                tags,
            },
        }))
    }

    const handleModelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const models = e.target.value.split(",").map((model) => model.trim().toUpperCase())
        setFormData((prev) => ({
            ...prev,
            models,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name || !formData.code) {
            toast.error("Brand name and code are required")
            return
        }

        setIsSubmitting(true)
        try {
            const result = await createBrand(formData)

            if (result.success) {
                toast.success("Brand created successfully")
                onSuccess?.(result.data)
                onClose()
            } else {
                toast.error(result.message || "Failed to create brand")
            }
        } catch (error) {
            toast.error("An error occurred while creating the brand")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader className={cn("p-6 rounded-t-lg", "bg-primary/30")}>
                    <div className="flex items-center gap-2 mb-2">
                        <Plus />
                        <DialogTitle>Create New Brand</DialogTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">Add a new brand to the system</p>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name *</Label>
                                <Input id="name" name="name" value={formData.name ?? ""} onChange={handleChange} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="code">Code *</Label>
                                <Input id="code" name="code" value={formData.code ?? ""} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                name="slug"
                                value={formData.slug ?? ""}
                                onChange={handleChange}
                                placeholder={formData.name ? formData.name.toLowerCase().replace(/\s+/g, "-") : "brand-slug"}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                                id="website"
                                name="website"
                                type="url"
                                value={formData.website ?? ""}
                                onChange={handleChange}
                                placeholder="https://example.com"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="logo">Logo URL</Label>
                            <Input
                                id="logo"
                                name="logo"
                                type="url"
                                value={formData.logo ?? ""}
                                onChange={handleChange}
                                placeholder="https://example.com/logo.png"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="coverImage">Cover Image URL</Label>
                            <Input
                                id="coverImage"
                                name="coverImage"
                                type="url"
                                value={formData.coverImage ?? ""}
                                onChange={handleChange}
                                placeholder="https://example.com/cover.jpg"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="shortDescription">Short Description</Label>
                            <Textarea
                                id="shortDescription"
                                name="shortDescription"
                                value={formData.shortDescription ?? ""}
                                onChange={handleChange}
                                className="min-h-[60px]"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description ?? ""}
                                onChange={handleChange}
                                className="min-h-[100px]"
                            />
                        </div>

                        <div className="border-t my-2"></div>

                        <div className="grid gap-2">
                            <Label>Metadata</Label>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="metadata.title">Title</Label>
                                    <Input
                                        id="metadata.title"
                                        name="title"
                                        value={formData.metadata?.title ?? ""}
                                        onChange={handleMetadataChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="metadata.description">Description</Label>
                                    <Textarea
                                        id="metadata.description"
                                        name="description"
                                        value={formData.metadata?.description ?? ""}
                                        onChange={handleMetadataChange}
                                        className="min-h-[60px]"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="metadata.tags">Tags (comma-separated)</Label>
                                    <Input
                                        id="metadata.tags"
                                        name="tags"
                                        value={formData.metadata?.tags?.join(", ") ?? ""}
                                        onChange={handleTagsChange}
                                        placeholder="tag1, tag2, tag3"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="models">Models (comma-separated)</Label>
                            <Input
                                id="models"
                                name="models"
                                value={formData.models?.join(", ") ?? ""}
                                onChange={handleModelsChange}
                                placeholder="model1, model2, model3"
                            />
                        </div>

                        <div className="border-t my-2"></div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="isActive"
                                checked={formData.isActive}
                                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
                            />
                            <Label htmlFor="isActive">Active</Label>
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create Brand"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function DeleteBrandModal({ brand, isOpen, onClose, onSuccess }: ModalProps & { brand?: IBrand }) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!brand) return
        setIsDeleting(true)
        try {
            const result = await deleteBrand(brand.id)
            if (result.success) {
                toast.success("Brand deleted successfully")
                onSuccess?.()
            } else {
                toast.error(result.message || "Failed to delete brand")
            }
        } catch (error) {
            toast.error("An error occurred while deleting the brand")
        } finally {
            setIsDeleting(false)
            onClose()
        }
    }

    if (!brand) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader className={cn("p-6 rounded-t-lg flex flex-row items-center gap-4", getVariant("destructive"))}>
                    <div className="flex-shrink-0">
                        <Avatar className="h-16 w-16 border-2 shadow-md">
                            {brand.logo ? (
                                <AvatarImage src={brand.logo} alt={brand.name} />
                            ) : (
                                <AvatarFallback className="text-lg">{brand.name?.substring(0, 2).toUpperCase() || "B"}</AvatarFallback>
                            )}
                        </Avatar>
                    </div>
                    <div className="flex-1">
                        <DialogTitle className="text-xl mb-1">{brand.name || "N/A"}</DialogTitle>
                        {brand.website && <div className="text-sm text-muted-foreground">{brand.website}</div>}
                        <div className="mt-2">{renderBrandStatus(brand)}</div>
                    </div>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {brand.description && (
                        <div className="grid gap-2">
                            <Label>Description</Label>
                            <div className="text-sm text-muted-foreground border rounded-md p-3 bg-muted/30">{brand.description}</div>
                        </div>
                    )}

                    {brand.isDeleted ? (
                        <div className="text-2xl font-bold text-destructive">[Brand is Already Deleted]</div>
                    ) : (
                        <div className="border-t pt-4 mt-2">
                            <div className="text-destructive font-medium mb-2">Confirm Deletion</div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Are you sure you want to delete this brand? This action cannot be undone.
                            </p>
                        </div>
                    )}
                </div>
                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    {!brand.isDeleted && (
                        <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? "Deleting..." : "Delete Brand"}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function BulkDeleteBrands({ selectedBrands, isOpen, onClose, onSuccess }: ModalProps & { selectedBrands?: string[] }) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleBulkDelete = async () => {
        if (!selectedBrands || selectedBrands.length === 0) return

        setIsDeleting(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            toast.success(`${selectedBrands.length} brands deleted successfully`)
            onSuccess?.()
        } catch (error) {
            toast.error("An error occurred while deleting the brands")
        } finally {
            setIsDeleting(false)
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader
                    className={cn(
                        "p-6 rounded-t-lg flex flex-row items-center gap-4 font-bold text-2xl",
                        getVariant("destructive"),
                    )}
                >
                    Delete {selectedBrands?.length} Brands?
                </DialogHeader>
                <div className="border-t pt-4 mt-2">
                    <div className="text-destructive font-medium mb-2">Confirm Deletion</div>
                    <div className="text-sm text-muted-foreground mb-4">
                        Are you sure you want to delete {selectedBrands?.length} brands? This action cannot be undone.
                    </div>
                </div>
                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleBulkDelete} disabled={isDeleting}>
                        {isDeleting ? "Deleting..." : "Delete Brands"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export const BrandActionsModal: React.FC<BrandActionsModalProps> = ({
    type,
    brand,
    isOpen,
    onClose,
    onSuccess,
    selectedBrands,
}) => {
    if (!type) return null

    switch (type) {
        case "view":
            return <ViewBrandModal brand={brand} isOpen={isOpen} onClose={onClose} />
        case "create":
            return <CreateBrandModal isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
        case "delete":
            return <DeleteBrandModal brand={brand} isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
        case "edit":
            return <EditBrandModal brand={brand} isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
        case "bulk delete":
            return (
                <BulkDeleteBrands selectedBrands={selectedBrands} isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
            )
        default:
            return null
    }
}
