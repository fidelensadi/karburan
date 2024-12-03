import { User } from './index';

export interface UserSettings {
  language: 'fr' | 'en';
  notifications: boolean;
  smsNotifications: boolean;
  theme: 'light' | 'dark';
  avatar?: string;
}

export interface UserProfile extends User {
  email: string;
  phone: string;
  settings: UserSettings;
}