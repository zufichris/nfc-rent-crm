import type { Metadata } from "next"
import BrandForm from "@/components/brands/brand-form"

export const metadata: Metadata = {
    title: "Create Brand",
    description: "Create a new brand with AI-powered suggestions",
}

export default function CreateBrandPage() {
    return (
        <div className="container py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Create Brand</h1>
                <p className="text-muted-foreground">
                    Create a new brand with AI-powered suggestions and multi-language support.
                </p>
            </div>
            <BrandForm />
        </div>
    )
}

