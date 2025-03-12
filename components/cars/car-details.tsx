"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Edit, Trash2, CarIcon, Calendar, Gauge, Fuel, Cog } from "lucide-react"
import type { ICar } from "@/types/car"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { CarActionsModal } from "./car-table/action-modals"
import { toast } from "sonner"
import { Image } from "../misc/image"

interface CarDetailsProps {
  car: ICar
}

export function CarDetails({ car }: Readonly<CarDetailsProps>) {
  const router = useRouter()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)


  const handleDeleteSuccess = () => {
    toast.success("Car deleted successfully")
    router.push("/fleet-management/vehicles")
  }

  function renderCarStatus(car: ICar) {
    if (car.isDeleted) {
      return <Badge variant="destructive">Deleted</Badge>
    }

    if (car.currentStatus === "AVAILABLE") {
      return <Badge variant="success">Available</Badge>
    } else if (car.currentStatus === "RENTED") {
      return <Badge variant="warning">Rented</Badge>
    } else if (car.currentStatus === "RESERVED") {
      return <Badge variant="secondary">Reserved</Badge>
    } else if (car.currentStatus === "IN_MAINTENANCE") {
      return <Badge variant="outline">In Maintenance</Badge>
    } else if (car.currentStatus === "SOLD") {
      return <Badge variant="default">Sold</Badge>
    } else {
      return <Badge variant="outline">Not Available</Badge>
    }
  }

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="col-span-3 space-y-6 card">
          <Card>
            <CardHeader className="relative pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{car.name}</CardTitle>
                  <CardDescription className="mt-2">{car.shortDescription}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => router.push(`/fleet-management/vehicles/${car.id}/edit`)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => setIsDeleteModalOpen(true)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {renderCarStatus(car)}
                <Badge variant="outline" className="capitalize">
                  {car.category?.replace(/_/g, " ").toLowerCase()}
                </Badge>
                {car.listingType?.map((type) => (
                  <Badge key={type} variant="secondary" className="capitalize">
                    {type.replace(/_/g, " ").toLowerCase()}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-3 bg-muted/40 rounded-lg">
                  <Calendar className="h-5 w-5 mb-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Year</span>
                  <span className="font-medium">{car.year}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted/40 rounded-lg">
                  <Gauge className="h-5 w-5 mb-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Mileage</span>
                  <span className="font-medium">{car.mileage} km</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted/40 rounded-lg">
                  <Fuel className="h-5 w-5 mb-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Fuel</span>
                  <span className="font-medium capitalize">{car.fuelType?.toLowerCase().replace(/_/g, " ")}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted/40 rounded-lg">
                  <Cog className="h-5 w-5 mb-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Transmission</span>
                  <span className="font-medium capitalize">{car.transmission?.toLowerCase().replace(/_/g, " ")}</span>
                </div>
              </div>

              <Tabs defaultValue="details" className="mt-6">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="specs">Specifications</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">VIN</h4>
                      <p>{car.vin}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Model</h4>
                      <p>{car.model}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Condition</h4>
                      <p className="capitalize">{car.condition?.toLowerCase().replace(/_/g, " ")}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Inspection Status</h4>
                      <p className="capitalize">{car.inspectionStatus?.toLowerCase().replace(/_/g, " ")}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Doors</h4>
                      <p>{car.doors}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Seats</h4>
                      <p>{car.seats}</p>
                    </div>
                  </div>

                  {car?.description && (
                    <>
                      <Separator className="my-4" />
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
                        <p className="text-sm">{car.description}</p>
                      </div>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="specs" className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Engine Specifications</h4>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <h5 className="text-xs text-muted-foreground">Engine Type</h5>
                        <p className="text-sm">{car.engineSpecs?.type}</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-muted-foreground">Horsepower</h5>
                        <p className="text-sm">{car.engineSpecs?.horsepower} HP</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-muted-foreground">Torque</h5>
                        <p className="text-sm">{car.engineSpecs?.torque} Nm</p>
                      </div>
                      {car.engineSpecs?.displacement && (
                        <div>
                          <h5 className="text-xs text-muted-foreground">Displacement</h5>
                          <p className="text-sm">{car.engineSpecs.displacement} cc</p>
                        </div>
                      )}
                      {car.engineSpecs?.batteryCapacity && (
                        <div>
                          <h5 className="text-xs text-muted-foreground">Battery Capacity</h5>
                          <p className="text-sm">{car.engineSpecs.batteryCapacity} kWh</p>
                        </div>
                      )}
                      {car.engineSpecs?.range && (
                        <div>
                          <h5 className="text-xs text-muted-foreground">Range</h5>
                          <p className="text-sm">{car.engineSpecs.range} km</p>
                        </div>
                      )}
                      <div>
                        <h5 className="text-xs text-muted-foreground">Acceleration (0-100 km/h)</h5>
                        <p className="text-sm">{car.engineSpecs?.acceleration}s</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-muted-foreground">Top Speed</h5>
                        <p className="text-sm">{car.engineSpecs?.topSpeed} km/h</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Dimensions</h4>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <h5 className="text-xs text-muted-foreground">Length</h5>
                        <p className="text-sm">{car.dimensions?.length} mm</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-muted-foreground">Width</h5>
                        <p className="text-sm">{car.dimensions?.width} mm</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-muted-foreground">Height</h5>
                        <p className="text-sm">{car.dimensions?.height} mm</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-muted-foreground">Weight</h5>
                        <p className="text-sm">{car.dimensions?.weight} kg</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-muted-foreground">Cargo Capacity</h5>
                        <p className="text-sm">{car.dimensions?.cargoCapacity} L</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features">
                  {car.features && car.features.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {car.features.map((feature, index) => (
                        <Badge key={feature + index} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No features listed for this car.</p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {car.rentalPricings && car.rentalPricings.length > 0 && (
          <Card className="md:col-span-2 col-span-3 card">
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {car.rentalPricings.map((pricing, index) => (
                  <div key={(pricing.currency ?? "") + index} className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold">
                      {pricing.price} {pricing.currency}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {pricing.duration}
                      {pricing.unit?.toLowerCase()}
                      {(pricing?.duration ?? 0) > 1 ? "s" : ""}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        <Card className="md:col-span-1 col-span-3 card">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span>{renderCarStatus(car)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Created</span>
              <span className="text-sm">{format(new Date(car.createdAt), "PPP")}</span>
            </div>
            {car.updatedAt && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Updated</span>
                <span className="text-sm">{format(new Date(car.updatedAt), "PPP")}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">ID</span>
              <span className="font-mono text-xs">{car.id}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="space-y-6 col-span-3 card">
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent>
            {car.media.length ? (
              <div className="grid grid-cols-2 gap-2">
                {car.media.map((media, index) => (
                  <div key={media.type + index} className="relative aspect-square rounded-md overflow-hidden">
                    <Image
                      src={media.url}
                      alt={car?.name}
                      aspectRatio="square"
                    />
                    {media.isThumbnail && (
                      <div className="absolute top-1 right-1">
                        <Badge variant="secondary" className="text-xs">
                          Thumbnail
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 bg-muted rounded-md">
                No Images Uploaded
                <CarIcon className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <CarActionsModal
        type="delete"
        car={car}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={handleDeleteSuccess}
      />
    </>
  )
}

