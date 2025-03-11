import { notFound } from "next/navigation"
import { getCar } from "@/lib/actions/cars"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import CarForm from "@/components/cars/car-form"

// This is a Server Component
export default async function EditCarPage({ params }: { params: { id: string } }) {
  const car = await getCar(params.id)

  if (!car) {
    notFound()
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/cars/${params.id}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Car Details
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Car</h1>
        <p className="text-muted-foreground mt-2">Update car information</p>
      </div>

      <CarForm car={car} />
    </div>
  )
}

