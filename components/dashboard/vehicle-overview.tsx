"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Package, Clock, Loader, MoreVertical } from "lucide-react"

export function VehicleOverview() {
  const statuses = [
    {
      id: "on-the-way",
      label: "On the way",
      icon: Truck,
      time: "2hr 10min",
      percentage: 39.7,
      color: "bg-indigo-500",
    },
    {
      id: "unloading",
      label: "Unloading",
      icon: Package,
      time: "3hr 15min",
      percentage: 28.3,
      color: "bg-purple-500",
    },
    {
      id: "loading",
      label: "Loading",
      icon: Loader,
      time: "1hr 24min",
      percentage: 17.4,
      color: "bg-cyan-500",
    },
    {
      id: "waiting",
      label: "Waiting",
      icon: Clock,
      time: "5hr 19min",
      percentage: 14.6,
      color: "bg-gray-700 dark:bg-gray-600",
    },
  ]

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Vehicle Overview</CardTitle>
        <button className="text-gray-500 dark:text-gray-400">
          <MoreVertical className="h-5 w-5" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-6">
          {statuses.map((status) => (
            <div key={status.id} className="text-center">
              <div className="text-sm font-medium text-foreground">{status.label}</div>
            </div>
          ))}
        </div>

        <div className="h-3 w-full flex rounded-full overflow-hidden mb-6">
          {statuses.map((status) => (
            <div key={status.id} className={`${status.color}`} style={{ width: `${status.percentage}%` }} />
          ))}
        </div>

        <div className="space-y-4">
          {statuses.map((status) => {
            const StatusIcon = status.icon
            return (
              <div key={status.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <StatusIcon className="h-5 w-5 mr-3 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm font-medium text-foreground">{status.label}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-foreground">{status.time}</span>
                  <span className="text-sm font-medium text-foreground w-12 text-right">{status.percentage}%</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

