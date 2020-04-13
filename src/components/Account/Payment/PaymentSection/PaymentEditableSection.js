import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../PaymentSection/index.scss';

const PaymentEditableSection = ({ title, children, btnText, btnTextToggle, editContent, changed, btnTextChanged, onsave }) => {
  const [ editing, setEditing ] = useState(false);

  return (
    <div className={`payment-section ${editing ? 'payment-section--editing' : ''}`}>
      <div className="payment-section__header">
        {
          title &&
          <div className="payment-section__title">
            {title}
          </div>
        }
        <div
          className="payment-section__edit-btn"
          onClick={async () => {
            if (editing) {
              await onsave();
            }

            setEditing(!editing);
          }}
        >{
          editing
            ?
              changed
                ? btnTextChanged
                : btnTextToggle
            : btnText
        }</div>
      </div>
      <div className="payment-section__body">
        {
          editing
            ? editContent
            : children
        }
      </div>
    </div>
  );
};

PaymentEditableSection.defaultProps = {
  btnText: 'Change',
  btnTextToggle: 'Update',
  btnTextChanged: 'Update',
  changed: false
};

PaymentEditableSection.propTypes = {
  title: PropTypes.string,
  btnText: PropTypes.string,
  btnTextToggle: PropTypes.string,
  btnTextChanged: PropTypes.string,
  editContent: PropTypes.node,
  changed: PropTypes.bool,
  onsave: PropTypes.func
};

export default PaymentEditableSection;
