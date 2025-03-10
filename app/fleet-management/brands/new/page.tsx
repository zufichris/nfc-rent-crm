import type { Metadata } from "next"
import BrandForm from "@/components/brands/brand-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
    title: "Create Brand",
    description: "Create a new brand with AI-powered suggestions",
}

export default function CreateBrandPage() {
    return (
        <Card className="container py-10">
            <CardHeader className="mb-8">
                <CardTitle className="text-3xl font-bold tracking-tight">Create Brand</CardTitle>
                <CardDescription className="text-muted-foreground">
                    Create a new brand with AI-powered suggestions and multi-language support.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <BrandForm />
            </CardContent>
        </Card>
    )
}

