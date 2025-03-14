"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable, DataTableColumn } from "../../misc/table/data-table";
import { GetBookingsFilters, IBooking } from "@/types/bookings";
import { BookingTableColumns } from "./columns";
import { BookingActionsModal } from "./action-modals";
import { Check, X } from "lucide-react";
import { DataTableFilter } from "../../misc/table/filter";
import { BookingStatus } from "@/types/bookings";

type ActionTypes = "view" | "cancel" | "confirm" | "delete" | "bulkDelete";

type BookingsListTableProps = Readonly<{
  bookings: IBooking[];
  total: number;
  page: number;
  limit: number;
  activeFilters?: GetBookingsFilters;
}>;

const bookingFilters: DataTableFilter[] = [
  {
    key: "status",
    name: "Status",
    type: "select",
    options: Object.values(BookingStatus).map(status => ({ label: status, value: status })),
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
    key: "totalAmount",
    name: "Total Amount",
    type: "text"
  },
  {
    key: "user",
    name: "User IDs",
    type: "text",
  },
  {
    key: "driver",
    name: "Driver IDs",
    type: "text",
  },
  {
    key: "car",
    name: "Car IDs",
    type: "text",
  },
];

export function BookingsListTable({
  bookings = [],
  total = 0,
  page = 0,
  limit = 0,
  activeFilters,
}: BookingsListTableProps) {
  const router = useRouter();
  const [selectedBooking, setSelectedBooking] = useState<IBooking | undefined>();
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [actionType, setActionType] = useState<ActionTypes | undefined>();
  const bookingActions = [
    {
      name: "Cancel Booking",
      icon: <X size={26} />,
      onClick: (booking: IBooking) => {
        setSelectedBooking(booking);
        setActionType("cancel");
      },
    },
    {
      name: "Confirm Booking",
      icon: <Check size={26} />,
      onClick: (booking: IBooking) => {
        setSelectedBooking(booking);
        setActionType("confirm");
      },
    },
  ];

  return (
    <>
      <DataTable
        title="Bookings Management"
        name="Booking"
        items={bookings}
        columns={BookingTableColumns as DataTableColumn[]}
        filters={bookingFilters}
        idField="id"
        total={total}
        page={page}
        limit={limit}
        nameField="id"
        setSelectedItems={setSelectedBookings}
        selectedItems={selectedBookings}
        actions={bookingActions}
        activeFilters={activeFilters}
        onView={(booking: IBooking) => {
          setSelectedBooking(booking);
          setActionType("view");
        }}
        onDelete={(booking) => {
          setSelectedBooking(booking);
          setActionType("delete");
        }}
        onBulkDelete={(items) => {
          setSelectedBookings(items);
          setActionType("bulkDelete");
        }}
        onFiltersChange={(filters: Record<string, any>) => {
          const searchParams = new URLSearchParams(filters);
          router.push(`?${searchParams.toString()}`);
        }}
      />
      <BookingActionsModal
        isOpen={actionType !== undefined}
        type={actionType}
        booking={selectedBooking}
        onClose={() => setActionType(undefined)}
        onSuccess={() => {
          setActionType(undefined);
          setSelectedBooking(undefined);
        }}
      />
    </>
  );
}