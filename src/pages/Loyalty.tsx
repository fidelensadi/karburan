import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Leaf } from 'lucide-react';
import { Header } from '../components/Header';
import { LoyaltyCard } from '../components/loyalty/LoyaltyCard';
import { RewardList } from '../components/loyalty/RewardList';
import { useStore } from '../store/useStore';

export const Loyalty: React.FC = () => {
  const navigate = useNavigate();
  const { loyaltyStats } = useStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-4">
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Récompenses</h1>
          </div>
          <div className="flex items-center space-x-2 text-green-600">
            <Leaf className="h-5 w-5" />
            <span className="font-medium">Score Eco: {loyaltyStats.ecoScore}/100</span>
          </div>
        </div>

        <LoyaltyCard />

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Récompenses Disponibles
          </h2>
          <RewardList />
        </div>
      </main>
    </div>
  );
};