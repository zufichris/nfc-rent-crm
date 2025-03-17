import { DataTableColumn, renderStatus } from "@/components/misc/table/data-table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/utils/format"
import { PaymentStatusBadge } from "../status-badge"
import { getCurrencySymbol } from "@/utils/functions"
import { IPayment } from "@/types/payment"
import { IBooking } from "@/types/bookings"

export const PaymentTableColumns: DataTableColumn[] = [
  {
    key: "booking",
    name: "Customer",
    render: (value:IBooking, item: IPayment) => (
      <div className="flex items-center space-x-3">
        <div>
          <div className="font-medium">{value.user.fullName}</div>
          <div className="text-sm text-muted-foreground">{value.car.name}</div>
        </div>
      </div>
    ),
  },
  {
    key: "amount",
    name: "Amount",
    render: (value, item) => {
      const currencySymbol = getCurrencySymbol(item.currency)
      return (
        <div className="font-medium">
          {currencySymbol}
          {value.toLocaleString()}
        </div>
      )
    },
  },
  {
    key: "paymentMethod",
    name: "Method",
    render: (value, item) => (
      <div className="flex items-center gap-2">
        <span>{value}</span>
        {item.isCrypto && (
          <Badge variant="outline" className="text-xs">
            Crypto
          </Badge>
        )}
      </div>
    ),
  },
  {
    key: "status",
    name: "Status",
    render: (value) => <PaymentStatusBadge status={value} />,
  },
  {
    key: "paidAt",
    name: "Date",
    type: "date",
    render: (value) => (value ? formatDate(new Date(value)) : "-"),
  },
  {
    key: "createdAt",
    name: "Created",
    render: (value) => formatDate(new Date(value)),
  },
  {
    key: "isActive",
    name: "Active/Deleted",
    render: (_, item) => {
      return renderStatus(item)
    },
  },
]




