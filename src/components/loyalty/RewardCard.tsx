import React from 'react';
import { Gift, Percent, Car, Leaf } from 'lucide-react';
import { Reward } from '../../types/loyalty';

interface RewardCardProps {
  reward: Reward;
  onRedeem: (reward: Reward) => void;
  disabled?: boolean;
}

const IconMap = {
  percent: Percent,
  car: Car,
  leaf: Leaf,
  gift: Gift,
};

export const RewardCard: React.FC<RewardCardProps> = ({
  reward,
  onRedeem,
  disabled = false,
}) => {
  const Icon = IconMap[reward.icon as keyof typeof IconMap] || Gift;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <Icon className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="font-semibold text-gray-800 mb-2 text-center">{reward.name}</h3>
        <p className="text-sm text-gray-600 mb-4 text-center">{reward.description}</p>
        <div className="flex items-center justify-between w-full mt-auto">
          <div className="flex items-center space-x-1 text-blue-600">
            <Gift className="h-4 w-4" />
            <span className="font-medium">{reward.pointsCost} points</span>
          </div>
          <button
            onClick={() => onRedeem(reward)}
            disabled={disabled}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              disabled
                ? 'bg-gray-100 text-gray-400'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Échanger
          </button>
        </div>
      </div>
    </div>
  );
};