import AsyncStorage from "@react-native-async-storage/async-storage";

import { TRANSACTIONS_COLLECTION } from "./storageConfig";
import { transactionsGetAll } from "./transactionsGetAll";

export async function transactionRemoveById(id: string) {

    try {
        const storedMeals = await transactionsGetAll();

        const storage = JSON.stringify(
            storedMeals.filter((item) => item.id !== id)
        );

        await AsyncStorage.setItem(TRANSACTIONS_COLLECTION, storage);
    } catch (error) {
        throw error;
    }
}
