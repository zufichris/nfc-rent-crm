"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { ArrowRight, Car, User, CreditCard, Clock } from "lucide-react"
import { toast } from "sonner"
import type { IBooking, BookingStatus } from "@/types/bookings"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { getVariant } from "@/components/theme/variants"
import Link from "next/link"
import { renderBookingStatus } from "./columns"

async function deleteBooking(id: string): Promise<any> {
    // This would be implemented to call your API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true })
        }, 1000)
    })
}

export type BookingActionTypes = "view" | "cancel" | "confirm" | "delete" | "bulkDelete"

interface BookingActionsModalProps {
    type?: BookingActionTypes
    booking?: IBooking
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
    selectedBookings?: string[]
}

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: (data?: any) => void
}

const ViewBookingModal = ({ booking, onClose, isOpen }: Readonly<BookingActionsModalProps>) => {
    if (!booking) return null

    return (
        <Dialog open={isOpen}>
            <DialogContent className="max-w-md max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
                <DialogHeader
                    className={cn(
                        "p-6 rounded-t-lg flex flex-col items-center gap-4 relative",
                        "bg-gradient-to-b from-primary/10 to-background/80 dark:from-primary/5 dark:to-background/95",
                    )}
                >
                    <div className="flex-shrink-0 z-10">
                        <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                            {booking.car?.media?.[0]?.url ? (
                                <AvatarImage src={booking.car.media[0].url} alt={booking.car?.name} />
                            ) : (
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    <Car className="h-12 w-12" />
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </div>
                    <div className="flex-1 text-center z-10">
                        <DialogTitle className="text-2xl font-bold mb-1 text-foreground">
                            Booking #{booking.id?.substring(0, 8)}
                        </DialogTitle>
                        <div className="text-sm flex items-center justify-center gap-1 text-muted-foreground font-medium">
                            {booking.car?.name} ({booking.car?.model})
                        </div>
                        <div className="mt-3">{renderBookingStatus(booking)}</div>
                    </div>
                </DialogHeader>

                <div className="overflow-y-auto scrollbar px-6 py-5 space-y-6 flex-1">
                    <div className="grid gap-2">
                        <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Customer</Label>
                        <div className="flex items-center gap-3 bg-accent/10 p-3 rounded-md border">
                            <Avatar className="h-10 w-10">
                                {booking.user?.photo ? (
                                    <AvatarImage src={booking.user.photo} alt={booking.user?.fullName} />
                                ) : (
                                    <AvatarFallback>
                                        <User className="h-5 w-5" />
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <div>
                                <div className="font-medium">{booking.user?.fullName}</div>
                                <div className="text-sm text-muted-foreground">{booking.user?.email}</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-3">
                        <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Booking Period</Label>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-accent/10 p-3 rounded-md border">
                                <div className="text-xs uppercase text-muted-foreground font-medium tracking-wide mb-1">
                                    Pickup Date
                                </div>
                                <div className="text-base font-semibold flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    {format(new Date(booking.pickupDate), "PPP")}
                                </div>
                            </div>
                            <div className="bg-accent/10 p-3 rounded-md border">
                                <div className="text-xs uppercase text-muted-foreground font-medium tracking-wide mb-1">
                                    Return Date
                                </div>
                                <div className="text-base font-semibold flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    {format(new Date(booking.returnDate), "PPP")}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-3">
                        <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Payment Details</Label>
                        <div className="bg-accent/10 p-3 rounded-md border">
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-sm text-muted-foreground">Total Amount</div>
                                <div className="text-lg font-bold">${booking.totalAmount.toFixed(2)}</div>
                            </div>
                            {booking.payment && (
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                                    <div className="text-sm">
                                        {booking.payment.paymentMethod} •••• "****"
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {booking.selectedAddons && booking.selectedAddons.length > 0 && (
                        <div className="grid gap-3">
                            <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">
                                Selected Add-ons
                            </Label>
                            <div className="flex flex-wrap gap-2 bg-accent/10 p-3 rounded-md border">
                                {booking.selectedAddons.map((addon, index) => (
                                    <Badge key={index} variant="outline" className="bg-background/80">
                                        {addon.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {booking.priceBreakdown && (
                        <div className="grid gap-3">
                            <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">
                                Price Breakdown
                            </Label>
                            <div className="bg-accent/10 p-3 rounded-md border space-y-2">
                                {Object.entries(booking.priceBreakdown).map(([key, value], index) => (
                                    <div key={index} className="flex justify-between text-sm">
                                        <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                                        <span>${typeof value === "number" ? value.toFixed(2) : value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {booking.cancellationReason && (
                        <div className="grid gap-2">
                            <Label className="text-xs uppercase text-muted-foreground font-medium tracking-wide">
                                Cancellation Reason
                            </Label>
                            <div className="text-sm  bg-destructive/10 text-destructive-foreground p-3 rounded-md border italic">
                                {booking.cancellationReason}
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="px-6 py-4 border-t flex justify-between w-full">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Button asChild onClick={onClose}>
                        <Link href={`/bookings/booking-list/${booking.id}`}>
                            Full Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function CancelBookingModal({ booking, isOpen, onClose, onSuccess }: ModalProps & { booking?: IBooking }) {
    const [isCancelling, setIsCancelling] = useState(false)

    const handleCancel = async () => {
        if (!booking) return
        setIsCancelling(true)
        try {
            // Placeholder for API call, e.g., await cancelBooking(booking.id);
            await new Promise((resolve) => setTimeout(resolve, 1000))
            toast.success("Booking cancelled successfully")
            onSuccess?.()
        } catch (error) {
            toast.error("Failed to cancel booking")
        } finally {
            setIsCancelling(false)
            onClose()
        }
    }

    if (!booking) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader className={cn("p-6 rounded-t-lg flex flex-row items-center gap-4", getVariant("warning"))}>
                    <div className="flex-shrink-0">
                        <Avatar className="h-16 w-16 border-2 shadow-md">
                            {booking.car?.media?.[0]?.url ? (
                                <AvatarImage src={booking.car.media[0].url} alt={booking.car?.name || "Car"} />
                            ) : (
                                <AvatarFallback className="text-lg">
                                    <Car className="h-8 w-8" />
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </div>
                    <div className="flex-1">
                        <DialogTitle className="text-xl mb-1">Cancel Booking</DialogTitle>
                        <div className="text-sm text-muted-foreground">Booking #{booking.id?.substring(0, 8)}</div>
                        <div className="mt-2">{renderBookingStatus(booking)}</div>
                    </div>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Booking Details</Label>
                        <div className="text-sm text-muted-foreground border rounded-md p-3 bg-muted/30">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <div className="font-medium">Customer:</div>
                                    <div>{booking.user?.fullName}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Vehicle:</div>
                                    <div>{booking.car?.name}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Pickup:</div>
                                    <div>{format(new Date(booking.pickupDate), "PPP")}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Return:</div>
                                    <div>{format(new Date(booking.returnDate), "PPP")}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-4 mt-2">
                        <div className="text-warning-foreground font-medium mb-2">Confirm Cancellation</div>
                        <p className="text-sm text-muted-foreground mb-4">
                            Are you sure you want to cancel this booking? This action may trigger a refund process based on your
                            cancellation policy.
                        </p>
                    </div>
                </div>
                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Go Back
                    </Button>
                    <Button variant="warning" onClick={handleCancel} disabled={isCancelling}>
                        {isCancelling ? "Cancelling..." : "Yes, Cancel Booking"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function ConfirmBookingModal({ booking, isOpen, onClose, onSuccess }: ModalProps & { booking?: IBooking }) {
    const [isConfirming, setIsConfirming] = useState(false)

    const handleConfirm = async () => {
        if (!booking) return
        setIsConfirming(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            toast.success("Booking confirmed successfully")
            onSuccess?.()
        } catch (error) {
            toast.error("Failed to confirm booking")
        } finally {
            setIsConfirming(false)
            onClose()
        }
    }

    if (!booking) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader className={cn("p-6 rounded-t-lg flex flex-row items-center gap-4", getVariant("success"))}>
                    <div className="flex-shrink-0">
                        <Avatar className="h-16 w-16 border-2 shadow-md">
                            {booking.car?.media?.[0]?.url ? (
                                <AvatarImage src={booking.car.media[0].url} alt={booking.car?.name || "Car"} />
                            ) : (
                                <AvatarFallback className="text-lg">
                                    <Car className="h-8 w-8" />
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </div>
                    <div className="flex-1">
                        <DialogTitle className="text-xl mb-1">Confirm Booking</DialogTitle>
                        <div className="text-sm text-muted-foreground">Booking #{booking.id?.substring(0, 8)}</div>
                        <div className="mt-2">{renderBookingStatus(booking)}</div>
                    </div>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Booking Details</Label>
                        <div className="text-sm text-muted-foreground border rounded-md p-3 bg-muted/30">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <div className="font-medium">Customer:</div>
                                    <div>{booking.user?.fullName}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Vehicle:</div>
                                    <div>{booking.car?.name}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Pickup:</div>
                                    <div>{format(new Date(booking.pickupDate), "PPP")}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Return:</div>
                                    <div>{format(new Date(booking.returnDate), "PPP")}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Amount:</div>
                                    <div>${booking.totalAmount.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {booking.status === "CONFIRMED" ? (
                        <div className="text-xl font-bold text-success">Booking is already confirmed</div>
                    ) : (
                        <div className="border-t pt-4 mt-2">
                            <div className="text-success-foreground font-medium mb-2">Confirm This Booking</div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Are you sure you want to confirm this booking? This will notify the customer and update the vehicle's
                                availability.
                            </p>
                        </div>
                    )}
                </div>
                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    {booking.status !== "CONFIRMED" && (
                        <Button variant="success" onClick={handleConfirm} disabled={isConfirming}>
                            {isConfirming ? "Confirming..." : "Confirm Booking"}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function DeleteBookingModal({ booking, isOpen, onClose, onSuccess }: ModalProps & { booking?: IBooking }) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!booking) return
        setIsDeleting(true)
        try {
            const result = await deleteBooking(booking.id)
            if (result.success) {
                toast.success("Booking deleted successfully")
                onSuccess?.()
            } else {
                toast.error(result.message || "Failed to delete booking")
            }
        } catch (error) {
            toast.error("An error occurred while deleting the booking")
        } finally {
            setIsDeleting(false)
            onClose()
        }
    }

    if (!booking) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader className={cn("p-6 rounded-t-lg flex flex-row items-center gap-4", getVariant("destructive"))}>
                    <div className="flex-shrink-0">
                        <Avatar className="h-16 w-16 border-2 shadow-md">
                            {booking.car?.media?.[0]?.url ? (
                                <AvatarImage src={booking.car.media[0].url} alt={booking.car?.name || "Car"} />
                            ) : (
                                <AvatarFallback className="text-lg">
                                    <Car className="h-8 w-8" />
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </div>
                    <div className="flex-1">
                        <DialogTitle className="text-xl mb-1">Delete Booking</DialogTitle>
                        <div className="text-sm text-muted-foreground">Booking #{booking.id?.substring(0, 8)}</div>
                        <div className="mt-2">{renderBookingStatus(booking)}</div>
                    </div>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Booking Details</Label>
                        <div className="text-sm text-muted-foreground border rounded-md p-3 bg-muted/30">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <div className="font-medium">Customer:</div>
                                    <div>{booking.user?.fullName}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Vehicle:</div>
                                    <div>{booking.car?.name}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Pickup:</div>
                                    <div>{format(new Date(booking.pickupDate), "PPP")}</div>
                                </div>
                                <div>
                                    <div className="font-medium">Return:</div>
                                    <div>{format(new Date(booking.returnDate), "PPP")}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {booking.status === "CANCELLED" ? (
                        <div className="text-xl font-bold text-destructive">[Booking is Already Cancelled]</div>
                    ) : (
                        <div className="border-t pt-4 mt-2">
                            <div className="text-destructive font-medium mb-2">Confirm Deletion</div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Are you sure you want to delete this booking? This action cannot be undone and may affect reporting and
                                analytics.
                            </p>
                        </div>
                    )}
                </div>
                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    {booking.status !== "CANCELLED" && (
                        <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? "Deleting..." : "Delete Booking"}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function BulkDeleteBookings({
    selectedBookings,
    isOpen,
    onClose,
    onSuccess,
}: ModalProps & { selectedBookings?: string[] }) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleBulkDelete = async () => {
        if (!selectedBookings || selectedBookings.length === 0) return

        setIsDeleting(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            toast.success(`${selectedBookings.length} bookings deleted successfully`)
            onSuccess?.()
        } catch (error) {
            toast.error("An error occurred while deleting the bookings")
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
                    Delete {selectedBookings?.length} Bookings?
                </DialogHeader>
                <div className="border-t pt-4 mt-2">
                    <div className="text-destructive font-medium mb-2">Confirm Deletion</div>
                    <div className="text-sm text-muted-foreground mb-4">
                        Are you sure you want to delete {selectedBookings?.length} bookings? This action cannot be undone and may
                        affect reporting and analytics.
                    </div>
                </div>
                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleBulkDelete} disabled={isDeleting}>
                        {isDeleting ? "Deleting..." : "Delete Bookings"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export const BookingActionsModal: React.FC<BookingActionsModalProps> = ({
    type,
    booking,
    isOpen,
    onClose,
    onSuccess,
    selectedBookings,
}) => {
    if (!type) return null

    switch (type) {
        case "view":
            return <ViewBookingModal booking={booking} isOpen={isOpen} onClose={onClose} />
        case "cancel":
            return <CancelBookingModal booking={booking} isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
        case "confirm":
            return <ConfirmBookingModal booking={booking} isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
        case "delete":
            return <DeleteBookingModal booking={booking} isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
        case "bulkDelete":
            return (
                <BulkDeleteBookings
                    selectedBookings={selectedBookings}
                    isOpen={isOpen}
                    onClose={onClose}
                    onSuccess={onSuccess}
                />
            )
        default:
            return null
    }
}

