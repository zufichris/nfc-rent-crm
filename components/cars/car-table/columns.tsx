import { format } from "date-fns"
import { Image } from "@/components/misc/image"
import { DataTableColumn } from "@/components/misc/table/data-table"
import { Badge } from "@/components/ui/badge"
import { CarMedia, CarStatus, ICar } from "@/types/car"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

function renderCarStatus(car?: ICar) {
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
        key: "media",
        name: "Image",
        type: "image",
        className: "w-20 h-20 rounded-sm",
        render: (value: CarMedia[], item: ICar) => {
            const thumbnail = value?.find(m => m.isThumbnail) ?? item.media?.[0]
            return (
                <Avatar className={cn("h-28 w-28 rounded-md")}>
                    <Image
                        src={thumbnail?.url}
                        alt={thumbnail?.title ?? item.name}
                        aspectRatio="square"
                    />
                </Avatar>
            )
        }
    },
    {
        key: "name",
        name: "Car Details",
        render: (name, item: ICar) => {
            return (
                <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{item.shortDescription}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                        {item.year} • {item.model} • VIN: {item.vin.substring(0, 8)}...
                    </div>
                </div>
            )
        },
    },
    {
        key: "category",
        name: "Category",
        render: (value) => (
            <Badge variant="outline" className="capitalize">
                {value?.replace(/_/g, ' ').toLowerCase()}
            </Badge>
        )
    },
    {
        key: "currentStatus",
        name: "Status",
        render: (_, item) => renderCarStatus(item)
    },
    {
        key: "listingType",
        name: "Listing Type",
        render: (value) => {
            if (!value || !Array.isArray(value)) return null

            return (
                <div className="flex flex-wrap gap-1">
                    {value.map((type) => (
                        <Badge key={type} variant="secondary" className="capitalize">
                            {type.replace(/_/g, ' ').toLowerCase()}
                        </Badge>
                    ))}
                </div>
            )
        }
    },
    {
        key: "createdAt",
        name: "Added On",
        type: "date",
        render: (value) => format(new Date(value), "PPP")
    },
]