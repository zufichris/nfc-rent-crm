export enum Currencies {
    USD = 'USD',
    AED = 'AED',
    EUR = 'EUR',
    TRON = 'TRX',
    TRC20 = 'TRC20',
    ETH = 'ETH',
    ERC20 = 'ERC20',
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