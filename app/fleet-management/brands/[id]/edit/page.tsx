import type { Metadata } from "next"
import { notFound } from "next/navigation"
import BrandForm from "@/components/brands/brand-form"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getBrandById } from "@/lib/actions/brands"

interface EditBrandPageProps {
    params: Promise<{
        id: string
    }>
}

export const metadata: Metadata = {
    title: "Edit Brand",
    description: "Update an existing brand",
}

export default async function EditBrandPage({ params }: Readonly<EditBrandPageProps>) {
    const { id } = await params
    const res = await getBrandById(id)

    if (!res.success) {
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
            <BrandForm brand={res.data} />
        </Card>
    )
}


