import { IBrand } from "@/types/brand";
import { Languages } from "@/types/language";
import { z } from "zod";

const BrandTranslationsSchema = z.array(z.object({
    name: z.string({
        required_error: "Brand name is required",
    }).min(1, "Enter Brand Name"),
    shortDescription: z.string().optional(),
    description: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaTags: z.array(z.string()).optional().default([]),
    locale: z.string({
        required_error: "Locale is required",
    })
})).nonempty()

const BrandFormSchema = z.object({
    logo: z.string().optional(),
    coverImage: z.string().optional(),
    translations: BrandTranslationsSchema
});

function getBrandFormDefaultValues(brand?: IBrand): z.infer<typeof BrandFormSchema> {
    return ({
        logo: brand?.logo ?? "",
        coverImage: brand?.coverImage ?? "",
        translations: Languages.map(l => ({
            locale: l.code,
            name: brand?.name ?? "",
            description: brand?.description,
            metaDescription: brand?.metadata?.description ?? "",
            metaTitle: brand?.metadata?.title ?? "",
            shortDescription: brand?.metadata?.title ?? "",
            metaTags: brand?.metadata?.tags ?? "",
        })) as z.infer<typeof BrandTranslationsSchema>
    })
}

export { BrandTranslationsSchema, BrandFormSchema, getBrandFormDefaultValues };