import React from 'react';
import './styles.sass';

const HowToUseBlock = props => (
  <div className="referral-hiw">
    <div className="referral-hiw__header">
      <div className="referral-hiw__title">
        How It Works
      </div>
    </div>
    <div className="referral-hiw__body">
      <div className="referral-hiw__item">
        <div className="referral-hiw__item-number">1</div>
        <div className="referral-hiw__item-title">Recommend</div>
        <div className="referral-hiw__item-desc">Recommend Shosho to 3 friends who need it</div>
      </div>
      <div className="referral-hiw__item">
        <div className="referral-hiw__item-number">2</div>
        <div className="referral-hiw__item-title">Register & Subscribe</div>
        <div className="referral-hiw__item-desc">All 3 register and pay for at least 1 month</div>
      </div>
      <div className="referral-hiw__item">
        <div className="referral-hiw__item-number">3</div>
        <div className="referral-hiw__item-title">You Win</div>
        <div className="referral-hiw__item-desc">You will receive 3 months for free</div>
      </div>
    </div>
  </div>
);

export default HowToUseBlock;
