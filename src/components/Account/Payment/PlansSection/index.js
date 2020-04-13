import React from 'react';
import PaymentCardBig from "../PaymentCard/PaymentCardBig";
import {getPlanInfo} from "../../../../services/plans";

const PlansSection = ({ plans, active, select }) => (
  <>
    {
      plans &&
      plans.map(plan => {
        let { price, period } = getPlanInfo(plan);

        return (<PaymentCardBig hero={price} sub={'/' + period} onclick={() => select(plan)} active={active && plan.id === active.id} key={plan.id}/>);
      })
    }
  </>
);

export default PlansSection;
