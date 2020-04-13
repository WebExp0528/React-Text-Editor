import React from 'react';
import FullNameField from '../../../AuthForm/FullNameField';
import {Alert, Form} from "react-bootstrap";
import {Formik} from "formik";
import { connect } from "react-redux";
import PersonalDetailsSchema from './PersonalDetailsSchema';
import { updateAccount } from "../../../../containers/auth/login/logic/authActions";
import {bindActionCreators} from "redux";
// import { cancel } from '@redux-saga/core/effects';


class PersonalDetailsForm extends React.Component {
    state = {
        editing: false,
        showAlert: false
    };

    handleChangeClick = (e) => {
        e.preventDefault();

        this.setState({
            editing: true,
            showAlert: false
        });
    };

    componentDidUpdate(prevProps) {
        if ((this.props.login.success === false && prevProps.login.success === true)
            || (this.props.login.error === false && prevProps.login.error === true)
        ) {
            this.setState({ showAlert: false });
        }
    }

    render() {
        return (
            <Formik
                initialValues={{
                    id: this.props.login.user.id,
                    firstName: this.props.login.user.firstName,
                    lastName: this.props.login.user.lastName
                }}
                validationSchema={PersonalDetailsSchema}
                onSubmit={(values, { setSubmitting }) => {
                    this.props.updateAccount(values);
                    this.setState({
                        editing: false,
                        showAlert: true
                    });
                    setSubmitting(false);
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
                        className="account-edit__form"
                    >
                        <div className="account-edit__form-header">
                            <div className="account-edit__form-title">
                                Personal Details
                            </div>
                            {
                                this.state.editing
                                ?<div><button className="account-edit__form-save cancel" type="button" onClick={()=>{this.setState({editing: !this.state.editing})}}>Cancel</button>
                                 <button className="account-edit__form-save" type="submit" disabled={isSubmitting || this.props.login.loading}>Save</button></div>
                                : <button
                                        className="account-edit__form-change"
                                        onClick={this.handleChangeClick}
                                    >Change</button>
                            }
                        </div>
                        <FullNameField
                            firstName={{
                                className: 'form-control auth-form__input auth-form__input--registration',
                                value: values.firstName,
                                onChange: handleChange,
                                onBlur: handleBlur,
                                isInvalid: errors.firstName && touched.firstName,
                                errors: errors.firstName,
                                disabled: !this.state.editing
                            }}
                            lastName={{
                                className: 'form-control auth-form__input auth-form__input--registration',
                                value: values.lastName,
                                onChange: handleChange,
                                onBlur: handleBlur,
                                isInvalid: errors.lastName && touched.lastName,
                                errors: errors.lastName,
                                disabled: !this.state.editing || this.props.login.loading
                            }}
                        />
                        <Alert
                            show={this.props.login.success === true && this.state.showAlert}
                            onClose={() => this.setState({showAlert: false})}
                            variant="success"
                            dismissible
                        >
                            Personal details updated.
                        </Alert>
                    </Form>
                )}
            </Formik>
        );
    }
}

const mapStateToProps = state => ({
    login: state.login
});

const mapDispatchToProps = dispatch => ({
    updateAccount: bindActionCreators(updateAccount, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetailsForm);