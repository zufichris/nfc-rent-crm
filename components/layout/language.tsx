'use client'
import * as React from "react"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select"
import Image from "next/image"
import { Languages, TLanguage } from "@/types/language"
import { cn } from "@/lib/utils"

export function Language({ className }: Readonly<{ className?: string }>) {
    const [selectedLanguage, setSelectedLanguage] = React.useState<TLanguage>(
        Languages.find(e => e.code === "en")!
    )

    const handleChange = (value: string) => {
        const lang = Languages.find(e => e.code === value)
        if (lang) {
            setSelectedLanguage(lang)
        }
    }

    return (
        <div className={cn("w-full", className)}>
            <Select value={selectedLanguage.code} onValueChange={handleChange}>
                <SelectTrigger>
                    <Image
                        src={`https://unpkg.com/language-icons/icons/${selectedLanguage.code}.svg`}
                        alt={selectedLanguage.code}
                        height={30}
                        width={30}
                        className="aspect-square rounded-full mx-1"
                    />
                    {selectedLanguage.name}
                </SelectTrigger>
                <SelectContent>
                    {Languages.map(lang => (
                        <SelectItem key={lang.code} value={lang.code} className="cursor-pointer">
                            <div className="flex space-x-1 items-center line-clamp-1">
                                <span>{lang.name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
