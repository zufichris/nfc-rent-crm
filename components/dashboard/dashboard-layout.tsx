import type React from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
}

export function DashboardLayout({ children, className }: Readonly<DashboardLayoutProps>) {
  return (
    <div>
      {children}
    </div>
  )
}

