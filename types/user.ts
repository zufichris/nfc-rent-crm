import { IBooking } from "./bookings"
import { IBaseEntity, IBaseFilters, IResponsePaginated } from "./shared"

export enum DriverType {
    GCC = 'GCC',
    TOURIST = 'TOURIST',
    RESIDENT = 'RESIDENT'
}

export interface IUser extends IBaseEntity {
    fullName: string
    email: string
    phone?: string
    photo?: string
    googleId?: string
    password?: string
    emailVerified: boolean
    phoneVerified: boolean
    roles: string[];
}

export interface IDriver extends IBaseEntity {
    user: IUser;
    bookings: IBooking[];
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
    country: string;
    driverType: DriverType
    idNumber?: string;
    idIssueDate?: Date;
    idExpiryDate?: Date;
    idFrontImage?: string;
    idBackImage?: string;
    licenseNumber: string;
    licenseIssueDate?: Date;
    licenseExpiryDate?: Date;
    licenseFrontImage?: string;
    licenseBackImage?: string;
    passportNumber: string;
    passportIssueDate?: Date;
    passportExpiryDate?: Date;
    passportFrontImage?: string;
    passportBackImage?: string;
    visaNumber?: string;
    visaIssueDate?: Date;
    visaExpiryDate?: Date;
    visaImage?: string;
    isDefault: boolean;
    additionalDocuments?: Array<{
        url: string;
        type: string;
        documentNumber: string;
        expiryDate: Date;
    }>;
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