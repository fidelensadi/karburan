import React from 'react';
import { useStore } from '../store/useStore';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export const TransactionList: React.FC = () => {
  const transactions = useStore((state) => state.transactions);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Transactions Récentes</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-3">
              {transaction.type === 'purchase' ? (
                <div className="bg-green-100 p-2 rounded-full">
                  <ArrowDownLeft className="h-5 w-5 text-green-600" />
                </div>
              ) : (
                <div className="bg-blue-100 p-2 rounded-full">
                  <ArrowUpRight className="h-5 w-5 text-blue-600" />
                </div>
              )}
              <div>
                <p className="font-medium text-gray-800">
                  {transaction.type === 'purchase' ? 'Achat' : 'Transfert'}
                </p>
                <p className="text-sm text-gray-500">
                  {transaction.timestamp.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-800">
                {transaction.amount.toFixed(2)} L
              </p>
              <p className="text-sm text-gray-500">
                {transaction.status === 'completed' ? 'Complété' : 'En cours'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};