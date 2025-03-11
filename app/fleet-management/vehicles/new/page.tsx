import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import CarForm from "@/components/cars/car-form"

// This is a Server Component
export default function NewCarPage() {
  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/cars">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Cars
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Car</h1>
        <p className="text-muted-foreground mt-2">Add a new car to your inventory</p>
      </div>

      <CarForm />
    </div>
  )
}

