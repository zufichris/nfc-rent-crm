"use client"

import * as React from "react"
import { X, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export type Option = {
    label: string
    value: string
    disabled?: boolean
    group?: string
}

interface MultiSelectProps {
    options: Option[]
    selected: string[]
    onChange: (values: string[]) => void
    placeholder?: string
    maxDisplayItems?: number
    disabled?: boolean
    className?: string
}

export function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = "Select options",
    maxDisplayItems = 3,
    disabled = false,
    className,
}: Readonly<MultiSelectProps>) {
    const [open, setOpen] = React.useState(false)

    const groupedOptions = React.useMemo(() => {
        const groups: Record<string, Option[]> = {}

        options.forEach((option) => {
            const group = option.group || "default"
            if (!groups[group]) {
                groups[group] = []
            }
            groups[group].push(option)
        })

        return groups
    }, [options])

    const selectedItems = React.useMemo(
        () => options.filter((option) => selected.includes(option.value)),
        [options, selected],
    )

    const handleRemove = (value: string, e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        onChange(selected.filter((item) => item !== value))
    }

    const handleSelect = (value: string) => {
        setOpen(true)

        if (selected.includes(value)) {
            onChange(selected.filter((item) => item !== value))
        } else {
            onChange([...selected, value])
        }

        return false
    }

    const handleClearAll = (e: React.MouseEvent) => {
        e.stopPropagation()
        onChange([])
    }

    const displayedItems = selectedItems.slice(0, maxDisplayItems)
    const remainingCount = selectedItems.length - displayedItems.length

    const CustomSelectItem = React.forwardRef<
        HTMLDivElement,
        React.ComponentPropsWithoutRef<typeof SelectItem> & { onSelect?: (value: string) => void }
    >(({ children, value, className, onSelect, ...props }, ref) => {
        const isSelected = selected.includes(value as string)

        return (
            <SelectItem
                ref={ref}
                value={value as string}
                className={cn("flex items-center justify-between pr-2", isSelected && "bg-accent", className)}
                onSelect={(e) => {
                    e.preventDefault()
                    if (onSelect) {
                        onSelect(value as string)
                    }
                }}
                {...props}
            >
                <span>{children}</span>
                {isSelected && <Check className="h-4 w-4 text-primary" />}
            </SelectItem>
        )
    })
    CustomSelectItem.displayName = "CustomSelectItem"

    return (
        <div className={cn("relative", className)}>
            <Select open={open} onOpenChange={setOpen} value={selected.length ? selected[0] : undefined} disabled={disabled}>
                <SelectTrigger className={cn("w-full", selected.length > 0 ? "h-auto min-h-10 py-2" : "h-10")}>
                    <div className="flex flex-wrap gap-1 items-center truncate">
                        {selected.length === 0 && <SelectValue placeholder={placeholder} />}

                        {displayedItems.map((item) => (
                            <Badge key={item.value} variant="secondary" className="mr-1 mb-1">
                                {item.label}
                                <button
                                    className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring"
                                    onClick={(e) => handleRemove(item.value, e)}
                                    disabled={disabled}
                                >
                                    <X className="h-3 w-3" />
                                    <span className="sr-only">Remove {item.label}</span>
                                </button>
                            </Badge>
                        ))}

                        {remainingCount > 0 && (
                            <Badge variant="secondary" className="mb-1">
                                +{remainingCount} more
                            </Badge>
                        )}
                    </div>
                </SelectTrigger>

                <SelectContent>
                    {selected.length > 0 && (
                        <div className="flex items-center justify-between px-2 py-1.5">
                            <span className="text-sm text-muted-foreground">{selected.length} selected</span>
                            <Button variant="ghost" size="sm" className="h-auto p-1 text-xs" onClick={handleClearAll}>
                                Clear all
                            </Button>
                        </div>
                    )}

                    {Object.entries(groupedOptions).map(([group, groupOptions]) => (
                        <SelectGroup key={group}>
                            {group !== "default" && <SelectLabel>{group}</SelectLabel>}

                            {groupOptions.map((option) => (
                                <CustomSelectItem
                                    key={option.value}
                                    value={option.value}
                                    disabled={option.disabled}
                                    onSelect={(value: any) => handleSelect(value)}
                                >
                                    {option.label}
                                </CustomSelectItem>
                            ))}
                        </SelectGroup>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

