"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DataTableFilter } from "@/components/misc/table/filter"
import { DataTable } from "@/components/misc/table/data-table"
import { ModelDetailModal } from "./action-modals"
import { ModelTableColumns } from "./columns"
import { IModel } from "@/types/model"

type ModelTableProps = Readonly<{
  models: IModel[]
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
  total = 0,
  page = 1,
  limit = 10,
  activeFilters = {},
}: ModelTableProps) {
  const router = useRouter()
  const [selectedModel, setSelectedModel] = useState<IModel>()
  const [selectedModels, setSelectedModels] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  const filters = [...modelFilters]

  return (
    <>
      <DataTable
        total={total}
        title={"Available Models"}
        name={"models"}
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
          router.push(`/fleet-management/models/${model.id}/edit`)
        }}
        onAdd={() => {
          router.push("/fleet-management/models/new")
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

