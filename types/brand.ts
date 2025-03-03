export interface IBrandTranslation {
    parentId: number;
    name: string;
    shortDescription?: string;
    description?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaTags?: string;
}

export interface IBrand {
    id: number;
    code: string;
    slug: string;
    logo?: string;
    coverImage?: string;
    translations: IBrandTranslation[];
    models: any[];
}