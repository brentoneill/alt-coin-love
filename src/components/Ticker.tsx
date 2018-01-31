import * as React from 'react';
import axios from 'axios';
import autobind from 'autobind-decorator';
import 'cryptocoins-icons/webfont/cryptocoins.css';

interface ITickerProps {
  currencyPair: string;
  interval: number;
  onChange?: (currencyPair: string, tickerData: ITickerData, timestamp: number) => void;
}

interface ITickerState {
  increasing?: boolean;
  priceToBtc?: number;
  volume?: number;
  change?: number | string;
}

export interface ITickerAPIResponseData {
  error?: string;
  success: boolean;
  ticker: ITickerData;
  timestamp: number;
}

export interface ITickerData {
  base: string;   // XMR, DOGE, LTC, etc
  target: string; // BTC
  price: string;
  change: string;
  volume: string;
}

export default class Ticker extends React.Component<ITickerProps, ITickerState> {

    private baseUrl: string = `https://api.cryptonator.com/api/ticker/`;

    public apiUrl: string;
    public pollInterval: any;

    constructor(props: ITickerProps) {
      super(props);
      this.state = {
        increasing: false,
        priceToBtc: null,
        volume: null,
        change: null
      };

      this.apiUrl = `${this.baseUrl}${props.currencyPair}`
    }

    componentWillMount() {
        this.updatePrice();
        this.setupPoll();
    }

    componentWillUnmount() {
      this.clearPoll();
    }

    @autobind
    updatePrice() {
      axios.get(this.apiUrl)
        .then((res: any) => {
          if (res.status == 200) {
            const { change, price, volume } = res.data.ticker;
            console.log(price)
            this.setState({
                increasing: parseInt(change) > 0 ? true : false,
                priceToBtc: price,
                change: parseInt(change),
                volume: parseInt(volume)
            });
            this.props.onChange(this.props.currencyPair, res.data, res.timestamp);
          }
        }, err => {
          console.error(err);
        })
    }

    @autobind
    setupPoll() {
      const { interval } = this.props;

      this.pollInterval = setInterval(() => {
        this.updatePrice();
      }, interval);
    }

    @autobind
    clearPoll() {
      this.pollInterval();
    }

    render(): JSX.Element {
        const { currencyPair } = this.props;
        const { increasing, priceToBtc } = this.state;

        const coin = currencyPair.split('-')[0].toUpperCase();

        return (
            <div className="Ticker Ticker--`${currencyPair} Ticker--`${increasing}">
                <h2>Ticker for { currencyPair } <i className={`cc ${coin}`}></i></h2>
                <h3>{ priceToBtc }</h3>
            </div>
        );
    }
}
