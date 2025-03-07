"use client"

import { DataTable } from "../../misc/table/data-table"
import { Download, UploadCloud } from "lucide-react"
import { DataTableFilter } from "../../misc/table/filter"
import { CarTableColumns } from "./columns"


export const CarListTable = ({ cars = [], limit = 0, page = 0, total = 0 }: Readonly<{ page: number, limit: number, total: number, cars: any[] }>) => {


    const tableFilters: DataTableFilter[] = [
        {
            key: "brand",
            name: "Brand",
            type: "select",
            options: [
                { label: "Tesla", value: "Tesla" },
                { label: "BMW", value: "BMW" },
                { label: "Toyota", value: "Toyota" },
                { label: "Honda", value: "Honda" },
                { label: "Ford", value: "Ford" },
            ],
        },
        {
            key: "status",
            name: "Status",
            type: "select",
            options: [
                { label: "Available", value: "Available" },
                { label: "Sold", value: "Sold" },
                { label: "Pending", value: "Pending" },
                { label: "Maintenance", value: "Maintenance" },
            ],
        },
        {
            key: "minYear",
            name: "Min Year",
            type: "date",
        },
        {
            key: "maxPrice",
            name: "Max Price",
            type: "text",
        },
    ]


    const handlePageChange = (newPage: number) => {
    }

    const handleLimitChange = (newLimit: number) => {

    }

    const handleFiltersChange = (newFilters: Record<string, any>) => {

    }

    const handleAddCar = () => {
        alert("Add car functionality would open a form here")
    }

    const handleViewCar = (car: any) => {
        alert(`View details for ${car.name}`)
    }

    const handleEditCar = (car: any) => {
        alert(`Edit ${car.name}`)
    }

    const handleDeleteCar = (id: string) => {

    }

    const handleExport = (type: string) => {
        alert(`Exporting cars as ${type}`)
    }

    const carActions = [
        {
            name: "Download Specs",
            icon: <Download size={16} />,
            onClick: (car: any) => alert(`Downloading specs for ${car.name}`),
            tooltip: "Download vehicle specifications",
        },
        {
            name: "Upload Images",
            icon: <UploadCloud size={16} />,
            onClick: (car: any) => alert(`Upload images for ${car.name}`),
            tooltip: "Upload additional images",
        },
    ]

    return (
        <DataTable
            title="Car Management"
            name="Car"
            items={cars}
            columns={CarTableColumns}
            filters={tableFilters}
            actions={carActions}
            idField="id"
            total={total}
            page={page}
            limit={limit}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
            onFiltersChange={handleFiltersChange}
            onAdd={handleAddCar}
            onView={handleViewCar}
            onEdit={handleEditCar}
            onDelete={handleDeleteCar}
            onExport={handleExport}
            nameField="name"
        />
    )
}
