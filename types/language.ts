export type Locale = "en" | "fr" | "zh" | "ru" | "it" | "ar";

export type TLanguage = { code: Locale; name: string; };
export const Languages: TLanguage[] = [
    {
        name: "English",
        code: "en",
    },
    {
        name: "Arabic",
        code: "ar",
    },
    {
        name: "French",
        code: "fr",
    },
    {
        name: "Italian",
        code: "it",
    },
    {
        name: "Russian",
        code: "ru",
    },
    {
        name: "Chinese",
        code: "zh",
    }
];
