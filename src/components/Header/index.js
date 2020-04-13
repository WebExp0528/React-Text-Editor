import React from 'react';
import Logo from '../Logo';
import Container from '../Container';
import './index.scss';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import Search from '../Search';
import DropdownMenu from "../DropdownMenu";
import DropdownMenuItem from "../DropdownMenu/DropdownMenuItem";
import { bindActionCreators } from "redux";
import { logout } from "../../containers/auth/login/logic/authActions";

const Header = props => (
    <header className="header">
        <Container>
            <div className="header__content">
                <Logo />
                <div className="header-sa-wrap">
                    <Search/>
                    <div className="account-link__wrap">
                        <DropdownMenu icon={<span className="account-link">{props.login.user !== null ? props.login.user.firstName[0].toUpperCase() : ''}</span>}>
                            <DropdownMenuItem><Link to="/account">Account</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link to="/account/payment">Payment</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link to="/account/referral">Referral</Link></DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                                props.logout();
                                props.history.push('/login');
                            }}>Sign Out</DropdownMenuItem>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </Container>
    </header>
);

const mapStateToProps = state => ({
    login: state.login
});

const mapDispatchToProps = dispatch => ({
    logout: bindActionCreators(logout, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

