import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PaymentStatus } from "@/types/payment"
import { Currencies } from "@/types/pricing"
import {Calendar, Car, CreditCard, Download, User } from "lucide-react"
import Link from "next/link"

export default async function PaymentDetailPage({ params }:Readonly< { params:{ id: string }}>) {
  const paymentId = params.id

  const payment = {
    id: paymentId,
    booking: {
      id: "b1",
      user: {
        id: "u1",
        fullName: "John Smith",
        email: "john@example.com",
      },
      car: {
        id: "c1",
        name: "Ferrari 488 GTB",
        brand: { name: "Ferrari" },
        model: { name: "488 GTB" },
      },
      pickupDate: new Date("2023-08-15"),
      returnDate: new Date("2023-08-20"),
    },
    amount: 6000,
    currency: Currencies.USD,
    status: PaymentStatus.PAID,
    paymentMethod: "Credit Card",
    paidAt: new Date("2023-08-14"),
    isCrypto: false,
    transactionId: "txn_1234567890",
    paymentMetadata: {
      cardBrand: "Visa",
      last4: "4242",
      expiryMonth: 12,
      expiryYear: 2025,
    },
    refundHistory: [],
    createdAt: new Date("2023-08-14"),
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Payment #{payment.id}</h1>
          <PaymentStatusBadge status={payment.status} />
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Transaction ID: {payment.transactionId}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Amount</h3>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <div className="text-2xl font-bold">
                        {getCurrencySymbol(payment.currency)}
                        {payment.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Payment Method</h3>
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{payment.paymentMethod}</div>
                      {payment.isCrypto && (
                        <Badge variant="outline" className="text-xs">
                          Crypto
                        </Badge>
                      )}
                    </div>
                    {payment?.paymentMetadata?.cardBrand && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {payment.paymentMetadata.cardBrand} •••• {payment.paymentMetadata.last4}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Date</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">
                          {payment.paidAt ? formatDateTime(payment.paidAt) : "Not paid yet"}
                        </div>
                        <div className="text-sm text-muted-foreground">Created: {formatDate(payment.createdAt)}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                    <div className="flex items-center gap-2">
                      <PaymentStatusBadge status={payment.status} />
                      {payment.status === PaymentStatus.PAID && (
                        <span className="text-sm text-muted-foreground">Paid on {formatDate(payment.paidAt)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {payment.refundHistory && payment.refundHistory.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Refund History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payment.refundHistory.map((refund: any, index: number) => (
                    <div key={index+1} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">
                          {getCurrencySymbol(payment.currency)}
                          {refund.amount.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">{formatDateTime(refund.date)}</div>
                      </div>
                      <div>
                        <div className="text-sm">{refund.reason}</div>
                        <div className="text-xs text-muted-foreground">Refund ID: {refund.id}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Booking Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Customer</h3>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Link href={`/customer-management/customers/${payment.booking.user.id}`} className="font-medium hover:underline">
                        {payment.booking.user.fullName}
                      </Link>
                      <div className="text-sm text-muted-foreground">{payment.booking.user.email}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Vehicle</h3>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Link href={`/cars/${payment.booking.car.id}`} className="font-medium hover:underline">
                        {payment.booking.car.name}
                      </Link>
                      <div className="text-sm text-muted-foreground">
                        {payment.booking.car.brand.name} {payment.booking.car.model.name}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Rental Period</h3>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">
                        {formatDate(payment.booking.pickupDate)} - {formatDate(payment.booking.returnDate)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Math.ceil(
                          (payment.booking.returnDate.getTime() - payment.booking.pickupDate.getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        days
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Link href={`/bookings/booking-list/${payment.booking.id}`}>
                    <Button variant="outline" className="w-full">
                      View Booking Details
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}



function PaymentStatusBadge({ status }: Readonly<{ status: PaymentStatus }>) {
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

