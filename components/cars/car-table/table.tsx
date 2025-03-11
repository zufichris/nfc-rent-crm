"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Car } from 'lucide-react'
import { CarActionsModal, ActionTypes } from "@/components/cars/car-table/action-modals"
import { GetCarsFilter, ICar } from "@/types/car"
import { DataTable, DataTableColumn } from "@/components/misc/table/data-table"
import { DataTableFilter } from "@/components/misc/table/filter"
import { CarTableColumns } from "./columns"





const carFilters: DataTableFilter[] = [
    {
        key: "category",
        name: "Category",
        type: "select",
        options: [
            { label: "Luxury Sedan", value: "LUXURY_SEDAN" },
            { label: "Sports Car", value: "SPORTS_CAR" },
            { label: "SUV", value: "SUV" },
            { label: "Convertible", value: "CONVERTIBLE" },
            { label: "Exotic", value: "EXOTIC" },
            { label: "Electric Luxury", value: "ELECTRIC_LUXURY" },
            { label: "Vintage", value: "VINTAGE" },
        ],
    },
    {
        key: "status",
        name: "Status",
        type: "select",
        options: [
            { label: "Available", value: "AVAILABLE" },
            { label: "Rented", value: "RENTED" },
            { label: "Reserved", value: "RESERVED" },
            { label: "In Maintenance", value: "IN_MAINTENANCE" },
            { label: "Sold", value: "SOLD" },
            { label: "Not Available", value: "NOT_AVAILABLE" },
        ],
    },
    {
        key: "listingType",
        name: "Listing Type",
        type: "select",
        options: [
            { label: "For Rent", value: "FOR_RENT" },
            { label: "For Sale", value: "FOR_SALE" },
        ],
    },
    {
        key: "year",
        name: "Year",
        type: "text",
    },
]

type CarTableProps = Readonly<{
    cars: ICar[];
    total: number;
    page: number;
    limit: number;
    activeFilters?: GetCarsFilter;
}>;

export function CarListTable({
    cars = [],
    total = 0,
    page = 0,
    limit = 0,
    activeFilters
}: CarTableProps) {
    const router = useRouter()
    const [selectedCar, setSelectedCar] = useState<ICar | undefined>()
    const [selectedCars, setSelectedCars] = useState<string[]>([])
    const [actionType, setActionType] = useState<ActionTypes | undefined>()

    const carActions = [
        {
            name: "View Details",
            icon: <Car size={16} />,
            onClick: (car: ICar) => {
                router.push(`/fleet-management/vehicles/${car.id}`)
            },
        }
    ]

    return (
        <>
            <DataTable
                title="Car Management"
                name="Car"
                items={cars}
                columns={CarTableColumns as DataTableColumn[]}
                filters={carFilters}
                idField="id"
                total={total}
                page={page}
                limit={limit}
                nameField="translations[0].name"
                setSelectedItems={setSelectedCars}
                selectedItems={selectedCars}
                actions={carActions}
                activeFilters={activeFilters}
                onAdd={() => router.push("/fleet-management/vehicles/new")}
                onView={(car: ICar) => {
                    setSelectedCar(car)
                    setActionType("view")
                }}
                onEdit={(car: ICar) => router.push(`/fleet-management/vehicles/${car.id}/edit`)}
                onDelete={(car: ICar) => {
                    setSelectedCar(car)
                    setActionType("delete")
                }}
                onBulkDelete={(items: string[]) => {
                    setSelectedCars(items)
                    setActionType("bulk delete")
                }}
                onFiltersChange={(filters: Record<string, any>) => {
                    const searchParams = new URLSearchParams(filters)
                    router.push(`?${searchParams.toString()}`)
                }}
            />
            <CarActionsModal
                isOpen={actionType !== undefined}
                type={actionType}
                selectedCars={selectedCars}
                car={selectedCar}
                onClose={() => setActionType(undefined)}
                onSuccess={() => {
                    setActionType(undefined)
                    setSelectedCar(undefined)
                    setSelectedCars([])
                }}
            />
        </>
    )
}
