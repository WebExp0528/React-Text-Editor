import React, { useState } from 'react';
import {Formik} from "formik";
import './form.scss';
import schema from "./InviteSchema"
import {Alert, Button, Form} from "react-bootstrap";
import EmailField from "../../../AuthForm/EmailField";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import { createInvite } from "../../../../containers/account/referral/logic/referralActions";

const InviteForm = props => {
  const [ open, setOpen ] = useState(true);
  const [ openSuccess, setOpenSuccess ] = useState(true);

  return (
    <Formik
      initialValues={{email: ''}}
      validationSchema={schema}
      onSubmit={(values, {setSubmitting}) => {
        props.createInvite({
          targetEmail: values.email
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
          className="invite-form"
          inline
        >
          <Form.Row className="invite-form__row">
            <EmailField
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              isInvalid={errors.email && touched.email}
              errors={errors.email}
              placeholder="Email addresses"
            />
            <div
              className="invite-form__btn-wrap"
            >
              <Button
                type="submit"
                variant="success"
                className="invite-form__btn d-inline-block d-sm-none"
                disabled={isSubmitting || props.invite.loading }
              >Invite</Button>
              <Button
                type="submit"
                variant="success"
                className="invite-form__btn d-none d-sm-inline-block"
                disabled={isSubmitting || props.invite.loading }
              >Send Invite</Button>
            </div>
            <Alert
              show={props.invite.error && open}
              onClose={() => setOpen(false)}
              variant="danger"
              dismissible
            >
              {
                props.invite.errorMessage
                  ? props.invite.errorMessage
                  : 'An error occurred!'
              }
            </Alert>
            <Alert
              show={props.invite.success && openSuccess}
              onClose={() => setOpenSuccess(false)}
              variant="success"
              dismissible
            >
              Email sent. Thank you for supporting us!
            </Alert>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = state => ({
  invite: state.referral.invite
});

const mapDispatchToProps = dispatch => ({
  createInvite: bindActionCreators(createInvite, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteForm);
