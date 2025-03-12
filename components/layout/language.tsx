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
import { Link, redirect, usePathname, useRouter } from "@/i18n/routing"
import { useSearchParams } from "next/navigation"
import { useLocale } from "next-intl"

export function Language({ className }: Readonly<{ className?: string }>) {
    const searchParams = (useSearchParams())?.toString();
    const pathname = usePathname()
    const locale = useLocale();
    const router = useRouter()
    const defaultLang = Languages.find(l => l.code === (locale ?? "en")) ?? Languages[0]


    const [selectedLanguage, setSelectedLanguage] = React.useState<TLanguage>(defaultLang)

    function handleChange(code: Locale) {
        const selected = Languages.find(l => l.code === code) ?? defaultLang
        setSelectedLanguage(selected)
        redirect({
            href: `${pathname}?${searchParams}`,
            locale: selected.code
        })
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
