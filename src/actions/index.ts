import axios from 'axios';
import { IPriceData, IExchange } from '../reducers';

export interface IAction {
    type: string;
    payload?: any;
    error?: any;
    meta?: any;
}

export const ADD_CURRENCY_PAIR = 'ADD_CURRENCY_PAIR';
export const ADD_EXCHANGE = 'ADD_EXCHANGE';
export const ADD_EXCHANGE_DATA_TO_TICKER = 'ADD_EXCHANGE_DATA_TO_TICKER';

export function addCurrencyPair(pair: string): IAction {
    return {
        type: ADD_CURRENCY_PAIR,
        payload: pair
    };
}

export function addExchange(exchange: IExchange): IAction {
    return {
        type: ADD_EXCHANGE,
        payload: exchange
    };
}

export function addExchangeDataToTicker(data): IAction {
    return {
        type: ADD_EXCHANGE_DATA_TO_TICKER,
        payload: data
    };
}

export function fetchExchangeData(exchange: IExchange) {
    return (dispatch, getState) => {
        axios.get(exchange.apiUrl).then(res => {
            const transformedData = transformExchangeData(getState().app.currencyPairs, exchange, res.data);
            transformedData.tickers.forEach(ticker => {
                ticker.exchange = exchange;
                dispatch(addExchangeDataToTicker(ticker));
            });
        });
    }
}

// Utility functions
function transformExchangeData(currencyPairs: string[], exchange: IExchange, data: any): any {
    let tickers;

    switch(exchange.name) {
        case 'gate':
            tickers = currencyPairs.map(pair => {
                const transformedPair = pair.split('-')[0] + '_btc';
                return {
                    timestamp: new Date(),
                    pair: pair,
                    price: parseFloat(data[transformedPair].last),
                    volume: data[transformedPair].baseVolume
                };
            });

            break;

        case 'hitbtc':
            tickers = currencyPairs.map(pair => {
                const transformedPair = pair.split('-').splice(0,1).join('').toUpperCase() + 'BTC';
                const priceData = data.find(p => {
                    return p.symbol === transformedPair;
                });

                return {
                    timestamp: new Date(),
                    pair: pair,
                    price: parseFloat(priceData.last),
                    volume: priceData.volumeQuote
                };
            });

            break;

        case 'exmo':
            tickers = currencyPairs.map(pair => {
                const transformedPair = pair.split('-')[0].toUpperCase() + '_BTC';
                return {
                    timestamp: new Date(),
                    pair: pair,
                    price: parseFloat(data[transformedPair].last_trade),
                    volume: data[transformedPair].vol
                };
            });

            break;

        default:
            tickers = data;
            break;

    }

    return { exchange, tickers };
}
