import React from 'react';
import { PAYMENT_METHODS } from '../../utils/payment';
import type { PaymentMethod } from '../../types/payment';

interface PaymentMethodSelectorProps {
  selected: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {PAYMENT_METHODS.map((method) => (
        <button
          key={method.id}
          onClick={() => onSelect(method.id)}
          className={`p-6 border rounded-lg flex flex-col items-center transition-all ${
            selected === method.id
              ? 'border-blue-600 bg-blue-50 scale-105'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
          }`}
        >
          <img
            src={method.logo}
            alt={method.name}
            className="w-16 h-16 rounded-full mb-4 object-cover"
          />
          <span className="text-lg font-medium text-gray-700">{method.name}</span>
        </button>
      ))}
    </div>
  );
};