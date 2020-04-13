import React, { useEffect } from 'react';
import {loadPlans} from "../logic/paymentActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EditPlan from "../../../../components/Account/Payment/EditPlan";
import stripeConfig from "../../../../config/stripe";
import {Elements, StripeProvider} from "react-stripe-elements";
import Payment from "../../../../components/Account/Payment";

const EditPlanContainer = props => {
  let {
    user,
    payment: {
      plans,
      loading
    },
    loadPlans
  } = props;

  useEffect(() => {
    if (!plans) {
      loadPlans();
    }
  }, [plans, loadPlans]);

  return (
    <StripeProvider apiKey={stripeConfig.apiKey}>
      <Elements>
        {
          user.paymentData.cancelled
            ? <Payment user={user} plans={plans} loading={loading} />
            : <EditPlan plans={plans} user={user} />
        }
      </Elements>
    </StripeProvider>
  );
};

const mapStateToProps = state => ({
  payment: state.payment,
  user: state.login.user
});

const mapDispatchToProps = dispatch => ({
  loadPlans: bindActionCreators(loadPlans, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPlanContainer);
