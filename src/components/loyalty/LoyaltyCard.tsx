import React from 'react';
import { Award, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { calculateLevel, calculatePointsToNextLevel } from '../../utils/loyalty';

export const LoyaltyCard: React.FC = () => {
  const { loyaltyStats } = useStore();

  const levelColors = {
    bronze: 'from-amber-700 to-amber-500',
    silver: 'from-gray-400 to-gray-300',
    gold: 'from-yellow-500 to-yellow-300',
    platinum: 'from-purple-600 to-purple-400'
  };

  const currentLevel = calculateLevel(loyaltyStats.totalPoints);
  const pointsToNext = calculatePointsToNextLevel(loyaltyStats.totalPoints);

  return (
    <div className={`bg-gradient-to-r ${levelColors[currentLevel]} rounded-xl shadow-lg p-6 text-white mb-6`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Award className="h-6 w-6" />
          <h2 className="text-lg font-semibold">Programme Fidélité</h2>
        </div>
        <ChevronRight className="h-5 w-5" />
      </div>
      
      <div className="mb-4">
        <p className="text-3xl font-bold">{loyaltyStats.totalPoints}</p>
        <p className="text-sm opacity-90">points disponibles</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Niveau {currentLevel}</span>
          {pointsToNext > 0 && (
            <span>{pointsToNext} points avant le prochain niveau</span>
          )}
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-white rounded-full h-2"
            style={{
              width: `${(loyaltyStats.totalPoints % 1000) / 10}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};