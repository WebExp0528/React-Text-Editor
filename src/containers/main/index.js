import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import Main from '../../components/Main';
import Header from "../../components/Header";
import Container from "../../components/Container";
import Account from '../account';
import Payment from '../account/payment';
import ApiService from "../../services/api/ApiService";
import {bindActionCreators} from "redux";
import { logout, refreshUser } from '../../containers/auth/login/logic/authActions';
import Loader from '../../components/Loader';
import EditPage from "../EditPage";
import ReferralContainer from "../account/referral";

export class MainSection extends React.Component {
    componentDidMount() {
        const service = new ApiService();

        service.refreshToken()
          .then(data => {
            this.props.refreshUser(data.user);
          })
          .catch(() => {
              this.props.logout();
              this.props.history.push('/login');
          });
    }

    render() {
        return (
          this.props.login.user === null
          ? <Loader />
          :
            <>

                <Switch>
                    <Route
                      path="/stories/:id"
                      component={EditPage}
                      exact
                    />
                    <Route exact path="/account/payment" render={() => (
                      <>
                          <Header />
                          <Container>
                              <Payment />
                          </Container>
                      </>
                    )}/>
                    <Route exact path="/account/referral" render={() => (
                      <>
                          <Header />
                          <Container>
                              <ReferralContainer/>
                          </Container>
                      </>
                    )} />
                    <Route exact path="/account" render={() => (
                          <>
                              <Header />
                              <Container>
                                  <Account/>
                              </Container>
                          </>
                      )} />
                    <Route path="/" render={() => (
                      <>
                          <Header />
                          <Container>
                              <Main/>
                          </Container>
                      </>
                    )} />
                </Switch>
            </>
        );
    }
}

const mapStateToProps = state => ({
    login: state.login
});

const mapDispatchToProps = dispatch => ({
    logout: bindActionCreators(logout, dispatch),
    refreshUser: bindActionCreators(refreshUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainSection));
