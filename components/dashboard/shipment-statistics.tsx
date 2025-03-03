"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown } from "lucide-react"

export function ShipmentStatistics() {
  const [month, setMonth] = useState("January")

  // Sample data for the chart
  const chartData = {
    labels: ["1 Jan", "2 Jan", "3 Jan", "4 Jan", "5 Jan", "6 Jan", "7 Jan", "8 Jan", "9 Jan", "10 Jan"],
    shipments: [35, 42, 30, 35, 30, 45, 40, 35, 40, 35],
    deliveries: [20, 25, 20, 35, 25, 40, 30, 35, 25, 20],
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-semibold">Shipment Statistics</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total number of deliveries 23.8k</p>
        </div>
        <div className="flex items-center">
          <Select defaultValue={month} onValueChange={setMonth}>
            <SelectTrigger className="w-[120px] h-8 text-sm border-0 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <SelectValue>{month}</SelectValue>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="January">January</SelectItem>
              <SelectItem value="February">February</SelectItem>
              <SelectItem value="March">March</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <div className="flex h-full">
            <div className="flex flex-col justify-between pr-2 text-xs text-gray-500 dark:text-gray-400">
              <div>50</div>
              <div>40</div>
              <div>30</div>
              <div>20</div>
              <div>10</div>
              <div>0</div>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-10 h-full">
                {chartData.labels.map((label, index) => (
                  <div key={label} className="flex flex-col items-center justify-end">
                    <div className="relative w-full flex items-end justify-center mb-1">
                      <div
                        className="w-6 bg-orange-400 dark:bg-orange-500 rounded-sm"
                        style={{ height: `${chartData.shipments[index] * 2}px` }}
                      />
                    </div>
                    <div
                      className="absolute w-2 h-2 bg-white dark:bg-gray-900 rounded-full border-2 border-purple-500 z-10"
                      style={{ bottom: `${chartData.deliveries[index] * 2 + 24}px` }}
                    />
                    {index > 0 && index < chartData.labels.length - 1 && (
                      <>
                        <div
                          className="absolute w-8 h-[1px] bg-purple-500 -rotate-12"
                          style={{
                            bottom: `${chartData.deliveries[index - 1] * 2 + 25}px`,
                            right: `${50 + (index - 1) * 10}%`,
                          }}
                        />
                        <div
                          className="absolute w-8 h-[1px] bg-purple-500 rotate-12"
                          style={{
                            bottom: `${chartData.deliveries[index + 1] * 2 + 25}px`,
                            left: `${50 + (index) * 10}%`,
                          }}
                        />
                      </>
                    )}
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label.split(" ")[0]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-400 dark:bg-orange-500 mr-2"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Shipment</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Delivery</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

