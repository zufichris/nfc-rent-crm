"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreVertical } from "lucide-react"

export function DeliveryExceptions() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Delivery exceptions</CardTitle>
        <button className="text-gray-500 dark:text-gray-400">
          <MoreVertical className="h-5 w-5" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center h-[200px]">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full border-8 border-green-500 border-r-transparent border-b-transparent rotate-45"></div>
            <div className="absolute inset-0 rounded-full border-8 border-green-300 border-l-transparent border-t-transparent -rotate-45"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

