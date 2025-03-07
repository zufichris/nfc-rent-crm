import { IBaseFilters, IResponsePaginated } from "./shared"

export interface IUser {
    fullName: string
    email: string
    phone?: string
    photo?: string
    googleId?: string
    password?: string
    emailVerified: boolean
    phoneVerified: boolean
    roles: string[];
    id: string;
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt?: string
    deletedAt?: string
}
export type GetUsersResponse = IResponsePaginated<IUser> & {
    activeCount?: number,
    verifiedCount?: number,
    deletedCount?: number
}

export type GetUsersFilters = Partial<{
    isActive: boolean,
    roles: string[],
    isDeleted: boolean,
} & IBaseFilters>