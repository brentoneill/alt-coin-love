import axios from 'axios';

export interface IAction {
    type: string;
    payload?: any;
    error?: any;
    meta?: any;
}

export const ADD_TRANSACTION = 'ADD_TRANSACTION';

export function addTransactions(transactions): IAction {
    return {
        type: ADD_TRANSACTION,
        payload: transactions
    };
}
