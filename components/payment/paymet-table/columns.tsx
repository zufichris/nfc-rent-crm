import { DataTableColumn, renderStatus } from "@/components/misc/table/data-table"
import { Badge } from "@/components/ui/badge"
import { PaymentStatus, type IPayment } from "@/types/payment"
import { Currencies } from "@/types/pricing"
import { formatDate } from "@/utils/format"

export const PaymentTableColumns: DataTableColumn[] = [
  {
    key: "booking.user.fullName",
    name: "Customer",
    render: (value, item: IPayment) => (
      <div className="flex items-center space-x-3">
        <div>
          <div className="font-medium text-foreground">{value}</div>
          <div className="text-sm text-muted-foreground">{item.booking?.car?.name}</div>
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
    name: "Status",
    render: (_, item) => {
      return renderStatus(item)
    },
  },
]

function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const getVariant = () => {
    switch (status) {
      case PaymentStatus.PAID:
        return "success"
      case PaymentStatus.PENDING:
        return "warning"
      case PaymentStatus.PENDING_CAPTURE:
        return "info"
      case PaymentStatus.FAILED:
        return "destructive"
      case PaymentStatus.REFUNDED:
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Badge variant={getVariant()} className="capitalize">
      {status.toLowerCase().replace("_", " ")}
    </Badge>
  )
}

function getCurrencySymbol(currency: Currencies) {
  switch (currency) {
    case Currencies.USD:
      return "$"
    case Currencies.EUR:
      return "€"
    case Currencies.ETH:
      return "Ξ"
    case Currencies.TRON:
      return "TRX"
    case Currencies.AED:
      return "د.إ"
    default:
      return ""
  }
}

