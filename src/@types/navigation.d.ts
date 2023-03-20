import { TransactionsStorageDTO } from "../storage/TransactionsStorageDTO";

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            dashboard: undefined;
            register: undefined;
            resume: undefined;
            edit: {
                transactioinToEdit: TransactionsStorageDTO;
            };
        }
    }
}
