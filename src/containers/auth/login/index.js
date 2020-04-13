import React from 'react';
import AuthTemplate from '../AuthTemplate';
import Logo from "../../../components/Logo";
import {Nav, TabContainer, TabContent, TabPane} from "react-bootstrap";
import LoginForm from '../../../components/AuthForm/LoginForm';
import RegistrationForm from '../../../components/AuthForm/RegistrationForm';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import loginRequest from './logic/authActions'

class Login extends React.Component {
  render() {
    return(
      <AuthTemplate>
        <div className="auth-block">
          <Logo full={true} className={'registration--logo'} />
          <TabContainer defaultActiveKey={"login"}>
            <Nav variant="pills" defaultActiveKey="login" className="nav nav-pills registration-pills">
              <Nav.Item className="nav-item registration-pills__item">
                <Nav.Link href="/login" eventKey={"login"} className="nav-link registration-pills__link">Log In</Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item registration-pills__item">
                <Nav.Link href="/signup" className="nav-link registration-pills__link" eventKey={"registration"}>Sign Up</Nav.Link>
              </Nav.Item>
            </Nav>
            <TabContent className="tab-content registration-tab-content" id="pills-tabContent">
              <TabPane eventKey={'login'} className="tab-pane fade registration-tab-pane">
                <LoginForm
                  {...this.props}
                />
              </TabPane>
              <TabPane eventKey={"registration"} className="tab-pane fade registration-tab-pane">
                <RegistrationForm/>
              </TabPane>
            </TabContent>
          </TabContainer>
        </div>
      </AuthTemplate>
    )
  }
}

Login.propTypes = {
  loginRequest: PropTypes.func,
  login: PropTypes.shape({
    LoggedIn: PropTypes.bool,
    error: PropTypes.bool
  })
}
Login.defaultProps = {
  login: {
    LoggedIn: false,
    error: false
  }
}

const mapStateToProps = state => ({
  login: state.login
})

const mapDispatchToProps = dispatch => ({
  loginRequest: bindActionCreators(loginRequest, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
