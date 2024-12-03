export interface AuthState {
  isAuthenticated: boolean;
  cardNumber: string | null;
}

export interface LoginCredentials {
  cardNumber: string;
  pin: string;
}

export const VALID_CREDENTIALS = {
  cardNumber: '1234 5678 9012 3456',
  pin: '54321'
};