import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "../ui/skeleton"
import { cn } from "@/lib/utils"
import { getVariant, Variant } from "../theme/variants"

interface StatCardProps {
  icon?: React.ReactNode
  title: string
  value?: string | number
  change?: string
  variant: Variant
  subtitle: string
}

export function StatCard({ icon, title, value, change, variant, subtitle }: Readonly<StatCardProps>) {
  const color = getVariant(variant, {
    invert: true
  })
  return (
    <Card className="border-0 shadow-lg bg-card backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className={cn("p-2 rounded-md shadow-sm text-primary  bg-muted", color)}>{icon}</div>
          <div>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <div className="text-sm text-muted-foreground">{title}</div>
          </div>
        </div>
        <div className="mt-4">
          <span
            className={cn("text-sm font-medium", color, "bg-transparent", "hover:bg-none")}
          >
            {change}
          </span>
          <span className={cn("text-sm text-muted-foreground ml-1", color, "bg-transparent", "hover:bg-none")}>{subtitle}</span>
        </div>
      </CardContent>
    </Card>
  )
}
export function StatCardSkeleton() {
  return (
    <div className="card p-6">
      <div className="flex justify-between items-start">
        <Skeleton className="rounded-full p-2 h-10 w-10 backdrop-blur-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 backdrop-blur-lg animate-pulse" />
          <Skeleton className="h-8 w-32 backdrop-blur-lg animate-pulse" />
          <Skeleton className="h-4 w-40 backdrop-blur-lg animate-pulse" />
        </div>
      </div>
    </div>
  )
}
