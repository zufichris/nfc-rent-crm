import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { getBrands } from "@/lib/actions/brands"

export default async function BrandsPage() {
  const res = await getBrands()
  if (!res.success) {
    return <>{res.message}</>
  }
  const brands = res.data
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Brands</h1>
        <p className="text-muted-foreground">Manage your brands and their details</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => {
          const translation = brand.translations[0]
          return (
            <Card key={brand.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{translation.name}</CardTitle>
                <div className="flex items-center space-x-1">
                  <div className="text-sm font-medium text-muted-foreground">{brand.code}</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {brand.logo && (
                    <div className="flex justify-center mb-2">
                      <Image
                        src={brand.logo || "/placeholder.svg"}
                        alt={translation.name}
                        width={100}
                        height={100}
                        className="object-contain h-20"
                      />
                    </div>
                  )}
                  <CardDescription>{translation.shortDescription}</CardDescription>
                  <div className="mt-4">
                    <Link href={`/brands/${brand.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

