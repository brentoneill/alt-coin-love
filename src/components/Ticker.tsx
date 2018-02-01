import * as React from 'react';
import axios from 'axios';
import autobind from 'autobind-decorator';
import { Card, List, Button } from 'semantic-ui-react';

import 'cryptocoins-icons/webfont/cryptocoins.css';

interface ITickerProps {
  tickerData: any;
}

interface ITickerState {}

export default class Ticker extends React.Component<ITickerProps, ITickerState> {

    constructor(props: ITickerProps) {
      super(props);

      this.state = {};
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    renderExchangePriceListMarkup(recentPriceData): JSX.Element {
      if (recentPriceData && recentPriceData.length) {
        return recentPriceData.map((priceData, idx) => {
          return (
            <List.Item key={idx}>
              <List.Content floated='right'>
               {priceData.price}
                <Button onClick={ () => { window.open(priceData.exchange.appUrl)} }>BEST</Button>
              </List.Content>
              <List.Content>
                {priceData.exchange.name}
              </List.Content>
            </List.Item>
          );
        });
      } else {
        return null;
      }
    }

    render(): JSX.Element {
        const { pair, currentPrice, currentVolume } = this.props.tickerData;
        const recentPriceData = this.props.tickerData.prices.length ? this.props.tickerData.prices.splice(0, 3) : [];
        const exchangePriceListMarkup = this.renderExchangePriceListMarkup(recentPriceData)
        const coin = pair.split('-')[0].toUpperCase();

        return (
          <div className={`Ticker Ticker--${pair}`}>
            <Card>
              <Card.Content>
                <Card.Header>
                  <h2>{ pair.toUpperCase() } <i className={`cc ${coin}`}></i></h2>
                </Card.Header>
                <Card.Meta>

                </Card.Meta>
                <Card.Description>
                  <h3>Price (BTC): { currentPrice }</h3>
                  <h5>Volume: { currentVolume }</h5>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
              <List divided verticalAlign='middle'>
                {exchangePriceListMarkup}
                </List>
              </Card.Content>
            </Card>
          </div>
        );
    }
}
