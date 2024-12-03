import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Loader } from 'lucide-react';
import { PurchaseConfirmModal } from './PurchaseConfirmModal';
import { useStore } from '../../store/useStore';
import { PaymentMethod, PaymentDetails } from '../../types/payment';
import { PRICE_PER_LITER, calculateLiters, simulatePayment } from '../../utils/payment';
import { useNavigate } from 'react-router-dom';

interface PurchaseFormProps {
  paymentMethod: PaymentMethod;
  onBack: () => void;
}

export const PurchaseForm: React.FC<PurchaseFormProps> = ({
  paymentMethod,
  onBack,
}) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  
  const { addTransaction, updateBalance, user } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phoneNumber || !amount) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (!/^\+?[\d\s-]{10,}$/.test(phoneNumber)) {
      setError('Numéro de téléphone invalide');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Montant invalide');
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    setShowConfirm(false);

    const numAmount = parseFloat(amount);
    const liters = calculateLiters(numAmount);

    try {
      const success = await simulatePayment(phoneNumber, numAmount, paymentMethod);

      if (success) {
        const newTransaction = {
          id: Date.now().toString(),
          type: 'purchase' as const,
          amount: liters,
          timestamp: new Date(),
          status: 'completed' as const,
          paymentMethod,
          phoneNumber,
        };

        addTransaction(newTransaction);
        updateBalance((user?.balance || 0) + liters);
        navigate('/');
      } else {
        setError('Le paiement a échoué. Veuillez réessayer.');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentDetails: PaymentDetails = {
    method: paymentMethod,
    phoneNumber,
    amount: parseFloat(amount),
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 mb-6 hover:text-blue-700"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Changer de méthode de paiement
      </button>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Montant (USD)
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
            />
            <span className="absolute left-3 top-2 text-gray-500">$</span>
          </div>
          {amount && (
            <p className="text-sm text-gray-500 mt-1">
              ≈ {calculateLiters(parseFloat(amount)).toFixed(2)} L (${PRICE_PER_LITER}/L)
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Numéro de Téléphone
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+243 XXX XXX XXX"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {isProcessing ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <CreditCard className="h-5 w-5" />
              <span>Payer</span>
            </>
          )}
        </button>
      </form>

      <PurchaseConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        details={paymentDetails}
        liters={calculateLiters(parseFloat(amount))}
      />
    </div>
  );
};