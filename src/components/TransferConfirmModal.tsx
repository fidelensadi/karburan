import React from 'react';
import { AlertCircle } from 'lucide-react';

interface TransferConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: number;
  recipientCard: string;
}

export const TransferConfirmModal: React.FC<TransferConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  amount,
  recipientCard,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <AlertCircle className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-center mb-4">Confirmer le Transfert</h3>
        
        <div className="space-y-4 mb-6">
          <p className="text-gray-600 text-center">
            Vous êtes sur le point de transférer
          </p>
          <p className="text-2xl font-bold text-center text-blue-600">
            {amount.toFixed(2)} L
          </p>
          <p className="text-gray-600 text-center">
            vers la carte
          </p>
          <p className="text-lg font-semibold text-center">
            {recipientCard}
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};