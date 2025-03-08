import type { Metadata } from "next"
import { notFound } from "next/navigation"
import BrandForm from "@/components/brands/brand-form"
import { IBrand } from "@/types/brand"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface EditBrandPageProps {
    params: {
        id: string
    }
}

export const metadata: Metadata = {
    title: "Edit Brand",
    description: "Update an existing brand",
}

export default async function EditBrandPage({ params }: EditBrandPageProps) {
    const brand = await getBrand(params.id)

    if (!brand) {
        notFound()
    }

    return (
        <Card className="container py-10">
            <CardHeader className="mb-8">
                <CardTitle className="text-3xl font-bold tracking-tight">Edit Brand</CardTitle>
                <CardDescription className="text-muted-foreground">
                    Update brand information with AI-powered suggestions and multi-language support.
                </CardDescription>
            </CardHeader>
            <BrandForm brand={brand} />
        </Card>
    )
}

async function getBrand(id: string) {
    return {
        id,
        name: "Sample Brand",
        code: "SAMPLE",
        slug: "sample-brand",
        website: "https://example.com",
        shortDescription: "A sample brand for demonstration",
        description: "This is a detailed description of the sample brand.",
        metadata: {
            title: "Sample Brand",
            description: "Sample brand for demonstration purposes",
            tags: ["sample", "demo", "brand"],
        },
        models: ["Model A", "Model B"],
        isActive: true,
        isDeleted: false,
        createdAt: new Date().toISOString(),
        translation: {
            en: {
                name: "Sample Brand",
                description: "This is a detailed description of the sample brand.",
                shortDescription: "A sample brand for demonstration",
            },
            fr: {
                name: "Marque Exemple",
                description: "Ceci est une description détaillée de la marque exemple.",
                shortDescription: "Une marque exemple pour démonstration",
            },
        },
    } as IBrand
}

