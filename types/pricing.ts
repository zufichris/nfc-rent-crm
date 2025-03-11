export enum Currencies {
    USD = 'USD',
    EURO = 'EURO',
    USDT = 'USDT'
}

export enum CarPricingUnit {
    HOUR = 'hour',
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month',
    YEAR = 'year',
}

export interface RentalPricingDto {
    duration?: number;
    unit?: CarPricingUnit;
    price?: number;
    currency?: Currencies;
}