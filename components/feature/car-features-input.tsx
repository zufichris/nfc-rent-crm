"use client"

import type React from "react"

import { useCallback, useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import type { IFeature } from "@/types/feature"
import { getFeatures } from "@/lib/actions/feature"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AlertCircle, Check, ChevronsUpDown, ListPlus, Plus, RefreshCw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"

interface CarFeaturesSelectProps {
  name?: string
  label?: string
  selectedValues?: string[]
  defaultValues?: string[]
  onChange?: (value: string[]) => void
  disabled?: boolean
  placeholder?: string
  className?: string
  allowCustomFeatures?: boolean
}

export function CarFeaturesSelect({
  name,
  label = "Features",
  selectedValues = [],
  defaultValues = [],
  onChange,
  disabled = false,
  placeholder = "Select features",
  className,
  allowCustomFeatures = true,
}: Readonly<CarFeaturesSelectProps>) {
  const [features, setFeatures] = useState<IFeature[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>(selectedValues.length ? selectedValues : defaultValues)
  const [customFeature, setCustomFeature] = useState("")
  const [customFeatures, setCustomFeatures] = useState<IFeature[]>([])
  const [inputFocus, setInputFocus] = useState(false)

  const loadFeatures = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await getFeatures()

      if (res.success) {
        setFeatures(res.data)
      } else {
        setError(`Could not load features: ${res.message}`)
      }
    } catch (err) {
      setError(`Failed to load features: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadFeatures()
  }, [loadFeatures])

  // Update selected values when prop changes
  useEffect(() => {
    if (selectedValues.length) {
      setSelected(selectedValues)
    }
  }, [selectedValues])

  const handleSelect = useCallback(
    (value: string) => {
      setSelected((current) => {
        const newSelected = current.includes(value) ? current.filter((item) => item !== value) : [...current, value]

        onChange?.(newSelected)
        return newSelected
      })
    },
    [onChange],
  )

  const handleRemove = useCallback(
    (value: string) => {
      setSelected((current) => {
        const newSelected = current.filter((item) => item !== value)
        onChange?.(newSelected)
        return newSelected
      })
    },
    [onChange],
  )

  const handleAddCustomFeature = useCallback(() => {
    if (!customFeature.trim()) return

    const customId = `custom-${Date.now()}`

    const newCustomFeature = {
      id: customId,
      name: customFeature.trim(),
      code: customFeature.trim(),
    }

    setCustomFeatures((prev) => [...prev, newCustomFeature as IFeature])

    handleSelect(customId)

    setCustomFeature("")
  }, [customFeature, handleSelect])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && customFeature.trim()) {
      e.preventDefault()
      handleAddCustomFeature()
    }
  }

  const allFeatures = [...features, ...customFeatures]

  const getFeatureName = (id: string) => {
    const feature = allFeatures.find((f) => f.id === id)
    return feature?.name || feature?.code || id
  }

  return (
    <div className={cn("grid w-full gap-2", className)}>
      {label && (
        <Label htmlFor={name} className="flex items-center gap-1.5">
          <ListPlus size={16} className="text-muted-foreground" />
          {label}
        </Label>
      )}

      {isLoading ? (
        <Skeleton className="h-10 w-full rounded-md" />
      ) : (
        <div className="relative">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                disabled={disabled}
                className={cn("w-full justify-between h-auto min-h-10", selected.length > 0 ? "h-auto" : "h-10")}
              >
                <div className="flex flex-wrap gap-1 py-1">
                  {selected.length === 0 && <span className="text-muted-foreground">{placeholder}</span>}
                  {selected.map((value) => (
                    <Badge key={value} variant="secondary" className="flex items-center gap-1 px-2 py-0.5">
                      {getFeatureName(value)}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1 hover:bg-secondary-foreground/20 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemove(value)
                        }}
                        aria-label={`Remove ${getFeatureName(value)}`}
                      >
                        <X size={10} />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <ChevronsUpDown size={16} className="shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command className="w-full">
                <CommandInput placeholder="Search features..." className="h-9" />
                <CommandList>
                  <CommandEmpty className="py-3 text-center text-sm">
                    No features found.
                    {allowCustomFeatures && (
                      <Button
                        variant="link"
                        size="sm"
                        className="mx-auto mt-1 h-auto p-0"
                        onClick={() => setInputFocus(true)}
                      >
                        Add a custom feature
                      </Button>
                    )}
                  </CommandEmpty>
                  <CommandGroup heading="Available Features">
                    <ScrollArea className="h-[200px]">
                      {allFeatures.map((feature) => (
                        <CommandItem
                          key={feature.id}
                          value={feature.name || feature.code}
                          onSelect={() => handleSelect(feature.id)}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <Check
                              size={16}
                              className={cn(
                                "opacity-0 transition-opacity",
                                selected.includes(feature.id) ? "opacity-100" : "opacity-0",
                              )}
                            />
                            <span>{feature.name || feature.code}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </ScrollArea>
                  </CommandGroup>

                  {allowCustomFeatures && (
                    <div className="border-t p-2">
                      <div className="flex items-center gap-2">
                        <Input
                          value={customFeature}
                          onChange={(e) => setCustomFeature(e.target.value)}
                          placeholder="Add custom feature..."
                          className="h-8 flex-1"
                          onKeyDown={handleKeyDown}
                          autoFocus={inputFocus}
                          onFocus={() => setInputFocus(false)}
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          className="h-8 px-2"
                          onClick={handleAddCustomFeature}
                          disabled={!customFeature.trim()}
                        >
                          <Plus size={16} className="mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-8 w-8"
            onClick={(e) => {
              e.stopPropagation()
              loadFeatures()
            }}
            disabled={disabled || isLoading}
            aria-label="Refresh features list"
          >
            <RefreshCw
              size={16}
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                isLoading && "animate-spin",
              )}
            />
          </Button>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

