import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import history from '../history.js';
import Login from '../containers/auth/login';
import Signup from '../containers/auth/signup';
import ConfirmUser from '../containers/auth/confirm';
import './index.scss';
import ResetPassword from "../containers/auth/reset";
import UpdatePassword from'../containers/auth/reset/UpdatePassword';
import {ConnectedRouter} from 'connected-react-router';
import { Provider } from 'react-redux';
import createStore from '../store/store';
import Main from "../containers/main";
import Invite from '../components/Account/Referral/Invite';
import Emailconfirm from '../components/AuthForm/Emailconfirm'

export const store = createStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/invite/:code" component={Invite} exact/>
                        <Route path="/login" component={Login} exact/>
                        <Route path="/signup" component={Signup} exact/>
                        <Route path="/reset" component={ResetPassword} exact/>
                        <Route path="/emailconfirm" component={Emailconfirm} exact/>
                        <Route
                            path="/reset/:token([A-Za-z0-9]{30})"
                            component={UpdatePassword}
                        />
                        <Route
                            path="/confirm/:token([A-Za-z0-9]{30})"
                            component={ConfirmUser}
                        />
                        <Route path="/" component={Main} />                        
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}


export default App;
