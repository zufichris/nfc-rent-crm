"use client"
import { useState } from "react"
import { format } from "date-fns"
import { ArrowRight, Car } from 'lucide-react'
import { toast } from "sonner"
import { ICar } from "@/types/car"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { getVariant } from "@/components/theme/variants"
import Link from "next/link"
async function deleteCar(id: string): Promise<any> {

}

export type ActionTypes = "view" | "create" | "delete" | "edit" | "bulk delete"

interface CarActionsModalProps {
  type?: ActionTypes
  car?: ICar
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  selectedCars?: string[]
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (data?: any) => void
}

function renderCarStatus(car?: ICar) {
  if (!car) return null

  if (car.isDeleted) {
    return <Badge variant="destructive">Deleted</Badge>
  }

  if (car.currentStatus === "AVAILABLE") {
    return <Badge variant="success">Available</Badge>
  } else if (car.currentStatus === "RENTED") {
    return <Badge variant="warning">Rented</Badge>
  } else if (car.currentStatus === "RESERVED") {
    return <Badge variant="secondary">Reserved</Badge>
  } else if (car.currentStatus === "IN_MAINTENANCE") {
    return <Badge variant="outline">In Maintenance</Badge>
  } else if (car.currentStatus === "SOLD") {
    return <Badge variant="default">Sold</Badge>
  } else {
    return <Badge variant="outline">Not Available</Badge>
  }
}

const ViewCarModal = ({ car, onClose, isOpen }: Readonly<CarActionsModalProps>) => {
  if (!car)
    return null

  const thumbnail = car?.images?.length ? (car?.images?.find(img => img.isThumbnail) ?? car?.images[0]) : undefined

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-md max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader
          className={cn(
            "p-6 rounded-t-lg flex flex-col items-center gap-4 relative",
            "bg-gradient-to-b from-primary/10 to-background/80 dark:from-primary/5 dark:to-background/95",
          )}
          style={{
            backgroundImage: thumbnail ? `url(${thumbnail.url})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {thumbnail && (
            <div className="absolute inset-0 backdrop-blur-sm bg-background/60 dark:bg-background/80 z-0"></div>
          )}

          <div className="flex-shrink-0 z-10">
            <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
              {thumbnail ? (
                <AvatarImage src={thumbnail.url} alt={car?.name} />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary">
                  <Car className="h-12 w-12" />
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          <div className="flex-1 text-center z-10">
            <DialogTitle className="text-2xl font-bold mb-1 text-foreground">{car?.name}</DialogTitle>
            <div className="text-sm flex items-center justify-center gap-1 text-muted-foreground font-medium">
              {car?.year} {car?.model?.name ?? car?.model?.code}
            </div>
            <div className="mt-3">{renderCarStatus(car)}</div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto scrollbar px-6 py-5 space-y-6 flex-1">
          <div className="grid gap-2">
            <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">VIN</Label>
            <DialogDescription className="text-sm font-mono bg-accent/10 p-2 rounded-md border">{car?.vin}</DialogDescription>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Category</Label>
              <div className="mt-2">
                <Badge variant="outline" className="capitalize">
                  {car?.category?.replace(/_/g, " ").toLowerCase() || "N/A"}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Listing Type</Label>
              <div className="flex flex-wrap gap-1 mt-2">
                {car?.listingType}</div>
            </div>
          </div>

          {car?.shortDescription && (
            <div className="grid gap-2">
              <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Description</Label>
              <div className="text-sm text-muted-foreground bg-accent/10 p-3 rounded-md border italic">
                {car.shortDescription}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Fuel Type</Label>
              <div className="text-sm font-medium mt-2 capitalize">
                {car?.fuelType?.toLowerCase().replace(/_/g, " ") || "N/A"}
              </div>
            </div>
            <div>
              <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Transmission</Label>
              <div className="text-sm font-medium mt-2 capitalize">
                {car?.transmission?.toLowerCase().replace(/_/g, " ") || "N/A"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 bg-accent/10 p-3 rounded-md border">
            <div className="text-center">
              <div className="text-xs uppercase text-muted-foreground font-medium tracking-wide mb-1">Doors</div>
              <div className="text-lg font-semibold">{car?.doors || "N/A"}</div>
            </div>
            <div className="text-center border-x">
              <div className="text-xs uppercase text-muted-foreground font-medium tracking-wide mb-1">Seats</div>
              <div className="text-lg font-semibold">{car?.seats || "N/A"}</div>
            </div>
            <div className="text-center">
              <div className="text-xs uppercase text-muted-foreground font-medium tracking-wide mb-1">Mileage</div>
              <div className="text-lg font-semibold">{car?.mileage ? `${car.mileage} km` : "N/A"}</div>
            </div>
          </div>

          <div className="grid gap-3">
            <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Engine Specs</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-accent/10 p-3 rounded-md border">
                <div className="text-xs uppercase text-muted-foreground font-medium tracking-wide mb-1">Horsepower</div>
                <div className="text-lg font-semibold">{car?.engineSpecs?.horsepower || "N/A"} HP</div>
              </div>
              <div className="bg-accent/10 p-3 rounded-md border">
                <div className="text-xs uppercase text-muted-foreground font-medium tracking-wide mb-1">Torque</div>
                <div className="text-lg font-semibold">{car?.engineSpecs?.torque || "N/A"} Nm</div>
              </div>
              <div className="bg-accent/10 p-3 rounded-md border">
                <div className="text-xs uppercase text-muted-foreground font-medium tracking-wide mb-1">Top Speed</div>
                <div className="text-lg font-semibold">{car?.engineSpecs?.topSpeed || "N/A"} km/h</div>
              </div>
              <div className="bg-accent/10 p-3 rounded-md border">
                <div className="text-xs uppercase text-muted-foreground font-medium tracking-wide mb-1">0-100 km/h</div>
                <div className="text-lg font-semibold">{car?.engineSpecs?.acceleration || "N/A"}s</div>
              </div>
            </div>
          </div>

          {car?.features?.length ? (
            <div className="grid gap-3">
              <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Features</Label>
              <div className="flex flex-wrap gap-2 bg-accent/10 p-3 rounded-md border">
                {car.features.map((feature, i) => (
                  <Badge key={feature.id ?? (i + 1)} variant="outline" className="bg-background/80">
                    {feature.name ?? feature.code}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>
              <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Created</Label>
              <div className="mt-2">{car?.createdAt ? format(new Date(car.createdAt), "PPP") : "N/A"}</div>
            </div>
            {car?.updatedAt && (
              <div>
                <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Updated</Label>
                <div className="mt-2">{format(new Date(car.updatedAt), "PPP")}</div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t flex justify-between w-full">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button asChild onClick={onClose}>
            <Link href={`/fleet-management/vehicles/${car?.id}`}>
              Full Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DeleteCarModal({ car, isOpen, onClose, onSuccess }: ModalProps & { car?: ICar }) {

  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!car) return
    setIsDeleting(true)
    try {
      const result = await deleteCar(car.id)
      if (result.success) {
        toast.success("Car deleted successfully")
        onSuccess?.()
      } else {
        toast.error(result.message || "Failed to delete car")
      }
    } catch (error) {
      toast.error("An error occurred while deleting the car")
    } finally {
      setIsDeleting(false)
      onClose()
    }
  }
  if (!car) return null


  const thumbnail = car?.images?.find(m => m.isThumbnail) || car.images?.[0]


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className={cn("p-6 rounded-t-lg flex flex-row items-center gap-4", getVariant("destructive"))}>
          <div className="flex-shrink-0">
            <Avatar className="h-16 w-16 border-2 shadow-md">
              {thumbnail ? (
                <AvatarImage src={thumbnail.url} alt={car?.name || "Car"} />
              ) : (
                <AvatarFallback className="text-lg">
                  <Car className="h-8 w-8" />
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          <div className="flex-1">
            <DialogTitle className="text-xl mb-1">{car?.name || "Unnamed Car"}</DialogTitle>
            <div className="text-sm text-muted-foreground">{car.year} {car.model?.name ?? car?.model?.code}</div>
            <div className="mt-2">{renderCarStatus(car)}</div>
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {car?.shortDescription && (
            <div className="grid gap-2">
              <Label>Description</Label>
              <DialogDescription className="text-sm text-muted-foreground border rounded-md p-3 bg-muted/30">
                {car.shortDescription}
              </DialogDescription>
            </div>
          )}

          {car.isDeleted ? (
            <div className="text-2xl font-bold text-destructive">[Car is Already Deleted]</div>
          ) : (
            <div className="border-t pt-4 mt-2">
              <DialogDescription className="text-destructive font-medium mb-2">Confirm Deletion</DialogDescription>
              <p className="text-sm text-muted-foreground mb-4">
                Are you sure you want to delete this car? This action cannot be undone.
              </p>
            </div>
          )}
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {!car.isDeleted && (
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete Car"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function BulkDeleteCars({ selectedCars, isOpen, onClose, onSuccess }: ModalProps & { selectedCars?: string[] }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleBulkDelete = async () => {
    if (!selectedCars || selectedCars.length === 0) return

    setIsDeleting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success(`${selectedCars.length} cars deleted successfully`)
      onSuccess?.()
    } catch (error) {
      toast.error("An error occurred while deleting the cars")
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
          Delete {selectedCars?.length} Cars?
        </DialogHeader>
        <div className="border-t pt-4 mt-2">
          <DialogDescription className="text-destructive font-medium mb-2">Confirm Deletion</DialogDescription>
          <div className="text-sm text-muted-foreground mb-4">
            Are you sure you want to delete {selectedCars?.length} cars? This action cannot be undone.
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleBulkDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Cars"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const CarActionsModal: React.FC<CarActionsModalProps> = ({
  type,
  car,
  isOpen,
  onClose,
  onSuccess,
  selectedCars,
}) => {
  if (!type) return null

  switch (type) {
    case "view":
      return <ViewCarModal car={car} isOpen={isOpen} onClose={onClose} />
    case "delete":
      return <DeleteCarModal car={car} isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
    case "bulk delete":
      return (
        <BulkDeleteCars selectedCars={selectedCars} isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
      )
    default:
      return null
  }
}
