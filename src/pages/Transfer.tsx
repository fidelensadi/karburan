import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { Header } from '../components/Header';
import { TransferConfirmModal } from '../components/TransferConfirmModal';
import { useStore } from '../store/useStore';

export const Transfer: React.FC = () => {
  const navigate = useNavigate();
  const [recipientCard, setRecipientCard] = useState('');
  const [amount, setAmount] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  
  const { user, addTransaction } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!recipientCard || !amount) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Montant invalide');
      return;
    }

    if (numAmount > (user?.balance || 0)) {
      setError('Solde insuffisant');
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirm = () => {
    const newTransaction = {
      id: Date.now().toString(),
      type: 'transfer' as const,
      amount: parseFloat(amount),
      timestamp: new Date(),
      from: user?.cardNumber,
      to: recipientCard,
      status: 'completed' as const,
    };

    addTransaction(newTransaction);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Transférer du Carburant</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de Carte du Destinataire
              </label>
              <input
                type="text"
                value={recipientCard}
                onChange={(e) => setRecipientCard(e.target.value)}
                placeholder="XXXX XXXX XXXX XXXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantité (Litres)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <Send className="h-5 w-5" />
              <span>Transférer</span>
            </button>
          </form>
        </div>
      </main>

      <TransferConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        amount={parseFloat(amount)}
        recipientCard={recipientCard}
      />
    </div>
  );
};