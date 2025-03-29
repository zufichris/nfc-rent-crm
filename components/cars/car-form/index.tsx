"use client"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Progress } from "@/components/ui/progress"
import type { ICar } from "@/types/car"
import { useForm, type UseFormReturn } from "react-hook-form"
import { CarFormSchema, getCarFormFromExistingCar } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { CarFormSteps } from "./steps"
import { toast } from "sonner"
import { createCar, updateCar } from "@/lib/actions/cars"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"

type CarFormValues = z.infer<typeof CarFormSchema>
export type CarFormReturnType = UseFormReturn<CarFormValues>

// Update the steps array to include the Documents and Owner steps that were missing
const steps = [
  { id: "basic-info", title: "Basic Information" },
  { id: "specs", title: "Specifications" },
  { id: "media", title: "Media" },
  { id: "documents", title: "Documents" },
  { id: "owner", title: "Owner" },
  { id: "features", title: "Features & Pricing" },
  { id: "translations", title: "Translations" },
  { id: "review", title: "Review & Submit" },
]

export function CarForm({ existingCar }: { existingCar?: Readonly<ICar> }) {
  const form: CarFormReturnType = useForm<CarFormValues>({
    resolver: zodResolver(CarFormSchema),
    defaultValues: getCarFormFromExistingCar(existingCar),
    mode: "onChange",
  })

  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const isDirty = form.formState.isDirty

  async function onSubmit() {
    setIsSubmitting(true)
    const data: CarFormValues = form.getValues()
    try {
      if (existingCar) {
        console.log("Updating existing car")
        await updateCar(existingCar.id, data)
        toast.success("Car updated successfully")
        router.push(`/fleet-management/vehicles/${existingCar.id}`)
      } else {
        const res = await createCar(data)
        if (res.success) {
          toast.success("Car created successfully")
          router.push(`/fleet-management/vehicles/${res.data.id}`)
        } else {
          toast.error(res.message)
        }
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
      let isValid = false

      switch (step) {
        case 0:
          isValid = await form.trigger(["vin", "year", "model", "category", "currentStatus"])
          isValid = isValid && !!form.getValues("vin") && !!form.getValues("model")
          break
        case 1:
          isValid = await form.trigger(["engineSpecs", "dimensions"])
          break
        case 2:
          isValid = await form.trigger(["media"])
          break
        case 3:
          isValid = await form.trigger(["documents"])
          break
        case 4:
          isValid = await form.trigger(["owner"])
          break
        case 5:
          isValid = await form.trigger(["features", "rentalPricings", "securityDeposit"])
          break
        case 6:
          isValid = await form.trigger(["translations"])
          isValid = isValid && !!form.getValues("translations")[0]?.name
          break
        case 7:
          isValid = await form.trigger()
          break
        default:
          isValid = true
      }

      if (isValid && !completedSteps.includes(step)) {
        setCompletedSteps((prev) => [...prev, step])
      }

      return isValid
    },
    [form, completedSteps],
  )

  const proceedToNextStep = () => {
    setCurrentStep((prev) => prev + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleValidationError = () => {
    toast.error("Please complete the required fields before proceeding", {
      description: "Fields with errors are highlighted in red",
    })

    const firstError = Object.keys(form.formState.errors)[0]
    if (firstError) {
      const element = document.getElementsByName(firstError)[0]
      if (element) {
        element.focus()
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }

  const nextStep = useCallback(() => {
    validateStep(currentStep).then((valid) => {
      valid ? proceedToNextStep() : handleValidationError()
    })
  }, [currentStep, validateStep])

  function prevStep() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const goToStep = (index: number) => {
    if (index <= currentStep + 1 || completedSteps.includes(index - 1)) {
      setCurrentStep(index)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      toast.info("Please complete the current step first")
    }
  }

  const handleCancel = async () => {
    if (isDirty) {
      setShowCancelDialog(true)
    } else {
      router.push("/fleet-management/vehicles")
    }
  }

  const confirmCancel = () => {
    router.push("/fleet-management/vehicles")
  }

  const progress = ((completedSteps.length + (currentStep === steps.length - 1 ? 1 : 0)) / steps.length) * 100

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement
      const isInputActive =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement instanceof HTMLSelectElement

      if (!isInputActive) {
        if (e.key === "ArrowRight" && currentStep < steps.length - 1) {
          e.preventDefault()
          nextStep()
        } else if (e.key === "ArrowLeft" && currentStep > 0) {
          e.preventDefault()
          prevStep()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentStep, nextStep])

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit(onSubmit)(e)
          }}
          className="space-y-8"
        >
          <div className="sticky top-0 z-10 bg-background pt-4 pb-2 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold">{steps[currentStep].title}</h2>
                {completedSteps.includes(currentStep) && <CheckCircle2 className="h-5 w-5 text-success" />}
              </div>

              <div className="flex items-center gap-4">
                <Badge variant="outline" className="ml-auto">
                  Step {currentStep + 1} of {steps.length}
                </Badge>
              </div>
            </div>

            <Progress value={progress} className="h-2 mb-4" aria-label={`Form completion: ${Math.round(progress)}%`} />

            <div className="flex gap-2 overflow-x-auto py-1 scrollbar-hide">
              {steps.map((step, index) => {
                const isCompleted = completedSteps.includes(index)
                const isCurrent = currentStep === index
                const isClickable = index <= currentStep + 1 || isCompleted

                return (
                  <Button
                    key={step.id}
                    type="button"
                    variant={isCurrent ? "default" : isCompleted ? "secondary" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-full px-3 whitespace-nowrap transition-all",
                      isClickable ? "opacity-100" : "opacity-50 cursor-not-allowed",
                    )}
                    onClick={() => isClickable && goToStep(index)}
                    aria-current={isCurrent ? "step" : undefined}
                    aria-label={`Go to ${step.title} step${!isClickable ? " (complete current step first)" : ""}`}
                  >
                    <span className="flex items-center gap-1.5">
                      {isCompleted && <CheckCircle2 className="h-3.5 w-3.5" />}
                      {step.title}
                    </span>
                  </Button>
                )
              })}
            </div>
          </div>

          <div className="min-h-[50vh]">
            <CarFormSteps currentStep={currentStep} form={form} />
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-6 sticky bottom-0 bg-background pt-4 pb-6 border-t">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="w-full sm:w-auto"
                aria-label="Go to previous step"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="w-full sm:w-auto sm:hidden"
                aria-label="Cancel and return to vehicles list"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>

            <div className="flex gap-3 mt-3 sm:mt-0">
              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={nextStep} className="w-full sm:w-auto" aria-label="Go to next step">
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                  aria-label={existingCar ? "Update car details" : "Create new car"}
                  onClick={onSubmit}
                >
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
              )}
            </div>
          </div>
        </form>
      </Form>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave? Your changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Editing</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel}>Discard Changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

