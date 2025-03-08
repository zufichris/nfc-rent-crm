"use client"

import type React from "react"

import { useState, type KeyboardEvent } from "react"
import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface TagInputProps {
    placeholder?: string
    tags: string[]
    setTags: (tags: string[]) => void
    disabled?: boolean
}

export function TagInput({ placeholder, tags, setTags, disabled = false }: TagInputProps) {
    const [inputValue, setInputValue] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault()
            if (!tags.includes(inputValue.trim())) {
                setTags([...tags, inputValue.trim()])
            }
            setInputValue("")
        }
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="gap-1 px-2 py-1">
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring"
                            disabled={disabled}
                        >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {tag}</span>
                        </button>
                    </Badge>
                ))}
            </div>
            <Input
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    )
}

