export type Locale = "en" | "fr" | "zh" | "ru" | "it" | "ar" | "es"

export type TLanguage = { code: Locale; name: string, sort?: number };
export const Languages: TLanguage[] = [
    { code: "en" as Locale, name: "English", sort: -1},
    { code: "fr" as Locale, name: "Français" },
    { code: "ar" as Locale, name: "العربية" },
    { code: "es" as Locale, name: "Español" },
    { code: "zh" as Locale, name: "中文" },
    { code: "ru" as Locale, name: "Русский" },
    { code: "it" as Locale, name: "Italiano" },
].sort((a, b) => ((a.sort ?? 0) - (b.sort ?? 0)))