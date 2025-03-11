"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ArrowRight, Car, Globe, Tag } from 'lucide-react'
import { toast } from "sonner"
import { ICar } from "@/types/car"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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

function ViewCarModal({ car, isOpen, onClose }: ModalProps & { car?: ICar }) {
    if (!car) return null
    const thumbnail = car.media?.find(m => m.isThumbnail) ?? car.media?.[0]

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader
                    className={cn("p-6 rounded-t-lg flex flex-col items-center gap-4 bg-primary/35 relative overflow-hidden bg-opacity-20")}
                    style={{
                        backgroundImage: thumbnail ? `url(${thumbnail.url})` : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {thumbnail && <div className="absolute inset-0 bg-black/40 z-0"></div>}

                    <div className="flex-shrink-0 z-10">
                        <Avatar className="h-24 w-24 border-2 shadow-md">
                            {thumbnail ? (
                                <AvatarImage src={thumbnail.url} alt={car?.name} />
                            ) : (
                                <AvatarFallback className="text-xl">
                                    <Car className="h-12 w-12" />
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </div>
                    <div className="flex-1 text-center z-10">
                        <DialogTitle className="text-xl mb-1">{car?.name || "Unnamed Car"}</DialogTitle>
                        <div className="text-sm flex items-center justify-center gap-1">
                            {car.year} {car.model}
                        </div>
                        <div className="mt-2">{renderCarStatus(car)}</div>
                    </div>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>VIN</Label>
                        <div className="text-sm font-medium">{car.vin}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Category</Label>
                            <div className="text-sm">
                                <Badge variant="outline" className="mt-1 capitalize">
                                    {car.category?.replace(/_/g, ' ').toLowerCase()}
                                </Badge>
                            </div>
                        </div>
                        <div>
                            <Label>Listing Type</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {car.listingType?.map((type) => (
                                    <Badge key={type} variant="secondary" className="capitalize">
                                        {type.replace(/_/g, ' ').toLowerCase()}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {car?.shortDescription && (
                        <div className="grid gap-2">
                            <Label>Short Description</Label>
                            <div className="text-sm text-muted-foreground">{car.shortDescription}</div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Fuel Type</Label>
                            <div className="text-sm capitalize">
                                {car.fuelType?.toLowerCase().replace(/_/g, ' ')}
                            </div>
                        </div>
                        <div>
                            <Label>Transmission</Label>
                            <div className="text-sm capitalize">
                                {car.transmission?.toLowerCase().replace(/_/g, ' ')}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label>Doors</Label>
                            <div className="text-sm">{car.doors}</div>
                        </div>
                        <div>
                            <Label>Seats</Label>
                            <div className="text-sm">{car.seats}</div>
                        </div>
                        <div>
                            <Label>Mileage</Label>
                            <div className="text-sm">{car.mileage} km</div>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Engine Specs</Label>
                        <div className="text-sm grid grid-cols-2 gap-x-4 gap-y-2">
                            <div>
                                <strong>Horsepower:</strong> {car.engineSpecs?.horsepower} HP
                            </div>
                            <div>
                                <strong>Torque:</strong> {car.engineSpecs?.torque} Nm
                            </div>
                            <div>
                                <strong>Top Speed:</strong> {car.engineSpecs?.topSpeed} km/h
                            </div>
                            <div>
                                <strong>Acceleration:</strong> {car.engineSpecs?.acceleration}s (0-100 km/h)
                            </div>
                        </div>
                    </div>

                    {car.features && car.features.length > 0 && (
                        <div className="grid gap-2">
                            <Label>Features</Label>
                            <div className="flex flex-wrap gap-2">
                                {car.features.map((feature, index) => (
                                    <Badge key={index} variant="outline">
                                        {feature}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Created At</Label>
                            <div className="text-sm">{format(new Date(car.createdAt), "PPP")}</div>
                        </div>
                        {car.updatedAt && (
                            <div>
                                <Label>Updated At</Label>
                                <div className="text-sm">{format(new Date(car.updatedAt), "PPP")}</div>
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button size={"sm"} variant={"outline"} onClick={onClose}>Close</Button>
                    <Button asChild size={"sm"} onClick={onClose}>
                        <Link href={`/fleet-management/vehicles/${car.id}`}>
                        Full Details<ArrowRight size={20}/></Link>
                         </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function DeleteCarModal({ car, isOpen, onClose, onSuccess }: ModalProps & { car?: ICar }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const thumbnail = car?.media?.find(m => m.isThumbnail) || car?.media?.[0]

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
                        <div className="text-sm text-muted-foreground">{car.year} {car.model}</div>
                        <div className="mt-2">{renderCarStatus(car)}</div>
                    </div>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {car?.shortDescription && (
                        <div className="grid gap-2">
                            <Label>Description</Label>
                            <div className="text-sm text-muted-foreground border rounded-md p-3 bg-muted/30">
                                {car.shortDescription}
                            </div>
                        </div>
                    )}

                    {car.isDeleted ? (
                        <div className="text-2xl font-bold text-destructive">[Car is Already Deleted]</div>
                    ) : (
                        <div className="border-t pt-4 mt-2">
                            <div className="text-destructive font-medium mb-2">Confirm Deletion</div>
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
                    <div className="text-destructive font-medium mb-2">Confirm Deletion</div>
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
