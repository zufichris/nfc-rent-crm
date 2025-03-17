"use client"

import { DataTable } from "@/components/misc/table/data-table"
import { DataTableFilter } from "@/components/misc/table/filter"
import { PaymentStatus } from "@/types/payment"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PaymentTableColumns } from "./columns"
import { PaymentDetailModal } from "./action-modals"


type PaymentTableProps = Readonly<{
  payments: any[]
  tableTitle?: string
  tableName?: string
  total: number
  page: number
  limit: number
  activeFilters?: Record<string, any>
}>

const paymentFilters: DataTableFilter[] = [
  { key: "isActive", name: "Show Only Active", type: "boolean" },
  {
    key: "status",
    name: "Status",
    type: "select",
    options: Object.values(PaymentStatus).map((status) => ({
      label: status.toLowerCase().replace("_", " "),
      value: status,
    })),
  },
  { key: "isCrypto", name: "Cryptocurrency", type: "boolean" },
  { key: "isDeleted", name: "Show Deleted", type: "boolean" },
  { key: "search", name: "Search", type: "text" },
]

export function PaymentTable({
  payments = [],
  total = 0,
  page = 1,
  tableName = "Payments",
  tableTitle = "Manage Your Payments",
  limit = 10,
  activeFilters = {},
}: PaymentTableProps) {
  const router = useRouter()
  const [selectedPayment, setSelectedPayment] = useState<any>()
  const [selectedPayments, setSelectedPayments] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <DataTable
        total={total}
        title={tableTitle}
        name={tableName}
        limit={limit}
        page={page}
        items={payments}
        nameField="id"
        idField="id"
        columns={PaymentTableColumns}
        filters={paymentFilters}
        activeFilters={activeFilters}
        setSelectedItems={setSelectedPayments}
        selectedItems={selectedPayments ?? []}
        onEdit={(payment) => {
          router.push(`/payments/${payment.id}/edit`)
        }}
        onView={(payment) => {
          setSelectedPayment(payment)
          setModalOpen(true)
        }}
        onDelete={(payment) => {
          console.log("Delete payment:", payment.id)
        }}
        onFiltersChange={(filters) => {
          const search = new URLSearchParams(filters)
          router.push(`/payments?${search.toString()}`)
        }}
        onBulkDelete={(items) => {
          console.log("Bulk delete payments:", items)
        }}
      />
      {selectedPayment && (
        <PaymentDetailModal
          payment={selectedPayment}
          open={modalOpen}
          onClose={() => {
            setModalOpen(false)
            setSelectedPayment(undefined)
          }}
        />
      )}
    </>
  )
}

