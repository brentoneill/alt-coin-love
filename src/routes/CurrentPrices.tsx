import * as React from 'react';
import { Grid, Card } from 'semantic-ui-react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Ticker, { ITickerData } from '../components/Ticker';
import './styles/CurrentPrices.scss';

interface ICurrentPricesProps {}
class CurrentPrices extends React.Component<ICurrentPricesProps, {}> {

    private currencyPairs: string[];

    constructor(props: ICurrentPricesProps) {
        super(props);
        this.state = {};
        this.currencyPairs = [ 'xmr-btc', 'ltc-btc', 'doge-btc' ];
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps: ICurrentPricesProps) {
        console.log(nextProps);
    }

    @autobind
    onUpdatePrices(pair: string, data: ITickerData, timestamp: number) {
        console.log(pair, data, new Date(timestamp));
        console.log('---------------------------------------');
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
                        {tickers}
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // transactions: state.dash.transactions,
        // addresses: state.dash.addresses,
        // btcToUSD: state.dash.btcToUSD,
        // btcUpdatedAt: state.dash.btcUpdatedAt
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // addAddress: bindActionCreators(addAddress, dispatch),
        // addTransactions: bindActionCreators(addTransactions, dispatch),
        // fetchAddress: bindActionCreators(fetchAddress, dispatch),
        // updateBTC: bindActionCreators(updateBTC, dispatch),
        // updateETH: bindActionCreators(updateETH, dispatch),
        // updateXRP: bindActionCreators(updateXRP, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPrices);
