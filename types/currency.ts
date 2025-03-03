export type TCurrency = {
    name: string,
    code: string,
    symbol: string
}


export const Currencies: TCurrency[] = [
    { name: "US Dollar", code: "USD", symbol: "$" },
    { name: "Euro", code: "EUR", symbol: "€" },
    { name: "British Pound Sterling", code: "GBP", symbol: "£" },
    { name: "Japanese Yen", code: "JPY", symbol: "¥" },
    { name: "Indian Rupee", code: "INR", symbol: "₹" }
];