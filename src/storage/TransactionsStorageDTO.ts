export type TransactionsStorageDTO = {
  id?: string;
  name: string;
  amount: string;
  // transactionType: 'up' | 'down';
  transactionType: string;
  category: string;
  date: string;
}
