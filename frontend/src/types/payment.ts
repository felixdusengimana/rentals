import { ITable } from ".";

export interface IPayment extends ITable {
    amount: number;
    transactionId: string;
    paymentMethod: string;
    status: EPaymentStatus;
}

export enum EPaymentStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    UNPAID = 'UNPAID',
    REFUNDED = 'REFUNDED'
}
