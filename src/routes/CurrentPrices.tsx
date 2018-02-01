import * as React from 'react';
import { Grid, Card } from 'semantic-ui-react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addExchange, addCurrencyPair, fetchExchangeData } from '../actions';
import { store } from '../';


import Ticker, { ITickerData } from '../components/Ticker';
import { IPriceData, IExchange } from '../reducers';

import './styles/CurrentPrices.scss';

interface ICurrentPricesProps {
    addCurrencyPair: Function;
    addExchange: Function;
    // From redux state
    exchanges: IExchange[];
    tickers: any;
}

class CurrentPrices extends React.Component<ICurrentPricesProps, {}> {

    public exchanges: IExchange[];
    public currencyPairs: string[];

    constructor(props) {
        super(props);
        this.state = {};
        this.exchanges = [
          {
            appUrl: 'https://gate.io/',
            name: 'gate',
            apiUrl: 'http://data.gate.io/api2/1/tickers'
          },
          {
            appUrl: 'https://hitbtc.com/',
            name: 'hitbtc',
            apiUrl: 'https://api.hitbtc.com/api/2/public/ticker'
          },
          {
            appUrl: 'https://exmo.com/',
            name: 'exmo',
            apiUrl: 'https://api.exmo.com/v1/ticker/'
          }
        ];

        this.currencyPairs = ['ltc-btc', 'xmr-btc', 'doge-btc'];
    }

    componentWillMount() {
        this.currencyPairs.forEach(pair => {
            this.props.addCurrencyPair(pair);
        });

        this.exchanges.forEach(exchange => {
            this.props.addExchange(exchange);
        });
    }

    componentWillReceiveProps(nextProps: ICurrentPricesProps) {
        if (nextProps.exchanges && nextProps.exchanges.length && nextProps.exchanges !== this.props.exchanges) {
            nextProps.exchanges.forEach(exchange => {
                store.dispatch(fetchExchangeData(exchange));
            });
        }

        console.log(nextProps);
    }

    @autobind
    onUpdatePrices(pair: string, data: ITickerData, timestamp: number) {
        console.log(pair, data, timestamp);
        console.log('-------------------------------------------------------------------------');
        // Make some call to the redux store to add the new ticker data
    }

    render() {
        const tickers = this.currencyPairs.map((pair, idx, pairs) => {
            return <Ticker key={pair} interval={60000 * (idx+1)} currencyPair={pair} onChange={this.onUpdatePrices}/>;
        });

        return (
            <div className="CurrentPrices">
                <Grid stackable={true}>
                    <Grid.Row columns={16}>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tickers: state.app.tickers,
        exchanges: state.app.exchanges,
        currencyPairs: state.app.currencyPairs
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addExchange: bindActionCreators(addExchange, dispatch),
        addCurrencyPair: bindActionCreators(addCurrencyPair, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPrices);
