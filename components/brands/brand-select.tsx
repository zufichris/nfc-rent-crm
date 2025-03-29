"use client"

import { useCallback, useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AlertCircle, Car, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { IBrand } from "@/types/brand"
import { getBrands } from "@/lib/actions/brands"

interface BrandSelectProps {
  name?: string
  label?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
  className?: string
}

export function BrandSelect({
  name,
  label,
  defaultValue,
  onChange,
  disabled = false,
  placeholder = "Select a brand",
  className,
  ...props
}: Readonly<BrandSelectProps>) {
  const [brands, setBrands] = useState<IBrand[]>([])
  const [selectedBrand, setSelectedBrand] = useState<IBrand | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadBrands = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await getBrands()

      if (res.success) {
        setBrands(res.data)
        if (defaultValue) {
          const brand = res.data.find((b) => b.id === defaultValue)
          setSelectedBrand(brand)
        }
      } else {
        setError(`Could not load brands: ${res.message}`)
      }
    } catch (err) {
      setError(`Failed to load brands: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }, [defaultValue])

  useEffect(() => {
    loadBrands()
  }, [loadBrands])

  const handleValueChange = (value: string) => {
    const brand = brands.find((b) => b.id === value)
    setBrands(brands)
    setSelectedBrand(brand)
    if (onChange) {
      onChange(value)
    }
  }

  const handleRefresh = () => {
    loadBrands()
  }

  return (
    <div className={cn("grid w-full gap-2", className)}>
      {label && (
        <Label htmlFor={name} className="flex items-center gap-1.5">
          <Car size={16} className="text-muted-foreground" />
          {label}
        </Label>
      )}

      <div className="relative">
        {isLoading ? (
          <Skeleton className="h-10 w-full rounded-md" />
        ) : (
          <Select
            name={name}
            onValueChange={handleValueChange}
            defaultValue={defaultValue}
            disabled={disabled}
            {...props}
          >
            <SelectTrigger className="w-full pr-10" aria-label={label || "Car brand selector"}>
              <SelectValue placeholder={placeholder}>
                {selectedBrand ? (
                  <span className="flex items-center gap-1.5">{selectedBrand.name || selectedBrand.id}</span>
                ) : null}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {brands.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">No brands available</div>
              ) : (
                brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id} className="flex items-center gap-1.5">
                    {brand.name || brand.code}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        )}

        {!isLoading && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-8 w-8"
            onClick={handleRefresh}
            disabled={disabled}
            aria-label="Refresh Brands list"
          >
            <RefreshCw size={16} className="text-muted-foreground hover:text-foreground transition-colors" />
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="destructive" className="py-1 flex items-center">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

