import { notFound } from "next/navigation"
import { getCar } from "@/lib/actions/cars"
import { CarDetails } from "@/components/cars/car-details"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

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
      <CarDetails car={res.data} />
    </>
  )
}

