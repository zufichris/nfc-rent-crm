"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import type { IModel } from "@/types/model"
import { getModels } from "@/lib/actions/model"
import { Label } from "@/components/ui/label"

interface CarModelsSelectProps {
    name?: string
    label?: string
    defaultValue?: string
    onChange?: (value: string) => void
    disabled?: boolean
    placeholder?: string
}

export function CarModelsSelect({
    name,
    label,
    defaultValue,
    onChange,
    disabled = false,
    placeholder = "Select a model",
    ...props
}: Readonly<CarModelsSelectProps>) {
    const [models, setModels] = useState<IModel[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadModels() {
            try {
                setIsLoading(true)
                setError(null)

                const res = await getModels()

                if (res.success) {
                    setModels(res.data)
                } else {
                    setError(res.message || "Failed to load models")
                }
            } catch (err) {
                setError("An unexpected error occurred")
                console.error("Error loading car models:", err)
            } finally {
                setIsLoading(false)
            }
        }

        loadModels()
    }, [])

    const handleValueChange = (value: string) => {
        if (onChange) {
            onChange(value)
        }
    }

    return (
        <div className="grid w-full gap-1.5">
            {label&& <Label htmlFor={name}>{label}</Label>}

            <Select
                name={name}
                onValueChange={handleValueChange}
                defaultValue={defaultValue}
                disabled={disabled || isLoading}
                {...props}
            >
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {models.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                            {model.id}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
    )
}

