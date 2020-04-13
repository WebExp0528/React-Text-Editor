import React from 'react';
import AuthService from "../../../services/api/AuthService";
import {Alert, Button, Form} from "react-bootstrap";
import {Formik} from "formik";
import EmailField from "../EmailField";
import RestorePasswordSchema from "./RestorePasswordSchema";
import Success from '../Alert/Success';
import {Link} from "react-router-dom";
import Footnote from "../Footnote";

export default class RestorePassword extends React.Component {
    state = {
        success: false,
        error: false,
        errorMessage: 'An error occurred! Please, try again!'
    };

    authService = null;

    constructor(props) {
        super(props);

        this.authService = new AuthService();
    }

    render() {
        return (
            this.state.success
                ? <Success>
                    <p>Email sent! Check your inbox for an email from us with a “Reset Password” link.</p>
                    <Footnote className="auth-form__forgot">
                        <Link className={"auth-form__forgot-link auth-form__forgot-link--success"} to={"/login"}>Back to Login Screen</Link>
                    </Footnote>
                </Success>
                :
                <Formik
                    initialValues={{email: ''}}
                    validationSchema={RestorePasswordSchema}
                    onSubmit={(values, {setSubmitting}) => {
                        this.authService.resetPassword(values.email)
                            .then(() => {
                                this.setState({success: true, error: false});
                            })
                            .catch(err => {
                                this.setState({error: true})
                            })
                            .finally(() => {
                                setSubmitting(false);
                            });
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
                            <div className="auth-form__title">Reset your account password</div>
                            {
                                this.state.error
                                    ?
                                    <Alert variant="danger">
                                        {this.state.errorMessage}
                                    </Alert>
                                    : ""
                            }
                            <EmailField
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                isInvalid={errors.email && touched.email}
                                errors={errors.email}
                                placeholder={"Your account email"}
                            />
                            <Button
                                type="submit"
                                variant="success"
                                className="auth-form__submit"
                                disabled={isSubmitting}
                            >Reset Password</Button>
                        </Form>
                    )}
                </Formik>
        )
    }
}