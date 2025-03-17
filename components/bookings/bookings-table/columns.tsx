import { CarCard } from "@/components/cars/car-card";
import { DataTableColumn} from "@/components/misc/table/data-table";
import { Variant } from "@/components/theme/variants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UserAvatar } from "@/components/user/user-avatar";
import { UserCard } from "@/components/user/user-card";
import { IBooking, BookingStatus } from "@/types/bookings";
import { ICar } from "@/types/car";
import { IUser } from "@/types/user";
import { CarIcon } from "lucide-react";

export function renderBookingStatus(booking: IBooking) {

    return <Badge className="uppercase" variant={variant()}>{booking.isDeleted ? "deleted" : booking.status}</Badge>
    function variant(): Variant {
        if (booking.isDeleted)
            return "destructive"
        switch (booking.status) {
            case BookingStatus.ACTIVE: return "success"
            case BookingStatus.CANCELLED: return "secondary"
            case BookingStatus.PENDING: return "warning"
            case BookingStatus.CONFIRMED: return "info"
            case BookingStatus.COMPLETED: return "outline"
        }
    }
}

export const BookingTableColumns: (Omit<DataTableColumn, 'key'> & { key: keyof IBooking })[] = [
    {
        key: "id",
        name: "Booking ID",
        render: (value) => <div className="line-clamp-1">{value}</div>
    },
    {
        key: "user",
        name: "User",
        render: (value: IUser) => (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex">
                            <UserAvatar src={value.photo} className="mr-0.5" />
                            <div className="flex flex-col">
                                <span className="truncate">{value.fullName} </span>
                                <span className="text-muted-foreground text-base line-clamp-1 lowercase">{value.email}</span>
                            </div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                        <UserCard user={value} className="w-72" />
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        ),
    },
    {
        key: "car",
        name: "Car",
        render: (value: ICar) => (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex">
                            <Avatar className="h-10 w-10 mr-1 rounded-md border">
                                <AvatarImage src={value.images?.[0]?.url} alt={`${value.name} ${value?.model?.name}`} className="object-cover" />
                                <AvatarFallback className="rounded-md bg-muted">
                                    <CarIcon className="h-5 w-5 text-muted-foreground" />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <span className="font-medium truncate">{value.name}</span>
                                <div className="flex items-center gap-2 text-muted-foreground text-base">
                                    {value.model && (
                                        <Badge variant="outline" className="px-1 py-0 h-auto line-clamp-1">
                                            {value?.model.name}
                                        </Badge>
                                    )}
                                    {value.category && (
                                        <Badge variant="secondary" className="px-1 py-0 h-auto line-clamp-1">
                                            {value.category}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="shadow-none">
                        <CarCard car={value} className="w-72" />
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        ),
    },
    {
        key: "pickupDate",
        name: "Pickup Date",
        type: "date",
    },
    {
        key: "returnDate",
        name: "Return Date",
        type: "date",
    },
    {
        key: "status",
        name: "Status",
        render: (_, item: IBooking) => renderBookingStatus(item),
    },
    {
        key: "totalAmount",
        name: "Total Amount",
    },
];