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
import { ArrowRight, Globe, Pencil, Plus, Tag } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

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
      <DialogContent className="max-w-md max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader
          className={cn(
            "p-6 rounded-t-lg  flex flex-col items-center gap-4 relative",
            "bg-gradient-to-b from-primary/10 to-background/80 dark:from-primary/5 dark:to-background/95",
          )}
          style={{
            backgroundImage: brand.coverImage ? `url(${brand.coverImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {brand.coverImage && (
            <div className="absolute inset-0 backdrop-blur-sm bg-background/60 dark:bg-background/80 z-0"></div>
          )}

          <div className="flex-shrink-0 z-10">
            <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
              {brand.logo ? (
                <AvatarImage src={brand.logo} alt={brand.name} />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary">
                  {brand.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          <div className="flex-1 text-center z-10">
            <DialogTitle className="text-2xl font-bold mb-1 text-foreground">{brand.name}</DialogTitle>
            {brand.website && (
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-1"
              >
                <Globe className="h-3 w-3" />
                {brand.website.replace(/^https?:\/\//, "")}
              </a>
            )}
            <div className="mt-3">{renderBrandStatus(brand)}</div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto scrollbar px-6 py-5 space-y-6 flex-1">
          <div className="grid gap-2">
            <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Code</Label>
            <div className="text-sm font-mono bg-accent/10 p-2 rounded-md border">{brand.code}</div>
          </div>

          {brand.shortDescription && (
            <div className="grid gap-2">
              <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">
                Short Description
              </Label>
              <div className="text-sm text-muted-foreground">{brand.shortDescription}</div>
            </div>
          )}

          {brand.description && (
            <div className="grid gap-2">
              <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Description</Label>
              <div className="text-sm text-muted-foreground bg-accent/10 p-3 rounded-md border">
                {brand.description}
              </div>
            </div>
          )}

          {brand?.metadata ? (
            <div className="grid gap-3">
              <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Metadata</Label>
              <div className="grid gap-3 bg-accent/10 p-3 rounded-md border">
                <div className="grid gap-1">
                  <span className="text-xs text-muted-foreground font-medium">Title</span>
                  <div className="text-sm font-medium">{brand?.metadata?.title ?? "Not Available"}</div>
                </div>
                <div className="grid gap-1">
                  <span className="text-xs text-muted-foreground font-medium">Description</span>
                  <div className="text-sm">{brand?.metadata?.description ?? "Not Available"}</div>
                </div>
                <div className="grid gap-1">
                  <span className="text-xs text-muted-foreground font-medium">Tags</span>
                  <div className="flex flex-wrap gap-2">
                    {brand?.metadata?.tags?.length ? brand?.metadata?.tags.map((tag, index) => (
                      <Badge key={index + tag} variant="secondary" className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {tag}
                      </Badge>
                    )) : "No Tags Available"}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {brand.models ? (
            <div className="grid gap-2">
              <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Models</Label>
              <div className="flex flex-wrap gap-2 bg-accent/10 p-3 rounded-md border">
                {brand.models.map((model, index) => (
                  <Badge key={index + model} variant="outline" className="bg-background/80">
                    {model}
                  </Badge>
                ))}
              </div>
            </div>
          ) : "No Models Available"}

          <div className="grid grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>
              <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Created</Label>
              <div className="mt-2">{format(new Date(brand.createdAt), "PPP")}</div>
            </div>
            {brand.updatedAt && (
              <div>
                <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Updated</Label>
                <div className="mt-2">{format(new Date(brand.updatedAt), "PPP")}</div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t">
          <Button variant={"outline"} onClick={onClose}>Close</Button>
          <Link href={`/fleet-management/brands/${brand.id}`}>
            <Button>Full Details <ArrowRight size={20} /></Button>
          </Link>
        </DialogFooter>
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
    case "delete":
      return <DeleteBrandModal brand={brand} isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
    case "bulk delete":
      return (
        <BulkDeleteBrands selectedBrands={selectedBrands} isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
      )
    default:
      return null
  }
}
