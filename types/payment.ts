import { IBooking } from "./bookings";
import { Currencies } from "./pricing";
import { IBaseEntity } from "./shared";

export enum PaymentStatus {
    PENDING = "PENDING",
    PENDING_CAPTURE = "PENDING_CAPTURE",
    PAID = "PAID",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED",
}

export interface IAddressMapping extends IBaseEntity {
    payment: IPayment;
    currency: Currencies;
    walletAddress: string;
    derivationPath: string;
    requestedAmount: string;
    estimatedGasFee: string;
    totalRequested: string;
    deposits: {
        txHash: string;
        amount: string;
        gasFee: string;
        timestamp: Date;
        processed: boolean;
    }[];

    lastChecked: Date;

    expiresAt: Date;
}

export interface IPayment extends IBaseEntity {
    booking?: IBooking;
    addressMap: IAddressMapping;
    amount: number;
    currency: Currencies;
    status: PaymentStatus;
    transactionId?: string;
    paymentMethod?: string;
    cryptoAddress?: string;
    paidAt?: Date;
    paymentMetadata?: Record<string, any>;
    isCrypto?: boolean;
}
