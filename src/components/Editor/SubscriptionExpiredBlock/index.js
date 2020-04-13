import React from 'react';
import { Link } from "react-router-dom";
import './index.scss';

const SubscriptionExpiredBlock = props => (
  <div className="subscription-expired">
    <div className="subscription-expired__header">
      Subscription Expired
    </div>
    <div className="subscription-expired__body">
      To edit your story you have to be subscribed to Shosho. Continue to Payment page and renew your subscription.
    </div>
    <div className="subscription-expired__footer">
      <Link className="subscription-expired__link" to="/account/payment">Continue to Payment</Link>
    </div>

  </div>
);

export default SubscriptionExpiredBlock;
