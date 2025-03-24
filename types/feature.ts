import { IBaseEntity, IBaseFilters, IResponsePaginated } from "./shared";

export interface IFeature extends IBaseEntity {
    code: string;
    slug: string;
    category: string
    isHighlighted: boolean
    name?: string;
    shortDescription?: string;
    description?: string;
}

export type GetFeaturesFilters = Partial<{
    isActive: boolean;
    isDeleted: boolean;
} & IBaseFilters>

export type GetFeaturesResponse = IResponsePaginated<IFeature> & {
    activeCount?: number,
    deletedCount?: number
}
