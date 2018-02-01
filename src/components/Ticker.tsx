import * as React from 'react';
import axios from 'axios';
import autobind from 'autobind-decorator';
import { Card, Table, Button } from 'semantic-ui-react';

import 'cryptocoins-icons/webfont/cryptocoins.css';

interface ITickerProps {
  tickerData: any;
}

interface ITickerState {
  prices: any[];
}

export default class Ticker extends React.Component<ITickerProps, ITickerState> {

    private oldPriceData: any[];

    constructor(props: ITickerProps) {
      super(props);

      this.state = {
        prices: props.tickerData.prices
      };

      this.oldPriceData = [];
    }

    componentWillReceiveProps(nextProps: ITickerProps) {
      if (nextProps && nextProps.tickerData && nextProps.tickerData.prices && nextProps.tickerData.prices.length !== this.state.prices.length) {
        this.setState({ prices: nextProps.tickerData.prices });
      }
    }

    renderExchangePriceListMarkup(prices): JSX.Element {
      if (prices && prices.length) {
        let recentPriceData = prices;
        recentPriceData = recentPriceData.sort((a, b) => {
          if (a.price > b.price) {
            return 1;
          }

          if (b.price > a.price) {
            return -1;
          }

          if (b.price === a.price) {
            return 0;
          }
        });
        return recentPriceData.map((priceData, idx, arr) => {
          let bestDealIdx = 0;
          let worstDealIdx = 2;
          let showBestDealBadge = false;
          let showWorstDealBadge = false;
          if (bestDealIdx === idx) {
            showBestDealBadge = true;
          }
          if (worstDealIdx === idx) {
            showWorstDealBadge = true;
          }

          let bestDealBadgeMarkup = showBestDealBadge ? <Button basic color="green" onClick={ () => { window.open(priceData.exchange.appUrl)} }>Best Deal</Button> : null;
          let worstDealBadgeMarkup = showWorstDealBadge ? <Button basic color="red">Worst Deal</Button> : null;

          return (
            <Table.Row key={idx}>
              <Table.Cell>
                <p>{priceData.exchange.name.charAt(0).toUpperCase() + priceData.exchange.name.slice(1)}</p>
              </Table.Cell>
              <Table.Cell>
                <a className="Ticker__list-item-title" href="priceData.exchange.appUrl" target="_blank">{priceData.exchange.appUrl}</a>
              </Table.Cell>
              <Table.Cell>
                <span className="Ticker__list-item-price">{parseFloat(priceData.price).toFixed(8)}/BTC</span>
              </Table.Cell>
              <Table.Cell textAlign="right">
                {bestDealBadgeMarkup}
                {worstDealBadgeMarkup}
              </Table.Cell>
            </Table.Row>
          );
        });
      } else {
        return null;
      }
    }

    // NOTE: Currently just taking average due to volume inconsistencies
    calculateWeightedPrice(recentPriceData): string {
      let weightedPrice = 0;

      recentPriceData.forEach(priceData => {
        weightedPrice += priceData.price;
      });

      return (weightedPrice / recentPriceData.length).toFixed(8);
    }

    render(): JSX.Element {
        const { pair } = this.props.tickerData;
        const { prices } = this.state;
        const recentPriceData = [].concat(prices.slice(-3));
        const currentPrice = this.calculateWeightedPrice(recentPriceData);
        const exchangePriceListMarkup = this.renderExchangePriceListMarkup(recentPriceData)
        const coin = pair.split('-')[0].toUpperCase();

        return (
          <div className={`Ticker Ticker--${pair}`}>
            <Card raised>
              <Card.Content>
                <Card.Header>
                  <h2><i className={`cc ${coin}`}></i>&nbsp; { pair.toUpperCase() }</h2>
                </Card.Header>
                <Card.Description>
                  <h3>Price (BTC): { currentPrice }</h3>
                </Card.Description>
                <Card.Meta>
                  <span>Updated at { recentPriceData.length ? recentPriceData[0].timestamp.toLocaleTimeString("en-US") : 'n/a' }</span>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Table color={'green'} sortable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Exchange</Table.HeaderCell>
                      <Table.HeaderCell>URL</Table.HeaderCell>
                      <Table.HeaderCell>Price</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {exchangePriceListMarkup}
                  </Table.Body>
                </Table>
              </Card.Content>
            </Card>
          </div>
        );
    }
}
