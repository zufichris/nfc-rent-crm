import { useEffect, useState } from "react"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { IFeature } from "@/types/feature"
import { getFeatures } from "@/lib/actions/feature"
import { TagInput } from "../misc/tag"
import { MultiSelect } from "../misc/multi-select"


interface CarFeaturesSelectProps {
    name?: string
    label?: string
    values?: [],
    defaultValues?: string[]
    onChange?: (value: string[]) => void
    disabled?: boolean
    placeholder?: string
}

export function CarFeaturesSelect({
    name,
    label,
    defaultValues = [],
    values,
    onChange,
    disabled = false,
    placeholder = "Select features",
}: Readonly<CarFeaturesSelectProps>) {
    const [features, setFeatures] = useState<IFeature[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadFeatures() {
            try {
                setIsLoading(true)
                setError(null)
                const res = await getFeatures()

                if (res.success) {
                    setFeatures(res.data)
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

        loadFeatures()
    }, [])

    const handleValueChange = (value: string[]) => {
        if (onChange) {
            onChange(value)
        }
    }
    return (
        <div className="grid w-full gap-1.5">
            {label && <Label htmlFor={name}>{label}</Label>}
            <MultiSelect options={features.map(f => ({
                label: f.name ?? f.code,
                value: f.id,
            }))} placeholder="Select features" onChange={handleValueChange} selected={values ?? []} />
            {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
    )
}