import { create } from 'zustand';
import { AuthState, LoginCredentials, VALID_CREDENTIALS } from '../types/auth';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  cardNumber: null,

  login: (credentials) => {
    const isValid = 
      credentials.cardNumber.replace(/\s/g, '') === VALID_CREDENTIALS.cardNumber.replace(/\s/g, '') &&
      credentials.pin === VALID_CREDENTIALS.pin;

    if (isValid) {
      set({ isAuthenticated: true, cardNumber: credentials.cardNumber });
    }

    return isValid;
  },

  logout: () => {
    set({ isAuthenticated: false, cardNumber: null });
  },
}));