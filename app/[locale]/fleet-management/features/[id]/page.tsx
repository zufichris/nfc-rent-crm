import { FeaturePage } from '@/components/feature/feature-page'
import { IFeature } from '@/types/features'
import React from 'react'

export default async function FeatureDetailsPage({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
    const { id } = await params
    const feature: IFeature = {
        id: id,
        name: "Leather Seats",
        code: "leather-seats",
        slug: "leather-seats",
        category: "interior",
        isHighlighted: true,
        shortDescription: "Premium leather seats for maximum comfort.",
        description:
            "Our premium leather seats are handcrafted with the finest materials to provide maximum comfort and luxury during your drive. Each seat is meticulously stitched and designed to provide optimal support and comfort for long journeys.\n\nThe leather is sourced from the finest suppliers and treated to be durable, stain-resistant, and easy to clean. Available in multiple colors to match your car's interior design.",
        isActive: true,
        isDeleted: false,
        createdAt: "2023-01-05",
    }

    return (
        <FeaturePage feature={feature} />
    )
}
