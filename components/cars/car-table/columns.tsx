import { Image } from "@/components/misc/image";
import { DataTableColumn, renderStatus } from "@/components/misc/table/data-table";

export const CarTableColumns: DataTableColumn[] = [
    {
        key: "imageUrl",
        name: "Image",
        type: "image",
        className: "w-20 h-20 rounded-sm",
    },
    {
        key: "name",
        name: "Name",
        render: (value, item: any) => (
            <div>
                <div className="font-medium">{value}</div>
                <div className="text-sm text-muted-foreground">{item.model}</div>
            </div>
        ),
    },
    {
        key: "brand",
        name: "Brand",
        render: (value, item: any) => (
            <>
                <Image src={item?.brandImage} alt={value} aspectRatio="square" className="shadow-md rounded-full h-6 w-6" />
                <div className="text-muted-foreground text-center uppercase">{value}</div>
            </>
        ),
    },
    {
        key: "year",
        name: "Year",
    },
    {
        key: "price",
        name: "Price",
        render: (value) => `$${value.toLocaleString()}`,
    },
    {
        key: "status",
        name: "Status",
        render: (_, item) => renderStatus(item)
    },
    {
        key: "createdAt",
        name: "Added On",
        type: "date"
    },
]
