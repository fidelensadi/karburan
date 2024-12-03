import { Transaction } from './index';

export type PaymentMethod = 'mpesa' | 'airtel' | 'orange';

export interface PaymentDetails {
  method: PaymentMethod;
  phoneNumber: string;
  amount: number;
}

export interface PurchaseTransaction extends Transaction {
  paymentMethod: PaymentMethod;
  phoneNumber: string;
}