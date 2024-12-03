import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Send, History, Gift } from 'lucide-react';

export const ActionButtons: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <button
        onClick={() => navigate('/purchase')}
        className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md"
      >
        <CreditCard className="h-6 w-6 text-blue-600 mb-2" />
        <span className="text-sm text-gray-700">Acheter</span>
      </button>
      <button
        onClick={() => navigate('/transfer')}
        className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md"
      >
        <Send className="h-6 w-6 text-blue-600 mb-2" />
        <span className="text-sm text-gray-700">Transférer</span>
      </button>
      <button
        onClick={() => navigate('/history')}
        className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md"
      >
        <History className="h-6 w-6 text-blue-600 mb-2" />
        <span className="text-sm text-gray-700">Historique</span>
      </button>
      <button
        onClick={() => navigate('/loyalty')}
        className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md"
      >
        <Gift className="h-6 w-6 text-blue-600 mb-2" />
        <span className="text-sm text-gray-700">Récompenses</span>
      </button>
    </div>
  );
};