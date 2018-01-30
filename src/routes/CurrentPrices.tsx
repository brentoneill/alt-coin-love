import * as React from 'react';
import { Grid, Card } from 'semantic-ui-react';
import axios from 'axios';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './styles/CurrentPrices.scss';

interface ICurrentPricesProps {
//     // redux actions
//     updateBTC: Function;
//     updateETH: Function;
//     updateXRP: Function;
//     addAddress: Function;
//     addTransactions: Function;
//     // data
//     transactions: any[];
//     addresses: any[];
//     btcToUSD: number;
//     btcUpdatedAt: number | string;
// }

class CurrentPrices extends React.Component<ICurrentPricesProps, {}> {

    public socket;

    constructor(props: ICurrentPricesProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps: ICurrentPricesProps) {

    }

    render() {
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
