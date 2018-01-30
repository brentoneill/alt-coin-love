import * as React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import { App, Layout, Base } from '../components';

import CurrentPrices from './CurrentPrices';
import HistoricPrices from './HistoricPrices';

export default (
    <Route component={App}>
        <Route component={Layout}>
            <Route path="/">
                <IndexRedirect to="/current" />
                <Route path="current" component={CurrentPrices} />
                <Route path="historic" component={HistoricPrices} />
            </Route>
        </Route>
    </Route>
);
