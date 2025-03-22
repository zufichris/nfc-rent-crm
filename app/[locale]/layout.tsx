import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/components/theme/globals.css"
import { ThemeProvider } from "next-themes"
import { Shell } from "@/components/layout/shell"
import { getLoggedInUser } from "@/lib/actions/auth"
import { Toaster } from "@/components/ui/sonner"
import { Locale } from "@/types/language"
import { NextIntlClientProvider } from "next-intl"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"
import { getMessages } from "next-intl/server"
import { TopLoader } from "@/components/layout/top-loader"
import { cookies } from "next/headers"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NFC- Dashboard",
  description: "NFC Rent Dashboard",
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode,
  params: Promise<{ locale: Locale }>
}>) {
  const { locale } = await params;
  if (!locale || !routing.locales.includes(locale)) {
    notFound()
  }
  const isRtl = locale === "ar"

  const messages = await getMessages();
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get('access_token')?.value;
  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${inter.className} bg-foreground/10 dark:bg-background/55 bg-opacity-50 backdrop-blur-md`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <TopLoader />
          <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
            {isAuthenticated ? <Shell>{children}</Shell> : children}
            <Toaster closeButton visibleToasts={2} className="card" />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}