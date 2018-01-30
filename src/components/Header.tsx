import * as React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Modal, Icon, Input } from 'semantic-ui-react';

import './styles/Header.scss';

interface IProps {
    className?: string;
}

interface IState {

}

class Header extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    render() {
        const cssClasses = `Header ${this.props.className}`;

        return (
            <header className={cssClasses}>
                <h2 style={{ float: 'left' }}></h2>
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        // generateNewAddress: bindActionCreators(generateNewAddress, dispatch),
        // addAddress: bindActionCreators(addAddress, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
