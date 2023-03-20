// import 'react-native-get-random-values';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

import { TRANSACTIONS_COLLECTION } from "./storageConfig";
import { TransactionsStorageDTO } from "./TransactionsStorageDTO";
import { transactionsGetAll } from "./transactionsGetAll";

export async function transactionsCreate(transaction: TransactionsStorageDTO) {
    try {

        const storedMeals = await transactionsGetAll();

        const storage = JSON.stringify([
            ...storedMeals,
            { id: uuidv4(), ...transaction },
        ]);

        await AsyncStorage.setItem(TRANSACTIONS_COLLECTION, storage);
    } catch (error) {
        throw error;
    }
}
