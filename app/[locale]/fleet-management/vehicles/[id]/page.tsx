import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  CarStatus,
  CarCategory,
  FuelType,
  TransmissionType,
  CarListingType,
  CarCondition,
  CarInspectionStatus,
  ICar,
} from "@/types/car"
import {
  ArrowLeft,
  Calendar,
  Car,
  Clock,
  Fuel,
  Gauge,
  Settings,
  Activity,
  Droplets,
  FileText,
  Star,
  Users,
  Share2,
  Download,
  Printer,
  Heart,
  MessageSquare,
  Zap,
  ShieldCheck,
  Wrench,
  History,
  PlusCircle,
  Trash,
  Pencil,
} from "lucide-react"
import Link from "next/link"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { formatCurrency, formatDate } from "@/utils/format"
import { renderCarStatus } from "@/components/cars/car-table/columns"
import { Image } from "@/components/misc/image"
const car = {
    id: "carId",
    slug: "ferrari-488-gtb",
    vin: "WBADT43483G023549",
    videos: [],
    virtualTourMedia: [],
    listingType: [CarListingType.FOR_RENT],
    condition: CarCondition.EXCELLENT,
    year: 2022,
    category: CarCategory.SPORTS_CAR,
    fuelType: FuelType.GASOLINE,
    transmission: TransmissionType.AUTOMATIC,
    doors: 2,
    seats: 2,
    currentStatus: CarStatus.AVAILABLE,
    mileage: 1200,
    name: "Ferrari 488 GTB",
    brand: { name: "Ferrari", logo: "/placeholder.svg?height=30&width=30" },
    model: { name: "488 GTB" },
    rentalPricings: [{ price: 1200, currency: "USD", unit: "week" }, { price: 50000, currency: "AED", unit: "day" }],
    description:
      "The Ferrari 488 GTB is a mid-engine sports car produced by the Italian automobile manufacturer Ferrari. The car replaced the 458, and was the first mid-engine Ferrari to use a turbocharged V8 since the F40.",
    engineSpecs: {
      type: "3.9L Twin-Turbocharged V8",
      horsepower: 661,
      torque: 561,
      displacement: 3.9,
      acceleration: 3.0,
      topSpeed: 205,
    },
    dimensions: {
      length: 179.8,
      width: 77.9,
      height: 47.8,
      weight: 3252,
      cargoCapacity: 8.1,
    },
    features: [
      {
        id: "1",
        name: "Carbon Ceramic Brakes",
        code: "CCB",
        slug: "carbon-ceramic-brakes",
        category: "SAFETY",
        isHighlighted: true,
        isActive: true,
        description: "High-performance braking system",
        isDeleted: false,
        createdAt: new Date().toDateString(),
      },
      {
        id: "2",
        name: "Leather Interior",
        code: "LI",
        slug: "leather-interior",
        category: "COMFORT",
        isHighlighted: true,
        isActive: true,
        description: "Premium leather upholstery",
        isDeleted: false,
        createdAt: new Date().toDateString(),
      },
      {
        id: "3",
        name: "Navigation System",
        code: "NAV",
        slug: "navigation-system",
        category: "TECHNOLOGY",
        isHighlighted: false,
        isActive: true,
        description: "Built-in GPS navigation",
        isDeleted: false,
        createdAt: new Date().toDateString(),
      },
      {
        id: "4",
        name: "Bluetooth Connectivity",
        code: "BT",
        slug: "bluetooth-connectivity",
        category: "TECHNOLOGY",
        isHighlighted: false,
        isActive: true,
        description: "Wireless device connectivity",
        isDeleted: false,
        createdAt: new Date().toDateString(),
      },
      {
        id: "5",
        name: "Keyless Entry",
        code: "KE",
        slug: "keyless-entry",
        category: "CONVENIENCE",
        isHighlighted: false,
        isActive: true,
        description: "Keyless entry system",
        isDeleted: false,
        createdAt: new Date().toDateString(),
      },
      {
        id: "6",
        name: "Backup Camera",
        code: "BC",
        slug: "backup-camera",
        category: "SAFETY",
        isHighlighted: false,
        isActive: true,
        description: "Rear view camera system",
        isDeleted: false,
        createdAt: new Date().toDateString(),
      },
    ],
    images: [
      { url: "/placeholder.svg?height=600&width=800", type: "image", isThumbnail: false },
      { url: "/placeholder.svg?height=600&width=800", type: "image", isThumbnail: false },
      { url: "/placeholder.svg?height=600&width=800", type: "image", isThumbnail: false },
    ],
    documents: [
      { type: "REGISTRATION", title: "Vehicle Registration", fileUrl: "#", issueDate: new Date("2022-01-15") },
      { type: "INSURANCE", title: "Insurance Policy", fileUrl: "#", issueDate: new Date("2022-01-20") },
    ],
    history: [
      { type: "MAINTENANCE", date: new Date("2022-06-15"), description: "Regular maintenance service" },
      { type: "INSPECTION", date: new Date("2022-03-10"), description: "Annual inspection passed" },
    ],
    createdAt: "2023-01-15",
    inspectionStatus: CarInspectionStatus.PASSED,
    isActive: true,
    isDeleted: false,
    ownershipDetails: [],
    acquisitionDate: "2022-12-01",
    blockchainId: "0x1234567890abcdef",
    color: { name: "Rosso Corsa", code: "#FF0000" },
    deletedAt: null,
    interiorColor: { name: "Nero", code: "#000000" },
    lastInspectionDate: "2023-06-10",
    metadata: {
      description: "Luxury sports car for rent",
      tags: ["luxury", "sports", "italian", "supercar"],
      title: "Ferrari 488 GTB",
    },
    metaverseAssetId: "meta-12345",
    nextInspectionDueDate: "2024-06-10",
    shortDescription: "High-performance Italian sports car",
    updatedAt: "2023-07-20",
    popularity: 98,
    rentalStats: {
      totalRentals: 42,
      averageRating: 4.9,
      reviewCount: 38,
      utilization: 85,
      revenue: 50400,
      popularMonths: ["June", "July", "August"],
    },
    maintenanceSchedule: [
      { type: "Oil Change", dueDate: new Date("2023-09-15"), status: "UPCOMING" },
      { type: "Tire Rotation", dueDate: new Date("2023-10-10"), status: "UPCOMING" },
      { type: "Full Inspection", dueDate: new Date("2023-12-05"), status: "UPCOMING" },
    ],
  }

  export async function generateMetadata({ params }: { params: { id: string } }) {
    return {
      title: `${car.name} | NFC Car Rental Fleet Management`,
      description: `Manage details for ${car.name} - ${car.year} ${car.brand.name} ${car.model.name}. Features ${car.engineSpecs.horsepower}hp, ${car.engineSpecs.type} engine. Current status: ${car.currentStatus}.`,
      openGraph: {
        title: `${car.name} | NFC Car Rental Fleet Management`,
        description: `${car.year} ${car.brand.name} ${car.model.name} - ${car.shortDescription}`,
        images: [car.images[0].url],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${car.name} | NFC Car Rental Fleet Management`,
        description: `${car.year} ${car.brand.name} ${car.model.name} - ${car.shortDescription}`,
        images: [car.images[0].url],
      }
    }
  }

export default async function CarDetailPage({ params }: Readonly<{ params: { id: string } }>) {
  const carId = params.id
  


  return (
    <div className="space-y-6">
      {/* Header with back button and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link href="/cars">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{car.name}</h1>
          <CarStatusBadge status={car.currentStatus} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Printer className="h-4 w-4" />Print
          </Button>
          <Link href={`/fleet-management/vehicles/${carId}/edit`}>
            <Button>
              <Pencil className="h-4 w-4" />Edit Car
              </Button>
          </Link>
          <Button variant={"destructive"}>
            <Trash className="h-4 w-4"/>Delete Car
          </Button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left and middle columns */}
        <div className="md:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative">
              <div className="aspect-video bg-muted relative">
                <Image
                  src={car.images[0].url}
                  alt={car.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-black/70 hover:bg-black/70 text-white border-0">{car.year}</Badge>
                  <Badge className="bg-black/70 hover:bg-black/70 text-white border-0 capitalize">
                    {car.category.replace(/_/g, " ").toLowerCase()}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge className="bg-primary hover:bg-primary text-white border-0">{car.popularity}% Popular</Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 p-2 bg-muted/20">
                {car.images.map((image, index) => (
                  <div key={index} className="aspect-video bg-muted cursor-pointer border rounded-md overflow-hidden">
                    <Image
                      src={image.url}
                      alt={`${car.name} - Image ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
                <div className="aspect-video bg-muted cursor-pointer border rounded-md overflow-hidden flex items-center justify-center">
                  <div className="text-center">
                    <Plus className="h-6 w-6 mx-auto text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">More</span>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Image
                      src={car.brand.logo}
                      alt={car.brand.name}
                      className="h-6 w-6 object-contain"
                    />
                    <h2 className="text-xl font-bold">{car.name}</h2>
                  </div>
                  <div className="text-muted-foreground">
                    {car.brand.name} {car.model.name} • {car.year} • {car.mileage.toLocaleString()} miles
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i + 1}
                        className={`h-5 w-5 ${i < Math.floor(car.rentalStats.averageRating) ? "text-warning fill-warning" : "text-muted"}`}
                      />
                    ))}
                  <span className="ml-1 text-sm font-medium">{car.rentalStats.averageRating}</span>
                  <span className="text-sm text-muted-foreground">({car.rentalStats.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Car className="h-5 w-5 text-muted-foreground mb-1" />
                    <div className="text-sm text-muted-foreground">Type</div>
                    <div className="font-medium capitalize">{car.category.replace(/_/g, " ").toLowerCase()}</div>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Fuel className="h-5 w-5 text-muted-foreground mb-1" />
                    <div className="text-sm text-muted-foreground">Fuel</div>
                    <div className="font-medium capitalize">{car.fuelType.replace(/_/g, " ").toLowerCase()}</div>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Settings className="h-5 w-5 text-muted-foreground mb-1" />
                    <div className="text-sm text-muted-foreground">Transmission</div>
                    <div className="font-medium capitalize">{car.transmission.replace(/_/g, " ").toLowerCase()}</div>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Users className="h-5 w-5 text-muted-foreground mb-1" />
                    <div className="text-sm text-muted-foreground">Capacity</div>
                    <div className="font-medium">{car.seats} Persons</div>
                  </div>
                </div>

                {car.description && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{car.description}</p>
                  </div>
                )}

                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {car.features
                      .filter((f) => f.isHighlighted)
                      .map((feature) => (
                        <div key={feature.id} className="flex items-center gap-2">
                          <div className="rounded-full bg-primary/10 p-1">
                            <Star className="h-4 w-4 text-primary" />
                          </div>
                          <span>{feature.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Stats Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Performance Stats</CardTitle>
              <CardDescription>Key specifications and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Gauge className="h-8 w-8 mb-2 text-primary" />
                  <div className="text-2xl font-bold">{car.engineSpecs.horsepower}</div>
                  <div className="text-sm text-muted-foreground">Horsepower</div>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Activity className="h-8 w-8 mb-2 text-primary" />
                  <div className="text-2xl font-bold">{car.engineSpecs.torque}</div>
                  <div className="text-sm text-muted-foreground">Torque (lb-ft)</div>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Zap className="h-8 w-8 mb-2 text-primary" />
                  <div className="text-2xl font-bold">{car.engineSpecs.acceleration}s</div>
                  <div className="text-sm text-muted-foreground">0-60 mph</div>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Gauge className="h-8 w-8 mb-2 text-primary" />
                  <div className="text-2xl font-bold">{car.engineSpecs.topSpeed}</div>
                  <div className="text-sm text-muted-foreground">Top Speed (mph)</div>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Droplets className="h-8 w-8 mb-2 text-primary" />
                  <div className="text-2xl font-bold">{car.engineSpecs.displacement}L</div>
                  <div className="text-sm text-muted-foreground">Engine Size</div>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Settings className="h-8 w-8 mb-2 text-primary" />
                  <div className="text-sm font-medium text-center">{car.engineSpecs.type}</div>
                  <div className="text-sm text-muted-foreground">Engine Type</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rental Performance Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Rental Performance</CardTitle>
              <CardDescription>Statistics and analytics for this vehicle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex flex-col p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Total Rentals</div>
                  <div className="text-2xl font-bold">{car.rentalStats.totalRentals}</div>
                  <div className="text-xs text-muted-foreground">Last 12 months</div>
                </div>
                <div className="flex flex-col p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Utilization Rate</div>
                  <div className="text-2xl font-bold">{car.rentalStats.utilization}%</div>
                  <Progress value={car.rentalStats.utilization} className="h-2 mt-2" />
                </div>
                <div className="flex flex-col p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Revenue Generated</div>
                  <div className="text-2xl font-bold">{formatCurrency(car.rentalStats.revenue)}</div>
                  <div className="text-xs text-muted-foreground">Total earnings</div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium mb-2">Popular Rental Months</h3>
                <div className="grid grid-cols-12 gap-1 h-20">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                    (month, i) => {
                      const isPopular = car.rentalStats.popularMonths.includes(month)
                      const height = isPopular ? "h-full" : "h-1/3"
                      return (
                        <div key={i} className="flex flex-col items-center justify-end">
                          <div
                            className={`w-full ${height} bg-primary/20 rounded-t-sm ${isPopular ? "bg-primary" : ""}`}
                          ></div>
                          <span className="text-xs mt-1">{month.charAt(0)}</span>
                        </div>
                      )
                    },
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Pricing and booking */}
        <div>
          <Card className="sticky top-6">
            <CardHeader className="pb-2">
              <CardTitle>Rental Pricing</CardTitle>
              <CardDescription>Rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Daily Rate</span>
                <span className="text-2xl font-bold">${car.rentalPricings[0].price}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Weekly Rate</span>
                <div className="text-right">
                  <span className="text-xl font-bold">${car.rentalPricings[0].price * 6}</span>
                  <div className="text-xs text-green-600">Save $1,200</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Monthly Rate</span>
                <div className="text-right">
                  <span className="text-xl font-bold">${car.rentalPricings[0].price * 25}</span>
                  <div className="text-xs text-green-600">Save $5,000</div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Insurance included</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span>24/7 roadside assistance</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Wrench className="h-4 w-4 text-primary" />
                <span>Maintenance included</span>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle>Vehicle Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <span>Current Status</span>
                  </div>
                  {renderCarStatus(car as any)}
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-muted-foreground" />
                    <span>Condition</span>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {car.condition.replace(/_/g, " ").toLowerCase()}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Last Inspection</span>
                  </div>
                  <span className="text-sm">{formatDate(new Date(car.lastInspectionDate))}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle>Maintenance Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {car.maintenanceSchedule.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{item.type}</div>
                      <div className="text-xs text-muted-foreground">Due: {formatDate(item.dueDate)}</div>
                    </div>
                    <Badge
                      variant={
                        item.status === "COMPLETED" ? "success" : item.status === "UPCOMING" ? "outline" : "warning"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Wrench className="h-4 w-4 mr-2" />
                View Full Schedule
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Tabs component with all the tabs */}
      <Tabs defaultValue="specs" className="mt-6">
        <TabsList className="grid grid-cols-6 md:w-auto">
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="similar">Similar Cars</TabsTrigger>
        </TabsList>

        {/* Specifications Tab */}
        <TabsContent value="specs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Engine & Performance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Engine Type</span>
                      <span>{car.engineSpecs.type}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Horsepower</span>
                      <span>{car.engineSpecs.horsepower} hp</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Torque</span>
                      <span>{car.engineSpecs.torque} lb-ft</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Displacement</span>
                      <span>{car.engineSpecs.displacement} L</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Acceleration (0-60 mph)</span>
                      <span>{car.engineSpecs.acceleration} sec</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Top Speed</span>
                      <span>{car.engineSpecs.topSpeed} mph</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transmission</span>
                      <span className="capitalize">{car.transmission.replace(/_/g, " ").toLowerCase()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fuel Type</span>
                      <span className="capitalize">{car.fuelType.replace(/_/g, " ").toLowerCase()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Dimensions & Capacity</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Length</span>
                      <span>{car.dimensions.length} in</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Width</span>
                      <span>{car.dimensions.width} in</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Height</span>
                      <span>{car.dimensions.height} in</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight</span>
                      <span>{car.dimensions.weight} lbs</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cargo Capacity</span>
                      <span>{car.dimensions.cargoCapacity} cu ft</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seating Capacity</span>
                      <span>{car.seats} persons</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Doors</span>
                      <span>{car.doors}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Exterior Color</span>
                      <div className="flex items-center gap-2">
                        {car.color.name}
                        <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: car.color.code }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Features & Amenities</CardTitle>
              <CardDescription>This car comes with the following features and amenities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Group features by category */}
                {Object.entries(
                  car.features.reduce(
                    (acc, feature) => {
                      const category = feature.category
                      if (!acc[category]) acc[category] = []
                      acc[category].push(feature)
                      return acc
                    },
                    {} as Record<string, typeof car.features>,
                  ),
                ).map(([category, features]) => (
                  <div key={category} className="space-y-2">
                    <h3 className="text-lg font-semibold capitalize">{category.toLowerCase()}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {features.map((feature) => (
                        <div key={feature.id} className="flex flex-col p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{feature.name}</span>
                            {feature.isHighlighted && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Highlighted Feature</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">{feature.description}</span>
                          <div className="mt-2 flex items-center gap-1">
                            <Badge variant="outline" className="text-xs">
                              {feature.code}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Vehicle documentation and certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {car.documents.map((doc, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{doc.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {doc.type.replace(/_/g, " ")} • Issued: {formatDate(new Date(doc.issueDate))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                          <FileText className="mr-2 h-4 w-4" />
                          View
                        </a>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <PlusCircle className="h-4 w-4 mr-2" />
                Upload New Document
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle History</CardTitle>
              <CardDescription>Maintenance and service history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 space-y-6">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-muted-foreground/20"></div>

                {car.history.map((record, index) => (
                  <div key={index+1} className="relative">
                    <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary -translate-x-[4.5px]"></div>
                    <div className="pl-6">
                      <div className="font-medium">{record.type.replace(/_/g, " ")}</div>
                      <div className="text-sm text-muted-foreground">{formatDate(new Date(record.date))}</div>
                      <div className="mt-1 text-sm">{record.description}</div>
                    </div>
                  </div>
                ))}

                <div className="relative">
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary -translate-x-[4.5px]"></div>
                  <div className="pl-6">
                    <div className="font-medium">ACQUISITION</div>
                    <div className="text-sm text-muted-foreground">{formatDate(new Date(car.acquisitionDate))}</div>
                    <div className="mt-1 text-sm">Vehicle added to fleet</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <History className="h-4 w-4 mr-2" />
                View Complete History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>What our customers say about this car</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(car.rentalStats.averageRating) ? "text-warning fill-warning" : "text-muted"}`}
                        />
                      ))}
                  </div>
                  <div className="text-lg font-bold">{car.rentalStats.averageRating}</div>
                  <div className="text-sm text-muted-foreground">({car.rentalStats.reviewCount} reviews)</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Sample reviews */}
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">John Doe</div>
                        <div className="text-xs text-muted-foreground">Rented for 3 days</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                          />
                        ))}
                    </div>
                  </div>
                  <p className="text-sm">
                    Absolutely amazing car! The Ferrari 488 GTB exceeded all my expectations. The power, handling, and
                    overall experience were incredible. Would definitely rent again for a special occasion.
                  </p>
                  <div className="text-xs text-muted-foreground mt-2">July 15, 2023</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>AS</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Alice Smith</div>
                        <div className="text-xs text-muted-foreground">Rented for 1 day</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 4 ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                          />
                        ))}
                    </div>
                  </div>
                  <p className="text-sm">
                    Great car, but the pickup process took longer than expected. The car itself was in perfect condition
                    and a joy to drive. The sound of the engine is unforgettable!
                  </p>
                  <div className="text-xs text-muted-foreground mt-2">August 3, 2023</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                View All Reviews
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Similar Cars Tab */}
        <TabsContent value="similar">
          <Card>
            <CardHeader>
              <CardTitle>Similar Vehicles</CardTitle>
              <CardDescription>Other cars you might be interested in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sample similar cars */}
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className="aspect-video bg-muted relative">
                        <Image
                          src="/placeholder.svg?height=200&width=400"
                          alt={`Similar Car ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold">
                          {index === 0 ? "Lamborghini Huracán" : index === 1 ? "McLaren 720S" : "Porsche 911 Turbo S"}
                        </h3>
                        <p className="text-sm text-muted-foreground">2023 • Available</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="font-medium">
                            ${index === 0 ? "1,500" : index === 1 ? "1,400" : "1,100"}/day
                          </div>
                          <Link href={`/fleet-management/vehicles/${index + 10}`}>
                            <Button size="sm">View Details</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper component for car status badge
function CarStatusBadge({ status }: { status: CarStatus }) {
  const getVariant = () => {
    switch (status) {
      case CarStatus.AVAILABLE:
        return "success"
      case CarStatus.RENTED:
        return "default"
      case CarStatus.RESERVED:
        return "warning"
      case CarStatus.IN_MAINTENANCE:
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <Badge variant={getVariant()} className="capitalize">
      {status.replace(/_/g, " ").toLowerCase()}
    </Badge>
  )
}

// Helper component for the Plus icon
function Plus({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

