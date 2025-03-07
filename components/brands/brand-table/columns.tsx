import { DataTableColumn, renderStatus } from "@/components/misc/table/data-table";
import { IBrand } from "@/types/brand";
import { Link2 } from "lucide-react";
import Link from "next/link";

export const BrandTableColumns: (Omit<DataTableColumn, 'key'> & { key: keyof IBrand })[] = [
    {
        key: "logo",
        name: "Image",
        type: "image",
        className: "w-20 h-20 rounded-sm",
    },
    {
        key: "name",
        name: "Brand Name",
        render: (value, item: IBrand) => (
            <div>
                <div className="font-medium">{value}</div>
                <div className="text-sm text-muted-foreground line-clamp-1">{item.shortDescription}</div>
                {item.website ? <Link target="_blank" href={item.website} className="text-info flex text-xs items-center line-clamp-1"><Link2 target="_blank" size={20} />{item.website}</Link> : null}
            </div>
        ),
    },
    {
        key: "code",
        name: "Code",
    },
    {
        key: "isActive",
        name: "Status",
        render: (_, item) => renderStatus(item)
    },
    {
        key: "createdAt",
        name: "Added On",
        type: "date"
    },
]