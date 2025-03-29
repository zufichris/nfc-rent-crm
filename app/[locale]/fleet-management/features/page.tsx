import { FeatureTable } from "@/components/feature/feature-table/table";
import { StatCard } from "@/components/misc/stat-card";
import { getFeatures } from "@/lib/actions/feature";
import { GetFeaturesFilters, IFeature } from "@/types/feature";
import { CheckCircle, Star, Tag, Trash2 } from "lucide-react";
import React from "react";
import ErrorPage from "../../error";

export const metadata = {
    title: 'Feature Management | NFC Car Rental CRM',
    description: 'Manage vehicle features and amenities across your fleet. Track active, highlighted and deleted features.',
    keywords: 'car rental features, vehicle amenities, fleet management, car rental CRM',
    openGraph: {
        title: 'Feature Management - NFC Car Rental CRM',
        description: 'Comprehensive feature management system for vehicle fleet',
        type: 'website',
    },
}


export default async function FeatureListPage({ searchParams }: Readonly<{ searchParams: Promise<GetFeaturesFilters> }>) {

    const search = await searchParams
    const res = await getFeatures(search)
    if (!res.success) {
        return <ErrorPage error={{
            message: res.message,
            status: res.status
        }} />
    }
    const { data: features, total, activeCount, limit, deletedCount, page } = res
    const highlightedCount = features.filter((feature: IFeature) => feature.isHighlighted).length
    return <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Features" subtitle="All Features" icon={<Tag />} variant="info" value={total} />
            <StatCard
                title="Active Features"
                subtitle="Currently Active"
                icon={<CheckCircle />}
                variant="success"
                value={activeCount}
            />
            <StatCard
                title="Highlighted"
                subtitle="Featured Items"
                icon={<Star />}
                variant="warning"
                value={highlightedCount}
            />
            <StatCard
                title="Deleted Features"
                subtitle="Removed Features"
                icon={<Trash2 />}
                variant="destructive"
                value={deletedCount}
            />
        </div>
        <FeatureTable
            features={features}
            total={features.length}
            page={1}
            limit={features.length}
            activeFilters={search}
        />
    </>
}