import { useStore } from '../store/useStore';

export const syncOfflineData = async () => {
  if (!navigator.onLine) return;

  const pendingTransactions = useStore.getState().transactions.filter(
    (t) => t.status === 'pending'
  );

  for (const transaction of pendingTransactions) {
    try {
      // Simulate API call to sync transaction
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Update transaction status to completed
      useStore.getState().addTransaction({
        ...transaction,
        status: 'completed'
      });
    } catch (error) {
      console.error('Failed to sync transaction:', error);
    }
  }
};

export const handleOfflineTransaction = (transaction: any) => {
  useStore.getState().addTransaction({
    ...transaction,
    status: 'pending'
  });

  window.addEventListener('online', () => {
    syncOfflineData();
  });
};