import { Alert, AlertType, AlertSeverity, AlertThresholds } from '../types/alerts';
import { Transaction } from '../types';

export const DEFAULT_THRESHOLDS: AlertThresholds = {
  lowStock: 20, // Alert when stock is below 20L
  unusualUsage: 50, // Alert when usage increases by 50%
  maxDailyUsage: 100, // Alert when daily usage exceeds 100L
};

export const createAlert = (
  type: AlertType,
  severity: AlertSeverity,
  message: string,
  metadata?: Alert['metadata']
): Alert => ({
  id: Date.now().toString(),
  type,
  severity,
  message,
  timestamp: new Date(),
  read: false,
  metadata,
});

export const checkLowStock = (currentBalance: number, threshold: number): Alert | null => {
  if (currentBalance <= threshold) {
    return createAlert(
      'stock',
      'warning',
      `Stock bas : ${currentBalance.toFixed(1)}L restants`,
      { currentValue: currentBalance, threshold }
    );
  }
  return null;
};

export const checkUnusualUsage = (
  transaction: Transaction,
  averageUsage: number,
  threshold: number
): Alert | null => {
  if (transaction.type === 'purchase') return null;

  const percentageIncrease = ((transaction.amount - averageUsage) / averageUsage) * 100;
  if (percentageIncrease > threshold) {
    return createAlert(
      'usage',
      'warning',
      `Usage inhabituel détecté : ${transaction.amount.toFixed(1)}L (${percentageIncrease.toFixed(0)}% au-dessus de la moyenne)`,
      { transaction, threshold: threshold }
    );
  }
  return null;
};

export const checkLocationRestriction = (
  transaction: Transaction,
  allowedLocations: string[]
): Alert | null => {
  // Simulated location check
  const currentLocation = 'Kinshasa';
  if (!allowedLocations.includes(currentLocation)) {
    return createAlert(
      'location',
      'critical',
      `Transaction détectée hors zone autorisée : ${currentLocation}`,
      { transaction, location: currentLocation }
    );
  }
  return null;
};