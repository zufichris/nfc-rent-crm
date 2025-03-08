'use client'
import * as React from "react"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select"
import Image from "next/image"
import { Languages, Locale, TLanguage } from "@/types/language"
import { cn } from "@/lib/utils"

export function Language({ className }: Readonly<{ className?: string }>) {
    const defaultLang = Languages.find(l => l.code === "en") ?? Languages[0]
    const [selectedLanguage, setSelectedLanguage] = React.useState<TLanguage>(defaultLang)

    function handleChange(code: Locale) {
        const selected = Languages.find(l => l.code === code) ?? defaultLang
        setSelectedLanguage(selected)
    }

    return (
        <div className={cn("w-full", className)}>
            <Select value={selectedLanguage.code} onValueChange={handleChange}>
                <SelectTrigger>
                    <Image
                        src={`https://unpkg.com/language-icons/icons/${selectedLanguage.code.toLowerCase()}.svg`}
                        alt={selectedLanguage.code}
                        height={30}
                        width={30}
                        className="aspect-square rounded-full mx-1"
                    />
                    {selectedLanguage.name}
                </SelectTrigger>
                <SelectContent>
                    {Languages.map(({ name, code }) => (
                        <SelectItem key={code} value={code} className="cursor-pointer">
                            <div className="flex space-x-1 items-center line-clamp-1">
                                <span>{name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
