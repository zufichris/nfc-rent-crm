import ErrorPage from "@/app/[locale]/error";
import { ModelForm } from "@/components/models/model-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getModelById } from "@/lib/actions/model";

export default async function EditCarModelPage({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
    const { id } = await params
    const res = await getModelById(id)
    if (!res.success) {
        return <ErrorPage error={{
            message: res.message,
            status: res.status
        }} />
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">Edit Model</CardTitle>
                <CardDescription className="text-muted-foreground">
                    Edit Existing Car Model
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ModelForm existingModel={res.data} />
            </CardContent>
        </Card>
    )
}