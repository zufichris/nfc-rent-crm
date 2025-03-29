import { format } from "date-fns"
import { Image } from "@/components/misc/image"
import { DataTableColumn } from "@/components/misc/table/data-table"
import { Badge } from "@/components/ui/badge"
import { CarStatus, ICar, ICarMedia } from "@/types/car"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CarIcon, Fuel, Gauge, Tag } from "lucide-react"
import { RentalPricingDto } from "@/types/pricing"
import { formatDate } from "@/utils/format"

export function renderCarStatus(car?: ICar) {
    if (!car) return null

    if (car.isDeleted) {
        return <Badge variant="destructive">Deleted</Badge>
    }
    switch (car.currentStatus) {
        case CarStatus.AVAILABLE:
            return <Badge variant="success">Available</Badge>
        case CarStatus.RENTED:
            return <Badge variant="warning">Rented</Badge>
        case CarStatus.RESERVED:
            return <Badge variant="info">Reserved</Badge>
        case CarStatus.IN_MAINTENANCE:
            return <Badge variant="outline">In Maintenance</Badge>
        case CarStatus.SOLD:
            return <Badge variant="secondary">Sold</Badge>
        case CarStatus.IN_TRANSIT:
            return <Badge variant="outline">In Transit</Badge>
        case CarStatus.NOT_AVAILABLE:
            return <Badge variant="ghost">Not Available</Badge>
        default: return car.currentStatus
    }
}

export const CarTableColumns: (Omit<DataTableColumn, 'key'> & { key: keyof ICar })[] = [
    {
        key: "images",
        name: "Image",
        type: "image",
        render: (value: ICarMedia[], item: ICar) => {
            const thumbnail = value?.find(m => m.isThumbnail) ?? item?.images[0]
            return (
                <div className="relative group">
                    <Avatar className={cn("h-20 w-20 rounded-md border overflow-hidden")}>
                        <Image
                            src={thumbnail?.url}
                            alt={item.name}
                            aspectRatio="square"
                            className="object-cover transition-transform group-hover:scale-110"
                        />
                    </Avatar>
                    {item.images.length > 1 && (
                        <Badge variant="secondary" className="absolute -bottom-2 -right-2 text-xs">
                            +{item.images.length - 1}
                        </Badge>
                    )}
                </div>
            )
        }
    },
    {
        key: "name",
        name: "Car Details",
        render: (name, item: ICar) => {
            return (
                <div>
                    <div className="font-medium flex items-center gap-1">
                        {name}
                        {item.brand && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Avatar className="h-4 w-4 ml-1">
                                            <Image
                                                src={item.brand.logo}
                                                alt={item.brand.name}
                                                className="object-contain"
                                            />
                                        </Avatar>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{item.brand.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{item.shortDescription}</div>
                    <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs font-normal">
                            {item.year}
                        </Badge>
                        {item.model?.name && (
                            <Badge variant="outline" className="text-xs font-normal">
                                {item.model.name}
                            </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                            VIN: {item.vin.substring(0, 8)}...
                        </span>
                    </div>
                </div>
            )
        },
    },
    {
        key: "engineSpecs",
        name: "Specifications",
        render: (specs, item: ICar) => (
            <div className="space-y-1">
                <div className="flex items-center text-sm">
                    <Gauge className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                    <span>{specs.horsepower} hp</span>
                </div>
                <div className="flex items-center text-sm">
                    <Fuel className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                    <span className="capitalize">{item.fuelType.replace(/_/g, ' ').toLowerCase()}</span>
                </div>
                <div className="flex items-center text-sm">
                    <CarIcon className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                    <span className="capitalize">{item.transmission.replace(/_/g, ' ').toLowerCase()}</span>
                </div>
            </div>
        )
    },
    {
        key: "currentStatus",
        name: "Status",
        render: (_, item) => renderCarStatus(item)
    },
    {
        key: "rentalPricings",
        name: "Pricing",
        render: (pricing: RentalPricingDto[], item: ICar) => {
            const dailyPricing = pricing.find(p => p.unit === 'day') || pricing[0];

            if (!dailyPricing) return <span className="text-muted-foreground">Not priced</span>;

            return (
                <div>
                    <div className="font-medium line-clamp-2">
                        {dailyPricing.price} {dailyPricing.currency}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        per {dailyPricing.unit}
                    </div>
                </div>
            );
        }
    },
    {
        key: "category",
        name: "Category",
        render: (value) => (
            <Badge variant="outline" className="capitalize flex items-center line-clamp-1">
                <Tag className="h-3.5 w-3.5 mr-1" />
                {value?.replace(/_/g, ' ').toLowerCase()}
            </Badge>
        )
    },
    {
        key: "listingType",
        name: "Listing",
        render: (value) => {
            if (Array.isArray(value)) {
                return (
                    <div className="flex flex-col gap-1">
                        {value.map((type) => (
                            <Badge key={type} variant="secondary" className="capitalize">
                                {type.replace(/_/g, ' ').toLowerCase()}
                            </Badge>
                        ))}
                    </div>
                );
            }

            return (
                <Badge variant="secondary" className="capitalize">
                    {value.toString().replace(/_/g, ' ').toLowerCase()}
                </Badge>
            );
        }
    },
    {
        key: "createdAt",
        name: "Added",
        render: (value) => {
            const date = new Date(value);
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="text-sm">
                                <div>{formatDate(date)}</div>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{format(date, "PPPp")}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }
    }
]