"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ChevronLeft, ChevronRight, Loader2, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { generateBrandSuggestions } from "@/lib/actions/ai"
import { TagInput } from "@/components/misc/tag"
import { toast } from "sonner"
import { Image, ImageUpload } from "@/components/misc/image"
import type { IBrand } from "@/types/brand"
import type { Locale } from "@/types/language"
import { createBrand } from "@/lib/actions/brands"
import { Languages } from "@/types/language"
import { Progress } from "@/components/ui/progress"
import { Label } from "../ui/label"
import { generateSlug } from "@/utils/functions"
import { cn } from "@/lib/utils"
import { getVariant } from "../theme/variants"

const brandFormSchema = z.object({
  name: z.string().min(2, {
    message: "Brand name must be at least 2 characters.",
  }),
  code: z.string().min(2, {
    message: "Brand code must be at least 2 characters.",
  }),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }),
  logo: z.string().optional(),
  coverImage: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  metadata: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
  }),
  models: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  translation: z
    .record(
      z.enum(["en", "fr", "zh", "ru", "it", "ar"]),
      z.object({
        name: z.string(),
        description: z.string(),
        shortDescription: z.string(),
      }),
    )
    .optional(),
})

type BrandFormValues = z.infer<typeof brandFormSchema>

interface BrandFormProps {
  brand?: IBrand
}

const steps = [
  { id: "basic-info", title: "Basic Information" },
  { id: "description", title: "Description" },
  { id: "media", title: "Media" },
  { id: "metadata", title: "Metadata & Models" },
  { id: "translations", title: "Translations" },
  { id: "review", title: "Review & Submit" },
]

export default function BrandForm({ brand }: BrandFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeLocale, setActiveLocale] = useState<Locale>("en")
  const [currentStep, setCurrentStep] = useState(0)

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      name: brand?.name || "",
      code: brand?.code || "",
      website: brand?.website || "",
      slug: brand?.slug || "",
      shortDescription: brand?.shortDescription || "",
      description: brand?.description || "",
      logo: brand?.logo || "",
      coverImage: brand?.coverImage || "",
      metadata: {
        title: brand?.metadata?.title || "",
        description: brand?.metadata?.description || "",
        tags: brand?.metadata?.tags || [],
      },
      models: brand?.models || [],
      isActive: brand?.isActive ?? true,
      translation: {
        en: {
          name: brand?.translation?.en?.name || "",
          description: brand?.translation?.en?.description || "",
          shortDescription: brand?.translation?.en?.shortDescription || "",
        },
        fr: {
          name: brand?.translation?.fr?.name || "",
          description: brand?.translation?.fr?.description || "",
          shortDescription: brand?.translation?.fr?.shortDescription || "",
        },
        zh: {
          name: brand?.translation?.zh?.name || "",
          description: brand?.translation?.zh?.description || "",
          shortDescription: brand?.translation?.zh?.shortDescription || "",
        },
        ru: {
          name: brand?.translation?.ru?.name || "",
          description: brand?.translation?.ru?.description || "",
          shortDescription: brand?.translation?.ru?.shortDescription || "",
        },
        it: {
          name: brand?.translation?.it?.name || "",
          description: brand?.translation?.it?.description || "",
          shortDescription: brand?.translation?.it?.shortDescription || "",
        },
        ar: {
          name: brand?.translation?.ar?.name || "",
          description: brand?.translation?.ar?.description || "",
          shortDescription: brand?.translation?.ar?.shortDescription || "",
        },
      },
    },
  })

  async function onSubmit(data: BrandFormValues) {
    setIsSubmitting(true)
    try {
      await createBrand(data as any)
      toast(brand ? "Brand updated" : "Brand created")
      router.push("/brands")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }



  function nextStep() {
    // Validate current step fields before proceeding
    if (currentStep === 0) {
      const { name, code, website, slug } = form.getValues()
      if (!name || !code || !slug) {
        form.trigger(["name", "code", "slug"])
        return
      }
    }

    if (currentStep === 1) {
      const { shortDescription, description } = form.getValues()
      if (!shortDescription) {
        form.trigger(["shortDescription"])
        return
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 className="text-xl font-semibold">{steps[currentStep].title}</h2>
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>

          <Progress value={progress} className="h-2" />

          <div className="flex overflow-x-auto py-2 gap-2 scrollbar-hide">
            {steps.map((step, index) => (
              <Button
                key={step.id}
                type="button"
                variant={currentStep === index ? "default" : "outline"}
                size="sm"
                className="rounded-full px-3 whitespace-nowrap text-xs sm:text-sm"
                onClick={() => setCurrentStep(index)}
                disabled={index > currentStep && !form.formState.isValid}
              >
                {step.title}
              </Button>
            ))}
          </div>
        </div>
        <Step0 form={form} show={currentStep === 0} />
        <Step1 form={form} show={currentStep === 1} />
        <Step2 form={form} show={currentStep === 2} />
        <Step3 form={form} show={currentStep === 3} />
        <Step4 form={form} show={currentStep === 4} />
        <Step5 form={form} show={currentStep === 5} />
        <div className="flex flex-col sm:flex-row justify-between gap-4">
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
                {isSubmitting ? "Submitting..." : brand ? "Update Brand" : "Create Brand"}
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  )
}

function Step0({ show, form }: { show: boolean, form: any }) {
  if (!show)
    return null
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
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
                        if (!form.getValues("slug")) {
                          const slug = generateSlug(e.target.value)
                          form.setValue("slug", slug)
                        }
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug*</FormLabel>
                  <FormControl>
                    <Input placeholder="brand-slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Active</FormLabel>
                  <FormDescription>Brand will be visible on the site</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}


function Step1({ show, form }: { show: boolean, form: any }) {
  if (!show)
    return null
  const [isGenerating, setIsGenerating] = useState(false)

  async function generateSuggestions() {
    const brandName = form.getValues("name")

    if (!brandName) {
      toast("Missing information")
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

      toast("AI Suggestions Generated")
    } catch (error) {
      console.error("Error generating suggestions:", error)
      toast("Failed to generate AI suggestions. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description*</FormLabel>
                <Button
                  type="button"
                  className={cn("w-full", getVariant("default", {
                    invert: true
                  }))}
                  onClick={generateSuggestions}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating suggestions...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate AI Suggestions
                    </>
                  )}
                </Button>
                <FormControl>
                  <Textarea
                    placeholder="Enter a brief description of the brand"
                    className="resize-none"
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter a detailed description of the brand"
                    className="min-h-[150px] resize-none"
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
        </div>
      </CardContent>
    </Card>
  )
}

function Step2({ show, form }: { show: boolean, form: any }) {
  if (!show)
    return null
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <ImageUpload value={field.value} onChange={field.onChange} placeholder="Upload brand logo" />
                </FormControl>
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
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Upload cover image"
                    aspectRatio="16:9"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function Step3({ show, form }: { show: boolean, form: any }) {
  if (!show)
    return null
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Metadata</h3>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="metadata.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input placeholder="SEO title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metadata.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="SEO description"
                      className="resize-none"
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
              name="metadata.tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagInput
                      placeholder="Add tag..."
                      tags={field.value || []}
                      setTags={(newTags) => field.onChange(newTags)}
                    />
                  </FormControl>
                  <FormDescription>Press enter to add a tag</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Models</h3>
          <FormField
            control={form.control}
            name="models"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TagInput
                    placeholder="Add model..."
                    tags={field.value || []}
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
function Step4({ show, form }: { show: boolean, form: any }) {
  if (!show)
    return null
  const [activeLocale, setActiveLocale] = useState<Locale>("en")
  const languagesArray = Object.entries(Languages).map(([code, language]) => ({
    code: code as Locale,
    name: language.name,
  }))
  function syncWithMainContent() {
    const mainName = form.getValues("name")
    const mainDescription = form.getValues("description") || ""
    const mainShortDescription = form.getValues("shortDescription") || ""

    const currentTranslations = form.getValues("translation") || {}
    form.setValue("translation", {
      ...currentTranslations,
      [activeLocale]: {
        name: mainName,
        description: mainDescription,
        shortDescription: mainShortDescription,
      },
    })
  }
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Translations</h3>
        <Tabs defaultValue="en" value={activeLocale} onValueChange={(value) => setActiveLocale(value as Locale)}>
          <TabsList className="mb-4 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
            {languagesArray.map(({ code, name }) => (
              <TabsTrigger key={code} value={code} className="flex-1">
                {name}
              </TabsTrigger>
            ))}
          </TabsList>

          {languagesArray.map(({ code, name }) => (
            <TabsContent key={code} value={code} className="space-y-6">
              <div className="flex justify-end">
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
                        className="resize-none"
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
                        className="min-h-[150px] resize-none"
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

function Step5({ show, form, brand }: { show: boolean, form: any, brand?: IBrand }) {
  if (!show)
    return null
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Review Your Brand</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div>
              <Label className="font-medium text-sm">Short Description</Label>
              <p className="text-sm">{form.getValues("shortDescription")}</p>
            </div>

            <div>
              <Label className="font-medium text-sm">Full Description</Label>
              <p className="text-sm">{form.getValues("description") || "Not provided"}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="font-medium text-sm">Logo</Label>
                {form.getValues("logo") ? (
                  <div className="w-20 h-20 mt-2 rounded-md overflow-hidden relative">
                    <Image
                      src={form.getValues("logo")}
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
                  <div className="w-40 h-20 mt-2 rounded-md overflow-hidden relative">
                    <Image
                      src={form.getValues("coverImage")}
                      alt="Cover image"
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <p className="text-sm">No cover image uploaded</p>
                )}
              </div>
            </div>

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
              <div className="flex flex-wrap gap-1 mt-1">
                {form.getValues("metadata.tags")?.length ? (
                  form.getValues("metadata.tags").map((tag: string, index: number) => (
                    <span
                      key={index}
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
              <div className="flex flex-wrap gap-1 mt-1">
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

            <div>
              <Label className="font-medium text-sm">Translations</Label>
              <div className="flex flex-wrap gap-1 mt-1">
                {Object.entries(form.getValues("translation") || {}).map(([locale, _]) => (
                  <span
                    key={locale}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs uppercase"
                  >
                    {locale}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {brand && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Information</h3>
            <div className="space-y-4">
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