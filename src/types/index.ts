export interface User {
  id: string;
  name: string;
  balance: number;
  cardNumber: string;
}

export interface Transaction {
  id: string;
  type: 'purchase' | 'transfer';
  amount: number;
  timestamp: Date;
  from?: string;
  to?: string;
  status: 'pending' | 'completed' | 'failed';
}