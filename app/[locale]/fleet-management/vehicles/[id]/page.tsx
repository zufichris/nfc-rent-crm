import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Fuel,
  Gauge,
  Settings,
  Activity,
  Droplets,
  FileText,
  Star,
  Users,
  Download,
  Printer,
  MessageSquare,
  Zap,
  Wrench,
  History,
  PlusCircle,
  Trash,
  Pencil,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/format";
import { Image } from "@/components/misc/image";
import { ICar } from "@/types/car";
import { getCar } from "@/lib/actions/cars";
import { renderCarStatus } from "@/components/cars/car-table/columns";
import { CarActionsModal } from "@/components/cars/car-table/action-modals";
import ErrorPage from "@/app/[locale]/error";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getCar(id);
  if (!res.success) {
    return {
      title: res.status,
      description: res.message,
    };
  }
  const car = res.data;
  const carDescription = `${car.year} ${car?.brand?.name || ""} ${car?.model?.name || ""}`;
  const engineDescription = `Features ${car.engineSpecs.horsepower}hp, ${car.engineSpecs.type} engine.`;
  const fullDescription = `Manage details for ${car.name} - ${carDescription}. ${engineDescription} Current status: ${car.currentStatus}.`;

  return {
    title: `${car.name} | NFC Car Rental Fleet Management`,
    description: fullDescription,
    openGraph: {
      title: `${car.name} | NFC Car Rental Fleet Management`,
      description: `${carDescription} - ${car.shortDescription}`,
      images: car.images.map((img) => img.url),
    },
    twitter: {
      card: "summary_large_image",
      title: `${car.name} | NFC Car Rental Fleet Management`,
      description: `${carDescription} - ${car.shortDescription}`,
      images: car.images.map((img) => img.url),
    },
  };
}

export default async function CarDetailPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  const res = await getCar(id);
  if (!res.success) {
    return <ErrorPage error={{
      message:res.message,
      status:res.status
    }}/>
  }
  const car = {
    ...res.data,
    images: res.data.images.sort((a, b) => (a?.position ?? 0) - (b?.position ?? 0)),
  };
  const thumbnail = car.images.find((img) => img.isThumbnail) ?? car.images[0];

  return (
    <div className="space-y-6">
      <Header car={car} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MainContent car={car} thumbnail={thumbnail} />
        <Sidebar car={car} />
      </div>
      <CarTabs car={car} />
    </div>
  );
}

function Header({ car }: { car: ICar }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">{car.name}</h1>
        {renderCarStatus(car)}
      </div>
      <div className="flex items-center gap-2">
        <Link href={`/fleet-management/vehicles/${car.id}/edit`}>
          <Button>
            <Pencil className="h-4 w-4 mr-2" />
            Edit Car
          </Button>
        </Link>
      </div>
    </div>
  );
}

function MainContent({ car, thumbnail }: { car: ICar; thumbnail: ICar["images"][0] }) {
  return (
    <div className="md:col-span-2 space-y-6">
      <CarInfoCard car={car} thumbnail={thumbnail} />
      <PerformanceStatsCard engineSpecs={car.engineSpecs} />
      <RentalPerformanceCard car={car} />
    </div>
  );
}





function CarInfoCard({ car, thumbnail }: { car: ICar; thumbnail: ICar["images"][0] }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div className="aspect-video bg-muted">
          <img src={thumbnail.url} alt={car.name} className="object-cover w-full h-full" />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-black/70 hover:bg-black/70 text-white border-0">{car.year}</Badge>
            <Badge className="bg-black/70 hover:bg-black/70 text-white border-0 capitalize">
              {car.category.replace(/_/g, " ").toLowerCase()}
            </Badge>
          </div>
          <div className="absolute bottom-4 right-4">
            <Badge className="bg-primary hover:bg-primary text-white border-0">Popular</Badge>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 p-2 bg-muted/20">
          {car.images.map((image, index) => (
            <div
              key={index}
              className="aspect-video bg-muted cursor-pointer border rounded-md overflow-hidden"
            >
              <img
                src={image.url}
                alt={`${car.name} - Image ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
          <div className="aspect-video bg-muted cursor-pointer border rounded-md overflow-hidden flex items-center justify-center">
            <div className="text-center">
              <PlusCircle className="h-6 w-6 mx-auto text-muted-foreground" />
              <span className="text-xs text-muted-foreground">More</span>
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Image
                src={car.brand?.logo}
                alt={car.brand?.name || car.name}
                className="h-6 w-6 object-contain"
              />
              <h2 className="text-xl font-bold">{car.name}</h2>
            </div>
            <div className="text-muted-foreground">
              {car.brand?.name} {car.model?.name} • {car.year} • {car.mileage.toLocaleString()} miles
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatItem icon={<Car className="h-5 w-5" />} label="Type" value={car.category.replace(/_/g, " ").toLowerCase()} />
            <StatItem icon={<Fuel className="h-5 w-5" />} label="Fuel" value={car.fuelType.replace(/_/g, " ").toLowerCase()} />
            <StatItem icon={<Settings className="h-5 w-5" />} label="Transmission" value={car.transmission.replace(/_/g, " ").toLowerCase()} />
            <StatItem icon={<Users className="h-5 w-5" />} label="Capacity" value={`${car.seats} Persons`} />
          </div>
          {car.description && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{car.description}</p>
            </div>
          )}
          {car?.features?.length ? (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Key Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {car.features.filter((f) => f.isHighlighted).map((feature) => (
                  <div key={feature.id} className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <Star className="h-4 w-4 text-primary" />
                    </div>
                    <span>{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center p-3 border rounded-lg">
      {icon}
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="font-medium capitalize">{value}</div>
    </div>
  );
}

function PerformanceStatsCard({ engineSpecs }: { engineSpecs: ICar["engineSpecs"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Stats</CardTitle>
        <CardDescription>Key specifications and performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <StatItem icon={<Gauge className="h-8 w-8 mb-2 text-primary" />} label="Horsepower" value={`${engineSpecs.horsepower}`} />
          <StatItem icon={<Activity className="h-8 w-8 mb-2 text-primary" />} label="Torque (lb-ft)" value={`${engineSpecs.torque}`} />
          <StatItem icon={<Zap className="h-8 w-8 mb-2 text-primary" />} label="0-60 mph" value={`${engineSpecs.acceleration}s`} />
          <StatItem icon={<Gauge className="h-8 w-8 mb-2 text-primary" />} label="Top Speed (mph)" value={`${engineSpecs.topSpeed}`} />
          <StatItem icon={<Droplets className="h-8 w-8 mb-2 text-primary" />} label="Engine Size" value={`${engineSpecs.displacement}L`} />
          <StatItem icon={<Settings className="h-8 w-8 mb-2 text-primary" />} label="Engine Type" value={engineSpecs.type} />
        </div>
      </CardContent>
    </Card>
  );
}

function RentalPerformanceCard({ car }: { car: ICar }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rental Performance</CardTitle>
        <CardDescription>Statistics and analytics for this vehicle</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Rental Price</div>
            <div className="text-2xl font-bold">
              {car.rentalPricings[0]?.price ? `$${car.rentalPricings[0].price}` : "N/A"}
            </div>
            <div className="text-xs text-muted-foreground">Per {car.rentalPricings[0]?.unit || "day"}</div>
          </div>
          <div className="flex flex-col p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Availability</div>
            <div className="text-2xl font-bold capitalize">{car.currentStatus.toLowerCase().replace("_", " ")}</div>
            <div className="text-xs text-muted-foreground">Current status</div>
          </div>
          <div className="flex flex-col p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Condition</div>
            <div className="text-2xl font-bold capitalize">{car.condition.toLowerCase().replace("_", " ")}</div>
            <div className="text-xs text-muted-foreground">Vehicle condition</div>
          </div>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="text-sm font-medium mb-2">Rental Information</h3>
          <div className="text-sm text-muted-foreground">
            This vehicle is available for rent with various pricing options.
            {car.rentalPricings.length > 0 && (
              <ul className="mt-2 space-y-1">
                {car.rentalPricings.map((pricing, i) => (
                  <li key={i}>
                    {pricing.duration} {pricing.unit}: {pricing.price} {pricing.currency}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Sidebar({ car }: { car: ICar }) {
  return (
    <div className="space-y-6">
      <VehicleStatusCard car={car} />
      <InspectionInfoCard car={car} />
    </div>
  );
}



function VehicleStatusCard({ car }: { car: ICar }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Vehicle Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span>Current Status</span>
            {renderCarStatus(car)}
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-muted-foreground" />
              <span>Condition</span>
            </div>
            <Badge variant="outline" className="capitalize">
              {car.condition.replace(/_/g, " ").toLowerCase()}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Last Inspection</span>
            </div>
            <span className="text-sm">
              {car.lastInspectionDate ? formatDate(new Date(car.lastInspectionDate)) : "N/A"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InspectionInfoCard({ car }: { car: ICar }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Inspection Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <div className="font-medium">Last Inspection</div>
              <div className="text-xs text-muted-foreground">
                Date: {car.lastInspectionDate ? formatDate(new Date(car.lastInspectionDate)) : "N/A"}
              </div>
            </div>
            <Badge variant="outline">{car.inspectionStatus}</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <div className="font-medium">Next Inspection</div>
              <div className="text-xs text-muted-foreground">
                Due: {car.nextInspectionDueDate ? formatDate(new Date(car.nextInspectionDueDate)) : "N/A"}
              </div>
            </div>
            <Badge variant="outline">SCHEDULED</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Wrench className="h-4 w-4 mr-2" />
          Schedule Inspection
        </Button>
      </CardFooter>
    </Card>
  );
}

function CarTabs({ car }: { car: ICar }) {
  return (
    <Tabs defaultValue="specs" className="mt-6">
      <TabsList className="grid grid-cols-6 md:w-auto">
        <TabsTrigger value="specs">Specifications</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="similar">Similar Cars</TabsTrigger>
      </TabsList>
      <TabsContent value="specs">
        <SpecificationsTab car={car} />
      </TabsContent>
      <TabsContent value="features">
        <FeaturesTab features={car.features} />
      </TabsContent>
      <TabsContent value="documents">
        <DocumentsTab documents={car.documents} />
      </TabsContent>
      <TabsContent value="history">
        <HistoryTab history={car.history} acquisitionDate={formatDate(new Date(car?.acquisitionDate!))} />
      </TabsContent>
      <TabsContent value="reviews">
        <ReviewsTab />
      </TabsContent>
      <TabsContent value="similar">
        <SimilarCarsTab />
      </TabsContent>
    </Tabs>
  );
}

function SpecificationsTab({ car }: { car: ICar }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Specifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Engine & Performance</h3>
            <div className="space-y-3">
              <SpecificationItem label="Engine Type" value={car.engineSpecs.type} />
              <SpecificationItem label="Horsepower" value={`${car.engineSpecs.horsepower} hp`} />
              <SpecificationItem label="Torque" value={`${car.engineSpecs.torque} lb-ft`} />
              <SpecificationItem label="Displacement" value={`${car.engineSpecs.displacement} L`} />
              <SpecificationItem label="Acceleration (0-60 mph)" value={`${car.engineSpecs.acceleration} sec`} />
              <SpecificationItem label="Top Speed" value={`${car.engineSpecs.topSpeed} mph`} />
              <SpecificationItem label="Transmission" value={car.transmission.replace(/_/g, " ").toLowerCase()} />
              <SpecificationItem label="Fuel Type" value={car.fuelType.replace(/_/g, " ").toLowerCase()} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Dimensions & Capacity</h3>
            <div className="space-y-3">
              <SpecificationItem label="Length" value={`${car.dimensions.length} in`} />
              <SpecificationItem label="Width" value={`${car.dimensions.width} in`} />
              <SpecificationItem label="Height" value={`${car.dimensions.height} in`} />
              <SpecificationItem label="Weight" value={`${car.dimensions.weight} lbs`} />
              <SpecificationItem label="Cargo Capacity" value={`${car.dimensions.cargoCapacity} cu ft`} />
              <SpecificationItem label="Seating Capacity" value={`${car.seats} persons`} />
              <SpecificationItem label="Doors" value={`${car.doors}`} />
              <SpecificationItem
                label="Exterior Color"
                value={
                  <div className="flex items-center gap-2">
                    {car.color?.name}
                    <div
                      className="h-4 w-4 rounded-full border"
                      style={{ backgroundColor: car.color?.code }}
                    />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Specification Item Component
function SpecificationItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <>
      <div className="flex justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span>{value}</span>
      </div>
      <Separator />
    </>
  );
}

// Features Tab
function FeaturesTab({ features }: { features?: ICar["features"] }) {
  const groupedFeatures = features?.reduce(
    (acc, feature) => {
      const category = feature.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(feature);
      return acc;
    },
    {} as Record<string, typeof features>,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Features & Amenities</CardTitle>
        <CardDescription>This car comes with the following features and amenities</CardDescription>
      </CardHeader>
      <CardContent>
        {groupedFeatures ? (
          <div className="space-y-6">
            {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
              <div key={category} className="space-y-2">
                <h3 className="text-lg font-semibold capitalize">{category.toLowerCase()}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {categoryFeatures.map((feature) => (
                    <div key={feature.id} className="flex flex-col p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{feature.name}</span>
                        {feature.isHighlighted && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Highlighted Feature</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{feature.description}</span>
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          {feature.code}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No features available for this vehicle</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Documents Tab
function DocumentsTab({ documents }: { documents?: ICar["documents"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
        <CardDescription>Vehicle documentation and certificates</CardDescription>
      </CardHeader>
      <CardContent>
        {documents?.length ? (
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{doc.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {doc.type?.replace(/_/g, " ")} • Issued:{" "}
                      {doc.issueDate ? formatDate(new Date(doc.issueDate)) : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 h-4 w-4" />
                      View
                    </a>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="mx-auto h-12 w-12 mb-4 opacity-20" />
            <p>No documents available for this vehicle</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <PlusCircle className="h-4 w-4 mr-2" />
          Upload New Document
        </Button>
      </CardFooter>
    </Card>
  );
}

// History Tab
function HistoryTab({ history, acquisitionDate }: { history?: ICar["history"]; acquisitionDate?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle History</CardTitle>
        <CardDescription>Maintenance and service history</CardDescription>
      </CardHeader>
      <CardContent>
        {history?.length ? (
          <div className="relative pl-6 space-y-6">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-muted-foreground/20"></div>
            {history.map((record, index) => (
              <div key={index} className="relative">
                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary -translate-x-[4.5px]"></div>
                <div className="pl-6">
                  <div className="font-medium">{record.type.replace(/_/g, " ")}</div>
                  <div className="text-sm text-muted-foreground">{formatDate(new Date(record.date))}</div>
                  <div className="mt-1 text-sm">{record.description}</div>
                </div>
              </div>
            ))}
            <div className="relative">
              <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary -translate-x-[4.5px]"></div>
              <div className="pl-6">
                <div className="font-medium">ACQUISITION</div>
                <div className="text-sm text-muted-foreground">
                  {acquisitionDate ? formatDate(new Date(acquisitionDate)) : "N/A"}
                </div>
                <div className="mt-1 text-sm">Vehicle added to fleet</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <History className="mx-auto h-12 w-12 mb-4 opacity-20" />
            <p>No history records available for this vehicle</p>
            <p className="text-sm mt-2">
              Acquisition date: {acquisitionDate ? formatDate(new Date(acquisitionDate)) : "N/A"}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <History className="h-4 w-4 mr-2" />
          View Complete History
        </Button>
      </CardFooter>
    </Card>
  );
}

// Reviews Tab
function ReviewsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Reviews</CardTitle>
        <CardDescription>What our customers say about this car</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          <MessageSquare className="mx-auto h-12 w-12 mb-4 opacity-20" />
          <p>No reviews available for this vehicle yet</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <MessageSquare className="h-4 w-4 mr-2" />
          Add Review
        </Button>
      </CardFooter>
    </Card>
  );
}

// Similar Cars Tab
function SimilarCarsTab() {
  const sampleCars = [
    { name: "Lamborghini Huracán", price: "1,500" },
    { name: "McLaren 720S", price: "1,400" },
    { name: "Porsche 911 Turbo S", price: "1,100" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Similar Vehicles</CardTitle>
        <CardDescription>Other cars you might be interested in</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleCars.map((car, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div className="aspect-video bg-muted">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt={car.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{car.name}</h3>
                <p className="text-sm text-muted-foreground">2023 • Available</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-medium">${car.price}/day</div>
                  <Link href={`/fleet-management/vehicles/${index + 10}`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
