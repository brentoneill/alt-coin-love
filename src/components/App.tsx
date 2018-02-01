import * as React from 'react';

import './styles/main.scss';

interface IAppProps {}

interface IAppState {}

export default class App extends React.Component<IAppState, IAppProps> {
    render(): JSX.Element {
        return (
            <div className="App__container">
                {this.props.children}
            </div>
        );
    }
}
