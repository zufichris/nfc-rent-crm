import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  icon: React.ReactNode
  iconBg: string
  title: string
  value: string
  change: string
  changeType: "positive" | "negative"
  subtitle: string
}

export function StatCard({ icon, iconBg, title, value, change, changeType, subtitle }: Readonly<StatCardProps>) {
  return (
    <Card className="border-0 shadow-lg bg-card backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className={`p-2 rounded-md ${iconBg} shadow-sm`}>{icon}</div>
          <div>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <div className="text-sm text-muted-foreground">{title}</div>
          </div>
        </div>
        <div className="mt-4">
          <span
            className={`text-sm font-medium ${changeType === "positive" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
          >
            {change}
          </span>
          <span className="text-sm text-muted-foreground ml-1">{subtitle}</span>
        </div>
      </CardContent>
    </Card>
  )
}

