import { Languages } from "@/types/language";
import { IModel } from "@/types/model";
import { z } from "zod";


const CarModelTranslationsSchema = z.array(
    z.object({
        locale:z.string({
            message:"Locale Required"
        }),
        name: z.string({
            message: "Name is required"
        }),
        shortDescription: z.string().optional(),
        description: z.string().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        metaTags: z.array(z.string()).optional().default([])
    })
).nonempty()

const CarModelFormSchema = z.object({
    brandId: z.string({
        message: "Brand ID is required",
    }),
    translations: CarModelTranslationsSchema
})

function getModelFormDefaultValues(model?: IModel): z.infer<typeof CarModelFormSchema> {

    return ({
        brandId: model?.brand?.id ?? "",
        translations: Languages.map(l => ({
            locale:l.code,
            name: model?.name ?? "",
            description: model?.description ?? "",
            shortDescription: model?.shortDescription ?? "",
            metaDescription: model?.metadata?.description ?? "",
            metaTitle: model?.metadata?.title ?? "",
            metaTags: model?.metadata?.tags ?? []
        })) as z.infer<typeof CarModelTranslationsSchema>

    })

}

export { CarModelFormSchema, CarModelTranslationsSchema, getModelFormDefaultValues }