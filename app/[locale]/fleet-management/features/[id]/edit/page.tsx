import ErrorPage from "@/app/[locale]/error";
import { FeatureForm } from "@/components/feature/features-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getFeatureById } from "@/lib/actions/feature";

export default async function EditCarFeaturePage({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
    const { id } = await params
    const res = await getFeatureById(id)
    if (!res.success) {
        return <ErrorPage error={{
            message: res.message,
            status: res.status
        }} />
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">Edit Car Feature</CardTitle>
                <CardDescription className="text-muted-foreground">
                    Edit Existing Car Feature
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FeatureForm existingFeature={res.data} />
            </CardContent>
        </Card>
    )
}