import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const PaymentSection = ({ title, children }) => (
  <div className="payment-section">
    {
      title &&
      <div className="payment-section__title">
        {title}
      </div>
    }
    <div className="payment-section__body">
      {children}
    </div>
  </div>
);

PaymentSection.propTypes = {
  title: PropTypes.string
};

export default PaymentSection;
