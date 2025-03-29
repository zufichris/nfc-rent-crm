import type { Metadata } from "next"
import { BrandForm } from "@/components/brands/brands-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
    title: "Create Brand",
    description: "Create a new brand with AI-powered suggestions",
}

export default function CreateBrandPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">Create Brand</CardTitle>
                <CardDescription className="text-muted-foreground">
                    Create new Brand with AI-powered suggestions and multi-language support.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <BrandForm />
            </CardContent>
        </Card>
    )
}

