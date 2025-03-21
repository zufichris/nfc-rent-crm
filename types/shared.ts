import { env } from "@/config/env";

export interface IBaseEntity {
    id: string;
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt?: string
    deletedAt?: string
}

export type NumberFilter = {
    min?: number
    max?: number
}

export type DateFilter = {
    start?: number | string | Date
    end?: number | string | Date
}

export type IBaseFilters = Partial<{
    sortBy: string,
    sortField: string,
    limit: number,
    page: number,
    search: string
    createdAt: string,
    updatedAt: string,
}>

type ResError = {
    status: number;
    message: string;
    success: false;
}

type ResSuccess<TData> = {
    success: true;
    message: string;
    data: TData;
}

type ResPaginated<Data = unknown> = {
    success: true;
    message: string;
    data: Data[];
    total: number;
    page: number;
    limit: number;
}

export type IResponse<Data = unknown> = ResSuccess<Data> | ResError

export type IResponsePaginated<TData = unknown> = ResPaginated<TData> | ResError


export class BaseService {
    methods = {
        POST: "POST",
        GET: "GET",
        PATCH: "PATCH",
        DELETE: "DELETE"
    }
    apiUrl = env.apiUrl
    handleError({
        message = "An Unexpected Error Occurred",
        status = 500,
    }: {
        message?: string;
        status?: number;
    }): ResError {
        return { status, message, success: false };
    }
}
