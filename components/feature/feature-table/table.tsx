"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { IFeature } from "@/types/features"
import { DataTable } from "@/components/misc/table/data-table"
import { FeatureDetailModal } from "./action-modals"
import { FeatureTableColumns } from "./columns"
import { DataTableFilter } from "@/components/misc/table/filter"

type FeatureTableProps = Readonly<{
    features: IFeature[]
    categories?: string[]
    tableTitle?: string
    tableName?: string
    total: number
    page: number
    limit: number
    activeFilters?: Record<string, any>
}>

export function FeatureTable({
    features = [],
    categories = [],
    total = 0,
    page = 1,
    tableName = "Features",
    tableTitle = "Manage Your Features",
    limit = 10,
    activeFilters = {},
}: FeatureTableProps) {
    const router = useRouter()
    const [selectedFeature, setSelectedFeature] = useState<IFeature>()
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
    const [modalOpen, setModalOpen] = useState(false)

    const filters: DataTableFilter[] = [
        { key: "isActive", name: "Show Only Active", type: "boolean" },
        { key: "isHighlighted", name: "Show Only Highlighted", type: "boolean" },
        { key: "isDeleted", name: "Show Deleted", type: "boolean" },
        { key: "search", name: "Search", type: "text" },
    ]

    if (categories && categories.length > 0) {
        filters.push({
            key: "category",
            name: "Category",
            type: "select",
            options: categories.map((category) => ({
                label: category.charAt(0).toUpperCase() + category.slice(1),
                value: category,
            })),
        })
    }

    return (
        <>
            <DataTable
                total={total}
                title={tableTitle}
                name={tableName}
                limit={limit}
                page={page}
                items={features}
                nameField="name"
                idField="id"
                columns={FeatureTableColumns}
                filters={filters}
                activeFilters={activeFilters}
                setSelectedItems={setSelectedFeatures}
                selectedItems={selectedFeatures ?? []}
                onEdit={(feature) => {
                    router.push(`/fleet-management/features/${feature.id}#edit`)
                }}
                onAdd={() => {
                    router.push("/fleet-management/features#new")
                }}
                onView={(feature) => {
                    setSelectedFeature(feature)
                    setModalOpen(true)
                }}
                onDelete={(feature) => {
                    console.log("Delete feature:", feature.id)
                }}
                onFiltersChange={(filters) => {
                    const search = new URLSearchParams(filters)
                    router.push(`/fleet-management/features?${search.toString()}`)
                }}
                onBulkDelete={(items) => {
                    console.log("Bulk delete features:", items)
                }}
            />
            {selectedFeature && (
                <FeatureDetailModal
                    feature={selectedFeature}
                    open={modalOpen}
                    onClose={() => {
                        setModalOpen(false)
                        setSelectedFeature(undefined)
                    }}
                />
            )}
        </>
    )
}

