import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";

export type DataTableAction = {
    name: string;
    icon?: React.ReactNode;
    onClick: (item: any) => void;
    tooltip?: string;
};

const TableActionButton = ({
    label,
    onClick,
    icon,
    ariaLabel,
}: Readonly<{
    label: string;
    onClick: () => void;
    icon: React.ReactNode;
    ariaLabel: string;
}>) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClick}
                    aria-label={ariaLabel}
                >
                    {icon}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{label}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

export const TableRowActions = ({
    item,
    idField,
    nameField,
    onView,
    onEdit,
    onDelete,
    actions,
}: Readonly<{
    item: any;
    idField: string;
    nameField?: string;
    onView?: (item: any) => void;
    onEdit?: (item: any) => void;
    onDelete?: (item: any) => void;
    actions: DataTableAction[];
}>) => (
    <div className="flex items-center justify-end space-x-1">
        {onEdit && (
            <TableActionButton
                label="Edit"
                onClick={() => onEdit(item)}
                icon={<Pencil size={18} />}
                ariaLabel={`Edit ${nameField ? item[nameField] : item[idField]}`}
            />
        )}
        {onView && (
            <TableActionButton
                label="View details"
                onClick={() => onView(item)}
                icon={<Eye size={18} />}
                ariaLabel={`View ${nameField ? item[nameField] : item[idField]}`}
            />
        )}
        {onDelete && (
            <TableActionButton
                label="Delete"
                onClick={() => onDelete(item)}
                icon={<Trash2 size={18} />}
                ariaLabel={`Delete ${nameField ? item[nameField] : item[idField]}`}
            />
        )}
        {actions.length > 0 && (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="More options">
                        <MoreVertical size={18} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {actions.map((action) => (
                        <DropdownMenuItem
                            key={action.name}
                            onClick={() => action.onClick(item)}
                        >
                            {action.icon && <span className="mr-2">{action.icon}</span>}
                            {action.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        )}
    </div>
);
