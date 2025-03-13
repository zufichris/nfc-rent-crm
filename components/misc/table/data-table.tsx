"use client";

import { useState } from "react";
import { Search, Upload, ChevronDown, Trash2, Plus, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar } from "@/components/ui/avatar";
import {
    DataTableFilter,
    TableActiveFilters,
    TableFiltersSheet,
} from "./filter";
import { DataTableAction, TableRowActions } from "./action";
import { TableSearchInput } from "./search";
import { TableEntriesPerPageSelect, TablePagination } from "./pagination";
import { Image } from "../image";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { exportData, ExportFormats } from "@/utils/exports";

const DataExportTypes: ExportFormats[] = ["csv", "pdf", "json"];

export type DataTableColumn = {
    key: string;
    name: string;
    type?: "image" | "date";
    className?: string;
    render?: (value: any, item: any) => React.ReactNode;
};



export type DataTableProps<T> = {
    title: string;
    name: string;
    items: T[];
    columns: DataTableColumn[];
    filters?: DataTableFilter[];
    actions?: DataTableAction[];
    idField?: string;
    total: number;
    page: number;
    limit: number;
    selectedItems?: string[],
    nameField?: string;
    activeFilters?: Record<string, any>
    onFiltersChange: (filters: Record<string, any>) => void;
    onAdd?: () => void;
    onView?: (item: T) => void;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onBulkDelete?: (items: string[]) => void,
    setSelectedItems?: (items: any) => void,
};



export function DataTable<T extends Record<string, any>>({
    title,
    name,
    items = [],
    columns = [],
    filters = [],
    actions = [],
    idField = "id",
    total = 0,
    page = 1,
    limit = 10,
    onFiltersChange,
    onAdd,
    onView,
    onEdit,
    onDelete,
    onBulkDelete,
    nameField,
    selectedItems = [],
    setSelectedItems = (items: string[]) => { },
    activeFilters = {}
}: Readonly<DataTableProps<T>>) {
    const [exporting, setExporting] = useState(false)

    const handleExport = async (type: ExportFormats) => {
        try {
            setExporting(true)
            exportData(items, type, `${items.length} ${name}`.trim().split(" ").join("-"))
            toast(`${items.length} exported to ${type}`)
        } catch (error) {
            toast(`Error Exporting to ${type.toUpperCase()}`)
        } finally {
            setExporting(false)
        }
    }
    const handleSelectAll = () => {
        if (selectedItems.length === items.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(items.map((item) => item[idField]));
        }
    };

    const handleSelectItem = (itemId: string) => {
        setSelectedItems((prev: string[]) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId]
        );
    };

    const applyFilters = (filters: Record<string, any>) => {
        onFiltersChange(filters);
    };

    const removeFilter = (key: string) => {
        const newFilters = { ...activeFilters ?? {} };
        delete newFilters[key];
        onFiltersChange(newFilters);
    };

    const clearAllFilters = () => {
        onFiltersChange({});
    };

    const renderCellContent = (column: DataTableColumn, item: any) => {
        if (column.render) return column.render(item[column.key], item);
        switch (column.type) {
            case "image":
                return column.key ? (
                    <Avatar className={cn("h-10 w-10 rounded-full", column.className)}>
                        <Image
                            src={item[column.key]}
                            alt={nameField ? item[nameField] : "Item"}
                            aspectRatio="square"
                            fill
                        />
                    </Avatar>
                ) : (
                    item[column.key]
                );
            case "date":
                return (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <time dateTime={item[column.key]}>
                                    {new Date(item[column.key]).toLocaleDateString()}
                                </time>
                            </TooltipTrigger>
                            <TooltipContent>
                                {new Date(item[column.key]).toLocaleString()}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            default:
                return item[column.key];
        }
    };

    return (
        <Card className="w-full shadow-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                <div className="space-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button disabled={exporting} variant="outline">
                                <Upload size={16} className="mr-2" />
                                {exporting ? "Exporting" : "Export"}
                                {exporting ? <Loader size={16} className="animate-spin" /> : <ChevronDown size={16} className="ml-2" />}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {DataExportTypes.map((t) => (
                                <DropdownMenuItem key={t} onClick={() => handleExport(t)}>
                                    Export as {t.toUpperCase()}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {onAdd && (
                        <Button onClick={onAdd}>
                            <Plus size={16} className="mr-2" />
                            Add {name}
                        </Button>
                    )}
                </div>
            </CardHeader>

            <CardContent className="space-y-6 p-6">
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 justify-end">
                        {filters.length > 0 && (
                            <TableFiltersSheet
                                filters={filters}
                                activeFilters={activeFilters}
                                applyFilters={applyFilters}
                                title={name}
                            />
                        )}
                        <TableSearchInput
                            value={activeFilters.search || ""}
                            onChange={(value) => applyFilters({ ...activeFilters ?? {}, search: value })}
                            placeholder={`Search ${name.toLowerCase()}`}
                        />
                    </div>
                    <TableActiveFilters
                        activeFilters={activeFilters}
                        filters={filters}
                        removeFilter={removeFilter}
                        clearAllFilters={clearAllFilters}
                    />
                </div>

                <div className="flex justify-between items-center">
                    <TableEntriesPerPageSelect
                        limit={limit}
                        onLimitChange={(limit) => {
                            applyFilters({ ...activeFilters ?? {}, limit })
                        }}
                    />
                    {selectedItems.length > 0 && onBulkDelete && (
                        <div className="flex items-center space-x-2">
                            <span className="text-sm">{selectedItems.length} selected</span>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => onBulkDelete(selectedItems)}
                            >
                                <Trash2 size={16} className="mr-2" />
                                Delete Selected
                            </Button>
                        </div>
                    )}
                </div>

                <div className="rounded-md border  bg-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {onDelete && (
                                        <TableHead className="w-10">
                                            <input
                                                type="checkbox"
                                                className="rounded"
                                                checked={selectedItems.length > 0}
                                                onChange={handleSelectAll}
                                                aria-label="Select all items"
                                            />
                                        </TableHead>
                                    )}
                                    {columns.map((column) => (
                                        <TableHead
                                            key={column.key}
                                            className={cn("py-3", column.className)}
                                        >
                                            {column.name.toUpperCase()}
                                        </TableHead>
                                    ))}
                                    {(onView || onEdit || onDelete || actions.length > 0) && (
                                        <TableHead className="py-3 text-right">ACTIONS</TableHead>
                                    )}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {total === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length + (onDelete ? 2 : 1)}
                                            className="h-32 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center space-y-3">
                                                <div className="rounded-full bg-muted p-3">
                                                    <Search size={24} className="text-muted-foreground" />
                                                </div>
                                                <div className="text-lg font-medium">
                                                    No {name.toLowerCase()}{" "}
                                                    found
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {Object.keys(activeFilters).length > 0
                                                        ? "Try adjusting your filters or search terms"
                                                        : `Add a new ${name.toLowerCase()} to get started`}
                                                </div>
                                                {Object.keys(activeFilters).length > 0 && (
                                                    <Button variant="outline" onClick={clearAllFilters}>
                                                        Clear all filters
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    items.map((item) => (
                                        <TableRow
                                            key={item[idField]}
                                            className={cn(
                                                "border-b border-border transition-colors",
                                                selectedItems.includes(item[idField]) && "bg-muted/40"
                                            )}
                                        >
                                            {onDelete && (
                                                <TableCell className="py-4">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded"
                                                        checked={selectedItems.includes(item[idField])}
                                                        onChange={() => handleSelectItem(item[idField])}
                                                        aria-label={`Select ${nameField ? item[nameField] : item[idField]
                                                            }`}
                                                    />
                                                </TableCell>
                                            )}
                                            {columns.map((column) => (
                                                <TableCell key={column.key} className="py-4">
                                                    {renderCellContent(column, item)}
                                                </TableCell>
                                            ))}
                                            {(onView || onEdit || onDelete || actions.length > 0) && (
                                                <TableCell className="py-4">
                                                    <TableRowActions
                                                        item={item}
                                                        idField={idField}
                                                        nameField={nameField}
                                                        onView={onView}
                                                        onEdit={onEdit}
                                                        onDelete={onDelete}
                                                        actions={actions}
                                                    />
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <TablePagination
                    page={page}
                    limit={limit}
                    total={total}
                    onPageChange={(page) => {
                        applyFilters({ ...activeFilters ?? {}, page })
                    }}
                />
            </CardContent>
        </Card>
    );
}

export function renderStatus({ isActive, isDeleted, }: Readonly<{ isDeleted: boolean, isActive: boolean, }>) {
    if (isDeleted)
        return <Badge variant={"destructive"}>Deleted</Badge>
    return <Badge variant={isActive ? "success" : "secondary"}>{isActive ? "Active" : "Not Active"}</Badge>
}

