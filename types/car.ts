import { Locale } from "./language";
import { MediaItem } from "./media";
import { RentalPricingDto } from "./pricing";
import { IBaseEntity } from "./shared";

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

export interface CarMedia extends MediaItem {
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
    media: CarMedia[];
    model: string;
    features?: string[];
    rentalPricings?: RentalPricingDto[];
    documents?: CarDocumentDto[];
    owner?: CarOwnership;
    translations: NonEmptyArray<CarTranslationDTO>;
}

export interface UpdateCarDTO extends Partial<CreateCarDTO> { }


