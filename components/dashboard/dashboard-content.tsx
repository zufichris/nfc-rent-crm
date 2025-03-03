import { Truck, AlertTriangle, MapPin, Clock } from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { VehicleOverview } from "@/components/dashboard/vehicle-overview"
import { ShipmentStatistics } from "@/components/dashboard/shipment-statistics"
import { DeliveryPerformance } from "@/components/dashboard/delivery-performance"
import { DeliveryExceptions } from "@/components/dashboard/delivery-exceptions"
import { OrdersByCountries } from "@/components/dashboard/orders-by-countries"

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Truck className="h-6 w-6 text-indigo-500" />}
          iconBg="bg-indigo-100 dark:bg-indigo-900/30"
          title="On route vehicles"
          value="42"
          change="+18.2%"
          changeType="positive"
          subtitle="than last week"
        />
        <StatCard
          icon={<AlertTriangle className="h-6 w-6 text-amber-500" />}
          iconBg="bg-amber-100 dark:bg-amber-900/30"
          title="Vehicles with errors"
          value="8"
          change="-8.7%"
          changeType="negative"
          subtitle="than last week"
        />
        <StatCard
          icon={<MapPin className="h-6 w-6 text-rose-500" />}
          iconBg="bg-rose-100 dark:bg-rose-900/30"
          title="Deviated from route"
          value="27"
          change="+4.3%"
          changeType="positive"
          subtitle="than last week"
        />
        <StatCard
          icon={<Clock className="h-6 w-6 text-cyan-500" />}
          iconBg="bg-cyan-100 dark:bg-cyan-900/30"
          title="Late vehicles"
          value="13"
          change="+2.5%"
          changeType="positive"
          subtitle="than last week"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VehicleOverview />
        <ShipmentStatistics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DeliveryPerformance />
        <DeliveryExceptions />
        <OrdersByCountries />
      </div>
    </div>
  )
}

