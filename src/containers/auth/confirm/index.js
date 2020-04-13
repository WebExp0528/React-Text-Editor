import React from 'react';
import AuthTemplate from '../AuthTemplate';
import Logo from "../../../components/Logo";
import UserConfirmation from '../../../components/AuthForm/UserConfirmation';
import PropTypes from "prop-types";
import {confirmAccount} from "../login/logic/authActions";
import {connect} from "react-redux";
import { bindActionCreators} from "redux";

class ConfirmUser extends React.Component {
  render() {
    return(
      <AuthTemplate>
        <div className="auth-block">
            <Logo full={true} className={'registration--logo'} />
          <UserConfirmation {...this.props} token={this.props.match.params.token} />
        </div>
      </AuthTemplate>
    )
  }
}

ConfirmUser.propTypes = {
    loginRequest: PropTypes.func,
    login: PropTypes.shape({
        LoggedIn: PropTypes.bool,
        error: PropTypes.bool
    })
};
ConfirmUser.defaultProps = {
    login: {
        LoggedIn: false,
        error: false
    }
};

const mapStateToProps = state => ({
    login: state.login
});

const mapDispatchToProps = dispatch => ({
    confirmAccount: bindActionCreators(confirmAccount, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmUser);
