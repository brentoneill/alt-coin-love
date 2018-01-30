import * as React from 'react';
import Header from './Header';
import Footer from './Footer';

import './styles/Layout.scss';

interface ILayoutProps {}
interface ILayoutState {}

class Layout extends React.Component<ILayoutProps, ILayoutState> {

    render(): JSX.Element {

        return (
            <div className="Layout">
                <div className="Layout__content">
                    <Header className={'Layout__header'} />
                    <div className="Layout__body">
                        {this.props.children}
                    </div>
                    <Footer className={'Layout__footer'} />
                </div>
            </div>
        );
    }
}

export default Layout;
