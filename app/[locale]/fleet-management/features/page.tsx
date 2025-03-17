import { FeatureTable } from "@/components/feature/feature-table/table";
import { StatCard } from "@/components/misc/stat-card";
import { getCars } from "@/lib/actions/cars";
import { IFeature } from "@/types/features";
import { CheckCircle, Star, Tag, Trash2 } from "lucide-react";
import React from "react";

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

const features: IFeature[] = [
    {
        id: "1",
        name: "Leather Seats",
        code: "leather-seats",
        slug: "leather-seats",
        category: "interior",
        isHighlighted: true,
        shortDescription: "Premium leather seats for maximum comfort.",
        description:
            "Our premium leather seats are handcrafted with the finest materials to provide maximum comfort and luxury during your drive.",
        isActive: true,
        isDeleted: false,
        createdAt: "2023-01-05",
    },
    {
        id: "2",
        name: "Navigation System",
        code: "navigation-system",
        slug: "navigation-system",
        category: "technology",
        isHighlighted: true,
        shortDescription: "Advanced GPS navigation system.",
        description: "State-of-the-art GPS navigation system with real-time traffic updates and voice guidance.",
        isActive: true,
        isDeleted: false,
        createdAt: "2023-01-10",
    },
    {
        id: "3",
        name: "Panoramic Sunroof",
        code: "panoramic-sunroof",
        slug: "panoramic-sunroof",
        category: "exterior",
        isHighlighted: true,
        shortDescription: "Full-length glass roof with electric sunshade.",
        description:
            "Enjoy the sky view with our panoramic sunroof that spans the entire length of the car roof, complete with an electric sunshade for comfort.",
        isActive: true,
        isDeleted: false,
        createdAt: "2023-01-15",
    },
    {
        id: "4",
        name: "Adaptive Cruise Control",
        code: "adaptive-cruise-control",
        slug: "adaptive-cruise-control",
        category: "safety",
        isHighlighted: false,
        shortDescription: "Automatically adjusts speed to maintain safe distance.",
        description:
            "Our adaptive cruise control system uses radar sensors to automatically adjust your speed and maintain a safe distance from the vehicle ahead.",
        isActive: true,
        isDeleted: false,
        createdAt: "2023-01-20",
    },
    {
        id: "5",
        name: "Premium Sound System",
        code: "premium-sound-system",
        slug: "premium-sound-system",
        category: "entertainment",
        isHighlighted: true,
        shortDescription: "High-fidelity audio system with multiple speakers.",
        description:
            "Experience concert-quality sound with our premium audio system featuring multiple strategically placed speakers and advanced sound processing.",
        isActive: true,
        isDeleted: false,
        createdAt: "2023-01-25",
    },
    {
        id: "6",
        name: "Wireless Charging",
        code: "wireless-charging",
        slug: "wireless-charging",
        category: "technology",
        isHighlighted: false,
        shortDescription: "Charge your devices without cables.",
        description:
            "Conveniently charge your compatible devices without the need for cables using our integrated wireless charging pad.",
        isActive: true,
        isDeleted: false,
        createdAt: "2023-01-30",
    },
]

export default async function FeatureListPage({ params }: Readonly<{ params: Promise<{ search: Record<string, string> }> }>) {
    const totalFeatures = features.length
    const activeFeatures = features.filter((feature) => feature.isActive).length
    const highlightedFeatures = features.filter((feature) => feature.isHighlighted).length
    const deletedFeatures = features.filter((feature) => feature.isDeleted).length
    const { search } = await params

    return <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Features" subtitle="All Features" icon={<Tag />} variant="info" value={totalFeatures} />
            <StatCard
                title="Active Features"
                subtitle="Currently Active"
                icon={<CheckCircle />}
                variant="success"
                value={activeFeatures}
            />
            <StatCard
                title="Highlighted"
                subtitle="Featured Items"
                icon={<Star />}
                variant="warning"
                value={highlightedFeatures}
            />
            <StatCard
                title="Deleted Features"
                subtitle="Removed Features"
                icon={<Trash2 />}
                variant="destructive"
                value={deletedFeatures}
            />
        </div>
        <FeatureTable
            features={features}
            // categories={categories}
            total={features.length}
            page={1}
            limit={features.length}
            activeFilters={search}
        />
    </>
}