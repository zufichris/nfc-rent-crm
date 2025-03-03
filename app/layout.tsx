import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Shell } from "@/components/layout/shell"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NFC- Dashboard",
  description: "NFC Rent Dashboard",
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-foreground/10 dark:bg-background/55`}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <Shell>{children}</Shell>
        </ThemeProvider>
      </body>
    </html>
  )
}