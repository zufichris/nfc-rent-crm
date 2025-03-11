import { faker } from '@faker-js/faker';
import { IUser } from './types/user';
import { IBrand } from './types/brand';
import { ICar } from './types/car';
import { MediaType } from './types/media';
import { CarPricingUnit, Currencies } from './types/pricing';


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