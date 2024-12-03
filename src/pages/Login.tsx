import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fuel, CreditCard, KeyRound } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [cardNumber, setCardNumber] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const groups = digits.match(/.{1,4}/g) || [];
    return groups.join(' ').substr(0, 19);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!cardNumber || !pin) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const success = login({ cardNumber, pin });
    if (success) {
      navigate('/');
    } else {
      setError('Numéro de carte ou PIN incorrect');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-600 p-4 rounded-full">
                <Fuel className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Karburan</h1>
            <p className="mt-2 text-gray-600">Connectez-vous à votre compte carburant</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de Carte
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                    maxLength={19}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PIN
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    maxLength={5}
                    placeholder="•••••"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};