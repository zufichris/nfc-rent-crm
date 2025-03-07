import { faker } from '@faker-js/faker';
import { IUser } from './types/user';
import { IBrand } from './types/brand';


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
        metaTitle: faker.helpers.maybe(() => faker.lorem.words(3), { probability: 0.5 }),
        metaDescription: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.5 }),
        metaTags: faker.helpers.maybe(() => faker.lorem.words(4), { probability: 0.5 }),
        models: [],
        website: faker.internet.url()
    };
}