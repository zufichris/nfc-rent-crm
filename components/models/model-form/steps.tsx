"use client"

import { useState } from "react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { TagInput } from "@/components/misc/tag"
import { toast } from "sonner"
import { Languages, type Locale } from "@/types/language"
import type { UseFormReturn } from "react-hook-form"
import type { z } from "zod"
import type { CarModelFormSchema } from "./schema"
import { BrandSelect } from "@/components/brands/brand-select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"



type ModelFormValues = z.infer<typeof CarModelFormSchema>

export function BasicInfo({ form }: { form: UseFormReturn<ModelFormValues> }) {
    return (
        <Card>
            <CardContent className="pt-6 space-y-6">
                <FormField
                    control={form.control}
                    name="brandId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Brand*</FormLabel>
                            <FormControl>
                                <BrandSelect
                                    value={field.value}
                                    onChange={field.onChange}
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


export function Translations({ form }: { form: UseFormReturn<ModelFormValues> }) {
    const [activeLocale, setActiveLocale] = useState<Locale>("en")
    const translations = form.watch("translations")

    const handleSyncTranslation = (targetLocale: Locale) => {
        const englishTranslation = translations.find(t => t.locale === "en")
        if (!englishTranslation) return

        const updatedTranslations = translations.map(t =>
            t.locale === targetLocale ? ({ ...englishTranslation, locale: targetLocale }) : t
        )

        form.setValue("translations", updatedTranslations as any)
        toast.success(`Copied from English to ${Languages.find(l => l.code === targetLocale)?.name}`)
    }

    return (
        <Card>
            <CardContent className="pt-6 space-y-6">
                <Tabs value={activeLocale} onValueChange={v => setActiveLocale(v as Locale)}>
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
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleSyncTranslation(lang.code)}
                                    >
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
                                                <Input placeholder={`Model name in ${lang.name}`} {...field} />
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

                                <div className="space-y-4 border-t pt-4">
                                    <h4 className="font-medium">SEO Metadata</h4>

                                    <FormField
                                        control={form.control}
                                        name={`translations.${index}.metaTitle`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Meta Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={`Meta title in ${lang.name}`} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`translations.${index}.metaDescription`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Meta Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder={`Meta description in ${lang.name}`}
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
                                        name={`translations.${index}.metaTags`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Meta Tags</FormLabel>
                                                <FormControl>
                                                    <TagInput
                                                        placeholder="Add tags..."
                                                        tags={field.value}
                                                        setTags={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    )
}

export function Review({ form }: { form: UseFormReturn<ModelFormValues> }) {
    const translations = form.getValues("translations")
    const mainTranslation = translations?.find((t) => t.locale === "en")
    const brandId = form.getValues("brandId")
    return (
        <Card>
            <CardContent className="pt-6 space-y-6">
                <h3 className="text-lg font-medium">Review Your Model</h3>
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
                                    <Label className="font-medium text-sm">Brand ID</Label>
                                    <p className="text-sm">{brandId || "Not provided"}</p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="translations">
                        <AccordionTrigger>Translations</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4">
                                {translations?.map((translation) => (
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

                                            {(translation.metaTitle || translation.metaDescription || translation.metaTags?.length) && (
                                                <div className="pt-2 border-t mt-2">
                                                    <Label className="text-xs text-muted-foreground font-medium">SEO Metadata</Label>
                                                    {translation.metaTitle && (
                                                        <div className="mt-1">
                                                            <Label className="text-xs text-muted-foreground">Meta Title</Label>
                                                            <p className="text-sm">{translation.metaTitle}</p>
                                                        </div>
                                                    )}
                                                    {translation.metaDescription && (
                                                        <div className="mt-1">
                                                            <Label className="text-xs text-muted-foreground">Meta Description</Label>
                                                            <p className="text-sm line-clamp-2">{translation.metaDescription}</p>
                                                        </div>
                                                    )}
                                                    {translation.metaTags && translation.metaTags.length > 0 && (
                                                        <div className="mt-1">
                                                            <Label className="text-xs text-muted-foreground">Meta Tags</Label>
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                {translation.metaTags.map((tag, i) => (
                                                                    <Badge key={i} variant="outline" className="text-xs">
                                                                        {tag}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
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