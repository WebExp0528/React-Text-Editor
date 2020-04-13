import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from "../../../../services/date";
import './index.scss';
import {getDaysLeft} from "../../../../services/user";

const freePlan = 'Free';
const date = new Date();

date.setDate(date.getDate() + 14);

const PlanCard = ({ tariff, expirationDate, cancelled }) => {
  if (tariff === null) {
    tariff = freePlan;
  }

  if (expirationDate === null) {
    expirationDate = date;
  }
  return (
    tariff === freePlan
      ? <div className="plan-card">Your current plan is <div className="plan-card__em">“{tariff}”</div> for <div className="plan-card__em">{getDaysLeft(expirationDate)} days</div>. Choose a package and subscribe.</div>
      :
        cancelled
          ? <div className="plan-card">Your current plan is <div className="plan-card__em">{tariff}</div> until <div className="plan-card__em">{formatDate(expirationDate)}</div>. Choose a package and subscribe.</div>
          : <div className="plan-card">Your current plan is <div className="plan-card__em">{tariff}</div>. Your subscription will renew on <div className="plan-card__em">{formatDate(expirationDate)}</div></div>
  );
};

PlanCard.propTypes = {
  tariff: PropTypes.string,
  expirationDate: PropTypes.instanceOf(Date),
  cancelled: PropTypes.bool,
};

PlanCard.defaultProps = {
  tariff: freePlan,
  expirationDate: date,
  cancelled: false
};

export default PlanCard;
