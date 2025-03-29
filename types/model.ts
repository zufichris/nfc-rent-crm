import { IBrand } from "./brand";
import { IBaseEntity, IBaseFilters, IResponsePaginated } from "./shared";

export interface IModel extends IBaseEntity {
    code: string;
    slug: string
    brand?: IBrand;
    name?: string;
    shortDescription?: string;
    description?: string;
    metadata?: {
        title?: string;
        description?: string;
        tags?: string[];
    };
}

export type GetModelsFilters = Partial<{
    isActive: boolean;
    isDeleted: boolean;
} & IBaseFilters>

export type GetModelsResponse = IResponsePaginated<IModel> & {
    activeCount?: number,
    deletedCount?: number
}
