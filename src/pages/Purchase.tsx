import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';
import { PaymentMethodSelector } from '../components/purchase/PaymentMethodSelector';
import { PurchaseForm } from '../components/purchase/PurchaseForm';
import { PaymentMethod } from '../types/payment';

export const Purchase: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Acheter du Carburant</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          {!selectedMethod ? (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Choisissez votre méthode de paiement
              </h2>
              <PaymentMethodSelector
                selected={selectedMethod}
                onSelect={setSelectedMethod}
              />
            </div>
          ) : (
            <PurchaseForm
              paymentMethod={selectedMethod}
              onBack={() => setSelectedMethod(null)}
            />
          )}
        </div>
      </main>
    </div>
  );
};