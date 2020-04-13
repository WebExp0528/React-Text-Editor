import React, { useEffect } from 'react';
import Payment from "../../../../components/Account/Payment";
import {loadPlans} from "../logic/paymentActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const SelectPlanContainer = props => {
  let {
    user,
    payment: {
      loading,
      plans
    },
    loadPlans
  } = props;

  useEffect(() => {
    if (!plans) {
      loadPlans();
    }
  }, [plans, loadPlans]);

  return (
    <Payment user={user} plans={plans} loading={loading} />
  );
};

const mapStateToProps = state => ({
  payment: state.payment,
  user: state.login.user
});

const mapDispatchToProps = dispatch => ({
  loadPlans: bindActionCreators(loadPlans, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectPlanContainer);
