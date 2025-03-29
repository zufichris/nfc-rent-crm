import { ModelForm } from "@/components/models/model-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreateModelPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">Create Model</CardTitle>
                <CardDescription className="text-muted-foreground">
                    Create new Car Model
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ModelForm />
            </CardContent>
        </Card>
    )
}