import * as React from 'react';

interface IPriceListProps {}

interface IPriceListState {}

export default class PriceList extends React.Component<IPriceListProps, IPriceListState> {

    // Lifecycle method that fires right before rendered to DOM the FIRST time
    // Not called on subsequent re-renders
    componentWillMount() {

    }

    render() {
        return (
            <div className="PriceList">
               PriceList
            </div>
        );
    }
}
