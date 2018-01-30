import * as React from 'react';

interface ITickerProps {}
interface ITickerState {}

class Ticker extends React.Component<ITickerProps, ITickerState> {

    render(): JSX.Element {
        return (
            <div className="Ticker">
                Ticker
            </div>
        );
    }
}

export default Ticker;
