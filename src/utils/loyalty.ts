import { Transaction } from '../types';
import { Reward, LoyaltyStats } from '../types/loyalty';

export const POINTS_PER_LITER = 2;
export const ECO_BONUS_MULTIPLIER = 1.5;

const LEVEL_THRESHOLDS = {
  bronze: 0,
  silver: 1000,
  gold: 5000,
  platinum: 10000,
};

export const calculatePoints = (transaction: Transaction): number => {
  if (transaction.type !== 'purchase') return 0;
  return Math.floor(transaction.amount * POINTS_PER_LITER);
};

export const calculateLevel = (totalPoints: number): LoyaltyStats['level'] => {
  if (totalPoints >= LEVEL_THRESHOLDS.platinum) return 'platinum';
  if (totalPoints >= LEVEL_THRESHOLDS.gold) return 'gold';
  if (totalPoints >= LEVEL_THRESHOLDS.silver) return 'silver';
  return 'bronze';
};

export const calculatePointsToNextLevel = (totalPoints: number): number => {
  const currentLevel = calculateLevel(totalPoints);
  const levels = Object.entries(LEVEL_THRESHOLDS);
  const currentLevelIndex = levels.findIndex(([level]) => level === currentLevel);
  
  if (currentLevelIndex === levels.length - 1) return 0;
  
  const nextLevelThreshold = levels[currentLevelIndex + 1][1];
  return nextLevelThreshold - totalPoints;
};

export const AVAILABLE_REWARDS: Reward[] = [
  {
    id: '1',
    name: 'Réduction 10%',
    description: 'Obtenez 10% de réduction sur votre prochain plein',
    pointsCost: 500,
    type: 'discount',
    value: 10,
    icon: 'percent'
  },
  {
    id: '2',
    name: 'Lavage Auto Gratuit',
    description: 'Un lavage auto complet gratuit',
    pointsCost: 1000,
    type: 'service',
    value: 25,
    icon: 'car'
  },
  {
    id: '3',
    name: 'Bonus Eco-responsable',
    description: 'Points doublés pendant 1 mois pour comportement éco-responsable',
    pointsCost: 2000,
    type: 'service',
    value: 0,
    icon: 'leaf'
  }
];