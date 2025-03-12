import { notFound } from "next/navigation"
import { getCar } from "@/lib/actions/cars"
import { CarForm } from "@/components/cars/car-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
export default async function EditCarPage({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params
  const res = await getCar(id)

  if (!res.success) {
    notFound()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="tracking-tight">Edit Car</CardTitle>
        <CardDescription className="text-muted-foreground">
          Update vehicle information with AI-powered suggestions and multi-language support.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CarForm car={res.data} />
      </CardContent>
    </Card>
  )
}

