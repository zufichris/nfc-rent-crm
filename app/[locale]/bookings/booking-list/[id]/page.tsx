import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Car, CreditCard, MapPin, User } from "lucide-react"
import Link from "next/link"
import { BookingStatus} from "@/types/bookings"
import { PaymentStatus } from "@/types/payment"
import { renderBookingStatus } from "@/components/bookings/bookings-table/columns"
import { IDriver, IUser } from "@/types/user"
import { CarCategory } from "@/types/car"
import { formatDate, formatDateTime } from "@/utils/format"
import { PaymentStatusBadge } from "@/components/payment/status-badge"
import { Image } from "@/components/misc/image"

export default async function BookingDetailPage({ params }: Readonly<{ params: { id: string } }>) {
  const bookingId = params.id
  const booking={
    id: bookingId,
    user: {
      id: "u1",
      fullName: "John Smith",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
    } as IUser,
      
    driver: {
      id: "d1",
      firstName: "John",
      lastName: "Smith",
      licenseNumber: "DL12345678",
      licenseExpiryDate: new Date("2025-06-15"),
    }as IDriver,
    car: {
      id: "c1",
      name: "Ferrari 488 GTB",
      brand: { name: "Ferrari" },
      model: { name: "488 GTB" },
      year: 2022,
      category:CarCategory.SPORTS_CAR,
      image: "/placeholder.svg?height=200&width=400",
    },
    pickupDate: new Date("2023-08-15T10:00:00"),
    returnDate: new Date("2023-08-20T18:00:00"),
    pickupLocation: "Dubai Marina Branch",
    returnLocation: "Dubai Marina Branch",
    totalAmount: 6000,
    status: BookingStatus.CONFIRMED,
    payment: {
      id: "p1",
      amount: 6000,
      currency: "USD",
      status: PaymentStatus.PAID,
      paymentMethod: "Credit Card",
      paidAt: new Date("2023-08-14"),
    },
    selectedAddons: [
      { name: "Insurance Premium", description: "Full coverage insurance", amount: 500 },
      { name: "GPS Navigation", description: "Built-in GPS system", amount: 100 },
    ],
    priceBreakdown: {
      baseRate: 1200,
      days: 5,
      subtotal: 5400,
      addons: 600,
      total: 6000,
    },
    notes: "Customer requested car to be ready by 9:30 AM for early pickup.",
    createdAt: new Date("2023-08-10"),
  } as any

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link href="/bookings/booking-list">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Booking #{booking.id}</h1>
          {renderBookingStatus(booking)}
        </div>
        <div className="flex items-center gap-2">
          <Button>Print Receipt</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>Created on {formatDate(new Date(booking.createdAt))}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Rental Period</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">
                          {formatDateTime(booking.pickupDate)} - {formatDateTime(booking.returnDate)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {Math.ceil(
                            (booking.returnDate.getTime() - booking.pickupDate.getTime()) / (1000 * 60 * 60 * 24),
                          )}{" "}
                          days
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Pickup & Return Location</h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{booking.pickupLocation}</div>
                        {booking?.pickupLocation !== booking.returnLocation && (
                          <div className="text-sm text-muted-foreground">Return: {booking.returnLocation}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Customer</h3>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{booking.user.fullName}</div>
                        <div className="text-sm text-muted-foreground">
                          {booking.user.email} • {booking.user.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Payment</h3>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">${booking.payment.amount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          {booking.payment.paymentMethod} •
                          <PaymentStatusBadge status={booking.payment.status} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {booking.notes && (
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Notes</h3>
                  <p className="text-sm">{booking.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Vehicle</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video bg-muted relative">
                <Image
                  src={booking.car.image}
                  alt={booking.car.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{booking.car.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {booking.car.brand.name} {booking.car.model.name} • {booking.car.year}
                </p>
                <div className="mt-2">
                  <Link href={`/fleet-management/vehicles/${booking.car.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      <Car className="h-4 w-4 mr-2" />
                      View Car Details
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="price-breakdown">
        <TabsList className="grid grid-cols-2 md:w-auto">
          <TabsTrigger value="price-breakdown">Price Breakdown</TabsTrigger>
          <TabsTrigger value="driver-info">Driver Information</TabsTrigger>
        </TabsList>
        <TabsContent value="price-breakdown">
          <Card>
            <CardHeader>
              <CardTitle>Price Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Base Rate</span>
                  <span>${booking.priceBreakdown.baseRate}/day</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Rental Period</span>
                  <span>{booking.priceBreakdown.days} days</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${booking.priceBreakdown.subtotal}</span>
                </div>

                {booking.selectedAddons.map((addon:any, index:number) => (
                  <div key={index+1} className="flex justify-between py-2 border-b">
                    <div>
                      <div className="text-muted-foreground">{addon.name}</div>
                      <div className="text-xs text-muted-foreground">{addon.description}</div>
                    </div>
                    <span>${addon.amount}</span>
                  </div>
                ))}

                <div className="flex justify-between py-2 font-bold">
                  <span>Total</span>
                  <span>${booking.priceBreakdown.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="driver-info">
          <Card>
            <CardHeader>
              <CardTitle>Driver Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Driver Name</h3>
                    <p>
                      {booking.driver.firstName} {booking.driver.lastName}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">License Number</h3>
                    <p>{booking.driver.licenseNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">License Expiry</h3>
                    <p>{formatDate(booking.driver.licenseExpiryDate)}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">License Front</h3>
                    <div className="aspect-[4/3] bg-muted rounded-md flex items-center justify-center">
                      <Image
                        src="/placeholder.svg?height=150&width=200"
                        alt="License Front"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">License Back</h3>
                    <div className="aspect-[4/3] bg-muted rounded-md flex items-center justify-center">
                      <Image
                        src="/placeholder.svg?height=150&width=200"
                        alt="License Back"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

