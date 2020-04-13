import React from 'react';
import PersonalDetailsForm from './PersonalDetailsForm';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';
import './index.scss';
import {connect} from "react-redux";
import Loader from '../../Loader';
import {Alert} from "react-bootstrap";

class EditForm extends React.Component {
    state = {
        showModal: true
    };

    render() {
        return (
            <>
                <div className="account-edit">
                    { this.props.login.loading ? <Loader/> : '' }
                    <PersonalDetailsForm />
                    <EmailForm />
                    <PasswordForm />
                </div>
                <Alert
                    show={this.props.login.error === true && this.state.showModal}
                    onClose={() => this.setState({showModal: false})}
                    variant="danger"
                    dismissible
                >
                    { this.props.login.errorMessage ? this.props.login.errorMessage : 'Something went wrong' }
                </Alert>
            </>
        );
    }
}

const mapStateToProps = state => ({
    login: state.login
});

export default connect(mapStateToProps)(EditForm);