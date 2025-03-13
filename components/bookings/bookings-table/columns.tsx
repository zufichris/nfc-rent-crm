import { DataTableColumn, renderStatus } from "@/components/misc/table/data-table";
import { IBooking, BookingStatus } from "@/types/bookings";

export const BookingTableColumns: (Omit<DataTableColumn, 'key'> & { key: keyof IBooking })[] = [
    {
        key: "id",
        name: "Booking ID",
    },
    {
        key: "user",
        name: "User",
        render: (value, item: IBooking) => (
            <div>
                {item.user.fullName} <span className="text-muted-foreground">({item.user.email})</span>
            </div>
        ),
    },
    {
        key: "car",
        name: "Car",
        render: (value, item: IBooking) => (
            <div>
                {item.car.name} <span className="text-muted-foreground">({item.car.model})</span>
            </div>
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
        render: (value: BookingStatus, item) => renderStatus(item),
    },
    {
        key: "totalAmount",
        name: "Total Amount",
    },
];