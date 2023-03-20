import AsyncStorage from "@react-native-async-storage/async-storage";

import { TRANSACTIONS_COLLECTION } from "./storageConfig";
import { TransactionsStorageDTO } from "./TransactionsStorageDTO";
import { transactionsGetAll } from "./transactionsGetAll";

export async function transactionUpdate(transaction: TransactionsStorageDTO) {
    try {
        const storedTransactions = await transactionsGetAll();

        const updatedTransactioins = storedTransactions.filter(item => item.id !== transaction.id);

        const storage = JSON.stringify([
            ...updatedTransactioins,
            transaction,
        ]);

        await AsyncStorage.setItem(TRANSACTIONS_COLLECTION, storage);
    } catch (error) {
        throw error;
    }
}