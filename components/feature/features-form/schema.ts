import { IFeature } from "@/types/feature";
import { Languages } from "@/types/language";
import { z } from "zod";
const CarFeatureTranslationsSchema = z
    .array(
        z.object({
            name: z.string({
                message: "Name Required",
            }),
            shortDescription: z.string().optional(),
            description: z.string().optional(),
            locale: z.string(),
        })
    )
    .nonempty();

const CarFeatureFormSchema = z.object({
    category: z.string({
        message: "Feature category is required",
    }),
    isHighlighted: z.boolean().optional().default(false),
    translations: CarFeatureTranslationsSchema,
});

function getCarFeaturesFormDefaultValue(
    feature?: IFeature
): z.infer<typeof CarFeatureFormSchema> {
    return {
        category: feature?.category ?? "",
        isHighlighted: feature?.isHighlighted ?? false,
        translations: Languages.map((l) => ({
            name: feature?.name ?? "",
            description: feature?.description ?? "",
            shortDescription: feature?.shortDescription ?? "",
            locale: l.code,
        })) as z.infer<typeof CarFeatureTranslationsSchema>,
    };
}

export {
    CarFeatureFormSchema,
    CarFeatureTranslationsSchema,
    getCarFeaturesFormDefaultValue,
};
