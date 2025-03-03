import { faker } from '@faker-js/faker';
import { IUser } from './types/user';
import { IBrand, IBrandTranslation } from './types/brand';


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


export function generateFakeBrandTranslation(): IBrandTranslation {
    return {
        parentId: faker.number.int(),
        name: faker.lorem.words(2),
        shortDescription: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.5 }),
        description: faker.helpers.maybe(() => faker.lorem.paragraph(), { probability: 0.5 }),
        metaTitle: faker.helpers.maybe(() => faker.lorem.words(3), { probability: 0.5 }),
        metaDescription: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.5 }),
        metaTags: faker.helpers.maybe(() => faker.lorem.words(4), { probability: 0.5 }),
    };
}

export function generateFakeBrand(): IBrand {
    const translations = Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
        generateFakeBrandTranslation()
    );

    return {
        id: faker.number.int(),
        code: faker.string.alphanumeric(6),
        slug: faker.lorem.slug(),
        logo: faker.helpers.maybe(() => faker.image.url({ width: 100, height: 100 }), { probability: 0.5 }),
        coverImage: faker.helpers.maybe(() => faker.image.url({ width: 800, height: 600 }), { probability: 0.5 }),
        translations,
        models: [],
    };
}
