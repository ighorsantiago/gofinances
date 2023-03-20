import { useCallback, useState } from "react";
import { Alert, FlatList, ActivityIndicator } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useTheme } from "styled-components";

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    LogoutButton,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionsList,
    LoadContainer
} from "./styles";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";

import { transactionsGetAll } from "../../storage/transactionsGetAll";
import { TransactionsStorageDTO } from "../../storage/TransactionsStorageDTO";

import { transactionRemoveById } from "../../storage/transactionRemoveById";

interface HighlightProps {
    amount: string;
    lastTransaction: string;
}

interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export function Dashboard() {

    const navigation = useNavigation();

    const theme = useTheme();

    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<TransactionsStorageDTO[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    // async function loadData() {
    //     const storage = await transactionsGetAll();

    //     const transactionsFormatted: TransactionsStorageDTO[] = storage
    //         .map((item) => {

    //             const amount = Number(item.amount)
    //                 .toLocaleString('pt-BR', {
    //                     style: 'currency',
    //                     currency: 'BRL'
    //                 });

    //             const date = Intl.DateTimeFormat('pt-BR', {
    //                 day: '2-digit',
    //                 month: '2-digit',
    //                 year: '2-digit'
    //             }).format(new Date(item.date));

    //             return {
    //                 id: item.id,
    //                 name: item.name,
    //                 amount,
    //                 transactionType: item.transactionType,
    //                 category: item.category,
    //                 date,
    //             }
    //     });

    //     setData(transactionsFormatted);
    // }

    function getLastTransactionDate(
        collection: TransactionsStorageDTO[],
        type: 'up' | 'down'
    ) {

        const collectionFilttered = collection
            .filter(transaction => transaction.transactionType === type);

        if (collectionFilttered.length === 0) return 0;

        const lastTransaction = new Date(Math.max.apply(Math, collectionFilttered
            .map(transaction => new Date(transaction.date).getTime())));

        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`
    }

    async function loadTransactions() {

        const transactions = await transactionsGetAll();

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted = transactions
            .map((item: TransactionsStorageDTO) => {

                if (item.transactionType === 'up') {
                    entriesTotal += Number(item.amount);
                } else {
                    expensiveTotal += Number(item.amount);
                }

                const amount = Number(item.amount)
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });

                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(item.date));

                return {
                    ...item,
                    amount,
                    date,
                }
            });

        setTransactions(transactionsFormatted);

        const lastTransactionEntries = getLastTransactionDate(transactions, 'up');
        const lastTransactionExpensives = getLastTransactionDate(transactions, 'down');

        const totalInterval = lastTransactionExpensives === 0
            ? 'Não há transações'
            : `01 a ${lastTransactionExpensives}`;

        const total = entriesTotal - expensiveTotal;

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastTransactionEntries === 0
                    ? 'Não há transações'
                    : `Última entrada dia ${lastTransactionEntries}`,
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastTransactionExpensives === '0'
                    ? 'Não há transações'
                    : `Última entrada dia ${lastTransactionExpensives}`,
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval,
            },
        });

        setIsLoading(false);
    }

    // function handleNavigateToEdit(transaction: TransactionsStorageDTO) {

    //     navigation.navigate('edit', {transactioinToEdit: transaction});
    // }

    function handleRemoveTransaction(id: string) {

        Alert.alert("Remover", "Deseja remover a refeição?", [
            { text: "Não", style: "cancel" },
            { text: "Sim", onPress: () => transactionRemove(id) },
        ]);
    }

    async function transactionRemove(id: string) {
        await transactionRemoveById(id);

        loadTransactions();
    }

    useFocusEffect(
        useCallback(() => {
            loadTransactions();
        }, [])
    );

    return (
        <Container>
            {
                isLoading ? 
                <LoadContainer>
                    <ActivityIndicator
                        color={theme.colors.primary}
                        size="large"
                    />
                </LoadContainer>
                :
                <>
                    <Header>
                        <UserWrapper>
                            <UserInfo>
                                <Photo source={{ uri: 'https://github.com/ighorsantiago.png' }} />
                                <User>
                                    <UserGreeting>Olá,</UserGreeting>
                                    <UserName>Ighor</UserName>
                                </User>
                            </UserInfo>
                            <LogoutButton onPress={() => { }}>
                                <Icon name="power" />
                            </LogoutButton>
                        </UserWrapper>
                    </Header>

                    <HighlightCards>
                        <HighlightCard
                            type="up"
                            title="Entradas"
                            amount={highlightData.entries.amount}
                            lastTransaction={highlightData.entries.lastTransaction}
                        />
                        <HighlightCard
                            type="down"
                            title="Saídas"
                            amount={highlightData.expensives.amount}
                            lastTransaction={highlightData.expensives.lastTransaction}
                        />
                        <HighlightCard
                            type="total"
                            title="Total"
                            amount={highlightData.total.amount}
                            lastTransaction={highlightData.total.lastTransaction}
                        />
                    </HighlightCards>

                    <Transactions>
                        <Title>Listagem</Title>

                        <FlatList
                            data={transactions}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingBottom: getBottomSpace()
                            }}
                            renderItem={({ item }) => (
                                <TransactionCard
                                    data={item}
                                    onPress={() => handleRemoveTransaction(item.id)}
                                />
                            )}
                        />
                    </Transactions>
                </>
            }
        </Container>
    );
}
