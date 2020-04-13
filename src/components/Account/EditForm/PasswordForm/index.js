import React from 'react';
import {Alert, Form} from "react-bootstrap";
import { Formik } from "formik";
import { connect } from "react-redux";
import PasswordSchema from './PasswordSchema';
import { updatePassword } from "../../../../containers/auth/login/logic/authActions";
import { bindActionCreators } from "redux";
import PasswordField from "../../../AuthForm/PasswordField";

class EmailForm extends React.Component {
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
                    oldPassword: '',
                    newPassword: '',
                    newRetypedPassword: '',
                }}
                validationSchema={PasswordSchema}
                onSubmit={(values, { setSubmitting }) => {
                    this.props.updatePassword(values);
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
                                Password
                            </div>
                            {
                                this.state.editing
                                ? <div><button className="account-edit__form-save cancel" type="button" onClick={()=>{this.setState({editing: !this.state.editing})}}>Cancel</button>
                                  <button className="account-edit__form-save" type="submit" disabled={isSubmitting || this.props.login.loading}>Save</button></div>
                                : <button
                                        className="account-edit__form-change"
                                        onClick={this.handleChangeClick}
                                    >Change</button>
                            }
                        </div>
                        <PasswordField
                            name="oldPassword"
                            value={this.state.editing ? values.oldPassword : '·······'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={errors.oldPassword && touched.oldPassword}
                            errors={errors.oldPassword}
                            disabled={!this.state.editing || this.props.login.loading}
                            placeholder="Enter your current password"
                            togglable={false}
                        />
                        {
                            this.state.editing
                            ?
                                <>
                                    <PasswordField
                                        name="newPassword"
                                        value={values.newPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={errors.newPassword && touched.newPassword}
                                        errors={errors.newPassword}
                                        disabled={!this.state.editing || this.props.login.loading}
                                        placeholder="Enter your new password"
                                        togglable={false}
                                    />
                                    <PasswordField
                                        placeholder="Re-enter new your password"
                                        name="newRetypedPassword"
                                        value={values.newRetypedPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={errors.newRetypedPassword && touched.newRetypedPassword}
                                        errors={errors.newRetypedPassword}
                                        disabled={!this.state.editing || this.props.login.loading}
                                        togglable={false}
                                    />
                                </>
                            : ''
                        }
                        <Alert
                            show={this.props.login.success === true && this.state.showAlert}
                            onClose={() => this.setState({showAlert: false})}
                            variant="success"
                            dismissible
                        >
                            Password updated.
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
    updatePassword: bindActionCreators(updatePassword, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailForm);