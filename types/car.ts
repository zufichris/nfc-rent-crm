import { IBrand, ICarHistoryRecord, IModel, IOwnershipDetail } from "./brand";
import { IFeature } from "./features";
import { Locale } from "./language";
import { IMediaItem } from "./media";
import { RentalPricingDto } from "./pricing";
import { IBaseEntity, IBaseFilters, IResponsePaginated } from "./shared";


export enum CarCategory {
    LUXURY_SEDAN = 'LUXURY_SEDAN',
    SPORTS_CAR = 'SPORTS_CAR',
    SUV = 'SUV',
    CONVERTIBLE = 'CONVERTIBLE',
    EXOTIC = 'EXOTIC',
    ELECTRIC_LUXURY = 'ELECTRIC_LUXURY',
    VINTAGE = 'VINTAGE',
}

export enum FuelType {
    GASOLINE = 'GASOLINE',
    DIESEL = 'DIESEL',
    ELECTRIC = 'ELECTRIC',
    HYBRID = 'HYBRID',
    HYDROGEN = 'HYDROGEN',
    PLUG_IN_HYBRID = 'PLUG_IN_HYBRID',
}

export enum TransmissionType {
    AUTOMATIC = 'AUTOMATIC',
    MANUAL = 'MANUAL',
    SEMI_AUTOMATIC = 'SEMI_AUTOMATIC',
    DUAL_CLUTCH = 'DUAL_CLUTCH',
    CVT = 'CVT',
}


export enum CarStatus {
    AVAILABLE = 'AVAILABLE',
    RENTED = 'RENTED',
    RESERVED = 'RESERVED',
    IN_MAINTENANCE = 'IN_MAINTENANCE',
    IN_TRANSIT = 'IN_TRANSIT',
    SOLD = 'SOLD',
    NOT_AVAILABLE = 'NOT_AVAILABLE',
}

export enum CarListingType {
    FOR_RENT = 'FOR_RENT',
    FOR_SALE = 'FOR_SALE',
}

export enum CarCondition {
    EXCELLENT = 'EXCELLENT',
    VERY_GOOD = 'VERY_GOOD',
    GOOD = 'GOOD',
    FAIR = 'FAIR',
    NEEDS_MAINTENANCE = 'NEEDS_MAINTENANCE',
}

export enum CarInspectionStatus {
    PASSED = 'PASSED',
    PENDING = 'PENDING',
    FAILED = 'FAILED',
    EXEMPTED = 'EXEMPTED',
}
export enum CarDocumentType {
    REGISTRATION = 'REGISTRATION',
    INSURANCE = 'INSURANCE',
    MAINTENANCE = 'MAINTENANCE',
    OWNERSHIP = 'OWNERSHIP',
    INSPECTION = 'INSPECTION',
    ACCIDENT = 'ACCIDENT',
    OTHER = 'OTHER',
}

export enum CarHistoryRecordType {
    MAINTENANCE = 'MAINTENANCE',
    RENTAL = 'RENTAL',
    SALE = 'SALE',
    OWNERSHIP_CHANGE = 'OWNERSHIP_CHANGE',
    ACCIDENT = 'ACCIDENT',
    INSPECTION = 'INSPECTION',
    LOCATION_CHANGE = 'LOCATION_CHANGE',
    MODIFICATION = 'MODIFICATION',
    DETAILS_UPDATED = 'DETAILS_UPDATED',
}


export interface CarTranslation {
    name: string;
    shortDescription?: string;
    description?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaTags?: string;
    color?: { name: string; code?: string };
    interiorColor?: { name: string; code?: string };
}

export interface CarTranslationDTO extends CarTranslation {
    locale: Locale;
}


export interface EngineSpecs {
    type: string;
    horsepower: number;
    torque: number;
    displacement?: number;
    batteryCapacity?: number;
    range?: number;
    acceleration: number;
    topSpeed: number;
}

export interface Dimensions {
    length: number;
    width: number;
    height: number;
    weight: number;
    cargoCapacity: number;
}

export interface CarOwnership {
    ownerId: string;
    ownerType: 'User' | 'Company';
    percentage: number;
    nftId?: string;
    acquiredDate: DateInputType;
    transferDate?: DateInputType;
    status: 'Active' | 'Pending' | 'Transferred';
}

export interface ICarMedia extends IMediaItem {
    title?: string;
    description?: string;
    position?: number;
}
export interface CarDocumentDto extends IBaseEntity {
    type?: CarDocumentType;
    title?: string;
    fileUrl?: string;
    issueDate?: Date;
    expiryDate?: Date;
    isVerified?: boolean;
    verificationDate?: Date;
}

export type DateInputType = string | Date;
export type NonEmptyArray<T> = [T, ...T[]];

export interface ICar extends IBaseEntity {
    slug: string;
    vin: string;
    blockchainId?: string;
    year: number;

    category: CarCategory;

    fuelType: FuelType;

    transmission: TransmissionType;
    doors: number;
    seats: number;

    images: IMediaItem[];


    videos: ICarMedia[];


    virtualTourMedia: ICarMedia[];

    metaverseAssetId?: string;

    currentStatus: CarStatus;

    listingType: CarListingType[];
    acquisitionDate?: string | Date;
    mileage: number;

    condition: CarCondition;

    inspectionStatus: CarInspectionStatus;
    lastInspectionDate?: Date | string;
    nextInspectionDueDate?: string;


    brand?: IBrand;


    model?: IModel;


    features?: IFeature[];


    rentalPricings: RentalPricingDto[];


    documents: CarDocumentDto[];


    ownershipDetails: IOwnershipDetail[];
    history: ICarHistoryRecord[];


    engineSpecs: {
        type: string;
        horsepower: number;
        torque: number;
        displacement?: number;
        batteryCapacity?: number;
        range?: number;
        acceleration: number;
        topSpeed: number;
    };


    dimensions: {
        length: number;
        width: number;
        height: number;
        weight: number;
        cargoCapacity: number;
    };
    name: string;
    shortDescription?: string;
    description?: string;
    metadata?: {
        title?: string;
        description?: string;
        tags?: string[];
    };
    color?: { name: string; code?: string };
    interiorColor?: { name: string; code?: string };
}


export interface CreateCarDTO {
    vin: string;
    blockchainId?: string;
    year: number;
    category: string;
    fuelType: string;
    transmission: string;
    doors: number;
    seats: number;
    metaverseAssetId?: string;
    currentStatus: string;
    listingType: string[];
    acquisitionDate?: DateInputType;
    mileage: number;
    condition: string;
    inspectionStatus: string;
    lastInspectionDate?: DateInputType;
    nextInspectionDueDate?: DateInputType;
    engineSpecs: EngineSpecs;
    dimensions: Dimensions;
    media: ICarMedia[];
    model: string;
    features?: string[];
    rentalPricings?: RentalPricingDto[];
    documents?: CarDocumentDto[];
    owner?: CarOwnership;
    translations: NonEmptyArray<CarTranslationDTO>;
}

export interface UpdateCarDTO extends Partial<CreateCarDTO> { }

export type GetCarsFilter = Partial<{
    isActive: boolean;
    isDeleted: boolean;
} & IBaseFilters>

export type GetCarsResponse = IResponsePaginated<ICar> & {
    activeCount?: number,
    deletedCount?: number
}
