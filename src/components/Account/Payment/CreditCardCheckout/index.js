import React, { useState } from 'react';
import './index.scss';
import {Col, Row, Form, Alert} from "react-bootstrap";
import NumberField from "./Form/NumberField";
import DateField from "./Form/DateField";
import CVCField from "./Form/CVCField";
import { CardNumberElement, CardCVCElement, CardExpiryElement, injectStripe as withStripe } from "react-stripe-elements";
import { connect } from "react-redux";
import { checkoutCard } from "../../../../containers/account/payment/logic/paymentActions";
import { bindActionCreators } from "redux";
import Loader from "../../../Loader";

const CreditCardCheckout = props => {
  const [ open, setOpen ] = useState(true);
  const [ openSuccess, setOpenSuccess ] = useState(true);
  const [ submitting, setSubmitting ] = useState(false);
  const [ error, setError ] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    setError(false);
    setSubmitting(true);

    props.stripe.createToken({
      type: 'card'
    })
      .then(token => {
        props.checkoutCard({
          id: props.user.paymentData.id,
          stripeToken: token.token.id,
          newPlan: '/api/plans/' + props.selectedPlan.id
        });
      })
      .catch(err => {
        setError(true);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
        <Form
          noValidate
          onSubmit={handleSubmit}
          className="credit-card-checkout"
        >
          <NumberField
            as={CardNumberElement}
          />
          <Row>
            <Col xs={6}>
              <DateField
                as={CardExpiryElement}/>
            </Col>
            <Col xs={6}>
              <CVCField
                as={CardCVCElement}/>
            </Col>
          </Row>
          <p className="credit-card-checkout__desc">We do not store credit card details. All payments are done through secure payment gateway <a href="https://stripe.com/docs/security/stripe">Stripe</a>.</p>
          <button
            type="submit"
            className="btn btn-success credit-card-checkout__btn"
            disabled={submitting || props.payment.loading}
          >
            Checkout
          </button>
          <Alert
            show={(error || props.payment.error) && open}
            onClose={() => setOpen(false)}
            variant="danger"
            dismissible
          >
            An error occurred
          </Alert>
          <Alert
            show={props.payment.success && openSuccess}
            onClose={() => setOpenSuccess(false)}
            variant="success"
            dismissible
          >
            Payment done. Welcome to Shosho Fam!
          </Alert>
          { (props.payment.loading || submitting) && <Loader />}
        </Form>
  );
};

const mapStateToProps = state => ({
  payment: state.payment,
  user: state.login.user
});

const mapDispatchToProps = dispatch => ({
  checkoutCard: bindActionCreators(checkoutCard, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStripe(CreditCardCheckout));
