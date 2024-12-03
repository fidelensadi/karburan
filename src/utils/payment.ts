import { PaymentMethod } from '../types/payment';

export const PAYMENT_METHODS: { id: PaymentMethod; name: string; logo: string }[] = [
  {
    id: 'mpesa',
    name: 'M-Pesa',
    logo: 'https://play-lh.googleusercontent.com/XOIgIGCECTxynIY-kShXrVQkIZ7YWHDaui3jAoD24RyZk6faKjp7XV6FSOR0BgdTgO8'
  },
  {
    id: 'airtel',
    name: 'Airtel Money',
    logo: 'https://pbs.twimg.com/profile_images/1440300597979222025/49YTv0_o_400x400.png'
  },
  {
    id: 'orange',
    name: 'Orange Money',
    logo: 'https://seeklogo.com/images/O/orange-money-logo-8F2AED308D-seeklogo.com.png'
  }
];

export const PRICE_PER_LITER = 2.5; // Prix en USD

export const formatPrice = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

export const calculateLiters = (amount: number): number => {
  return amount / PRICE_PER_LITER;
};

export const simulatePayment = async (
  phoneNumber: string,
  amount: number,
  method: PaymentMethod
): Promise<boolean> => {
  // Simuler un délai de traitement
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return Math.random() > 0.1; // 90% de chance de succès
};