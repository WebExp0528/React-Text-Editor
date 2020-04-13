import React, { useState, useEffect } from 'react';
import '../index.scss';
import PaymentEditableSection from "../PaymentSection/PaymentEditableSection";
import PlansSection from "../PlansSection";
import {getUserPlan} from "../../../../services/user";
import {getPlanInfo} from "../../../../services/plans";
import PlanCard from "../PlanCard";
import PaymentSection from "../PaymentSection";
import {formatDate} from "../../../../services/date";
import ConfirmCancelSubscriptionModal from "../ConfirmCancelSubscriptionModal";
import { show, hide } from '../ConfirmCancelSubscriptionModal/logic/modalActions';
import { cancelSubscription, changePlan, changeSource } from "../../../../containers/account/payment/logic/paymentActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {Alert, Col, Row} from "react-bootstrap";
import NumberField from "../CreditCardCheckout/Form/NumberField";
import {CardCVCElement, CardExpiryElement, CardNumberElement, injectStripe as withStripe } from "react-stripe-elements";
import DateField from "../CreditCardCheckout/Form/DateField";
import CVCField from "../CreditCardCheckout/Form/CVCField";
import Loader from "../../../Loader";

const EditPlan = props => {
  const [ selectedPlan, setSelectedPlan ] = useState(null);
  const [ initialPlan, setInitialPlan ] = useState(null);
  const [ error, setError ] = useState(false);
  const [ open, setOpen ] = useState(true);
  const [ openSuccess, setOpenSuccess ] = useState(true);
  let {
    plans,
    user
  } = props;
  let changed = !!(initialPlan && selectedPlan && JSON.stringify(initialPlan) !== JSON.stringify(selectedPlan));
  let { price, period } = getPlanInfo(selectedPlan);

  useEffect(() => {
    let plan = getUserPlan(user);

    if (plan !== null) {
      setInitialPlan(plan);
      setSelectedPlan(plan);
    }
  }, [user.paymentData.plan]); //eslint-disable-line

  return (
    <div className="payment-wrap">
      <PaymentEditableSection
        title="Current Plan"
        btnText="Change Plan"
        btnTextToggle="Cancel"
        changed={changed}
        btnTextChanged="Update Plan"
        editContent={
          <div className="payment-plans-wrp">
            <div className="payment-plans">
              <PlansSection active={selectedPlan} select={plan => setSelectedPlan(plan)} plans={plans}/>
            </div>
            {
              changed
                ? <p className="payment-plans__text">You will be charged {price} on a {period}ly basis at the end of your current paying period.</p>
                : ''
            }
          </div>
        }
        onsave={() => {
          if (changed) {
            props.changePlan({
              id: user.paymentData.id,
              newPlan: '/api/plans/' + selectedPlan.id
            });
          }
        }}
      >
        <PlanCard tariff={user.paymentData.plan.title} expirationDate={new Date(user.paymentData.expirationDate)} />
      </PaymentEditableSection>
      <PaymentEditableSection
        title="Payment Details"
        onsave={async () => {
          await props.stripe.createToken({
            type: 'card'
          })
            .then(token => {
              props.changeSource({
                id: props.user.paymentData.id,
                stripeToken: token.token.id
              });
            })
            .catch(e => {
              setError(true);
            });
        }}
        editContent={
          <div>
            <NumberField
              as={CardNumberElement}
            />
            <Row>
              <Col xs={6}>
                <DateField
                  as={CardExpiryElement}
                />
              </Col>
              <Col xs={6}>
                <CVCField
                  as={CardCVCElement}
                />
              </Col>
            </Row>
            <p className="credit-card-checkout__desc">We do not store credit card details. All payments are done through secure payment gateway <a href="https://stripe.com/docs/security/stripe">Stripe</a>.</p>
          </div>
        }
      >
        <div>
          <NumberField
            disabled={true}
          />
          <Row>
            <Col xs={6}>
              <DateField
                disabled={true}
              />
            </Col>
            <Col xs={6}>
              <CVCField
                disabled={true}
              />
            </Col>
          </Row>
          <p className="credit-card-checkout__desc">We do not store credit card details. All payments are done through secure payment gateway <a href="https://stripe.com/docs/security/stripe">Stripe</a>.</p>
        </div>
      </PaymentEditableSection>
      <PaymentSection title="Cancel Your Subscription">
        <p className="payment-cancel">
          Once you cancel the subscription, you current plan will be available until <strong>{formatDate(new Date(user.paymentData.expirationDate))}</strong>. After that, your account will switch to a free version. You will not lose your stories and can keep writing, but you will not be able to use “edit” tools.
          <button
            className="payment-cancel__btn"
            onClick={() => {
              props.show()
            }}
          >Cancel Subscription</button>
        </p>
        <ConfirmCancelSubscriptionModal
          show={props.modal.show}
          handleCancel={() => props.hide()}
          handleConfirm={() => {
            props.cancelSubscription(user.paymentData.id);
            props.hide()
          }}
        />
      </PaymentSection>
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
        Success!
      </Alert>
      { props.payment.loading && <Loader />}
    </div>
  );
};

const mapStateToProps = state => ({
  modal: state.cancelSubscriptionModal,
  payment: state.payment
});

const mapDispatchToProps = dispatch => ({
  show: bindActionCreators(show, dispatch),
  hide: bindActionCreators(hide, dispatch),
  cancelSubscription: bindActionCreators(cancelSubscription, dispatch),
  changePlan: bindActionCreators(changePlan, dispatch),
  changeSource: bindActionCreators(changeSource, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStripe(EditPlan));
