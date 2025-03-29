import type { Metadata } from "next"
import { BrandForm } from "@/components/brands/brands-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getBrandById } from "@/lib/actions/brands"
import ErrorPage from "@/app/[locale]/error"

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
        return <ErrorPage error={{
            message: res.message,
            status: res.status
        }} />
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">Edit Brand</CardTitle>
                <CardDescription className="text-muted-foreground">
                    Update brand information with AI-powered suggestions and multi-language support.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <BrandForm existingBrand={res.data} />
            </CardContent>
        </Card>
    )
}


