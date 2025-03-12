import { CarForm } from "@/components/cars/car-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewCarPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Create Car</CardTitle>
        <CardDescription className="text-muted-foreground">
          Create new Vehicle with AI-powered suggestions and multi-language support.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CarForm />
      </CardContent>
    </Card>
  )
}

