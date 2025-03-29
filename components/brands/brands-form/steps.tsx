"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Image } from "@/components/misc/image"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { TagInput } from "@/components/misc/tag"
import { toast } from "sonner"
import { Languages, type Locale } from "@/types/language"
import { Card, CardContent } from "@/components/ui/card"
import { ImageUpload } from "@/components/misc/image"
import type { UseFormReturn } from "react-hook-form"
import type { z } from "zod"
import type { BrandFormSchema } from "./schema"

type BrandFormValues = z.infer<typeof BrandFormSchema>

export function BasicInfo({ form }: { form: UseFormReturn<BrandFormValues> }) {
    return (
        <Card>
            <CardContent className="pt-6 space-y-6">
                <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Brand Logo</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    id="logo-upload"
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                    placeholder="Upload logo"
                                    aspectRatio={1}
                                />
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
                                    id="cover-upload"
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                    placeholder="Upload cover image"
                                    aspectRatio={16 / 9}
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

export function Translations({ form }: { form: UseFormReturn<BrandFormValues> }) {
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
                                                <Input placeholder={`Brand name in ${lang.name}`} {...field} />
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
                                                    <TagInput placeholder="Add tags..." tags={field.value} setTags={field.onChange} />
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

export function Review({ form }: { form: UseFormReturn<BrandFormValues> }) {
    const formValues = form.getValues()
    const mainTranslation = formValues.translations?.find((t) => t.locale === "en")

    return (
        <Card>
            <CardContent className="pt-6 space-y-6">
                <h3 className="text-lg font-medium">Review Your Brand</h3>
                <Accordion type="single" collapsible defaultValue="basic" className="space-y-4">
                    <AccordionItem value="basic">
                        <AccordionTrigger>Basic Information</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <Label className="font-medium text-sm">Name</Label>
                                    <p className="text-sm">{mainTranslation?.name || "Not provided"}</p>
                                </div>

                                <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {formValues.logo && (
                                        <div>
                                            <Label className="font-medium text-sm">Logo</Label>
                                            <div className="mt-2 w-24 h-24 rounded-md overflow-hidden">
                                                <Image
                                                    src={formValues.logo || "/placeholder.svg"}
                                                    alt="Brand logo"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {formValues.coverImage && (
                                        <div>
                                            <Label className="font-medium text-sm">Cover Image</Label>
                                            <div className="mt-2 w-full h-32 rounded-md overflow-hidden">
                                                <Image
                                                    src={formValues.coverImage || "/placeholder.svg"}
                                                    alt="Brand cover"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        </div>
                                    )}
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

