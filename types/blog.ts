import type { IBaseEntity, IBaseFilters, IResponsePaginated } from "./shared"
import type { Locale } from "./language"
import type { IMediaItem } from "./media"
import type { IUser } from "./user"

export enum BlogStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    ARCHIVED = "ARCHIVED",
}

export enum BlogCategory {
    NEWS = "NEWS",
    GUIDE = "GUIDE",
    REVIEW = "REVIEW",
    ANNOUNCEMENT = "ANNOUNCEMENT",
    FEATURE = "FEATURE",
}

export interface IBlogTranslation {
    locale: Locale
    title: string
    slug: string
    content: string
    excerpt?: string
    metaTitle?: string
    metaDescription?: string
}

export interface IBlog extends IBaseEntity {
    author: IUser
    featuredImage?: IMediaItem
    gallery?: IMediaItem[]
    status: BlogStatus
    category: BlogCategory
    tags: string[]
    translations: Record<Locale, IBlogTranslation>
    publishedAt?: Date
    viewCount: number
    commentCount: number
    likeCount: number
    isCommentEnabled: boolean
    isFeatured: boolean
}

export type CreateBlogDTO = {
    authorId: string
    featuredImageId?: string
    galleryIds?: string[]
    status: BlogStatus
    category: BlogCategory
    tags: string[]
    translations: IBlogTranslation[]
    isCommentEnabled: boolean
    isFeatured: boolean
}

export type UpdateBlogDTO = Partial<CreateBlogDTO>

export type GetBlogsFilter = Partial<
    {
        status: BlogStatus[]
        category: BlogCategory[]
        tags: string[]
        authorId: string
        locale: Locale
        isFeatured: boolean
        isCommentEnabled: boolean
        publishedFrom: Date
        publishedTo: Date
    } & IBaseFilters
>

export type GetBlogsResponse = IResponsePaginated<IBlog> & {
    draftCount?: number
    publishedCount?: number
    archivedCount?: number
}

