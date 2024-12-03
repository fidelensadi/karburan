import { create } from 'zustand';
import { Transaction } from '../types';
import { UserProfile } from '../types/settings';
import { Alert, AlertThresholds } from '../types/alerts';
import { LoyaltyStats, Reward, RewardTransaction } from '../types/loyalty';
import { mockUser, mockTransactions } from '../utils/mockData';
import { DEFAULT_THRESHOLDS, checkLowStock, checkUnusualUsage, checkLocationRestriction } from '../utils/alerts';
import { calculatePoints } from '../utils/loyalty';

interface Store {
  user: UserProfile | null;
  transactions: Transaction[];
  alerts: Alert[];
  alertThresholds: AlertThresholds;
  loyaltyStats: LoyaltyStats;
  
  setUser: (user: UserProfile | null) => void;
  addTransaction: (transaction: Transaction) => void;
  updateBalance: (amount: number) => void;
  updateUserSettings: (settings: Partial<UserProfile['settings']>) => void;
  updateUserProfile: (profile: Partial<Omit<UserProfile, 'settings'>>) => void;
  addAlert: (alert: Alert) => void;
  markAlertAsRead: (alertId: string) => void;
  updateAlertThresholds: (thresholds: Partial<AlertThresholds>) => void;
  dismissAlert: (alertId: string) => void;
  redeemReward: (reward: Reward) => void;
}

export const useStore = create<Store>((set, get) => ({
  user: mockUser,
  transactions: mockTransactions,
  alerts: [],
  alertThresholds: DEFAULT_THRESHOLDS,
  loyaltyStats: {
    totalPoints: 1500,
    level: 'silver',
    pointsToNextLevel: 3500,
    ecoScore: 75,
    rewardsRedeemed: 0,
  },

  setUser: (user) => set({ user }),

  addTransaction: (transaction) =>
    set((state) => {
      const newState = { transactions: [transaction, ...state.transactions] };
      
      // Update loyalty points for purchases
      if (transaction.type === 'purchase') {
        const points = calculatePoints(transaction);
        newState.loyaltyStats = {
          ...state.loyaltyStats,
          totalPoints: state.loyaltyStats.totalPoints + points,
        };
      }

      if (transaction.type === 'transfer' && state.user) {
        const newBalance = state.user.balance - transaction.amount;
        newState.user = { ...state.user, balance: newBalance };

        // Check for alerts
        const alerts: Alert[] = [];
        
        const stockAlert = checkLowStock(newBalance, state.alertThresholds.lowStock);
        if (stockAlert) alerts.push(stockAlert);

        const avgUsage = state.transactions
          .filter((t) => t.type === 'transfer')
          .reduce((sum, t) => sum + t.amount, 0) / state.transactions.length;
        
        const usageAlert = checkUnusualUsage(
          transaction,
          avgUsage,
          state.alertThresholds.unusualUsage
        );
        if (usageAlert) alerts.push(usageAlert);

        const locationAlert = checkLocationRestriction(
          transaction,
          ['Kinshasa', 'Lubumbashi', 'Goma']
        );
        if (locationAlert) alerts.push(locationAlert);

        if (alerts.length > 0) {
          newState.alerts = [...alerts, ...state.alerts];
        }
      }

      return newState;
    }),

  updateBalance: (amount) =>
    set((state) => {
      const newState = {
        user: state.user ? { ...state.user, balance: amount } : null
      };

      if (state.user) {
        const stockAlert = checkLowStock(amount, state.alertThresholds.lowStock);
        if (stockAlert) {
          newState.alerts = [stockAlert, ...(state.alerts || [])];
        }
      }

      return newState;
    }),

  updateUserSettings: (settings) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, settings: { ...state.user.settings, ...settings } }
        : null
    })),

  updateUserProfile: (profile) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...profile } : null
    })),

  addAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts]
    })),

  markAlertAsRead: (alertId) =>
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    })),

  dismissAlert: (alertId) =>
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== alertId)
    })),

  updateAlertThresholds: (thresholds) =>
    set((state) => ({
      alertThresholds: { ...state.alertThresholds, ...thresholds }
    })),

  redeemReward: (reward) =>
    set((state) => {
      if (state.loyaltyStats.totalPoints < reward.pointsCost) {
        return state;
      }

      const rewardTransaction: RewardTransaction = {
        id: Date.now().toString(),
        type: 'purchase',
        amount: 0,
        timestamp: new Date(),
        status: 'completed',
        rewardId: reward.id,
        pointsSpent: reward.pointsCost,
      };

      return {
        transactions: [rewardTransaction, ...state.transactions],
        loyaltyStats: {
          ...state.loyaltyStats,
          totalPoints: state.loyaltyStats.totalPoints - reward.pointsCost,
          rewardsRedeemed: state.loyaltyStats.rewardsRedeemed + 1,
        },
      };
    }),
}));