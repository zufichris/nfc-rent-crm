import { CarDocumentType, CarHistoryRecordType } from "./car";
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

export interface IFeature extends IBaseEntity {
    code: string;
    slug: string;
    category: string
    isHighlighted: boolean
    name?: string;
    shortDescription?: string;
    description?: string;
}


export interface IOwnershipDetail extends IBaseEntity {
    car?: unknown;
    owner?: unknown;
    ownerType: 'User' | 'Company';
    percentage: number;
    nftId?: string;
    acquiredDate: Date;
    transferDate?: Date;
    status: 'Active' | 'Pending' | 'Transferred';
}

export interface ICarDocument extends IBaseEntity {
    type: CarDocumentType;
    title: string;
    fileUrl: string;
    issueDate: Date;
    expiryDate?: Date;
    isVerified: boolean;
    verificationDate?: Date;
}
export interface ICarHistoryRecord extends IBaseEntity {
    type: CarHistoryRecordType;
    date: Date;
    description: string;
    mileageAtTime?: number;
    cost?: {
        amount: number;
        currency: string;
    };
    performedBy?: string;
    documents?: ICarDocument[];
    nextScheduledDate?: Date;
}

export type GetBrandsFilters = Partial<{
    isActive: boolean;
    isDeleted: boolean;
} & IBaseFilters>

export type GetBrandsResponse = IResponsePaginated<IBrand> & {
    activeCount?: number,
    deletedCount?: number
}
