import AsyncStorage from "@react-native-async-storage/async-storage";

import { TRANSACTIONS_COLLECTION } from "./storageConfig";
import { TransactionsStorageDTO } from "./TransactionsStorageDTO";

export async function transactionsGetAll() {

    try {
        const storage = await AsyncStorage.getItem(TRANSACTIONS_COLLECTION);

        const transactions: TransactionsStorageDTO[] = storage ? JSON.parse(storage) : [];
        return transactions;
    } catch (error) {
        throw error;
    }
}
