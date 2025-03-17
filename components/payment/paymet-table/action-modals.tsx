"use client"

import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CreditCard, User } from "lucide-react"
import { Currencies } from "@/types/pricing"
import { PaymentStatus } from "@/types/payment"

export function PaymentDetailModal({
  payment,
  open,
  onClose,
}: {
  payment: any
  open: boolean
  onClose: () => void
}) {
  const router = useRouter()

  const handleViewFullDetails = () => {
    router.push(`/payments/${payment.id}`)
    onClose()
  }

  const formatDate = (date: Date | undefined) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getCurrencySymbol = (currency: Currencies) => {
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Payment #{payment.id}
            <PaymentStatusBadge status={payment.status} />
          </DialogTitle>
          <DialogDescription>Transaction details and information</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="details">Payment Details</TabsTrigger>
            <TabsTrigger value="booking">Booking Info</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <CreditCard className="h-10 w-10 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Amount</div>
                  <div className="text-2xl font-bold">
                    {getCurrencySymbol(payment.currency)}
                    {payment.amount.toLocaleString()}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Method</div>
                <div className="font-medium flex items-center gap-2">
                  {payment.paymentMethod}
                  {payment.isCrypto && (
                    <Badge variant="outline" className="text-xs">
                      Crypto
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">{payment.paidAt ? formatDate(payment.paidAt) : "Not paid yet"}</div>
                <div className="text-sm text-muted-foreground">Payment Date</div>
              </div>
            </div>

            {payment.isCrypto && payment.cryptoAddress && (
              <div className="p-4 border rounded-lg">
                <div className="text-sm font-medium mb-1">Crypto Address</div>
                <div className="font-mono text-sm">{payment.cryptoAddress}</div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="booking" className="space-y-4 mt-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">{payment.booking.user.fullName}</div>
                <div className="text-sm text-muted-foreground">Customer</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="text-sm font-medium mb-2">Rental Details</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vehicle:</span>
                  <span>{payment.booking.car.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pickup Date:</span>
                  <span>{formatDate(payment.booking.pickupDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Return Date:</span>
                  <span>{formatDate(payment.booking.returnDate)}</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleViewFullDetails}>View Full Details</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const getVariant = () => {
    switch (status) {
      case PaymentStatus.PAID:
        return "success"
      case PaymentStatus.PENDING:
        return "warning"
      case PaymentStatus.PENDING_CAPTURE:
        return "secondary"
      case PaymentStatus.FAILED:
        return "destructive"
      case PaymentStatus.REFUNDED:
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Badge variant={getVariant() as any} className="capitalize">
      {status.toLowerCase().replace("_", " ")}
    </Badge>
  )
}

