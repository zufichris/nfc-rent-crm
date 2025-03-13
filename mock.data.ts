import { faker } from '@faker-js/faker';
import { DriverType, IDriver, IUser } from './types/user';
import { IBrand } from './types/brand';
import { ICar } from './types/car';
import { MediaType } from './types/media';
import { CarPricingUnit, Currencies } from './types/pricing';
import { BookingStatus, IAddon, IBooking } from './types/bookings';
import { IPayment, PaymentStatus } from './types/payment';


export function generateFakeUser(): IUser {
    const isDeleted = faker.datatype.boolean();
    return {
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        photo: faker.image.avatar(),
        googleId: faker.database.mongodbObjectId(),
        password: faker.internet.password(),
        emailVerified: faker.datatype.boolean(),
        phoneVerified: faker.datatype.boolean(),
        roles: [faker.helpers.arrayElement(['user', 'admin', 'manager'])],
        id: faker.string.uuid(),
        isActive: faker.datatype.boolean(),
        isDeleted: isDeleted,
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        deletedAt: isDeleted ? faker.date.recent().toISOString() : undefined,
    };
}


export function generateFakeBrand(): IBrand {
    return {
        id: faker.string.uuid(),
        isActive: faker.datatype.boolean(),
        isDeleted: faker.datatype.boolean(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        code: faker.string.alphanumeric(6),
        name: faker.company.name(),
        slug: faker.lorem.slug(),
        logo: faker.helpers.maybe(() => faker.image.url({ width: 100, height: 100 }), { probability: 0.5 }),
        coverImage: faker.helpers.maybe(() => faker.image.url({ width: 800, height: 600 }), { probability: 0.5 }),
        shortDescription: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.7 }),
        description: faker.lorem.paragraph(),
        models: [],
        website: faker.internet.url(),
        metadata: {
            title: faker.lorem.words(3),
            description: faker.lorem.sentence(),
            tags: faker.helpers.multiple(() => faker.lorem.words(4)),
        }
    };
}

export function generateFakeCar(): ICar {
    const isDeleted = faker.datatype.boolean();
    return ({
        id: faker.string.uuid(),
        name: faker.vehicle.vehicle(),
        description: faker.lorem.paragraph(),
        shortDescription: faker.lorem.sentence(),
        vin: faker.vehicle.vin(),
        year: faker.number.int({ min: 2000, max: 2024 }),
        category: faker.helpers.arrayElement(['LUXURY_SEDAN', 'SUV', 'SPORTS_CAR']),
        fuelType: faker.helpers.arrayElement(['GASOLINE', 'DIESEL', 'ELECTRIC']),
        transmission: faker.helpers.arrayElement(['AUTOMATIC', 'MANUAL']),
        doors: faker.number.int({ min: 2, max: 5 }),
        seats: faker.number.int({ min: 2, max: 8 }),
        currentStatus: faker.helpers.arrayElement(['AVAILABLE', 'RENTED', 'MAINTENANCE']),
        listingType: faker.helpers.arrayElements(['FOR_RENT', 'FOR_SALE']),
        mileage: faker.number.int({ min: 0, max: 100000 }),
        condition: faker.helpers.arrayElement(['EXCELLENT', 'GOOD', 'FAIR']),
        inspectionStatus: faker.helpers.arrayElement(['PASSED', 'PENDING', 'FAILED']),
        engineSpecs: {
            type: faker.vehicle.vrm(),
            horsepower: faker.number.int({ min: 100, max: 800 }),
            torque: faker.number.int({ min: 200, max: 1000 }),
            displacement: faker.number.int({ min: 1000, max: 6000 }),
            acceleration: faker.number.float({ min: 2, max: 10, fractionDigits: 1 }),
            topSpeed: faker.number.int({ min: 160, max: 350 }),
        },
        dimensions: {
            length: faker.number.int({ min: 3500, max: 6000 }),
            width: faker.number.int({ min: 1500, max: 2200 }),
            height: faker.number.int({ min: 1200, max: 2000 }),
            weight: faker.number.int({ min: 1000, max: 3000 }),
            cargoCapacity: faker.number.int({ min: 200, max: 1000 }),
        },
        media: Array.from({ length: Math.floor(Math.random() * 10) }).fill(0).map(x => ({
            url: faker.image.url(),
            type: faker.helpers.arrayElement(Object.values(MediaType)),
            isThumbnail: true,
            title: faker.helpers.arrayElement(['Fron View', 'Side View', 'Front view']),
        })),
        model: faker.vehicle.model(),
        features: faker.helpers.multiple(() => faker.lorem.word(), { count: 4 }),
        rentalPricings: Array.from({ length: Math.floor(Math.random() * 10) }).fill(0).map(x => ({
            duration: 1,
            unit: faker.helpers.arrayElement(Object.values(CarPricingUnit)),
            price: faker.number.int({ min: 50, max: 1000 }),
            currency: faker.helpers.arrayElement(Object.values(Currencies)),
        })),
        isActive: faker.datatype.boolean(),
        isDeleted: isDeleted,
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        deletedAt: isDeleted ? faker.date.recent().toISOString() : undefined,
    })
}


export function generateFakeAddon(): IAddon {
    return {
        id: faker.string.uuid(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        priceOptions: [{
            type: faker.helpers.arrayElement(['per_rental', 'per_day']),
            amount: faker.number.int({ min: 10, max: 100 }),
            currency: faker.finance.currencyCode(),
        }],
        isRequired: faker.datatype.boolean(),
        availableForCars: [],
        bookings: [],
        isActive: faker.datatype.boolean(),
        isDeleted: faker.datatype.boolean(),
    };
}

export function generateFakeDriver(): IDriver {
    const isDeleted = faker.datatype.boolean();
    const driverType = faker.helpers.arrayElement(Object.values(DriverType));
    return {
        id: faker.string.uuid(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        user: generateFakeUser(),
        bookings: [],
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        dateOfBirth: faker.date.birthdate(),
        country: faker.location.country(),
        driverType: driverType,
        idNumber: driverType !== DriverType.TOURIST ? faker.string.numeric(10) : undefined,
        idIssueDate: driverType !== DriverType.TOURIST ? faker.date.past() : undefined,
        idExpiryDate: driverType !== DriverType.TOURIST ? faker.date.future() : undefined,
        idFrontImage: driverType !== DriverType.TOURIST ? faker.image.url() : undefined,
        idBackImage: driverType !== DriverType.TOURIST ? faker.image.url() : undefined,
        licenseNumber: faker.string.alphanumeric(8),
        licenseIssueDate: faker.date.past(),
        licenseExpiryDate: faker.date.future(),
        licenseFrontImage: faker.image.url(),
        licenseBackImage: faker.image.url(),
        passportNumber: faker.string.alphanumeric(9),
        passportIssueDate: faker.date.past(),
        passportExpiryDate: faker.date.future(),
        passportFrontImage: faker.image.url(),
        passportBackImage: faker.image.url(),
        visaNumber: driverType === DriverType.TOURIST ? faker.string.alphanumeric(10) : undefined,
        visaIssueDate: driverType === DriverType.TOURIST ? faker.date.past() : undefined,
        visaExpiryDate: driverType === DriverType.TOURIST ? faker.date.future() : undefined,
        visaImage: driverType === DriverType.TOURIST ? faker.image.url() : undefined,
        isDefault: faker.datatype.boolean(),
        additionalDocuments: faker.helpers.maybe(() => Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
            url: faker.image.url(),
            type: faker.system.fileType(),
            documentNumber: faker.string.alphanumeric(10),
            expiryDate: faker.date.future(),
        })), { probability: 0.5 }),
        isActive: faker.datatype.boolean(),
        isDeleted: isDeleted,
        deletedAt: isDeleted ? faker.date.recent().toISOString() : undefined,
    };
}

export function generateFakeBooking(): IBooking {
    const pickupDate = faker.date.future();
    const returnDate = faker.date.future({ refDate: pickupDate });
    const isDeleted = faker.datatype.boolean();
    const user = generateFakeUser()
    const driver = generateFakeDriver()
    const car = generateFakeCar()
    return {
        id: faker.string.uuid(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        user, driver, car,
        payment:{
            id: "p1",
            amount: 5000,
            currency: "USD",
            status: "PAID",
            paidAt: new Date("2023-11-28"),
            paymentMethod: "CREDIT_CARD",
            transactionId: "txn_1234567890",
            paymentMetadata: {
                cardLast4: "4242",
                cardBrand: "Visa",
                cardExpMonth: 12,
                cardExpYear: 2025,
            },
            booking: null,
            addressMap: null,
        } as any,
        pickupDate: pickupDate,
        returnDate: returnDate,
        totalAmount: faker.number.int({ min: 100, max: 5000 }),
        status: faker.helpers.arrayElement(Object.values(BookingStatus)),
        selectedAddons: faker.helpers.maybe(() => Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => generateFakeAddon()), { probability: 0.5 }),
        cancellationReason: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.3 }),
        priceBreakdown: faker.helpers.maybe(() => ({
            basePrice: faker.number.int({ min: 50, max: 1000 }),
            tax: faker.number.int({ min: 10, max: 100 }),
            discount: faker.number.int({ min: 0, max: 50 }),
            addons: faker.number.int({ min: 0, max: 200 }),
        }), { probability: 0.7 }),
        isActive: faker.datatype.boolean(),
        isDeleted: isDeleted,
        deletedAt: isDeleted ? faker.date.recent().toISOString() : undefined,
    };
}

// export function generateFakePayment(): IPayment {
//     const isDeleted = faker.datatype.boolean();

//     const mockBooking = {
//         id: "1",
//         user: {
//             id: "u1",
//             fullName: "John Doe",
//             email: "john@example.com",
//             photo: "/placeholder.svg?height=40&width=40",
//             emailVerified: true,
//             phoneVerified: true,
//             roles: ["USER"],
//         },
//         driver: {
//             id: "d1",
//             firstName: "John",
//             lastName: "Doe",
//             email: "john@example.com",
//             phoneNumber: "+971501234567",
//             dateOfBirth: new Date("1990-01-01"),
//             country: "UAE",
//             driverType: "RESIDENT",
//             idNumber: "784-1990-1234567-1",
//             idIssueDate: new Date("2020-01-01"),
//             idExpiryDate: new Date("2030-01-01"),
//             idFrontImage: "/placeholder.svg?height=200&width=320",
//             idBackImage: "/placeholder.svg?height=200&width=320",
//             licenseNumber: "UAE12345",
//             licenseIssueDate: new Date("2018-05-10"),
//             licenseExpiryDate: new Date("2028-05-10"),
//             licenseFrontImage: "/placeholder.svg?height=200&width=320",
//             licenseBackImage: "/placeholder.svg?height=200&width=320",
//             passportNumber: "P12345678",
//             passportIssueDate: new Date("2019-03-15"),
//             passportExpiryDate: new Date("2029-03-15"),
//             passportFrontImage: "/placeholder.svg?height=200&width=320",
//             isDefault: true,
//             user: {
//                 id: "u1",
//                 fullName: "John Doe",
//                 email: "john@example.com",
//                 emailVerified: true,
//                 phoneVerified: true,
//                 roles: ["USER"],
//             },
//             bookings: [],
//         },
//         car: {
//             id: "c1",
//             name: "Ferrari 488",
//             vin: "1HGCM82633A123456",
//             year: 2022,
//             category: "SPORTS_CAR",
//             fuelType: "GASOLINE",
//             transmission: "AUTOMATIC",
//             doors: 2,
//             seats: 2,
//             currentStatus: "RENTED",
//             listingType: ["FOR_RENT"],
//             mileage: 5000,
//             condition: "EXCELLENT",
//             inspectionStatus: "PASSED",
//             engineSpecs: {
//                 type: "V8",
//                 horsepower: 670,
//                 torque: 760,
//                 acceleration: 3.0,
//                 topSpeed: 330,
//             },
//             dimensions: {
//                 length: 4.6,
//                 width: 1.9,
//                 height: 1.2,
//                 weight: 1500,
//                 cargoCapacity: 200,
//             },
//             media: [
//                 {
//                     id: "m1",
//                     url: "/placeholder.svg?height=300&width=500",
//                     type: "image",
//                     position: 1,
//                 },
//                 {
//                     id: "m2",
//                     url: "/placeholder.svg?height=300&width=500",
//                     type: "image",
//                     position: 2,
//                 },
//                 {
//                     id: "m3",
//                     url: "/placeholder.svg?height=300&width=500",
//                     type: "image",
//                     position: 3,
//                 },
//             ],
//             model: "488 GTB",
//             features: [
//                 "Carbon Ceramic Brakes",
//                 "Sport Exhaust System",
//                 "Carbon Fiber Interior Package",
//                 "Apple CarPlay",
//                 "360° Camera System",
//                 "Front & Rear Parking Sensors",
//             ],
//         },
//         pickupDate: new Date("2023-12-01"),
//         returnDate: new Date("2023-12-05"),
//         totalAmount: 5000,
//         status: BookingStatus.ACTIVE,
//         isActive: true,
//         isDeleted: false,
//         createdAt: new Date(),
//         payment: {
//             id: "p1",
//             amount: 5000,
//             currency: "USD",
//             status: "PAID",
//             paidAt: new Date("2023-11-28"),
//             paymentMethod: "CREDIT_CARD",
//             transactionId: "txn_1234567890",
//             paymentMetadata: {
//                 cardLast4: "4242",
//                 cardBrand: "Visa",
//                 cardExpMonth: 12,
//                 cardExpYear: 2025,
//             },
//             booking: null,
//             addressMap: null,
//         },
//         selectedAddons: [
//             {
//                 id: "a1",
//                 name: "Insurance Premium",
//                 description: "Full coverage insurance",
//                 priceOptions: [
//                     {
//                         type: "per_day",
//                         amount: 50,
//                         currency: "USD",
//                     },
//                 ],
//                 isRequired: true,
//                 availableForCars: [],
//                 bookings: [],
//             },
//             {
//                 id: "a2",
//                 name: "Additional Driver",
//                 description: "Allow an additional person to drive the car",
//                 priceOptions: [
//                     {
//                         type: "per_rental",
//                         amount: 100,
//                         currency: "USD",
//                     },
//                 ],
//                 isRequired: false,
//                 availableForCars: [],
//                 bookings: [],
//             },
//         ],
//         priceBreakdown: {
//             baseFee: 4500,
//             addons: 300,
//             tax: 200,
//         },
//     };
//     return {
//         id: faker.string.uuid(),
//         createdAt: faker.date.past().toISOString(),
//         updatedAt: faker.date.recent().toISOString(),
//         booking: mockBooking as any,
//         addressMap: {
//             id: faker.string.uuid(),
//             createdAt: faker.date.past().toISOString(),
//             updatedAt: faker.date.recent().toISOString(),
//             isActive: faker.datatype.boolean(),
//             isDeleted: faker.datatype.boolean(),
//             currency: faker.helpers.arrayElement(Object.values(Currencies)),
//             walletAddress: faker.string.alphanumeric(42),
//             derivationPath: `m/44'/60'/0'/0/${faker.number.int({ min: 0, max: 100 })}`,
//             requestedAmount: faker.finance.amount(),
//             estimatedGasFee: faker.finance.amount(),
//             totalRequested: faker.finance.amount(),
//             deposits: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }).map(() => ({
//                 txHash: faker.string.alphanumeric(64),
//                 amount: faker.finance.amount(),
//                 gasFee: faker.finance.amount(),
//                 timestamp: faker.date.past(),
//                 processed: faker.datatype.boolean(),
//             })),
//             lastChecked: faker.date.recent(),
//             expiresAt: faker.date.future(),
//         },
//         amount: faker.number.int({ min: 50, max: 1000 }),
//         currency: faker.helpers.arrayElement(Object.values(Currencies)),
//         status: faker.helpers.arrayElement(Object.values(PaymentStatus)),
//         transactionId: faker.string.alphanumeric(12),
//         paymentMethod: faker.helpers.arrayElement(['Credit Card', 'PayPal', 'Crypto']),
//         cryptoAddress: faker.string.alphanumeric(34),
//         paidAt: faker.date.past(),
//         paymentMetadata: {
//             cardNumber: faker.finance.creditCardNumber(),
//             expiryDate: faker.date.future(),
//             cvv: faker.finance.creditCardCVV(),
//         },
//         isCrypto: faker.datatype.boolean(),
//         isActive: faker.datatype.boolean(),
//         isDeleted: isDeleted,
//         deletedAt: isDeleted ? faker.date.recent().toISOString() : undefined,
//     };
// }