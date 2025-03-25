import { CarListingType, ICar } from '@/types/car';
import { z } from 'zod';

const CarCategorySchema = z.enum([
    'LUXURY_SEDAN', 'SPORTS_CAR', 'SUV', 'CONVERTIBLE',
    'EXOTIC', 'ELECTRIC_LUXURY', 'VINTAGE'
], {
    required_error: "Car category is required",
    invalid_type_error: "Invalid car category"
});

const FuelTypeSchema = z.enum([
    'GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID',
    'HYDROGEN', 'PLUG_IN_HYBRID'
], {
    required_error: "Fuel type is required",
    invalid_type_error: "Invalid fuel type"
});

const TransmissionTypeSchema = z.enum([
    'AUTOMATIC', 'MANUAL', 'SEMI_AUTOMATIC',
    'DUAL_CLUTCH', 'CVT'
], {
    required_error: "Transmission type is required",
    invalid_type_error: "Invalid transmission type"
});

const CarStatusSchema = z.enum([
    'AVAILABLE', 'RENTED', 'RESERVED', 'IN_MAINTENANCE',
    'IN_TRANSIT', 'SOLD', 'NOT_AVAILABLE'
], {
    required_error: "Car status is required",
    invalid_type_error: "Invalid car status"
});

const CarConditionSchema = z.enum([
    'EXCELLENT', 'VERY_GOOD', 'GOOD',
    'FAIR', 'NEEDS_MAINTENANCE'
], {
    required_error: "Car condition is required",
    invalid_type_error: "Invalid car condition"
});

const CarInspectionStatusSchema = z.enum([
    'PASSED', 'PENDING', 'FAILED', 'EXEMPTED'
], {
    required_error: "Inspection status is required",
    invalid_type_error: "Invalid inspection status"
});

const CarListingTypeSchema = z.enum(["FOR_RENT", "FOR_SALE"], {
    required_error: "Listing type is required",
    invalid_type_error: "Listing Type must be either 'FOR_RENT' or 'FOR_SALE'"
});


const CarMediaSchema = z.object({
    id: z.string({
        invalid_type_error: "Media ID must be a string",
        required_error: "Media ID is optional but must be a string if provided"
    }).optional(),
    url: z.string({
        required_error: "Media URL is required",
        invalid_type_error: "Media URL must be a valid string"
    }).url("Must be a valid URL"),
    type: z.string({
        invalid_type_error: "Media type must be a string"
    }).optional(),
    title: z.string({
        invalid_type_error: "Media title must be a string"
    }).optional(),
    description: z.string({
        invalid_type_error: "Media description must be a string"
    }).optional(),
    position: z.number({
        invalid_type_error: "Media position must be a number"
    }).int("Position must be an integer").optional()
});

const CarFormSchema = z.object({
    vin: z.string({
        required_error: "VIN (Vehicle Identification Number) is required",
        invalid_type_error: "VIN must be a string"
    }).min(17, "VIN must be at least 17 characters long")
        .max(17, "VIN cannot be longer than 17 characters"),

    blockchainId: z.string({
        invalid_type_error: "Blockchain ID must be a string"
    }).optional(),

    year: z.number({
        required_error: "Manufacturing year is required",
        invalid_type_error: "Year must be a number"
    }).min(1900, "Year cannot be before 1900")
        .max(new Date().getFullYear() + 1, "Year cannot be in the future"),

    category: CarCategorySchema,
    fuelType: FuelTypeSchema,
    transmission: TransmissionTypeSchema,

    doors: z.number({
        required_error: "Number of doors is required",
        invalid_type_error: "Doors must be a number"
    }).min(2, "Minimum number of doors is 2")
        .max(5, "Maximum number of doors is 5"),

    seats: z.number({
        required_error: "Number of seats is required",
        invalid_type_error: "Seats must be a number"
    }).min(1, "Minimum number of seats is 1")
        .max(10, "Maximum number of seats is 10"),

    metaverseAssetId: z.string({
        invalid_type_error: "Metaverse Asset ID must be a string"
    }).optional(),

    currentStatus: CarStatusSchema,

    listingType: CarListingTypeSchema,

    acquisitionDate: z.coerce.date({
        invalid_type_error: "Acquisition date must be a valid date"
    }).optional(),

    mileage: z.number({
        required_error: "Mileage is required",
        invalid_type_error: "Mileage must be a number"
    }).nonnegative("Mileage cannot be negative"),

    condition: CarConditionSchema,
    inspectionStatus: CarInspectionStatusSchema,

    lastInspectionDate: z.coerce.date({
        invalid_type_error: "Last inspection date must be a valid date"
    }).optional(),

    nextInspectionDueDate: z.coerce.date({
        invalid_type_error: "Next inspection due date must be a valid date"
    }).optional(),

    engineSpecs: z.object({
        type: z.string({
            required_error: "Engine type is required",
            invalid_type_error: "Engine type must be a string"
        }),
        horsepower: z.number({
            required_error: "Horsepower is required",
            invalid_type_error: "Horsepower must be a number"
        }).positive("Horsepower must be a positive number"),
        torque: z.number({
            required_error: "Torque is required",
            invalid_type_error: "Torque must be a number"
        }).positive("Torque must be a positive number"),
        displacement: z.number({
            invalid_type_error: "Engine displacement must be a number"
        }).positive("Displacement must be a positive number").optional(),
        batteryCapacity: z.number({
            invalid_type_error: "Battery capacity must be a number"
        }).positive("Battery capacity must be a positive number").optional(),
        range: z.number({
            invalid_type_error: "Range must be a number"
        }).positive("Range must be a positive number").optional(),
        acceleration: z.number({
            required_error: "Acceleration is required",
            invalid_type_error: "Acceleration must be a number"
        }).positive("Acceleration must be a positive number"),
        topSpeed: z.number({
            required_error: "Top speed is required",
            invalid_type_error: "Top speed must be a number"
        }).positive("Top speed must be a positive number")
    }),

    dimensions: z.object({
        length: z.number({
            required_error: "Vehicle length is required",
            invalid_type_error: "Length must be a number"
        }).positive("Length must be a positive number"),
        width: z.number({
            required_error: "Vehicle width is required",
            invalid_type_error: "Width must be a number"
        }).positive("Width must be a positive number"),
        height: z.number({
            required_error: "Vehicle height is required",
            invalid_type_error: "Height must be a number"
        }).positive("Height must be a positive number"),
        weight: z.number({
            required_error: "Vehicle weight is required",
            invalid_type_error: "Weight must be a number"
        }).positive("Weight must be a positive number"),
        cargoCapacity: z.number({
            required_error: "Cargo capacity is required",
            invalid_type_error: "Cargo capacity must be a number"
        }).positive("Cargo capacity must be a positive number")
    }),

    media: z.array(CarMediaSchema).min(1, "At least one media item is required"),

    model: z.string({
        required_error: "Car model is required",
        invalid_type_error: "Model must be a string"
    }),

    features: z.array(z.string({
        invalid_type_error: "Features must be strings"
    })).optional(),

    rentalPricings: z.array(z.object({
        currency: z.string({
            required_error: "Currency is required",
            invalid_type_error: "Currency must be a string"
        }),
        amount: z.number({
            required_error: "Pricing amount is required",
            invalid_type_error: "Pricing amount must be a number"
        }).positive("Pricing amount must be a positive number"),
        duration: z.number().min(1, {
            message: "Duration must be ! or more"
        }).optional().default(1)
    })).optional(),

    documents: z.array(z.object({
        type: z.string({
            required_error: "Document type is required",
            invalid_type_error: "Document type must be a string"
        }),
        title: z.string({
            required_error: "Document title is required",
            invalid_type_error: "Document title must be a string"
        }),
        fileUrl: z.string({
            required_error: "File URL is required",
            invalid_type_error: "File URL must be a string"
        }).url("Must be a valid URL"),
        issueDate: z.coerce.date({
            required_error: "Issue date is required",
            invalid_type_error: "Issue date must be a valid date"
        }),
        expiryDate: z.coerce.date({
            invalid_type_error: "Expiry date must be a valid date"
        }).optional(),
        isVerified: z.boolean({
            required_error: "Verification status is required",
            invalid_type_error: "Verification status must be a boolean"
        }),
        verificationDate: z.coerce.date({
            invalid_type_error: "Verification date must be a valid date"
        }).optional()
    })).optional(),

    owner: z.object({
        ownerId: z.string({
            required_error: "Owner ID is required",
            invalid_type_error: "Owner ID must be a string"
        }),
        ownerType: z.enum(['User', 'Company'], {
            required_error: "Owner type is required",
            invalid_type_error: "Owner type must be either 'User' or 'Company'"
        }),
        percentage: z.number({
            required_error: "Ownership percentage is required",
            invalid_type_error: "Ownership percentage must be a number"
        }).min(0, "Percentage cannot be negative").max(100, "Percentage cannot exceed 100"),
        nftId: z.string({
            invalid_type_error: "NFT ID must be a string"
        }).optional(),
        acquiredDate: z.coerce.date({
            required_error: "Acquired date is required",
            invalid_type_error: "Acquired date must be a valid date"
        }),
        transferDate: z.coerce.date({
            invalid_type_error: "Transfer date must be a valid date"
        }).optional(),
        status: z.enum(['Active', 'Pending', 'Transferred'], {
            required_error: "Ownership status is required",
            invalid_type_error: "Invalid ownership status"
        })
    }).optional(),

    translations: z.array(z.object({
        locale: z.string({
            required_error: "Locale is required",
            invalid_type_error: "Locale must be a string"
        }),
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string"
        }),
        shortDescription: z.string({
            invalid_type_error: "Short description must be a string"
        }).optional(),
        description: z.string({
            invalid_type_error: "Description must be a string"
        }).optional(),
        metaTitle: z.string({
            invalid_type_error: "Meta title must be a string"
        }).optional(),
        metaDescription: z.string({
            invalid_type_error: "Meta description must be a string"
        }).optional(),
        metaTags: z.string({
            invalid_type_error: "Meta tags must be a string"
        }).optional(),
        color: z.object({
            name: z.string({
                required_error: "Color name is required",
                invalid_type_error: "Color name must be a string"
            }),
            code: z.string({
                invalid_type_error: "Color code must be a string"
            }).optional()
        }).optional(),
        interiorColor: z.object({
            name: z.string({
                required_error: "Interior color name is required",
                invalid_type_error: "Interior color name must be a string"
            }),
            code: z.string({
                invalid_type_error: "Interior color code must be a string"
            }).optional()
        }).optional()
    })).nonempty("At least one translation is required"),

    securityDeposit: z.object({
        currency: z.string({
            required_error: "Security deposit currency is required",
            invalid_type_error: "Currency must be a string"
        }),
        amount: z.number({
            required_error: "Security deposit amount is required",
            invalid_type_error: "Security deposit amount must be a number"
        }).positive("Security deposit amount must be a positive number")
    })
});

export function getCarFormFromExistingCar(car?: ICar): z.infer<typeof CarFormSchema> {

    return ({
        vin: car?.vin ?? "",
        blockchainId: car?.blockchainId ?? "",
        year: car?.year ?? 0,
        category: car?.category ?? "",
        fuelType: car?.fuelType ?? "",
        transmission: car?.transmission ?? "",
        doors: car?.doors ?? 0,
        seats: car?.seats ?? 0,
        metaverseAssetId: car?.metaverseAssetId ?? "",
        currentStatus: car?.currentStatus ?? "",
        listingType: car?.listingType[0] ?? "",
        mileage: car?.mileage ?? 0,
        condition: car?.condition ?? "",
        inspectionStatus: car?.inspectionStatus ?? "",
        lastInspectionDate: new Date(car?.lastInspectionDate ?? 0),
        nextInspectionDueDate: new Date(car?.nextInspectionDueDate ?? 0),
        acquisitionDate: new Date(car?.acquisitionDate ?? 0),
        engineSpecs: car?.engineSpecs,
        dimensions: car?.dimensions,
        media: car?.images.map((img, i) => ({
            url: img.url ?? "",
            type: img.type ?? "",
            title: img.title ?? "",
            description: img.description ?? "",
            position: img.position ?? i
        })),
        model: car?.model?.id ?? "",
        features: car?.features?.map(f => f.id).filter(Boolean) ?? [],
        rentalPricings: car?.rentalPricings.map(r => ({
            amount: r.price ?? 0,
            currency: r.currency ?? "",
            duration: (r.duration ?? 0),
        })),
        documents: car?.documents.map(d => ({
            fileUrl: d.fileUrl ?? "",
            issueDate: new Date(d.issueDate ?? 0),
            expiryDate: new Date(d.expiryDate ?? 0),
            isVerified: d.isVerified ?? false,
            title: d.title ?? "",
            type: d.type ?? "",
            verificationDate: new Date(d.verificationDate ?? 0)
        })),
        owner: (car?.ownershipDetails?.length ?? 0) > 0 ? {
            ownerId: car?.ownershipDetails[0].ownerId ?? "",
            ownerType: car?.ownershipDetails[0].ownerType ?? "",
            percentage: car?.ownershipDetails[0].percentage ?? 0,
            nftId: car?.ownershipDetails[0].nftId ?? "",
            acquiredDate: new Date(car?.ownershipDetails[0].acquiredDate ?? 0),
            transferDate: new Date(car?.ownershipDetails[0].transferDate ?? 0),
            status: car?.ownershipDetails[0].status ?? ""
        } : undefined,
        securityDeposit: {
            amount: 0,
            currency: ""
        },
        translations: [{
            locale: "en",
            name: car?.name ?? "",
            shortDescription: car?.shortDescription ?? "",
            description: car?.description ?? "",
            metaTitle: car?.metadata?.title ?? "",
            metaDescription: car?.metadata?.description ?? "",
            metaTags: car?.metadata?.tags?.join(",") ?? "",
            color: {
                name: car?.color?.name ?? "",
                code: car?.color?.code ?? ""
            },
            interiorColor: car?.interiorColor
        }]
    }) as unknown as z.infer<typeof CarFormSchema>;
}

export { CarFormSchema, CarCategorySchema, FuelTypeSchema, TransmissionTypeSchema, CarStatusSchema, CarConditionSchema, CarInspectionStatusSchema, CarMediaSchema };