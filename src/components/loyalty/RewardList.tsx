import React from 'react';
import { useStore } from '../../store/useStore';
import { RewardCard } from './RewardCard';
import { AVAILABLE_REWARDS } from '../../utils/loyalty';
import type { Reward } from '../../types/loyalty';

export const RewardList: React.FC = () => {
  const { loyaltyStats, redeemReward } = useStore();

  const handleRedeem = (reward: Reward) => {
    if (loyaltyStats.totalPoints >= reward.pointsCost) {
      redeemReward(reward);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {AVAILABLE_REWARDS.map((reward) => (
        <RewardCard
          key={reward.id}
          reward={reward}
          onRedeem={handleRedeem}
          disabled={loyaltyStats.totalPoints < reward.pointsCost}
        />
      ))}
    </div>
  );
};