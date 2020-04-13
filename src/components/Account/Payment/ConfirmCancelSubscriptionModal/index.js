import React from 'react';
import ConfirmModal from "../../../Modal/ConfirmModal";

const ConfirmCancelSubscriptionModal = (props) => {
    return (
      <ConfirmModal
        title="Are you leaving us? Forever?"
        text='Your are about to cancel your subscription.'
        cancelBtnText="Nope"
        confirmBtnText='Yes, bye!'
        {...props}
      />
    );
};

export default ConfirmCancelSubscriptionModal;
