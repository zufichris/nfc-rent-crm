import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreVertical, Package, TrendingUp } from "lucide-react"

export function DeliveryPerformance() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-semibold">Delivery Performance</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">12% increase in this month</p>
        </div>
        <button className="text-gray-500 dark:text-gray-400">
          <MoreVertical className="h-5 w-5" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mt-4">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-md">
            <Package className="h-6 w-6 text-indigo-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Packages in transit</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-500">25.8%</span>
                </div>
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">10k</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

