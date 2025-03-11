import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Shell } from "@/components/layout/shell"
import { getLoggedInUser } from "@/lib/actions/auth"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NFC- Dashboard",
  description: "NFC Rent Dashboard",
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const res = await getLoggedInUser()
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-foreground/10 dark:bg-background/55 bg-opacity-50 backdrop-blur-md`}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          {res.success ? <Shell>{children}</Shell> : children}
          <Toaster closeButton visibleToasts={2} className="card" />
        </ThemeProvider>
      </body>
    </html>
  )
}