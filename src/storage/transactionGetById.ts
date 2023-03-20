import AsyncStorage from "@react-native-async-storage/async-storage";

import { TRANSACTIONS_COLLECTION } from "./storageConfig";
import { TransactionsStorageDTO } from "./TransactionsStorageDTO";

export async function transactionGetById(id: string) {
    try {
        const storage = await AsyncStorage.getItem(TRANSACTIONS_COLLECTION);

        const transactions: TransactionsStorageDTO[] = storage ? JSON.parse(storage) : [];

        const transaction = transactions.find(transaction => transaction.id === id);

        return transaction;
    } catch (error) {
        throw error;
    }
}