import { IBaseEntity } from "./shared";

export interface IFeature extends IBaseEntity {
    code: string;
    slug: string;
    category: string
    isHighlighted: boolean
    name?: string;
    shortDescription?: string;
    description?: string;
}