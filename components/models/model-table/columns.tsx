import { DataTableColumn, renderStatus } from "@/components/misc/table/data-table"
import type { IModel } from "@/types/brand"
import { formatDate } from "@/utils/format"

export const ModelTableColumns: DataTableColumn[] = [
    {
        key: "name",
        name: "Model",
        render: (value, item: IModel) => (
            <div className="flex items-center space-x-3">
                <div>
                    <div className="font-medium text-foreground">{value}</div>
                    <div className="text-sm text-muted-foreground">{item.code}</div>
                </div>
            </div>
        ),
    },
    {
        key: "brand.name",
        name: "Brand",
        render: (value, item: IModel) => (
            <div className="flex items-center gap-2">
                {item.brand?.logo && (
                    <img src={item.brand.logo || "/placeholder.svg"} alt={item.brand?.name} className="h-6 w-6 object-contain" />
                )}
                <span>{value}</span>
            </div>
        ),
    },
    {
        key: "shortDescription",
        name: "Description",
        render: (value) => (
            <div className="max-w-md truncate">{value || <span className="text-muted-foreground">No description</span>}</div>
        ),
    },
    {
        key: "createdAt",
        name: "Created",
        render: (value) => formatDate(new Date(value)),
    },
    {
        key: "isActive",
        name: "Status",
        render: (_, item) => {
            return renderStatus(item)
        },
    },
]

