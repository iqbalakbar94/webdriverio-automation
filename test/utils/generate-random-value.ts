import { faker } from '@faker-js/faker'

export class GenerateRandomValueUtils {
    public static getFirstNameValue() {
        return `First${faker.string.alpha({ length: 5, casing: 'lower' })}`
    }
    public static getLastNameValue() {
        return `Last${faker.string.alpha({ length: 5, casing: 'lower' })}`
    }
    public static getPostalCodeValue() {
        return `111${faker.string.numeric({ length: 2 })}`
    }
}