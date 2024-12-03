import React from 'react';
import { Header } from '../components/Header';
import { BalanceCard } from '../components/BalanceCard';
import { ActionButtons } from '../components/ActionButtons';
import { TransactionList } from '../components/TransactionList';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <BalanceCard />
        <ActionButtons />
        <TransactionList />
      </main>
    </div>
  );
};