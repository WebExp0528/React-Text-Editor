import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';

class Nav extends React.Component {
    state = {
        singleActive: /\/folders\/\d+/.test(this.props.location.pathname) || false,
        listener: null
    };

    componentDidMount() {
        this.setState({
            listener: this.props.history.listen(location => {
                            if (/\/folders\/\d+/.test(location.pathname)) {
                                this.setState({
                                    singleActive: true
                                });
                            } else {
                                this.setState({
                                    singleActive: false
                                });
                            }
                        })
        });
    }

    componentWillUnmount() {
        if (!this.state.listener) {
            return''
        }

        this.state.listener();
    }

    render() {
        return (
            <nav className="menu">
                <ul className="menu-list">
                    <li className="menu-list__item">
                        <NavLink exact to="/" className="menu-list__link" activeClassName="menu-list__link--active">All Stories</NavLink>
                    </li>
                    <li className="menu-list__item">
                        <NavLink exact to="/folders" className={`menu-list__link${this.state.singleActive && !this.props.folders.loading && this.props.folders.single ? ' menu-list__link--folder' : ''}`} activeClassName="menu-list__link--active">Folders</NavLink>
                    </li>
                    {
                        this.state.singleActive && !this.props.folders.loading && this.props.folders.single
                        ?   <li className="menu-list__item menu-list__item--folder-single">
                                <NavLink to={this.props.history.location} className="menu-list__link" activeClassName="menu-list__link--active">{this.props.folders.single.name}</NavLink>
                            </li>
                        : ''
                    }
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    folders: state.folders
});

export default withRouter(connect(mapStateToProps)(Nav));