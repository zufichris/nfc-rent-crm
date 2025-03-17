import { notFound } from "next/navigation"
import { getCar } from "@/lib/actions/cars"
import { CarDetails } from "@/components/cars/car-details"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { CarCategory, CarCondition, CarInspectionStatus, CarListingType, CarStatus, FuelType, ICarMedia, TransmissionType } from "@/types/car"
import { IBrand, ICarDocument, ICarHistoryRecord, IModel } from "@/types/brand"
import { RentalPricingDto } from "@/types/pricing"

export default async function CarDetailsPage({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params

  const res = await getCar(id)

  if (!res.success) {
    notFound()
  }

  return (
    <>
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/fleet-management/vehicles">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Cars
          </Link>
        </Button>
      </div>
      <CarDetails car={{
        id: "unique-id-123",
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
        brand: { name: "Ferrari", logo: "/placeholder.svg?height=30&width=30" } as IBrand,
        model: { name: "488 GTB" } as IModel,
        rentalPricings: [{ price: 1200, currency: "USD", unit: "day" }] as RentalPricingDto[],
        description:
          "The Ferrari 488 GTB is a mid-engine sports car produced by the Italian automobile manufacturer Ferrari. The car replaced the 458 and was the first mid-engine Ferrari to use a turbocharged V8 since the F40.",
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
          { id: "1", name: "Carbon Ceramic Brakes", code: "CCB", slug: "carbon-ceramic-brakes", category: "SAFETY", isHighlighted: false, isActive: true, description: "High-performance braking system", isDeleted: false, createdAt: new Date().toISOString() },
          { id: "2", name: "Leather Interior", code: "LI", slug: "leather-interior", category: "COMFORT", isHighlighted: false, isActive: true, description: "Premium leather upholstery", isDeleted: false, createdAt: new Date().toISOString() },
          { id: "3", name: "Navigation System", code: "NAV", slug: "navigation-system", category: "TECHNOLOGY", isHighlighted: false, isActive: true, description: "Built-in GPS navigation", isDeleted: false, createdAt: new Date().toISOString() },
          { id: "4", name: "Bluetooth Connectivity", code: "BT", slug: "bluetooth-connectivity", category: "TECHNOLOGY", isHighlighted: false, isActive: true, description: "Wireless device connectivity", isDeleted: false, createdAt: new Date().toISOString() },
          { id: "5", name: "Keyless Entry", code: "KE", slug: "keyless-entry", category: "CONVENIENCE", isHighlighted: false, isActive: true, description: "Keyless entry system", isDeleted: false, createdAt: new Date().toISOString() },
          { id: "6", name: "Backup Camera", code: "BC", slug: "backup-camera", category: "SAFETY", isHighlighted: false, isActive: true, description: "Rear view camera system", isDeleted: false, createdAt: new Date().toISOString() },
        ],
        images: [
          { url: "/placeholder.svg?height=600&width=800", type: "image", isThumbnail: false },
          { url: "/placeholder.svg?height=600&width=800", type: "image", isThumbnail: false },
          { url: "/placeholder.svg?height=600&width=800", type: "image", isThumbnail: false },
        ] as ICarMedia[],
        documents: [
          { type: "REGISTRATION", title: "Vehicle Registration", fileUrl: "#", issueDate: new Date("2022-01-15") },
          { type: "INSURANCE", title: "Insurance Policy", fileUrl: "#", issueDate: new Date("2022-01-20") },
        ] as ICarDocument[],
        history: [
          { type: "MAINTENANCE", date: new Date("2022-06-15"), description: "Regular maintenance service" },
          { type: "INSPECTION", date: new Date("2022-03-10"), description: "Annual inspection passed" },
        ] as ICarHistoryRecord[],
        createdAt: new Date().toISOString(),
        inspectionStatus: CarInspectionStatus.PASSED,
        isActive: true,
        isDeleted: false,
        ownershipDetails: [
          {
            id: "1",
            acquiredDate: new Date("2022-01-01"),
            createdAt: new Date().toISOString(),
            isActive: true,
            isDeleted: false,
            ownerType: "User",
            percentage: 100,
            status: "Active",
            owner: "John Doe",
            updatedAt: new Date().toISOString(),
          },
        ],
        acquisitionDate: new Date("2022-01-01").toISOString(),
        blockchainId: "0x123abc456def",
        color: { name: "Black", code: "#f000" },
        interiorColor: { name: "Black", code: "" },
        lastInspectionDate: new Date("2023-01-15").toISOString(),
        metadata: {
          description: "High-performance mid-engine Ferrari available for rent.",
          tags: ["Ferrari", "Luxury", "Sports Car", "Turbocharged"],
          title: "Ferrari 488 GTB Rental",
        },
        nextInspectionDueDate: new Date("2024-01-15").toISOString(),
        shortDescription: "A high-performance Ferrari 488 GTB available for rent with premium features.",
        updatedAt: new Date().toISOString(),
      }} />
    </>
  )
}

