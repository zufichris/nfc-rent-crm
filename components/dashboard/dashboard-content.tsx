import { Truck, AlertTriangle, MapPin, Clock } from "lucide-react"
import { StatCard } from "@/components/misc/stat-card"
import { VehicleOverview } from "@/components/dashboard/vehicle-overview"
import { ShipmentStatistics } from "@/components/dashboard/shipment-statistics"
import { DeliveryPerformance } from "@/components/dashboard/delivery-performance"
import { DeliveryExceptions } from "@/components/dashboard/delivery-exceptions"
import { OrdersByCountries } from "@/components/dashboard/orders-by-countries"
import { CarStatus, ICar } from "@/types/car"
import { BookingStatus, IBooking } from "@/types/bookings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { formatDate } from "@/utils/format"
import Link from "next/link"
import { Button } from "../ui/button"
import { Image } from "../misc/image"
import { renderBookingStatus } from "../bookings/bookings-table/columns"
import { renderCarStatus } from "../cars/car-table/columns"

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Truck className="h-6 w-6" />}
          title="On route vehicles"
          value="42"
          change="+18.2%"
          subtitle="than last week"
          variant="info"
        />
        <StatCard
          icon={<AlertTriangle className="h-6 w-6" />}
          title="Vehicles with errors"
          value="8"
          change="-8.7%"
          subtitle="than last week"
          variant="warning"
        />
        <StatCard
          icon={<MapPin className="h-6 w-6" />}
          title="Deviated from route"
          value="27"
          change="+4.3%"
          subtitle="than last week"
          variant="destructive"
        />
        <StatCard
          icon={<Clock className="h-6 w-6" />}
          title="Late vehicles"
          value="13"
          change="+2.5%"
          subtitle="than last week"
          variant="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VehicleOverview />
        <ShipmentStatistics />
      </div>
      {renderRecent()}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DeliveryPerformance />
        <DeliveryExceptions />
        <OrdersByCountries />
      </div>
      
    </div>
  )
}

function renderRecent(){
  return (
    <Tabs defaultValue="recent-bookings">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto">
          <TabsTrigger value="recent-bookings">Recent Bookings</TabsTrigger>
          <TabsTrigger value="available-cars">Available Cars</TabsTrigger>
        </TabsList>
        <TabsContent value="recent-bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col">
                      <div className="font-medium">{booking.car.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {booking.user.fullName} • {formatDate(booking.pickupDate)} - {formatDate(booking.returnDate)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                     {renderBookingStatus(booking as IBooking)}
                      <Link href={`/bookings/${booking.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/bookings/booking-list">
                  <Button variant="outline">View All Bookings</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="available-cars" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Cars</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {availableCars.map((car) => (
                  <div
                    key={car.id}
                    className="flex flex-col border rounded-lg overflow-hidden hover:shadow-md transition-all"
                  >
                    <div className="aspect-video bg-muted relative">
                      <Image
                        src="/placeholder.svg?height=200&width=400"
                        alt={car.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2">
                       {renderCarStatus(car as ICar)}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{car.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {car.year} • {car.category.replace(/_/g, " ").toLowerCase()}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="font-medium">${car.rentalPricings[0].price}/day</div>
                        <Link href={`/fleet-management/vehicles/${car.id}`}>
                          <Button size="sm">View Details</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/fleet-management/vehicles">
                  <Button variant="outline">View All Cars</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
  )
}


const recentBookings = [
  {
    id: "1",
    user: { fullName: "John Smith", email: "john@example.com" },
    driver: { firstName: "John", lastName: "Smith" },
    car: { name: "Ferrari 488 GTB" },
    pickupDate: new Date("2023-08-15"),
    returnDate: new Date("2023-08-20"),
    totalAmount: 6000,
    status: BookingStatus.CONFIRMED,
  },
  {
    id: "2",
    user: { fullName: "Emma Johnson", email: "emma@example.com" },
    driver: { firstName: "Emma", lastName: "Johnson" },
    car: { name: "Lamborghini Huracán" },
    pickupDate: new Date("2023-08-18"),
    returnDate: new Date("2023-08-25"),
    totalAmount: 10500,
    status: BookingStatus.PENDING,
  },
  {
    id: "3",
    user: { fullName: "Michael Brown", email: "michael@example.com" },
    driver: { firstName: "Michael", lastName: "Brown" },
    car: { name: "Tesla Model S" },
    pickupDate: new Date("2023-08-10"),
    returnDate: new Date("2023-08-14"),
    totalAmount: 3200,
    status: BookingStatus.ACTIVE,
  },
]

const availableCars = [
  {
    id: "1",
    slug: "ferrari-488-gtb",
    vin: "WBADT43483G023549",
    year: 2022,
    category: "SPORTS_CAR",
    fuelType: "GASOLINE",
    transmission: "AUTOMATIC",
    doors: 2,
    seats: 2,
    currentStatus: CarStatus.AVAILABLE,
    mileage: 1200,
    name: "Ferrari 488 GTB",
    brand: { name: "Ferrari", logo: "/placeholder.svg?height=30&width=30" },
    model: { name: "488 GTB" },
    rentalPricings: [{ price: 1200, currency: "USD", unit: "day" }],
  },
  {
    id: "3",
    slug: "tesla-model-s",
    vin: "5YJSA1E40FF000001",
    year: 2023,
    category: "ELECTRIC_LUXURY",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    doors: 4,
    seats: 5,
    currentStatus: CarStatus.AVAILABLE,
    mileage: 2500,
    name: "Tesla Model S",
    brand: { name: "Tesla", logo: "/placeholder.svg?height=30&width=30" },
    model: { name: "Model S" },
    rentalPricings: [{ price: 800, currency: "USD", unit: "day" }],
  },
  {
    id: "4",
    slug: "rolls-royce-phantom",
    vin: "SCA1S68030UX00001",
    year: 2022,
    category: "LUXURY_SEDAN",
    fuelType: "GASOLINE",
    transmission: "AUTOMATIC",
    doors: 4,
    seats: 5,
    currentStatus: CarStatus.AVAILABLE,
    mileage: 1500,
    name: "Rolls-Royce Phantom",
    brand: { name: "Rolls-Royce", logo: "/placeholder.svg?height=30&width=30" },
    model: { name: "Phantom" },
    rentalPricings: [{ price: 2000, currency: "USD", unit: "day" }],
  },
]
