"use client"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Progress } from "@/components/ui/progress"
import { ICar } from "@/types/car";
import { useForm, UseFormReturn } from "react-hook-form";
import { CarFormSchema, getCarFormFromExistingCar } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CarFormSteps } from "./steps"
import { toast } from "sonner"
import { createCar, updateCar } from "@/lib/actions/cars"

type CarFormValues = z.infer<typeof CarFormSchema>
export type CarFormReturnType = UseFormReturn<CarFormValues>
const steps = [
    { id: "basic-info", title: "Basic Information" },
    { id: "specs", title: "Specifications" },
    { id: "media", title: "Media" },
    { id: "features", title: "Features & Pricing" },
    { id: "translations", title: "Translations" },
    { id: "review", title: "Review & Submit" },
]


export function CarForm({ existingCar }: { existingCar?: ICar }) {

    const form: CarFormReturnType = useForm<CarFormValues>({
        resolver: zodResolver(CarFormSchema),
        defaultValues: {
            ...getCarFormFromExistingCar(existingCar)
        },
    })

    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)

    async function onSubmit(data: CarFormValues) {
        setIsSubmitting(true)
        try {
            if (existingCar) {
                const res = await updateCar(existingCar.id, data as any)
                toast.success("Car updated successfully")
                router.push(`/fleet-management/vehicles/${existingCar.id}`)
            } else {
                const res = await createCar(data as any)
                toast.success("Car created successfully")
                router.push("`/fleet-management/vehicles")
            }
        } catch (error) {
            console.error("Error submitting form:", error)
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }
    const validateStep = useCallback(
        async (step: number): Promise<boolean> => {
            switch (step) {
                case 0:
                    return form
                        .trigger(["vin", "year", "model", "category", "currentStatus"])
                        .then((isValid) => isValid && !!form.getValues("vin") && !!form.getValues("model"))
                case 1:
                    return form.trigger(["engineSpecs", "dimensions"]).then((isValid) => isValid)
                case 2:
                    return form.trigger(["media"]).then((isValid) => isValid)
                case 3:
                    return form.trigger(["features", "rentalPricings"]).then((isValid) => isValid)
                case 4:
                    return form.trigger(["translations"]).then((isValid) => isValid && !!form.getValues("translations")[0]?.name)
                default:
                    return true
            }
        },
        [form],
    )

    const proceedToNextStep = () => {
        setCurrentStep((prev) => prev + 1)
        window.scrollTo(0, 0)
    }

    const handleValidationError = () => {
        toast.error("Please complete the required fields before proceeding")
    }

    const nextStep = useCallback(() => {
        validateStep(currentStep).then((valid) => {
            valid ? proceedToNextStep() : handleValidationError()
        })
    }, [currentStep, validateStep])

    function prevStep() {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
            window.scrollTo(0, 0)
        }
    }

    const progress = ((currentStep + 1) / steps.length) * 100





    return (
        <div className="max-w-4xl mx-auto py-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h2 className="text-2xl font-semibold">{steps[currentStep].title}</h2>
                            <div className="text-sm text-muted-foreground">
                                Step {currentStep + 1} of {steps.length}
                            </div>
                        </div>

                        <Progress value={progress} className="h-2" />

                        <div className="flex gap-3 overflow-x-auto py-2 scrollbar-hide">
                            {steps.map((step, index) => (
                                <Button
                                    key={step.id}
                                    type="button"
                                    variant={currentStep === index ? "default" : "outline"}
                                    size="sm"
                                    className="rounded-full px-4 whitespace-nowrap"
                                    onClick={() => setCurrentStep(index)}
                                    disabled={index > currentStep && !form.formState.isValid}
                                >
                                    {step.title}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <CarFormSteps currentStep={currentStep} form={form} />

                    <div className="flex flex-col sm:flex-row justify-between gap-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className="w-full sm:w-auto"
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Previous
                        </Button>

                        {currentStep < steps.length - 1 ? (
                            <Button type="button" onClick={nextStep} className="w-full sm:w-auto">
                                Next
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push("/cars")}
                                    className="w-full sm:w-auto"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {existingCar ? "Updating..." : "Creating..."}
                                        </>
                                    ) : existingCar ? (
                                        "Update Car"
                                    ) : (
                                        "Create Car"
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    )
}