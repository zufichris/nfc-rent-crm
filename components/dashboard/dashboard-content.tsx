import { Truck, AlertTriangle, MapPin, Clock } from "lucide-react"
import { StatCard } from "@/components/misc/stat-card"
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
          icon={<Truck className="h-6 w-6" />}
          title="On route vehicles"
          value="42"
          change="+18.2%"
          subtitle="than last week"
          variant="info"
        />
        <StatCard
          icon={<AlertTriangle className="h-6 w-6" />}
          title="Vehicles with errors"
          value="8"
          change="-8.7%"
          subtitle="than last week"
          variant="warning"
        />
        <StatCard
          icon={<MapPin className="h-6 w-6" />}
          title="Deviated from route"
          value="27"
          change="+4.3%"
          subtitle="than last week"
          variant="destructive"
        />
        <StatCard
          icon={<Clock className="h-6 w-6" />}
          title="Late vehicles"
          value="13"
          change="+2.5%"
          subtitle="than last week"
          variant="success"
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

