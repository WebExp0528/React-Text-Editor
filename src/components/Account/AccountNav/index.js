import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../Nav/index.scss';
import './index.scss';
import { withRouter } from 'react-router-dom';

class Nav extends React.Component {
    render() {
        return (
            <nav className="menu menu--fluid">
                <ul className="menu-list">
                    <li className="menu-list__item">
                        <NavLink exact to='/account' activeClassName="menu-list__link--active" className="menu-list__link">Account</NavLink>
                    </li>
                    <li className="menu-list__item">
                      <NavLink exact to='/account/payment' activeClassName="menu-list__link--active" className="menu-list__link">Payment</NavLink>
                    </li>
                    <li className="menu-list__item">
                      <NavLink exact to='/account/referral' activeClassName="menu-list__link--active" className="menu-list__link">Referral</NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default withRouter(Nav);
