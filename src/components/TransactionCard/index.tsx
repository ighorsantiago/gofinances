import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { TransactionsStorageDTO } from '../../storage/TransactionsStorageDTO';
import { categories } from '../../utils/categories';

import {
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
    RemoveButton,
    EditButton,
} from './styles';

type Props = TouchableOpacityProps & {
    data: TransactionsStorageDTO;
    onPress: () => void;
}

export function TransactionCard({ data, onPress }: Props) {

    const [category] = categories.filter(
        item => item.key === data.category
    );

    return (
        
        <Container>
            <Title>
                {data.name}
            </Title>
            <Amount type={data.transactionType}>
                {data.transactionType === 'down' && '- '}
                {data.amount}
            </Amount>

            <RemoveButton onPress={onPress}>
                <Icon name="trash-2" />
            </RemoveButton>
            
            {/* <EditButton>
                <Icon name="edit" />
            </EditButton> */}

            <Footer>
                <Category>
                    <Icon name={category.icon} />
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                <Date>{String(data.date)}</Date>
            </Footer>
        </Container>
    );
}