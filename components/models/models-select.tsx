"use client"

import { useCallback, useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { IModel } from "@/types/model"
import { getModels } from "@/lib/actions/model"
import { Label } from "@/components/ui/label"
import { AlertCircle, Car, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

interface CarModelsSelectProps {
  name?: string
  label?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
  className?: string
}

export function CarModelsSelect({
  name,
  label,
  defaultValue,
  onChange,
  disabled = false,
  placeholder = "Select a model",
  className,
  ...props
}: Readonly<CarModelsSelectProps>) {
  const [models, setModels] = useState<IModel[]>([])
  const [selectedModel, setSelectedModel] = useState<IModel | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadModels = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await getModels()

      if (res.success) {
        setModels(res.data)
        if (defaultValue) {
          const model = res.data.find((m) => m.id === defaultValue)
          setSelectedModel(model)
        }
      } else {
        setError(`Could not load models: ${res.message}`)
      }
    } catch (err) {
      setError(`Failed to load models: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }, [defaultValue])

  useEffect(() => {
    loadModels()
  }, [loadModels])

  const handleValueChange = (value: string) => {
    const model = models.find((m) => m.id === value)
    setSelectedModel(model)

    if (onChange) {
      onChange(value)
    }
  }

  const handleRefresh = () => {
    loadModels()
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
            <SelectTrigger className="w-full pr-10" aria-label={label || "Car model selector"}>
              <SelectValue placeholder={placeholder}>
                {selectedModel ? (
                  <span className="flex items-center gap-1.5">{selectedModel.name || selectedModel.code}</span>
                ) : null}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {models.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">No models available</div>
              ) : (
                models.map((model) => (
                  <SelectItem key={model.id} value={model.id} className="flex items-center gap-1.5">
                    {model.name || model.code}
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
            aria-label="Refresh models list"
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

