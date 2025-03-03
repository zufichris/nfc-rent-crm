import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Globe, Hash, Link2 } from "lucide-react"
import { getBrandById } from "@/lib/actions/brands"

export default async function BrandDetailsPage({
  params,
}: Readonly<{
  params: { id: string }
}>) {
  const res = await getBrandById(Number.parseInt(params.id))

  if (!res.success) {
    notFound()
  }
  const brand = res.data

  const translation = brand.translations[0]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Brand Details</h1>
        <Link href="/brands">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Brands
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{translation.name}</CardTitle>
              <CardDescription>Brand ID: {brand.id}</CardDescription>
            </div>
            <div className="text-sm font-medium">Code: {brand.code}</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {(brand.logo || brand.coverImage) && (
            <div className="flex flex-col items-center gap-4">
              {brand.logo && (
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={translation.name}
                  width={150}
                  height={150}
                  className="object-contain"
                />
              )}
              {brand.coverImage && (
                <Image
                  src={brand.coverImage || "/placeholder.svg"}
                  alt={`${translation.name} cover`}
                  width={600}
                  height={300}
                  className="object-cover w-full h-40 rounded-md"
                />
              )}
            </div>
          )}

          <div className="grid gap-4">
            <div className="space-y-1">
              <div className="text-sm font-medium text-muted-foreground">Short Description</div>
              <div>{translation.shortDescription}</div>
            </div>

            {translation.description && (
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Description</div>
                <div>{translation.description}</div>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Slug</div>
                <div className="flex items-center">
                  <Link2 className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{brand.slug}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Code</div>
                <div className="flex items-center">
                  <Hash className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{brand.code}</span>
                </div>
              </div>
            </div>
          </div>

          {(translation.metaTitle || translation.metaDescription || translation.metaTags) && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-2">SEO Information</div>
              <div className="space-y-2 border rounded-md p-4">
                {translation.metaTitle && (
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-muted-foreground">Meta Title</div>
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{translation.metaTitle}</span>
                    </div>
                  </div>
                )}

                {translation.metaDescription && (
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-muted-foreground">Meta Description</div>
                    <div>{translation.metaDescription}</div>
                  </div>
                )}

                {translation.metaTags && (
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-muted-foreground">Meta Tags</div>
                    <div>{translation.metaTags}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

