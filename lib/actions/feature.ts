'use server'
import { GetFeaturesFilters, GetFeaturesResponse, IFeature } from "@/types/feature"
import { featuresService } from "../services/feature"
import { z } from "zod"
import { CarFeatureFormSchema } from "@/components/feature/features-form/schema"


export async function getFeatureById(id: string) {
    const res = await featuresService.getFeatureById(id)
    return res
}

export async function getFeatures(filters?: GetFeaturesFilters): Promise<GetFeaturesResponse> {
    const res = await featuresService.getFeatures(filters)
    return res
}

export async function deleteFeature(id: string) {
    const data = await featuresService.getFeatureById(id)
    return data
}

export async function createFeature(data: z.infer<typeof CarFeatureFormSchema>) {
    const res = await featuresService.create(data)
    return res
}

export async function updateFeature(id:string,feature: z.infer<typeof CarFeatureFormSchema>) {
    const res = await featuresService.update(id,feature)
    return res
}