"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField
} from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

import { CarModelFormSchema, getModelFormDefaultValues } from "./schema"
import { BasicInfo, Review, Translations } from "./steps"
import type { IModel } from "@/types/model"
import type { z } from "zod"
import { createModel, updateModel } from "@/lib/actions/model"

type ModelFormValues = z.infer<typeof CarModelFormSchema>

const steps = [
    { id: "basic-info", title: "Basic Information" },
    { id: "translations", title: "Translations" },
    { id: "review", title: "Review & Submit" },
]

export function ModelForm({ existingModel }: { existingModel?: IModel }) {
    const form = useForm<ModelFormValues>({
        resolver: zodResolver(CarModelFormSchema),
        defaultValues: getModelFormDefaultValues(existingModel),
        mode: "onChange",
    })

    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [completedSteps, setCompletedSteps] = useState<number[]>([])

    async function onSubmit(data: ModelFormValues) {
        setIsSubmitting(true)
        try {
            if (existingModel) {
               const res= await updateModel(existingModel.id, data)
               if(!res.success){
                throw new Error(res.message)
               }
                toast.success("Model updated successfully")
                router.push(`/fleet-management/models/${existingModel.id}`)
            } else {
                const res = await createModel(data)
                if(!res.success){
                    throw new Error(res.message)
                }
                toast.success("Model created successfully")
                router.push(`/fleet-management/models/${res.data.id}`)
            }
        } catch (error:any) {
            toast.error(error?.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    const validateStep = async (step: number): Promise<boolean> => {
        let isValid = false

        switch (step) {
            case 0:
                isValid = await form.trigger(["brandId"])
                break
            case 1:
                isValid = await form.trigger(["translations"])
                break
            case 2:
                isValid = await form.trigger()
                break
            default:
                isValid = true
        }

        if (isValid && !completedSteps.includes(step)) {
            setCompletedSteps((prev) => [...prev, step])
        }

        return isValid
    }

    const nextStep = async () => {
        const isValid = await validateStep(currentStep)
        if (isValid) {
            setCurrentStep((prev) => prev + 1)
            window.scrollTo({ top: 0, behavior: "smooth" })
        } else {
            toast.error("Please complete the required fields before proceeding")
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    const progress = ((completedSteps.length + (currentStep === steps.length - 1 ? 1 : 0)) / steps.length) * 100

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="sticky top-0 z-10 bg-background pt-4 pb-2 border-b">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <div>
                            <h2 className="text-2xl font-semibold">{steps[currentStep].title}</h2>
                        </div>

                        <Badge variant="outline" className="ml-auto">
                            Step {currentStep + 1} of {steps.length}
                        </Badge>
                    </div>

                    <Progress value={progress} className="h-2 mb-4" aria-label={`Form completion: ${Math.round(progress)}%`} />

                    <div className="flex gap-2 overflow-x-auto py-1 scrollbar-hide">
                        {steps.map((step, index) => {
                            const isCurrent = currentStep === index
                            const isCompleted = completedSteps.includes(index)

                            return (
                                <Button
                                    key={step.id}
                                    type="button"
                                    variant={isCurrent ? "default" : isCompleted ? "secondary" : "outline"}
                                    size="sm"
                                    className="rounded-full px-3 whitespace-nowrap"
                                    onClick={() => index <= Math.max(...completedSteps, currentStep) && setCurrentStep(index)}
                                    disabled={index > Math.max(...completedSteps, currentStep)}
                                >
                                    {step.title}
                                </Button>
                            )
                        })}
                    </div>
                </div>

                <div className="min-h-[50vh]">
                    {currentStep === 0 && <BasicInfo form={form} />}
                    {currentStep === 1 && <Translations form={form} />}
                    {currentStep === 2 && <Review form={form} />}
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-6 sticky bottom-0 bg-background pt-4 pb-6 border-t">
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

                    <div className="flex gap-3">
                        {currentStep < steps.length - 1 ? (
                            <Button type="button" onClick={nextStep} className="w-full sm:w-auto">
                                Next
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {existingModel ? "Updating..." : "Creating..."}
                                    </>
                                ) : existingModel ? (
                                    "Update Model"
                                ) : (
                                    "Create Model"
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </Form>
    )
}
