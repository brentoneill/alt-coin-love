import * as React from 'react';
import axios from 'axios';
import autobind from 'autobind-decorator';
import { Card, List, Button } from 'semantic-ui-react';

import 'cryptocoins-icons/webfont/cryptocoins.css';

interface ITickerProps {
  tickerData: any;
}

interface ITickerState {
  prices: any[];
}

export default class Ticker extends React.Component<ITickerProps, ITickerState> {

    constructor(props: ITickerProps) {
      super(props);

      this.state = {
        prices: props.tickerData.prices
      };
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps: ITickerProps) {
      if (nextProps && nextProps.tickerData && nextProps.tickerData.prices && nextProps.tickerData.prices.length !== this.state.prices.length) {
        this.setState({ prices: nextProps.tickerData.prices });
      }
    }

    renderExchangePriceListMarkup(recentPriceData): JSX.Element {
      if (recentPriceData && recentPriceData.length) {
        recentPriceData = recentPriceData.sort((a, b) => {
          if (a.price > b.price) {
            return -1;
          }

          if (b.price > a.price) {
            return 1;
          }

          if (b.price === a.price) {
            return 0;
          }
        });
        return recentPriceData.map((priceData, idx, arr) => {
          let bestDealIdx = 0;
          let showBestDealBadge = false;
          if (bestDealIdx === idx) {
            showBestDealBadge = true;
          }

          let bestDealBadgeMarkup = showBestDealBadge ? <Button basic color="green" onClick={ () => { window.open(priceData.exchange.appUrl)} }>Best Deal</Button> : null;

          return (
            <List.Item key={idx}>
              <List.Content verticalAlign="middle" floated='right'>
               <span className="Ticker__list-item-price">{priceData.price}/BTC</span>
               {bestDealBadgeMarkup}
              </List.Content>
              <List.Content verticalAlign="middle" >
                <a className="Ticker__list-item-title" href="priceData.exchange.appUrl" target="_blank">{priceData.exchange.name}</a>
              </List.Content>
            </List.Item>
          );
        });
      } else {
        return null;
      }
    }

    calculateWeightedPrice(recentPriceData): string {
      let weightedPrice = 0;

      recentPriceData.forEach(priceData => {
        weightedPrice += priceData.price;
      });


      return (weightedPrice / recentPriceData.length).toFixed(8);
    }

    calculateVolume(recentPriceData): number {
      let volume;

      recentPriceData.forEach(priceData => {
        volume = volume + parseFloat(priceData.volume);
      });

      return volume;
    }

    render(): JSX.Element {
        const { pair } = this.props.tickerData;
        const { prices } = this.state;
        const recentPriceData = prices.slice(0, 3);
        const currentPrice = this.calculateWeightedPrice(recentPriceData);
        const currentVolume = this.calculateVolume(recentPriceData);
        const exchangePriceListMarkup = this.renderExchangePriceListMarkup(recentPriceData)
        const coin = pair.split('-')[0].toUpperCase();

        return (
          <div className={`Ticker Ticker--${pair}`}>
            <Card>
              <Card.Content>
                <Card.Header>
                  <h2><i className={`cc ${coin}`}></i>&nbsp; { pair.toUpperCase() }</h2>
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
