import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building, Car, Tag } from "lucide-react"
import Link from "next/link"
import type { IModel, IBrand } from "@/types/brand"
import { formatDate } from "@/utils/format"
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip" 

const brand: IBrand = {
    id: "1",
    name: "Ferrari",
    code: "ferrari",
    slug: "ferrari",
    logo: "/placeholder.svg?height=30&width=30",
    isActive: true,
    isDeleted: false,
    createdAt: "2023-01-01",
    metadata: {
      title: "Ferrari",
      description: "Italian luxury sports car manufacturer",
      tags: ["luxury", "sports", "italian"],
    },
  }

  const model: IModel = {
    id: "modelId",
    name: "488 GTB",
    code: "488-gtb",
    slug: "488-gtb",
    brand: brand,
    shortDescription: "Mid-engine sports car manufactured by Ferrari.",
    description:
      "The Ferrari 488 GTB is a mid-engine sports car produced by the Italian automobile manufacturer Ferrari. The car replaced the 458, and was the first mid-engine Ferrari to use a turbocharged V8 since the F40.\n\nThe car is powered by a 3.9-litre twin-turbocharged V8 engine, smaller in displacement but generating a higher power output than the 458's naturally aspirated engine. The 488 GTB was named 'The Supercar of the Year 2015' by car magazine Top Gear.",
    metadata: {
      title: "Ferrari 488 GTB",
      description: "Mid-engine sports car by Ferrari",
      tags: ["sports", "v8", "turbo", "ferrari", "italian"],
    },
    isActive: true,
    isDeleted: false,
    createdAt: "2023-01-05",
  }

  export async function generateMetadata({ params }: { params: { id: string } }) {
    return {
      title: `${model.name} | Fleet Management - NFC Rental CRM`,
      description: model.shortDescription || `Details and specifications for ${model.name} model by ${model.brand?.name}`,
      keywords: model.metadata?.tags?.join(", ") || `car rental, ${model.brand?.name}, ${model.name}`,
      openGraph: {
        title: `${model.name} | NFC Rental CRM`,
        description: model.shortDescription,
        type: 'article',
        images: [{
          url: model.brand?.logo || '/placeholder.svg',
          width: 800,
          height: 600,
          alt: `${model.name} by ${model.brand?.name}`
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: `${model.name} | NFC Rental CRM`,
        description: model.shortDescription
      }
    }
  }
export default async function ModelDetailPage({ params }: Readonly<{ params: { id: string } }>) {
  const modelId = params.id
 

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{model.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Code: {model.code}</span>
              {model.brand && (
                <>
                  <span>•</span>
                  <Link href={`/brands/${model.brand.id}`} className="flex items-center gap-1 hover:text-primary">
                    <Building className="h-3 w-3" />
                    <span>{model.brand.name}</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/models/${modelId}/edit`}>
                  <Button variant="outline">Edit Model</Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit this model's details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>View Cars</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View all cars of this model</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Model Information</CardTitle>
              <CardDescription>Details about the model</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {model.description && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Description</h3>
                    <p className="text-sm whitespace-pre-line">{model.description}</p>
                  </div>
                )}

                {model.brand && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Brand</h3>
                    <div className="flex items-center gap-2 p-3 border rounded-lg">
                      {model.brand.logo && (
                        <img
                          src={model.brand.logo || "/placeholder.svg"}
                          alt={model.brand.name}
                          className="h-8 w-8 object-contain"
                        />
                      )}
                      <div>
                        <div className="font-medium">{model.brand.name}</div>
                        <Link href={`/brands/${model.brand.id}`} className="text-xs text-primary hover:underline">
                          View brand details
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {model.metadata && model.metadata.tags && model.metadata.tags.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {model.metadata.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Model Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-muted-foreground" />
                    <span>Cars</span>
                  </div>
                  <span className="font-bold">12</span>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-muted-foreground" />
                    <span>Tags</span>
                  </div>
                  <span className="font-bold">{model.metadata?.tags?.length || 0}</span>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <span>Status</span>
                  </div>
                  <Badge variant={model.isActive ? "success" : "destructive"}>
                    {model.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>{formatDate(new Date(model.createdAt))}</span>
                </div>
                {model.updatedAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Updated</span>
                    <span>{formatDate(new Date(model.updatedAt))}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID</span>
                  <span className="font-mono text-xs">{model.id}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="cars">
        <TabsList className="grid grid-cols-2 md:w-auto">
          <TabsTrigger value="cars">Cars</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
        </TabsList>
        <TabsContent value="cars">
          <Card>
            <CardHeader>
              <CardTitle>Cars</CardTitle>
              <CardDescription>Cars of this model</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className="aspect-video bg-muted relative">
                        <img
                          src="/placeholder.svg?height=200&width=400"
                          alt={`${model.name} Car ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold">
                          {model.name} #{index + 1}
                        </h3>
                        <p className="text-sm text-muted-foreground">2023 • Available</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="font-medium">$1,200/day</div>
                          <Link href={`/cars/${index + 1}`}>
                            <Button size="sm">View Details</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="mt-4 text-center">
                <Link href={`/cars?model=${modelId}`}>
                  <Button variant="outline">View All Cars</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="metadata">
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
              <CardDescription>SEO and additional information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {model.metadata ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h3 className="text-sm font-medium mb-2">Title</h3>
                        <p>{model.metadata.title || "Not set"}</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="text-sm font-medium mb-2">Description</h3>
                        <p>{model.metadata.description || "Not set"}</p>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="text-sm font-medium mb-2">Tags</h3>
                      {model.metadata.tags && model.metadata.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {model.metadata.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No tags set</p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <p className="text-muted-foreground">No metadata available</p>
                    <Button variant="outline" className="mt-4">
                      Add Metadata
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

