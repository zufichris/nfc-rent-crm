import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function OrdersByCountries() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-semibold">Orders by Countries</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">62 deliveries in progress</p>
        </div>
        <button className="text-gray-500 dark:text-gray-400">
          <MoreVertical className="h-5 w-5" />
        </button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="new">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="new" className="text-sm">
              New
            </TabsTrigger>
            <TabsTrigger value="preparing" className="text-sm">
              Preparing
            </TabsTrigger>
            <TabsTrigger value="shipping" className="text-sm">
              Shipping
            </TabsTrigger>
          </TabsList>
          <TabsContent value="new" className="mt-0">
            <div className="flex justify-center items-center h-[150px]">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white">Buy Now</Button>
            </div>
          </TabsContent>
          <TabsContent value="preparing" className="mt-0">
            <div className="flex justify-center items-center h-[150px]">
              <p className="text-gray-500 dark:text-gray-400">Orders being prepared</p>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="mt-0">
            <div className="flex justify-center items-center h-[150px]">
              <p className="text-gray-500 dark:text-gray-400">Orders being shipped</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

