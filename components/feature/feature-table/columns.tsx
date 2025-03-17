import { DataTableColumn, renderStatus } from "@/components/misc/table/data-table"
import { Badge } from "@/components/ui/badge"
import { IFeature } from "@/types/features"
import { formatDate } from "@/utils/format"

export const FeatureTableColumns: DataTableColumn[] = [
  {
    key: "name",
    name: "Feature",
    render: (value, item: IFeature) => (
      <div className="flex items-center space-x-3">
        <div>
          <div className="font-medium text-foreground">{value}</div>
          <div className="text-sm text-muted-foreground">{item.code}</div>
        </div>
      </div>
    ),
  },
  {
    key: "category",
    name: "Category",
    render: (value) => (
      <Badge variant="outline" className="capitalize">
        {value}
      </Badge>
    ),
  },
  {
    key: "isHighlighted",
    name: "Highlighted",
    render: (value) => <Badge variant={value ? "success" : "secondary"}>{value ? "Yes" : "No"}</Badge>,
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

