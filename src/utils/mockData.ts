import { UserProfile, Transaction } from '../types';

export const mockUser: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+243 123 456 789',
  balance: 150.5,
  cardNumber: '1234 5678 9012 3456',
  settings: {
    language: 'fr',
    notifications: true,
    smsNotifications: true,
    theme: 'light',
    avatar: undefined
  }
};

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'purchase',
    amount: 50,
    timestamp: new Date('2024-03-10T10:00:00'),
    status: 'completed'
  },
  {
    id: '2',
    type: 'transfer',
    amount: 20,
    timestamp: new Date('2024-03-09T15:30:00'),
    from: '1234 5678 9012 3456',
    to: '9876 5432 1098 7654',
    status: 'completed'
  }
];