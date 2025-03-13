"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IBooking, BookingStatus } from "@/types/bookings";
import { format } from "date-fns";
import { toast } from "sonner";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

interface BookingActionsModalProps extends ModalProps {
    type?: "view" | "cancel";
    booking?: IBooking;
}

function ViewBookingModal({ booking, isOpen, onClose }: ModalProps & { booking?: IBooking }) {
    if (!booking) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Booking Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <p><strong>Booking ID:</strong> {booking.id}</p>
                    <p><strong>User:</strong> {booking.user.fullName} ({booking.user.email})</p>
                    <p><strong>Car:</strong> {booking.car.name} ({booking.car.model})</p>
                    <p><strong>Pickup Date:</strong> {format(new Date(booking.pickupDate), "PPP")}</p>
                    <p><strong>Return Date:</strong> {format(new Date(booking.returnDate), "PPP")}</p>
                    <p><strong>Status:</strong> {booking.status}</p>
                    <p><strong>Total Amount:</strong> ${booking.totalAmount.toFixed(2)}</p>
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function CancelBookingModal({ booking, isOpen, onClose, onSuccess }: ModalProps & { booking?: IBooking }) {
    const [isCancelling, setIsCancelling] = useState(false);

    const handleCancel = async () => {
        if (!booking) return;
        setIsCancelling(true);
        try {
            // Placeholder for API call, e.g., await cancelBooking(booking.id);
            toast.success("Booking cancelled successfully");
            onSuccess?.();
        } catch (error) {
            toast.error("Failed to cancel booking");
        } finally {
            setIsCancelling(false);
            onClose();
        }
    };

    if (!booking) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cancel Booking</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <p>Are you sure you want to cancel this booking?</p>
                    <p><strong>Booking ID:</strong> {booking.id}</p>
                    <p><strong>User:</strong> {booking.user.fullName}</p>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>No</Button>
                    <Button variant="destructive" onClick={handleCancel} disabled={isCancelling}>
                        {isCancelling ? "Cancelling..." : "Yes, Cancel"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export const BookingActionsModal: React.FC<BookingActionsModalProps> = ({
    type,
    booking,
    isOpen,
    onClose,
    onSuccess,
}) => {
    if (!type) return null;

    switch (type) {
        case "view":
            return <ViewBookingModal booking={booking} isOpen={isOpen} onClose={onClose} />;
        case "cancel":
            return <CancelBookingModal booking={booking} isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />;
        default:
            return null;
    }
};