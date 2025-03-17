"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { IModel, IBrand } from "@/types/brand"
import { DataTableFilter } from "@/components/misc/table/filter"
import { DataTable } from "@/components/misc/table/data-table"
import { ModelDetailModal } from "./action-modals"
import { ModelTableColumns } from "./columns"

type ModelTableProps = Readonly<{
  models: IModel[]
  brands?: IBrand[]
  tableTitle?: string
  tableName?: string
  total: number
  page: number
  limit: number
  activeFilters?: Record<string, any>
}>

const modelFilters: DataTableFilter[] = [
  { key: "isActive", name: "Show Only Active", type: "boolean" },
  { key: "isDeleted", name: "Show Deleted", type: "boolean" },
  { key: "search", name: "Search", type: "text" },
]

export function ModelTable({
  models = [],
  brands = [],
  total = 0,
  page = 1,
  tableName = "Models",
  tableTitle = "Manage Your Models",
  limit = 10,
  activeFilters = {},
}: ModelTableProps) {
  const router = useRouter()
  const [selectedModel, setSelectedModel] = useState<IModel>()
  const [selectedModels, setSelectedModels] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  const filters = [...modelFilters]
  if (brands && brands.length > 0) {
    filters.push({
      key: "brand",
      name: "Brand",
      type: "select",
      options: brands.map((brand) => ({
        label: brand.name,
        value: brand.id,
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
        items={models}
        nameField="name"
        idField="id"
        columns={ModelTableColumns}
        filters={filters}
        activeFilters={activeFilters}
        setSelectedItems={setSelectedModels}
        selectedItems={selectedModels ?? []}
        onEdit={(model) => {
          router.push(`/fleet-management/models/${model.id}#edit`)
        }}
        onAdd={() => {
          router.push("/fleet-management/models#new")
        }}
        onView={(model) => {
          setSelectedModel(model)
          setModalOpen(true)
        }}
        onDelete={(model) => {
          console.log("Delete model:", model.id)
        }}
        onFiltersChange={(filters) => {
          const search = new URLSearchParams(filters)
          router.push(`/models?${search.toString()}`)
        }}
        onBulkDelete={(items) => {
          console.log("Bulk delete models:", items)
        }}
      />
      {selectedModel && (
        <ModelDetailModal
          model={selectedModel}
          open={modalOpen}
          onClose={() => {
            setModalOpen(false)
            setSelectedModel(undefined)
          }}
        />
      )}
    </>
  )
}

