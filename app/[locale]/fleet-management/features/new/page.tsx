import { FeatureForm } from "@/components/feature/features-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreateCarFeaturePage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">Create Car Feature</CardTitle>
                <CardDescription className="text-muted-foreground">
                    Create new Car Feature
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FeatureForm />
            </CardContent>
        </Card>
    )
}