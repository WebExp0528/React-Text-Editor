import React from 'react';
import {Alert, Button, Form} from "react-bootstrap";
import {Formik} from "formik";
import UpdatePasswordSchema from "./UpdatePasswordSchema";
import PasswordField from "../PasswordField";
import {Redirect} from 'react-router-dom';
import Loader from '../../Loader';

export default class UpdatePasswordForm extends React.Component {
    state = {
        showModal: false
    };

    render() {
        if (this.props.login.user !== null)
            this.props.history.push(`/`);

        return (
            <Formik
                initialValues={{newPassword: '', newRetypedPassword: ''}}
                validationSchema={UpdatePasswordSchema}
                onSubmit={(values, {setSubmitting}) => {
                    this.props.resetPassword({...values, token: this.props.token});
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
                    <>
                        <Alert show={!!(this.props.login.error && this.state.showModal)}
                               onClose={() => this.setState({showModal: false})}
                               variant="danger"
                               dismissible
                        >
                            An error occurred! Please, try again!
                        </Alert>
                        <Form
                            noValidate
                            onSubmit={handleSubmit}
                            className="auth-form">
                            {
                                this.state.success
                                    ? <Redirect push to="/" />
                                    : ''
                            }
                            <PasswordField
                                className="form-control auth-form__input auth-form__input--registration"
                                value={values.newPassword}
                                name="newPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={errors.newPassword && touched.newPassword}
                                errors={errors.newPassword}
                            />
                            <PasswordField
                                className="form-control auth-form__input auth-form__input--registration"
                                placeholder="Re-enter your password" name="newRetypedPassword"
                                value={values.newRetypedPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={errors.newRetypedPassword && touched.newRetypedPassword}
                                errors={errors.newRetypedPassword}
                            />
                            <Button
                                type="submit"
                                variant="success"
                                className="auth-form__submit"
                                disabled={isSubmitting}
                            >Update Password</Button>
                        </Form>
                        { this.props.login.loading ? <Loader/> : ''}
                    </>
                )}
            </Formik>
        )
    }
}
