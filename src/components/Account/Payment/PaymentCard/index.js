import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const PaymentCard = ({ children, className, onclick, active }) => {
  return (
    <div
      className={`payment-card ${className ? className : ''} ${active ? 'payment-card--active' : ''}`}
      onClick={onclick}
    >
      {children}
    </div>
  );
};

PaymentCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onclick: PropTypes.func,
  active: PropTypes.bool
};

PaymentCard.defaultProps = {
  active: false
};

export default PaymentCard;
