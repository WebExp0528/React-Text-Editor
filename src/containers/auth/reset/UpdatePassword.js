import React from 'react';
import AuthTemplate from '../AuthTemplate';
import Logo from "../../../components/Logo";
import UpdatePasswordForm from '../../../components/AuthForm/UpdatePasswordForm';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import { resetPassword } from "../login/logic/authActions";
import {connect} from "react-redux";

class ResetPassword extends React.Component {
    render() {
        return (
            <AuthTemplate>
                <div className="auth-block">
                    <Logo full={true} className={'registration--logo'}/>
                    <UpdatePasswordForm {...this.props} token={this.props.match.params.token} />
                </div>
            </AuthTemplate>
        )
    }
}

ResetPassword.propTypes = {
    loginRequest: PropTypes.func,
    login: PropTypes.shape({
        LoggedIn: PropTypes.bool,
        error: PropTypes.bool
    })
};
ResetPassword.defaultProps = {
    login: {
        LoggedIn: false,
        error: false
    }
};

const mapStateToProps = state => ({
    login: state.login
});

const mapDispatchToProps = dispatch => ({
    resetPassword: bindActionCreators(resetPassword, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
