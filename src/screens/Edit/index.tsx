import { useState, useEffect } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from "react-hook-form";

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from "./styles";

import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";
import { Input } from "../../components/Form/Input";

import { transactionsCreate } from "../../storage/transactionCreate";
import { TransactionsStorageDTO } from "../../storage/TransactionsStorageDTO";

interface FormData {
    name: string;
    amount: string;
}

type RouteParams = {
    transactionToEdit: TransactionsStorageDTO;
};


const schema = Yup.object().shape({
    name: Yup
        .string()
        .required('O nome é obrigatório'),

    amount: Yup
        .number()
        .typeError('Informe um valor numérico')
        .positive('O valor não pode ser negativo')
        .required('O valor é obrigatório'),
});

export function Edit() {

    const navigation = useNavigation();
    const route = useRoute();
    const { transactionToEdit } = route.params as RouteParams;

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionTypeSelect(type: 'up' | 'down') {

        setTransactionType(type);
    }

    function handleOpenSelectCategory() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategory() {
        setCategoryModalOpen(false);
    }

    async function handleRegister(form: FormData) {

        if (!transactionType) {
            return Alert.alert('Selecione o tipo da transação.');
        }

        if (category.key === 'category') {
            return Alert.alert('Selecione a categoria.');
        }

        const newTransaction: TransactionsStorageDTO = {
            name,
            amount,
            transactionType,
            category: category.key,
            date: String(new Date()),
        }

        try {

            await transactionsCreate(newTransaction);

            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria'
            });
            reset();

            navigation.navigate('dashboard');

        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível salvar.")
        }
    }

    useEffect(() => {
        setName(transactionToEdit.name);
        setAmount(transactionToEdit.amount);
        setCategory({ ...category, key: transactionToEdit.category });
        setTransactionType(transactionToEdit.transactionType);
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                {
                    !!transactionToEdit &&
                    <Form>
                        <Fields>
                            <Input
                                value={name}
                                onChangeText={setName}
                                placeholder="Nome"
                                placeholderTextColor='lightgray'
                            />
                            <Input
                                value={amount}
                                onChangeText={setAmount}
                                placeholder="Preço"
                                placeholderTextColor='lightgray'
                            />

                            <TransactionsTypes>
                                <TransactionTypeButton
                                    title="Income"
                                    type="up"
                                    isActive={transactionToEdit.transactionType === 'up'}
                                    onPress={() => handleTransactionTypeSelect('up')}
                                />
                                <TransactionTypeButton
                                    title="Outcome"
                                    type="down"
                                    isActive={transactionToEdit.transactionType === 'down'}
                                    onPress={() => handleTransactionTypeSelect('down')}
                                />
                            </TransactionsTypes>

                            <CategorySelectButton title={transactionToEdit.category} onPress={handleOpenSelectCategory} />
                        </Fields>

                        <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
                    </Form>
                }

                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategory}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}
