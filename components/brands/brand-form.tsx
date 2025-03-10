"use client"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn, } from "react-hook-form"
import { z } from "zod"
import { ChevronLeft, ChevronRight, Loader2, Sparkles, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { generateBrandSuggestions } from "@/lib/actions/ai"
import { translateContent } from "@/lib/actions/translate"
import { TagInput } from "@/components/misc/tag"
import { toast } from "sonner"
import { Image, ImageUpload } from "@/components/misc/image"
import { Progress } from "@/components/ui/progress"
import { Label } from "../ui/label"
import { generateSlug } from "@/utils/functions"
import { cn } from "@/lib/utils"
import { getVariant } from "../theme/variants"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { createBrand } from "@/lib/actions/brands"
import { Languages, Locale } from "@/types/language"
import { IBrand } from "@/types/brand"

const brandFormSchema = z.object({
  name: z.string().min(2, { message: "Brand name must be at least 2 characters." }),
  code: z.string().min(2, { message: "Brand code must be at least 2 characters." }),
  website: z.string().url({ message: "Please enter a valid URL." }),
  slug: z.string().min(2, { message: "Slug must be at least 2 characters." }),
  logo: z.string().min(1, { message: "Brand logo is required" }),
  coverImage: z.string().optional(),
  shortDescription: z.string().min(10, { message: "Short description must be at least 10 characters." }),
  description: z.string(),
  metadata: z.object({
    title: z.string().min(5, { message: "Meta title must be at least 5 characters." }),
    description: z.string().min(10, { message: "Meta description must be at least 10 characters." }),
    tags: z.array(z.string()),
  }),
  models: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  translation: z.record(
    z.enum(["en", "fr", "zh", "ru", "it", "ar"]),
    z.object({
      name: z.string(),
      description: z.string(),
      shortDescription: z.string(),
    })
  ),
})

type BrandFormValues = z.infer<typeof brandFormSchema>
type FormType = UseFormReturn<BrandFormValues>;

const steps = [
  { id: "basic-info", title: "Basic Information" },
  { id: "description", title: "Description" },
  { id: "media", title: "Media" },
  { id: "metadata", title: "Metadata & Models" },
  { id: "translations", title: "Translations" },
  { id: "review", title: "Review & Submit" },
]



interface BrandFormProps {
  brand?: IBrand
}
export default function BrandForm({ brand }: Readonly<BrandFormProps>) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isTranslating, setIsTranslating] = useState(false)

  const form: FormType = useForm<BrandFormValues>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      name: brand?.name ?? "",
      code: brand?.code ?? "",
      website: brand?.website ?? "",
      slug: brand?.slug ?? "",
      shortDescription: brand?.shortDescription ?? "",
      description: brand?.description ?? "",
      logo: brand?.logo ?? "",
      coverImage: brand?.coverImage ?? "",
      metadata: {
        title: brand?.metadata?.title ?? "",
        description: brand?.metadata?.description ?? "",
        tags: brand?.metadata?.tags ?? [],
      },
      models: brand?.models ?? [],
      isActive: brand?.isActive ?? true,
      translation: {
        en: { name: brand?.translation?.en?.name ?? "", description: brand?.translation?.en?.description ?? "", shortDescription: brand?.translation?.en?.shortDescription ?? "" },
        fr: { name: brand?.translation?.fr?.name ?? "", description: brand?.translation?.fr?.description ?? "", shortDescription: brand?.translation?.fr?.shortDescription ?? "" },
        zh: { name: brand?.translation?.zh?.name ?? "", description: brand?.translation?.zh?.description ?? "", shortDescription: brand?.translation?.zh?.shortDescription ?? "" },
        ru: { name: brand?.translation?.ru?.name ?? "", description: brand?.translation?.ru?.description ?? "", shortDescription: brand?.translation?.ru?.shortDescription ?? "" },
        it: { name: brand?.translation?.it?.name ?? "", description: brand?.translation?.it?.description ?? "", shortDescription: brand?.translation?.it?.shortDescription ?? "" },
        ar: { name: brand?.translation?.ar?.name ?? "", description: brand?.translation?.ar?.description ?? "", shortDescription: brand?.translation?.ar?.shortDescription ?? "" },
      },
    },
  })


  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name" || name === "shortDescription" || name === "description") {
        form.setValue("translation.en", {
          name: form.getValues("name") || "",
          shortDescription: form.getValues("shortDescription") || "",
          description: form.getValues("description") || "",
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  async function onSubmit(data: BrandFormValues) {
    setIsSubmitting(true)
    try {
      const res = await createBrand(data as any)
      toast.success(brand ? "Brand updated successfully" : "Brand created successfully")
      router.push("/brands")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateStep = useCallback(async (step: number): Promise<boolean> => {
    switch (step) {
      case 0:
        return form.trigger(["name", "code", "website"]).then((isValid) =>
          isValid && !!form.getValues("name") && !!form.getValues("code") && !!form.getValues("website")
        )
      case 1:
        return form.trigger(["shortDescription"]).then((isValid) =>
          isValid && !!form.getValues("shortDescription")
        )
      case 2:
        return form.trigger(["logo"]).then((isValid) =>
          isValid && !!form.getValues("logo")
        )
      case 3:
        return form.trigger(["metadata.title", "metadata.description"]).then((isValid) => isValid)
      case 4:
        return !!form.getValues("translation.en")?.name
      default:
        return true
    }
  }, [form])

  const proceedToNextStep = () => {
    setCurrentStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const handleValidationError = () => {
    if (currentStep === 4) {
      toast.error("English translation name is required")
    } else {
      toast.error("Please complete the required fields before proceeding")
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
      window.scrollTo(0, 0)
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  function renderCurrentStep() {
    switch (currentStep) {
      case 0: return <BasicDetails form={form} key={currentStep} />
      case 1: return <Description form={form} key={currentStep} />
      case 2: return <Media form={form} key={currentStep} />
      case 3: return <Metadata form={form} key={currentStep} />
      case 4: return <Translation form={form} isTranslating={isTranslating} setIsTranslating={setIsTranslating} key={currentStep} />
      case 4: return <Review form={form} brand={brand} key={currentStep} />
      default:
        return null
    }
  }


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

          {renderCurrentStep()}

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
                  onClick={() => router.push("/brands")}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {brand ? "Updating..." : "Creating..."}
                    </>
                  ) : brand ? "Update Brand" : "Create Brand"}
                </Button>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}

function BasicDetails({ form }: Readonly<{ form: FormType }>) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Name*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter brand name"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      const slug = generateSlug(e.target.value)
                      form.setValue("slug", slug)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Code*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter brand code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug*</FormLabel>
                <FormControl>
                  <Input placeholder="brand-slug" {...field} />
                </FormControl>
                <FormDescription>Auto-generated from brand name. Used in URLs.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
              <div className="space-y-1">
                <FormLabel>Active</FormLabel>
                <FormDescription>Brand will be visible on the site</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}

function Description({ form }: Readonly<{ form: FormType }>) {
  const [isGenerating, setIsGenerating] = useState(false)

  async function generateSuggestions() {
    const brandName = form.getValues("name")
    if (!brandName) {
      toast.error("Please enter a brand name first")
      return
    }
    setIsGenerating(true)
    try {
      const suggestions = await generateBrandSuggestions(brandName)
      form.setValue("shortDescription", suggestions.shortDescription)
      form.setValue("description", suggestions.description)
      form.setValue("metadata.description", suggestions.metaDescription)
      form.setValue("metadata.tags", suggestions.tags)
      const currentTranslations = form.getValues("translation") || {}
      form.setValue("translation", {
        ...currentTranslations,
        en: {
          name: brandName,
          description: suggestions.description,
          shortDescription: suggestions.shortDescription,
        },
      })
      toast.success("AI Suggestions Generated")
    } catch (error) {
      console.error("Error generating suggestions:", error)
      toast.error("Failed to generate AI suggestions. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Short Description*</FormLabel>
                <Button
                  type="button"
                  className={cn(getVariant("default", { invert: true }))}
                  onClick={generateSuggestions}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate AI Suggestions
                    </>
                  )}
                </Button>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Enter a brief description of the brand"
                  className="resize-none h-32"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormDescription>A concise summary of the brand (50-150 characters recommended)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a detailed description of the brand"
                  className="min-h-[200px] resize-y"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}

function Media({ form }: Readonly<{ form: FormType }>) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <ImageUpload
                  id="logo-upload"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Upload Logo image"
                  className="w-full sm:w-1/2"
                  aspectRatio={1}
                />
              </FormControl>
              <FormDescription>Recommended size: 200x200px, square format</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <ImageUpload
                  id="cover-image-upload"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Upload cover image"
                  aspectRatio={2.5}
                />
              </FormControl>
              <FormDescription>Recommended size: 1200x480px, landscape format</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}

function Metadata({ form }: Readonly<{ form: FormType }>) {
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6 space-y-6">
          <h3 className="text-lg font-medium">Metadata</h3>
          <FormField
            control={form.control}
            name="metadata.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title*</FormLabel>
                <FormControl>
                  <Input placeholder="SEO title" {...field} />
                </FormControl>
                <FormDescription>Recommended length: 50-60 characters</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="metadata.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="SEO description"
                    className="resize-none h-32"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormDescription>Recommended length: 150-160 characters</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="metadata.tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagInput
                    placeholder="Add tag..."
                    tags={field.value ?? []}
                    setTags={(newTags) => field.onChange(newTags)}
                  />
                </FormControl>
                <FormDescription>Press enter to add a tag</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-6">Models</h3>
          <FormField
            control={form.control}
            name="models"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TagInput
                    placeholder="Add model..."
                    tags={field.value ?? []}
                    setTags={(newTags) => field.onChange(newTags)}
                  />
                </FormControl>
                <FormDescription>Press enter to add a model</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  )
}

function TranslationStatusIndicator({ form }: Readonly<{ form: FormType }>) {
  const translations = form.getValues("translation") ?? {}
  const totalLanguages = Languages.length - 1
  const completedLanguages = Object.entries(translations).filter(
    ([lang, content]: [string, any]) => lang !== "en" && content?.name && content?.shortDescription
  ).length
  const percentage = totalLanguages > 0 ? Math.round((completedLanguages / totalLanguages) * 100) : 100

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Translation Progress</span>
        <span className="text-sm">{completedLanguages} of {totalLanguages} languages</span>
      </div>
      <div className="relative">
        <Progress value={percentage} className="h-2" />
        <div className="absolute top-3 w-full flex justify-between text-xs text-muted-foreground">
          {Languages.filter((lang) => lang.code !== "en").map(({ code }, index) => {
            const position = (index / (totalLanguages - 1)) * 100
            const hasTranslation = translations[code]?.name && translations[code]?.shortDescription
            return (
              <div
                key={code}
                className="absolute flex flex-col items-center"
                style={{ left: `${position}%`, transform: "translateX(-50%)" }}
              >
                <div className={`w-2 h-2 rounded-full ${hasTranslation ? "bg-primary" : "bg-muted-foreground/30"}`} />
                <span className="mt-1 whitespace-nowrap">{code}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Translation({ form, isTranslating, setIsTranslating }: Readonly<{ form: FormType; isTranslating: boolean; setIsTranslating: (value: boolean) => void }>) {
  const [activeLocale, setActiveLocale] = useState<Locale>(Languages.find((lang) => lang.code !== "en")?.code ?? "fr")

  function syncWithMainContent() {
    const mainName = form.getValues("name")
    const mainDescription = form.getValues("description") ?? ""
    const mainShortDescription = form.getValues("shortDescription") ?? ""
    const currentTranslations = form.getValues("translation") ?? {}
    form.setValue("translation", {
      ...currentTranslations,
      [activeLocale]: { name: mainName, description: mainDescription, shortDescription: mainShortDescription },
    })
    toast.success(`Updated ${Languages.find((l) => l.code === activeLocale)?.name} translation`)
  }

  async function handleAutoTranslate() {
    if (activeLocale === "en") {
      toast.error("Cannot translate to the source language")
      return
    }
    const sourceContent = {
      name: form.getValues("name"),
      shortDescription: form.getValues("shortDescription"),
      description: form.getValues("description"),
    }
    if (!sourceContent.name || !sourceContent?.shortDescription) {
      toast.error("Missing source content. Please complete the English translation first.")
      return
    }
    setIsTranslating(true)
    try {
      toast.promise(
        translateContent(sourceContent, "en", activeLocale).then((translatedContent) => {
          const currentTranslations = form.getValues("translation") ?? {}
          form.setValue("translation", {
            ...currentTranslations,
            [activeLocale]: {
              name: translatedContent.name ?? "",
              description: translatedContent.description ?? "",
              shortDescription: translatedContent.shortDescription ?? "",
            },
          })
        }),
        {
          loading: `Translating to ${Languages.find((l) => l.code === activeLocale)?.name}...`,
          success: `Translated to ${Languages.find((l) => l.code === activeLocale)?.name}`,
          error: "Translation failed",
        }
      )
    } catch (error) {
      console.error("Translation error:", error)
    } finally {
      setIsTranslating(false)
    }
  }

  async function translateAllLanguages() {
    const sourceContent = {
      name: form.getValues("name"),
      shortDescription: form.getValues("shortDescription"),
      description: form.getValues("description"),
    }
    if (!sourceContent.name || !sourceContent.shortDescription) {
      toast.error("Missing source content. Please complete the English translation first.")
      return
    }
    setIsTranslating(true)
    try {
      const targetLanguages = Languages.filter((lang) => lang.code !== "en").map((lang) => lang.code)
      toast.promise(
        Promise.all(
          targetLanguages.map(async (locale) => {
            const translatedContent = await translateContent(sourceContent, "en", locale)
            return { locale, content: translatedContent }
          })
        ).then((results) => {
          const currentTranslations = form.getValues("translation") ?? {}
          const newTranslations = { ...currentTranslations }
          results.forEach(({ locale, content }) => {
            newTranslations[locale] = {
              name: content.name ?? "",
              description: content.description ?? "",
              shortDescription: content.shortDescription ?? "",
            }
          })
          form.setValue("translation", newTranslations)
        }),
        {
          loading: "Translating to all languages...",
          success: "All translations completed",
          error: "Some translations failed",
        }
      )
    } catch (error) {
      console.error("Translation error:", error)
    } finally {
      setIsTranslating(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        <TranslationStatusIndicator form={form} />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-medium">Translations</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={translateAllLanguages}
            disabled={isTranslating}
          >
            {isTranslating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Globe className="mr-2 h-4 w-4" />}
            Translate All Languages
          </Button>
        </div>

        <Tabs defaultValue="fr" value={activeLocale} onValueChange={(value) => setActiveLocale(value as Locale)}>
          <TabsList className="mb-6 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {Languages.filter((lang) => lang.code !== "en").map(({ code, name }) => (
              <TabsTrigger key={code} value={code} className="flex-1">
                {name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Languages.filter((lang) => lang.code !== "en").map(({ code, name }) => (
            <TabsContent key={code} value={code} className="space-y-6">
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAutoTranslate}
                  disabled={isTranslating}
                >
                  {isTranslating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Auto Translate
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={syncWithMainContent}>
                  Copy from main content
                </Button>
              </div>

              <FormField
                control={form.control}
                name={`translation.${code}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name ({name})</FormLabel>
                    <FormControl>
                      <Input placeholder={`Brand name in ${name}`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`translation.${code}.shortDescription`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description ({name})</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={`Short description in ${name}`}
                        className="resize-none h-32"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`translation.${code}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Description ({name})</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={`Full description in ${name}`}
                        className="min-h-[200px] resize-y"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

function Review({ form, brand }: Readonly<{ form: FormType; brand?: IBrand }>) {

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6 space-y-6">
          <h3 className="text-lg font-medium">Review Your Brand</h3>
          <Accordion type="single" collapsible defaultValue="basic" className="space-y-4">
            <AccordionItem value="basic">
              <AccordionTrigger>Basic Information</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="font-medium text-sm">Brand Name</Label>
                    <p className="text-sm">{form.getValues("name")}</p>
                  </div>
                  <div>
                    <Label className="font-medium text-sm">Brand Code</Label>
                    <p className="text-sm">{form.getValues("code")}</p>
                  </div>
                  <div>
                    <Label className="font-medium text-sm">Website</Label>
                    <p className="text-sm">{form.getValues("website") || "Not provided"}</p>
                  </div>
                  <div>
                    <Label className="font-medium text-sm">Slug</Label>
                    <p className="text-sm">{form.getValues("slug")}</p>
                  </div>
                  <div>
                    <Label className="font-medium text-sm">Status</Label>
                    <p className="text-sm">{form.getValues("isActive") ? "Active" : "Inactive"}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  <div>
                    <Label className="font-medium text-sm">Short Description</Label>
                    <p className="text-sm">{form.getValues("shortDescription")}</p>
                  </div>
                  <div>
                    <Label className="font-medium text-sm">Full Description</Label>
                    <p className="text-sm whitespace-pre-wrap">{form.getValues("description") || "Not provided"}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="media">
              <AccordionTrigger>Media</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="font-medium text-sm">Logo</Label>
                    {form.getValues("logo") ? (
                      <div className="w-24 h-24 mt-2 rounded-md overflow-hidden relative">
                        <Image
                          src={form.getValues("logo") || "/placeholder.svg"}
                          alt="Brand logo"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <p className="text-sm">No logo uploaded</p>
                    )}
                  </div>
                  <div>
                    <Label className="font-medium text-sm">Cover Image</Label>
                    {form.getValues("coverImage") ? (
                      <div className="w-48 h-24 mt-2 rounded-md overflow-hidden relative">
                        <Image
                          src={form.getValues("coverImage") || "/placeholder.svg"}
                          alt="Cover image"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <p className="text-sm">No cover image uploaded</p>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="metadata">
              <AccordionTrigger>Metadata & Models</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  <div>
                    <Label className="font-medium text-sm">Meta Title</Label>
                    <p className="text-sm">{form.getValues("metadata.title") || "Not provided"}</p>
                  </div>
                  <div>
                    <Label className="font-medium text-sm">Meta Description</Label>
                    <p className="text-sm">{form.getValues("metadata.description") || "Not provided"}</p>
                  </div>
                  <div>
                    <Label className="font-medium text-sm">Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {form.getValues("metadata.tags")?.length ? (
                        form.getValues("metadata.tags").map((tag: string, index: number) => (
                          <span
                            key={tag + index}
                            className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm">No tags added</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="font-medium text-sm">Models</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {form.getValues("models")?.length ? (
                        (form.getValues("models") ?? []).map((model: string, index: number) => (
                          <span
                            key={index}
                            className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                          >
                            {model}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm">No models added</p>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="translations">
              <AccordionTrigger>Translations</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {Object.entries(form.getValues("translation") || {}).map(([locale, translation]: [string, any]) => (
                    <div key={locale} className="border rounded-md p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs uppercase">
                          {locale}
                        </span>
                        <span className="text-sm font-medium">{Languages.find((l) => l.code === locale)?.name}</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs text-muted-foreground">Name</Label>
                          <p className="text-sm">{translation.name || "Not provided"}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Short Description</Label>
                          <p className="text-sm">{translation.shortDescription || "Not provided"}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Description</Label>
                          <p className="text-sm line-clamp-2">{translation.description || "Not provided"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {brand && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-lg font-medium">Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Created</span>
                <span className="text-sm">{new Date(brand.createdAt).toLocaleDateString()}</span>
              </div>
              {brand.updatedAt && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last updated</span>
                  <span className="text-sm">{new Date(brand.updatedAt).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">ID</span>
                <span className="text-sm font-mono">{brand.id}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}