"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Filter, Search, X } from "lucide-react"
import { useState } from "react"

export type DataTableFilter = {
  key: string
  name: string
  type: "select" | "text" | "date" | "boolean"
  options?: { label: string; value: string }[]
}

export const TableFiltersSheet = ({
  filters,
  activeFilters,
  applyFilters,
  title,
}: Readonly<{
  filters: DataTableFilter[]
  activeFilters: Record<string, any>
  applyFilters: (filters: Record<string, any>) => void
  title: string
}>) => {
  const [tempFilters, setTempFilters] = useState<Record<string, any>>({ ...activeFilters })
  const [searchQuery, setSearchQuery] = useState("")
  const updateTempFilter = (key: string, value: any) => {
    setTempFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const resetTempFilters = () => {
    setTempFilters({ ...activeFilters })
  }

  const clearFilter = (key: string) => {
    const newFilters = { ...tempFilters }
    delete newFilters[key]
    setTempFilters(newFilters)
  }

  const booleanFilters = filters.filter(
    (filter) => filter.type === "boolean" && filter.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectFilters = [...filters.filter(
    (filter) => filter.type === "select" && filter.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )]

  const textFilters = filters.filter(
    (filter) => filter.type === "text" && filter.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const dateFilters = filters.filter(
    (filter) => filter.type === "date" && filter.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const hasMatchingFilters =
    booleanFilters.length > 0 || selectFilters.length > 0 || textFilters.length > 0 || dateFilters.length > 0

  return (
    <Sheet
      onOpenChange={(open) => {
        if (open) {
          setTempFilters({ ...activeFilters })
          setSearchQuery("")
        }
      }}
    >
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 relative">
          <Filter size={16} className="mr-2" />
          Filters
          {Object.keys(activeFilters).length > 0 && (
            <Badge variant="default" className="ml-1 h-5 min-w-5 rounded-full p-1 text-xs line-clamp-1">
              {Object.keys(activeFilters).length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Filter {title.replace(" Management", "")}</SheetTitle>
            <SheetClose asChild className="hidden">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X size={16} />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </div>
          <SheetDescription>Apply filters to narrow down your list</SheetDescription>
        </SheetHeader>

        {filters.length > 5 && (
          <div className="relative mt-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search filters..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        <div className="flex flex-col gap-6 py-6 overflow-y-auto max-h-[calc(100vh-12rem)] scrollbar px-2">
          {booleanFilters.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Toggle Filters</h3>
              <div className="space-y-4">
                {booleanFilters.map((filter) => (
                  <div key={filter.key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={filter.key} className="text-sm font-medium">
                        {filter.name}
                      </Label>
                      {tempFilters[filter.key] && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => clearFilter(filter.key)}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={filter.key}
                        checked={!!tempFilters[filter.key]}
                        onCheckedChange={(checked) => updateTempFilter(filter.key, checked)}
                      />
                      <Label htmlFor={filter.key} className="text-sm text-muted-foreground">
                        {tempFilters[filter.key] ? "Yes" : "No"}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectFilters.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Dropdown Filters</h3>
              <div className="space-y-4">
                {selectFilters.map((filter) => (
                  <div key={filter.key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={filter.key} className="text-sm font-medium">
                        {filter.name}
                      </Label>
                      {tempFilters[filter.key] !== undefined && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => clearFilter(filter.key)}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    <Select
                      value={tempFilters[filter.key] || ""}
                      onValueChange={(value) => updateTempFilter(filter.key, value)}
                    >
                      <SelectTrigger id={filter.key} className="w-full">
                        <SelectValue placeholder={`Select ${filter.name.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {filter?.options?.map((option) => (
                          <SelectItem key={option.value} value={option?.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {textFilters.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Text Filters</h3>
              <div className="space-y-4">
                {textFilters.map((filter) => (
                  <div key={filter.key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={filter.key} className="text-sm font-medium">
                        {filter.name}
                      </Label>
                      {tempFilters[filter.key] !== undefined && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => clearFilter(filter.key)}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    <Input
                      id={filter.key}
                      type="text"
                      placeholder={`Enter ${filter.name.toLowerCase()}`}
                      value={tempFilters[filter.key] || ""}
                      onChange={(e) => updateTempFilter(filter.key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {dateFilters.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Date Filters</h3>
              <div className="space-y-4">
                {dateFilters.map((filter) => (
                  <div key={filter.key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={filter.key} className="text-sm font-medium">
                        {filter.name}
                      </Label>
                      {tempFilters[filter.key] !== undefined && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => clearFilter(filter.key)}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Input
                        id={filter.key}
                        type="date"
                        className="w-full"
                        value={tempFilters[filter.key] || ""}
                        onChange={(e) => updateTempFilter(filter.key, e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        {tempFilters[filter.key]
                          ? new Date(tempFilters[filter.key]).toLocaleDateString()
                          : "No date selected"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!hasMatchingFilters && (
            <div className="py-6 text-center text-muted-foreground">No filters match your search</div>
          )}
        </div>

        <SheetFooter className="flex-row gap-2 sm:justify-between">
          <Button variant="outline" size="sm" onClick={resetTempFilters}>
            Reset
          </Button>
          <SheetClose asChild>
            <Button size="sm" onClick={() => applyFilters(tempFilters)} disabled={Object.keys(tempFilters).length === 0}>
              Apply Filters
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export const TableActiveFilters = ({
  activeFilters,
  filters,
  removeFilter,
  clearAllFilters,
}: Readonly<{
  activeFilters: Record<string, any>
  filters: DataTableFilter[]
  removeFilter: (key: string) => void
  clearAllFilters: () => void
}>) => {
  if (Object.entries(activeFilters).filter(([k, v]) => k && v).length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {Object.entries(activeFilters).map(([key, value]) => {
        if (!key || !value)
          return null
        const filter = filters.find((f) => f.key === key)
        let displayValue = ""

        if (filter?.type === "select" && filter.options) {
          const option = filter.options.find((opt) => opt.value === value)
          displayValue = option?.label ?? String(value).toString()
        } else if (filter?.type === "boolean") {
          displayValue = value ? "Yes" : "No"
        } else if (filter?.type === "date") {
          try {
            displayValue = new Date(value).toLocaleDateString()
          } catch (e) {
            displayValue = String(value)
          }
        } else {
          displayValue = Array.isArray(value) ? value.join(", ") : String(value).toString()
        }

        return (
          <Badge key={key} variant="secondary" className="flex items-center gap-1 px-2 py-1">
            <span className="font-medium">{filter?.name ?? key}:</span>
            <span className="max-w-[150px] truncate">{displayValue}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 ml-1 hover:bg-muted"
              onClick={() => removeFilter(key)}
            >
              <X size={12} />
              <span className="sr-only">Remove {filter?.name ?? key} filter</span>
            </Button>
          </Badge>
        )
      })}
      <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={clearAllFilters}>
        Clear all
      </Button>
    </div>
  )
}