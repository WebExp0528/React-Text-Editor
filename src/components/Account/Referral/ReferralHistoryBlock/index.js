import React from 'react';
import './index.scss';
import {connect} from "react-redux";

const ReferralHistoryBlock = props => {
  return (
    <div className="referral-history">
      <div className="referral-history__header">
        <div className="referral-history__title">
          Your referral history
        </div>
      </div>
      <div className="referral-history__body">
        <div className="referral-history__item">
          <div className="referral-history__item-number">
            {props.user.invitations.length}
          </div>
          <div className="referral-history__item-text">
            Invites Sent
          </div>
        </div>
        <div className="referral-history__item">
          <div className="referral-history__item-number">
            {props.user.referralsPaid}
          </div>
          <div className="referral-history__item-text">
            Months Earned
          </div>
        </div>
        <div className="referral-history__item">
          <div className="referral-history__item-number">
            {props.user.paymentData.freeMonthsLeft || 0}
          </div>
          <div className="referral-history__item-text">
            Mon remaining
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.login.user
});

export default connect(mapStateToProps)(ReferralHistoryBlock);
