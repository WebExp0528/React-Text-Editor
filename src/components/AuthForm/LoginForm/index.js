import React, {Component} from 'react';
import {Button, Form, Alert} from "react-bootstrap";
import PasswordField from '../PasswordField';
import EmailField from '../EmailField';
import Footnote from '../Footnote';
import {Formik} from "formik";
import LoginSchema from './LoginSchema';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export default class LoginForm extends Component {
    state = {
        showModal: false
    };

    render() {
        const {login} = this.props;
        const {error, LoggedIn} = login;

        if (LoggedIn)
            this.props.history.push(`/`);

        return (
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={LoginSchema}
                onSubmit={(values, {setSubmitting}) => {
                    const {loginRequest} = this.props;
                    loginRequest(values);
                    setSubmitting(false);
                    this.setState({showModal: true})
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting
                  }) => (
                    <Form
                        noValidate
                        onSubmit={handleSubmit}
                        className="auth-form">
                        <Alert
                            show={!!(error && this.state.showModal)}
                            onClose={() => this.setState({showModal: false})}
                            variant="danger"
                            dismissible
                        >
                            Invalid login or password
                        </Alert>
                        <EmailField
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            isInvalid={errors.email && touched.email}
                            errors={errors.email}
                        />
                        <PasswordField
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            isInvalid={errors.password && touched.password}
                            errors={errors.password}
                            togglable={false}
                        />
                        <Button
                            type="submit"
                            variant="success"
                            className="auth-form__submit"
                            disabled={isSubmitting}
                        >Log In</Button>
                        <Footnote className="auth-form__forgot">
                            <Link to={'/reset'} className="auth-form__forgot-link">
                                Forgot your password?
                            </Link>
                        </Footnote>
                    </Form>
                )}
            </Formik>
        );
    }
};

LoginForm.propTypes = {
    loginRequest: PropTypes.func,
    login: PropTypes.shape({
        LoggedIn: PropTypes.bool,
        error: PropTypes.bool,
        loading: PropTypes.bool,
    })
}
LoginForm.defaultProps = {
    login: {
        LoggedIn: false,
        error: false,
        loading: false
    }
}