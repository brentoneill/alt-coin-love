import axios from 'axios';

import { IAction, ADD_CURRENCY_PAIR, ADD_EXCHANGE, ADD_EXCHANGE_DATA_TO_TICKER } from '../actions';

export interface ITickerState {
    currentPrice?: number;
    currentVolume?: number;
    prices?: IPriceData[];
    pair?: string;
};

export interface IPriceData {
    timestamp: number | string;
    volume: number;
    price: number;
    pair: string;
    exchange: IExchange
};

export interface IAppState {
    tickers?: ITickerState[];
    exchanges?: IExchange[];
    currencyPairs?: string[];
}

export interface IExchange {
    name: string;
    apiUrl: string;
    appUrl: string;
}

const INITIAL_STATE = {
    tickers: [],
    currencyPairs: [],
    exchanges: []
};

// Single function for actual reducer w/ a swtich statement to catch different
// actions coming through the reducer. Each switch statement returns a new state
export default function(state = INITIAL_STATE as IAppState, action: IAction) {
    switch (action.type) {
        case ADD_EXCHANGE:
            const exchanges = state.exchanges.concat(action.payload);
            return {...state, exchanges}

        case ADD_CURRENCY_PAIR:
            const currencyPairs = state.currencyPairs.concat(action.payload);
            const tickers = state.tickers.concat({
                pair: action.payload,
                currentPrice: null,
                currentVolume: null,
                prices: []
            });

            return {...state, currencyPairs, tickers}

        case ADD_EXCHANGE_DATA_TO_TICKER:
            let tickerToUpdate = state.tickers.find(ticker => ticker.pair === action.payload.pair);
            tickerToUpdate.prices.unshift(action.payload);
            tickerToUpdate.currentPrice = action.payload.price;
            tickerToUpdate.currentVolume = action.payload.volume;

            let updatedTickers = state.tickers.filter(ticker => ticker.pair !== action.payload.pair);
            updatedTickers.push(tickerToUpdate);

            return {...state, tickers: updatedTickers};

        default:
            return state;
    }
}
