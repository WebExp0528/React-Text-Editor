import React, {Component} from 'react';
import {Alert, Button, Form} from "react-bootstrap";
import PasswordField from '../PasswordField';
import EmailField from '../EmailField';
import FullNameField from '../FullNameField';
import InputBlock from '../InputBlock';
import Footnote from '../Footnote';
import AuthService from "../../../services/api/AuthService";
import {Formik} from "formik";
import RegistrationSchema from './RegistrationSchema';
// import Success from "../Alert/Success";
import Loader from "../../Loader";
import "./index.scss"

export default class RegistrationForm extends Component {
    state = {
        error: false,
        errorMessage: 'An error occurred. Please, try again.',
        success: false,
        showModal: true,
        loading: false,
        isCheck: false
    };

    onCheckTerms = () =>{
        let isCheck = !this.state.isCheck
        this.setState({isCheck: isCheck})
    }

    authService = null;

    constructor(props) {
        super(props);

        this.authService = new AuthService();        
    }

    render() {
        return (
            this.state.success
                ? window.location.href = "/emailconfirm"
                : <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        retypedPassword: ''
                    }}
                    validationSchema={RegistrationSchema}
                    onSubmit={(values, {setSubmitting}) => {
                        this.setState({
                            success: false,
                            error: false,
                            loading: true
                        });

                        this.authService.register(values)
                            .then(() => {
                                this.setState({
                                    success: true,
                                    error: false
                                });
                            })
                            .catch(err => {
                                if (typeof err.response !== 'undefined' && err.response.status === 400 && typeof err.response.data.violations !== 'undefined') {
                                    let violations = err.response.data.violations;

                                    violations = violations.filter(item => item.propertyPath === 'email');

                                    if (violations.length) {
                                        this.setState({errorMessage: violations[0].message});
                                    }
                                }

                                this.setState({error: true})
                            })
                            .finally(() => {
                                setSubmitting(false);
                                this.setState({loading: false})
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
                        <>
                            <Alert
                                show={this.state.error && this.state.showModal}
                                onClose={() => this.setState({showModal: false})}
                                variant="danger"
                                dismissible
                            >
                                {this.state.errorMessage}
                            </Alert>
                            <Form
                                noValidate
                                onSubmit={handleSubmit}
                                className="auth-form">
                                <InputBlock>
                                    <FullNameField
                                        firstName={{
                                            className: 'form-control auth-form__input auth-form__input--registration',
                                            value: values.firstName,
                                            onChange: handleChange,
                                            onBlur: handleBlur,
                                            isInvalid: errors.firstName && touched.firstName,
                                            errors: errors.firstName
                                        }}
                                        lastName={{
                                            className: 'form-control auth-form__input auth-form__input--registration',
                                            value: values.lastName,
                                            onChange: handleChange,
                                            onBlur: handleBlur,
                                            isInvalid: errors.lastName && touched.lastName,
                                            errors: errors.lastName
                                        }}
                                    />
                                </InputBlock>
                                <EmailField
                                    groupclasscame="form-group auth-form__input-wrap auth-form__input-wrap--registration"
                                    className="form-control auth-form__input auth-form__input--registration"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={errors.email && touched.email}
                                    errors={errors.email}
                                />
                                <InputBlock>
                                    <PasswordField
                                        className="form-control auth-form__input auth-form__input--registration"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={errors.password && touched.password}
                                        errors={errors.password}
                                    />
                                    <PasswordField
                                        className="form-control auth-form__input auth-form__input--registration"
                                        placeholder="Re-enter your password" name="retypedPassword"
                                        value={values.retypedPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={errors.retypedPassword && touched.retypedPassword}
                                        errors={errors.retypedPassword}
                                    />
                                </InputBlock>
                                <div className="t_p">
                                    <input type="checkbox" className="tp_checkbox" onClick={this.onCheckTerms}/> 
                                    &nbsp;I agree with 
                                    &nbsp;<a className="termsprivacey" href="https://shosho.co/terms.html">Terms of Service</a> & 
                                    &nbsp;<a className="termsprivacey" href="https://shosho.co/privacypolicy.html">Privacy</a>
                                </div>
                                <Button
                                    type="submit"
                                    variant="success"
                                    className="auth-form__submit"
                                    disabled={!this.state.isCheck || isSubmitting}
                                >Sign Up</Button>
                                <Footnote>
                                    <strong>Note:</strong> we respect your privacy. Your data is not shared with or sold to
                                    any third
                                    party. That’s why we don’t allow any “social media” login or sign up.
                                </Footnote>
                            </Form>
                            { this.state.loading ? <Loader/> : ''}
                        </>
                    )}
                </Formik>
        )
    }
}

