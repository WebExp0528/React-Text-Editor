import React from 'react';
import EmailField from '../../../AuthForm/EmailField';
import {Alert, Form} from "react-bootstrap";
import { Formik } from "formik";
import { connect } from "react-redux";
import EmailSchema from './EmailSchema';
import { updateAccount } from "../../../../containers/auth/login/logic/authActions";
import { bindActionCreators } from "redux";

class EmailForm extends React.Component {
    state = {
        editing: false,
        showAlert: false
    };

    handleChangeClick = (e) => {
        e.preventDefault();

        this.setState({
            editing: true
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
                    email: this.props.login.user.email
                }}
                validationSchema={EmailSchema}
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
                                Email
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
                        <EmailField
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            isInvalid={errors.email && touched.email}
                            errors={errors.email}
                            disabled={!this.state.editing || this.props.login.loading}
                        />
                        <Alert
                            show={this.props.login.success === true && this.state.showAlert}
                            onClose={() => this.setState({showAlert: false})}
                            variant="success"
                            dismissible
                        >
                            Email updated.
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailForm);