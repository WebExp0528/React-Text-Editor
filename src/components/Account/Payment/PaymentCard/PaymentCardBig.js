import React from 'react';
import PropTypes from 'prop-types';
import '../index.scss';
import PaymentCard from "../PaymentCard";

const PaymentCardBig = props => (
  <PaymentCard className="payment-card--big" {...props}>
    <div className="payment-card__hero">{props.hero}</div>
    <div className="payment-card__sub">{props.sub}</div>
  </PaymentCard>
);

PaymentCardBig.propTypes = {
  hero: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  onclick: PropTypes.func,
  active: PropTypes.bool
};

export default PaymentCardBig;
