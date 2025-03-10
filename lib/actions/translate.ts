"use server"

import { Languages, type Locale } from "@/types/language"

type TranslationContent = {
    name?: string
    shortDescription?: string
    description?: string
}


export async function translateContent(
    content: TranslationContent,
    sourceLanguage: Locale = "en",
    targetLanguage: Locale,
): Promise<TranslationContent> {
    const targetLangName = Languages.find(l => l.code === targetLanguage)?.code ?? "en"
    if (sourceLanguage === targetLanguage) {
        return content
    }
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return {
        name: content.name ? `${content.name} (${targetLangName})` : undefined,
        shortDescription: content.shortDescription ? `${content.shortDescription} (${targetLangName})` : undefined,
        description: content.description ? `${content.description} (${targetLangName})` : undefined,
    }
}

