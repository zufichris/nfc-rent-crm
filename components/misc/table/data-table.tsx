"use client"

import type React from "react"

import { useState } from "react"
import { Search, ChevronDown, Trash2, Plus, Loader, X, FileDown, FileText, TableIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar } from "@/components/ui/avatar"
import { type DataTableFilter, TableActiveFilters, TableFiltersSheet } from "./filter"
import { type DataTableAction, TableRowActions } from "./action"
import { TableSearchInput } from "./search"
import { TableEntriesPerPageSelect, TablePagination } from "./pagination"
import { Image } from "../image"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { exportData, type ExportFormats } from "@/utils/exports"

const DataExportTypes: ExportFormats[] = ["csv", "pdf", "json"]

export type DataTableColumn = {
  key: string
  name: string
  type?: "image" | "date"
  className?: string
  render?: (value: any, item: any) => React.ReactNode
}

export type DataTableProps<T> = {
  title: string
  name: string
  items: T[]
  columns: DataTableColumn[]
  filters?: DataTableFilter[]
  actions?: DataTableAction[]
  idField?: string
  total: number
  page: number
  limit: number
  selectedItems?: string[]
  nameField?: string
  activeFilters?: Record<string, any>
  onFiltersChange: (filters: Record<string, any>) => void
  onAdd?: () => void
  onView?: (item: T) => void
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  onBulkDelete?: (items: string[]) => void
  setSelectedItems?: (items: any) => void
}

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
  setSelectedItems = (items: string[]) => {},
  activeFilters = {},
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
      setSelectedItems([])
    } else {
      setSelectedItems(items.map((item) => item[idField]))
    }
  }

  const handleSelectItem = (itemId: string) => {
    setSelectedItems((prev: string[]) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId],
    )
  }

  const applyFilters = (filters: Record<string, any>) => {
    onFiltersChange(filters)
  }

  const removeFilter = (key: string) => {
    const newFilters = { ...(activeFilters ?? {}) }
    delete newFilters[key]
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    onFiltersChange({})
  }

  const renderCellContent = (column: DataTableColumn, item: any) => {
    if (column.render) return column.render(item[column.key], item)
    switch (column.type) {
      case "image":
        return column.key ? (
          <Avatar className={cn("h-10 w-10 rounded-full", column.className)}>
            <Image
              src={item[column.key] || "/placeholder.svg"}
              alt={nameField ? item[nameField] : "Item"}
              aspectRatio="square"
              fill
            />
          </Avatar>
        ) : (
          item[column.key]
        )
      case "date":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <time dateTime={item[column.key]}>{new Date(item[column.key]).toLocaleDateString()}</time>
              </TooltipTrigger>
              <TooltipContent>{new Date(item[column.key]).toLocaleString()}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      default:
        return item[column.key]
    }
  }

  const hasActiveFilters = Object.keys(activeFilters).length > 0
  const activeFilterCount = Object.keys(activeFilters).filter((key) => key !== "page" && key !== "limit").length

  return (
    <Card className="w-full shadow-md border rounded-xl overflow-hidden">
      <CardHeader className="bg-none px-6 py-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription className="mt-1">
              {total} {name}
              {total !== 1 ? "s" : ""}{" "}
              {hasActiveFilters && activeFilterCount > 0 ? `(filtered from ${total} total)` : ""}
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button disabled={exporting} variant="outline" className="h-9">
                  <FileDown size={16} className="mr-2" />
                  {exporting ? "Exporting" : "Export"}
                  {exporting ? (
                    <Loader size={16} className="ml-2 animate-spin" />
                  ) : (
                    <ChevronDown size={16} className="ml-2 opacity-70" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="text-xs text-muted-foreground" disabled>
                  Export {items.length} {name}
                  {items.length !== 1 ? "s" : ""}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {DataExportTypes.map((t) => (
                  <DropdownMenuItem key={t} onClick={() => handleExport(t)} className="flex items-center">
                    {t === "csv" && <TableIcon size={14} className="mr-2" />}
                    {t === "pdf" && <FileText size={14} className="mr-2" />}
                    {t === "json" && <FileDown size={14} className="mr-2" />}
                    Export as {t.toUpperCase()}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {onAdd && (
              <Button onClick={onAdd} className="h-9 bg-primary hover:bg-primary/90">
                <Plus size={16} className="mr-2" />
                Add {name}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="bg-muted/30 p-4">
          <div className="flex flex-col md:flex-row gap-3 justify-between">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <TableSearchInput
                value={activeFilters.search}
                onChange={(value) => applyFilters({ ...(activeFilters ?? {}), search: value })}
                placeholder={`Search ${name.toLowerCase()}`}
              />
            </div>
            <div className="flex items-center gap-2">
              {filters.length > 0 && (
                <TableFiltersSheet
                  filters={filters}
                  activeFilters={activeFilters}
                  applyFilters={applyFilters}
                  title={name}
                />
              )}
              <TableEntriesPerPageSelect
                limit={limit}
                onLimitChange={(limit) => {
                  applyFilters({ ...(activeFilters ?? {}), limit })
                }}
              />
            </div>
          </div>

          {hasActiveFilters && activeFilterCount > 0 && (
            <div className="mt-3">
              <TableActiveFilters
                activeFilters={activeFilters}
                filters={filters}
                removeFilter={removeFilter}
                clearAllFilters={clearAllFilters}
              />
            </div>
          )}
        </div>

        {selectedItems.length > 0 && onBulkDelete && (
          <div className="bg-muted/50 px-4 py-2 border-b flex items-center justify-between">
            <span className="text-sm font-medium">
              {selectedItems.length} {name}
              {selectedItems.length !== 1 ? "s" : ""} selected
            </span>
            <Button variant="destructive" size="sm" onClick={() => onBulkDelete(selectedItems)} className="h-8">
              <Trash2 size={14} className="mr-2" />
              Delete Selected
            </Button>
          </div>
        )}

        <div className="overflow-x-auto scrollbar">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                {onDelete && (
                  <TableHead className="w-10">
                    <input
                      type="checkbox"
                      className="rounded border-muted-foreground/30"
                      checked={selectedItems.length > 0 && selectedItems.length === items.length}
                      onChange={handleSelectAll}
                      aria-label="Select all items"
                    />
                  </TableHead>
                )}
                {columns.map((column) => (
                  <TableHead key={column.key} className={cn("py-3 font-medium text-xs", column.className)}>
                    {column.name.toUpperCase()}
                  </TableHead>
                ))}
                {(onView || onEdit || onDelete || actions.length > 0) && (
                  <TableHead className="py-3 text-right text-xs font-medium">ACTIONS</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {total === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + (onDelete ? 2 : 1)} className="h-60 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="rounded-full bg-muted p-4">
                        <Search size={28} className="text-muted-foreground" />
                      </div>
                      <div className="text-xl font-medium">No {name.toLowerCase()} found</div>
                      <div className="text-sm text-muted-foreground max-w-md text-center">
                        {Object.keys(activeFilters).length > 0
                          ? "Try adjusting your filters or search terms to find what you're looking for."
                          : `Add a new ${name.toLowerCase()} to get started with your collection.`}
                      </div>
                      {Object.keys(activeFilters).length > 0 && (
                        <Button variant="outline" onClick={clearAllFilters} className="mt-2">
                          <X size={14} className="mr-2" />
                          Clear all filters
                        </Button>
                      )}
                      {onAdd && Object.keys(activeFilters).length === 0 && (
                        <Button onClick={onAdd} className="mt-2">
                          <Plus size={14} className="mr-2" />
                          Add {name}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                items?.map((item, i) => (
                  <TableRow
                    key={item[idField]}
                    className={cn(
                      "border-b border-border transition-colors",
                      selectedItems.includes(item[idField]) && "bg-muted/40",
                    )}
                  >
                    {onDelete && (
                      <TableCell className="py-3 px-4">
                        <input
                          type="checkbox"
                          className="rounded border-muted-foreground/30"
                          checked={selectedItems.includes(item[idField])}
                          onChange={() => handleSelectItem(item[idField])}
                          aria-label={`Select ${nameField ? item[nameField] : item[idField]}`}
                        />
                      </TableCell>
                    )}
                    {columns.map((column, i) => (
                      <TableCell
                        onClick={() => {
                          if (onView && i === 0) {
                            onView(item)
                          }
                        }}
                        key={column.key}
                        className={cn("py-3", onView && i === 0 && "cursor-pointer hover:text-primary")}
                      >
                        {renderCellContent(column, item)}
                      </TableCell>
                    ))}
                    {(onView || onEdit || onDelete || actions.length > 0) && (
                      <TableCell className="py-3 text-right">
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

        <div className="p-4 border-t bg-card">
          <TablePagination
            page={page}
            limit={limit}
            total={total}
            onPageChange={(page) => {
              applyFilters({ ...(activeFilters ?? {}), page })
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export function renderStatus({ isActive, isDeleted }: Readonly<{ isDeleted: boolean; isActive: boolean }>) {
  if (isDeleted) return <Badge variant={"destructive"}>Deleted</Badge>
  return <Badge variant={isActive ? "success" : "secondary"}>{isActive ? "Active" : "Not Active"}</Badge>
}

