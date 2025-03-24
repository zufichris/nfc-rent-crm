'use server'
import { GetFeaturesFilters, GetFeaturesResponse, IFeature } from "@/types/feature"
import { featuresService } from "../services/feature"


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

export async function updateFeature(feature: Partial<IFeature>) {
    const data = await featuresService.getFeatureById(feature.id!)
    return data
}

export async function createFeature(feature: Partial<IFeature>) {
    const data = await featuresService.getFeatureById(feature.id!)
    return data
}