import { Transaction } from './index';

export type AlertType = 'usage' | 'location' | 'stock' | 'security';
export type AlertSeverity = 'info' | 'warning' | 'critical';

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  timestamp: Date;
  read: boolean;
  metadata?: {
    transaction?: Transaction;
    location?: string;
    threshold?: number;
    currentValue?: number;
  };
}

export interface AlertThresholds {
  lowStock: number; // en litres
  unusualUsage: number; // pourcentage d'augmentation
  maxDailyUsage: number; // litres par jour
}