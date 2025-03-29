"use client"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BrandSelect } from "@/components/brands/brand-select"
import type { UseFormReturn } from "react-hook-form"
import type { z } from "zod"
import { CarFeatureFormSchema } from "./schema"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Languages, Locale } from "@/types/language"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type FeatureFormValues = z.infer<typeof CarFeatureFormSchema>


const featureCategories = ["COMFORT", "SAFETY", "TECHNOLOGY", "PERFORMANCE", "EXTERIOR", "INTERIOR", "CONVENIENCE"]

export function BasicInfo({ form }: { form: UseFormReturn<FeatureFormValues> }) {
    return (
        <Card>
            <CardContent className="pt-6 space-y-6">
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Feature Category*</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {featureCategories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category.replace(/_/g, " ")}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>Select the category this feature belongs to</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isHighlighted"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Highlight Feature</FormLabel>
                                <FormDescription>Highlighted features will be prominently displayed in car listings</FormDescription>
                            </div>
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    )
}


export function Translations({ form }: { form: UseFormReturn<FeatureFormValues> }) {
    const [activeLocale, setActiveLocale] = useState<Locale>("en")
    const translations = form.watch("translations")

    const handleSyncTranslation = (targetLocale: Locale) => {
        const englishTranslation = translations.find((t) => t.locale === "en")
        if (!englishTranslation) return

        const updatedTranslations = translations.map((t) =>
            t.locale === targetLocale ? { ...englishTranslation, locale: targetLocale } : t,
        )

        form.setValue("translations", updatedTranslations as any)
        toast.success(`Copied from English to ${Languages.find((l) => l.code === targetLocale)?.name}`)
    }

    return (
        <Card>
            <CardContent className="pt-6 space-y-6">
                <Tabs value={activeLocale} onValueChange={(v) => setActiveLocale(v as Locale)}>
                    <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                        {Languages.map((lang) => (
                            <TabsTrigger key={lang.code} value={lang.code}>
                                {lang.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {Languages.map((lang, index) => (
                        <TabsContent key={lang.code} value={lang.code} className="space-y-6">
                            <div className="flex justify-end gap-3">
                                {lang.code !== "en" && (
                                    <Button type="button" variant="outline" size="sm" onClick={() => handleSyncTranslation(lang.code)}>
                                        Copy from English
                                    </Button>
                                )}
                            </div>

                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name={`translations.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name*</FormLabel>
                                            <FormControl>
                                                <Input placeholder={`Feature name in ${lang.name}`} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`translations.${index}.shortDescription`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Short Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder={`Short description in ${lang.name}`}
                                                    className="h-20 resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`translations.${index}.description`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder={`Full description in ${lang.name}`}
                                                    className="min-h-[150px] resize-y"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    )
}
export function Review({ form }: { form: UseFormReturn<FeatureFormValues> }) {
    const formValues = form.getValues()
    const mainTranslation = formValues.translations?.find((t) => t.locale === "en")

    return (
        <Card>
            <CardContent className="pt-6 space-y-6">
                <h3 className="text-lg font-medium">Review Your Feature</h3>
                <Accordion type="single" collapsible defaultValue="basic" className="space-y-4">
                    <AccordionItem value="basic">
                        <AccordionTrigger>Basic Information</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <Label className="font-medium text-sm">Name</Label>
                                    <p className="text-sm">{mainTranslation?.name || "Not provided"}</p>
                                </div>
                                <div>
                                    <Label className="font-medium text-sm">Category</Label>
                                    <p className="text-sm">{formValues.category || "Not provided"}</p>
                                </div>
                                <div>
                                    <Label className="font-medium text-sm">Highlighted</Label>
                                    <p className="text-sm">{formValues.isHighlighted ? "Yes" : "No"}</p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="translations">
                        <AccordionTrigger>Translations</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4">
                                {formValues.translations?.map((translation) => (
                                    <div key={translation.locale} className="border rounded-md p-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs uppercase">
                                                {translation.locale}
                                            </span>
                                            <span className="text-sm font-medium">
                                                {Languages.find((l) => l.code === translation.locale)?.name}
                                            </span>
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
    )
}
