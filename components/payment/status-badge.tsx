import { PaymentStatus } from "@/types/payment"
import { Badge } from "../ui/badge"
import { getVariant, Variant } from "../theme/variants"
import { cn } from "@/lib/utils"

export function PaymentStatusBadge({ status }: Readonly<{ status: PaymentStatus }>) {


    return (
        <Badge className={cn("capitalize", getVariant(variant(), {
            invert: true
        }))}>
            {status.toLowerCase().replace("_", " ")}
        </Badge>
    )
    function variant(): Variant {
        switch (status) {
            case PaymentStatus.PAID:
                return "success"
            case PaymentStatus.PENDING:
                return "warning"
            case PaymentStatus.PENDING_CAPTURE:
                return "ghost"
            case PaymentStatus.FAILED:
                return "destructive"
            case PaymentStatus.REFUNDED:
                return "info"
            default:
                return "secondary"
        }
    }
}