import { defineRouting } from 'next-intl/routing';
import { Languages } from "@/types/language"
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    locales: Languages.map(l => l.code),
    defaultLocale: 'en',
    localePrefix: 'as-needed'
});
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);