import { ModelTable } from "@/components/models/model-table/table"
import { StatCard } from "@/components/misc/stat-card"
import { Car, CheckCircle, Trash2, Building } from "lucide-react"
import { getModels } from "@/lib/actions/model"
import { GetModelsFilters } from "@/types/model"
import ErrorPage from "../../error"

export async function generateMetadata() {
    return {
        title: 'Fleet Models Management | NFC Car Rental CRM',
        description: 'Manage vehicle models, track inventory, and monitor model performance across your rental fleet.',
        keywords: 'car rental, fleet management, vehicle models, rental inventory, NFC CRM',
        openGraph: {
            title: 'Fleet Models Management | NFC Car Rental CRM',
            description: 'Comprehensive fleet model management system for car rental businesses',
            type: 'website',
            images: ['/og-fleet-management.jpg'],
        },
        robots: {
            index: true,
            follow: true,
        }
    }
}

export default async function ModelsListPage({ searchParams }: Readonly<{ searchParams: Promise<GetModelsFilters> }>)  {
    const search  = await searchParams
    const res = await getModels(search)
    if (!res.success) {
        return <ErrorPage error={{
            cause: 'Failed to fetch models',
            message: res.message,
            status: res.status
        }} />
    }
    const { data: models, activeCount, deletedCount, limit, page, total } = res
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Models"
                    subtitle="All Car Models"
                    icon={<Car />}
                    variant="info"
                    value={total} />
                <StatCard
                    title="Active Models"
                    subtitle="Currently Active"
                    icon={<CheckCircle />}
                    variant="success"
                    value={activeCount}
                />
                <StatCard
                    title="Brands"
                    subtitle="Associated Brands"
                    icon={<Building />}
                    variant="default"
                    value={total}
                />
                <StatCard
                    title="Deleted Models"
                    subtitle="Removed Models"
                    icon={<Trash2 />}
                    variant="destructive"
                    value={deletedCount}
                />
            </div>
            <ModelTable
                models={models}
                total={total}
                page={page}
                limit={limit}
                activeFilters={search}
            />
        </>
    )
}

