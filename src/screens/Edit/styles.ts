import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(111)}px;

    justify-content: flex-end;
    align-items: center;

    padding-bottom: 19px;

    background-color: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${({ theme }) => theme.colors.shape};
`;

export const Form = styled.View`
    flex: 1;
    width: 100%;

    justify-content: space-between;

    padding: 24px;
`;

export const Fields = styled.View``;

export const TransactionsTypes = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 16px;
`;

export const EditButton = styled(BorderlessButton)`
    position: absolute;
    top: ${RFValue(15)}px;
    left: ${RFValue(15)}px;

`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.text};
`;
