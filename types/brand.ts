import { Locale } from "./language";
import { IBaseEntity, IBaseFilters, IResponsePaginated } from "./shared";
export interface IBrandTranslation {
    parentId: number;
    name: string;
    shortDescription?: string;
    description?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaTags?: string;
}

export interface IBrand extends IBaseEntity {
    name: string;
    code: string;
    website?: string
    slug: string;
    logo?: string;
    coverImage?: string;
    shortDescription?: string;
    description?: string;
    metadata: {
        title: string;
        description: string;
        tags: string[];
    }
    models?: string[];
    translation?: Partial<Record<Locale, IBrandTranslation>> & { en: IBrandTranslation }
}


export type GetBrandsFilters = Partial<{
    isActive: boolean;
    isDeleted: boolean;
} & IBaseFilters>

export type GetBrandsResponse = IResponsePaginated<IBrand> & {
    activeCount?: number,
    deletedCount?: number
}
