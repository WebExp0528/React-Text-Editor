import React from 'react';
import { Alert } from "react-bootstrap";
import Loader from '../../Loader';

export default class UserConfirmation extends React.Component {
    state = {
        showModal: true
    };
    componentDidMount() {
        this.props.confirmAccount(this.props.token);
    }

    render() {
        if (this.props.login.user !== null)
            this.props.history.push(`/`);

        return (
            <div>
                <Alert show={this.props.login.error && this.state.showModal}
                       onClose={() => this.setState({showModal: false})}
                       variant="danger"
                       dismissible
                >
                    An error occurred! Please, try again!
                </Alert>
                {this.props.login.error ? '' :<Loader />}
            </div>
        )
    }
}
