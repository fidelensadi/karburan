import React from 'react';
import { Droplets } from 'lucide-react';
import { useStore } from '../store/useStore';

export const BalanceCard: React.FC = () => {
  const user = useStore((state) => state.user);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Solde Carburant</h2>
        <Droplets className="h-6 w-6 text-blue-600" />
      </div>
      <div className="text-3xl font-bold text-blue-600">
        {user?.balance.toFixed(2)} L
      </div>
      <div className="text-sm text-gray-500 mt-2">
        Carte N° {user?.cardNumber}
      </div>
    </div>
  );
};