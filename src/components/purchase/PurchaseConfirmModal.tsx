import React from 'react';
import { AlertCircle } from 'lucide-react';
import { PaymentDetails } from '../../types/payment';
import { formatPrice } from '../../utils/payment';

interface PurchaseConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  details: PaymentDetails;
  liters: number;
}

export const PurchaseConfirmModal: React.FC<PurchaseConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  details,
  liters,
}) => {
  if (!isOpen) return null;

  const paymentMethod = details.method.charAt(0).toUpperCase() + details.method.slice(1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <AlertCircle className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-center mb-4">Confirmer l'Achat</h3>
        
        <div className="space-y-4 mb-6">
          <div className="text-center">
            <p className="text-gray-600">Montant à payer</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatPrice(details.amount)}
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600">Quantité de carburant</p>
            <p className="text-xl font-semibold">{liters.toFixed(2)} L</p>
          </div>

          <div className="border-t pt-4">
            <p className="text-gray-600 text-sm">Méthode de paiement</p>
            <p className="font-medium">{paymentMethod}</p>
            <p className="text-gray-600 text-sm mt-2">Numéro de téléphone</p>
            <p className="font-medium">{details.phoneNumber}</p>
          </div>
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