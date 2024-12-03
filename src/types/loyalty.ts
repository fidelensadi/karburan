import { Transaction } from './index';

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  type: 'discount' | 'freeProduct' | 'service';
  value: number; // Discount percentage or product/service value
  icon: string;
}

export interface LoyaltyStats {
  totalPoints: number;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  pointsToNextLevel: number;
  ecoScore: number; // 0-100
  rewardsRedeemed: number;
}

export interface RewardTransaction extends Transaction {
  rewardId: string;
  pointsSpent: number;
}