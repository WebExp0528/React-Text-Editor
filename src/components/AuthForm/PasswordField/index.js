import React from 'react';
import { FormControl, FormGroup } from "react-bootstrap";
import toggleIcon from './img/toggleIcon.svg';
import './index.scss';

class PasswordField extends React.Component {
    state = {
        passVisible: false
    };

    render() {
        let { togglable, ...props } = this.props;

        return (
            <FormGroup className={this.props.groupClassName ? this.props.groupClassName : "form-group auth-form__input-wrap"}>
                <FormControl
                    type={this.state.passVisible ? "text" : "password"}
                    className={"form-control auth-form__input"}
                    placeholder={"Password"}
                    name={"password"}
                    {...props}
                />
                {
                    togglable
                    ?
                        <div
                            className="auth-form__input-passtoggle"
                            onClick={() => this.setState((prevState) => {
                                return {
                                    passVisible: !prevState.passVisible
                                }
                            })}
                        >
                            <img src={toggleIcon} alt="Toggle Visibility"/>
                        </div>
                    : ''
                }
                <FormControl.Feedback type="invalid">
                    {this.props.errors}
                </FormControl.Feedback>
            </FormGroup>
        );
    }
}

PasswordField.defaultProps = {
    togglable: true
};

export default PasswordField;